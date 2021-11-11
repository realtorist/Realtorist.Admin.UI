import { Component, Input, OnInit } from "@angular/core";
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent.component';
import { OrderAdditionalActionComponent } from '../../../@common/components/table/orderAdditionalAction.component';
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';
import { MenuItem } from '../../../@core/models/settings/appearance/themeSettings';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, reorderColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';

@Component({
  selector: "ngx-one-column-page-component",
  templateUrl: "./one-column.component.html",
  styleUrls: ["./one-column.component.scss"],
})
export class OneColumnPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  linksDataSource = new LocalDataSource();

  loading = false;
  tableSettings: {};

  constructor(private readonly toastrService: NbToastrService) {
    const self = this;

    this.tableSettings = defaultInlineTableSettings({
      link: stringColumn('Link', undefined, true),
      title: stringColumn('Title', undefined, true),
      action: reorderColumn<MenuItem>(() => this.component.values, 'links', this.linksDataSource)
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
    this.component.values.links = this.component.values.links || [];
    createLocalDataSource(this.linksDataSource, this.component.values, 'links');
  }
}
