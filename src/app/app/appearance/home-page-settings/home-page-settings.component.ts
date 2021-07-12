import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { DragulaService } from 'ng2-dragula';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { HomePageSettings } from '../../../@core/models/settings/appearance/homePageSettings';
import { PageComponentsTypesLabels, PageComponentsTypes, PageComponent } from '../../../@core/models/settings/appearance/pageComponent';
import { AppearanceSettingTypes } from '../../../@core/models/settings/settingTypes';


@Component({
  selector: "ngx-home-page-settings",
  templateUrl: "./home-page-settings.component.html",
  styleUrls: ["./home-page-settings.component.scss"],
})
export class HomePageSettingsComponent implements OnInit, OnDestroy {

  settings: HomePageSettings;

  loading = false;

  homePageComponentsTypes = PageComponentsTypes;
  homePageComponentsTypesLabels = PageComponentsTypesLabels;

  availableComponents: PageComponent[] = Object.keys(PageComponentsTypes)
    .map(key => ({
      type: key,
      values: {}
    }));

  constructor(
    private toastrService: NbToastrService,
    private dragulaService: DragulaService,
    private readonly api: ISettingsApi
  ) {}

  ngOnInit(): void {
    this.dragulaService.createGroup('HomePageComponets', {
      copy: (el, source) => {
        return source.id === 'left';
      },
      copyItem: (component: PageComponent) => {
        return {
          type: component.type,
          values: {}
        };
      },
      moves: (el, container, handle) => {
        return handle.className && handle.className.indexOf('handle') >= 0;
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      }
    });

    this.api.getSetting<HomePageSettings>(AppearanceSettingTypes.HomePageSettings)
      .subscribe(settings => {
        this.settings = settings || {} as HomePageSettings;
        this.settings.components = this.settings.components || [];
      });
  }

  ngOnDestroy() {
    this.dragulaService.destroy('HomePageComponets');
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(AppearanceSettingTypes.HomePageSettings, this.settings).subscribe((res) => {
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

  removeHomePageComponent(component: PageComponent) {
    this.settings.components.splice(this.settings.components.indexOf(component), 1);
  }
}
