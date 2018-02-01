import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';

import { TaskCommentComponent } from './task-comment.component';
import { TaskCommentService } from './task-comment.service';

@NgModule({
    imports: [
        SharedLibrariesModule
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