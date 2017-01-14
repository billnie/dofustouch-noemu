import { Injectable } from '@angular/core';
import {IpcRendererService} from "./ipcrenderer.service";

@Injectable()
export class ApplicationService {

    public gamePath: string = "aaa";

    constructor(
        private ipcRendererService: IpcRendererService
    ){
        console.log('ApplicationService construct')
    }

    public load(): void {
        console.log('init app service');

        let config = this.ipcRendererService.sendSync('load-config');
        this.gamePath = config.gamePath;
        console.log(this.gamePath);
    }

}