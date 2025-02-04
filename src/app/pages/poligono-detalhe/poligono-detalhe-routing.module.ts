import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoligonoDetalhePage } from './poligono-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: PoligonoDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoligonoDetalhePageRoutingModule {}
