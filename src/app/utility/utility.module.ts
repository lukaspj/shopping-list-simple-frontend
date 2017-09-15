import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdEditorComponent } from './md-editor/md-editor.component';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'angular2-markdown';
import { CalloutComponent } from './callout/callout.component';
import { ErrorListComponent } from './error-list/error-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule
  ],
  declarations: [ MdEditorComponent, CalloutComponent, ErrorListComponent ],
  exports: [
    MdEditorComponent,
    MarkdownModule,
    CalloutComponent,
    ErrorListComponent
  ]
})
export class UtilityModule { }
