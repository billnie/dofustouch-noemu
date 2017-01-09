import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { ShortCuts } from './../shortcuts/shortcuts';
import { IpcRendererService } from '../../shared/electron/ipcrenderer.service';


@Component({
    selector: 'options',
    templateUrl: 'app/option/option.component.html',
    styleUrls: ['app/option/option.component.css'],
    host: {
        "style":"height:100%" // find something less ugly in future
    }
})
export class OptionComponent {

}
