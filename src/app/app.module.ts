import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {FeaturesModule} from "./features/features.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastNotificationComponent} from "./shared/toast-notification/toast-notification.component";

@NgModule({
    declarations: [
        AppComponent,
        ToastNotificationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        FeaturesModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
