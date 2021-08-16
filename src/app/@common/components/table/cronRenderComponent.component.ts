
import { Component, Input } from '@angular/core';
import cronstrue from 'cronstrue';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `{{!!value ? expression : ''}}`,
  styles: []
})
export class CronRenderComponent implements ViewCell {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {}

  get expression(): string {
    return cronstrue.toString(this.value);
  }
}