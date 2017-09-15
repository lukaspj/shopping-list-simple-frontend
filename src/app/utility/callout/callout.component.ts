import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements OnInit {

  @Input() text: string;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
