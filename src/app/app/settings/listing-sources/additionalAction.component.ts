
import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { ViewCell } from 'ng2-smart-table';
import { IListingsApi } from '../../../@core/abstractions/listings.api';
import { EnumDisplayMap } from '../../../@core/models/enumDisplayMap';
import { ListingSourceSetting } from '../../../@core/models/settings/listingSourceSetting';

@Component({
  template: `
    <nb-button-group ghost>
      <button type="button" nbButton (click)="launchUpdate()" title="Launch update for this source"><nb-icon icon="play-circle-outline" pack="eva"></nb-icon></button>
    </nb-button-group>
  `
})
export class ListingSourceAdditionalActionComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: ListingSourceSetting;

  constructor(private readonly api: IListingsApi, private readonly toastrService: NbToastrService) {}

  ngOnInit() {
  }

  launchUpdate() {
    this.api.launchUpdate(this.rowData)
      .subscribe((_) => {
        this.toastrService.success(
          `Update task for the listing source ${EnumDisplayMap.ListingSource[this.rowData.listingSource]} was started. Please look for the results in the 'Events' page. This may take a few minutes.`, 
          'Update has started');
      }, (_) => {
        this.toastrService.danger(`Failed to start the update task for the listing source '${EnumDisplayMap.ListingSource[this.rowData.listingSource]}'. Please try again`, 'Something went wrong');
      })
  }
}