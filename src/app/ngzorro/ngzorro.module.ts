import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos NgZorro
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzNotificationModule } from 'ng-zorro-antd/notification';



@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzNotificationModule
  ],
  exports: [
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzNotificationModule
  ]
})
export class NgzorroModule { }