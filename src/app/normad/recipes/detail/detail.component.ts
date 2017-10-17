import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRecipe } from '../../models/recipe';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.scss' ]
})
export class DetailComponent implements OnInit, OnDestroy {

  recipe: IRecipe;
  ingredients: IIngredient[];
  private sub: Subscription;
  isAdmin: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService,
    private _ingredientService: IngredientService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._ingredientService.list()
      .subscribe(ingredients => this.ingredients = ingredients);
    this.sub = this._route.params.subscribe(params => {
      const id = +params['id'];
      this._recipeService.get(id)
        .subscribe(ingredient => this.recipe = ingredient);
    });
    this._authenticationService.isAdmin()
      .subscribe(x => this.isAdmin = x);
  }

  getIngredient(id) {
    return this.ingredients.find(x => x.id === id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete(): void {
    if (confirm(`Are you certain you want to delete the recipe: ${this.recipe.name}?`)) {
      this._recipeService.delete(this.recipe)
        .subscribe(res => {
          this._router.navigate([ '/recipes' ]);
        });
    }
  }
}
