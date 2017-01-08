const {ipcRenderer} = (<any>global).nodeRequire('electron');

/* Angular 2 */
import {NgModule}      from '@angular/core';
import {RouterModule}   from '@angular/router';
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

/* MainComponent */
import {MainComponent} from './main/main.component';
import {GameComponent} from './main/game/game.component';
import {TabService} from './main/tab/tab.service';


import { SettingsService } from './../shared/settings/settings.service';
import { IpcRendererService } from './../shared/electron/ipcrenderer.service';



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
        GameComponent,
        MainComponent,
    ],
    providers: [
        TabService,
        {provide: 'Window', useValue: window},
        {provide: APP_BASE_HREF, useValue: '/'} // hack to work routing on electron
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
