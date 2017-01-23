export class Tab {
  id: number;
  character: string;
  isLogged: boolean;
  isFocus: boolean;
  window: Window;
  static seqId: number = 1;

  public constructor(){
      this.id = Tab.seqId++;
      this.character = "non connecté";
      this.isLogged = false;
      this.isFocus = false;
      this.window = null;
  }
}
