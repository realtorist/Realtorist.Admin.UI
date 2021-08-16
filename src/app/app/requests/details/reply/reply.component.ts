import { Component, Input } from "@angular/core";
import { Store } from '@ngrx/store';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { CustomerRequestInformation } from "../../../../@core/models/requests/customerRequestInformation";
import { CustomerRequestReply } from "../../../../@core/models/requests/customerRequestReply";
import { Profile } from '../../../../@core/models/user/profile';
import { AppState } from '../../../../@store/appStore';
import { selectProfile } from '../../../../@store/selectors/user.selector';

@Component({
  selector: "ngx-customer-request-reply",
  templateUrl: "./reply.component.html",
  styleUrls: ["./reply.component.scss"],
})
export class CustomerRequestReplyComponent {
  @Input() reply: CustomerRequestReply;
  @Input() request: CustomerRequestInformation;

  profile$: Observable<Profile>;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.profile$ = this.store.select(selectProfile);
  }

  getFormattedTime(time: moment.Moment) {
    return time.format("dddd, MMMM Do YYYY, h:mm:ss a");
  } 
}
