/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();


var appleEaten = false;
var speed = 2;
var gameEnd = false;
var snakeImage = new Image();
snakeImage.src = "purpledot.jpg";
var snake = [{x: 0, y: 0, size: 10}];
var apple = new Image();
apple.src = "apple.jpg";
var apples = [];

var input = {
  up: false,
  down: false,
  left: false,
  right: true
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {

    if(!gameEnd){
        var elapsedTime = newTime - oldTime;
        oldTime = newTime;
        update(elapsedTime);
        render(elapsedTime);
        // Flip the back buffer
        frontCtx.drawImage(backBuffer, 0, 0);
        // Run the next loop
        window.requestAnimationFrame(loop);
    }
    else{
        end();
    }
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  // TODO: Spawn an apple periodically
  spawnApple();
  // TODO: Grow the snake periodically
  if(appleEaten){
      addBody();
      appleEaten = false;
  }
  // TODO: Move the snake
  move();
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  collisionSides();
  // TODO: Determine if the snake has eaten an apple
  collisionApple();
  // TODO: Determine if the snake has eaten its tail
  collisionTail();
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  //had to do this because clearing back buffer in render doesnt work
  frontCtx.clearRect(0,0,frontBuffer.width, frontBuffer.height);
  backCtx.fillStyle = "purple";
  for(i = snake.length-1; i >= 0; i--){
    backCtx.drawImage(snakeImage,snake[i].x,snake[i].y,snake[i].size,snake[i].size);
    backCtx.strokeRect(snake[i].x,snake[i].y,snake[i].size,snake[i].size);
  }
  if(apples.length >0){
      backCtx.drawImage(apple,apples[0].x,apples[0].y, apples[0].size,apples[0].size);
  }


  //backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  // TODO: Draw the game objects into the backBuffer

}
//handles updating the snakes location
function move(){
    updateSnakeBody();
    if(input.up){
        snake[0].y -=speed;
    }
    if(input.down){
        snake[0].y +=speed;
    }
    if(input.right){
        snake[0].x +=speed;
    }
      if(input.left){
        snake[0].x -=speed;
    }
}
//checks for collision with apple
function collisionApple(){
    var head = snake[0];
    var app = apples[0];
    if(head.y > app.y && head.y < (app.y + 10))
    {
        if ((head.x+10) > app.x && (head.x+10) < (app.x +10)) {
            appleEaten = true;
            apples.pop();
            console.log("collision");
        }
        else if (head.x > app.x && head.x < (app.x + 10)) {
            appleEaten = true;
            apples.pop();
            console.log("collision");
        }
    }
    else if ((head.y+10) > app.y && (head.y+10) < (app.y+10)) {
        if ((head.x+10) > app.x && (head.x+10) < (app.x +10)) {
            appleEaten = true;
            apples.pop();
            console.log("collision");
        }
        else if (head.x > app.x && head.x < (app.x + 10)) {
            appleEaten = true;
            apples.pop();
            console.log("collision");
        }
    }
    if (head.x == app.x && head.y == app.y){
        appleEaten = true;
        apples.pop();
        console.log("collision");
    }
}

//handles collision with sides
function collisionSides(){
    head = snake[0];
    if(head.y < 0 || (head.y+10) > backBuffer.height || head.x < 0 || (head.x+10) > backBuffer.width){
        gameEnd = true;
    }
}

function collisionTail(){
    var head = snake[0];
    for(i = 10; i < snake.length; i++){
        var tail = snake[i];
        if(head.y > tail.y && head.y < (tail.y + 10))
        {
            if ((head.x+10) > tail.x && (head.x+10) < (tail.x +10)) {
                gameEnd = true;
                console.log("gameEnd");
            }
            else if (head.x > tail.x && head.x < (tail.x + 10)) {
                gameEnd = true;
                console.log("gameEnd");
            }
        }
        if ((head.y+10) > tail.y && (head.y+10) < (tail.y+10)) {
            if ((head.x+10) > tail.x && (head.x+10) < (tail.x +10)) {
                gameEnd = true;
                console.log("gameEnd");
            }
            else if (head.x > tail.x && head.x < (tail.x + 10)) {
                gameEnd = true;
                console.log("gameEnd");
            }
        }
    }

}
//end game
function end(){
    frontCtx.clearRect(0,0,frontBuffer.width, frontBuffer.height);
    frontCtx.font = "80px Arial";
    frontCtx.fillText("Game Over", frontBuffer.width/4, frontBuffer.height/2);
}

//creates a random location of apple
function spawnApple(){
    if(apples.length == 0){
        apples.push({x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 470), size: 10});
    }
}
//updates the snake body to follow the head
function updateSnakeBody(){
    for (i=snake.length-1; i > 0;i--){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
}
//adds length to snake if apple is eaten
function addBody(){
    for(i = 0; i < snake[0].size/speed;i++){
        snake.push({x: snake[0].x, y: snake[0].y, size: snake[0].size});
    }

}
//sets input to something
window.onkeydown = function(event){
  event.preventDefault();
  switch(event.keyCode){
    //up
      case 38:
      case 87:
        if(!input.down){
            input.up = true;
            input.right = false;
            input.left = false;
            input.down = false;
        }
        break;
        //left
      case 37:
      case 65:
        if(!input.right){
            input.up = false;
            input.right = false;
            input.left = true;
            input.down = false;
        }
        break;
        //right
      case 39:
      case 68:
        if(!input.left){
            input.up = false;
            input.right = true;
            input.left = false;
            input.down = false;
        }
        break;
        //down
      case 40:
      case 83:
        if(!input.up){
            input.up = false;
            input.right = false;
            input.left = false;
            input.down = true;
        }
        break;
  }
}



/* Launch the game */
window.requestAnimationFrame(loop);
