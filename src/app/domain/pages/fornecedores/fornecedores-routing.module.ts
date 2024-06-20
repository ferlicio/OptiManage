import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFornecedoresComponent } from './listar-fornecedores/listar-fornecedores.component';
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarFornecedoresComponent
      },
      {
        path: 'novo',
        component: FormFornecedorComponent
      },
      {
        path: 'editar',
        component: FormFornecedorComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
