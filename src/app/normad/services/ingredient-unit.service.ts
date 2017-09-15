import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IIngredientUnit } from '../models/ingredient-unit';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DjangoOptions } from '../models/django-response';
import { environment } from '../../../environments/environment';

@Injectable()
export class IngredientUnitService {

  constructor(
    private _http: HttpClient
  ) { }

  list(): Observable<IIngredientUnit[]> {
    return this._http.options<DjangoOptions>(environment.serviceUrls.recipe_ingredients.options)
      .catch(this.handleError)
      .map(o => {
        // TODO it would be a good idea to make an endpoint for units, rather than receiving it through OPTIONS
        return o.actions.POST.unit.choices.map(unit => {
          return {
            abbr: unit.value,
            name: unit.display_name
          };
        });
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
        observer.error(`Illegal unit, no method for converting '${from}' to '${to}' was found.`);
      }
      observer.complete();
    });
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in IngredientUnitService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
