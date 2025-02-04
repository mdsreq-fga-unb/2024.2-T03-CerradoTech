import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoligonoListaPage } from './poligono-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PoligonoListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoligonoListaPageRoutingModule {}
