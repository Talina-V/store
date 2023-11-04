import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PathNotFoundComponent} from './components/path-not-found/path-not-found.component';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [PathNotFoundComponent],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [PathNotFoundComponent]
})
export class CoreModule {
}
