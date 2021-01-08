import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

import { PosModule } from '../pos/pos.module';
import { PanelModule } from '../panel/panel.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ToastModule,
    TableModule,
    DropdownModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
    ButtonModule,
    PosModule,
    PanelModule
  ],
  declarations: [
    HomeComponent,

  ]
})
export class HomeModule { }
