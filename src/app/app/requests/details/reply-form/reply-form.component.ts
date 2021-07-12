import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ICustomerRequestsApi } from "../../../../@core/abstractions/customer-requests.api";
import { CustomerRequest } from "../../../../@core/models/requests/customerRequest";
import { Reply } from "../../../../@core/models/requests/reply";

@Component({
  selector: "ngx-customer-request-reply-form",
  templateUrl: "./reply-form.component.html",
  styleUrls: ["./reply-form.component.scss"],
})
export class CustomerRequestReplyFormComponent {
  @Input() request: CustomerRequest;
  @Output() submitted = new EventEmitter();

  reply: Reply = {
    message: ''
  };
  submitting = false;

  constructor(private readonly api: ICustomerRequestsApi) {
  }

  resetReply() {
    this.reply.message = 'Hello';
  }

  ngOnInit(): void {
  }

  submitReply(form: NgForm) {
    if (!this.reply?.message) return;

    this.submitting = true;
    this.api.reply(this.request.id, this.reply)
      .subscribe(_ => {
        this.submitting = false;
        this.submitted.emit();
        this.resetReply();
        form.resetForm();
      });
  }
}
