import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';

import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskService } from './task.service';
import { taskRoute } from './task.route';
import { TaskCommentModule } from '../task-comment/task-comment.module'

const ENTITY_STATES = [
    ...taskRoute,
];

@NgModule({
    imports: [
        SharedLibrariesModule,
        TaskCommentModule,
        RouterModule.forRoot(ENTITY_STATES)
    ],
    declarations: [
        TaskComponent,
        TaskDetailComponent
    ],
    providers: [
        TaskService
    ]
})
export class TaskModule { }