import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-min',
    templateUrl: 'crontab-min.component.html',
    styleUrls: ['crontab-min.component.scss']
})

export class CronTabMinComponent extends BaseCRUDService implements OnInit {
    radioValue = '1';
    cycle01 = 1;
    cycle02 = 2;
    average01 = 0;
    average02 = 1;
    checkboxList = [];
    sixtyArr = [];
    @Input() cron;
    @Output() updateContabValue = new EventEmitter<any>();


    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {
        super(http, '');
    }

    ngOnInit() {
        this.getSistyArr();
    }

    getSistyArr() {
        const arr = [];
        for (let i = 0; i < 60; i++) {
            arr.push(i);
        }
        arr.map((item) => {
            const option = {
                value: item + '',
                label: item + ''
            }
            this.sixtyArr.push(option);
        })
    }

    // 单选按钮值变化时
    radioChange() {
        if (this.radioValue !== '1' && this.cron.second === '*') {
            this.updateContabValue.emit({ name: 'second', value: '0', from: 'min' });
        }
        switch (this.radioValue) {
            case '1':
                this.updateContabValue.emit({ name: 'min', value: '*', from: 'min' });
                this.updateContabValue.emit({ name: 'hour', value: '*', from: 'min' });
                break;
            case '2':
                this.updateContabValue.emit({ name: 'min', value: this.cycle01 + '-' + this.cycle02, from: 'min' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'min', value: this.average01 + '/' + this.average02, from: 'min' });
                break;
            case '4':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'min', value: str, from: 'min' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }
}