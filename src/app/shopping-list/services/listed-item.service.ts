import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IListedItem } from '../models/listed-item';
import { Observable } from 'rxjs/Observable';
import { IList } from '../models/list';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ListedItemService {
  constructor(
    private _http: HttpClient
  ) { }

  create(list_id, item_id, amount, notes) {
    return this._http.post(environment.serviceUrls.listed_item.create, {
      list_id: list_id,
      item_id: item_id,
      amount: amount,
      notes: notes
    })
      .catch(this.handleError);
  }

  delete(item: IListedItem) {
    return this._http.post(environment.serviceUrls.listed_item.delete, {
      id: item.list_item_id
    })
      .catch(this.handleError);
  }

  setItemsForList(list: IList) {
    return this._http.get<IListedItem[]>(environment.serviceUrls.listed_item.get(list.list_id))
      .map(items => { list.items = items; return list; });
  }

  setItemsForLists(lists: IList[]) {
    return this._http.get<IListedItem[]>(environment.serviceUrls.listed_item.getAll)
      .map(items => {
        for (let i = 0; i < lists.length; ++i) {
          lists[i].items = items.filter(x => x.list_id === lists[i].list_id);
        }
        return lists;
      });
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error getting shopping-list, error: ${err.message}`);
    return Observable.throw(err.message);
  }
}
