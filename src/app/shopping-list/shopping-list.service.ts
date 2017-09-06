import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IItem, IItemList, IListItem } from './models';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ShoppingListService {
  private _itemServiceUrl = 'http://sample-db-service.flynn.lukasj.org/items/';
  private _listServiceUrl = 'http://sample-db-service.flynn.lukasj.org/lists/';
  private _listItemsServiceUrl = 'http://sample-db-service.flynn.lukasj.org/list_items/';

  constructor(private _http: HttpClient) { }

  getList(id): Observable<IItemList> {
    // TODO there must be a better way, but Observables are confusing. Learn the better way!
    return this._http.get<IItemList[]>(this._listServiceUrl)
      .catch(this.handleError)
      .flatMap(lists => {
        const res = lists.find(list => list.list_id === id);
        return this._http.get<IListItem[]>(this._listItemsServiceUrl + res.list_id)
                    .map(items => { res.items = items; return res; });
      });
  }

  getLists(): Observable<IItemList[]> {
    // TODO there must be a better way, but Observables are confusing. Learn the better way!
    return this._http.get<IItemList[]>(this._listServiceUrl)
      .catch(this.handleError)
      .flatMap(lists => {
        return this._http.get<IListItem[]>(this._listItemsServiceUrl)
          .map(items => {
            for (let i = 0; i < lists.length; ++i) {
              lists[i].items = items.filter(x => x.list_id === lists[i].list_id);
            }
            return lists;
          });
      });
  }

  createList() {
    return this._http.post(this._listServiceUrl + 'create', {})
      .catch(this.handleError);
  }

  deleteList(list: IItemList) {
    return this._http.post(this._listServiceUrl + 'delete', { id: list.list_id })
      .catch(this.handleError);
  }

  getItems(): Observable<IItem[]> {
    return this._http.get<IItem[]>(this._itemServiceUrl)
      .catch(this.handleError);
  }

  createListItem(list_id, item_id, amount, notes) {
    return this._http.post(this._listItemsServiceUrl + 'create', {
      list_id: list_id,
      item_id: item_id,
      amount: amount,
      notes: notes
    })
      .catch(this.handleError);
  }

  deleteListItem(item: IListItem) {
    return this._http.post(this._listItemsServiceUrl + 'delete', {
      id: item.list_item_id
    })
      .catch(this.handleError);
  }

  updateList(list: IItemList) {
    console.log('Updating list: ' + JSON.stringify(list));
    return this._http.post(this._listServiceUrl + 'update', {
      id: list.list_id,
      status: list.status
    })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error getting shopping-list, error: ${err.message}`);
    return Observable.throw(err.message);
  }
}
