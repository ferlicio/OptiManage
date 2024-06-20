import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarServicosComponent } from './listar-servicos/listar-servicos.component';
import { FormServicoComponent } from './form-servico/form-servico.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarServicosComponent
      },
      {
        path: 'novo',
        component: FormServicoComponent
      },
      {
        path: 'editar',
        component: FormServicoComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
