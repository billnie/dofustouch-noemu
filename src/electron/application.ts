import {ChangeLogWindow} from "./changelog-window";
const settings = require('electron-settings');
import {app, ipcMain} from 'electron';
import * as request from 'request';

import {DefaultSettings} from './default.settings';
import {GameWindow} from './game-window';
import {UpdateWindow} from './update-window';

export class Application {

    public website: string = "http://dofustouch.no-emu.com";
    public cmdOptions: any;
    public devMode: boolean = false;
    private gameWindows: GameWindow[] = [];
    private updateWindow: UpdateWindow;


    constructor(cmdOptions: any) {
        // set defaults settings
        settings.defaults(DefaultSettings);


        // if wrong settings -> reset
        if(!settings.getSync('buildVersion')){
            settings.resetToDefaultsSync(); // debug
        }

        this.cmdOptions = cmdOptions;
        this.devMode = cmdOptions.devmode;
        this.updateWindow = new UpdateWindow(this);
    }

    private getAppVersion(): Promise<string> {
        return new Promise((resolve, reject) => {
            request('https://itunes.apple.com/lookup?id=1041406978', function (error, response, body) {

                if (!error && response.statusCode == 200) {
                    let bodyParse = JSON.parse(body);
                    resolve(bodyParse.results[0].version);
                } else {
                    reject(error);
                }
            });
        });
    }

    private getBuildVersion(): Promise<string> {
        return new Promise((resolve, reject) => {

            request('https://proxyconnection.touch.dofus.com/build/script.js', (error, response, body) => {

                if (!error && response.statusCode == 200) {
                    const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
                    let m: RegExpExecArray;

                    m = regex.exec(body.substring(1, 10000));
                    resolve(m[2]);
                } else {
                    reject(error);
                }
            });
        });
    }


    run(): void {
        // get dynamic app and build version (avoid login block)

        Promise.all([
            this.getAppVersion(),
            this.getBuildVersion(),
        ]).then(([newAppVersion, newBuildVersion]) => {
            settings.setSync('option.appVersion', newAppVersion);

            this.updateWindow.run().then(() => {
                this.addWindow();
                this.updateWindow.win.close();

                if(this.cmdOptions.changelog){
                    ChangeLogWindow.run(this);
                }
            });

            // this.addWindow();

            ipcMain.on('load-config', (event, arg) => {

                let appPath = app.getAppPath();

                if (this.cmdOptions.devmode) {
                    appPath = __dirname + '/../../';
                }

                event.returnValue = {
                    gamePath: app.getPath('userData') + '/game',
                    appPath: appPath,
                    buildVersion: newBuildVersion,
                    appVersion: newAppVersion
                }
            });
        });

    }

    reloadSettings(): void {

        this.gameWindows.forEach((gWindow) => {
            //gWindow.shortCuts.reload();
            gWindow.reloadSettings();
        });

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
