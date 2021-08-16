import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { CronEditorComponent } from '../../../@common/components/table/cronEditorComponent.component';
import { CronRenderComponent } from '../../../@common/components/table/cronRenderComponent.component';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent';
import { TimeCellEditComponent } from '../../../@common/components/table/timeCellEditComponent';
import { TimeCellRenderComponent } from '../../../@common/components/table/timeCellRenderComponent';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { ListingSource } from '../../../@core/models/listings/enums/listingSource';
import { ListingSourceSetting } from '../../../@core/models/settings/listingSourceSetting';
import { SettingTypes } from '../../../@core/models/settings/settingTypes';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, enumColumn, numberColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';
import { ListingSourceAdditionalActionComponent } from './additionalAction.component';

@Component({
  selector: "ngx-listing-sources-setting",
  templateUrl: "./listing-sources-setting.component.html",
  styleUrls: ["./listing-sources-setting.component.scss"],
})
export class ListingSourcesSettingsComponent implements OnInit {
  settings = {
    sources: [] as ListingSourceSetting[]
  };
  
  sourcesDataSource = new LocalDataSource();

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: ISettingsApi
  ) { }

  ngOnInit(): void {
    this.api.getSetting<ListingSourceSetting[]>(SettingTypes.ListingSources)
      .subscribe(sources => {
        this.settings.sources = sources || [];
        createLocalDataSource(this.sourcesDataSource, this.settings, 'sources');
      })
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(SettingTypes.ListingSources, this.settings.sources).subscribe((res) => {
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

  tableSettings = defaultInlineTableSettings({
    listingSource: enumColumn('Source', 'ListingSource', [ListingSource.Manual]),
    baseUrl: stringColumn('Base URL'),
    username: stringColumn('Username'),
    password: stringColumn('Password', (value) => value.split('').map(_ => '*').join('')),
    destinationId: numberColumn('Destination ID'),
    // updateTime: {
    //   title: 'UpdateTime',
    //   editor: {
    //     type: 'custom',
    //     component: TimeCellEditComponent
    //   },
    //   type: 'custom',
    //   filter: false,
    //   renderComponent: TimeCellRenderComponent
    // },
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
      renderComponent: ListingSourceAdditionalActionComponent
    }
  });

  confirm = ($event: ConfirmObject<ListingSourceSetting>) => {
    const errors: string[] = [];
    if (!$event.newData.baseUrl) {
      errors.push('Base URL is required.');
    } else if (!$event.newData.baseUrl.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)) {
      errors.push('Base URL should be a valid URL.');
    }

    if (!!$event.newData.destinationId && $event.newData.destinationId < 0) {
      errors.push('Destination ID should be greater or equal zero.');
    }

    if (!$event.newData.listingSource) {
      errors.push('Listing source is required.')
    }

    if (!!$event.newData.updateTime && !moment.duration($event.newData.updateTime).isValid()) {
      errors.push('Update time is in wrong format. Please use 24 hours format.')
    }
    
    if (errors.length > 0){
      this.toastrService.danger(errors.join('\n'), 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
