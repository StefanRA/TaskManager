import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';

import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './detail/project-detail.component';
import { ProjectService } from './project.service';
import { projectRoute } from './project.route';
import { TaskModule } from '../task/task.module';

const ENTITY_STATES = [
    ...projectRoute,
];

@NgModule({
    imports: [
        SharedLibrariesModule,
        TaskModule,
        RouterModule.forRoot(ENTITY_STATES)
    ],
    declarations: [
        ProjectComponent,
        ProjectDetailComponent
    ],
    providers: [
        ProjectService
    ]
})
export class ProjectModule { }