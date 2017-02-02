import { Injectable } from '@angular/core';
import {IpcRendererService} from "./ipcrenderer.service";

@Injectable()
export class ApplicationService {

    public gamePath: string = "";
    public buildVersion: string;
    public appVersion: string;
    public appPath: string;

    constructor(
        private ipcRendererService: IpcRendererService
    ){
    }

    public load(): void {
        console.log('init application service');

        let config = this.ipcRendererService.sendSync('load-config');
        this.gamePath = config.gamePath;
        this.buildVersion = config.buildVersion;
        this.appVersion = config.appVersion;
        this.appPath = config.appPath;
    }

}