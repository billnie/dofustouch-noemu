/* Angular 2 */
import {NgModule, APP_INITIALIZER}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from "@angular/flex-layout";
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule} from '@angular/forms';

/* Bootstrap 4 */
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';

/* Shared Module */
import {SharedModule} from './../shared/shared.module';

/* AppComponent */
import {AppComponent} from './app.component';
import {AppService} from './app.service'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FlexLayoutModule.forRoot(),
        NgbModule.forRoot(),
        SharedModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AppService,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: AppService) => () => config.load(),
            deps: [AppService],
            multi: true
        },
        {provide: APP_BASE_HREF, useValue: '/'} // hack to work routing on electron
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
