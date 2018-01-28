import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';

import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';
import { projectRoute } from './project.route';

const ENTITY_STATES = [
    ...projectRoute,
];

@NgModule({
    imports: [
        SharedLibrariesModule,
        RouterModule.forRoot(ENTITY_STATES)
    ],
    declarations: [
        ProjectComponent
    ],
    providers: [
        ProjectService
    ]
})
export class ProjectModule { }