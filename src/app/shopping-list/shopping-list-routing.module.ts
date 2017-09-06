import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListOverviewComponent } from './shopping-list-overview/shopping-list-overview.component';
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';

const shoppingListRoutes: Routes = [
  { path: 'shoppinglist', component: ShoppingListOverviewComponent },
  { path: 'shoppinglist/:id', component: ShoppingListDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(shoppingListRoutes),
  ],
  exports: [
    RouterModule
  ],
})
export class ShoppingListRoutingModule { }
