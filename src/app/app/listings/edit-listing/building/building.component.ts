import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { EnumDisplayMap } from '../../../../@core/models/enumDisplayMap';
import { Building } from '../../../../@core/models/listings/details/building';
import { Room } from '../../../../@core/models/listings/details/room';
import { Utility } from '../../../../@core/models/listings/details/utility';
import { RoomLevel } from '../../../../@core/models/listings/lookups/roomLevel';
import { RoomType } from '../../../../@core/models/listings/lookups/roomType';
import { UtilityType } from '../../../../@core/models/listings/lookups/utilityType';
import { ConfirmObject } from '../../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, enumColumn, enumValuePrepareFunction, filterEditorForEnum, stringColumn } from '../../../../@core/models/smartTable/inlineTableSettings';

@Component({
  selector: "ngx-listing-edit-building",
  templateUrl: "./building.component.html",
  styleUrls: ["./building.component.scss"],
})
export class ListingEditaBuildingComponent implements OnInit {
  @Input() building: Building;

  roomsSource = new LocalDataSource();
  utilitiesSource = new LocalDataSource();

  enumDisplayMap = EnumDisplayMap;

  constructor(private readonly toastrService: NbToastrService) { }

  ngOnInit(): void {
    createLocalDataSource(this.roomsSource, this.building, 'rooms');
    createLocalDataSource(this.utilitiesSource, this.building, 'utilities');
  }

  utilitiesTableSettings = defaultInlineTableSettings({
    type: enumColumn('Type', 'UtilityType'),
    description: stringColumn('Description'),
  });

  roomsTableSettings = defaultInlineTableSettings({
    type: enumColumn('Type', 'RoomType'),
    level: enumColumn('Level', 'RoomLevel'),
    description: stringColumn('Description'),
    dimension: stringColumn('Dimension'),
  });

  roomsConfirm = ($event: ConfirmObject<Room>) => {
    if (!$event.newData.description && !$event.newData.type && !$event.newData.level && !$event.newData.dimension) {
      this.toastrService.danger('At least one field should be filled in.', 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }

  utilitiesConfirm = ($event: ConfirmObject<Utility>) => {
    if (!$event.newData.description && !$event.newData.type) {
      this.toastrService.danger('At least one field should be filled in.', 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
