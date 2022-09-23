import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-week',
    templateUrl: 'crontab-week.component.html',
    styleUrls: ['crontab-week.component.scss']
})

export class CronTabWeekComponent extends BaseCRUDService implements OnInit {
    radioValue = '2';
    weekday = 1
    cycle01 = 1;
    cycle02 = 2;
    average01 = 1;
    average02 = 1;
    checkboxList = [];
    weekList = [];
    @Input() cron;
    @Output() updateContabValue = new EventEmitter<any>();


    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {
        super(http, '');
    }

    ngOnInit() {
        this.get7Arr();
    }

    get7Arr() {
        const arr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        arr.map((item, idx) => {
            let option = {}
            if (idx === 6) {//周日
                option = {
                    value: 1 + '',
                    label: item + ''
                }
            } else {
                option = {
                    value: idx + 2 + '',
                    label: item + ''
                }
            }
            this.weekList.push(option);
        })
    }

    // 单选按钮值变化时
    radioChange() {
        if (this.radioValue === '1') {
            this.updateContabValue.emit({ name: 'week', value: '*', from: 'week' });
            this.updateContabValue.emit({ name: 'year', value: '*', from: 'week' });
        } else {
            if (this.cron.hour === '*') {
                this.updateContabValue.emit({ name: 'hour', value: '0', from: 'week' });
            }
            if (this.cron.min === '*') {
                this.updateContabValue.emit({ name: 'min', value: '0', from: 'week' });
            }
            if (this.cron.second === '*') {
                this.updateContabValue.emit({ name: 'second', value: '0', from: 'week' });
            }
            if (this.radioValue === '2') {
                if (this.cron.day === '*') {
                    this.updateContabValue.emit({ name: 'day', value: '1', from: 'week' });
                }
            } else {
                this.updateContabValue.emit({ name: 'day', value: '?', from: 'week' });//选了星期，月就必须是‘？’不指定
            }
        }
        switch (this.radioValue) {
            case '2':
                this.updateContabValue.emit({ name: 'week', value: '?', from: 'week' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'week', value: this.getCronWeekDay(this.cycle01) + '-' + this.getCronWeekDay(this.cycle02), from: 'week' });
                break;
            case '4':
                this.updateContabValue.emit({ name: 'week', value: this.getCronWeekDay(this.average02) + '#' + this.average01, from: 'week' });
                break;
            case '5':
                this.updateContabValue.emit({ name: 'week', value: this.getCronWeekDay(this.weekday) + 'L', from: 'week' });
                break;
            case '6':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'week', value: str, from: 'week' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }

    //cron表达式是从周日，周一...,对应值1，2，3...7
    getCronWeekDay(num) {
        if (num == 7) {
            return 1;
        } else {
            return num + 1;
        }
    }
}