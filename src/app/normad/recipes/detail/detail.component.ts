import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRecipe } from '../../models/recipe';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  recipe: IRecipe;
  private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      const id = +params['id'];
      this._recipeService.get(id)
        .subscribe(ingredient => this.recipe = ingredient);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private delete(): void {
    this._recipeService.delete(this.recipe)
      .subscribe(res => {
        this._router.navigate(['/recipes']);
      });
  }
}
