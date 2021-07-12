
import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import { EnumDisplayMap } from '../../../@core/models/enumDisplayMap';

@Component({
  template: `{{!!value ? enumDisplayMap[type][value] : undefined}}`,
  styles: []
})
export class EnumRenderComponent implements ViewCell, OnInit {
  @Input() value: number;
  @Input() rowData: any;

  type: string;
  enumDisplayMap = EnumDisplayMap;

  constructor() {}

  setType(type: string) {
    this.type = type;
  }

  ngOnInit() {
  }
}