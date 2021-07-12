import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { Post } from "../../../../@core/models/blog/post";

@Component({
  selector: "ngx-blog-post-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class PostCommentsComponent implements AfterViewInit {
  postId: string;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private api: IBlogApi
  ) {
    this.postId = this.route.snapshot.params["id"];
    this.api.getPost(this.postId).subscribe(post => this.post = post);
  }

  ngAfterViewInit(): void {}
}
