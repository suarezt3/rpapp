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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';




@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzNotificationModule,
    NzSelectModule,
    NzIconModule,
    NzModalModule
  ],
  exports: [
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzNotificationModule,
    NzSelectModule,
    NzIconModule,
    NzModalModule
  ]
})
export class NgzorroModule { }
