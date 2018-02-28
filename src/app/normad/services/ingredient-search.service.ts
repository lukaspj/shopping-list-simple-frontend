import { Injectable } from '@angular/core';
import { IIngredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IngredientService } from './ingredient.service';
import {DjangoListResponse} from "../models/django-response";

@Injectable()
export class IngredientSearchService {

  constructor(
    private _http: HttpClient,
  ) { }

  search(term: string): Observable<IIngredient[]> {
    return this._http.get<DjangoListResponse<IIngredient>>(environment.serviceUrls.ingredients.search_name_contains(term))
      .map(x => x.results)
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in IngredientSearchService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
