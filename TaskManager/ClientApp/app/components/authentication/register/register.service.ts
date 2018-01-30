import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from './register.model';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class RegisterService {

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private http: Http) {
    }

    register(userName: string, email: string, password: string, firstName: string, lastName: string): Observable<Response> {
        let body = JSON.stringify({ userName, email, password, firstName, lastName });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/accounts/register", body, options);
    }
}