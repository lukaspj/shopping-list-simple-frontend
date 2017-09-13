import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientUnitService } from '../../services/ingredient-unit.service';
import { IIngredientUnit } from '../../models/ingredient-unit';
import { IRecipeIngredient } from '../../models/recipe-ingredient';
import { RecipeIngredientService } from '../../services/recipe-ingredient.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  recipeForm: FormGroup;
  newIngredientForm: FormGroup;
  ingredients: IIngredient[];
  units: IIngredientUnit[];
  recipeIngredients: IRecipeIngredient[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _recipeService: RecipeService,
    private _recipeIngredientService: RecipeIngredientService,
    private _ingredientService: IngredientService,
    private _ingredientUnitService: IngredientUnitService,
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
    this._ingredientService.list()
      .subscribe(ingredients => this.ingredients = ingredients);
    this._ingredientUnitService.list()
      .subscribe(units => this.units = units);
  }

  onSubmit() {
    const value = this.recipeForm.value;
    this._recipeService.create(value.name, value.description, value.image, value.steps)
      .subscribe(res => {
        if (res.name && res.name === 'error') {
          console.log(res);
        } else {
          for (const recipeIngredient of this.recipeIngredients) {
            recipeIngredient.recipe_id = res.id;
            this._recipeIngredientService.create(recipeIngredient);
          }
          this._router.navigate([ '/recipes' ]);
        }
      });
  }

  onSubmitNewIngredient(e) {
    const value = this.newIngredientForm.value;
    const recipeIngredient = this.recipeIngredients.find(x => x.ingredient_id === +value.ingredient);
    if (recipeIngredient) {
      this._ingredientUnitService.convert(value.unit, recipeIngredient.unit, +value.amount)
        .subscribe(amount => recipeIngredient.amount += amount);
    } else {
      this.recipeIngredients.push({
        recipe_id: -1,
        ingredient_id: +value.ingredient,
        amount: +value.amount,
        unit: value.unit
      });
    }
  }

  getIngredient(id) {
    return this.ingredients.find(x => x.id === id);
  }

  removeIngredient(id) {
    this.recipeIngredients = this.recipeIngredients.filter(x => x.ingredient_id !== id);
  }
}
