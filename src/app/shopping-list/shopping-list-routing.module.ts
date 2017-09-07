import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';

export const _shoppingListRoutes: Routes = [
  {
    path: 'shopping-list',
    children: [
      {
        path: 'items',
        loadChildren: () => ItemsModule
      },
      {
        path: 'lists',
        loadChildren: () => ListsModule
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
