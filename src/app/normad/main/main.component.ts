import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
  loggedIn: boolean;
  username: string;

  constructor(
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._authenticationService.isAuthenticated()
      .subscribe(x => this.loggedIn = x);
    this._authenticationService.getUsername()
      .subscribe(x => this.username = x);
  }

  logout() {
    this._authenticationService.logout();
  }
}
