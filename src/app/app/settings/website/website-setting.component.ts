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
      .subscribe(settins => {
        this.settings = settins || {} as WebsiteSettings;
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

  onKeywordRemove(tagToRemove: NbTagComponent): void {
    const index = this.settings.websiteKeywords.indexOf(tagToRemove.text);
    if (index >= 0) {
      this.settings.websiteKeywords.splice(index, 1);
    }
  }

  onKeywordAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.settings.websiteKeywords.push(value);
    }
    input.nativeElement.value = "";
    input.nativeElement.focus();
  }
}
