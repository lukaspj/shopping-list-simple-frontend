import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NormadRoutingModule } from './normad-routing.module';
import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';
import { IngredientSearchService } from './services/ingredient-search.service';
import { RecipeSearchService } from './services/recipe-search.service';
import { IngredientUnitService } from './services/ingredient-unit.service';
import { RecipeCardComponent } from './home/recipe-card/recipe-card.component';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    UtilityModule,
    NormadRoutingModule
  ],
  declarations: [
    HomeComponent,
    RecipeCardComponent
  ],
  exports: [
    NormadRoutingModule
  ],
  providers: [
    IngredientService,
    IngredientSearchService,
    IngredientUnitService,
    RecipeService,
    RecipeSearchService
  ]
})
export class NormadModule { }
