import { Component, OnInit } from '@angular/core';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.scss'
  ]
})
export class ListComponent implements OnInit {

  ingredients: IIngredient[];

  constructor(
    private _ingredientService: IngredientService
  ) { }

  ngOnInit() {
    this._ingredientService.list()
      .subscribe(ingredients => this.ingredients = ingredients);
  }

}
