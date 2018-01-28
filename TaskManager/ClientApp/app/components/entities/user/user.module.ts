import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { userRoute } from './user.route';

const ENTITY_STATES = [
    ...userRoute,
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(ENTITY_STATES)
    ],
    declarations: [
        UserComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }