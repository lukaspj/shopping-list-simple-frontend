import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingItemCreateComponent } from './shopping-item-create/shopping-item-create.component';
import { ShoppingItemListComponent } from './shopping-item-list/shopping-item-list.component';

const shoppingItemRoutes: Routes = [
  { path: 'shoppingitem', component: ShoppingItemListComponent },
  { path: 'shoppingitem/create', component: ShoppingItemCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(shoppingItemRoutes)
  ],
  exports: [ RouterModule ]
})
export class ShoppingItemRoutingModule { }
