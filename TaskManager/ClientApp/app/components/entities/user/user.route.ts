import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/user-detail.component';

export const userRoute: Routes = [
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
    }
];