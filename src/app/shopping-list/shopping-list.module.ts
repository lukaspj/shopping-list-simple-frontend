import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ListService } from './services/list.service';
import { ItemService } from './services/item.service';
import { ListedItemService } from './services/listed-item.service';

@NgModule({
  imports: [
    CommonModule,
    ShoppingListRoutingModule
  ],
  declarations: [],
  providers: [
    ListService,
    ItemService,
    ListedItemService
  ]
})
export class ShoppingListModule { }
