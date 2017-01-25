import request = require("request");
const pkg = require('./../../package.json');
const settings = require('electron-settings');
const extract = require('extract-zip');

import electron = require("electron");
import {ipcMain, app, Menu, BrowserWindow, dialog, shell} from 'electron';
import * as url from 'url';
import * as fs from 'fs';

import {Application} from './application';
import {spawn} from "child_process";

declare interface UpdateResponse {
    noemu: {
        version: string;
        required: boolean;
        web: boolean;
    };
    dofustouch: {
        version: string;
        file: string;
    }
}

export class UpdateWindow {

    public win: Electron.BrowserWindow;
    private application: Application;

    constructor(application: Application) {
        this.application = application;
    }

    private createWindow(): Electron.BrowserWindow {
        let window = new electron.BrowserWindow({
            width: 800,
            height: 150,
            resizable: false,
            center: true,
            parent: electron.BrowserWindow.getFocusedWindow(),
            darkTheme: true,
            skipTaskbar: true,
            show: true,
            modal: true
        });

        window.on('closed', () => {
            window = null;
        });

        return window;
    }

    private openUpdateModal(response: UpdateResponse): Promise<any> {
        return new Promise((resolve, reject) => {

            let message = 'Une nouvelle version de DOFUS Touch No-Emu est disponible, vous pouvez la télécharger depuis notre site!\n';
            let buttons: Array<string> = ['Se rendre sur le site'];

            if (!response.noemu.required) {
                buttons.push('Ignorer');
            } else {
                message = 'Une nouvelle version obligatoire de DOFUS Touch No-Emu est disponible, vous pouvez la télécharger sur notre site.'
            }


            dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                type: 'info',
                title: 'Nouvelle version : ' + response.noemu.version,
                message: message,
                buttons: buttons,
            }, (buttonIndex: number) => {
                if (buttonIndex == 0) {
                    shell.openExternal("http://dofustouch.no-emu.com/#download")
                    app.exit();
                } else {
                    resolve();
                }
            });
        });
    }

    public checkNoEmuUpdate(response: UpdateResponse): Promise<UpdateResponse> {
        return new Promise((resolve, reject) => {
            console.log(pkg.version);
            if (pkg.version == response.noemu.version) {
                console.log('No-Emu is already up to date');
                resolve(response);
            } else {
                switch (process.platform) {
                    case 'darwin':
                    case 'linux':
                    case 'win32':
                        this.openUpdateModal(response).then(() => {
                            resolve(response);
                        });
                        break;
                    /*case 'win32':
                     if (!fs.existsSync('updater.exe')) {
                     dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                     type: 'info',
                     title: 'Erreur updater.exe manquant',
                     message: 'Attention, il semblerait que votre système ai bloqué l\'updater' +
                     ' de No-Emu. Ajoutez une règle dans votre antivirus pour le fichier updater.exe,' +
                     ' ou téléchargez la dernière version depuis notre site.',
                     buttons: ['Se rendre sur le site', 'Ok'],
                     }, (buttonIndex: number) => {
                     if (buttonIndex == 0) {
                     shell.openExternal("http://dofustouch.no-emu.com/#download")
                     }
                     app.exit();
                     });
                     } else {
                     if(response.noemu.web){
                     this.openUpdateModal(response).then(() => {
                     resolve(response);
                     });
                     }else{
                     spawn('updater.exe', null, {
                     detached: true
                     });
                     app.quit();
                     }
                     }
                     break;*/
                }
            }
        });
    }

    public checkGameUpdate(response: UpdateResponse): Promise<UpdateResponse> {
        return new Promise((resolve, reject) => {

            if (settings.getSync('buildVersion') == response.dofustouch.version) {
                console.log('Game is already up to date');
                resolve();
            } else {
                this.win = this.createWindow();

                let savePath = app.getPath('userData') + '/game.zip';
                let remoteUrl = response.dofustouch.file;

                this.win.loadURL(`file://${__dirname}/../browser/index.html#/update/${encodeURIComponent(savePath)}/${encodeURIComponent(remoteUrl)}`);

                ipcMain.on('install-update', (event, arg) => {
                    console.log('ready to update');

                    extract(savePath, {dir: app.getPath('userData') + '/game'}, function (err: any) {
                        console.log('extract finish');
                        settings.setSync('buildVersion', response.dofustouch.version);
                        resolve();
                    })
                });
            }
        });
    }

    public run(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.retrieveUpdate().then((response) => {
                return this.checkNoEmuUpdate(response);
            }).then((response) => {
                return this.checkGameUpdate(response);
            }).then(() => {
                resolve();
            });
        });

    }

    private retrieveUpdate(): Promise<UpdateResponse> {
        return new Promise((resolve, reject) => {

            let queries = '?version=' + settings.getSync('option.buildVersion') + '&os=' + process.platform;

            request(url.resolve(this.application.website, 'update/game.php' + queries), (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let parseBody: UpdateResponse = JSON.parse(body);
                    resolve(parseBody);
                } else {
                    reject(error);
                }
            });
        });
    }

}
