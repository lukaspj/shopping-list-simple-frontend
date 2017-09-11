import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdEditorComponent } from './md-editor/md-editor.component';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'angular2-markdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule
  ],
  declarations: [ MdEditorComponent ],
  exports: [
    MdEditorComponent,
    MarkdownModule
  ]
})
export class UtilityModule { }
