import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: "empty-cell-edit",
  template: '',
})
export class EmptyCellEditComponent extends DefaultEditor implements OnInit {
  ngOnInit() {
  }
}
