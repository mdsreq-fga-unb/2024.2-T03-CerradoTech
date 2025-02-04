import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocioprodutivoListaPageRoutingModule } from './socioprodutivo-lista-routing.module';

import { SocioprodutivoListaPage } from './socioprodutivo-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocioprodutivoListaPageRoutingModule
  ],
  declarations: [SocioprodutivoListaPage]
})
export class SocioprodutivoListaPageModule {}
