const settings = require('electron-settings');
const { app, ipcMain } = require('electron');

import { DefaultSettings } from './default.settings';
import { GameWindow } from './game-window';
import { UpdateWindow } from './update-window';

export class Application {

    public website: string = "http://dofustouch.no-emu.com";
    public devMode: boolean = false;
    private gameWindows: GameWindow[] = [];
    private updateWindow: UpdateWindow;


    constructor() {
        settings.defaults(DefaultSettings);
        settings.resetToDefaultsSync(); // debug
        this.devMode = true/*settings.getSync('option.general.developer-mode')*/;
        this.updateWindow = new UpdateWindow(this);
    }

    run(): void {
        //this.updateWindow.run();
        this.addWindow();

        ipcMain.on('load-config', (event, arg) => {
            event.returnValue = {
                gamePath : app.getPath('userData') + '/game'
            }
        })
    }

    reloadSettings(): void {
        // re bind shortcuts per game window
        this.gameWindows.forEach((gWindow) => {
            gWindow.shortCuts.reload();
        });

        // reload main menu
    }

    addWindow(): void {

        // instance window game
        let gWindow = new GameWindow(this);

        // start the game window
        gWindow.run();

        // add event listenner closed
        gWindow.closed((e) => {
            delete this.gameWindows[this.gameWindows.indexOf(e)];
        });

        // add the game window
        this.gameWindows.push(gWindow);
    }
}
