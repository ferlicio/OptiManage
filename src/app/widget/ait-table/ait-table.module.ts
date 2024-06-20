import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AitTableComponent } from './ait-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ElementActionDialogModule } from './element-action-dialog/element-action-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AitTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ElementActionDialogModule,
    MatDialogModule,
  ],
  exports:[AitTableComponent]
})
export class AitTableModule { }
