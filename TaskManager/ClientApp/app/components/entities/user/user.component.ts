import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';
import { UserService } from './user.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

export class UserComponent {
    public users: User[];
    public newUser: User;

    constructor(
        private userService: UserService)
    {
        this.loadAll();
    }

    loadAll() {
        this.userService.getAll().subscribe(result => {
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
        //this.http.post(this.resourceUrl, copy).subscribe(result => { this.newUser = result.json() },error=>console.error(error));
        this.userService.create(this.newUser).subscribe(result => { this.newUser = result.json() }, error => console.error(error));
        this.users.push(this.newUser);
    }

    private convert(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }

    public removeUser(user: User) {
        this.userService.delete(user.userId).subscribe((res) => { });
        this.users.splice(this.users.indexOf(user), 1);
    }
}