import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IBlogApi } from "../abstractions/blog.api";
import { Post } from "../models/blog/post";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class BlogApi extends IBlogApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/blog/';
    private readonly postsApiBaseUrl = this.apiBaseUrl + 'posts/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    getPost(id: string): Observable<Post> {
        return this.httpClient.get<Post>(this.postsApiBaseUrl + id);
    }

    getCategories(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.apiBaseUrl + 'categories');
    }

    getTags(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.apiBaseUrl + 'tags');
    }

    deletePost(id: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete<HttpResponse<any>>(this.postsApiBaseUrl + id);
    }

    deleteComment(postId: string, commentId: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete<HttpResponse<any>>(`${this.postsApiBaseUrl}${postId}/comments/${commentId}`);
    }

    updatePost(postId: string, post: Post): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(this.postsApiBaseUrl + postId, post);
    }

    addPost(post: Post): Observable<string> {
        return this.httpClient.put<string>(this.postsApiBaseUrl, post);
    }

    isLinkInUse(link: string, idsToExclude: string[]): Observable<boolean> {
        return this.httpClient.post<boolean>(this.postsApiBaseUrl + 'link/check?link=' + encodeURIComponent(link), idsToExclude);
    }
}