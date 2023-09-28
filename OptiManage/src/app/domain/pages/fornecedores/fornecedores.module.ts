import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FormFornecedorComponent } from './form-fornecedor/form-fornecedor.component';
import { ListarFornecedoresComponent } from './listar-fornecedores/listar-fornecedores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AitTableModule } from 'src/app/widget/ait-table/ait-table.module';
import { MaterialModule } from 'src/app/material/material.module';
import { AitFormModule } from 'src/app/widget/ait-form/ait-form.module';


@NgModule({
  declarations: [
    FormFornecedorComponent,
    ListarFornecedoresComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AitTableModule,
    AitFormModule,
  ]
})
export class FornecedoresModule { }
