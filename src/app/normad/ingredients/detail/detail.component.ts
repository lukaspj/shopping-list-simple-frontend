import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IIngredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  ingredient: IIngredient;
  private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ingredientService: IngredientService
  ) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      const id = +params['id'];
      this._ingredientService.get(id)
        .subscribe(ingredient => this.ingredient = ingredient);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private delete(): void {
    this._ingredientService.delete(this.ingredient)
      .subscribe(res => {
        this._router.navigate(['/ingredients']);
      });
  }
}
