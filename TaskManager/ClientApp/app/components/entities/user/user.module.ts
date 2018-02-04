import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserService } from './user.service';
import { userRoute } from './user.route';

const ENTITY_STATES = [
    ...userRoute,
];

@NgModule({
    imports: [
        SharedModule,
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