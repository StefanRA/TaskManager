import { NgModule } from '@angular/core';
import { SharedLibrariesModule } from './shared-libraries.module';

import { AccountService } from './user/account.service';

@NgModule({
    imports: [
        SharedLibrariesModule
    ],
    exports: [
        SharedLibrariesModule
    ],
    providers: [
        AccountService,
        { provide: 'SERVER_URL', useFactory: getBaseUrl }
    ]

})
export class SharedModule { }

export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return document.getElementsByTagName('base')[0].href;
    }
}