import { Component, Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

@Injectable()
export class UserComponent {
    public users: User[];
    public newUser: User;
    private resourceUrl: string;

    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl: string)
    {
        this.loadAll();
        this.resourceUrl = baseUrl + 'api/users';
    }

    loadAll() {
        this.http.get(this.baseUrl + 'api/users').subscribe(result => {
            this.users = result.json() as User[];
        }, error => console.error(error));
    }

    add() {
        this.newUser = new User();
        this.newUser.displayName = 'stefan';
        this.newUser.firstName = 'Stefan';
        this.newUser.lastName = 'RA';
        this.newUser.email = 'yep';

        const copy = this.convert(this.newUser);
        this.http.post(this.resourceUrl, copy).subscribe(result => { this.newUser = result.json() },error=>console.error(error));
    }

    private convert(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }
}