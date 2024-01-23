class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        //loading all images/sprites before running...
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // after loading images, available in *all* subsiquent scenes
        // (to my understanding anyways)
        //remember that this. keyword refers to the whole game object
        // '.this' allows the image to be referenced in other scenes
    }

    create() {
        this.add.text(20, 20, "Rocket Patrol Menu");
        this.scene.start("playScene");
    }

    update() {

    }
}