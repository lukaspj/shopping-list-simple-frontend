import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingItemCreateComponent } from './shopping-item-create/shopping-item-create.component';
import { ShoppingItemRoutingModule } from './shopping-item-routing.module';
import { ShoppingItemListComponent } from './shopping-item-list/shopping-item-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingItemService } from './shopping-item.service';

@NgModule({
  imports: [
    CommonModule,
    ShoppingItemRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ ShoppingItemCreateComponent, ShoppingItemListComponent ],
  providers: [ ShoppingItemService ]
})
export class ShoppingItemModule { }
