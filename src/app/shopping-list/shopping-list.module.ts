import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListOverviewComponent } from './shopping-list-overview/shopping-list-overview.component';
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListService } from './shopping-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LIST_STATUS } from './models';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShoppingListRoutingModule,
    HttpClientModule
  ],
  declarations: [
    ShoppingListOverviewComponent,
    ShoppingListDetailComponent
  ],
  providers: [
    ShoppingListService
  ]
})
export class ShoppingListModule { }
