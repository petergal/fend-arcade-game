// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.speed;
  this.positionX;
  this.laneNr;
  this.positionY;
  this.setTrack();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // Enemy's position gets off the canvas, so renew track.
  if (this.positionX > 505) {
    this.setTrack();
  }

  // Update enemy's x position.
  this.positionX = this.positionX + (50 * this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

// Set new track attributes for an enemy.
Enemy.prototype.setTrack = function() {
  // speed attribute: between 2 to 4, inclusive
  this.speed = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  // initial x position: between -1000 and -200, inclusive
  this.positionX = (Math.floor(Math.random() * (1000 - 200 + 1)) + 200) * -1;
  // lane nr: 1, 2 or 3
  this.laneNr = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  // initial y position: determine from lane nr
  switch (this.laneNr) {
    case 1:
      this.positionY = 60;
      break;
    case 2:
      this.positionY = 143;
      break;
    case 3:
      this.positionY = 226;
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(allEnemies) {
    this.boy = 'images/char-boy.png';
    this.x = 0;
    this.y = 309;
    this.allEnemies = allEnemies;
    this.level = 0;
  }
  update() {
    // Player's position is on one of the three lanes
    if (this.y == 60 || this.y == 143 || this.y == 226) {
      this.checkCollision();
    }
  }
  // Check collision event and call reset function.
  checkCollision() {
    for (let i = 0; i < allEnemies.length; i++) {
      let enemyLaneNr = allEnemies[i].laneNr;
      let enemyPositionX = allEnemies[i].positionX;
      // Enemy and Player are on the same lane
      if (enemyLaneNr === 1 && this.y === 60 ||
        enemyLaneNr === 2 && this.y === 143 ||
        enemyLaneNr === 3 && this.y === 226) {
        switch (this.x) {
          case 0:
            if (enemyPositionX > -51 && enemyPositionX <= 50) {
              this.resetCollision();
            }
            break;
          case 101:
            if (enemyPositionX > 51 && enemyPositionX <= 151) {
              this.resetCollision();
            }
            break;
          case 202:
            if (enemyPositionX > 152 && enemyPositionX <= 252) {
              this.resetCollision();
            }
            break;
          case 303:
            if (enemyPositionX > 253 && enemyPositionX <= 353) {
              this.resetCollision();
            }
            break;
          case 404:
            if (enemyPositionX > 354 && enemyPositionX <= 454) {
              this.resetCollision();
            }
        }
      }
    }
  }
  // Render Player
  render() {
    if (this.level > 0) {
      ctx.drawImage(Resources.get('images/Star.png'), 0 * 101, 5 * 83);
    }
    if (this.level > 1) {
      ctx.drawImage(Resources.get('images/Star.png'), 1 * 101, 5 * 83);
    }
    if (this.level > 2) {
      ctx.drawImage(Resources.get('images/Star.png'), 2 * 101, 5 * 83);
    }
    if (this.level > 3) {
      ctx.drawImage(Resources.get('images/Star.png'), 3 * 101, 5 * 83);
    }
    if (this.level > 4) {
      ctx.drawImage(Resources.get('images/Star.png'), 4 * 101, 5 * 83);
    }
    ctx.drawImage(Resources.get(this.boy), this.x, this.y);
  }
  // Update the Players position according to 'keyup' events.
  // Bounds are checked so Player can't leave the canvas.
  // Win event occurs if Player reaches first lane.
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
        // Player reached first lane and wins.
        if (this.y === -23) {
          this.level += 1;
          this.resetWin();
        }
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
    this.render();
  }
  // Reset Player's position after a win.
  resetWin() {
    let that = this;
    setTimeout(function() {
      that.resetPosition();
    }, 1000);
  }
  // Reset Player's position after a collision.
  // Set level down.
  resetCollision() {
    this.resetPosition();
    if (this.level > 0) {
      this.level -= 1;
    }
  }
  resetPosition() {
    let cols = [0, 101, 202, 303, 404]
    this.x = cols[Math.floor(Math.random() * cols.length)];
    this.y = 309;
  }
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy()
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
