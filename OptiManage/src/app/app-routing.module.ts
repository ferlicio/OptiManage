import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domain/home.module').then(m => m.HomeModule)
  },
  /* {
    path: 'clientes',
    component: HomeComponent
  },
  {
    path: 'fornecedores',
    component: HomeComponent
  },
  {
    path: 'servicos',
    component: HomeComponent
  },
  {
    path: 'vendas',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }, */
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
