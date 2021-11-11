import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from 'ng2-smart-table';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { SocialNetworkLink, SocialSettings } from '../../../@core/models/settings/socialSettings';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, enumColumn, reorderColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';

@Component({
  selector: "ngx-social-setting",
  templateUrl: "./social-setting.component.html",
  styleUrls: ["./social-setting.component.scss"],
})
export class SocialSettingsComponent implements OnInit {
  settings: SocialSettings;
  
  linksDataSource = new LocalDataSource();

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi
  ) {}

  ngOnInit(): void {
    this.api.getSetting<SocialSettings>(SettingTypes.Social)
      .subscribe(settings => {
        this.settings = settings || {} as SocialSettings;
        this.settings.socialNetworks = this.settings.socialNetworks || [];
        createLocalDataSource(this.linksDataSource, this.settings, 'socialNetworks');
      })
  }

  tableSettings: any = defaultInlineTableSettings({
    socialNetwork: enumColumn('Social network', 'SocialNetwork'),
    url: stringColumn('URL to profile'),
    action: reorderColumn<SocialNetworkLink>(() => this.settings, 'socialNetworks', this.linksDataSource)
  });

  confirm = ($event: ConfirmObject<SocialNetworkLink>) => {
    const errors: string[] = [];

    if (!$event.newData.url) {
      errors.push('URL is required.');
    } else if (!$event.newData.url.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)) {
      errors.push('URL should be a valid URL.');
    }

    if (errors.length > 0) {
      this.toastrService.danger(errors.join('\n'), 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
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
    }, (error) => {
      this.loading = false;
      this.toastrService.danger(
        `Something went wrong. Please try again`,
        "Error!"
      );
    });
  }
}
