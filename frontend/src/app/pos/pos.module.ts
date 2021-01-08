import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosComponent } from './pos.component';
import { BlockUIModule } from 'primeng/blockui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { SidebarModule } from 'primeng/sidebar';
import {InputNumberModule} from 'primeng/inputnumber';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [PosComponent],
  exports: [PosComponent],
  imports: [
    CommonModule,
    SidebarModule,
    MessageModule,
    ButtonModule,
    ToastModule,
    BlockUIModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    InputNumberModule
  ]
})
export class PosModule { }
