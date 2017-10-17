import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface DjangoUser {
  date_joined: Date;
  id: number;
  is_active: boolean;
  is_superuser: boolean;
  username: string;
}

interface DjangoTokenResponse {
  token: string;
  user: DjangoUser;
}

@Injectable()
export class AuthenticationService {
  private tokenSubject: Subject<string>;
  private token: string;
  private user: DjangoUser;

  constructor(private _http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.token = currentUser.token;
      this.user = currentUser.user;
    }
    this.tokenSubject = new BehaviorSubject<string>(this.token);
  }

  login(username: string, password: string): Observable<boolean> {
    return this._http.post<DjangoTokenResponse>(environment.serviceUrls.auth.authenticate, {
      username: username,
      password: password
    })
      .map(response => {
        if (response.token) {
          this.token = response.token;
          this.user = response.user;
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: response.token,
            user: response.user
          }));
          this.tokenSubject.next(this.token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.tokenSubject
      .map(token => token != null);
  }

  isAdmin(): Observable<boolean> {
    return this.isAuthenticated()
      .map(x => x ? this.user.is_superuser : false);
  }

  getUsername(): Observable<string> {
    return this.isAuthenticated()
      .map(x => x ? this.user.username : null);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `JWT ${ this.token }` });
  }
}
