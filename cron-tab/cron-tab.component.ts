import { Component, ChangeDetectorRef, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { CronTabYearComponent } from './crontab-year/crontab-year.component';
import { CronTabSecondComponent } from './crontab-second/crontab-second.component';
import { CronTabMinComponent } from './crontab-min/crontab-min.component';
import { CronTabDayComponent } from './crontab-day/crontab-day.component';
import { CronTabHourComponent } from './crontab-hour/crontab-hour.component';
import { CronTabWeekComponent } from './crontab-week/crontab-week.component';
import { CronTabMonthComponent } from './crontab-month/crontab-month.component';

@Component({
    selector: 'cron-tab',
    templateUrl: 'cron-tab.component.html',
    styleUrls: ['cron-tab.component.scss']
})

export class CronTabComponent extends BaseCRUDService implements OnInit {
    tabTitles = ["秒", "分钟", "小时", "日", "月", "周", "年"];
    tabActive = 0;
    myindex = 0;
    contabValueObj = {
        second: "*",
        min: "*",
        hour: "*",
        day: "*",
        month: "*",
        week: "?",
        year: "",
    }
    expression = '';
    @ViewChild('cronsecond', { static: false }) cronsecond: CronTabSecondComponent;
    @ViewChild('cronmin', { static: false }) cronmin: CronTabMinComponent;
    @ViewChild('cronhour', { static: false }) cronhour: CronTabHourComponent;
    @ViewChild('cronday', { static: false }) cronday: CronTabDayComponent;
    @ViewChild('cronmonth', { static: false }) cronmonth: CronTabMonthComponent;
    @ViewChild('cronweek', { static: false }) cronweek: CronTabWeekComponent;
    @ViewChild('cronyear', { static: false }) cronyear: CronTabYearComponent;

    get contabValueString() {
        let obj = this.contabValueObj;
        let str =
            obj.second +
            " " +
            obj.min +
            " " +
            obj.hour +
            " " +
            obj.day +
            " " +
            obj.month +
            " " +
            obj.week +
            (obj.year == "" ? "" : " " + obj.year);
        return str;
    }

    constructor(private activeModal: NgbActiveModal, private http: HttpClient, private cdr: ChangeDetectorRef) {
        super(http, '');
    }

    ngOnInit(): void {
    }


    ngAfterViewInit(){
        this.resolveExp();
    }

    resolveExp(e?) {
        if(e) this.expression = e;
        //反解析表达式
        if (this.expression) {
            let arr = this.expression.split(" ");
            if (arr.length >= 6) {
                //6 位以上是合法表达式
                let obj = {
                    second: arr[0],
                    min: arr[1],
                    hour: arr[2],
                    day: arr[3],
                    month: arr[4],
                    week: arr[5],
                    year: arr[6] ? arr[6] : "",
                };
                this.contabValueObj = {
                    ...obj,
                };
                for (let i in obj) {
                    if (obj[i]) this.changeRadio(i, obj[i]);
                }
            }
        } else {
            //没有传入的表达式 则还原
            this.clearCron();
        }
        this.cdr.detectChanges();
    }


    // 由子组件触发，更改表达式组成的字段值
    updateContabValue(e: { name: string, value: string, from?: string }) {
        this.contabValueObj[e.name] = e.value;
        if (e.from && e.from !== e.name) {
            console.log(`来自组件 ${e.from} 改变了 ${e.name} ${e.value}`);
            this.changeRadio(e.name, e.value);
        }
    }

    getWeekDayFromCron(num) {
        if (num == 1) {
            return 7;
        } else {
            return num - 1;
        }
    }

    //赋值到组件
    changeRadio(name, value) {
        let arr = ["second", "min", "hour", "month"],
            refName = "cron" + name,
            insVlaue;
        if (!this[refName]) return;
        if (arr.includes(name)) {
            if (value === "*") {
                insVlaue = '1';
            } else if (value.indexOf("-") > -1) {//周期从
                let indexArr = value.split("-");
                isNaN(indexArr[0])
                    ? (this[refName].cycle01 = 0)
                    : (this[refName].cycle01 = indexArr[0]);
                this[refName].cycle02 = indexArr[1];
                insVlaue = '2';
            } else if (value.indexOf("/") > -1) {//从。。。开始，每。。。执行依次
                let indexArr = value.split("/");
                isNaN(indexArr[0])
                    ? (this[refName].average01 = 0)
                    : (this[refName].average01 = indexArr[0]);
                this[refName].average02 = indexArr[1];
                insVlaue = '3';
            } else {//指定
                insVlaue = '4';
                this[refName].checkboxList = value.split(",");
            }
        } else if (name == "day") {
            if (value === "*") {
                insVlaue = '1';
            } else if (value == "?") {
                insVlaue = '2';
            } else if (value.indexOf("-") > -1) {
                let indexArr = value.split("-");
                isNaN(indexArr[0])
                    ? (this[refName].cycle01 = 0)
                    : (this[refName].cycle01 = indexArr[0]);
                this[refName].cycle02 = indexArr[1];
                insVlaue = '3';
            } else if (value.indexOf("/") > -1) {
                let indexArr = value.split("/");
                isNaN(indexArr[0])
                    ? (this[refName].average01 = 0)
                    : (this[refName].average01 = indexArr[0]);
                this[refName].average02 = indexArr[1];
                insVlaue = '4';
            } else if (value.indexOf("W") > -1) {
                let indexArr = value.split("W");
                isNaN(indexArr[0])
                    ? (this[refName].workday = 0)
                    : (this[refName].workday = indexArr[0]);
                insVlaue = '5';
            } else if (value === "L") {
                insVlaue = '6';
            } else {
                this[refName].checkboxList = value.split(",");
                insVlaue = '7';
            }
        } else if (name == "week") {
            if (value === "*") {
                insVlaue = '1';
            } else if (value == "?") {
                insVlaue = '2';
            } else if (value.indexOf("-") > -1) {
                let indexArr = value.split("-");
                isNaN(indexArr[0])
                    ? (this[refName].cycle01 = 0)
                    : (this[refName].cycle01 = this.getWeekDayFromCron(indexArr[0]));
                this[refName].cycle02 = this.getWeekDayFromCron(indexArr[1]);
                insVlaue = '3';
            } else if (value.indexOf("#") > -1) {
                let indexArr = value.split("#");
                isNaN(indexArr[0])
                    ? (this[refName].average01 = 1)
                    : (this[refName].average01 = indexArr[1]);
                this[refName].average02 = this.getWeekDayFromCron(indexArr[0]);
                insVlaue = '4';
            } else if (value.indexOf("L") > -1) {
                let indexArr = value.split("L");
                isNaN(indexArr[0])
                    ? (this[refName].weekday = 1)
                    : (this[refName].weekday = this.getWeekDayFromCron(indexArr[0]));
                insVlaue = '5';
            } else {
                this[refName].checkboxList = value.split(",");
                insVlaue = '7';
            }
        } else if (name == "year") {
            if (value == "") {
                insVlaue = '1';
            } else if (value == "*") {
                insVlaue = '2';
            } else if (value.indexOf("-") > -1) {
                insVlaue = '3';
            } else if (value.indexOf("/") > -1) {
                insVlaue = '4';
            } else {
                this[refName].checkboxList = value.split(",");
                insVlaue = '5';
            }
        }
        this[refName].radioValue = insVlaue;
    }

    submitFill() {
        this.activeModal.close(this.contabValueString);
        this.hidePopup();
    }

    clearCron() {
        // 还原选择项
        this.contabValueObj = {
            second: "*",
            min: "*",
            hour: "*",
            day: "*",
            month: "*",
            week: "?",
            year: "",
        };
        for (let j in this.contabValueObj) {
            this.changeRadio(j, this.contabValueObj[j]);
        }
    }

    hidePopup() {
        this.activeModal.close();
    }
}