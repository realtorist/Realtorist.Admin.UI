import { Component, Input, OnInit } from "@angular/core";
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent';
import { OrderAdditionalActionComponent } from '../../../@common/components/table/orderAdditionalAction.component';
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';
import { MenuItem } from '../../../@core/models/settings/appearance/themeSettings';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, reorderColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';

@Component({
  selector: "ngx-two-columns-page-component",
  templateUrl: "./two-columns.component.html",
  styleUrls: ["./two-columns.component.scss"],
})
export class TwoColumnsPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  leftLinksDataSource = new LocalDataSource();
  rightLinksDataSource = new LocalDataSource();

  loading = false;
  leftLinksTableSettings: {};
  rightLinksTableSettings: {};

  constructor(private readonly toastrService: NbToastrService) {
    const self = this;

    this.leftLinksTableSettings = defaultInlineTableSettings({
      link: stringColumn('Link', undefined, true),
      title: stringColumn('Title', undefined, true),
      action: reorderColumn<MenuItem>(() => this.component.values, 'leftLinks', this.leftLinksDataSource)
    });

    this.rightLinksTableSettings = defaultInlineTableSettings({
      link: stringColumn('Link', undefined, true),
      title: stringColumn('Title', undefined, true),
      action: reorderColumn<MenuItem>(() => this.component.values, 'rightLinks', this.rightLinksDataSource)
    });
  }

  confirm = ($event: ConfirmObject<MenuItem>) => {
    const maxItems = 3;
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

  ngOnInit(): void {
    this.component.values.leftLinks = this.component.values.leftLinks || [];
    this.component.values.rightLinks = this.component.values.rightLinks || [];
    createLocalDataSource(this.leftLinksDataSource, this.component.values, 'leftLinks');
    createLocalDataSource(this.rightLinksDataSource, this.component.values, 'rightLinks');
  }
}
