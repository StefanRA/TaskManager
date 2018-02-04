import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';
import { UserService } from './user.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
    public users: User[];
    public newUser: User;

    constructor(
        private userService: UserService)
    {
        this.loadAll();
    }

    ngOnInit() {
        this.newUser = new User();
    }

    loadAll() {
        this.userService.getAll().subscribe(result => {
            this.users = result.json() as User[];
        }, error => console.error(error));
    }

    add() {
        this.subscribeToCreateResponse(
            this.userService.create(this.newUser)
        );
    }

    private subscribeToCreateResponse(result: Observable<User>) {
        result.subscribe(
            (result: User) => this.onCreateSuccess(result),
            (result: Response) => this.onCreateError()
        );
    }

    private onCreateSuccess(result: User) {
        this.loadAll();
        this.newUser = new User();
    }

    private onCreateError() {
    }

    private convert(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }

    public removeUser(user: User) {
        this.userService.delete(user.id).subscribe((res) => { });
        this.users.splice(this.users.indexOf(user), 1);
    }

    previousState() {
        window.history.back();
    }
}