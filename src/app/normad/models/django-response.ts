export interface DjangoListResponse<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}

export interface DjangoOptions {
  name: string;
  description: string;
  renders: string;
  parses: string;
  actions: any;
}
