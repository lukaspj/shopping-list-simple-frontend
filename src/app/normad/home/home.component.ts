import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestRecipes: IRecipe[];

  constructor(
    private _recipeService: RecipeService
  ) { }

  ngOnInit() {
    this._recipeService.latest(5)
      .subscribe(latestRecipes => this.latestRecipes = latestRecipes);
  }
}
