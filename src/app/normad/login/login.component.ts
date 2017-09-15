import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error = '';
  loginForm: FormGroup;

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
    this._authenticationService.logout();
  }

  login() {
    this.loading = true;
    this._authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(result => {
        if (result) {
          this._router.navigate([ '/' ]);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
