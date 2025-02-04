import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoEspeciesPage } from './catalogo-especies.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogoEspeciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoEspeciesPageRoutingModule {}
