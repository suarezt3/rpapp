import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos NgZorro
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';




@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzNotificationModule,
    NzSelectModule
  ],
  exports: [
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzNotificationModule,
    NzSelectModule
  ]
})
export class NgzorroModule { }
