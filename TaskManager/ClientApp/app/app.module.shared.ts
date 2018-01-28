import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { EntityModule } from './components/entities/entity.module';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        EntityModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        HomeComponent
    ]
})
export class AppModuleShared {
}
