/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 100;
    var KEY = {
			"LEFT": 37,
			"UP": 38,
			"RIGHT": 39,
			"DOWN": 40
		};
  
  // Game Item Objects
    var snake = [];
    snake.push(gameItem("#snakeHead"));
    snake.push(gameItem("#snake"));
    var board = gameItem("#board");
    var apple = gameItem("#apple");
    var score = 0;
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    checkWalls();
    checkApple();
    checkSnake();
    repositionSnake();
    redrawSnake();
    $("h1").text('Score: ' + score);
    console.log(score);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(keydown) {
          	if (keydown.which === KEY.LEFT && snake[0].speedX !== 20) {
                snake[0].speedY = 0;
                snake[0].speedX = -20;
                 
			}
			else if (keydown.which === KEY.UP && snake[0].speedY !== 20) {
                snake[0].speedX = 0;
                snake[0].speedY = -20;
			} 
			else if (keydown.which === KEY.RIGHT && snake[0].speedX !== -20) {
                snake[0].speedY = 0;
                snake[0].speedX = 20;
			}
			else if (keydown.which === KEY.DOWN && snake[0].speedY !== -20) {
                snake[0].speedX = 0;
                snake[0].speedY = 20;
			}

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
     alert("Great Job! Your score was " + score);
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
function gameItem($elementId){
  var gameObject = {};
  gameObject.id = $elementId;
  gameObject.x = Number($($elementId).css('left').replace(/[^-\d\.]/g, ''));
  gameObject.y = Number($($elementId).css('top').replace(/[^-\d\.]/g, ''));
  gameObject.width = $($elementId).width();
  gameObject.height = $($elementId).height();
  gameObject.speedX = 0;
  gameObject.speedY = 0;
  return gameObject;
 }

function repositionSnake(){
    for (i= snake.length-1; i > 0; i-- ){
        snake[i].x = snake[i-1].x
        snake[i].y = snake[i-1].y
    }
    snake[0].x += snake[0].speedX;
    snake[0].y += snake[0].speedY;
        

}

function checkWalls(){
    if (snake[0].x  > board.width){
        endGame();
    }else if (snake[0].x < 0){
        endGame();
    }else if (snake[0].y < 0){
        endGame();
    }else if(snake[0].y  > board.height){
        endGame() ;
    }
}


function redrawSnake(){
    $("#snakeHead").css("left", snake[0].x);    // draw the box in the new location, positionX pixels away from the "left"
     $("#snakeHead").css("top", snake[0].y);    // draw the box in the new location, positionY pixels away from the "top"
     if (snake[0].speedX !== 0 || snake[0].speedY !== 0){
        for (i= snake.length-1; i > 0; i-- ){
            $(snake[i].id).css("left", snake[i].x);
            $(snake[i].id).css("top", snake[i].y);
        }
    } 
}

// factory for making snake piece objects
function Snake(id) {
    var snake = {};
	snake.id = id
    snake.x = snake[snake.lenghth-1].x;
    snake.y = snake[snake.lenghth-1].y;
    snake.velocityX = 0;
    snake.velocityY = 0;
    return snake;
}

function moveApple() {
   // new apple position 
  apple.x = randomInteger( board.width/apple.width) * apple.width;
  apple.y = randomInteger( board.width/apple.width) * apple.width;
  for(var i = 0; i<snake.length; i++){
  if(doCollide(apple, snake[i])){
      moveApple();
      break;
    }
      redrawApple();
    }    
}


function randomInteger(max) {
    var randomInt = Math.floor(Math.random() * max);
    return randomInt;
}


function doCollide(obj1, obj2) {
    if (obj1.x === obj2.x && obj1.y === obj2.y) {
        return true;
    }
    else {
        return false;
    }
}


function redrawApple(){
        $("#apple").css("left", apple.x);    // draw the box in the new location, positionX pixels away from the "left"
        $("#apple").css("top", apple.y);    // draw the box in the new location, positionY pixels away from the "top"

    }

function checkApple(){
    if (doCollide(apple,snake[0])){
        addNewSnakePiece();
        score += 1;
        moveApple();
    }
}


function addNewSnakePiece() {  
	var newID = "snake" + snake.length;   
	$("<div>")
		.addClass("snake")
        .attr('id', newID)
        .css('background-color', randomColor())
		.appendTo("#board");
    var newSnake = Snake("#" + newID);
    snake.push(newSnake);
}


function Snake(id) {
    var piece = {};
	piece.id = id
    piece.x = snake[snake.length-1].x;
    piece.y = snake[snake.length-1].y;
    piece.velocityX = 0;
    piece.velocityY = 0;
    return piece;
}

function checkSnake(){
 for(var i = 3; i<snake.length; i++){
  if(doCollide(snake[0], snake[i])){
      endGame();
      break;
    }
    }
}

 function randomColor(){
     var red = Math.random() * 250;
     var blue = Math.random() * 250;
     var green = Math.random() * 250;
     var colorStr = "rgb(" + red + ", " + blue + ", " + green + ")";
    return colorStr;
}
}