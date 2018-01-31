import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Credentials } from './login.model';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class LoginService {

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private http: Http) {
    }

    login(userName: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post("api/accounts/login", JSON.stringify({ userName, password }), { headers })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth_token', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}