import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IIngredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IngredientService {

  constructor(
    private _http: HttpClient
  ) { }

  list() {
    return this._http.get<IIngredient[]>(environment.serviceUrls.ingredients.list)
      .catch(this.handleError);
  }

  get(id) {
    return this._http.get<IIngredient>(environment.serviceUrls.ingredients.get(id))
      .catch(this.handleError);
  }

  create(name, description, image, estprice) {
    return this._http.post(environment.serviceUrls.ingredients.create, {
      name: name,
      description: description,
      image: image,
      estprice: estprice
    })
      .catch(this.handleError);
  }

  update(id, name, description, image, estprice) {
    return this._http.post(environment.serviceUrls.ingredients.update, {
      id: id,
      name: name,
      description: description,
      image: image,
      estprice: estprice
    })
      .catch(this.handleError);
  }

  delete(ingredient: IIngredient) {
    return this._http.post(environment.serviceUrls.ingredients.delete, {
      id: ingredient.id,
    })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in IngredientService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
