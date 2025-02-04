import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelaFormularioPageRoutingModule } from './parcela-formulario-routing.module';

import { ParcelaFormularioPage } from './parcela-formulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ParcelaFormularioPageRoutingModule
  ],
  declarations: [ParcelaFormularioPage]
})
export class ParcelaFormularioPageModule {}
