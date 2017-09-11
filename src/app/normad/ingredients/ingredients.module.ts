import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilityModule } from '../../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilityModule,
    IngredientsRoutingModule
  ],
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent
  ],
  exports: [
    IngredientsRoutingModule
  ]
})
export class IngredientsModule { }
