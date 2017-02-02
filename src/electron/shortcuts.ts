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

    public bindAll(): void {
        async.forEachOf(settings.getSync('option.shortcuts.no_emu.tabs'), (shortcut: string, index: number) => {
            if (shortcut) {
                electronLocalshortcut.register(this.win, ShortCuts.convert(shortcut), () => {
                    this.win.webContents.send('switch-tab', index);
                });
            }
        });
    }

    public reload(): void{


        // remove all bind
        electronLocalshortcut.unregisterAll(this.win);

        // bind again
        this.bindAll();

        // send IPC to the client
        console.log('emit->reload-shortcuts');
        this.win.webContents.send('reload-shortcuts');
    }

    public enable(): void {
        if (!this.isBinded) {
            this.bindAll()
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
