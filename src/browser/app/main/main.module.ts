import {NgModule, APP_INITIALIZER} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Shared Module */
import {SharedModule} from './../../shared/shared.module';

import {MainRoutingModule} from './main.routing';

/* MainComponent */
import {MainComponent} from './main.component';
import {GameComponent, SafePipe} from './game/game.component';
import {TabService} from './tab/tab.service';
import {ApplicationService} from "./../../shared/electron/application.service";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MainRoutingModule,
        //DragulaModule
    ],
    providers: [
        TabService,
        {provide: 'Window', useValue: window},
    ],
    declarations: [
        MainComponent,
        GameComponent,
        SafePipe
    ]
})
export class MainModule {
}