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
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/auth/authentication.service';
import { UserGuard } from './services/auth/user.guard';

@NgModule({
  imports: [
    CommonModule,
    UtilityModule,
    ReactiveFormsModule,
    NormadRoutingModule
  ],
  declarations: [
    HomeComponent,
    RecipeCardComponent,
    LoginComponent
  ],
  exports: [
    NormadRoutingModule
  ],
  providers: [
    IngredientService,
    IngredientSearchService,
    IngredientUnitService,
    RecipeService,
    RecipeSearchService,
    AuthenticationService,
    UserGuard
  ]
})
export class NormadModule { }
