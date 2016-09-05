/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();
var appleEaten = false;

var snake = [{x: 0, y: 0, size: 10}];
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
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;
  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
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
  // TODO: Grow the snake periodically
  // TODO: Move the snake
  move(input);
  if(appleEaten)addBody();
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
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
  backCtx.fillStyle = "red";
  for(i = 0; i < snake.length; i++){
    backCtx.fillRect(snake[i].x,snake[i].y,snake[i].size,snake[i].size);
  }

  //backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  // TODO: Draw the game objects into the backBuffer

}
//handles updating the snakes location
function move(input){
  if(input.up) snake[0].y -=1;
  if(input.down) snake[0].y +=1;
  if(input.right) snake[0].x +=1;
  if(input.left) snake[0].x -=1;
  if(snake.length >1)updateSnake();
}
//handles how the snake follows the head
function updateSnake(){
  for(i=1; i <snake.length; i++){
    if(snake[i].y > snake[i-1].y){
      snake[i].y--;
    }
    else if(snake[i].y < snake[i-1].y){
      snake[i].y++;
    }
    else if(snake[i].x > snake[i-1].x){
      snake[i].x--;
    }
    else if(snake[i].x < snake[i-1].x){
      snake[i].x++;
    }
  }
}
//adds length to snake if apple is eaten
function addBody(){
  var x;
  var y;
  if(input.left){
    x = snake[0].x + snake[0].size;
    y = snake[0].y;
  }
  else if(input.right){
    x = snake[0].x - snake[0].size;
    y = snake[0].y;
  }
  else if(input.up){
    y = snake[0].y + snake[0].size;
    x = snake[0].x;
  }
  else if(input.down){
    y = snake[0].y - snake[0].size;
    x = snake[0].x;
  }
  snake.push({x: x, y: y, size: snake[0].size})
}

//sets input to something
window.onkeydown = function(event){
  event.preventDefault();
  switch(event.keyCode){
    //up
      case 38:
      case 87:
        input.up = true;
        input.right = false;
        input.left = false;
        input.down = false;
        break;
        //left
      case 37:
      case 65:
        input.up = false;
        input.right = false;
        input.left = true;
        input.down = false;
        break;
        //right
      case 39:
      case 68:
        input.up = false;
        input.right = true;
        input.left = false;
        input.down = false;
        break;
        //down
      case 40:
      case 83:
        input.up = false;
        input.right = false;
        input.left = false;
        input.down = true;
        break;
  }
}



/* Launch the game */
window.requestAnimationFrame(loop);
