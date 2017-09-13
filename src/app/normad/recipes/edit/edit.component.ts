import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRecipeIngredient } from '../../models/recipe-ingredient';
import { IIngredientUnit } from '../../models/ingredient-unit';
import { IIngredient } from '../../models/ingredient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RecipeIngredientService } from '../../services/recipe-ingredient.service';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientUnitService } from '../../services/ingredient-unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IRecipe } from '../../models/recipe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  recipe: IRecipe;
  recipeForm: FormGroup;
  newIngredientForm: FormGroup;
  ingredients: IIngredient[];
  units: IIngredientUnit[];
  recipeIngredients: IRecipeIngredient[];
  private sub: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _recipeService: RecipeService,
    private _recipeIngredientService: RecipeIngredientService,
    private _ingredientService: IngredientService,
    private _ingredientUnitService: IngredientUnitService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.recipeForm = this._formBuilder.group({
      name: [ '', Validators.required ],
      description: '',
      image: '',
      steps: ''
    });
    this.newIngredientForm = this._formBuilder.group({
      ingredient: [ '', Validators.required ],
      unit: [ '', Validators.required ],
      amount: [ '',  Validators.required ]
    });

    this.sub = this._route.params.subscribe(params => {
      const id = +params['id'];
      this._recipeService.get(id)
        .subscribe(recipe => {
          this.recipe = recipe;
          this.recipeForm.setValue({
            name: this.recipe.name,
            description: this.recipe.description,
            image: this.recipe.image,
            steps: this.recipe.steps
          });
        });
      this._recipeIngredientService.listFor(id)
        .subscribe(recipeIngredients => this.recipeIngredients = recipeIngredients);
    });
    this._ingredientService.list()
      .subscribe(ingredients => this.ingredients = ingredients);
    this._ingredientUnitService.list()
      .subscribe(units => this.units = units);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    this._recipeService.update({
      id: this.recipe.id,
      steps: value.steps,
      description: value.description,
      name: value.name,
      image: value.image,
      ingredients: null,
      created_at: null
    })
      .subscribe(res => {
        if (res && res.name && res.name === 'error') {
          console.log(res);
        } else {
          this._router.navigate([ '/recipes' ]);
        }
      });
  }

  onSubmitNewIngredient(e) {
    const value = this.newIngredientForm.value;
    let recipeIngredient: IRecipeIngredient = this.recipeIngredients.find(x => x.ingredient_id === +value.ingredient);
    if (recipeIngredient) {
      this._ingredientUnitService.convert(value.unit, recipeIngredient.unit, +value.amount)
        .subscribe(amount => {
          recipeIngredient.amount += amount;
          this._recipeIngredientService.update(recipeIngredient)
            .subscribe(() => recipeIngredient.amount += amount);
          recipeIngredient.amount -= amount;
        });
    } else {
      recipeIngredient = {
        recipe_id: this.recipe.id,
        ingredient_id: +value.ingredient,
        amount: +value.amount,
        unit: value.unit
      };
      this._recipeIngredientService.create(recipeIngredient)
        .subscribe(() => this.recipeIngredients.push(recipeIngredient));
    }
  }

  getIngredient(id) {
    return this.ingredients.find(x => x.id === id);
  }

  removeIngredient(id) {
    const recipeIngredient = this.recipeIngredients.find(x => x.ingredient_id === id);
    this._recipeIngredientService.delete(recipeIngredient)
      .subscribe(() =>
        this.recipeIngredients = this.recipeIngredients.filter(x => x.ingredient_id !== id)
      );
  }
}
