import 'phaser';
import Button from '../Objects/Button';

var player;
var stars;
var astros;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var planets;
var blackHoles;
var background;

var emitter;
var menuButton;
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
        background = this.add.tileSprite(400, 300, 801, 4046, 'background');


        
    
    // The player and its settings
    player = this.physics.add.image(500, 450, 'rocket');

    player.setCollideWorldBounds(true);


    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();


    gameSpeed = 200;

    //  Create stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    astros = this.physics.add.group({
        key: 'astro',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 , stepY: 70},
        velocityY: gameSpeed
    });

    planets = this.physics.add.group();

    //planets.create(100, 0, 'planet1');
    //planets.create(200, 0, 'planet2');
    //planets.create(300, 0, 'planet3');
    //planets.create(400, 0, 'planet4');
    planets.create(500, 0, 'planet5');
    planets.create(600, 0, 'planet6');
    planets.create(700, 0, 'planet7');
    planets.create(800, 0, 'planet8');


    planets.children.iterate(function(planet){
        planet.body.immovable = true;
        planet.setVelocityY(gameSpeed);
        //planet.setCircle(44);
    });
    
    blackHoles = this.physics.add.group({
        key: 'hole',
        repeat: 1,
        setXY: { x: 100, y: 0, stepX: 150 , stepY: 150},
        velocityY: gameSpeed/2

    });
    
    trilength = 50;
    square = new Phaser.Geom.Rectangle(player.x-trilength, player.y+30, trilength*2, trilength*2);

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
            followOffset: {x: 0, y: 30},
            deathZone: { type: 'onLeave', source: square }
        });

    

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    //  Collide the player and the stars with the planets
    this.physics.add.collider(player, planets);


    //  Checks to see if the player overlaps with any of the astros, if he does call the collectAstro function
    this.physics.add.overlap(player, astros, collectAstro, null, this);

    this.physics.add.collider(player, blackHoles, hitHole, null, this);

    //this.cameras.main.setBounds(0, 0, 50, 50);

    // this.cameras.main.startFollow(player, true);
    // this.cameras.main.setZoom(1);

}

update () {
    var config = this.game.config;
    this.model = this.sys.game.globals.model; 


    square.setPosition(player.x-trilength, player.y+30);

    //  Scroll the background
    background.tilePositionY -= 1;

    planets.children.iterate(function(planet){
        if (planet.y > 600) {
            planet.y = Phaser.Math.Between(-1000, 0);
        }
        if (score > 20) {
            planet.setVelocityY(gameSpeed+100);
        }
        if (score > 50) {
            planet.setVelocityY(gameSpeed+200);
        }
    });

    astros.children.iterate(function(astro){
        if (astro.y > 600) {
            astro.y = Phaser.Math.Between(-1000, 0);
        }
    });

    blackHoles.children.iterate(function(hole){
        if (hole.y > 600) {
            hole.y = Phaser.Math.Between(-1000, 0);
            hole.x = Phaser.Math.Between(0, 700);
        }
        hole.setCircle(26);
    });


    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        //player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        //player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        //player.anims.play('turn');
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

        //player.anims.play('turn');
    }
}
};


function collectAstro (player, astro)
{
    //astro.disableBody(true, true);
    astro.y = Phaser.Math.Between(-1000, 0);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

}

function hitHole (player, hole)
{
    var config = this.game.config;
    this.physics.pause();

    player.setTint(0xff0000);

    var popup = this.add.image(config.width/2, config.height/2, 'planet4')
    this.add.text(config.width/4 + 10, config.height*0.2, 'You died, Your score was ' + score, { fontSize: '25px', fill: '#000' });
    var menuButton = new Button(this, 400, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');
    score = 0;
}


