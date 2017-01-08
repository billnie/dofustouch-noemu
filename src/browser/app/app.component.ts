import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { IpcRendererService } from '../shared/electron/ipcrenderer.service';

//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'application',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    host: {

    }
})
export class AppComponent {

}
