import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../../models/recipe';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RecipeSearchService } from '../../services/recipe-search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {AuthenticationService} from "../../services/auth/authentication.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})
export class ListComponent implements OnInit {

  recipes: Observable<IRecipe[]>;
  private searchTerms = new BehaviorSubject<string>('');
  isAdmin: boolean;

  constructor(
    private _recipeSearchService: RecipeSearchService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.recipes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this._recipeSearchService.search(term));
    this._authenticationService.isAdmin()
      .subscribe(x => this.isAdmin = x);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
