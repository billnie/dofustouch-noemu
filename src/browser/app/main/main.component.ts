import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import {TabService} from './tab/tab.service';
import {Tab} from './tab/tab';
import { ShortCuts } from './../shortcuts/shortcuts';
import { IpcRendererService } from '../../shared/electron/ipcrenderer.service';

//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'main',
    templateUrl: 'app/main/main.component.html',
    styleUrls: ['app/main/main.component.css'],
    host: {
        "style":"height:100%; overflow: hidden;" // find something less ugly in future
    }
})
export class MainComponent {
    tabs: Tab[];
    activTab: Tab = null;
    private shortCuts: ShortCuts;

    constructor(
        @Inject('Window') private window: Window,
        private tabService: TabService,
        private ipcRendererService: IpcRendererService,
        private zone: NgZone
    ) {

    }

    getTabs(): void {
        this.tabs = this.tabService.getTabs();
        //this.activTab = this.tabService.getTab(0);
    }

    addTab(): void {
        let tab: Tab = new Tab();
        this.tabService.addTab(tab);

        this.selectTab(tab);
        this.getTabs();
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
            console.log('switch tab');
            console.log(action);
            if ((<any>Number).isInteger(action)) {
                this.selectTab(this.tabs[action]);
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
        if (this.activTab !== null) {
            this.activTab.isFocus = false;
        }

        tab.isFocus = true;
        this.activTab = tab;
        console.log(tab);
    }

    ngOnInit(): void {
        this.getTabs();

        this.shortCuts = new ShortCuts(this.window);
        this.setEventListener();
        //this.addTab();
    }
}
