import { Injectable } from '@angular/core';
import { IIngredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IngredientService } from './ingredient.service';

@Injectable()
export class IngredientSearchService {

  private _cachedIngredients: IIngredient[];

  constructor(
    private _ingredientService: IngredientService
  ) { }

  search(term: string): Observable<IIngredient[]> {
    console.log('Searching for term: ' + term);
    const lower_term = term.toLocaleLowerCase();
    return this.updateCacheIfNecessary()
      .map(ingredients => {
        return term ? ingredients.filter(ingredient => ingredient.name.toLocaleLowerCase().indexOf(lower_term) !== -1)
            .sort((a, b) => a.name.toLocaleLowerCase().indexOf(lower_term) < b.name.toLocaleLowerCase().indexOf(lower_term) ? -1 : 1)
          : ingredients;
      });
  }

  private updateCacheIfNecessary(): Observable<IIngredient[]> {
    const cacheOutdated = true;
    if (cacheOutdated) {
      return new Observable<IIngredient[]>(observer => {
        this._ingredientService.list()
          .subscribe(ingredients => {
            this._cachedIngredients = ingredients;
            observer.next(this._cachedIngredients);
            observer.complete();
          });
      });
    } else {
      return new Observable<IIngredient[]>(observer => {
        observer.next(this._cachedIngredients);
        observer.complete();
      });
    }
  }
}
