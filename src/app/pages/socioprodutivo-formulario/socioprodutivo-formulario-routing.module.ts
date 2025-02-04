import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocioprodutivoFormularioPage } from './socioprodutivo-formulario.page';
import { LeaveFormGuard } from '@app/guards/leave-form.guard';

const routes: Routes = [
  {
    path: '',
    component: SocioprodutivoFormularioPage,
    canDeactivate: [LeaveFormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocioprodutivoFormularioPageRoutingModule {}
