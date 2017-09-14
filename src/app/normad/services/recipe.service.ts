import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../models/recipe';
import { DjangoListResponse } from '../models/django-response';

@Injectable()
export class RecipeService {

  constructor(
    private _http: HttpClient
  ) { }

  list(): Observable<IRecipe[]> {
    return this._http.get<DjangoListResponse<IRecipe>>(environment.serviceUrls.recipes.list)
      .map(x => x.results)
      .catch(this.handleError);
  }

  latest(limit) {
    return this._http.get<DjangoListResponse<IRecipe>>(environment.serviceUrls.recipes.latest(limit))
      .catch(this.handleError);
  }

  get(id) {
    return this._http.get<IRecipe>(environment.serviceUrls.recipes.get(id))
      .catch(this.handleError);
  }

  delete(recipe) {
    return this._http.delete(environment.serviceUrls.recipes.delete(recipe.id))
      .catch(this.handleError);
  }

  create(recipe: IRecipe) {
    return this._http.post<IRecipe>(environment.serviceUrls.recipes.create, recipe)
      .catch(this.handleError);
  }

  update(recipe: IRecipe) {
    return this._http.put<IRecipe>(environment.serviceUrls.recipes.update(recipe.id), recipe)
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in RecipeService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
