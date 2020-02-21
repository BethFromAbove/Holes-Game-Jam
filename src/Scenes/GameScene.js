import 'phaser';
import Button from '../Objects/Button';

var player;
var stars;
var astros;
var cursors;
var score = 0;
var scoreText;
var highscoreText;

var planets;
var blackHoles;
var background;

var emitter;
var emitterTwo;
var menuButton;
var trilength;
var square;

var gameSpeed;
var playerSpeed;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    addBlackHole(){
        var blackHole = this.physics.add.sprite(
            Phaser.Math.Between(0, 700), 
            Phaser.Math.Between(-1000, 0), 
            'hole'
            );

        blackHoles.add(blackHole);
    }

    create () {

        var config = this.game.config;
        this.model = this.sys.game.globals.model;

        //  The scrolling starfield background
        background = this.add.tileSprite(400, 300, 801, 4046, 'background');

        // The player and its settings
        //Gets appropriate rocket color
        player = this.physics.add.image(500, 450, 'rocket' + this.model.rocket);

        player.setCollideWorldBounds(true);

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        gameSpeed = 50;
        playerSpeed = 200;

        astros = this.physics.add.group({
            key: 'astro',
            repeat: 11,
            velocityY: gameSpeed*2
        });

        astros.children.iterate(function(astro){
            astro.x = Phaser.Math.Between(0, 750);
            astro.y = Phaser.Math.Between(-300, 300);
        })

        planets = this.physics.add.group();

        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet');    
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet1');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet2');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet3');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet4');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet5');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet6');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet7');
        planets.create(Phaser.Math.Between(25, 750), Phaser.Math.Between(-1000, 0), 'planet8');

        planets.children.iterate(function(planet){
            planet.body.isCircle = true;
            planet.body.immovable = true;
            planet.setVelocityY(gameSpeed);
        });

        blackHoles = this.physics.add.group({
            key: 'hole',
            repeat: 1,
            velocityY: gameSpeed/2
        });

        blackHoles.children.iterate(function(hole){
            hole.x = Phaser.Math.Between(0, 750);
            hole.y = Phaser.Math.Between(0, 300);
        })

        trilength = 50;
        square = new Phaser.Geom.Rectangle(player.x-trilength, player.y+30, trilength*2, trilength*2);

        var particles = this.add.particles('spark2');

        emitter = particles.createEmitter({
            angle: { min: -10, max: 180 },
            speed: 25,
            gravityY: 100,
            lifespan: 500,
            quantity: 2,
            scale: { start: 0.09, end: 0.1 },
            blendMode: 'ADD',
            follow: player,
            followOffset: {x: 0, y: 30},
            deathZone: { type: 'onLeave', source: square }
        });

        var particlesTwo = this.add.particles('spark1');

        emitterTwo = particlesTwo.createEmitter({
            angle: { min: -10, max: 180 },
            speed: 25,
            gravityY: 100,
            lifespan: 400,
            quantity: 1,
            scale: { start: 0.09, end: 0.1 },
            blendMode: 'ADD',
            follow: player,
            followOffset: {x: 0, y: 30},
            deathZone: { type: 'onLeave', source: square }
        });

        //  The score
        highscoreText = this.add.text(16, 16, 'Highscore: ' + this.model.highscore, { fontSize: '32px', fill: '#F9BE4F' });
        scoreText = this.add.text(16, 46, 'score: 0', { fontSize: '32px', fill: '#FFF' });

        //  Collide the player and the stars with the planets
        this.physics.add.collider(player, planets);

        //  Checks to see if the player overlaps with any of the astros, if he does call the collectAstro function
        this.physics.add.overlap(player, astros, collectAstro, null, this);
        this.physics.add.collider(player, blackHoles, hitHole, null, this);

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
                planet.x = Phaser.Math.Between(25, 750);
            }
            planet.setVelocityY(gameSpeed);
            if (score > 50) {
                planet.setVelocityY(gameSpeed+100);
            }
            if (score > 400) {
                planet.setVelocityY(gameSpeed+200);
            }

            if (score > 700) {
                planet.setVelocityY(gameSpeed+350);
            }

            if (score > 1000) {
                planet.setVelocityY(gameSpeed+500);
            }

            if (score > 1300) {
                planet.setVelocityY(gameSpeed+700);
            }

            if (score > 1500) {
                planet.setVelocityY(gameSpeed+800);
            }

        });

        astros.children.iterate(function(astro){
            if (astro.y > 600) {
                astro.y = Phaser.Math.Between(-1000, 0);
                astro.x = Phaser.Math.Between(-50, 750);
            }

        
        });


        if (blackHoles.getLength() < (score / 100)){

            this.addBlackHole();
        }


        blackHoles.children.iterate(function(hole){
            if (hole.y > 600) {
                hole.y = Phaser.Math.Between(-800, 0);
                hole.x = Phaser.Math.Between(0, 700);
            }
            //hole.setCircle(26);
        });


        if (cursors.left.isDown)
        {
            player.setVelocityX(-playerSpeed);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(playerSpeed);
        }
        else
        {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown)
        {
            player.setVelocityY(-playerSpeed);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(playerSpeed);
        }
        else
        {
            player.setVelocityY(0);
        }
    }
};


function collectAstro (player, astro)
{
    astro.y = Phaser.Math.Between(-1000, 0);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
}

function hitHole (player, hole)
{
    var config = this.game.config;
    this.model = this.sys.game.globals.model; 

    this.physics.pause();

    player.setTint(0xff0000);

    var timer = this.time.delayedCall(1000, function(){
        var popup = this.add.image(config.width/2, config.height/2, 'deathScene')
        this.add.text(355, 410, score, { fontSize: '80px', fill: '#FFF' });
        var menuButton = new Button(this, 200, 550, 'Button', 'ButtonPressed', 'Menu', 'Title');
        var playButton = new Button(this, 600, 550, 'Button', 'ButtonPressed', 'Play Again', 'Game');
        // console.log(score);
        // console.log(this.model.highscore);       

        if (score > this.model.highscore) {
            this.model.highscore = score;
            this.add.text(10, 10, 'New High Score!!!', { fontSize: '80px', fill: '#FFF' }); 
        }

        score = 0;
    }, [], this);  // delay in ms 
}
