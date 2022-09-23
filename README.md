# crontab-angular
配置cron表达式

![image](https://user-images.githubusercontent.com/19623787/191892531-89849264-24be-4756-a07b-c19ac45d752c.png)
![image](https://user-images.githubusercontent.com/19623787/191892550-29042ce4-cdc3-4c8c-bea8-e7fa033b299b.png)
![image](https://user-images.githubusercontent.com/19623787/191892560-978d4fbc-b7ae-440e-8099-b2c28c19cadb.png)
![image](https://user-images.githubusercontent.com/19623787/191892598-2825efc0-9553-40d5-9e9d-d5803aa6737f.png)
![image](https://user-images.githubusercontent.com/19623787/191892611-f9fc682b-947c-4cf5-8f28-9220621183dd.png)
![image](https://user-images.githubusercontent.com/19623787/191892633-3dc1064f-1638-47a1-82e6-e32902041253.png)
![image](https://user-images.githubusercontent.com/19623787/191892644-f539ea17-ac2c-4b3d-a5e9-d206bad008a8.png)
![image](https://user-images.githubusercontent.com/19623787/191892652-8a7447b6-7811-40ec-823c-ab914ea1c048.png)

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

# 注意
1.tab使用了ngx-bootstrap/tabs,可按需替换
2.弹窗使用了import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';,可按需替换
3.css有些class来自项目的公共样式，需按需重写

