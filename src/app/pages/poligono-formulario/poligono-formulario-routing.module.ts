import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoligonoFormularioPage } from './poligono-formulario.page';
import { LeaveFormGuard } from '@app/guards/leave-form.guard';

const routes: Routes = [
  {
    path: '',
    component: PoligonoFormularioPage,
    canDeactivate: [LeaveFormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoligonoFormularioPageRoutingModule {}
