import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';

// This is needed for AOT to work, as we are lazy-loading the modules below
const dynamically_loaded_modules = [
  ItemsModule,
  ListsModule
];


export const _shoppingListRoutes: Routes = [
  {
    path: 'shopping-list',
    children: [
      {
        path: 'items',
        loadChildren: './items/items.module#ItemsModule'
      },
      {
        path: 'lists',
        loadChildren: './lists/lists.module#ListsModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(_shoppingListRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule { }
