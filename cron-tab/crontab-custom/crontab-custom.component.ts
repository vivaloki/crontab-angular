import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCRUDService } from '@app/communal/providers/baseCRUDService/baseCRUDService';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
    selector: 'crontab-custom',
    templateUrl: 'crontab-custom.component.html',
    styleUrls: ['crontab-custom.component.scss']
})

export class CronTabCustomComponent extends BaseCRUDService implements OnInit {
    cronExpression = '';
    @Output() updateContabValue = new EventEmitter<any>();
    @Input() ex;


    constructor(private activeModal: NgbActiveModal, private http: HttpClient
    ) {
        super(http, '');
    }

    ngOnInit() {

    }


    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.ex) {
            this.cronExpression = changes.ex.currentValue;
        }
    }


    inputChange() {
        this.updateContabValue.emit(this.cronExpression);
    }
}