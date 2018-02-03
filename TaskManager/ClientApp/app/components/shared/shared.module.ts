﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedLibrariesModule } from './shared-libraries.module';

import { AccountService } from './user/account.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
    imports: [
        SharedLibrariesModule,
        RouterModule.forRoot([{
            path: 'access-denied',
            component: AccessDeniedComponent
        }])
    ],
    declarations: [
        AccessDeniedComponent
    ],
    exports: [
        SharedLibrariesModule,
        AccessDeniedComponent
    ],
    providers: [
        AccountService,
        AuthGuardService,
        { provide: 'SERVER_URL', useFactory: getBaseUrl }
    ]

})
export class SharedModule { }

export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return document.getElementsByTagName('base')[0].href;
    }
}