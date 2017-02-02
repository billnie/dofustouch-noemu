//interface Window { key: Keymaster; }

export class ShortCuts {

    private shortcuts: string[] = [];
    private window: Window;

    constructor(window: Window){
        this.window = window;
    }

    public bind(shortcut: string, action: () => void): void {
        (<any>this.window).key(shortcut, () => {
            action();
        });

        this.shortcuts.push(shortcut);
    }

    public unBindAll(): void{
        this.shortcuts.forEach((shortcut) => {
            this.unBind(shortcut);
        });
    }

    public unBind(shortcut: string): void {
        (<any>this.window).key.unbind(shortcut);

        /*let index = this.shortcuts.indexOf(shortcut);

        if(index !== -1){
            this.shortcuts.splice(index, 1);
        }*/
    }
}
