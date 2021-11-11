import { Component, Input, OnInit } from "@angular/core";
import {
  NbDialogRef,
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from 'ng2-smart-table';
import { EmptyCellEditComponent } from '../../../../@common/components/table/emptyCellEditorComponent.component';
import { OrderAdditionalActionComponent } from '../../../../@common/components/table/orderAdditionalAction.component';
import { MenuItem, MenuItemWithChildren } from '../../../../@core/models/settings/appearance/themeSettings';
import { ConfirmObject } from '../../../../@core/models/smartTable/confirmObject';
import { defaultInlineTableSettings, stringColumn } from '../../../../@core/models/smartTable/inlineTableSettings';
import { LinkAutoSuggestEditComponent } from '../linkAutoSuggestEditComponent';

@Component({
  selector: "ngx-menu-children-dialog",
  templateUrl: "./menu-children-dialog.component.html",
  styleUrls: ["./menu-children-dialog.component.scss"],
})
export class MenuChildrenDialogComponent implements OnInit {
  @Input() parent:  MenuItemWithChildren;

  dataSource = new LocalDataSource();
  tableSettings: {};

  constructor(
    private toastrService: NbToastrService,
    private ref: NbDialogRef<MenuChildrenDialogComponent>
  ) {
    const self = this;

    this.tableSettings = defaultInlineTableSettings({
      link: {
        title: 'Link',
        type: 'custome',
        editor: {
          type: 'custom',
          component: LinkAutoSuggestEditComponent
        }
      },
      title: stringColumn('Title', undefined, false),
      action: {
        type: 'custom',
        filter: false,
        editor: {
          type: 'custom',
          component: EmptyCellEditComponent
        },
        renderComponent: OrderAdditionalActionComponent,
        onComponentInitFunction(instance: OrderAdditionalActionComponent<MenuItem>) {
          instance.setArray('children', self.parent)
          instance.down.subscribe((row) => {
            const index = self.parent.children.indexOf(row);
            if (index === self.parent.children.length - 1) return;

            self.parent.children.splice(index + 1, 0, self.parent.children.splice(index, 1)[0]);
            self.dataSource.load(self.parent.children);
          });
          instance.up.subscribe((row) => {
            const index = self.parent.children.indexOf(row);
            if (index === 0) return;

            self.parent.children.splice(index - 1, 0, self.parent.children.splice(index, 1)[0]);
            self.dataSource.load(self.parent.children);
          });
        },
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.load(this.parent.children || []);
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.dataSource.getAll().then(all => {
      this.parent.children = all;
      this.ref.close(true);
    });
  }

  confirmMenu = ($event: ConfirmObject<MenuItem>, maxItems: number, isAdd: boolean) => {
    if (this.dataSource.count() >= (maxItems + (isAdd ? 0 : 1))) {
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
