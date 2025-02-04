import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelDetalhePage } from './imovel-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: ImovelDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImovelDetalhePageRoutingModule {}
