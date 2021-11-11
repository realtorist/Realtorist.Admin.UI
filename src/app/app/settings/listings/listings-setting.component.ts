import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from "@nebular/theme";

import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { CronEditorComponent } from '../../../@common/components/table/cronEditorComponent.component';
import { CronRenderComponent } from '../../../@common/components/table/cronRenderComponent.component';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent.component';
import { IListingsApi } from '../../../@core/abstractions/listings.api';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { ListingFeedSetting } from '../../../@core/models/settings/listingFeedSetting';
import { ListingsSettings } from '../../../@core/models/settings/listingsSettings';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, enumColumn, filterEditorForStringArray, numberColumn, passwordColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';
import { loadProfileRequest } from '../../../@store/actions/user.actions';
import { AppState } from '../../../@store/appStore';
import { ListingFeedAdditionalActionComponent } from './additionalFeedAction.component';

@Component({
  selector: "ngx-listings-setting",
  templateUrl: "./listings-setting.component.html",
  styleUrls: ["./listings-setting.component.scss"],
})
export class ListingsSettingsComponent implements OnInit {
  settings: ListingsSettings;

  sourcesDataSource = new LocalDataSource();

  loading = false;

  feedTypes: string[] = [];

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi,
    private readonly listingsApi: IListingsApi,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.api.getSetting<ListingsSettings>(SettingTypes.Listings)
      .subscribe(settings => {
        this.settings = settings || {} as ListingsSettings;
        this.settings.listingOfficesToAutoFavouriteListings = this.settings.listingOfficesToAutoFavouriteListings ?? [];
        this.settings.feeds = this.settings.feeds || [];
        createLocalDataSource(this.sourcesDataSource, this.settings, 'feeds');
      });

      this.listingsApi.getFeedTypes()
        .subscribe(feedTypes => {
          this.feedTypes = feedTypes;
          this.tableSettings.columns.feedType.filter = filterEditorForStringArray(this.feedTypes);
          this.tableSettings.columns.feedType.editor = filterEditorForStringArray(this.feedTypes);
        });
  }

  getFilteredOptions(options: string[], currentValue: string) {
    if (!currentValue) return options;

    return (options || []).filter(
      (option) =>
        option.toLocaleLowerCase().indexOf(currentValue.toLocaleLowerCase()) >= 0
    );
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.Listings, this.settings).subscribe((res) => {
      this.loading = false;
      this.store.dispatch(loadProfileRequest());
      this.toastrService.success(
        `Settings were successfully saved`,
        "Saved!"
      );
    }, (error) => {
      this.loading = false;
      this.toastrService.danger(
        `Something went wrong. Please try again`,
        "Error!"
      );
    });
  }

  onTagRemove(tagToRemove: NbTagComponent, propertyName: string): void {
    const index = this.settings[propertyName].indexOf(tagToRemove.text);
    if (index >= 0) {
      this.settings[propertyName].splice(index, 1);
    }
  }

  onTagAdd({ value, input }: NbTagInputAddEvent, propertyName: string): void {
    if (value) {
      this.settings[propertyName].push(value);
    }
    input.nativeElement.value = "";
    input.nativeElement.focus();
  }

  tableSettings : any = defaultInlineTableSettings({
    feedType: {
      title: 'Type',
      type: 'text',
      filter: filterEditorForStringArray(this.feedTypes),
      editor: filterEditorForStringArray(this.feedTypes),
    },
    baseUrl: stringColumn('Base URL'),
    username: stringColumn('Username'),
    password: passwordColumn('Password'),
    destinationId: numberColumn('Destination ID'),
    updateTime: {
      title: 'UpdateTime',
      editor: {
        type: 'custom',
        component: CronEditorComponent
      },
      type: 'custom',
      filter: false,
      renderComponent: CronRenderComponent
    },
    actions: {
      title: '',
      filter: false,
      editor: {
        type: 'custom',
        component: EmptyCellEditComponent
      },
      type: 'custom',
      renderComponent: ListingFeedAdditionalActionComponent
    }
  });

  confirm = ($event: ConfirmObject<ListingFeedSetting>) => {
    const errors: string[] = [];
    if (!$event.newData.id) {
      $event.newData.id = Guid.create().toString();
    }

    if (!$event.newData.baseUrl) {
      errors.push('Base URL is required.');
    } else if (!$event.newData.baseUrl.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)) {
      errors.push('Base URL should be a valid URL.');
    }

    if (!!$event.newData.destinationId && $event.newData.destinationId < 0) {
      errors.push('Destination ID should be greater or equal zero.');
    }

    if (!$event.newData.feedType) {
      errors.push('Listing source is required.')
    }

    if (!!$event.newData.updateTime && !moment.duration($event.newData.updateTime).isValid()) {
      errors.push('Update time is in wrong format. Please use 24 hours format.')
    }

    if (errors.length > 0) {
      this.toastrService.danger(errors.join('\n'), 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
