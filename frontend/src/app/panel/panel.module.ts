import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { SidebarModule } from 'primeng/sidebar';
import {InputNumberModule} from 'primeng/inputnumber';
import { QRCodeModule } from 'angularx-qrcode';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  declarations: [PanelComponent],
  exports: [PanelComponent],
  imports: [
    CommonModule,
    CommonModule,
    SidebarModule,
    MessageModule,
    ButtonModule,
    ToastModule,
    BlockUIModule,
    QRCodeModule,
    InputNumberModule
  ]
})
export class PanelModule { }
