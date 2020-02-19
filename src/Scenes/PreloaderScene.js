import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {
        // add logo image
        var logo = this.add.image(400, 120, 'Logo');
        logo.setScale(0.45);

        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // load assets needed in our game
        this.load.image('Button', 'assets/silverbutton.png');
        this.load.image('ButtonPressed', 'assets/silverbuttonpressed.png');
        this.load.image('box', 'assets/checkbox.png');
        this.load.image('checkedBox', 'assets/checkbox-ticked.png');
        this.load.image('Logo', 'assets/star.png');
        

        this.load.audio('bgMusic', ['assets/BitQuest.mp3']);

        this.load.image('rocketFire', 'assets/RocketFire.png');
        this.load.image('bluedot', 'assets/bluedot.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('astro', 'assets/astro.png');
        this.load.image('hole', 'assets/blackhole.png');
        this.load.image('rocket', 'assets/rocket1.png');

        this.load.image('background', 'assets/BackgroundTemp.png');
        this.load.image('planet', 'assets/planet.png');
        this.load.image('planet1', 'assets/planet1.png');
        this.load.image('planet2', 'assets/planet2.png');
        this.load.image('planet3', 'assets/planet3.png');
        this.load.image('planet4', 'assets/planet4.png');
        this.load.image('planet5', 'assets/planet5.png');
        this.load.image('planet6', 'assets/planet6.png');
        this.load.image('planet7', 'assets/planet7.png');
        this.load.image('planet8', 'assets/planet8.png');


        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
    }

    create () {
    }

    init () {
        this.readyCount = 0;
    }

    ready () {
        this.scene.start('Title');
        // this.readyCount++;
        // if (this.readyCount === 20) {
        //     this.scene.start('Credits');
        // }
    }
};
