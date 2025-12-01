import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from './types';
import { Button } from '../button/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, Button],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  /**
   * Confirms the dialog by closing it and resolving the promise with true.
   */
  onConfirm() {
    this.dialogRef.close(true);
  }

  /**
   * Closes the dialog and resolves the promise with false.
   */
  onCancel() {
    this.dialogRef.close(false);
  }
}
