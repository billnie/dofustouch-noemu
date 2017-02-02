const {BrowserWindow} = require('electron');
const settings = require('electron-settings');

const ShortCuts = require('./ShortCuts');
const Emulator = require('./Emulator');

class Game {
    constructor(devMode, Emulator){
        this.Emulator = Emulator;
        this.devMode = devMode;
        this.win = new BrowserWindow({
            width: parseInt(settings.getSync('option.general.resolution').split(';')[0]),
            height: parseInt(settings.getSync('option.general.resolution').split(';')[1]),
            title : 'DofusTouch-NE',
            useContentSize: true,
            center: true,
            webPreferences: {
                backgroundThrottling: false,
                plugins: true
            }
        });
        this.shortCuts = new ShortCuts(this.win);
    }

    init(){
        // load default view and set user agent
        this.win.loadURL(this.Emulator.dirView('index.html'),
        { userAgent: "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"});

        // set shortcut for no-emu
        this.shortCuts.init();

        if (this.devMode){
            this.win.webContents.openDevTools();
        }
    }

    closed(cb){
        this.win.on('closed', () => {
            this.win = null;
            cb(this);
        });
    }

}

module.exports = Game;
