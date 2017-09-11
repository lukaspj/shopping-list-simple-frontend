import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NormadRoutingModule } from './normad-routing.module';
import { IngredientService } from './services/ingredient.service';
import { RecipeService } from './services/recipe.service';

@NgModule({
  imports: [
    CommonModule,
    NormadRoutingModule
  ],
  declarations: [HomeComponent],
  exports: [
    NormadRoutingModule
  ],
  providers: [
    IngredientService,
    RecipeService
  ]
})
export class NormadModule { }
