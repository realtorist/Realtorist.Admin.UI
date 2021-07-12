import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "../models/blog/post";

export abstract class  IBlogApi {
    abstract getPost(id: string): Observable<Post>;
    abstract getCategories(): Observable<string[]>;
    abstract getTags(): Observable<string[]>;
    abstract deletePost(id: string): Observable<HttpResponse<any>>;
    abstract deleteComment(postId: string, commentId: string): Observable<HttpResponse<any>>;
    abstract updatePost(postId: string, post: Post): Observable<HttpResponse<any>>;
    abstract addPost(post: Post): Observable<string>;
}