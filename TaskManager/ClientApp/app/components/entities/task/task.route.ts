import { Routes } from '@angular/router';

import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './detail/task-detail.component';

export const taskRoute: Routes = [
    {
        path: 'task',
        component: TaskComponent
    },
    {
        path: 'task/:id',
        component: TaskDetailComponent
    }
];