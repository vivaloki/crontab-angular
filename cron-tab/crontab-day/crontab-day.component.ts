import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-day',
    templateUrl: 'crontab-day.component.html',
    styleUrls: ['crontab-day.component.scss']
})

export class CronTabDayComponent extends BaseCRUDService implements OnInit {
    radioValue = '1';
    workday = 1;
    cycle01 = 1;
    cycle02 = 2;
    average01 = 1;
    average02 = 1;
    checkboxList = [];
    monthArr = [];
    @Input() cron;
    @Output() updateContabValue = new EventEmitter<any>();


    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {
        super(http, '');
    }

    ngOnInit() {
        this.get31Arr();
    }

    get31Arr() {
        const arr = [];
        for (let i = 1; i < 32; i++) {
            arr.push(i);
        }
        arr.map((item) => {
            const option = {
                value: item + '',
                label: item + ''
            }
            this.monthArr.push(option);
        })
    }

    // 单选按钮值变化时
    radioChange() {
        if (this.radioValue === '1') {
            this.updateContabValue.emit({ name: 'day', value: '*', from: 'day' });
            this.updateContabValue.emit({ name: 'week', value: '?', from: 'day' });
            this.updateContabValue.emit({ name: 'hour', value: '*', from: 'day' });
        } else {
            if (this.cron.hour === '*') {
                this.updateContabValue.emit({ name: 'hour', value: '0', from: 'day' });
            }
            if (this.cron.min === '*') {
                this.updateContabValue.emit({ name: 'min', value: '0', from: 'day' });
            }
            if (this.cron.second === '*') {
                this.updateContabValue.emit({ name: 'second', value: '0', from: 'day' });
            }
        }
        switch (this.radioValue) {
            case '2':
                this.updateContabValue.emit({ name: 'day', value: '?', from: 'day' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'day', value: this.cycle01 + '-' + this.cycle02, from: 'day' });
                break;
            case '4':
                this.updateContabValue.emit({ name: 'day', value: this.average01 + '/' + this.average02, from: 'day' });
                break;
            case '5':
                this.updateContabValue.emit({ name: 'day', value: this.workday + 'W', from: 'day' });
                break;
            case '6':
                this.updateContabValue.emit({ name: 'day', value: 'L', from: 'day' });
                break;
            case '7':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'day', value: str, from: 'day' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }
}