import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { IpcRendererService } from './../../shared/electron/ipcrenderer.service';

@Component({
    selector: 'application',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    host: {

    }
})
export class AppComponent {
    constructor(
        private test: IpcRendererService
    ){

    }

    ngOnInit(){
        console.log('nginit')
        this.test.send('test');

    }
}
