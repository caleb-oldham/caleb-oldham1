/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
    var KEY = {
			"W": 87,
			"UP": 38,
			"S": 83,
			"DOWN": 40
		};
  
  // Game Item Objects
    var ball = gameItem("#gameItem");
    var leftPaddle = gameItem("#leftPaddle");
    var rightPaddle = gameItem("#rightPaddle");
    var board = gameItem("#board");
    var player1Points = 0;
    var player2Points = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
    $(document).on('keyup', handleKeyUp);
    $(document).on('click', handleClick); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    if (player1Points >= 11 || player2Points >= 11){
        endGame();
    }
    doCollide(ball, leftPaddle);
    doCollide(ball, rightPaddle);
    repositionGameItem();
    redrawGameItem ();
      $("h2").text('Player1: ' + player1Points + "    " + 'Player2: ' + player2Points);

  }
  
  /* 
  Called in response to events.
  */
function handleClick(click) {
    ball.speedX = 2;
    ball.speedY = 3;
}
function handleKeyDown(keydown) {
             if (keydown.which === KEY.UP) {
//				console.log("up pressed");
                leftPaddle.speedY = -10;
                leftPaddle.y += leftPaddle.speedY;
        
			} 
			 else if (keydown.which === KEY.DOWN) {
//				console.log("down pressed");
                leftPaddle.speedY = 10;
                leftPaddle.y += leftPaddle.speedY;
            }
            else if (keydown.which === KEY.W) {
//				console.log("up pressed");
                rightPaddle.speedY = -10;
                rightPaddle.y += rightPaddle.speedY;
        
			} 
			else if (keydown.which === KEY.S) {
//				console.log("down pressed");
                rightPaddle.speedY = 10;
                rightPaddle.y += rightPaddle.speedY;
            }
            
  }
  function handleKeyUp(keyuP) {
             if (keydown.which === KEY.UP) {
//				console.log("up pressed");
                leftPaddle.speedY = 0;
                eftPaddle.y += leftPaddle.speedY;
        
			} 
			 else if (keydown.which === KEY.DOWN) {
//				console.log("down pressed");
                leftPaddle.speedY = 0;
                eftPaddle.y += leftPaddle.speedY;
            }
             else if (keydown.which === KEY.W) {
//				console.log("up pressed");
                rightPaddle.speedY = 0;
                rightPaddle.y += rightPaddle.speedY;
        
			} 
			 else if (keydown.which === KEY.S) {
//				console.log("down pressed");
                rightPaddle.speedY = 0;
                rightPaddle.y += rightPaddle.speedY;
            }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    if (player1Points >= 11){
        $("h3").text("Congrats Player 1!");
    }else{
        $("h3").text("Congrats Player 2!");
    }
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
        function repositionGameItem(){
        if (leftPaddle.y < 0){
            leftPaddle.y = 0;
        }
        if (rightPaddle.y < 0){
            rightPaddle.y = 0;
        }
        if (leftPaddle.y + leftPaddle.height > board.height){
            leftPaddle.y = board.height - leftPaddle.height;
        }
        if (rightPaddle.y + rightPaddle.height > board.height){
            rightPaddle.y = board.height - rightPaddle.height;
        }
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.y <= 0){
            ball.speedY = -ball.speedY;
        }
        if (ball.y >= board.height - ball.height ){
            ball.speedY = -ball.speedY
        }
        if(ball.x <= 0){
            player2Points += 1;
            ball.x = (board.width + ball.width) / 2;
            ball.y = (ball.height + board.height) / 2;
            ball.speedX = 2;
            ball.speedY = 2;
        }
        if(ball.x >= board.width){
            player1Points += 1;
            ball.x = (board.width + ball.width) / 2;
            ball.y = (ball.height +board.height) / 2;
            ball.speedX = -2;
            ball.speedY = -2;
        }

    }

    function redrawGameItem(){
        if (leftPaddle.y < 0){
            leftPaddle.y = 0;
        }
        if (rightPaddle.y < 0){
            rightPaddle.y = 0;
        }
        if (leftPaddle.y + leftPaddle.height > board.height){
            leftPaddle.y = board.height - leftPaddle.height;
        }
        if (rightPaddle.y + rightPaddle.height > board.height){
            rightPaddle.y = board.height - rightPaddle.height;
        }
        $("#leftPaddle").css("left", leftPaddle.x);    // draw the box in the new location, positionX pixels away from the "left"
        $("#leftPaddle").css("top", leftPaddle.y);    // draw the box in the new location, positionY pixels away from the "top"
        $("#rightPaddle").css("left", rightPaddle.x);    // draw the box in the new location, positionX pixels away from the "left"
        $("#rightPaddle").css("top", rightPaddle.y);    // draw the box in the new location, positionY pixels away from the "top"
        $("#gameItem").css("left", ball.x);    // draw the box in the new location, positionX pixels away from the "left"
        $("#gameItem").css("top", ball.y);    // draw the box in the new location, positionY pixels away from the "top"

    }
    function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.bottomY = square1.y + square1.height;
    square1.rightX = square1.x + square1.width;
  
    // TODO: Do the same for square2
    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.bottomY = square2.y + square2.height;
    square2.rightX = square2.x + square2.width;
  
    // TODO: Return true if they are overlapping, false otherwise
	if ((square1.rightX > square2.leftX) && (square1.leftX < square2.rightX) && (square1.topY < square2.bottomY) && (square1.bottomY > square2.topY)){
       ball.speedX *= 1.5;
       ball.speedY *= 1.5;
       ball.speedX = -1*ball.speedX
    } 
		
}
}
