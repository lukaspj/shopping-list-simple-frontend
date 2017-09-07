import { IListedItem } from './listed-item';

export interface IList {
  list_id: number;
  status: number;
  items: IListedItem[];
}
