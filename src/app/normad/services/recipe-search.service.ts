import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from './recipe.service';
import { IRecipe } from '../models/recipe';

@Injectable()
export class RecipeSearchService {

  private _cachedRecipes: IRecipe[];

  constructor(
    private _recipeService: RecipeService
  ) { }

  search(term: string): Observable<IRecipe[]> {
    const lower_term = term.toLocaleLowerCase();
    return this.updateCacheIfNecessary()
      .map(recipes => {
        return term ? recipes.filter(recipe => recipe.name.toLocaleLowerCase().indexOf(lower_term) !== -1)
            .sort((a, b) => a.name.toLocaleLowerCase().indexOf(lower_term) < b.name.toLocaleLowerCase().indexOf(lower_term) ? -1 : 1)
          : recipes;
      });
  }

  private updateCacheIfNecessary(): Observable<IRecipe[]> {
    const cacheOutdated = true;
    if (cacheOutdated) {
      return new Observable<IRecipe[]>(observer => {
        this._recipeService.list()
          .subscribe(ingredients => {
            this._cachedRecipes = ingredients;
            observer.next(this._cachedRecipes);
            observer.complete();
          });
      });
    } else {
      return new Observable<IRecipe[]>(observer => {
        observer.next(this._cachedRecipes);
        observer.complete();
      });
    }
  }
}
