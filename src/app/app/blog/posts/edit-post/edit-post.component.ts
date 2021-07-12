import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbDialogService,
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from "@nebular/theme";
import { Observable } from "rxjs";
import { stringToSlug } from "../../../../@common/helpers/slug";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { Post } from "../../../../@core/models/blog/post";

@Component({
  selector: "ngx-post-edit-form",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class PostEditFormComponent implements OnInit {
  @Input("post") post$: Observable<Post>;
  @Input() isEdit: boolean;

  post: Post;

  postTitle: string;

  loading = false;

  categories$: Observable<string[]>;
  tags$: Observable<string[]>;

  autoGenerateLink = true;

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private toastrService: NbToastrService,
    private readonly api: IBlogApi
  ) {}

  ngOnInit(): void {
    this.post$.subscribe((post) => {
      this.post = post;
      this.postTitle = this.post?.title;
    });

    this.categories$ = this.api.getCategories();
    this.tags$ = this.api.getTags();
  }

  onTitleChange(value: string) {
    if (!this.autoGenerateLink) return;
    this.post.link = stringToSlug(value);
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    const index = this.post.tags.indexOf(tagToRemove.text);
    if (index >= 0) {
      this.post.tags.splice(index, 1);
    }
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.post.tags.push(value);
    }
    input.nativeElement.value = "";
    input.nativeElement.focus();
  }

  getFilteredOptions(options: string[], currentValue: string) {
    if (!currentValue) return options;

    return (options || []).filter(
      (option) =>
        option.toLocaleLowerCase().indexOf(currentValue.toLocaleLowerCase()) >=
        0
    );
  }

  publish(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    if (this.isEdit) {
      this.api.updatePost(this.post.id, this.post).subscribe((res) => {
        this.loading = false;
        this.postTitle = this.post.title;
        this.toastrService.success(
          `Post '${this.post.title}' was successfully saved`,
          "Saved!"
        );
      });
    } else {
      this.api.addPost(this.post).subscribe((id) => {
        this.loading = false;
        this.postTitle = this.post.title;
        this.post.id = id;
        this.isEdit = true;
        window.history.replaceState({}, '',`${this.baseHref}/app/blog/posts/${id}/edit`.replace('//', '/'));
        this.toastrService.success(
          `Post '${this.post.title}' was successfully created`,
          "Saved!"
        );
      });
    }
  }
}
