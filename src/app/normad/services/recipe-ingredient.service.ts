import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IRecipeIngredient } from '../models/recipe-ingredient';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeIngredientService {

  constructor(
    private _http: HttpClient
  ) { }

  create(recipeIngredient: IRecipeIngredient) {
    return this._http.post(environment.serviceUrls.recipe_ingredients.create, recipeIngredient)
      .catch(this.handleError);
  }

  update(recipeIngredient: IRecipeIngredient) {
    return this._http.post(environment.serviceUrls.recipe_ingredients.update, recipeIngredient)
      .catch(this.handleError);
  }

  listFor(id) {
    return this._http.get<IRecipeIngredient[]>(environment.serviceUrls.recipe_ingredients.list_for(id))
      .catch(this.handleError);
  }

  delete(recipeIngredient: IRecipeIngredient) {
    return this._http.post(environment.serviceUrls.recipe_ingredients.delete, recipeIngredient)
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in RecipeService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
