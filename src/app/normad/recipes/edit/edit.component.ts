import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IRecipeIngredient } from '../../models/recipe-ingredient';
import { IIngredientUnit } from '../../models/ingredient-unit';
import { IIngredient } from '../../models/ingredient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
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
export class EditComponent implements OnInit, OnDestroy, AfterViewInit {

  recipe: IRecipe;
  recipeForm: FormGroup;
  newIngredientForm: FormGroup;
  ingredients: IIngredient[];
  units: IIngredientUnit[];
  private sub: Subscription;
  unitErrors: string[];

  constructor(
    private _formBuilder: FormBuilder,
    private _recipeService: RecipeService,
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
    });
    this._ingredientService.list()
      .subscribe(ingredients => this.ingredients = ingredients);
    this._ingredientUnitService.list()
      .subscribe(units => this.units = units);
  }

  ngAfterViewInit() {
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
      ingredients: this.recipe.ingredients,
      created: null
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
    let recipeIngredient: IRecipeIngredient = this.recipe.ingredients.find(x => x.ingredient === +value.ingredient);
    if (recipeIngredient) {
      this._ingredientUnitService.convert(value.unit, recipeIngredient.unit, +value.amount)
        .subscribe(amount => {
          recipeIngredient.amount += amount;
        },
          err => this.unitErrors.push(err));
    } else {
      recipeIngredient = {
        recipe: this.recipe.id,
        ingredient: +value.ingredient,
        amount: +value.amount,
        unit: value.unit
      };
      this.recipe.ingredients.push(recipeIngredient);
    }
  }

  getIngredient(id) {
    return this.ingredients.find(x => x.id === id);
  }

  removeIngredient(id) {
    this.recipe.ingredients = this.recipe.ingredients.filter(x => x.ingredient !== id);
  }
}
