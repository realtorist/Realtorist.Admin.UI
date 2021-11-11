import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { ConfirmDeleteDialogComponent } from "../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { SelectFilterWithNullOptionComponent } from '../../../@common/components/table/selectFilterWithNullOptionComponent.component';
import { IDataSourceProvider } from "../../../@core/abstractions/dataSourceProvider";
import { IListingsApi } from "../../../@core/abstractions/listings.api";
import { apiServerUrl } from '../../../@core/implementations/serverUrl';
import { EnumDisplayMap } from "../../../@core/models/enumDisplayMap";
import { PropertyPhoto } from "../../../@core/models/listings/details/propertyPhoto";
import { ListingListModel } from "../../../@core/models/listings/listingListModel";
import { PropertyType } from "../../../@core/models/listings/lookups/propertyType";
import { TransactionType } from "../../../@core/models/listings/lookups/transactionType";
import { filterEditorForStringArray } from '../../../@core/models/smartTable/inlineTableSettings';
import { ListingsAdditionalActionComponent, } from "./additionalAction.component";

@Component({
  selector: "ngx-listings-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListingsListComponent implements OnInit {
  settings: any = {};

  source: DataSource;

  feedTypes: string[] = [];

  constructor(
    private dataSourceProvider: IDataSourceProvider,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: IListingsApi
  ) {
    this.source = this.dataSourceProvider.getDataSourceForTable('listings');
    
    const self = this;
    this.settings = {
      mode: "external",
      //hideSubHeader: true,
      rowClassFunction: (row: {data: ListingListModel}) => (row.data.disabled ? "disabled" : "enabled"),
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
      },
      columns: {
        photos: {
          title: "",
          type: "html",
          filter: false,
          valuePrepareFunction: (cell: PropertyPhoto[], row) => !!cell && cell.length > 0 ? `<a target="_blank" href="${apiServerUrl()}/property/${row.id}"><img src="${cell[0].url}" class="listing-photo"/></a>` : '',
        },
        feedType: {
          title: 'Listing Source',
          type: "string",
          filter: false,
          valuePrepareFunction: (cell: string, row) => cell ?? 'User'
        },
        mlsNumber: {
          title: "MLS #",
          type: "string",
        },
        address: {
          title: "Address",
          type: "html",
          valuePrepareFunction: (cell, row) => `<a target="_blank" href="${apiServerUrl()}/property/${row.id}">${cell} </a>`,
        },
        transactionType: {
          title: "Transaction Type",
          type: "string",
          valuePrepareFunction: (cell, row) => `${!!cell ? EnumDisplayMap.TransactionType[cell] : ''}`,
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: Object.values(TransactionType)
                .filter(key => typeof(key) === 'number')
                .map(key => ({ value: key, title: EnumDisplayMap.TransactionType[key]}))
            },
          },
        },
        propertyType: {
          title: "Property Type",
          type: "string",
          valuePrepareFunction: (cell, row) => `${!!cell ? EnumDisplayMap.PropertyType[cell] : ''}`,
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: Object.values(PropertyType)
                .filter(key => typeof(key) === 'number')
                .map(key => ({ value: key, title: EnumDisplayMap.PropertyType[key]}))
            },
          },
        },
        price: {
          title: "Price",
          type: "string",
          filter: false,
          valuePrepareFunction: (cell: number, row: ListingListModel) => `$${cell + ' ' + (row.pricePerTime ? (EnumDisplayMap.PaymentUnit[row.pricePerTime] || '') : '') + (row.pricePerUnit && EnumDisplayMap.MeasureUnit[row.pricePerUnit] ? ' per ' + EnumDisplayMap.MeasureUnit[row.pricePerUnit] : '')}`,
        },
        lastUpdated: {
          title: "Last updated",
          type: "text",
          sortDirection: 'desc',
          filter: false,
          valuePrepareFunction: function (cell: moment.Moment, row) {
            return cell.format("dddd, MMMM Do YYYY, h:mm:ss a");
          },
        },
        views: {
          title: "Views",
          filter: false,
          type: "string",
        },
        featured: {
          title: "Actions",
          type: "custom",
          sort: false,
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: [
                { value: 'true', title: 'Featured' },
                { value: 'false', title: 'Not featured' }
              ]
            },
          },
          renderComponent: ListingsAdditionalActionComponent,
          onComponentInitFunction(instance) {
            instance.delete.subscribe((row) => {
              self.onDelete(row);
            });
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.api.getFeedTypes()
      .subscribe(feedTypes => {
        this.feedTypes = feedTypes;
        this.settings.columns.feedType.filter = {
          type: "custom",
          component: SelectFilterWithNullOptionComponent,
          config: {
            selectText: "Select...",
            list: [
              { value: null, title: 'User' },
              ...feedTypes
                .map(key => ({
                  value: key,
                  title: key,
                })),
            ],
          },
        };
        this.settings = Object.assign({}, this.settings);
      });
  }

  onDelete(listing: ListingListModel): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `listing at '${listing.address.streetAddress}'`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.deleteListing(listing.id).subscribe((_) => {
            this.toastrService.success(
              `Listing '${listing.address.streetAddress}' was deleted`,
              "Listing deleted"
            );

            this.source.refresh();
          });
        }
      });
  }
}
