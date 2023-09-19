import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ListarServicosComponent } from './listar-servicos/listar-servicos.component';
import { FormServicoComponent } from './form-servico/form-servico.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AitTableModule } from 'src/app/widget/ait-table/ait-table.module';
import { AitFormModule } from 'src/app/widget/ait-form/ait-form.module';


@NgModule({
  declarations: [
    ListarServicosComponent,
    FormServicoComponent,
  ],
  imports: [
    CommonModule,
    ServicosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AitTableModule,
    AitFormModule
  ]
})
export class ServicosModule { }
