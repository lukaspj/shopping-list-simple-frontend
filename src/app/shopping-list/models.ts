export interface IItem {
  item_id: number;
  name: string;
  estprice: number;
}

export interface IListItem {
  list_item_id: number;
  list_id: number;
  item_id: number;
  amount: number;
  notes: string;
}

export interface IItemList {
  list_id: number;
  status: number;
  items: IListItem[];
}

export const LIST_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  DONE: 2
};
