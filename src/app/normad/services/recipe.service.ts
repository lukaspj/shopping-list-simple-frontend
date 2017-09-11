import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipeService {

  constructor(
    private _http: HttpClient
  ) { }

  create(name) {
    return this._http.post(environment.serviceUrls.recipes.create, {
      name: name
    })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in RecipeService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
