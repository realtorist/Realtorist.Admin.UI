import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { Store } from '@ngrx/store';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { SmtpSettings } from '../../../@core/models/settings/smtpSettings';
import { AppState } from '../../../@store/appStore';

@Component({
  selector: "ngx-smtp-setting",
  templateUrl: "./smtp-setting.component.html",
  styleUrls: ["./smtp-setting.component.scss"],
})
export class SmtpSettingsComponent implements OnInit {
  settings: SmtpSettings;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi
  ) {}

  ngOnInit(): void {
    this.api.getSetting<SmtpSettings>(SettingTypes.Smtp)
      .subscribe(settins => {
        this.settings = settins || {} as SmtpSettings;
      })
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.Smtp, this.settings).subscribe((res) => {
      this.loading = false;
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
}
