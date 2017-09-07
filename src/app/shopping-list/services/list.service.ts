import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IList } from '../models/list';

@Injectable()
export class ListService {
  private _listServiceUrl = 'http://sample-db-service.flynn.lukasj.org/lists/';

  constructor(
    private _http: HttpClient
  ) { }

  getList(id): Observable<IList> {
    return this._http.get<IList[]>(this._listServiceUrl)
      .catch(this.handleError)
      .map(lists => lists.find(list => list.list_id === id));
  }

  getLists(): Observable<IList[]> {
    return this._http.get<IList[]>(this._listServiceUrl)
      .catch(this.handleError);
  }

  createList() {
    return this._http.post(this._listServiceUrl + 'create', {})
      .catch(this.handleError);
  }

  deleteList(list: IList) {
    return this._http.post(this._listServiceUrl + 'delete', { id: list.list_id })
      .catch(this.handleError);
  }
  updateList(list: IList) {
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
