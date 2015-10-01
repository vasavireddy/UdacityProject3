// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.velocity = getRandomArbitrary(1,4);

    //Start Positions of enemies
    this.x = 0;
    this.y =  randomCol(); //chooses a random stone row

};

var HEIGHT = 83;
var WIDTH = 101;

function getRandomArbitrary(min, max) { 
    return Math.random() * (max - min) + min;
}

//select a random integer
function getRandomInt(min, max) { 
  return Math.floor(Math.random() * (max - min)) + min;
}

//select a random column
function randomCol() { 
    return (getRandomInt(0,3) + .7) * (WIDTH - 15);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.velocity) { // check if an enemy

        if (this.x > WIDTH * 7) {
            this.x = WIDTH * (-1);
            this.y =  randomCol();
        }
        this.x = this.x + (dt * this.velocity * (WIDTH));

        if ((this.x > (player.x - WIDTH/4)) && (this.x < (player.x + WIDTH/4))) { // player collision with enemy within a range
            if ((this.y > (player.y - HEIGHT/2)) && (this.y < (player.y + HEIGHT/2))) {
                player.x = WIDTH * 2;
                player.y = HEIGHT * 4.5;
            }
        }
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    //User Image
    this.sprite = 'images/char-princess-girl.png';

    var startX = WIDTH * 2; //starting position
    var startY = HEIGHT * 4.5;

    this.x = startX;
    this.y = startY;


};

//Player Prototype Class

Player.prototype = Object.create(Enemy.prototype);

Player.prototype.constructor = Player; // resets the constructor


//Player location based on user's arrow movements

Player.prototype.handleInput = function(keyInput) {

//Player is confined to canvas on all sides

    if (keyInput == 'left') {
        if (this.x > 0) {
            this.x = this.x - WIDTH;
        }
    }

    else if (keyInput == 'right') {
        if (this.x < (WIDTH * 4)) { 
            this.x = this.x + WIDTH;
        }
    }

    else if (keyInput == 'up') {
        if (this.y > HEIGHT * .5) { 
            this.y = this.y - HEIGHT;
        }
        else {
            player.x = WIDTH * 2;
            player.y = HEIGHT * 4.5;
        }
    }

    else if (keyInput == 'down') {
        if (this.y < HEIGHT * 4.5) { 
            this.y = this.y + HEIGHT;
        }
    }

    this.render();

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();


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