import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private _http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.token = currentUser.token;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this._http.post(environment.serviceUrls.auth.authenticate, {
      username: username,
      password: password
    })
      .map(response => {
        if (response) {
          this.token = response['token'];
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: response['token'] }));
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `JWT ${ this.token }` });
  }
}
