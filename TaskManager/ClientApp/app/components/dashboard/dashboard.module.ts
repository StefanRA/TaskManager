import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module';

import { DashboardRootComponent } from './root/dashboard-root.component';
import { DashboardHomeComponent } from './home/dashboard-home.component';
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
                ]
            }
        ])
    ],
    declarations: [
        DashboardRootComponent,
        DashboardHomeComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }