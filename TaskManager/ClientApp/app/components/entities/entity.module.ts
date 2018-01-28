import { NgModule } from '@angular/core';

import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

@NgModule({
    imports: [
        UserModule,
        ProjectModule
    ]
})
export class EntityModule {}