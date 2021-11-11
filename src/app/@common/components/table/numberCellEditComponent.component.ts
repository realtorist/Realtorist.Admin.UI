import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: "number-cell-edit",
  template: `<input nbInput fullWidth type="number" [(ngModel)]="this.cell.newValue" /> `,
})
export class NumberCellEditComponent extends DefaultEditor implements OnInit {
  ngOnInit() {
    this.cell.newValue = Number(this.cell.getValue()) ?? null;
  }
}
