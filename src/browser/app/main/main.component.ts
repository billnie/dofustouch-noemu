import {Component, Optional, ViewEncapsulation, Inject, OnInit, NgZone, SimpleChanges, ViewChild} from '@angular/core';
import {TabService} from './tab/tab.service';
import {Tab} from './tab/tab';
import {ShortCuts} from './../shortcuts/shortcuts';
import {IpcRendererService} from './../../shared/electron/ipcrenderer.service';
import {ApplicationService} from "../../shared/electron/application.service";
import {SettingsService} from "../../shared/settings/settings.service";
import {Title} from "@angular/platform-browser";

//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'main',
    templateUrl: 'app/main/main.component.html',
    styleUrls: ['app/main/main.component.css'],
    host: {
        "style": "height:100%; overflow: hidden; background: black;" // find something less ugly in future
    }
})
export class MainComponent implements OnInit {
    tabs: Tab[];
    activTab: Tab = null;
    private shortCuts: ShortCuts;

    constructor(@Inject('Window') private window: Window,
                private tabService: TabService,
                private ipcRendererService: IpcRendererService,
                private settingsService: SettingsService,
                private applicationService: ApplicationService,
                private titleService: Title) {
        (<any>this.window).appVersion = this.applicationService.appVersion;
        (<any>this.window).buildVersion = this.applicationService.buildVersion;

        this.shortCuts = new ShortCuts(this.window);

        this.titleService.setTitle('DofusTouch No-Emu');
    }


    addTab(): void {
        let tab: Tab = new Tab();
        this.tabService.addTab(tab);

        this.selectTab(tab);
    }

    removeTab(tab: Tab): void {

        if (this.activTab !== null && tab.id === this.activTab.id) {
            console.log('activTab was deleted');
            this.activTab = null;
            //let newTab = this.tabService.getNearTab(tab);
            //this.selectTab(newTab.id)
        }

        this.tabService.removeTab(tab);
    }

    setEventListener(): void {

        // ipc new tab
        this.ipcRendererService.on('new-tab', (event: Event) => {
            this.addTab();
        });

        // ipc close tab
        this.ipcRendererService.on('close-tab', (event: Event) => {
            this.removeTab(this.activTab);
        });

        // ipc switch tab
        this.ipcRendererService.on('switch-tab', (event: Event, action: string | number) => {

            if ((<any>Number).isInteger(action)) {
                if (typeof this.tabs[action] !== 'undefined') {
                    this.selectTab(this.tabs[action]);
                }
            } else {
                let index = this.tabs.indexOf(this.activTab);
                switch (action) {
                    case 'prev':
                        if (index !== -1) {
                            if (index === 0) {
                                this.selectTab(this.tabs[this.tabs.length - 1]);
                            } else {
                                this.selectTab(this.tabs[index - 1]);
                            }
                        }
                        break;
                    case 'next':
                        if (index !== -1) {
                            if (index === (this.tabs.length - 1)) {
                                this.selectTab(this.tabs[0]);
                            } else {
                                this.selectTab(this.tabs[index + 1]);
                            }
                        }
                        break;
                }
            }
        });
    }

    selectTab(tab: Tab): void {

        // remove old activTab
        if (this.activTab !== null) {
            this.activTab.isFocus = false;
        }

        // set the new one
        this.activTab = tab;

        // add focus and remove noitification
        this.activTab.isFocus = true;
        this.activTab.notification = false;

        //focus the iframe
        if (this.activTab.isLogged) {
            this.activTab.window.focus();
        }

        // change the name of the windows
        if (this.activTab.isLogged) {
            this.titleService.setTitle(this.activTab.character);
        }

    }


    ngOnInit(): void {
        this.tabs = this.tabService.getTabs();

        this.setEventListener();


        this.addTab();

    }
}
