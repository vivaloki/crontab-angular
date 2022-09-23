import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-year',
    templateUrl: 'crontab-year.component.html',
    styleUrls: ['crontab-year.component.scss']
})

export class CronTabYearComponent extends BaseCRUDService implements OnInit {
    thisYear = 2022;
    radioValue = '1';
    cycle01 = 0;
    cycle02 = 0;
    average01 = 0;
    average02 = 1;
    checkboxList = [];
    yearArr = [];
    @Output() updateContabValue = new EventEmitter<any>();
    @Input() cron;


    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {
        super(http, '');
    }

    ngOnInit() {
        this.thisYear = Number(new Date().getFullYear());
        this.cycle01 = this.thisYear;
        this.cycle02 = this.thisYear + 1;
        this.average01 = this.thisYear;
        this.getYearArr();
    }

    getYearArr() {
        const arr = [];
        for (let i = this.thisYear; i < this.thisYear + 10; i++) {
            arr.push(i);
        }
        arr.map((item) => {
            const option = {
                value: item + '',
                label: item + ''
            }
            this.yearArr.push(option);
        })
    }

    // 单选按钮值变化时
    radioChange() {
        if (this.cron.month === '*') {
            this.updateContabValue.emit({ name: 'month', value: '1', from: 'year' });
        }
        if (this.cron.day === '*') {
            this.updateContabValue.emit({ name: 'day', value: '1', from: 'year' });
        }
        if (this.cron.hour === '*') {
            this.updateContabValue.emit({ name: 'hour', value: '0', from: 'year' });
        }
        if (this.cron.min === '*') {
            this.updateContabValue.emit({ name: 'min', value: '0', from: 'year' });
        }
        if (this.cron.second === '*') {
            this.updateContabValue.emit({ name: 'second', value: '0', from: 'year' });
        }
        switch (this.radioValue) {
            case '1':
                this.updateContabValue.emit({ name: 'year', value: '', from: 'year' });
                break;
            case '2':
                this.updateContabValue.emit({ name: 'year', value: '*', from: 'year' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'year', value: this.cycle01 + '-' + this.cycle02, from: 'year' });
                break;
            case '4':
                this.updateContabValue.emit({ name: 'year', value: this.average01 + '/' + this.average02, from: 'year' });
                break;
            case '5':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'year', value: str, from: 'year' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }
}