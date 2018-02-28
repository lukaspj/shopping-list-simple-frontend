import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../models/recipe';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DjangoListResponse } from '../models/django-response';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeSearchService {

  constructor(
    private _http: HttpClient,
  ) { }

  search(term: string): Observable<IRecipe[]> {
    return this._http.get<DjangoListResponse<IRecipe>>(environment.serviceUrls.recipes.search_name_contains(term))
      .map(x => x.results)
      .catch(this.handleError);
  }
  /*
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
  }*/

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in RecipeSearchService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
