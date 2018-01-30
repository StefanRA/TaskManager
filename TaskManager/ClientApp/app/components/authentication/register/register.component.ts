import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserRegistration } from './register.model';
import { RegisterService } from './register.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;

    constructor(private registerService: RegisterService, private router: Router) { }

    ngOnInit() {
    }

    registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.registerService.register(value.userName, value.email, value.password, value.firstName, value.lastName)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigate(['/home']);
                        }
                    },
                    errors => this.errors = errors
                );
        }
    } 
}