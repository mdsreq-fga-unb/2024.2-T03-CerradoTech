import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelListaPage } from './imovel-lista.page';

const routes: Routes = [
  {
    path: '',
    component: ImovelListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImovelListaPageRoutingModule {}
