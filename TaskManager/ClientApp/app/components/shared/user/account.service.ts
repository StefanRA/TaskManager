import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AccountService {
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private resourceUrl: string;
    private loggedIn = false;

    constructor(private http: Http) {
        this.resourceUrl = 'api/users';
        if (typeof window !== 'undefined') {
            this.loggedIn = !!localStorage.getItem('auth_token');
        }
        this._authNavStatusSource.next(this.loggedIn);
    }

    register(userName: string, email: string, password: string, firstName: string, lastName: string): Observable<Response> {
        let body = JSON.stringify({ userName, email, password, firstName, lastName });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/accounts/register", body, options);
    }

    login(userName: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post("api/accounts/login", JSON.stringify({ userName, password }), { headers })
            .map(user => {
                if (user) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('auth_token', JSON.stringify(user));
                    }
                    this.loggedIn = true;
                    this._authNavStatusSource.next(true);
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