import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../../models/recipe';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RecipeSearchService } from '../../services/recipe-search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})
export class ListComponent implements OnInit {

  recipes: Observable<IRecipe[]>;
  private searchTerms = new BehaviorSubject<string>('');

  constructor(
    private _ingredientSearchService: RecipeSearchService
  ) { }

  ngOnInit() {
    this.recipes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this._ingredientSearchService.search(term));
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
