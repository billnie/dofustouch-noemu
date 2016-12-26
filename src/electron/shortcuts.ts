/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />

const electronLocalshortcut = require('electron-localshortcut');
const settings = require('electron-settings');
const {app} = require('electron');
const async = require('async');


export class ShortCuts {

    private win: Electron.BrowserWindow;
    private isBinded: boolean;

    constructor(win: Electron.BrowserWindow) {
        this.win = win;
        this.isBinded = false;
    }

    public bind(): void {
        async.forEachOf(settings.getSync('option.shortcut.no-emu.tabs'), (shortcut: string, index: number) => {
            if (shortcut) {
                electronLocalshortcut.register(this.win, ShortCuts.convert(shortcut), () => {
                    this.win.webContents.send('switch-tab', index);
                });
            }
        });
    }

    public reload(): void{
        console.log('reload shortcuts');

        // remove all bind
        electronLocalshortcut.unregisterAll(this.win);

        // bind again
        this.bind();

        // send IPC to the client
        this.win.webContents.send('reload-shortcuts');
    }

    public enable(): void {
        if (!this.isBinded) {
            this.bind()
        } else {
            electronLocalshortcut.enableAll(this.win);
        }
    }

    public disable(): void {
        electronLocalshortcut.disableAll(this.win);
    }

    public static convert(shortcut: string): string {
        shortcut = shortcut.replace('ctrl', 'CmdOrCtrl');
        return shortcut;
    }
}