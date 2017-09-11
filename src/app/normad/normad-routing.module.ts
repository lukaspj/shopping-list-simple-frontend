import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsModule } from './ingredients/ingredients.module';
import { HomeComponent } from './home/home.component';

// This is needed for AOT to work, as we are lazy-loading the modules below
const dynamically_loaded_modules = [
  IngredientsModule
];


export const _normadRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ingredients',
        loadChildren: './ingredients/ingredients.module#IngredientsModule'
      },
      {
        path: '',
        component: HomeComponent
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
