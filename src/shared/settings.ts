export interface IGeneral {
    hidden_shop: false;
    developper_mode: false;
    resolution: {
        x: number;
        y: number;
    }
}

export interface ISettings {
    buildVersion: string;
    appVersion: string;
    option: {
        general: IGeneral;
        shortcuts: {
            no_emu: {
                new_tab: string;
                new_window: string;
                next_tab: string;
                prev_tab: string;
                activ_tab: string;
                tabs: Array<string>;
            }
            diver: {
                end_turn: string;
            }
            spell: Array<string>;
            item: Array<string>;
            interface: {
                carac: string;
                spell: string;
                bag: string;
                bidhouse: string;
                map: string;
                friend: string;
                book: string;
                guild: string;
                conquest: string;
                job: string;
                alliance: string;
                mount: string;
                directory: string;
                alignement: string;
                bestiary: string;
                title: string;
                achievement: string;
                almanax: string;
                spouse: string;
                shop: string;
                goultine: string;
            }
        }
    }
}
