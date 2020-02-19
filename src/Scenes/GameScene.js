import 'phaser';
import Button from '../Objects/Button';

var player;
var stars;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var starfield;
var planets;
var blackHoles;

var emitter;
var menuButton;
var triangle;
var trilength;
var square;

var gameSpeed;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create () {

        var config = this.game.config;
        this.model = this.sys.game.globals.model;


        

        //  The scrolling starfield background
        starfield = this.add.tileSprite(400, 300, 800, 600, 'background');


        // menuButton = this.add.image(config.width*0.25, config.height-50, 'Button');
        // menuButton.setInteractive();
        // menuButton.on('pointerdown', function(){
        //     earthTime = 0;
        //     previousTime = 0;
        //     startTime = 0;
        //     hasLaunched = false;
        //     speed = 0;
        //     this.scene.start('Title');
        // }.bind(this));
        // menuButton.on('pointerover', function() {
        //     menuButton.setTexture('ButtonPressed');
        // }.bind(this));
        // menuButton.on('pointerout', function () {
        //     menuButton.setTexture('Button');
        // }.bind(this));
        // var MenuButtonText = this.add.text(config.width*0.2, config.height-70, 'Menu', { fontSize: '32px', fill: '#000' });
    
    // The player and its settings
    player = this.physics.add.sprite(500, 450, 'dude');

    player.setCollideWorldBounds(true);

    //  Player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();


    gameSpeed = 200;

    //  Create stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 , stepY: 70},
        velocityY: gameSpeed
    });

    planets = this.physics.add.group({
        key: 'planet',
        repeat: 3,
        setXY: { x: 100, y: 0, stepX: 150 , stepY: 150},
        immovable: true,
        velocityY: gameSpeed
    });

    blackHoles = this.physics.add.group({
        key: 'hole',
        repeat: 1,
        setXY: { x: 100, y: 0, stepX: 150 , stepY: 150},
        velocityY: gameSpeed/2
    });
    
    trilength = 50;
    triangle = new Phaser.Geom.Triangle(player.x, player.y, player.x-trilength, player.y+trilength, player.x+trilength, player.y+trilength);
    square = new Phaser.Geom.Rectangle(player.x-trilength, player.y, trilength*2, trilength*2);

    var particles = this.add.particles('bluedot');

        emitter = particles.createEmitter({
            angle: { min: 0, max: 180 },
            speed: 10,
            gravityY: 100,
            lifespan: 500,
            quantity: 2,
            scale: { start: 0.05, end: 0.1 },
            blendMode: 'ADD',
            follow: player,
            deathZone: { type: 'onLeave', source: square }
        });

    

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    //  Collide the player and the stars with the planets
    this.physics.add.collider(player, planets);


    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, blackHoles, hitHole, null, this);

    //this.cameras.main.setBounds(0, 0, 50, 50);

    // this.cameras.main.startFollow(player, true);
    // this.cameras.main.setZoom(1);

}

update () {
    var config = this.game.config;
    this.model = this.sys.game.globals.model; 

    if (gameOver)
    {
        return;
    }


    //circle.setPosition(player.x, player.y);
    //triangle.setTo(player.x, player.y, player.x-trilength, player.y+trilength, player.x+trilength, player.y+trilength);
    square.setPosition(player.x-trilength, player.y);

    //  Scroll the background
    starfield.tilePositionY -= 2;

    planets.children.iterate(function(planet){
        if (planet.y > 600) {
            planet.y = Phaser.Math.Between(-1000, 0);
        }
        if (score > 20) {
            planet.setVelocityY(gameSpeed+100);
        }
    });

    stars.children.iterate(function(star){
        if (star.y > 600) {
            star.y = Phaser.Math.Between(-1000, 0);
        }
    });

    blackHoles.children.iterate(function(hole){
        if (hole.y > 600) {
            hole.y = Phaser.Math.Between(-1000, 0);
            hole.x = Phaser.Math.Between(0, 700);

        }
    });


    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-160);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(160);
    }
    else
    {
        player.setVelocityY(0);

        player.anims.play('turn');
    }

}
};


function collectStar (player, star)
{
    //star.disableBody(true, true);
    star.y = Phaser.Math.Between(-1000, 0);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

}

function hitHole (player, hole)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}


