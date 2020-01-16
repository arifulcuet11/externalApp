export class Pagination {
  public pageSizes: any;
  public pageIndex: number;
  public pageSize: number;
  public totalCount: number;
  public searchText: string;
  public searchObject: any;
  constructor() {
    this.pageSizes = [2, 5, 10, 25, 100, 200];
    this.pageIndex = 0;
    this.pageSize = 10;
    this.totalCount = 0;
    this.searchText = "";
  }
}

export function buildPaginationUrl(
  routePrefix: string,
  route: string,
  pagination: Pagination,
): string {
    return `${routePrefix}${route}?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&searchText=${pagination.searchText}`;
}
