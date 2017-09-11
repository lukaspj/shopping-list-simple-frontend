import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _ingredientService: IngredientService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.ingredientForm = this._formBuilder.group({
      name: [ '', Validators.required ],
      description: '',
      image: '',
      estprice: ''
    });
  }

  onSubmit() {
    const value = this.ingredientForm.value;
    this._ingredientService.create(value.name, value.description, value.image, value.estprice)
      .subscribe(res => {
        if (res) {
          console.log(res);
        } else {
          this._router.navigate([ '/ingredients' ]);
        }
      });
  }
}
