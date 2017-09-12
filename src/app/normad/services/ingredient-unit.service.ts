import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IIngredientUnit } from '../models/ingredient-unit';

@Injectable()
export class IngredientUnitService {

  constructor() { }

  list(): Observable<IIngredientUnit[]> {
    return new Observable(observer => {
      observer.next([
        {
          'abbr': 'g',
          'name': 'grams'
        },
        {
          'abbr': 'kg',
          'name': 'kilograms'
        }
      ]);
      observer.complete();
    });
  }
}
