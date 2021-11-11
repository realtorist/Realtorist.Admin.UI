
import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { ViewCell } from 'ng2-smart-table';
import { IListingsApi } from '../../../@core/abstractions/listings.api';
import { ListingFeedSetting } from '../../../@core/models/settings/listingFeedSetting';

@Component({
  template: `
    <nb-button-group ghost>
      <button type="button" nbButton (click)="launchUpdate()" title="Launch update for this feed"><nb-icon icon="play-circle-outline" pack="eva"></nb-icon></button>
    </nb-button-group>
  `
})
export class ListingFeedAdditionalActionComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: ListingFeedSetting;

  constructor(private readonly api: IListingsApi, private readonly toastrService: NbToastrService) {}

  ngOnInit() {
  }

  launchUpdate() {
    this.api.launchUpdate(this.rowData)
      .subscribe((_) => {
        this.toastrService.success(
          `Update task for the listing source ${this.rowData.feedType} was started. Please look for the results in the 'Events' page. This may take a few minutes.`, 
          'Update has started');
      }, (_) => {
        this.toastrService.danger(`Failed to start the update task for the listing source '${this.rowData.feedType}'. Please try again`, 'Something went wrong');
      })
  }
}