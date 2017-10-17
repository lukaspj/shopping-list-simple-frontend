import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsModule } from './ingredients/ingredients.module';
import { HomeComponent } from './home/home.component';
import { RecipesModule } from './recipes/recipes.module';
import { LoginComponent } from './login/login.component';
import {MainComponent} from "./main/main.component";

// This is needed for AOT to work, as we are lazy-loading the modules below
const dynamically_loaded_modules = [
  IngredientsModule,
  RecipesModule
];


export const _normadRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'ingredients',
        loadChildren: './ingredients/ingredients.module#IngredientsModule'
      },
      {
        path: 'recipes',
        loadChildren: './recipes/recipes.module#RecipesModule'
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(_normadRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NormadRoutingModule { }
