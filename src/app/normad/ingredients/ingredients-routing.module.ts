import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: ':id', component: DetailComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class IngredientsRoutingModule { }
