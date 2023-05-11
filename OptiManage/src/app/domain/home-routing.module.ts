import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TelaComponent } from './pages/tela/tela.component';

const routes: Routes = [
  {
    path: '',
    component: TelaComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'clientes',
        loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'fornecedores',
        loadChildren: () => import('./pages/fornecedores/fornecedores.module').then(m => m.FornecedoresModule)
      },
      {
        path: 'servicos',
        loadChildren: () => import('./pages/servicos/servicos.module').then(m => m.ServicosModule)
      },
      {
        path: 'imposto',
        loadChildren: () => import('./pages/servicos/servicos.module').then(m => m.ServicosModule)
      },
      {
        path: 'DRE',
        loadChildren: () => import('./pages/servicos/servicos.module').then(m => m.ServicosModule)
      },
      /* {
        path: 'vendas',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }, */
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
