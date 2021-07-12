import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { NumberCellEditComponent } from '../../../../@common/components/table/numberCellEditComponent';
import { Parking } from '../../../../@core/models/listings/details/parking';
import { Listing } from '../../../../@core/models/listings/listing';
import { ParkingType } from '../../../../@core/models/listings/lookups/parkingType';
import { ConfirmObject } from '../../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, enumColumn, enumValuePrepareFunction, filterEditorForEnum, numberColumn } from '../../../../@core/models/smartTable/inlineTableSettings';

@Component({
  selector: "ngx-listing-edit-parking",
  templateUrl: "./parking.component.html",
  styleUrls: ["./parking.component.scss"],
})
export class ListingEditParkingComponent implements OnInit {
  @Input() listing: Listing;

  parkingSpacesSource = new LocalDataSource;

  constructor(private readonly toastrService: NbToastrService) { }

  ngOnInit(): void {
    createLocalDataSource(this.parkingSpacesSource, this.listing, 'parkingSpaces');
  }

  parkingTableSettings = defaultInlineTableSettings({
    name: enumColumn('Type', 'ParkingType'),
    spaces: numberColumn('Spaces'),
  });

  parkingConfirm = ($event: ConfirmObject<Parking>) => {
    if (!$event.newData.name) {
      this.toastrService.danger('Parking type is required.', 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
