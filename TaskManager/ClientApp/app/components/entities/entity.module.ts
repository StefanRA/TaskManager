import { NgModule } from '@angular/core';

import { SharedLibrariesModule } from '../shared/shared-libraries.module';
import { RouterModule } from '@angular/router';

import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TaskCommentModule } from './task-comment/task-comment.module';

import { EntityAdministrationModule } from './entity-administration/entity-administration.module';

@NgModule({
    imports: [
        SharedLibrariesModule,
        EntityAdministrationModule,
        UserModule,
        ProjectModule,
        TaskModule,
        TaskCommentModule
    ]
})
export class EntityModule {}