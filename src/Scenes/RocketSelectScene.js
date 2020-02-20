import 'phaser';
import Button from '../Objects/Button';

export default class RocketSelectScene extends Phaser.Scene {
    constructor () {
        super('RocketSelect');
    }


    create () {
        this.model = this.sys.game.globals.model;
        var config = this.game.config;

        this.add.image(config.width/2, config.height/2, 'aboutBG');

        this.Titletext = this.add.text(300, 100, 'Rocket select', { fontSize: 40 , fill: '#000'});
        
        var rocket1 = this.add.image(config.width*0.2, config.height/2, 'rocket1');
        var rocket2 = this.add.image(config.width*0.4, config.height/2, 'rocket2');
        var rocket3 = this.add.image(config.width*0.6, config.height/2, 'rocket3');
        var rocket4 = this.add.image(config.width*0.8, config.height/2, 'rocket4');

        //rocket1.scale = 2;

        //this.Rocket1Button = this.add.image(200, 200, 'checkedBox');
        //this.Rocket1Text = this.add.text(250, 190, 'Rocket 1', { fontSize: 24 , fill: '#000'});


        // this.Rocket1Button.setInteractive();

        // this.Rocket1Button.on('pointerdown', function () {
        //     this.model.musicOn = !this.model.musicOn;
        //     this.updateAudio();
        // }.bind(this));

        // this.soundButton.on('pointerdown', function () {
        //     this.model.soundOn = !this.model.soundOn;
        //     this.updateAudio();
        // }.bind(this));

        this.menuButton = new Button(this, 400, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');
        this.playButton = new Button(this, 400, 200, 'Button', 'ButtonPressed', 'Play', 'Game');

    }

    
};
