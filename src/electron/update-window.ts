const settings = require('electron-settings');
const extract = require('extract-zip')

import electron = require("electron");
import {ipcMain, app, Menu} from 'electron';
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import {Application} from './application';


export class UpdateWindow {

    private win: Electron.BrowserWindow;
    private application: Application;
    private savePath: string;
    private remoteUrl: string;

    constructor(application: Application) {
        this.application = application;
    }

    run(): void {

        /*this.checkGameUpdate().then((available) => {

         });*/

        this.win = new electron.BrowserWindow({
            width: 800,
            height: 150,
            resizable: false,
            center: true,
            parent: electron.BrowserWindow.getFocusedWindow(),
            darkTheme: true,
            skipTaskbar: true,
            show: false,
            title: 'Updater',
        });

        this.win.on('closed', () => {
            this.win = null;
        });

        this.win.show();

        this.savePath = app.getPath('userData') + '/game.zip';
        this.remoteUrl = 'http://dofustouch.no-emu.com/test/game.zip';

        this.win.loadURL(`file://${__dirname}/../browser/index.html#/update/${encodeURIComponent(this.savePath)}/${encodeURIComponent(this.remoteUrl)}`);

        ipcMain.on('install-update', (event, arg) => {
            console.log('ready to update');
            extract(this.savePath, {dir: app.getPath('userData') + '/'}, function (err: any) {
                console.log(err);
            })
        });
    }

    private checkGameUpdate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let queries = '?version=' + app.getVersion() + '&os=' + process.platform;
            http.get(url.resolve(this.application.website, 'update/update.php' + queries), (res) => {

                // if website not available
                if (!res || !res.statusCode || res.statusCode != 200) {

                } else {
                    let body: string = '';

                    // get data
                    res.on('data', (chunk: string) => {
                        body += chunk;
                    });

                    // parse data
                    res.on('end', () => {
                        let responseBody: any = JSON.parse(body);


                    })
                }
            });
        });
    }

    private checkNoEmuUpdate() {

    }

}
