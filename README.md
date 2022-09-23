# crontab-angular
cron expression configuration
# 引用
import { CronTabModule } from './components/cron-tab/cron-tab.module';

@NgModule({
  imports: [
    CronTabModule
  ],
  declarations: [],
  entryComponents: [],
  exports: []
})
export class xxxModule { }

#注意
1.tab使用了ngx-bootstrap/tabs,可按需替换
2.css有些class来自项目的公共样式，需按需重写

