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
    
        // defining keys (maybe change LEFT and RIGHT to the A and D keys...)
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        // adding scrolling effect to starfield sprite (background effect)
        this.starfield.tilePositionX -= 4;
        
        // allowing the rocket update cycle to run in this scene
        this.p1Rocket.update();
        
    }
}