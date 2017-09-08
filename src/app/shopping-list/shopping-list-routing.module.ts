import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';

export function loadItemsModule() {
  return ItemsModule;
}
export function loadListsModule() {
  return ListsModule;
}

export const _shoppingListRoutes: Routes = [
  {
    path: 'shopping-list',
    children: [
      {
        path: 'items',
        loadChildren: loadItemsModule
      },
      {
        path: 'lists',
        loadChildren: loadListsModule
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
