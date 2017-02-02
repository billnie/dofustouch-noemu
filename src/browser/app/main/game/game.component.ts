import {
    Component, Input, Inject, NgZone, OnInit, AfterViewInit, Pipe, PipeTransform, Output,
    EventEmitter
} from '@angular/core';
import {Tab} from './../tab/tab';
import {ShortCuts} from './../../shortcuts/shortcuts';
import * as async from 'async';
import {IpcRendererService} from './../../../shared/electron/ipcrenderer.service';
import {SettingsService} from './../../../shared/settings/settings.service';
import {ApplicationService} from "./../../../shared/electron/application.service";
import {DomSanitizer, SafeUrl, Title} from "@angular/platform-browser";

const {remote} = (<any>global).nodeRequire('electron');

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'game',
    templateUrl: 'app/main/game/game.component.html',
    styleUrls: ['app/main/game/game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

    @Input() private tab: Tab;
    @Output() selectTab = new EventEmitter();
    private shortCuts: ShortCuts;
    private gamePath: string;
    private gameLoaded: boolean = false;

    constructor(@Inject('Window') private window: Window,
                private ipcRendererService: IpcRendererService,
                private zone: NgZone,
                private settingsService: SettingsService,
                private applicationService: ApplicationService,
                private titleService: Title) {
        this.gamePath = this.applicationService.gamePath + '/index.html';
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // after View Init get the iFrame
        this.tab.window = this.window['Frame' + this.tab.id].contentWindow;

        this.shortCuts = new ShortCuts(this.tab.window);
    }

    private gameReady(): void {

        if (this.gameLoaded) {
            this.setEventListener();
        }

        this.gameLoaded = true;
    }

    private setEventListener(): void {

        // event -> resize window game
        this.tab.window.onresize = () => {
            (<any>this.tab.window).gui._resizeUi();
        };


        // event -> log into the world
        (<any>this.tab.window).gui.playerData.on("characterSelectedSuccess", () => {

            // retrieve character name and update zone.js
            this.zone.run(() => {
                this.tab.character = (<any>this.tab.window).gui.playerData.characterBaseInformations.name;
                this.tab.isLogged = true;
                this.titleService.setTitle(this.tab.character);
            });

            // bind event IG
            this.bindEventIG();

            // bind shortcut
            this.bindShortcuts();
        });

        (<any>this.tab.window).gui.on("disconnect", () => {
            this.unBindEventIG();
            //this.
            this.zone.run(() => {
                this.tab.isLogged = false;
                this.tab.character = null;
            });
        });

        // event -> electron ask for reload setting
        this.ipcRendererService.on('reload-shortcuts', (event: any, arg: any) => {
            if (this.tab.isLogged) {
                console.log('receive->reload-shortcuts');

                // unbind all registered shortcuts
                this.unBindShortcuts();

                // re-bind new shortcuts
                this.bindShortcuts();
            }
        });
    }

    private sendMPNotif(msg: any) {
        if (!this.tab.window.document.hasFocus() && this.settingsService.option.notification.private_message) {
            if (msg.channel == 9) {

                this.zone.run(() => {
                    this.tab.notification = true;
                });

                let mpNotif = new Notification('Message de : ' + msg.senderName, {
                    body: msg.content
                });

                mpNotif.onclick = () => {
                    remote.getCurrentWindow().focus();
                    this.zone.run(() => {
                        this.selectTab.emit(this.tab);
                    });
                };


            }
        }
    }

    private sendFightTurnNotif(actor: any) {
        if (!this.tab.window.document.hasFocus()
            && this.settingsService.option.notification.fight_turn
            && (<any>this.tab.window).gui.playerData.characterBaseInformations.id == actor.id) {


            this.zone.run(() => {
                this.tab.notification = true;
            });

            let turnNotif = new Notification('Début du tour de ' + (<any>this.tab.window).gui.playerData.characterBaseInformations.name);

            turnNotif.onclick = () => {
                remote.getCurrentWindow().focus();
                this.zone.run(() => {
                    this.selectTab.emit(this.tab);
                });
            };
        }
    }

    private bindEventIG(): void {

        (<any>this.tab.window).dofus.connectionManager.on('ChatServerMessage', (msg: any) => {
            this.sendMPNotif(msg);
        });
        (<any>this.tab.window).gui.eventHandlers.GameFightTurnStartMessage.push((actor: any) => {
            this.sendFightTurnNotif(actor);
        });
        /*(<any>this.tab.window).gui.on('GameFightTurnStartMessage', (actor: any) => {
         this.sendFightTurnNotif(actor)
         });*/


    }

    private unBindEventIG(): void {
        (<any>this.tab.window).dofus.connectionManager.removeListener('ChatServerMessage', (msg: any) => {
            this.sendMPNotif(msg);
        });
        //(<any>this.tab.window).gui.removeListener('GameFightTurnStartMessage', this.sendFightTurnNotif);
        (<any>this.tab.window).gui.eventHandlers.GameFightTurnStartMessage.splice(
            (<any>this.tab.window).gui.eventHandlers.GameFightTurnStartMessage.indexOf((actor: any) => {
                this.sendFightTurnNotif(actor);
            }),
            1
        );
    }

    private unBindShortcuts(): void {
        this.shortCuts.unBindAll();
    }

    private bindShortcuts(): void {

        // end turn
        this.shortCuts.bind(this.settingsService.option.shortcuts.diver.end_turn, () => {
            (<any>this.tab.window).gui.fightManager.finishTurn()
        });

        // spell
        async.forEachOf(this.settingsService.option.shortcuts.spell, (shortcut: string, index: number) => {
            this.shortCuts.bind(shortcut, () => {
                (<any>this.tab.window).gui.shortcutBar._panels.spell.slotList[index].tap();
                //(<any>this.tab.window).gui.shortcutBar.panels.spell.slotList[index].tap();
            });
        });

        // item
        async.forEachOf(this.settingsService.option.shortcuts.item, (shortcut: string, index: number) => {
            this.shortCuts.bind(shortcut, () => {
                //(<any>this.tab.window).gui.shortcutBar.panels.item.slotList[index].tap();
                (<any>this.tab.window).gui.shortcutBar._panels.item.slotList[index].tap();
            });
        });

        // interfaces
        async.forEachOf(this.settingsService.option.shortcuts.interface.getAll(), (inter: any) => {
            (<any>this.tab.window).gui.menuBar._icons._childrenList.forEach((element: any, index: number) => {
                if (element.id.toUpperCase() == inter.key.toUpperCase()) {
                    this.shortCuts.bind(inter.value, () => {
                        let newIndex = index;
                        (<any>this.tab.window).gui.menuBar._icons._childrenList[newIndex].tap();
                    });
                    return;
                }
            });
        });
    }
}
