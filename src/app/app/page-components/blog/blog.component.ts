import { Component, Input, OnInit } from "@angular/core";
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-blog-page-component",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  constructor() {}

  ngOnInit(): void {
    this.component.values.max = this.component.values.max || 6;
  }
}
