import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { GeoCodingSettings } from '../../../@core/models/settings/geoCodingSettings';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';

@Component({
  selector: "ngx-geocoding-setting",
  templateUrl: "./geocoding-setting.component.html",
  styleUrls: ["./geocoding-setting.component.scss"],
})
export class GeoCodingSettingsComponent implements OnInit {
  settings: GeoCodingSettings;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi
  ) {}

  ngOnInit(): void {
    this.api.getSetting<GeoCodingSettings>(SettingTypes.GeoCoding)
      .subscribe(settings => {
        this.settings = settings || {} as GeoCodingSettings;
      })
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.GeoCoding, this.settings).subscribe((res) => {
      this.loading = false;
      this.toastrService.success(
        `Settings were successfully saved`,
        "Saved!"
      );
    });
  }
}
