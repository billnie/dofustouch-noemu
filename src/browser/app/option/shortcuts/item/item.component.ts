import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { SettingsService } from './../../../../shared/settings/settings.service';
import { InputComponent } from './../input/input.component'

//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'option-shortcuts-item',
    templateUrl: 'app/option/shortcuts/item/item.component.html',
    styleUrls: ['app/option/shortcuts/item/item.component.css'],
    host: {

    }
})
export class ItemComponent {

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
