import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListsListComponent } from './lists-list/lists-list.component';
import { ListsDetailsComponent } from './lists-details/lists-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListsListComponent },
      { path: ':id', component: ListsDetailsComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ListsRoutingModule { }
