import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Shared Module */
import {SharedModule} from './../../shared/shared.module';

import {OptionRoutingModule} from './option-routing.module';

import {OptionComponent} from './option.component';
import {GeneralComponent} from './general/general.component';
import {ShortcutsComponent} from './shortcuts/shortcuts.component';
import {NoEmuComponent} from './shortcuts/no-emu/no-emu.component';
import {DiverComponent} from './shortcuts/diver/diver.component';
import {SpellComponent} from './shortcuts/spell/spell.component';
import {ItemComponent} from './shortcuts/item/item.component';
import {InterfaceComponent} from './shortcuts/interface/interface.component';
import {InputComponent} from './shortcuts/input/input.component';

import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        OptionRoutingModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
    declarations: [
        OptionComponent,
        GeneralComponent,
        ShortcutsComponent,
        NoEmuComponent,
        InputComponent,
        DiverComponent,
        SpellComponent,
        ItemComponent,
        InterfaceComponent
    ]
})
export class OptionModule {
}
