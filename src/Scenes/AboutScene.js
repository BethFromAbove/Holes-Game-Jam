import 'phaser';
import Button from '../Objects/Button';

export default class AboutScene extends Phaser.Scene {
    constructor () {
        super('About');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.add.image(config.width/2, config.height/2, 'aboutBG');

        this.add.text(config.width*0.1, config.height*0.11, 'Quick! Get in your space ship! \n\nWe have just received news there are \nblack holes all over this area of space. \nWe need you to go and rescue astronauts who \nare not aware of the danger they are in. \nBe careful out there, if you hit a black \nhole it’s game over.   \n\nMove your Space ship around using the \narrow keys to pick up the Astronauts. \nWatch out for planets and avoid the black \nholes as long as you can.', { align: 'center', fontSize: '25px', fill: '#000' });
        this.menuButton = new Button(this, 400, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');

    }

};
