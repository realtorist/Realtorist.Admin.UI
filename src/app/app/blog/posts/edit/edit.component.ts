import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { Post } from "../../../../@core/models/blog/post";

@Component({
  selector: "ngx-post-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class PostEditComponent implements OnInit {
  post$: Observable<Post>;
  constructor(
    private route: ActivatedRoute,
    private readonly api: IBlogApi
  ) {}

  ngOnInit(): void {
    this.post$ = this.api.getPost(this.route.snapshot.paramMap.get("id"));
  }
}
