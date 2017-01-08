const settings = require('electron-settings');
const { app } = require('electron');

import { DefaultSettings } from './default.settings';
import { GameWindow } from './game-window';

export class Application {

    private website: string = "http://dofustouch.no-emu.com";
    private devMode: boolean = false;
    private gameWindows: GameWindow[] = [];


    constructor() {
        settings.defaults(DefaultSettings);
        settings.resetToDefaultsSync();
        this.devMode = true/*settings.getSync('option.general.developer-mode')*/;
    }

    run(): void {
        this.addWindow();
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
