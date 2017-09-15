import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { RequestOptions } from '@angular/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {

  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService
  ) { }

  getUser(): Observable<User[]> {
    const headers = new HttpHeaders({ 'Authorization': `JWT ${ this._authenticationService.token }` });

    return this._http.get<User[]>(environment.serviceUrls.auth.user_list, {
      headers: headers
    });
  }

}
