import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientUnitService } from '../../services/ingredient-unit.service';
import { IIngredientUnit } from '../../models/ingredient-unit';
import { IRecipeIngredient } from '../../models/recipe-ingredient';
import { IRecipe } from '../../models/recipe';

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
    const recipe: IRecipe = {
      id: null,
      created: null,
      name: value.name,
      description: value.description,
      steps: value.steps,
      image: value.image,
      ingredients: this.recipeIngredients
    };
    this._recipeService.create(recipe)
      .subscribe(res => {
        if (res.name && res.name === 'error') {
          console.log(res);
        } else {
          this._router.navigate([ '/recipes' ]);
        }
      });
  }

  onSubmitNewIngredient(e) {
    const value = this.newIngredientForm.value;
    const recipeIngredient = this.recipeIngredients.find(x => x.ingredient === +value.ingredient);
    if (recipeIngredient) {
      this._ingredientUnitService.convert(value.unit, recipeIngredient.unit, +value.amount)
        .subscribe(amount => recipeIngredient.amount += amount);
    } else {
      this.recipeIngredients.push({
        recipe: null,
        ingredient: +value.ingredient,
        amount: +value.amount,
        unit: value.unit
      });
    }
  }

  getIngredient(id) {
    return this.ingredients.find(x => x.id === id);
  }

  removeIngredient(id) {
    this.recipeIngredients = this.recipeIngredients.filter(x => x.ingredient !== id);
  }
}
