import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilityModule } from '../../utility/utility.module';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilityModule,
    RecipesRoutingModule
  ],
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent,
    EditComponent
  ]
})
export class RecipesModule { }
