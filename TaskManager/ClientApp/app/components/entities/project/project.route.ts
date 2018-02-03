import { Routes } from '@angular/router';

import { AuthGuardService } from '../../shared/auth/auth-guard.service';

import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './detail/project-detail.component';

export const projectRoute: Routes = [
    {
        path: 'project',
        component: ProjectComponent,
        data: {
            authorities: ['User']
        },
        canActivate: [AuthGuardService]
    },
    {
        path: 'project/:id',
        component: ProjectDetailComponent,
        data: {
            authorities: ['User']
        },
        canActivate: [AuthGuardService]
    }
];