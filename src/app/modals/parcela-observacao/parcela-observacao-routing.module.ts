import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelaObservacaoPage } from './parcela-observacao.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelaObservacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelaObservacaoPageRoutingModule {}
