import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: number;
  type: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-element-action-dialog',
  templateUrl: './element-action-dialog.component.html',
  styleUrls: ['./element-action-dialog.component.scss']
})
export class ElementActionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ElementActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
  ) {}

}
