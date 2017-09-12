import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../models/recipe';

@Injectable()
export class RecipeService {

  constructor(
    private _http: HttpClient
  ) { }

  list() {
    return this._http.get<IRecipe[]>(environment.serviceUrls.recipes.list)
      .catch(this.handleError);
  }

  get(id) {
    return this._http.get<IRecipe>(environment.serviceUrls.recipes.get(id))
      .catch(this.handleError);
  }

  delete(recipe) {
    return this._http.post(environment.serviceUrls.recipes.delete, {
      id: recipe.id
    })
      .catch(this.handleError);
  }

  create(name, description, image, steps) {
    return this._http.post(environment.serviceUrls.recipes.create, {
      name: name,
      description: description,
      image: image,
      steps: steps
    })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in RecipeService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
