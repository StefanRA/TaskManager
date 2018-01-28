import { NgModule } from '@angular/core';

import { SharedLibrariesModule } from '../../shared/shared-libraries.module';
import { RouterModule } from '@angular/router';

import { EntityAdministrationComponent } from './entity-administration.component';
import { entityAdministrationRoute } from './entity-administration.route';

const ENTITY_STATES = [
    ...entityAdministrationRoute,
];

@NgModule({
    imports: [
        SharedLibrariesModule,
        RouterModule.forRoot(ENTITY_STATES)
    ],
    declarations: [
        EntityAdministrationComponent
    ]
})
export class EntityAdministrationModule { }