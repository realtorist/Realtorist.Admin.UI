import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { Observable, of } from "rxjs";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { Post } from "../../../../@core/models/blog/post";

@Component({
  selector: "ngx-post-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class PostAddComponent implements OnInit {
  post: Post = {
    category: '',
    id: '',
    image: '',
    link: '',
    title: '',
    subTitle: '',
    publishDate: moment(),
    tags: [],
    text: '',
    views: 0,
    commentsCount: 0
  };

  post$: Observable<Post> = of(this.post);

  constructor() {}

  ngOnInit(): void {}
}
