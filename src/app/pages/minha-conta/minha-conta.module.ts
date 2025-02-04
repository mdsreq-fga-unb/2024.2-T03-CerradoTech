import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhaContaPageRoutingModule } from './minha-conta-routing.module';

import { MinhaContaPage } from './minha-conta.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MinhaContaPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [MinhaContaPage]
})
export class MinhaContaPageModule {}
