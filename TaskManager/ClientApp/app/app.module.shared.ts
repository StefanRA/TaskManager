import { NgModule } from '@angular/core';
import { SharedModule } from './components/shared/shared.module';
import { RouterModule } from '@angular/router';

import { EntityModule } from './components/entities/entity.module';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        SharedModule,
        EntityModule,
        DashboardModule,
        AuthenticationModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent
    ]
})
export class AppModuleShared {
}
