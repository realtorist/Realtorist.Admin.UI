import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.component.html',
  styleUrls: ['confirm-delete-dialog.component.scss'],
})
export class ConfirmDeleteDialogComponent {

  @Input() text: string;
  
  constructor(protected ref: NbDialogRef<ConfirmDeleteDialogComponent>) {}

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }
}
