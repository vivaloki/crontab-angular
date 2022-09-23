import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-month',
    templateUrl: 'crontab-month.component.html',
    styleUrls: ['crontab-month.component.scss']
})

export class CronTabMonthComponent extends BaseCRUDService implements OnInit {
    radioValue = '1';
    cycle01 = 1;
    cycle02 = 2;
    average01 = 1;
    average02 = 1;
    checkboxList = [];
    twelveArr = [];
    @Input() cron;
    @Output() updateContabValue = new EventEmitter<any>();


    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {
        super(http, '');
    }

    ngOnInit() {
        this.get12Arr();
    }

    get12Arr() {
        const arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push(i);
        }
        arr.map((item) => {
            const option = {
                value: item + '',
                label: item + ''
            }
            this.twelveArr.push(option);
        })
    }

    // 单选按钮值变化时
    radioChange() {
        if (this.radioValue === '1') {
            this.updateContabValue.emit({ name: 'month', value: '*', from: 'month' });
            this.updateContabValue.emit({ name: 'year', value: '*', from: 'month' });
        } else {
            if (this.cron.day === '*') {
                this.updateContabValue.emit({ name: 'day', value: '1', from: 'month' });
            }
            if (this.cron.hour === '*') {
                this.updateContabValue.emit({ name: 'hour', value: '0', from: 'month' });
            }
            if (this.cron.min === '*') {
                this.updateContabValue.emit({ name: 'min', value: '0', from: 'month' });
            }
            if (this.cron.second === '*') {
                this.updateContabValue.emit({ name: 'second', value: '0', from: 'month' });
            }
        }
        switch (this.radioValue) {
            case '2':
                this.updateContabValue.emit({ name: 'month', value: this.cycle01 + '-' + this.cycle02, from: 'month' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'month', value: this.average01 + '/' + this.average02, from: 'month' });
                break;
            case '4':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'month', value: str, from: 'month' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }
}