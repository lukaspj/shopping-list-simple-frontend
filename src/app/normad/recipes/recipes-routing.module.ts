import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { UserGuard } from '../services/auth/user.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent, canActivate: [ UserGuard ] },
      { path: 'edit/:id', component: EditComponent, canActivate: [ UserGuard ] },
      { path: ':id', component: DetailComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
