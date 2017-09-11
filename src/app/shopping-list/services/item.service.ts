import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IItem } from '../models/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

@Injectable()
export class ItemService {
  constructor(
    private _http: HttpClient
  ) { }

  createItem(name, estprice) {
    return this._http.post(environment.serviceUrls.items.create, {
      name: name,
      estprice: estprice
    })
      .catch(this.handleError);
  }

  deleteItem(item: IItem) {
    return this._http.post(environment.serviceUrls.items.delete, {
      id: item.item_id
    })
      .catch(this.handleError);
  }

  getItems(): Observable<IItem[]> {
    return this._http.get<IItem[]>(environment.serviceUrls.items.getAll)
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in shopping-item.service: ${err.message}`);
    return Observable.throw(err.message);
  }
}
