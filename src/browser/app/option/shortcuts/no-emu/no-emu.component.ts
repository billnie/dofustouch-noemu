import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { SettingsService } from './../../../../shared/settings/settings.service';
import { InputComponent } from './../input/input.component'

//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'option-shortcuts-no-emu',
    templateUrl: 'app/option/shortcuts/no-emu/no-emu.component.html',
    styleUrls: ['app/option/shortcuts/no-emu/no-emu.component.css'],
    host: {

    }
})
export class NoEmuComponent {


    constructor(
        private settingsService: SettingsService
    ) {

    }

    public range(start: number, end: number): Array<number> {
        let arr = [];

        for(let i = start; i <= end; i++)
            arr.push(i);

        return arr;
    }

}
