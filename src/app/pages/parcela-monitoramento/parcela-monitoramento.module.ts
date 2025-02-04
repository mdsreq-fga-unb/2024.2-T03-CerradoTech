import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelaMonitoramentoPageRoutingModule } from './parcela-monitoramento-routing.module';

import { ParcelaMonitoramentoPage } from './parcela-monitoramento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ParcelaMonitoramentoPageRoutingModule
  ],
  declarations: [ParcelaMonitoramentoPage]
})
export class ParcelaMonitoramentoPageModule {}
