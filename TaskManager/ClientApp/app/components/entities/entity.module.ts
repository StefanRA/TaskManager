import { NgModule } from '@angular/core';

import { SharedLibrariesModule } from '../shared/shared-libraries.module';
import { RouterModule } from '@angular/router';

import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

import { EntityAdministrationModule } from './entity-administration/entity-administration.module';

@NgModule({
    imports: [
        SharedLibrariesModule,
        EntityAdministrationModule,
        UserModule,
        ProjectModule
    ]
})
export class EntityModule {}