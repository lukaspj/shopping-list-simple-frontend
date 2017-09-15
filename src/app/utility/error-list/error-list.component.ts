import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {

  @Input() errorList: string[];

  constructor() { }

  ngOnInit() {
  }
}
