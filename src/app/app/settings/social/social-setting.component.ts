import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { SocialSettings } from '../../../@core/models/settings/socialSettings';

@Component({
  selector: "ngx-social-setting",
  templateUrl: "./social-setting.component.html",
  styleUrls: ["./social-setting.component.scss"],
})
export class SocialSettingsComponent implements OnInit {
  settings: SocialSettings;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi
  ) {}

  ngOnInit(): void {
    this.api.getSetting<SocialSettings>(SettingTypes.Social)
      .subscribe(settings => {
        this.settings = settings || {} as SocialSettings;
      })
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.Social, this.settings).subscribe((res) => {
      this.loading = false;
      this.toastrService.success(
        `Settings were successfully saved`,
        "Saved!"
      );
    });
  }
}
