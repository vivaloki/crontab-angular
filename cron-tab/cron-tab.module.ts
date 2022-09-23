import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SelectModule } from 'ng-select';
import { CronTabComponent } from './cron-tab.component';
import { CronTabSecondComponent } from './crontab-second/crontab-second.component';
import { CronTabMinComponent } from './crontab-min/crontab-min.component';
import { CronTabHourComponent } from './crontab-hour/crontab-hour.component';
import { CronTabMonthComponent } from './crontab-month/crontab-month.component';
import { CronTabDayComponent } from './crontab-day/crontab-day.component';
import { CronTabWeekComponent } from './crontab-week/crontab-week.component';
import { CronTabYearComponent } from './crontab-year/crontab-year.component';
import { CronTabResultComponent } from './crontab-result/crontab-result.component';
import { CronTabCustomComponent } from './crontab-custom/crontab-custom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    TabsModule,
    SelectModule
  ],
  declarations: [CronTabSecondComponent, CronTabComponent,CronTabMinComponent,CronTabHourComponent,CronTabMonthComponent,CronTabDayComponent,CronTabWeekComponent,CronTabYearComponent,CronTabResultComponent,CronTabCustomComponent],
  entryComponents: [CronTabSecondComponent, CronTabComponent,CronTabMinComponent,CronTabHourComponent,CronTabMonthComponent,CronTabDayComponent,CronTabYearComponent,CronTabResultComponent,CronTabCustomComponent],
  exports: [CronTabSecondComponent, CronTabComponent,CronTabMinComponent,CronTabHourComponent,CronTabMonthComponent,CronTabDayComponent,CronTabWeekComponent,CronTabYearComponent,CronTabResultComponent,CronTabCustomComponent]
})
export class CronTabModule { }
