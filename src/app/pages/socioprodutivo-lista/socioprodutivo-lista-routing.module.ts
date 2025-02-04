import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocioprodutivoListaPage } from './socioprodutivo-lista.page';

const routes: Routes = [
  {
    path: '',
    component: SocioprodutivoListaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocioprodutivoListaPageRoutingModule {}
