const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu, ipcMain } = electron;

import { ShortCuts } from './shortcuts';
import { GameMenuTemplate } from './game-menu.template';
import { Application } from './application';

export class GameWindow {
    private devMode: boolean = false;
    private win: Electron.BrowserWindow;
    private application: Application;
    private menu: Electron.Menu;
    public shortCuts: ShortCuts;

    constructor(application: Application) {
        this.application = application;
        this.devMode = settings.getSync('option.general.developer-mode');
        this.win = new electron.BrowserWindow({
            width: parseInt(settings.getSync('option.general.resolution').x),
            height: parseInt(settings.getSync('option.general.resolution').y),
            useContentSize: true,
            center: true,
            webPreferences: {
                backgroundThrottling: false
            }
        });
        this.shortCuts = new ShortCuts(this.win);
        this.menu = Menu.buildFromTemplate(GameMenuTemplate.build(this.application));
    }

    public reloadSettings(): void {
        console.log('emit->reload-settings');
        this.win.webContents.send('reload-settings');

        ipcMain.once('reload-settings-done', ()=>{
            console.log('receive->reload-settings-done');
            this.shortCuts.reload();
        });

        this.menu = Menu.buildFromTemplate(GameMenuTemplate.build(this.application));
        Menu.setApplicationMenu(this.menu);
    }

    public run(): void {
        // load the app
        this.win.loadURL(`file://${__dirname}/../browser/index.html`,
            { userAgent: this.generateUA() });

        // set menu
        Menu.setApplicationMenu(this.menu);

        // bind shortcuts
        this.shortCuts.enable();


        if (this.devMode) {
            this.win.webContents.openDevTools();
        }
    }

    private generateUA(): string {
        return "";
    }

    public closed(cb: (e: GameWindow) => void): void {
        this.win.on('closed', () => {
            this.win = null;
            cb(this);
        });
    }
}
