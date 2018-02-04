import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module';

import { DashboardRootComponent } from './root/dashboard-root.component';
import { DashboardHomeComponent } from './home/dashboard-home.component';
import { DashboardEditProfileComponent } from './edit-profile/dashboard-edit-profile.component';
import { DashboardService } from './shared/services/dashboard.service';
import { AuthGuardService } from "../shared/auth/auth-guard.service";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'dashboard',
                component: DashboardRootComponent,
                data: {
                    authorities: ['User']
                },
                canActivate: [AuthGuardService],

                children: [
                    {
                        path: '',
                        component: DashboardHomeComponent
                    },
                    {
                        path: 'home',
                        component: DashboardHomeComponent
                    },
                    {
                        path: 'edit-profile',
                        component: DashboardEditProfileComponent
                    }
                ]
            }
        ])
    ],
    declarations: [
        DashboardRootComponent,
        DashboardHomeComponent,
        DashboardEditProfileComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }