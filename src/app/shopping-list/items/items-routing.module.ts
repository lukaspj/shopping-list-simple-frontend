import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsCreateComponent } from './items-create/items-create.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ItemsListComponent },
      { path: 'create', component: ItemsCreateComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ItemsRoutingModule { }
