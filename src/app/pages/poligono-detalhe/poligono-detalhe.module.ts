import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoligonoDetalhePageRoutingModule } from './poligono-detalhe-routing.module';

import { PoligonoDetalhePage } from './poligono-detalhe.page';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoligonoDetalhePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PoligonoDetalhePage]
})
export class PoligonoDetalhePageModule {}
