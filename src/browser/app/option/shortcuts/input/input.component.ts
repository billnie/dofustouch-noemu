import {Component, Optional, ViewEncapsulation, Inject, Input, Output, NgZone, EventEmitter} from '@angular/core';
import { KeyCode } from './keycode';


//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'option-shortcuts-input',
    templateUrl: 'app/option/shortcuts/input/input.component.html',
    styleUrls: ['app/option/shortcuts/input/input.component.css'],
    host: {

    }
})
export class InputComponent {

    @Input() private name: string;
    @Input() private id: string;
    @Input() private model: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    private _keys: Array<number> = [];

    keyDown(event: KeyboardEvent) {
        event.preventDefault();

        this._keys.forEach((key: number, index) => {
            if(key == event.keyCode){
                delete this._keys[index];
            }
        });

        this._keys.push(event.keyCode);

        let first = true;
        let shortcut = '';

        this._keys.forEach((key) => {
            if (this._keys.length > 1 && !first) {
                shortcut += '+';
            }

            console.log(key);
            shortcut += KeyCode.getKeyCodeValue(key, false);

            first = false;
        });


        this.model = shortcut;
        this.modelChange.emit(this.model);
    }

    keyUp(event: KeyboardEvent) {
        delete  this._keys[this._keys.indexOf(event.keyCode)];
    }

    erase(){
        this.model = '';
        this.modelChange.emit(this.model);
    }

    constructor(
    ) {

    }


}
