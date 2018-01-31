import { NgModule } from '@angular/core';

import { SharedLibrariesModule } from '../shared/shared-libraries.module';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
    imports: [
        SharedLibrariesModule,
        RouterModule.forRoot([
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent }
        ])
    ],
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
    providers: [
        RegisterService,
        LoginService
    ]
})
export class AuthenticationModule { }