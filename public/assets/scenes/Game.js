export default class Game extends Phaser.Scene {

  constructor() {
    super("Game");

  }

  init(data) {
    this.level = data.level || 1;
    this.lifes = 3;
    this.score = 0;
    this.backgroundColor = data.backgroundColor || "#000";
    this.ballVelocity = data.ballVelocity || 200;
  }

  create() {
    this.scoreText = this.add.text(690, 20, "Score: " + this.score,{
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#FFF"
    });

    this.levelText = this.add.text(20, 20, "Level: " + this.level,{
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#FFF"
    });

    this.lifesText = this.add.text(360,20,"Lifes: " + this.lifes,{
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#FFF"
    });

    this.cameras.main.setBackgroundColor(this.backgroundColor);

    this.slab = this.physics.add.sprite(400,500, "slab");
    this.slab.setCollideWorldBounds(true);
    this.slab.body.allowGravity = false;
    this.slab.setImmovable(true);

    this.ball = this.physics.add.sprite(400,10, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(this.ballVelocity);

    this.obstacle = this.physics.add.staticGroup();

    this.physics.add.collider(
      this.ball,
      this.slab,
      this.scoreIncrement,
      null,
      this
    );

    this.physics.add.collider(
      this.obstacle,
      this.ball
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    
    if(this.level!=1){
    for(let i = 0; i<this.level; i++){
      this.randomObstacleX = Phaser.Math.Between(10,790),
      this.randomObstacleY = Phaser.Math.Between(80,450),
      this.randomObstacleScale = Phaser.Math.Between(1,3),
      this.obstacle.create(this.randomObstacleX, this.randomObstacleY, "obstacle").setScale(this.randomObstacleScale).refreshBody();
    }
  }
    
  }

  update() {
    if(this.cursors.right.isDown){
      this.slab.setVelocityX(450);
    } else if(this.cursors.left.isDown){
      this.slab.setVelocityX(-450);
    } else{
      this.slab.setVelocityX(0);
    }

    if(this.score>=10){
      this.scene.start("Game",{
        level : this.level = this.level + 1,
        backgroundColor : this.randomColor(),
        ballVelocity : this.ballVelocity * 1.2,
      });
    }

    if(this.ball.y>=550){
      this.looseLife();
    }

    if(this.lifes<=0){
      this.gameOver();
    }

    if(this.ball.y<=50);
  }

  scoreIncrement(){
    this.score++;
    this.scoreText.setText("Score: " + this.score);
  }

  newLevel(){

  }

  randomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i<6; i++){
      color += letters[Math.floor(Math.random()*8)];
    }
    return color;
  }

  gameOver(){
    this.slab.setVisible(false);
    this.ball.destroy();
    this.obstacle.setVisible(false);
    this.scoreText.setVisible(false);
    this.levelText.setVisible(false);
    this.lifesText.setVisible(false);
    this.cameras.main.setBackgroundColor("#0000");

    this.gameOverText = this.add.text(280,220, "Game Over",{
      fontSize: '50px',
      fill: "#fff",
      align: "center"
    });

    this.restartText = this.add.text(320,340, "Click to restart",{
      fontSize: '20px',
      fill: "#fff",
      align: "center"
    }).setInteractive().on('pointerdown', () => this.scene.start('Game'));

  }
  gameWin(){
    this.slab.setVisible(false);
    this.ball.destroy();
    this.obstacle.setVisible(false);
    this.scoreText.setVisible(false);
    this.levelText.setVisible(false);
    this.lifesText.setVisible(false);
    this.cameras.main.setBackgroundColor("87CFA4");

    this.gameWinText = this.add.text(280,220, "Game Win!",{
      fontSize: '50px',
      fill: "#fff",
      align: "center"
    });

    this.restartText = this.add.text(320,340, "Click to restart",{
      fontSize: '20px',
      fill: "#fff",
      align: "center"
    }).setInteractive().on('pointerdown', () => (this.scene.start("Game")));;    
  }

  looseLife(){
    this.lifes--;
    this.lifesText.setText("Lifes: " + this.lifes);

    this.ball.setPosition(400,20);
    this.slab.setPosition(400,500);
  }
}
