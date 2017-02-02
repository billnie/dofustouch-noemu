"use strict"
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const os = require('os');
const Emulator = require('./Emulator');
const settings = require('electron-settings');
//const electronEjs = require('electron-ejs');
//const i18n = require('i18n');
const commandLineArgs = require('command-line-args');

// Comand line for electron
app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');
app.commandLine.appendSwitch("disable-renderer-backgrounding");

// Configure Internationalization
/*i18n.configure({
    locales:['en', 'de'],
    directory: app.getAppPath() + '/locales'
});*/

// Command Line Argument
const optionDefinitions = [
  { name: 'update', alias: 'u', type: Boolean },
  { name: 'changelog', alias: 'l', type: Boolean },
  { name: 'relaunch', alias: 'r', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

settings.defaults({
    "option" :{
        "general": {
            "hidden-shop": false,
            "developer-mode": false,
            "resolution": "1280;720"
        },
        "shortcut": {
            "no-emu": {
                "new-tab": "ctrl+t",
                "new-window": "ctrl+n",
                "next-tab": "alt+right",
                "prev-tab": "alt+left",
                "activ-tab": "",
                "tabs": [
                    "f1",
                    "f2",
                    "f3",
                    "f4",
                    "f5",
                    "f6",
                    "f7",
                    "f8",
                    "f9",
                    "f10"
                ]
            },
            "diver": {
                "end-turn": "backspace"
            },
            "spell": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "0",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "item": [
                "ctrl+1",
                "ctrl+2",
                "ctrl+3",
                "ctrl+4",
                "ctrl+5",
                "ctrl+6",
                "ctrl+7",
                "ctrl+8",
                "ctrl+9",
                "ctrl+0",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "interface": {
                "carac": "c",
                "spell": "s",
                "bag": "i",
                "bidhouse": "h",
                "map": "m",
                "friend": "f",
                "book": "q",
                "guild": "g",
                "conquest": "k",
                "goutine": "",
                "job": "j",
                "alliance": "",
                "mount": "n",
                "directory": "",
                "alignement": "",
                "bestiary": "b",
                "title": "n",
                "achievement": "u",
                "almanax": "x",
                "spouse": "l",
                "shop": "v",
                "goultine": "r"
            }
        }
    }
});

var win;

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault()
    callback(true)
})

app.on('ready', function () {
    Emulator.init(options);
});

app.on('window-all-closed', () => {
    //if (process.platform !== 'darwin') {
    app.quit();
    //}
});

/*app.on('activate', () => {
    if (win === null) {
        Emulator.init(win);
    }
});*/

global.process = process;
