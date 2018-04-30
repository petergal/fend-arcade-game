// Enemies our player must avoid
var Enemy = function(track) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.positionX = track.startPositionX;
  this.positionY = track.getLaneY();
  this.speed = track.speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.positionX > 505) {
    let track = new Track();
    this.positionX = track.startPositionX;
    this.positionY = track.getLaneY();
    this.speed = track.speed;
  }
  this.positionX = this.positionX + (50 * this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

Enemy.prototype.checkCollisions = function() {

};

// Track ...
class Track {
  constructor() {
    this.startPositionX =
      (Math.floor(Math.random() * (1000 - 200 + 1)) + 200) * -1;
    this.laneNr = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    this.speed = Math.floor(Math.random() * (10 - 1 + 1)) + 3;
  }
  getLaneY() {
    switch (this.laneNr) {
      case 1:
        return 60;
        break;
      case 2:
        return 143;
        break;
      case 3:
        return 226;
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.boy = 'images/char-boy.png';
    this.x = 202;
    // this.y = 392;
    this.y = 309;
  }
  update() {
    //collision ?!

  }
  render() {
    ctx.drawImage(Resources.get(this.boy), this.x, this.y);
  }
  handleInput(keyCode) {
    switch (keyCode) {
      case 'left':
        if (this.x <= 0) {
          break;
        }
        this.x -= 101;
        break;
      case 'up':
        if (this.y <= -23) {
          break;
        }
        this.y -= 83;
        break;
      case 'right':
        if (this.x >= 404) {
          break;
        }
        this.x += 101;
        break;
      case 'down':
        if (this.y >= 392) {
          break;
        }
        this.y += 83;
        break;
    }
    console.log(this.x, this.y);
    this.render();
  }
  reset() {

  }

}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(new Track()), new Enemy(new Track()), new Enemy(new Track()),
  new Enemy(new Track()), new Enemy(new Track()), new Enemy(new Track())
];
// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
