// Node Context
const low = require('lowdb');
const async = require('async');
const {app, shell} = require('electron').remote
const {ipcRenderer} = require('electron');
const settings = require('electron-settings');

export class Tab {
    constructor(id, client) {
        this.client = client;
        this.id = id;
        this.ig = false;
        this.name = null;
        this.window = window['Frame' + this.id];
        this.Emulator = require('electron').remote.require('./Emulator');
    }

    init() {
        this.setEventListener();
    }

    hideShop() {
        if (settings.getSync('option.general.hidden-shop')) {
            $(this.window.document).find('.shopBtn.Button').parent().hide();
        } else {
            $(this.window.document).find('.shopBtn.Button').parent().show();
        }
    }

    setEventListener() {

        // Resize windows
        this.window.onresize = function () {
            this.window.gui._resizeUi();
        };

        //
        ipcRenderer.on('reloadShotcuts', (event, arg) => {
            console.log('reloadShotcuts')
            if (this.ig) {
                this.unbindShortCut();
                this.bindShortCut();
                this.hideShop();
            }
        });

        // Character IG
        this.window.gui.playerData.on("characterSelectedSuccess", () => {
            console.log('connect char');
            this.ig = true;

            //hide shop?
            this.hideShop();

            // set character name tab
            this.client.setCharacterName(this.window.gui.playerData.characterBaseInformations.name, this.id);
            this.name = this.window.gui.playerData.characterBaseInformations.name;
            // Set shortcut
            this.bindShortCut();

            // Set donate
            if (Math.random() <= 0.2) {
                setTimeout(() => {
                    //this.donateNotification();
                }, (30000 + Math.random() * 60000));
            }

            /*this.window.gui.on("GameFightStartMessage", (e)=>{
                console.log('start...')
                this.window.gui.fightManager.on("GameFightTurnStart", (e, t) => {
                    var fighter = this.getFighter(e);

                    if(fighter.name == this.name){
                        this.client.alertTurn(this.name);
                    }
                    console.log(i);
                });
            });*/
        });

        // Character Disconnect
        this.window.gui.on("disconnect", () => {
            this.unbindShortCut();
            self.client.setCharacterName('Non connecté', this.id);
            this.ig = false;
            this.name = null;
        });
    }

    donateNotification() {
        var that = this;
        let t = {
            type: this.window.gui.notificationBar.notificationType.INFORMATION,
            title: "DofusTouch No-Emu",
            text: "Tu aimes DofusTouch-NE ? Fais nous un don à la place marchande du zaap Astrub au personnage No-Emu ! <3",
            iconId: 23,
            iconColor: "blue",
            buttons: [{
                label: 'Plus d\'infos',
                action: function () {
                    shell.openExternal("http://forum.no-emu.com/viewtopic.php?f=3&t=16")
                }
            }]
        };
        this.window.gui.notificationBar.newNotification("Dons", t);
    }


    unbindShortCut() {

        this.window.key.unbind(settings.getSync('option.shortcut.diver.end-turn'));

        // spell
        async.forEachOf(settings.getSync('option.shortcut.spell'), (shortcut, index, callback) => {
            this.window.key.unbind(shortcut);
            callback();
        });

        // item
        async.forEachOf(settings.getSync('option.shortcut.item'), (shortcut, index, callback) => {
            this.window.key.unbind(shortcut);
            callback();
        });

        //diver
        async.forEachOf(settings.getSync('option.shortcut.diver'), (shortcut, key, callback) => {
            this.window.key.unbind(shortcut);
            callback();
        });

        //interface
        async.forEachOf(settings.getSync('option.shortcut.interface'), (shortcut, key, callback) => {
            this.window.gui.menuBar._icons._childrenList.forEach((element, index) => {
                if (element.id.toUpperCase() == key.toUpperCase()) {
                    this.window.key.unbind(shortcut);
                    return;
                }
            });
            callback();
        });
    }

    bindShortCut() {
        // end turn
        this.window.key(settings.getSync('option.shortcut.diver.end-turn'), () => {
            //console.log('end turn');
            //this.window.turnReady.tap();
            this.window.gui.fightManager.finishTurn()
        });


        // spell
        async.forEachOf(settings.getSync('option.shortcut.spell'), (shortcut, index, callback) => {
            this.window.key(shortcut, () => {
                this.window.gui.shortcutBar._panels.spell.slotList[index].tap();
            });
            callback();
        });

        // item
        async.forEachOf(settings.getSync('option.shortcut.item'), (shortcut, index, callback) => {
            this.window.key(shortcut, () => {
                this.window.gui.shortcutBar._panels.item.slotList[index].tap();
            });
            callback();
        });

        //diver
        async.forEachOf(settings.getSync('option.shortcut.diver'), (shortcut, key, callback) => {
            this.window.key(shortcut, () => {

            });
            callback();
        });

        //interface
        async.forEachOf(settings.getSync('option.shortcut.interface'), (shortcut, key, callback) => {
            this.window.gui.menuBar._icons._childrenList.forEach((element, index) => {
                if (element.id.toUpperCase() == key.toUpperCase()) {
                    this.window.key(shortcut, () => {
                        let newIndex = index;
                        this.window.gui.menuBar._icons._childrenList[newIndex].tap();
                    });
                    return;
                }
            });
            callback();
        });
    }
}
