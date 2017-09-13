import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: ':id', component: DetailComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
