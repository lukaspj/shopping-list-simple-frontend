import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: ':id', component: DetailComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }