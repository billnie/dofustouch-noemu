import {Injectable, NgZone} from '@angular/core';

const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Injectable()

export class IpcRendererService {
	ipcRenderer = ipcRenderer;

	constructor(
        private zone: NgZone
    ) {

    }

	public on(message:string, callback: any) {
		return this.ipcRenderer.on(message, (event: Event, args:any)=>{

            // prevent that change is effectiv for zone.js because ipc run not under controll of zone.js
            this.zone.run(() => {
                callback(event, args);
            });
        });
	}

	public send(message:string, ...args: Array<any>) {
		this.ipcRenderer.send(message, args);
	}

	public sendSync(message:string, ...args: Array<any>) {
		return this.ipcRenderer.sendSync(message, args);
	}
}
