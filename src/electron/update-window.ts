import request = require("request");
const settings = require('electron-settings');
const extract = require('extract-zip');

import electron = require("electron");
import {ipcMain, app, Menu} from 'electron';
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import {Application} from './application';


export class UpdateWindow {

    public win: Electron.BrowserWindow;
    private application: Application;
    private savePath: string;
    private remoteUrl: string;

    constructor(application: Application) {
        this.application = application;
    }

    createWindow(): Electron.BrowserWindow {
        let window = new electron.BrowserWindow({
            width: 800,
            height: 150,
            resizable: false,
            center: true,
            parent: electron.BrowserWindow.getFocusedWindow(),
            darkTheme: true,
            skipTaskbar: true,
            show: true
        });

        window.on('closed', () => {
            window = null;
        });

        return window;

    }

    public run(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.checkGameUpdate().then((response) => {

                if (!response.available) {
                    return resolve();
                } else {
                    this.win = new electron.BrowserWindow({
                        width: 800,
                        height: 150,
                        resizable: false,
                        center: true,
                        parent: electron.BrowserWindow.getFocusedWindow(),
                        darkTheme: true,
                        skipTaskbar: true,
                        show: true,
                        title: 'Updater',
                    });

                    this.win.on('closed', () => {
                        this.win = null;
                    });


                    this.savePath = app.getPath('userData') + '/game.zip';
                    this.remoteUrl = response.file;//'http://dofustouch.no-emu.com/test/game.zip';

                    this.win.loadURL(`file://${__dirname}/../browser/index.html#/update/${encodeURIComponent(this.savePath)}/${encodeURIComponent(this.remoteUrl)}`);

                    ipcMain.on('install-update', (event, arg) => {
                        console.log('ready to update');
                        extract(this.savePath, {dir: app.getPath('userData') + '/'}, function (err: any) {
                            resolve();
                        })
                    });
                }
            });
        });
    }

    private checkGameUpdate(): Promise<any> {
        return new Promise((resolve, reject) => {

            let queries = '?version=' + settings.getSync('option.buildVersion') + '&os=' + process.platform;
            request(url.resolve(this.application.website, 'update/game.php' + queries), (error, response, body) => {

                if (!error && response.statusCode == 200) {
                    let parseBody: any = JSON.parse(body);

                    if(settings.getSync('option.buildVersion') == parseBody.version){
                        parseBody.available = false;
                    }else{
                        parseBody.available = true;
                    }

                    resolve(parseBody);
                } else {
                    reject(error);
                }
            });
        });
    }

}
