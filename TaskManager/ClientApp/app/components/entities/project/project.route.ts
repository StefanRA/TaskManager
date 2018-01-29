import { Routes } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './detail/project-detail.component';

export const projectRoute: Routes = [
    {
        path: 'project',
        component: ProjectComponent
    },
    {
        path: 'project/:id',
        component: ProjectDetailComponent
    }
];