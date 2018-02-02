import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot([
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent }
        ])
    ],
    declarations: [
        RegisterComponent,
        LoginComponent
    ]
})
export class AuthenticationModule { }