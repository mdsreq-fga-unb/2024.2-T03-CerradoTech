import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImovelListaPageRoutingModule } from './imovel-lista-routing.module';

import { ImovelListaPage } from './imovel-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImovelListaPageRoutingModule
  ],
  declarations: [ImovelListaPage]
})
export class ImovelListaPageModule {}
