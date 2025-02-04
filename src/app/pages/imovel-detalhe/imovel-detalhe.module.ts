import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImovelDetalhePageRoutingModule } from './imovel-detalhe-routing.module';

import { ImovelDetalhePage } from './imovel-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImovelDetalhePageRoutingModule
  ],
  declarations: [ImovelDetalhePage]
})
export class ImovelDetalhePageModule {}
