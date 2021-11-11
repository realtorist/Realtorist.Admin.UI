import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: "time-cell-edit",
  template: `<input fullWidth nbInput [(ngModel)]="cell.newValue" type="text" [dropSpecialCharacters]="false" mask="00:00">`,
})
export class TimeCellEditComponent extends DefaultEditor implements OnInit {
  ngOnInit() {
    this.cell.newValue = this.cell.getValue() || null;
  }
}
