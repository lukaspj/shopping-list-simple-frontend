export interface DjangoListResponse<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}
