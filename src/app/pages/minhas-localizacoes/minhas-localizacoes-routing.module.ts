import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasLocalizacoesPage } from './minhas-localizacoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasLocalizacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasLocalizacoesPageRoutingModule {}
