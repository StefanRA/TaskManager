import { Routes } from '@angular/router';

import { AuthGuardService } from '../../shared/auth/auth-guard.service';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/user-detail.component';

export const userRoute: Routes = [
    {
        path: 'user',
        component: UserComponent,
        data: {
            authorities: ['Admin']
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'user/:id',
        component: UserDetailComponent,
        data: {
            authorities: ['Admin']
        },
        canActivate: [AuthGuardService]
    }
];