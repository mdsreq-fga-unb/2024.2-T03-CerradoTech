import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelaListaPageRoutingModule } from './parcela-lista-routing.module';

import { ParcelaListaPage } from './parcela-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelaListaPageRoutingModule
  ],
  declarations: [ParcelaListaPage]
})
export class ParcelaListaPageModule {}
