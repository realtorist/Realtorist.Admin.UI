import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { ConfirmDeleteDialogComponent } from "../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { ICustomerRequestsApi } from "../../../@core/abstractions/customer-requests.api";
import { apiServerUrl } from '../../../@core/implementations/serverUrl';
import { CustomerRequest } from "../../../@core/models/requests/customerRequest";
import { getCustomerRequestTypeDisplayString } from "../../../@core/models/requests/customerRequestType";
import { getIAmDisplayString } from "../../../@core/models/requests/iAm";

@Component({
  selector: "ngx-customer-request",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  request: CustomerRequest;
  getTypeString = getCustomerRequestTypeDisplayString;
  getIamString = getIAmDisplayString;

  serverUrl = apiServerUrl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: ICustomerRequestsApi
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.api
      .get(this.route.snapshot.paramMap.get("id"))
      .subscribe((request) => {
        this.request = request;
        if (!request.read) this.api.markAsRead(request.id, true).subscribe(_ => {});
      });
  }

  getFormattedTime(time: moment.Moment) {
    return time.format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  delete(): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `request from ${this.request.request.name}`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.delete(this.request.id).subscribe((_) => {
            this.toastrService.success(
              `Request from ${this.request.request.name} was deleted`,
              "Request deleted"
            );

            this.router.navigate(['/app/requests'])
          });
        }
      });
  }
}
