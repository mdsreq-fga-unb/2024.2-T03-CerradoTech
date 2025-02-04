import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelFormularioPage } from './imovel-formulario.page';
import { LeaveFormGuard } from '@app/guards/leave-form.guard';

const routes: Routes = [
  {
    path: '',
    component: ImovelFormularioPage,
    canDeactivate: [LeaveFormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImovelFormularioPageRoutingModule {}
