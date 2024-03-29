class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {

    }

    preload() {

    }

    create() {
        // note that am adding starfield before white borders. objects are rendered in order of declaration.
        // want layer order to be:  starfield, green ui bar, borders for now
        // scrolling starfield map:
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // add.tileSprite() takes in args of:( x-pos, y-pos, width, height, string-key)
        // string-key is the name of the sprite we made in Menu
       
        // green UI background:
        let green = 0x00FF00;
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, green).setOrigin(0, 0);
        
 
        // white borders:
        let white = 0xFFFFFF; //using off-white borders for now for visual's sake
        this.add.rectangle(0, 0, game.config.width, borderUISize, white).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, white).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, white).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, white).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // note dynamic position because of use of variables :D
        
        // adding 3 spaceships:
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ships = [this.ship01, this.ship02, this.ship03];

        // defining keys (maybe change LEFT and RIGHT to the A and D keys...)
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // game over flag:
        this.gameOver = false;

        // creating score property
        this.p1Score = 0;
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        
        // adding 60 second clock
        scoreConfig.fixedWidth = 0;
        // 60000 is milliseconds. set for 30 second timer
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        // adding scrolling effect to starfield sprite (background effect)
        this.starfield.tilePositionX -= 4;
        
        // while game is not over
        if (!this.gameOver) {
            // allowing the rocket update cycle to run in this scene
            this.p1Rocket.update();
            
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // checking collisions:
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
          }

          
    }

    checkCollision(rocket, ship) {
        // simple AABB style checking (axis-aligned bounding boxes)
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        console.log("hit a ship!");
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //play explode animation

        // what to do when animation complete
        // after animation complete, reset position, unhide ship, remove animation sprite
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
            console.log("ship reset")
            // content here doesnt seem to happen?
        });
        console.log("hit finished");
        // score add and text update
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // idea to increase ship speed next time it 'respawns'
    
        // adding sfx
        this.sound.play("sfx-explosion");
    }
}