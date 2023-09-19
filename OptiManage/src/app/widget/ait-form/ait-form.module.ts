import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AitFormComponent } from './ait-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AitFormComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[AitFormComponent]
})
export class AitFormModule { }
