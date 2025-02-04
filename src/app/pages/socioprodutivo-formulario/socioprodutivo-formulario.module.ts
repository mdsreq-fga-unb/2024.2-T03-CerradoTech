import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocioprodutivoFormularioPageRoutingModule } from './socioprodutivo-formulario-routing.module';

import { SocioprodutivoFormularioPage } from './socioprodutivo-formulario.page';
import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SocioprodutivoFormularioPageRoutingModule,
    BrMaskerModule,
    IonicSelectableModule
  ],
  declarations: [SocioprodutivoFormularioPage]
})
export class SocioprodutivoFormularioPageModule {}
