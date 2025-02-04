import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoEspeciesPageRoutingModule } from './catalogo-especies-routing.module';

import { CatalogoEspeciesPage } from './catalogo-especies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoEspeciesPageRoutingModule
  ],
  declarations: [CatalogoEspeciesPage]
})
export class CatalogoEspeciesPageModule {}
