import { AfterViewInit, Component } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { environment } from "../../../../environments/environment";
import { ConfirmDeleteDialogComponent } from "../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { ICustomerRequestsApi } from "../../../@core/abstractions/customer-requests.api";
import { IDataSourceProvider } from "../../../@core/abstractions/dataSourceProvider";
import { apiServerUrl } from '../../../@core/implementations/serverUrl';
import { getCustomerRequestTypeDisplayString } from "../../../@core/models/requests/CustomerRequestType";
import { getIAmDisplayString } from "../../../@core/models/requests/IAm";
import { AdditionalActionComponent } from "./additionalAction.component";

@Component({
  selector: "ngx-customer-requests",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements AfterViewInit {
  settings = {};

  source: DataSource;

  constructor(
    private dataSourceProvider: IDataSourceProvider,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: ICustomerRequestsApi
  ) {
    this.source = this.dataSourceProvider.getDataSourceForTable('requests');
    
    const self = this;
    this.settings = {
      mode: "external",
      hideSubHeader: true,
      rowClassFunction: (row) => (row.data.read ? "read" : "unread"),
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
      },
      columns: {
        name: {
          title: "Name",
          type: "string",
        },
        email: {
          title: "Email",
          type: "string",
        },
        phone: {
          title: "Phone",
          type: "string",
        },
        listingId: {
          title: "Listing",
          type: "html",
          valuePrepareFunction: function (cell, row) {
            return row.listingId
              ? `<a target="_blank" href="${apiServerUrl()}/property/details/${row.listingId}">${row.address}</a>`
              : '';
          },
        },
        dateTimeUtc: {
          title: "When",
          type: "text",
          valuePrepareFunction: function (cell: moment.Moment, row) {
            return cell.format("dddd, MMMM Do YYYY, h:mm:ss a");
          },
          sortDirection: 'desc',
        },
        iam: {
          title: "I am",
          type: "text",
          valuePrepareFunction: function (cell, row) {
            return getIAmDisplayString(cell);
          },
        },
        type: {
          title: "Type",
          type: "text",
          valuePrepareFunction: function (cell, row) {
            return getCustomerRequestTypeDisplayString(cell);
          },
        },
        id: {
          title: "Actions",
          type: "custom",
          sort: false,
          renderComponent: AdditionalActionComponent,
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

  markAllAsRead() {
    this.api.markAllAsRead().subscribe((_) => {
      this.source.refresh();
      this.toastrService.success(
        "All customer requests were marked as read",
        "Done!"
      );
    });
  }

  onDelete(row: any): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `request from ${row.name}`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.delete(row.id).subscribe((_) => {
            this.toastrService.success(
              `Request from ${row.name} was deleted`,
              "Request deleted"
            );

            this.source.refresh();
          });
        }
      });
  }
}
