import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [
        CommonModule,
        HttpModule,
        FormsModule
    ],
    providers: [
        { provide: 'SERVER_URL', useFactory: getBaseUrl }
    ]
})
export class SharedLibrariesModule { }

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}