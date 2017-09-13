import { Injectable } from '@angular/core';
import { IIngredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IngredientService } from './ingredient.service';

@Injectable()
export class IngredientSearchService {

  constructor(
    private _ingredientService: IngredientService
  ) { }

  search(term: string): Observable<IIngredient[]> {
    const lower_term = term.toLocaleLowerCase();
    return this._ingredientService.list()
      .map(ingredients => {
        return term ? ingredients.filter(ingredient => ingredient.name.toLocaleLowerCase().indexOf(lower_term) !== -1)
            .sort((a, b) => a.name.toLocaleLowerCase().indexOf(lower_term) < b.name.toLocaleLowerCase().indexOf(lower_term) ? -1 : 1)
          : ingredients;
      });
  }
}
