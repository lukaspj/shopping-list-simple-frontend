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

  convert(from, to, amount: number): Observable<number> {
    return new Observable(observer => {
      let handled = false;
      if (from === to) {
        observer.next(amount);
        handled = true;
      } else {
        if (from === 'kg') {
          amount *= 1000;
          from = 'g';
        }

        if (from === 'g') {
          if (to === 'g') {
            observer.next(amount);
            handled = true;
          } else if (to === 'kg') {
            observer.next(amount / 1000);
            handled = true;
          }
        }
      }
      if (!handled) {
        observer.error();
      }
      observer.complete();
    });
  }
}
