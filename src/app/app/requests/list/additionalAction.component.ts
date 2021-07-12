
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ViewCell } from 'ng2-smart-table';
import { ICustomerRequestsApi } from '../../../@core/abstractions/customer-requests.api';

@Component({
  template: `
    <nb-button-group>
      <a nbButton (click)="navigateToDetails()" title="Open Request"><nb-icon icon="inbox-outline" pack="eva"></nb-icon></a>
      <a nbButton (click)="toggleRead()" [title]="rowData.read ? 'Mark request as unread' : 'Mark request as read'"><nb-icon [icon]="rowData.read ? 'eye-off-outline' : 'eye-outline'" pack="eva"></nb-icon></a>
      <a nbButton (click)="onDelete()" title="Delete request"><nb-icon icon="trash-outline" pack="eva"></nb-icon></a>
    </nb-button-group>
  `,
  styles: [
      'a { cursor: pointer; }'
  ]
})
export class AdditionalActionComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private readonly router: Router, private readonly api: ICustomerRequestsApi) {}

  ngOnInit() {
  }

  toggleRead() {
    this.api.markAsRead(this.rowData.id, !this.rowData.read)
        .subscribe(_ => this.rowData.read = !this.rowData.read);
  }

  navigateToDetails() {
    this.router.navigate(['/app/requests', this.rowData.id]);
  }

  onDelete() {
    this.delete.emit(this.rowData);
  }
}