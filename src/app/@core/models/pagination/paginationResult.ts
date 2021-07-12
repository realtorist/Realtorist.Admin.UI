export interface PaginationResult<T> {
    totalRecords: number;
    totalPages: number;
    offset: number;
    limit: number;
    currentPage: number;
    recordsReturned: number;
    results: T[];
}