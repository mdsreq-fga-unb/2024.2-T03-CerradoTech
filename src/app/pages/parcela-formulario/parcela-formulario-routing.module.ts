import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelaFormularioPage } from './parcela-formulario.page';
import { LeaveFormGuard } from '@app/guards/leave-form.guard';

const routes: Routes = [
  {
    path: '',
    component: ParcelaFormularioPage,
    canDeactivate: [LeaveFormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelaFormularioPageRoutingModule {}
