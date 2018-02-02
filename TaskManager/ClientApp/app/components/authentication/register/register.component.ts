import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserRegistration } from './register.model';
import { AccountService } from '../../shared/user/account.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit() {
    }

    registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.accountService.register(value.userName, value.email, value.password, value.firstName, value.lastName)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigate(['/login']);
                        }
                    },
                    errors => this.errors = errors
                );
        }
    } 
}