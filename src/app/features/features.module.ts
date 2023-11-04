import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreComponent} from "./stores/containers";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        StoreComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        StoreComponent,
    ]
})
export class FeaturesModule {
}
