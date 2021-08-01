import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from "@nebular/theme";
import * as momentTZ from 'moment-timezone';

import { Store } from '@ngrx/store';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { WebsiteSettings } from '../../../@core/models/settings/websiteSettings';
import { loadProfileRequest } from '../../../@store/actions/user.actions';
import { AppState } from '../../../@store/appStore';
import { Themes } from '../../../@theme/styles/themes';

@Component({
  selector: "ngx-website-setting",
  templateUrl: "./website-setting.component.html",
  styleUrls: ["./website-setting.component.scss"],
})
export class WebsiteSettingsComponent implements OnInit {
  settings: WebsiteSettings;

  loading = false;
  timezones = momentTZ.tz.names();

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.api.getSetting<WebsiteSettings>(SettingTypes.Website)
      .subscribe(settings => {
        this.settings = settings || {} as WebsiteSettings;
        this.settings.websiteKeywords = this.settings.websiteKeywords ?? [];
        this.settings.listingOfficesToAutoFavouriteListings = this.settings.listingOfficesToAutoFavouriteListings ?? [];
      })
  }

  isValidTimezone() {
    return !!this.settings.timezone && this.timezones.indexOf(this.settings.timezone) >= 0;
  }

  getFilteredOptions(options: string[], currentValue: string) {
    if (!currentValue) return options;

    return (options || []).filter(
      (option) =>
        option.toLocaleLowerCase().indexOf(currentValue.toLocaleLowerCase()) >= 0
    );
  }

  save(form: NgForm) {
    if (form.invalid || !this.isValidTimezone()) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.Website, this.settings).subscribe((res) => {
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
