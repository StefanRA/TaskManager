﻿import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from './login.model';
import { AccountService } from '../../shared/user/account.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    brandNew: boolean;
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    credentials: Credentials = { userName: '', password: '' };

    constructor(private userService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.credentials.userName = param['userName'];
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    login({ value, valid }: { value: Credentials, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.login(value.userName, value.password)
                .finally(() => this.isRequesting = false)
                .subscribe(
                result => {
                    if (result) {
                        this.router.navigate(['/home']);
                    }
                },
                error => this.errors = error);
        }
    }
}