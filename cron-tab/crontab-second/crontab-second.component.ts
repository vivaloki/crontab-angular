import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-second',
    templateUrl: 'crontab-second.component.html',
    styleUrls: ['crontab-second.component.scss']
})

export class CronTabSecondComponent extends BaseCRUDService implements OnInit {
    radioValue = '1';
    cycle01 = 1;
    cycle02 = 2;
    average01 = 0;
    average02 = 1;
    checkboxList = [];
    sixtyArr = [];
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
        switch (this.radioValue) {
            case '1':
                this.updateContabValue.emit({ name: 'second', value: '*', from: 'second' });
                this.updateContabValue.emit({ name: 'min', value: '*', from: 'second' });
                break;
            case '2':
                this.updateContabValue.emit({ name: 'second', value: this.cycle01 + '-' + this.cycle02, from: 'second' });
                break;
            case '3':
                this.updateContabValue.emit({ name: 'second', value: this.average01 + '/' + this.average02, from: 'second' });
                break;
            case '4':
                let str = this.checkboxList.join();
                str == '' ? '*' : str;
                this.updateContabValue.emit({ name: 'second', value: str, from: 'second' });
                break;
        }
    }

    inputChange(num) {
        this.radioValue = num;
        this.radioChange();
    }
}