
import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `{{!!value ? expression : ''}}`,
  styles: []
})
export class PasswordRenderComponent implements ViewCell {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {}

  get expression(): string {
    return (this.value || '').split('').map(_ => '*').filter((_, index) => index < 10).join('');
  }
}