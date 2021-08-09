import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import {
  NbToastrService,
} from "@nebular/theme";
import { Store } from '@ngrx/store';
import * as CodeMirror from 'codemirror';
import { DragulaService } from 'ng2-dragula';
import { LocalDataSource } from 'ng2-smart-table';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent';
import { ISettingsApi } from '../../../@core/abstractions/settings.api';
import { ThemeSettings, MenuItem, MenuItemWithChildren } from '../../../@core/models/settings/appearance/themeSettings';
import { AppearanceSettingTypes } from '../../../@core/models/settings/settingTypes';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, reorderColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';
import { loadSiteLinksRequest } from '../../../@store/actions/website.actions';
import { AppState } from '../../../@store/appStore';
import { LinkAutoSuggestEditComponent } from './linkAutoSuggestEditComponent';
import { MenuItemChildrenRenderComponent } from './menuItemChildrenRenderComponent.component';


@Component({
  selector: "ngx-theme-settings",
  templateUrl: "./theme-settings.component.html",
  styleUrls: ["./theme-settings.component.scss"],
})
export class ThemeSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('CssCodeMirror', { static: false }) cssCodeMirror: CodemirrorComponent;

  settings: ThemeSettings;

  footerMenuDataSource = new LocalDataSource();
  headerMenuDataSource = new LocalDataSource();

  loading = false;
  footerMenuTableSettings: {};
  headerMenuTableSettings: {};

  constructor(
    private toastrService: NbToastrService,
    private store: Store<AppState>,
    private readonly api: ISettingsApi
  ) {
    const self = this;

    this.footerMenuTableSettings = defaultInlineTableSettings({
      link: {
        title: 'Link',
        type: 'custome',
        editor: {
          type: 'custom',
          component: LinkAutoSuggestEditComponent
        }
      },
      title: stringColumn('Title', undefined, false),
      action: reorderColumn<MenuItem>(() => this.settings, 'footerMenu', this.footerMenuDataSource)
    });

    this.headerMenuTableSettings = defaultInlineTableSettings({
      link: {
        title: 'Link',
        type: 'custome',
        editor: {
          type: 'custom',
          component: LinkAutoSuggestEditComponent
        }
      },
      title: stringColumn('Title', undefined, false),
      children: {
        type: 'custom',
        filter: false,
        title: 'Children',
        editor: {
          type: 'custom',
          component: EmptyCellEditComponent
        },
        renderComponent: MenuItemChildrenRenderComponent,
      },
      action: reorderColumn<MenuItemWithChildren>(() => this.settings, 'headerMenu', this.headerMenuDataSource)
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadSiteLinksRequest());
    this.api.getSetting<ThemeSettings>(AppearanceSettingTypes.ThemeSettings)
      .subscribe(settings => {
        this.settings = settings || {} as ThemeSettings;
        createLocalDataSource(this.footerMenuDataSource, this.settings, 'footerMenu');
        createLocalDataSource(this.headerMenuDataSource, this.settings, 'headerMenu');

        setTimeout(() => {
          if (this.cssCodeMirror) {
            this.cssCodeMirror.codeMirror.refresh();
            this.cssCodeMirror.codeMirror.on("keyup", function (cm, event) {
              if (!cm.state.completionActive 
                && /^[a-zA-Z0-9_\-@:]$/gi.test(event.key)) {
                CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
              }
            });
          }
        }, 500);
      });
  }

  ngOnDestroy() {
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.updateSetting(AppearanceSettingTypes.ThemeSettings, this.settings).subscribe((res) => {
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

  confirmMenu = ($event: ConfirmObject<MenuItem>, maxItems: number) => {
    if (!$event.data && $event.source.data.length >= maxItems) {
      this.toastrService.danger(`Maximum ${maxItems} menu items are allowed.`, 'Error!');
      $event.confirm.reject();
    }

    const errors: string[] = [];
    if (!$event.newData.link) {
      errors.push('Link is required.');
    }

    if (!$event.newData.title) {
      errors.push('Title is required.')
    }

    if (errors.length > 0) {
      this.toastrService.danger(errors.join('\n'), 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
