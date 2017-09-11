import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IList } from '../models/list';
import { environment } from '../../../environments/environment';

@Injectable()
export class ListService {

  constructor(
    private _http: HttpClient
  ) { }

  getList(id): Observable<IList> {
    return this._http.get<IList[]>(environment.serviceUrls.lists.get)
      .catch(this.handleError)
      .map(lists => lists.find(list => list.list_id === id));
  }

  getLists(): Observable<IList[]> {
    return this._http.get<IList[]>(environment.serviceUrls.lists.getAll)
      .catch(this.handleError);
  }

  createList() {
    return this._http.post(environment.serviceUrls.lists.create, {})
      .catch(this.handleError);
  }

  deleteList(list: IList) {
    return this._http.post(environment.serviceUrls.lists.delete, { id: list.list_id })
      .catch(this.handleError);
  }
  updateList(list: IList) {
    console.log('Updating list: ' + JSON.stringify(list));
    return this._http.post(environment.serviceUrls.lists.update, {
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
