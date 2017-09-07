import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListsListComponent } from './lists-list/lists-list.component';
import { ListsCreateComponent } from './lists-create/lists-create.component';
import { ListsDetailsComponent } from './lists-details/lists-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListsListComponent },
      { path: 'create', component: ListsCreateComponent },
      { path: ':id', component: ListsDetailsComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ListsRoutingModule { }
