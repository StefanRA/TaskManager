import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AccountService {
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();
    private _userNameObservableSource = new BehaviorSubject<string>("");
    userNameObservable$ = this._userNameObservableSource.asObservable();

    private resourceUrl: string;
    private loggedIn = false;
    private userName = "";

    constructor(private http: Http) {
        this.resourceUrl = 'api/users';
        if (typeof window !== 'undefined') {
            this.loggedIn = !!localStorage.getItem('auth_token');
            var userName = localStorage.getItem('user_name');
            if (userName) {
                this.userName = userName;
            }
        }
        this._authNavStatusSource.next(this.loggedIn);
        this._userNameObservableSource.next(this.userName);
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
                    let jwt = JSON.stringify(user);
                    let jwtData = jwt.split('.')[1];
                    let decodedJwtJsonData = window.atob(jwtData);
                    let decodedJwtData = JSON.parse(decodedJwtJsonData);
                    localStorage.setItem('user_name', decodedJwtData.sub);

                    this.userName = decodedJwtData.sub;
                    this.loggedIn = true;
                    this._userNameObservableSource.next(decodedJwtData.sub);
                    this._authNavStatusSource.next(true);
                }
                return user;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_name');
        this.loggedIn = false;
        this.userName = "";
        this._authNavStatusSource.next(false);
        this._userNameObservableSource.next("");
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUserName(): string {
        return this.userName;
    }
}