import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoligonoListaPageRoutingModule } from './poligono-lista-routing.module';

import { PoligonoListaPage } from './poligono-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PoligonoListaPageRoutingModule
  ],
  declarations: [PoligonoListaPage]
})
export class PoligonoListaPageModule {}
