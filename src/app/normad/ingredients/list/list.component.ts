import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { Subject } from 'rxjs/Subject';
import { IngredientSearchService } from '../../services/ingredient-search.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.scss'
  ]
})
export class ListComponent implements OnInit {

  ingredients: Observable<IIngredient[]>;
  private searchTerms = new BehaviorSubject<string>('');

  constructor(
    private _ingredientSearchService: IngredientSearchService
  ) { }

  ngOnInit() {
    this.ingredients = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this._ingredientSearchService.search(term));
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
