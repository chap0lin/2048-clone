export default class eventHandler{
    constructor(instance){
        this.instance = instance
        document.addEventListener("keydown",this.keyPush.bind(this));
    }
    keyPush(evt) {
        this.instance.moveBoard(evt.key)
    }
}