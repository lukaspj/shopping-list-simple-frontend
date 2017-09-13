import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRecipe } from '../../models/recipe';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IRecipeIngredient } from '../../models/recipe-ingredient';
import { RecipeIngredientService } from '../../services/recipe-ingredient.service';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  recipe: IRecipe;
  recipeIngredients: IRecipeIngredient[];
  ingredients: IIngredient[];
  private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService,
    private _ingredientService: IngredientService,
    private _recipeIngredientService: RecipeIngredientService
  ) { }

  ngOnInit() {
    this._ingredientService.list()
      .subscribe(ingredients => this.ingredients = ingredients);
    this.sub = this._route.params.subscribe(params => {
      const id = +params['id'];
      this._recipeService.get(id)
        .subscribe(ingredient => this.recipe = ingredient);
      this._recipeIngredientService.listFor(id)
        .subscribe(recipeIngredients => this.recipeIngredients = recipeIngredients);
    });
  }

  getIngredient(id) {
    return this.ingredients.find(x => x.id === id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private delete(): void {
    this._recipeService.delete(this.recipe)
      .subscribe(res => {
        this._router.navigate(['/recipes']);
      });
  }
}
