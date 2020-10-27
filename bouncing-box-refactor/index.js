
		/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////////////////////////////
			/////////////////// SETUP ////////////////////////////////////////
			//////////////////////////////////////////////////////////////////
      
            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
            var positionX = 0;
			var speedX = 10;
			var points = 0;

            // Every 50 milliseconds, call the update Function (see below)
            setInterval(update, 50);

            // Every time the box is clicked, call the handleBoxClick Function (see below)
			$('#box').on('click', handleBoxClick);

            //////////////////////////////////////////////////////////////////
			/////////////////// CORE LOGIC ////////////////////////////////////////
			//////////////////////////////////////////////////////////////////
            
            			/* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
			function update() {
                
                positionX = updatePosition(positionX);
                redrawBox(positionX);
                speedX = checkPosition(positionX);

			}

			/* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
			function handleBoxClick() {
                points = increasePoints(points);
                speedX = increaseSpeed(speedX);
                positionX = resetPosition();                
            }

				
            //////////////////////////////////////////////////////////////////
			/////////////////// HELPER FUNCTIONS ////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            // this function increases points
            function increasePoints(points) {
                points += 1;
                $('#box').text(points);
                return points;
                
                
            }

            //this function increases speed
            function increaseSpeed(speedX){
                if (speedX >= 0) {
					speedX += 3;
				} 
				else if (speedX < 0) {
					speedX -= 3;
                }
                return speedX;
                
            }

            // this fuction resets the position of the box
            function resetPosition(){
                positionX = 0;
                return positionX;
               
            }
            
            // this fuction updates the box's position
            function updatePosition(){
                positionX += speedX;
                return positionX;
            }
            
            // this function redraws the box in the new position
            function redrawBox(positionX){
                $('#box').css("left", positionX);
            }

            // this function checks the boxs position to see if it is out of bounds and if so changes the direction
            function checkPosition(positionX){
                if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
                }
                return speedX;
            }            






		}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
