import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { Observable, of } from "rxjs";
import { ListingSource } from "../../../@core/models/listings/enums/listingSource";
import { Listing } from "../../../@core/models/listings/listing";
import { BuildingType } from "../../../@core/models/listings/lookups/buildingType";
import { OwnershipType } from "../../../@core/models/listings/lookups/ownershipType";
import { PropertyType } from "../../../@core/models/listings/lookups/propertyType";
import { TransactionType } from "../../../@core/models/listings/lookups/transactionType";

@Component({
  selector: "ngx-listing-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class ListingAddComponent implements OnInit {
  listing: Listing = {
    id: undefined,
    address: {
    },
    alternateURL: {
    },
    source: ListingSource.Manual,
    ammenitiesNearBy: [],
    description: '',
    disabled: false,
    featured: false,
    features: [],
    lastUpdated: moment(),
    maintenance: {},
    mlsNumber: '',
    ownershipType: OwnershipType.Freehold,
    propertyType: PropertyType.Single_Family,
    transactionType: TransactionType.For_sale,
    additionalRemarks: '',
    parkingSpaceTotal: 0,
    parkingSpaces: [],
    price: 0,
    waterFront: {},
    zoning: {},
    photos: [],
    building: {
      type: [BuildingType.House],
    },
    land: {
    }
  };

  listing$: Observable<Listing> = of(this.listing);

  constructor() {}

  ngOnInit(): void {}
}
