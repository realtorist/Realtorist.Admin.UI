
import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

import { ViewCell } from 'ng2-smart-table';
import { IListingsApi } from '../../../@core/abstractions/listings.api';
import { ListingListModel } from '../../../@core/models/listings/listingListModel';

@Component({
  template: `
    <nb-button-group>
      <a nbButton (click)="feature(!rowData.featured)" [title]="rowData.featured ? 'Unfeature' : 'Feature'"><nb-icon [icon]="rowData.featured ? 'star' : 'star-outline'" pack="eva"></nb-icon></a>
      <a nbButton (click)="disable(!rowData.disabled)" [title]="rowData.disabled ? 'Mark as visible' : 'Mark as hidden'"><nb-icon [icon]="rowData.disabled ? 'eye-outline' : 'eye-off-outline'" pack="eva"></nb-icon></a>
      <a *ngIf="!rowData.feedType" nbButton (click)="navigateToEdit()" title="Edit page"><nb-icon icon="edit-outline" pack="eva"></nb-icon></a>
      <a *ngIf="!rowData.feedType" nbButton (click)="onDelete()" title="Delete page"><nb-icon icon="trash-outline" pack="eva"></nb-icon></a>
    </nb-button-group>
  `,
  styles: [
      'a { cursor: pointer; }'
  ]
})
export class ListingsAdditionalActionComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: ListingListModel;
  
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly router: Router, 
    private readonly ref: ChangeDetectorRef,
    private readonly api: IListingsApi, 
    private readonly toastrService: NbToastrService) {}

  ngOnInit() {
  }

  navigateToEdit() {
    this.router.navigate(['/app/listings/', this.rowData.id, 'edit']);
  }

  feature(feature) {
    this.api.markAsFeatured(this.rowData.id, feature)
      .subscribe(_ => {
        this.toastrService.success(feature ? 'Marked as featured.' : 'Unmarked as featured.', 'Done!');
        this.rowData.featured = feature;
        this.ref.detectChanges();
      });
  }

  disable(disable) {
    this.api.markAsDisabled(this.rowData.id, disable) 
      .subscribe(_ => {
        this.toastrService.success(disable ? 'Marked as hidden.' : 'Marked as visible.', 'Done!');
        this.rowData.disabled = disable;
        this.ref.detectChanges();
      });
  }

  onDelete() {
    this.delete.emit(this.rowData);
  }
}