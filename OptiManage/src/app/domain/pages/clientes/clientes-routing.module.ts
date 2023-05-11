import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarClientesComponent
      },
      {
        path: 'novo',
        component: FormClienteComponent
      },
      {
        path: 'editar',
        component: FormClienteComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
