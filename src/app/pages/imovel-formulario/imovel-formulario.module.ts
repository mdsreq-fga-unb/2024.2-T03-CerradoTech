import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImovelFormularioPageRoutingModule } from './imovel-formulario-routing.module';

import { ImovelFormularioPage } from './imovel-formulario.page';
import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImovelFormularioPageRoutingModule,
    BrMaskerModule,
    IonicSelectableModule
  ],
  declarations: [ImovelFormularioPage]
})
export class ImovelFormularioPageModule {}
