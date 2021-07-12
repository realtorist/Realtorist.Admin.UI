import { HttpParams } from "@angular/common/http"

export enum SortOrder {
    Asc = 0,
    Desc = 0
};

export interface PaginationRequest {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: SortOrder
}

export const paginationRequestToHttpParams = (request: PaginationRequest): HttpParams => {
    let params = new HttpParams();
    if (!!request.page) params = params.append('page', `${request.page}`);
    if (!!request.limit) params = params.append('limit', `${request.limit}`);
    
    if (!!request.sortField) params = params.append('sortField', request.sortField);
    if (!!request.sortOrder) params = params.append('sortField', SortOrder[request.sortOrder]);

    return params;
}