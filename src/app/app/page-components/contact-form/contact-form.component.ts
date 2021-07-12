import { Component, Input, OnInit } from "@angular/core";
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-contact-form-page-component",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
})
export class ContactFormPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  constructor() {}

  ngOnInit(): void {
  }
}
