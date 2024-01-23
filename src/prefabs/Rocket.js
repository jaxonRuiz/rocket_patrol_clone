// rocket prefab
// remember prefabs are kinda like classes where they define object behavior and stuffs

class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object toe existing scene when constructor called
        scene.add.existing(this);
        // rocket object not added to scene by default. have to manually do so with 'this'
        this.isFiring = false; // tracks rocket firing status
        this.moveSpeed = 2;
        // quick curiosity, when to use this.var = value instead of let variable = value ?
    }
    update() {
        // adding movement and stuff to rocket object
        // this update is connected to the core update loop running at any given moment
        // so its good to add movement here

        // if not moving can move
        if(!this.isFiring) {
            // if not at respective borders, move left or right depending on key pressed
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }            
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.isFiring = true;
        }

        // if fired, move up (recoil effect maybe?)
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
}