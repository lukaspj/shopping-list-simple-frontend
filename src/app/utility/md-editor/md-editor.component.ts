import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as SimpleMDE from 'simplemde';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: [
    './md-editor.component.scss'
  ]
})
export class MdEditorComponent implements OnInit, AfterViewInit {

  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();
  @ViewChild('mdarea') mdarea;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const simpleMde: SimpleMDE = new SimpleMDE({
      element: this.mdarea.nativeElement,
      forceSync: true,
      status: false,
      spellChecker: false
    });

    if (this.model) {
      simpleMde.codemirror.setValue(this.model);
    }

    simpleMde.codemirror.on('change', () => {
      const value = simpleMde.codemirror.getValue();
      this.modelChange.emit(value);
    });
  }
}
