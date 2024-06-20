import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { TelaComponent } from './pages/tela/tela.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { AitTableModule } from '../widget/ait-table/ait-table.module';


@NgModule({
  declarations: [
    HomeComponent,
    TelaComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSortModule,
    AitTableModule,
  ],
})
export class HomeModule { }
