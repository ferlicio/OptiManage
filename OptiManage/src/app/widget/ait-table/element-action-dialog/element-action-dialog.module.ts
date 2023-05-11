import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ElementActionDialogComponent } from './element-action-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [ElementActionDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports:[ElementActionDialogComponent],
})
export class ElementActionDialogModule { }
