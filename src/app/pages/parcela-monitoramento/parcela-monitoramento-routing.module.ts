import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelaMonitoramentoPage } from './parcela-monitoramento.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelaMonitoramentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelaMonitoramentoPageRoutingModule {}
