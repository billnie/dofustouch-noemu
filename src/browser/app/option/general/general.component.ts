import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { SettingsService } from '../../settings/settings.service';
import { ISettings } from '../../../../shared/settings';


//const { ipcRenderer } = (<any>global).nodeRequire('electron');
interface Resolution {
    name: string;
    value: string;
}

@Component({
    selector: 'option-general',
    templateUrl: 'app/option/general/general.component.html',
    styleUrls: ['app/option/general/general.component.css'],
    host: {

    }
})
export class GeneralComponent {

    private _resolution: string;

    public resolutions: Resolution[] = [
        { name: '960x540', value: "960;540" },
        { name: '1280x720', value: "1280;720" },
        { name: '1600x900', value: "1600;900" },
        { name: '2560x1440', value: "2560;1440" }
    ];

    constructor(
        private settingsService: SettingsService
    ){

    }

    public setResolution(value: string): void {
        let aValue = value.split(';');
        
        let resolution = {
            x: parseInt(aValue[0]),
            y: parseInt(aValue[1])
        }

        this.settingsService.option.general.resolution = resolution;
    }

    ngOnInit(): void {
        // fixe the two way binding object by this tricks
        this._resolution = this.settingsService.option.general.resolution.x+';'+this.settingsService.option.general.resolution.y;

    }

}
