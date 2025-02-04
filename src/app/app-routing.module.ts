/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { LeaveFormGuard } from './guards/leave-form.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'imovel-lista',
    loadChildren: () => import('./pages/imovel-lista/imovel-lista.module').then( m => m.ImovelListaPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'imovel-detalhe/:id',
    loadChildren: () => import('./pages/imovel-detalhe/imovel-detalhe.module').then( m => m.ImovelDetalhePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'imovel-formulario',
    loadChildren: () => import('./pages/imovel-formulario/imovel-formulario.module').then( m => m.ImovelFormularioPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'imovel-formulario/:id',
    loadChildren: () => import('./pages/imovel-formulario/imovel-formulario.module').then( m => m.ImovelFormularioPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('./modals/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'poligono-lista/:id',
    loadChildren: () => import('./pages/poligono-lista/poligono-lista.module').then( m => m.PoligonoListaPageModule)
  },
  {
    path: 'poligono-detalhe/:idImovel/:idPoligono',
    loadChildren: () => import('./pages/poligono-detalhe/poligono-detalhe.module').then( m => m.PoligonoDetalhePageModule)
  },
  {
    path: 'poligono-formulario/:idImovel',
    loadChildren: () => import('./pages/poligono-formulario/poligono-formulario.module').then( m => m.PoligonoFormularioPageModule)
  },
  {
    path: 'poligono-formulario/:idImovel/:idPoligono',
    loadChildren: () => import('./pages/poligono-formulario/poligono-formulario.module').then( m => m.PoligonoFormularioPageModule)
  },
  {
    path: 'catalogo-especies',
    loadChildren: () => import('./pages/catalogo-especies/catalogo-especies.module').then( m => m.CatalogoEspeciesPageModule)
  },
  {
    path: 'minhas-localizacoes',
    loadChildren: () => import('./pages/minhas-localizacoes/minhas-localizacoes.module').then( m => m.MinhasLocalizacoesPageModule)
  },
  {
    path: 'parcela-monitoramento/:idImovel/:idPoligono',
    loadChildren: () => import('./pages/parcela-monitoramento/parcela-monitoramento.module').then( m => m.ParcelaMonitoramentoPageModule)
  },
  {
    path: 'parcela-lista/:idImovel/:idPoligono/:ano',
    loadChildren: () => import('./pages/parcela-lista/parcela-lista.module').then( m => m.ParcelaListaPageModule)
  },
  {
    path: 'parcela-formulario/:idImovel/:idPoligono/:idParcela',
    loadChildren: () => import('./pages/parcela-formulario/parcela-formulario.module').then( m => m.ParcelaFormularioPageModule),
  },
  {
    path: 'parcela-observacao',
    loadChildren: () => import('./modals/parcela-observacao/parcela-observacao.module').then( m => m.ParcelaObservacaoPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./modals/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'minha-conta',
    loadChildren: () => import('./pages/minha-conta/minha-conta.module').then( m => m.MinhaContaPageModule)
  },
  {
    path: 'socioprodutivo-lista/:id',
    loadChildren: () => import('./pages/socioprodutivo-lista/socioprodutivo-lista.module').then( m => m.SocioprodutivoListaPageModule)
  },
  {
    path: 'socioprodutivo-formulario/:idImovel',
    loadChildren: () => import('./pages/socioprodutivo-formulario/socioprodutivo-formulario.module').then( m => m.SocioprodutivoFormularioPageModule)
  },
  {
    path: 'socioprodutivo-formulario/:idImovel/:idSocioprodutivo',
    loadChildren: () => import('./pages/socioprodutivo-formulario/socioprodutivo-formulario.module').then( m => m.SocioprodutivoFormularioPageModule)
  }
];

@NgModule({
  // declarations: [HomePageModule],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [LeaveFormGuard],
})
export class AppRoutingModule {}
