import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { AnalyticsSettings } from '../../../@core/models/settings/analyticsSettings';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';

@Component({
  selector: "ngx-analytics-setting",
  templateUrl: "./analytics-setting.component.html",
  styleUrls: ["./analytics-setting.component.scss"],
})
export class AnalyticsSettingsComponent implements OnInit {
  settings: AnalyticsSettings;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi
  ) {}

  ngOnInit(): void {
    this.api.getSetting<AnalyticsSettings>(SettingTypes.Analytics)
      .subscribe(settings => {
        this.settings = settings || {} as AnalyticsSettings;
      })
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.Analytics, this.settings).subscribe((res) => {
      this.loading = false;
      this.toastrService.success(
        `Settings were successfully saved`,
        "Saved!"
      );
    });
  }
}
