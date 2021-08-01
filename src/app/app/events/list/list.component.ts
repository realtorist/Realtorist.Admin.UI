import { AfterViewInit, Component } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { ConfirmDeleteDialogComponent } from "../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { LargeAccordionMessageComponent } from '../../../@common/components/table/largeAccordionMessage.component';
import { IDataSourceProvider } from "../../../@core/abstractions/dataSourceProvider";
import { IEventsApi } from '../../../@core/abstractions/events.api';
import { EnumDisplayMap } from "../../../@core/models/enumDisplayMap";
import { EventLevel } from '../../../@core/models/events/eventLevel';
import { EventType } from '../../../@core/models/events/eventType';

@Component({
  selector: "ngx-events-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class EventsListComponent implements AfterViewInit {
  settings = {};

  source: DataSource;

  constructor(
    private dataSourceProvider: IDataSourceProvider,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: IEventsApi
  ) {
    this.source = this.dataSourceProvider.getDataSourceForTable('events');
    
    const self = this;
    this.settings = {
      mode: "external",
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
      },
      columns: {
        level: {
          title: 'Event Level',
          type: "string",
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: Object.values(EventLevel)
                .filter(key => typeof(key) === 'number')
                .map(key => ({ value: key, title: EnumDisplayMap.EventLevel[key]}))
            },
          },
          valuePrepareFunction: (cell: EventLevel, row) => EnumDisplayMap.EventLevel[cell]
        },
        type: {
          title: 'Event Type',
          type: "string",
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: Object.values(EventType)
                .filter(key => typeof (key) === 'string')
                .map(key => ({ value: key, title: EnumDisplayMap.EventType[key] }))
            },
          },
          valuePrepareFunction: (cell: EventType, row) => EnumDisplayMap.EventType[cell] || cell
        },
        createdAt: {
          title: "Created at",
          type: "text",
          sortDirection: 'desc',
          filter: false,
          valuePrepareFunction: function (cell: moment.Moment, row) {
            return cell.format("dddd, MMMM Do YYYY, h:mm:ss a");
          },
        },
        title: {
          title: "Title",
          type: "string",
        },
        message: {
          title: "Message",
          type: "custom",
          renderComponent: LargeAccordionMessageComponent,
        }
      }
    };
  }

  ngAfterViewInit(): void {}

  deletaAllEvents(): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `all events`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.deleteAll().subscribe((count) => {
            this.toastrService.success(
              `Total ${count} events were deleted`,
              "Events deleted"
            );

            this.source.refresh();
          });
        }
      });
  }
}
