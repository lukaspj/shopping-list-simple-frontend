import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsCreateComponent } from './items-create/items-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItemsRoutingModule
  ],
  declarations: [ ItemsListComponent, ItemsCreateComponent ]
})
export class ItemsModule { }
