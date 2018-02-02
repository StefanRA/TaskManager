import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { AccountService } from '../shared/user/account.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean;
    subscription: Subscription;
    userName: string;
    userNameSubscription: Subscription;

    constructor(private userService: AccountService) {
    }

    logout() {
        this.userService.logout();
    }

    ngOnInit() {
        this.subscription = this.userService.authNavStatus$.subscribe(status => this.isLoggedIn = status);
        this.userNameSubscription = this.userService.userNameObservable$.subscribe(status => this.userName = status);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
