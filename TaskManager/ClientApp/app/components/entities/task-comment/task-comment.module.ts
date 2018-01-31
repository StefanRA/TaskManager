import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';

import { TaskCommentComponent } from './task-comment.component';

@NgModule({
    imports: [
        SharedLibrariesModule
    ],
    declarations: [
        TaskCommentComponent
    ],
    exports: [
        TaskCommentComponent
    ]
})
export class TaskCommentModule { }