import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [
        CommonModule,
        HttpModule,
        FormsModule
    ]
})
export class SharedLibrariesModule { }