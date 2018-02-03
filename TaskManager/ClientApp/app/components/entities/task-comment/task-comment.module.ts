import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { TaskCommentComponent } from './task-comment.component';
import { TaskCommentService } from './task-comment.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        TaskCommentComponent
    ],
    exports: [
        TaskCommentComponent
    ],
    providers: [
        TaskCommentService
    ]
})
export class TaskCommentModule { }