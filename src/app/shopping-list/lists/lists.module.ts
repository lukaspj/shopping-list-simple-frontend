import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsCreateComponent } from './lists-create/lists-create.component';
import { ListsListComponent } from './lists-list/lists-list.component';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsDetailsComponent } from './lists-details/lists-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ListsRoutingModule
  ],
  declarations: [
    ListsCreateComponent,
    ListsListComponent,
    ListsDetailsComponent
  ]
})
export class ListsModule { }
