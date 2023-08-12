export default class Preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }

    preload(){
        this.load.image("slab", "./public/assets/images/slab.png");
        this.load.image("ball", "./public/assets/images/ball.png");
        this.load.image("obstacle", "./public/assets/images/obstacle.png");
    }

    create(){
        this.scene.start("Game");
    }
}