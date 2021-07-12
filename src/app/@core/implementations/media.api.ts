import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IMediaApi } from "../abstractions/media.api";
import { MediaFile } from "../models/media/mediaFile";
import { PaginationRequest, paginationRequestToHttpParams } from "../models/pagination/paginationRequest";
import { PaginationResult } from "../models/pagination/paginationResult";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class MediaApi extends IMediaApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/media/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }
    
    getMedia(request: PaginationRequest): Observable<PaginationResult<MediaFile>> {
        return this.httpClient.get<PaginationResult<MediaFile>>(this.apiBaseUrl, { params: paginationRequestToHttpParams(request) });
    }

    uploadFile(files: File[]): Observable<MediaFile[]> {
        const formData = new FormData();
        files.forEach((item, index) => formData.append('file-' + index, item, item.name));
        
        return this.httpClient.post<MediaFile[]>(this.apiBaseUrl, formData);
    }

    deleteFile(id: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete<HttpResponse<any>>(this.apiBaseUrl + id);
    }
}