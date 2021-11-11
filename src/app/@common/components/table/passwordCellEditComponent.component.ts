import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: "number-cell-edit",
  template: `<input nbInput fullWidth type="password" [(ngModel)]="this.cell.newValue" /> `,
})
export class PasswordCellEditComponent extends DefaultEditor implements OnInit {
  ngOnInit() {
    this.cell.newValue = this.cell.getValue();
  }
}
