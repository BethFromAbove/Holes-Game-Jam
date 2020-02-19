import 'phaser';
import Button from '../Objects/Button';

export default class AboutScene extends Phaser.Scene {
    constructor () {
        super('About');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.add.image(config.width/2, config.height/2, 'titleBackground');

        this.add.text(30, config.height*0.1, 'Relatively Special Deliveries\nDelivering the packages of today - tomorrow!\n\nThanks to Einstein’s Special Relativity, time slows down \nfor a traveller moving at near light speed. We make use of \nthis property of space-time, plus our expendable employees, \nto run your future errands!\n\nThat’s right, for only a handful of SpaceBucks, we will plunge \ninto the far-flung future to deliver things on your behalf. \nWorried about forgetting your anniversary in 10 years? \nWe’re on it! \nWant to send a birthday present to your great-great-\ngreat-grand daughter? \nLook no further!\n\nWith Relatively Special Deliveries, the future is now!', { fontSize: '20px', fill: '#000' });
        this.add.text(30, config.height*0.9, 'All trips are one-way, travelling back in time is not possible with our current understanding of physics. \nRSD is not responsible for any loss of goods or personnel due to cataclysmic future events.', { fontSize: '10px', fill: '#000' });

        this.menuButton = new Button(this, 400, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');

    }

};
