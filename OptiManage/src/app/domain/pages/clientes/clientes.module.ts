import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { MatSortModule } from '@angular/material/sort';
import { AitTableModule } from 'src/app/widget/ait-table/ait-table.module';
import { AitFormModule } from 'src/app/widget/ait-form/ait-form.module';


@NgModule({
  declarations: [
    ListarClientesComponent,
    FormClienteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    AitTableModule,
    AitFormModule
  ]
})
export class ClientesModule { }
