export default class Game extends Phaser.Scene {
  level;
  velocity;
  score;
  obstacle;
  backgroundColor;

  constructor(level, velocity, score, obstacle, backgroundColor) {
    super("Game");

    this.level = level;
    this.velocity = velocity;
    this.score = score;
    this.obstacle = obstacle;
    this.backgroundColor = backgroundColor;

  }

  init() {
  }

  create() {
    this.scoreText = this.add.text(620, 20, "Score: " + this.score,{
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#FFF"
    });

    this.levelText = this.add.text(20, 20, "Level: " + this.level,{
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#FFF"
    });

    this.cameras.main.setBackgroundColor(this.backgroundColor);

  }

  update() {

  }

  scoreIncrement(){}
  levelWin(){}
  addObstacle(){}
  gameOver(){}
  gameWin(){}
}
