import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-hour',
    templateUrl: 'crontab-hour.component.html',
    styleUrls: ['crontab-hour.component.scss']
})

export class CronTabHourComponent extends BaseCRUDService implements OnInit {
    radioValue = '1';
    cycle01 = 0;
    cycle02 = 1;
    average01 = 0;
    average02 = 1;
    checkboxList = [];
    twentyFourArr = [];
    @Input() cron;
    @Output() updateContabValue = new EventEmitter<any>();


    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {
        super(http, '');
    }

    ngOnInit() {
        this.get24Arr();
    }

    get24Arr() {
        const arr = [];
        for (let i = 0; i < 24; i++) {
            arr.push(i);
        }
        arr.map((item) => {
            const option = {
                value: item + '',
                label: item + ''
            }
            this.twentyFourArr.push(option);
        })
    }

    // 单选按钮值变化时
    radioChange() {
        if (this.radioValue === '1') {
            this.updateContabValue.emit({ name: 'hour', value: '*', from: 'hour' });
            this.updateContabValue.emit({ name: 'day', value: '*', from: 'hour' });
        } else {
            if (this.cron.min === '*') {
                this.updateContabValue.emit({ name: 'min', value: '0', from: 'hour' });

            }
            if (this.cron.second === '*') {
                this.updateContabValue.emit({ name: 'second', value: '0', from: 'hour' });
            }
        }
        switch (this.radioValue) {
            case '2':
                this.updateContabValue.emit({ name: 'hour', value: this.cycle01 + '-' + this.cycle02, from: 'hour' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'hour', value: this.average01 + '/' + this.average02, from: 'hour' });
                break;
            case '4':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'hour', value: str, from: 'hour' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }
}