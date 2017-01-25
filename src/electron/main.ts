const commandLineArgs = require('command-line-args');
import {app} from 'electron';

import {Application} from './application';


// Ignore black list GPU for WebGL
app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');

// Disable backgrounding renderer
app.commandLine.appendSwitch("disable-renderer-backgrounding");

// Command Line Argument
const optionDefinitions = [
    { name: 'update', alias: 'u', type: Boolean },
    { name: 'changelog', alias: 'l', type: Boolean },
    { name: 'relaunch', alias: 'r', type: Boolean },
    { name: 'remote-debugging-port', type: Boolean },
    { name: 'expose_debug_as', type: String},
    { name: 'devmode', type: Boolean}
];
const cmdOptions = commandLineArgs(optionDefinitions);

let application: Application = null;

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
});

app.on('ready', () => {

    // Singleton
    if(!application){
        application = new Application(cmdOptions);
    }

    application.run();
});

app.on('window-all-closed', function() {
    process.platform;
    //if (process.platform !== 'darwin') {
        app.quit();
    //}
});

/*app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});*/
