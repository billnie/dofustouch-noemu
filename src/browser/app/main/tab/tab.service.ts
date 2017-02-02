import { Injectable } from '@angular/core';
import { Tab } from './tab';

@Injectable()
export class TabService {

    private tabs:Tab[] = [];

    getTabs(): Tab[]{
        return this.tabs;
    }

    getTab(id: number): Tab {
        return this.tabs.filter((tab:Tab) => {
            return tab.id === id;
        })[0];
    }

    addTab(tab: Tab): void {
        this.tabs.push(tab);
    }

    getNearTab(nearTab: Tab): Tab {
        let tabs = this.tabs.filter((tab:Tab) => {
            return tab.id > nearTab.id;
        });

        if(tabs){
            return tabs[0];
        }

        tabs = this.tabs.filter((tab:Tab) => {
            return tab.id < nearTab.id;
        });

        if(tabs){
            return tabs[(tabs.length-1)];
        }

        return null;
    }

    removeTab(tab: Tab): void {
        console.log('remove tab');
        let index = this.tabs.indexOf(tab);

        if(index !== -1){
            console.log('remove');
            this.tabs.splice(index, 1);
        }
    }

}
