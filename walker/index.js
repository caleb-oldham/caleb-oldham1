/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var KEY = {
			"LEFT": 37,
			"UP": 38,
			"RIGHT": 39,
			"DOWN": 40
		};
  
  // Game Item Objects
    var positionX = 0;
    var speedX = 0;
    var positionY = 0;
    var speedY = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   repositionGameItem();
   redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(keydown) {
    		if (keydown.which === KEY.LEFT) {
//				console.log("left pressed");
                speedX = -5;
                 
			}
			else if (keydown.which === KEY.UP) {
//				console.log("up pressed");
                speedY = -5;
			} 
			else if (keydown.which === KEY.RIGHT) {
//				console.log("right pressed");
                speedX = 5
			}
			else if (keydown.which === KEY.DOWN) {
//				console.log("down pressed");
                speedY = 5;
			}
  }
  function handleKeyUp(keyup) {
            speedX = 0;
            speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
  // turn off event handlers
    $(document).off();
  }

    function repositionGameItem(){
        positionX += speedX; // update the position of the box along the x-axis
        positionY += speedY; // update the position of the box along the x-axis
        

    }

    function redrawGameItem(){
        $("#gameItem").css("left", positionX);    // draw the box in the new location, positionX pixels away from the "left"
        $("#gameItem").css("top", positionY);    // draw the box in the new location, positionY pixels away from the "top"

    }

 
  }
  
