import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from "@nebular/theme";

import { Store } from '@ngrx/store';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { ListingsSettings } from '../../../@core/models/settings/listingsSettings';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { loadProfileRequest } from '../../../@store/actions/user.actions';
import { AppState } from '../../../@store/appStore';

@Component({
  selector: "ngx-listings-setting",
  templateUrl: "./listings-setting.component.html",
  styleUrls: ["./listings-setting.component.scss"],
})
export class ListingsSettingsComponent implements OnInit {
  settings: ListingsSettings;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.api.getSetting<ListingsSettings>(SettingTypes.Listings)
      .subscribe(settings => {
        this.settings = settings || {} as ListingsSettings;
        this.settings.listingOfficesToAutoFavouriteListings = this.settings.listingOfficesToAutoFavouriteListings ?? [];
      })
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
}
