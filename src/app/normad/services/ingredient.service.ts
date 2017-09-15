import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IIngredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { DjangoListResponse } from '../models/django-response';

@Injectable()
export class IngredientService {

  private _cachedIngredients: IIngredient[];

  constructor(
    private _http: HttpClient
  ) { }

  list(): Observable<IIngredient[]> {
    return this.updateCacheIfNecessary()
      .map(() => this._cachedIngredients);
  }

  get(id): Observable<IIngredient> {
    return this.updateCacheIfNecessary()
      .map(() => this._cachedIngredients.find(x => x.id === id));
  }

  create(name, description, image, estprice) {
    return this._http.post<IIngredient>(environment.serviceUrls.ingredients.create, {
      name: name,
      description: description,
      image: image,
      estprice: estprice
    })
      .do(() => this._cachedIngredients = null)
      .catch(this.handleError);
  }

  update(id, name, description, image, estprice) {
    return this._http.put<IIngredient>(environment.serviceUrls.ingredients.update(id), {
      id: id,
      name: name,
      description: description,
      image: image,
      estprice: estprice
    })
      .do(() => this._cachedIngredients = null)
      .catch(this.handleError);
  }

  delete(ingredient: IIngredient) {
    return this._http.delete(environment.serviceUrls.ingredients.delete(ingredient.id))
      .do(() => this._cachedIngredients = null)
      .catch(this.handleError);
  }

  private updateCacheIfNecessary(): Observable<void> {
    if (this.cacheOutdated()) {
      return new Observable<void>(observer => {
        this._http.get(environment.serviceUrls.ingredients.list)
          .subscribe(resp => {
            console.log(`suserror: `, resp);
          });
        this._http.get<DjangoListResponse<IIngredient>>(environment.serviceUrls.ingredients.list)
          .catch(this.handleError)
          .subscribe(ingredients => {
            this._cachedIngredients = ingredients.results;
            observer.next();
            observer.complete();
          })
        ;
      });
    } else {
      return new Observable<void>(observer => {
        observer.next();
        observer.complete();
      });
    }
  }

  private cacheOutdated(): boolean {
    console.log('cacheOutdated ', !this._cachedIngredients);
    return !this._cachedIngredients;
  }

  private handleError(err: HttpErrorResponse) {
    console.log(`Error in IngredientService, the error is: ${err.message}`);
    return Observable.throw(err.message);
  }
}
