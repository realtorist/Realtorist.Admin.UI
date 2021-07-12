import { AfterViewInit, Component } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { environment } from "../../../../environments/environment";
import { ConfirmDeleteDialogComponent } from "../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { IDataSourceProvider } from "../../../@core/abstractions/dataSourceProvider";
import { IPagesApi } from "../../../@core/abstractions/pages.api";
import { apiServerUrl } from '../../../@core/implementations/serverUrl';
import { PageListModel } from "../../../@core/models/pages/pageListModel";
import { PagesAdditionalActionComponent } from "./additionalAction.component";

@Component({
  selector: "ngx-pages-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class PagesListComponent implements AfterViewInit {
  settings = {};

  source: DataSource;

  constructor(
    private dataSourceProvider: IDataSourceProvider,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: IPagesApi
  ) {
    this.source = this.dataSourceProvider.getDataSourceForTable('pages');
    
    const self = this;
    this.settings = {
      mode: "external",
      hideSubHeader: true,
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
      },
      columns: {
        title: {
          title: "Title",
          type: "html",
          valuePrepareFunction: (cell, row) => `<a target="_blank" href="${apiServerUrl()}/pages/${row.link}">${row.title}</a>`,
        },
        views: {
          title: "Views",
          type: "string",
        },
        id: {
          title: "Actions",
          type: "custom",
          sort: false,
          renderComponent: PagesAdditionalActionComponent,
          onComponentInitFunction(instance) {
            instance.delete.subscribe((row) => {
              self.onDelete(row);
            });
          },
        },
      },
    };
  }

  ngAfterViewInit(): void {}

  onDelete(page: PageListModel): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `page '${page.title}'`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.deletePage(page.id).subscribe((_) => {
            this.toastrService.success(
              `Page '${page.title}' was deleted`,
              "Page deleted"
            );

            this.source.refresh();
          });
        }
      });
  }
}
