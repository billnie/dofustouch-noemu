import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Shared Module */
import {SharedModule} from './../../shared/shared.module';

import {MainRoutingModule} from './main-routing.module';

/* MainComponent */
import {MainComponent} from './main.component';
import {GameComponent} from './game/game.component';
import {TabService} from './tab/tab.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MainRoutingModule
    ],
    providers: [
        TabService,
        {provide: 'Window', useValue: window},
    ],
    declarations: [
        MainComponent,
        GameComponent
    ]
})
export class MainModule {
}