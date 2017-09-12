import { Component, OnDestroy, OnInit } from '@angular/core';
import { IIngredient } from '../../models/ingredient';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../../services/ingredient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  ingredientForm: FormGroup;
  ingredient: IIngredient;
  private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ingredientService: IngredientService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredientForm = this._formBuilder.group({
      name: [ '', Validators.required ],
      description: '',
      image: '',
      estprice: ''
    });
    this.sub = this._route.params.subscribe(params => {
      const id = +params['id'];
      this._ingredientService.get(id)
        .subscribe(ingredient => {
          this.ingredient = ingredient;
          this.ingredientForm.setValue({
            name: this.ingredient.name,
            description: this.ingredient.description,
            image: this.ingredient.image,
            estprice: this.ingredient.estprice
          });
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    const value = this.ingredientForm.value;
    this._ingredientService.update(this.ingredient.id, value.name, value.description, value.image, value.estprice)
      .subscribe(res => {
        if (res) {
          console.log(res);
        } else {
          this._router.navigate([ '/ingredients', this.ingredient.id ]);
        }
      });
  }
}
