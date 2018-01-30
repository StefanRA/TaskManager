import { NgModule } from '@angular/core';

import { SharedLibrariesModule } from '../shared/shared-libraries.module';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';

@NgModule({
    imports: [
        SharedLibrariesModule,
        RouterModule.forRoot([
            { path: 'register', component: RegisterComponent }
        ])
    ],
    declarations: [
        RegisterComponent
    ],
    providers: [
        RegisterService
    ]
})
export class AuthenticationModule { }