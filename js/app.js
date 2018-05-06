// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  // speed, set by the setTrack function
  this.speed;
  // initial X position, set by the setTrack function
  this.positionX;
  // lane number, set by the setTrack function
  this.laneNr;
  // Y position, set by the setTrack function
  this.positionY;
  this.setTrack();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // Enemy's position gets off the canvas, so use setTrack to generate a new track.
  if (this.positionX > 505) {
    this.setTrack();
  }

  // Update enemy's x position.
  this.positionX = this.positionX + (50 * this.speed * dt);
};

// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

// Set new track attributes for an enemy.
Enemy.prototype.setTrack = function() {
  // speed attribute: between 2 to 4, inclusive
  this.speed = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  // initial x position: between -1000 and -200, inclusive
  this.positionX = (Math.floor(Math.random() * (1000 - 200 + 1)) + 200) * -1;
  // lane nr: 1, 2 or 3, used to set Y position
  this.laneNr = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  // initial y position
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
  // Player constructor takes the allEnemies array needed for collision detection.
  constructor(allEnemies) {
    // Player image
    this.charBoy = 'images/char-boy.png';
    // Images (star, gemBlue and gemOrange) used to indicate the current level
    this.star = 'images/Star.png';
    this.gemBlue = 'images/Gem Blue.png';
    this.gemOrange = 'images/Gem Orange.png';
    // initial position / start square.
    this.x = 202;
    this.y = 392;
    // allEnemies array
    this.allEnemies = allEnemies;
    // level
    this.level = 0;
  }
  // Update Player's position if necessery i.e. after a collision.
  update() {
    // Player's position is on one of the three 'enemy' lanes
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
              this.collisionReset();
            }
            break;
          case 101:
            if (enemyPositionX > 51 && enemyPositionX <= 151) {
              this.collisionReset();
            }
            break;
          case 202:
            if (enemyPositionX > 152 && enemyPositionX <= 252) {
              this.collisionReset();
            }
            break;
          case 303:
            if (enemyPositionX > 253 && enemyPositionX <= 353) {
              this.collisionReset();
            }
            break;
          case 404:
            if (enemyPositionX > 354 && enemyPositionX <= 454) {
              this.collisionReset();
            }
        }
      }
    }
  }
  // Render level of player and Player itself.
  render() {
    if (this.level > 0 && this.level < 6) {
      ctx.drawImage(Resources.get(this.star), 0 * 101, 5 * 83);
    }
    if (this.level > 1 && this.level < 7) {
      ctx.drawImage(Resources.get(this.star), 1 * 101, 5 * 83);
    }
    if (this.level > 2 && this.level < 8) {
      ctx.drawImage(Resources.get(this.star), 2 * 101, 5 * 83);
    }
    if (this.level > 3 && this.level < 9) {
      ctx.drawImage(Resources.get(this.star), 3 * 101, 5 * 83);
    }
    if (this.level > 4 && this.level < 10) {
      ctx.drawImage(Resources.get(this.star), 4 * 101, 5 * 83);
    }
    if (this.level > 5 && this.level < 11) {
      ctx.drawImage(Resources.get(this.gemBlue), 0 * 101, 5 * 83);
    }
    if (this.level > 6 && this.level < 12) {
      ctx.drawImage(Resources.get(this.gemBlue), 1 * 101, 5 * 83);
    }
    if (this.level > 7 && this.level < 13) {
      ctx.drawImage(Resources.get(this.gemBlue), 2 * 101, 5 * 83);
    }
    if (this.level > 8 && this.level < 14) {
      ctx.drawImage(Resources.get(this.gemBlue), 3 * 101, 5 * 83);
    }
    if (this.level > 9 && this.level < 15) {
      ctx.drawImage(Resources.get(this.gemBlue), 4 * 101, 5 * 83);
    }
    if (this.level > 10) {
      ctx.drawImage(Resources.get(this.gemOrange), 0 * 101, 5 * 83);
    }
    if (this.level > 11) {
      ctx.drawImage(Resources.get(this.gemOrange), 1 * 101, 5 * 83);
    }
    if (this.level > 12) {
      ctx.drawImage(Resources.get(this.gemOrange), 2 * 101, 5 * 83);
    }
    if (this.level > 13) {
      ctx.drawImage(Resources.get(this.gemOrange), 3 * 101, 5 * 83);
    }
    if (this.level > 14) {
      ctx.drawImage(Resources.get(this.gemOrange), 4 * 101, 5 * 83);
    }
    ctx.drawImage(Resources.get(this.charBoy), this.x, this.y);
  }
  // Update the Players position according to 'keyup' events.
  // Bounds are checked so Player can't leave the canvas.
  // 'Win event' to increment level and reset position occurs
  // if Player reaches first lane.
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
        // Player reaches first lane and wins.
        if (this.y === -23) {
          if (this.level < 15) {
            this.level += 1;
          }
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
    // this is not the Player object in a setTimeout function
    let that = this;
    setTimeout(function() {
      that.resetPosition();
    }, 1000);
  }
  // Reset Player's position after a collision and decrement level.
  collisionReset() {
    this.resetPosition();
    // decrement level
    if (this.level > 0) {
      this.level -= 1;
    }
  }
  // Reset Player's position to a random column.
  resetPosition() {
    // always the same start square.
    this.x = 202;
    this.y = 392;
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
