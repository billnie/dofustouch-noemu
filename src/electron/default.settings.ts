import {ISettings} from './../shared/settings';

export const DefaultSettings: ISettings = {
    buildVersion: null,
    appVersion: null,
    option: {
        general: {
            hidden_shop: false,
            developper_mode: false,
            resolution: {
                x: 1280,
                y: 720
            }
        },
        shortcuts: {
            no_emu: {
                new_tab: "ctrl+t",
                new_window: "ctrl+n",
                next_tab: "alt+right",
                prev_tab: "alt+left",
                activ_tab: "",
                tabs: [
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
            diver: {
                end_turn: "backspace"
            },
            spell: [
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
            item: [
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
            interface: {
                carac: "c",
                spell: "s",
                bag: "i",
                bidhouse: "h",
                map: "m",
                friend: "f",
                book: "q",
                guild: "g",
                conquest: "k",
                job: "j",
                alliance: "",
                mount: "n",
                directory: "",
                alignement: "",
                bestiary: "b",
                title: "n",
                achievement: "u",
                almanax: "x",
                spouse: "l",
                shop: "v",
                goultine: "r"
            }
        }
    }
};
