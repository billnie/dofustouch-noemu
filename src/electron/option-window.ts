const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu, ipcMain } = electron;

import { Application } from './application';

export class OptionWindow {

    private win: Electron.BrowserWindow;
    private application: Application;
    private static optionWindow: OptionWindow;

    constructor(application: Application){
        this.application = application;

        ipcMain.on('validate-option', (event, arg) => {
            //this.application.reloadSettings();
            this.win.close();
        });

    }

    static run(application: Application): void{
        if(!this.optionWindow) {
            this.optionWindow = new OptionWindow(application);
        }

        this.optionWindow.win = new electron.BrowserWindow({
            width: 800,
            height: 500,
            resizable: false,
            center: true,
            parent: electron.BrowserWindow.getFocusedWindow(),
            darkTheme: true,
            skipTaskbar: true,
            show: false
        });

        this.optionWindow.win.on('closed', () => {
            this.optionWindow.application.reloadSettings();
            this.optionWindow.win = null;
        });

        this.optionWindow.win.loadURL(`file://${__dirname}/../browser/index.html#/option`);
        this.optionWindow.win.show();

    }
}
