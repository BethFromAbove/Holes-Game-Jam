export default class Model {
    constructor() {
        this._soundOn = true;
        this._musicOn = true;
        this._bgMusicPlaying = false;
        this._money = 0;
    }
    
    set musicOn(value) {
        this._musicOn = value;
    }
    
    get musicOn() {
        return this._musicOn;
    }
    
    set soundOn(value) {
        this._soundOn = value;
    }
    
    get soundOn() {
        return this._soundOn;
    }
    
    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }
    
    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }

    set money(value) {
        this._money = value;
    }

    get money() {
        return this._money;
    }

    
}
