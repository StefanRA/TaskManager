import { Routes } from '@angular/router';

import { AuthGuardService } from '../../shared/auth/auth-guard.service';

import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './detail/task-detail.component';

export const taskRoute: Routes = [
    {
        path: 'task',
        component: TaskComponent,
        data: {
            authorities: ['User']
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'task/:id',
        component: TaskDetailComponent,
        data: {
            authorities: ['User']
        },
        canActivate: [AuthGuardService]
    }
];