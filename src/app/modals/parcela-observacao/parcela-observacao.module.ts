import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelaObservacaoPageRoutingModule } from './parcela-observacao-routing.module';

import { ParcelaObservacaoPage } from './parcela-observacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelaObservacaoPageRoutingModule
  ],
  declarations: [ParcelaObservacaoPage]
})
export class ParcelaObservacaoPageModule {}
