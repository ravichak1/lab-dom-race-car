class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro"); //game Introduction
    this.gameScreen = document.getElementById("game-screen"); //game Screen
    this.gameEndScreen = document.getElementById("game-end"); //game End Screen
    this.livesDisplay = document.getElementById("lives"); //live rest
    this.scoreDisplay = document.getElementById("score"); //score
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    if (Math.random() > 0.75 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(0, 1);
        console.log(this.lives);
        this.lives--;
        this.livesDisplay.textContent = this.lives;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles.splice(0, 1);
        this.score++;
        this.scoreDisplay.innerText = this.score;
      }
    }
    if (this.lives === 0) {
      this.endGame();
    }
  }
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(function (obstacle) {
      obstacle.element.remove();
    });
    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
