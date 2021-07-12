import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { MediaFile } from "../models/media/mediaFile";
import { PaginationRequest } from "../models/pagination/paginationRequest";
import { PaginationResult } from "../models/pagination/paginationResult";

export abstract class  IMediaApi {
    abstract getMedia(request: PaginationRequest): Observable<PaginationResult<MediaFile>>;
    abstract uploadFile(files: File[]): Observable<MediaFile[]>;
    abstract deleteFile(id: string): Observable<HttpResponse<any>>;
}