import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';

import { PoligonoFormularioPageRoutingModule } from './poligono-formulario-routing.module';

import { PoligonoFormularioPage } from './poligono-formulario.page';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    PoligonoFormularioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PoligonoFormularioPage]
})
export class PoligonoFormularioPageModule {}
