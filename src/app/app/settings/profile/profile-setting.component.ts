import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { Store } from '@ngrx/store';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { ProfileSettings } from '../../../@core/models/settings/profileSettings';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { loadProfileRequest } from '../../../@store/actions/user.actions';
import { AppState } from '../../../@store/appStore';
import { Themes } from '../../../@theme/styles/themes';

@Component({
  selector: "ngx-profile-setting",
  templateUrl: "./profile-setting.component.html",
  styleUrls: ["./profile-setting.component.scss"],
})
export class ProfileSettingsComponent implements OnInit {
  settings: ProfileSettings;
  themes = Themes;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.api.getSetting<ProfileSettings>(SettingTypes.Profile)
      .subscribe(settins => {
        this.settings = settins || {} as ProfileSettings;
      })
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.Profile, this.settings).subscribe((res) => {
      this.loading = false;
      this.store.dispatch(loadProfileRequest());
      this.toastrService.success(
        `Settings were successfully saved`,
        "Saved!"
      );
    });
  }
}
