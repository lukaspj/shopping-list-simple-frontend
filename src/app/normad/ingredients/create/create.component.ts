import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredientForm = this._formBuilder.group({
      name: [ '', Validators.required ],
      description: '',
      image: '',
      estprice: ''
    });
  }

}
