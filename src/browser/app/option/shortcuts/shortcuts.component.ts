import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { SettingsService } from './../../../shared/settings/settings.service';


//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'option-shortcuts',
    templateUrl: 'app/option/shortcuts/shortcuts.component.html',
    styleUrls: ['app/option/shortcuts/shortcuts.component.css'],
    host: {

    }
})
export class ShortcutsComponent {

    constructor(
        private settingsService: SettingsService
    ){

    }

}
