import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasLocalizacoesPageRoutingModule } from './minhas-localizacoes-routing.module';

import { MinhasLocalizacoesPage } from './minhas-localizacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasLocalizacoesPageRoutingModule
  ],
  declarations: [MinhasLocalizacoesPage]
})
export class MinhasLocalizacoesPageModule {}
