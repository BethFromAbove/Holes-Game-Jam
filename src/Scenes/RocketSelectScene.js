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

        this.Titletext = this.add.text(200, 100, 'Select your Rocket', { fontSize: 40 , fill: '#000'});
        
        this.checkedrocket2 = this.add.image(config.width*0.2, config.height/2, 'checkedRocket2');
        this.checkedrocket3 = this.add.image(config.width*0.2, config.height/2, 'checkedRocket3');
        this.checkedrocket4 = this.add.image(config.width*0.2, config.height/2, 'checkedRocket4');
        this.rocket1 = this.add.image(config.width*0.2, config.height/2, 'bigRocket1');
        this.rocket2 = this.add.image(config.width*0.4, config.height/2, 'bigRocket2');
        this.rocket3 = this.add.image(config.width*0.6, config.height/2, 'bigRocket3');
        this.rocket4 = this.add.image(config.width*0.8, config.height/2, 'bigRocket4');
        this.checkedrocket1 = this.add.image(config.width*0.2, config.height/2, 'checkedRocket1');


        this.rocket1.setInteractive();
        this.rocket2.setInteractive();
        this.rocket3.setInteractive();
        this.rocket4.setInteractive();

        this.rocket1.on('pointerdown', function () {
            this.uncheckAll();
            this.model.rocket = 1;
            this.checkedrocket1 = this.add.image(config.width*0.2, config.height/2, 'checkedRocket1');
        }.bind(this));

        this.rocket2.on('pointerdown', function () {
            this.uncheckAll();
            this.model.rocket = 2;
            this.checkedrocket2 = this.add.image(config.width*0.4, config.height/2, 'checkedRocket2');
        }.bind(this));

        this.rocket3.on('pointerdown', function () {
            this.uncheckAll();
            this.model.rocket = 3;
            this.checkedrocket3 = this.add.image(config.width*0.6, config.height/2, 'checkedRocket3');
        }.bind(this));

        this.rocket4.on('pointerdown', function () {
            this.uncheckAll();
            this.model.rocket = 4;
            this.checkedrocket4 = this.add.image(config.width*0.8, config.height/2, 'checkedRocket4');
        }.bind(this));

        this.menuButton = new Button(this, 250, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');
        this.playButton = new Button(this, 570, 480, 'Button', 'ButtonPressed', 'Play', 'Game');

    }

    uncheckAll(){
        this.checkedrocket1.destroy();
        this.checkedrocket2.destroy();
        this.checkedrocket3.destroy();
        this.checkedrocket4.destroy();
    }

    
};
