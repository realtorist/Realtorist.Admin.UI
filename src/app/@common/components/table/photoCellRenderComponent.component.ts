
import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `<img [src]="value" class="table-photo"/>`,
  styles: []
})
export class PhotoCellRenderComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() { }

  ngOnInit() {
  }
}