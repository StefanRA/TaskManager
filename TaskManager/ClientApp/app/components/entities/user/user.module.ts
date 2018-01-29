import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserService } from './user.service';
import { userRoute } from './user.route';

const ENTITY_STATES = [
    ...userRoute,
];

@NgModule({
    imports: [
        SharedLibrariesModule,
        RouterModule.forRoot(ENTITY_STATES)
    ],
    declarations: [
        UserComponent,
        UserDetailComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }