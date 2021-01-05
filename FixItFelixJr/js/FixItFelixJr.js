/*
    collision-detection.js
*/

/* ************************************************************* */
//When the page has fully loaded, execute the eventWindowLoaded function
window.addEventListener("load",eventWindowLoaded, false);

/* ************************************************************* */
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp() 
function eventWindowLoaded() {
    canvasApp();	
} // eventWindowLoaded()

/* ************************************************************* */
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;	
} // canvasSupport()

/* ************************************************************* */
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Support */
        
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return;	
    }//if 
    
    // declare an array to hold the image objects
    var charracterImages = [];
    
    //-----------------------------------------------------------
    // declare an array for image sources and assign the image sources
    var charracterImageSources = [
        //
        "./sprites/FelixSprite.png",
        // 
        "./sprites/FelixFixingSprite.png",
        // 
        "./sprites/FelixHitSprite.png",
        //
        "./sprites/RalphSprite.png",
        //
        "./sprites/BrickHouse.png"
    ]; //imageSource 
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function loadCharracterImages( charracterImages, charracterImageSources, callback ) {
        var loadedImages = 0;
        //- - - - - - - - - - - - - - - - - - - - -
        // for each imageSource
        for ( var src = 0; src < charracterImageSources.length; src++ ) {
            //- - - - - - - - - - - - - - - - - - - - -
            //create a new image object
            charracterImages[src] = new Image();
            
            //- - - - - - - - - - - - - - - - - - - - -
            //load the image 
            charracterImages[src].onload = function() {
                if( ++loadedImages >= charracterImageSources.length ) {
                    callback( charracterImages );
                }; //if
            } //onload()
            
            //- - - - - - - - - - - - - - - - - - - - -
            //set the image source
            charracterImages[src].src = charracterImageSources[src];
            
        } //for
        
      } //loadimages()
    
    // declare an array to hold the image objects
    var debrisImages = [];
    
    //-----------------------------------------------------------
    // declare an array for image sources and assign the image sources
    var debrisImageSource = "./sprites/brickcropped.png";
    
    function loadDebrisImages( debrisImages, debrisImageSource, callback ) {
        var loadedImages = 0;

        //- - - - - - - - - - - - - - - - - - - - -
        // for each imageSource
        for ( var src = 0; src < 10; src++ ) {
            
            //- - - - - - - - - - - - - - - - - - - - -
            //create a new image object
            debrisImages[src] = new Image();
            
            //- - - - - - - - - - - - - - - - - - - - -
            //load the image 
            debrisImages[src].onload = function() {
                if( ++loadedImages >= 10 ) {
                    
                    callback( debrisImages );
                }; //if
            } //onload()
            
            //- - - - - - - - - - - - - - - - - - - - -
            //set the image source
            debrisImages[src].src = debrisImageSource;
            
        } //for
        
      } //loadimages()
      

      // declare an array to hold the image objects
    var buildingBrokenImages = [];
    
    //-----------------------------------------------------------
    // declare an array for image sources and assign the image sources
    var buildingBrokenImageSource = [ "./sprites/Framed.png" ];
    
    function loadBuildingBrokenImages( buildingBrokenImages, buildingBrokenImageSource, callback ) {
        var loadedImages = 0;
        
        //- - - - - - - - - - - - - - - - - - - - -
        // for each imageSource
        for ( var src = 0; src < 10; src++ ) {

            //- - - - - - - - - - - - - - - - - - - - -
            //create a new image object
            buildingBrokenImages[src] = new Image();
            
            //- - - - - - - - - - - - - - - - - - - - -
            //load the image 
            buildingBrokenImages[src].onload = function() {
                if( ++loadedImages >= buildingBrokenImageSource.length ) {
                    callback( buildingBrokenImages );
                }; //if
            } //onload()
            
            //- - - - - - - - - - - - - - - - - - - - -
            //set the image source
            buildingBrokenImages[src].src = buildingBrokenImageSource[src];
            
        } //for
        
      } //loadimages()

    //-----------------------------------------------------------
    //Setup the canvas object
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var context = theCanvas.getContext("2d");  //get the context
    var canvasHeight = theCanvas.height; //get the heigth of the canvas
    var canvasWidth = theCanvas.width;  //get the width of the canvas
    var canvasColor = "white"; //starting bg color
    
    var frameCounter = 0;
    var buildingStatus = 
        [
            //Top Floor Left to Right
            (canvasWidth - 347),(canvasHeight - 411),0, (canvasWidth - 284),(canvasHeight - 411),0,
            (canvasWidth - 220),(canvasHeight - 411),0, (canvasWidth - 154),(canvasHeight - 411),0,
            (canvasWidth - 93),(canvasHeight - 411),0,
            
            //Third Floor Left to Right
            (canvasWidth - 347),(canvasHeight - 306),0, (canvasWidth - 284),(canvasHeight - 306),0,
            (canvasWidth - 220),(canvasHeight - 306),0, (canvasWidth - 154),(canvasHeight - 306),0,
            (canvasWidth - 93),(canvasHeight - 306),0,
            
            //Second Floor Left to Right
            (canvasWidth - 347),(canvasHeight - 192),0, (canvasWidth - 284),(canvasHeight - 192),0,
            (canvasWidth - 156),(canvasHeight - 192),0, (canvasWidth - 93),(canvasHeight - 192),0,
            
            //Bottom Floor Left to Right
            (canvasWidth - 347),(canvasHeight - 92),0, (canvasWidth - 284),(canvasHeight - 92),0,
            (canvasWidth - 156),(canvasHeight - 92),0, (canvasWidth - 93),(canvasHeight - 92),0,  
            
        ];
    
    var windowNum = 18;
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Object Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */    

    //-----------------------------------------------------------    
    //felix parameters
    var felixHeight = 60;                 //starting height
    var felixWidth = 40;                  //starting width
    var felixColor = "black";             //starting color
    //->Set the X and X per the comments
    var felixX = 50;  //start middle of canvas		
    var felixY = 400;  //start bottom of canvas
    var felixLRSpeed = 64;                  //left right speed
    var felixUDSpeed = 100;                  // up and down speed
    var felixUDSpeedBetween = 114; 
    var startFixFrame;
    var felixMoveable = true;
    var startFix = false;
    var felixLives = 3;
    var felixState = 0;
    
    //----------------------------------------------------------
    //ralph parameters
    var ralphHeight = 70;                 //starting height
    var ralphWidth = 40;                  //starting width
    var ralphColor = "red";             //starting color
    //->Set the X and X per the comments
    var ralphX = (canvasWidth/2) - (ralphWidth/2);  //start middle of canvas		
    var ralphY = 0;  //start bottom of canvas
    var ralphSpeed = 2;
   
    //-----------------------------------------------------------
    //debris parameters
    var debrisHeight = 20;                 //starting height
    var debrisWidth = 40;                 //starting width
    var debrisColor = "brown";           //start color
    //->Set the X and X per the comments
    var debrisXandY = 
        [
            canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,
            canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,
            canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,  canvasWidth+100,ralphHeight,
        ];               
    var debrisSpeed = 45;                
    var debrisIndex = 0;
    
    //Gaming vairables
    var playerScore= 0;
    var gameOn = true;
    var gameWin = false;
    var debrisCollideFrameOne = 0;
    var debrisCollideOne = false;
    var debrisCollideFrameTwo = 0;
    var debrisCollideTwo = false;
    var debrisCollideThree = false;
    
    //-----------------------------------------------------------
    //draw charracters
    function drawCharracters( x, y, width, height, state ) { 
        context.drawImage (charracterImages[state], x, y, width, height);
    }
    
    function drawBuilding(){
        context.drawImage (charracterImages[4], 0, 0, canvasWidth, canvasHeight);
        
        for(var i = 0; i < windowNum * 3; i+=3 ){
            
            if(buildingStatus[i+2] == 0)
                context.drawImage (buildingBrokenImages[0], buildingStatus[i], buildingStatus[i+1], 38, 53 );
                
            if(buildingStatus[i+2] == 1);
                
        }
                
                
                             
    }
    
    function drawDebris(debrisXandY, debrisWidth, debrisHeight){
        
        for(var i = 0; i < debrisXandY.length; i+=2 ){
            			
            context.drawImage( debrisImages[0], debrisXandY[i], debrisXandY[i+1], debrisWidth, debrisHeight ); 
            
        }
        
    }
    
    //-----------------------------------------------------------
    //move debris 
    function moveDebris() {
        
        for( var i = 1; i < debrisXandY.length; i+=2){
            
            if ( debrisXandY[i] < canvasHeight ){
                //move the debris
                debrisXandY[i] += debrisSpeed;
            }
            
            else{
                debrisXandY[i-1] = canvasWidth+100;
                debrisXandY[i] = ralphHeight; 
            } 
        }
        
        
    }//movedebris()
    
    function moveRalph() {
        
        //move ralph
        if ( ralphX + ralphWidth/2 < felixX + felixWidth/2){
            ralphX += ralphSpeed;
        }//if
        
        else if ( ralphX + ralphWidth/2 > felixX + felixWidth/2){
            ralphX -= ralphSpeed;
        }//if
        
        else if( ralphX + ralphWidth/2 == felixX + felixWidth/2 && frameCounter % 60 == 0 ){
            generateDebris();
        }
        
    }
    
    function generateDebris(){
        
        debrisXandY[debrisIndex] = ralphX;
        debrisXandY[debrisIndex+1] = ralphHeight;
        
        if( debrisIndex < 14){
            
            debrisIndex += 2;
            
        }
        else{
            
            debrisIndex = 0;
            
        }
    }
    
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // Check Collisions
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    
    //-----------------------------------------------------------
    //check collisions between felix and debris
        
              
    function checkCollisionRectangle() {

        //Object 1 is the felix:
           var object1X  = felixX;
           var object1Y  = felixY;
           var object1W  = felixWidth;
           var object1H  = felixHeight;

        //Object 2 is the debris:
        for( var i = 0; i < debrisXandY.length; i+=2 ){
            
            var object2X  = debrisXandY[i];
            var object2Y  = debrisXandY[i+1];
            var object2W  = debrisWidth;
            var object2H  = debrisHeight;

            //check if the felix is in contact with the debris
            if (   object1X < object2X + object2W 
                && object1X + object1W > object2X 
                && object1Y < object2Y + object2H 
                && object1Y + object1H > object2Y ) 
            {
                felixState = 2;
                if( !debrisCollideOne && !debrisCollideTwo && !debrisCollideThree ){
                    felixLives = 2;
                    debrisCollideOne = true;
                    debrisCollideFrameOne = frameCounter;
                }
                
                if( debrisCollideOne && !debrisCollideTwo && !debrisCollideThree && frameCounter >= debrisCollideFrameOne + 70){
                    felixLives = 1;
                    debrisCollideTwo = true;
                    debrisCollideFrameTwo = frameCounter;
                }
                
                if( debrisCollideOne && debrisCollideTwo && !debrisCollideThree && frameCounter >= debrisCollideFrameTwo + 70){
                    felixLives = 0;
                    debrisCollideThree = true;
                }
                
                if( felixLives <= 0 )
                    gameOn = false;
    
            } //if
            else {
            //->Make the debris move and change its color          
                //go
                debrisSpeed = 1;  
                debrisColor = "brown";
                
            } //else
        }
    } //checkCollision
    
    
    function fixWindowStart(){
        felixColor = "yellow";
        felixMoveable = false;
        if( !startFix ){
            startFixFrame = frameCounter;
            startFix = true;
        }
    }
    
    function fixWindowEnd(felixX,felixY){
        felixColor = "black";
        felixMoveable = true;
        startFix = false;
        felixState = 0;
        
        if(frameCounter >= startFixFrame + 30){ 
            
            //Top Floor Left to Right
            if(felixX == 50 && felixY == 86 && buildingStatus[2] == 0){
                buildingStatus[2] = 1;
                playerScore += 100;
             }
            else if(felixX == 114 && felixY == 86 && buildingStatus[5] == 0){
                buildingStatus[5] = 1;
                playerScore += 100;
             }
            else if(felixX == 178 && felixY == 86 && buildingStatus[8] == 0){
                buildingStatus[8] = 1;
                playerScore += 100;
             }
            else if(felixX == 242 && felixY == 86 && buildingStatus[11] == 0){
                buildingStatus[11] = 1;
                playerScore += 100;
             }
            else if(felixX == 306 && felixY == 86 && buildingStatus[14] == 0){
                buildingStatus[14] = 1;
                playerScore += 100;
             }
            
            //Three Floor Left to Right
            if(felixX == 50 && felixY == 186 && buildingStatus[17] == 0){
                buildingStatus[17] = 1;
                playerScore += 100;
             }
            else if(felixX == 114 && felixY == 186 && buildingStatus[20] == 0){
                buildingStatus[20] = 1;
                playerScore += 100;
             }
            else if(felixX == 178 && felixY == 186 && buildingStatus[23] == 0){
                buildingStatus[23] = 1;
                playerScore += 100;
             }
            else if(felixX == 242 && felixY == 186 && buildingStatus[26] == 0){
                buildingStatus[26] = 1;
                playerScore += 100;
             }
            else if(felixX == 306 && felixY == 186 && buildingStatus[29] == 0){
                buildingStatus[29] = 1;
                playerScore += 100;
             }
            
            //Second Floor Left to Right
            if(felixX == 50 && felixY == 300 && buildingStatus[32] == 0){
                buildingStatus[32] = 1;
                playerScore += 100;
             }
            else if(felixX == 114 && felixY == 300 && buildingStatus[35] == 0){
                buildingStatus[35] = 1;
                playerScore += 100;
             }
            else if(felixX == 242 && felixY == 300 && buildingStatus[38] == 0){
                buildingStatus[38] = 1;
                playerScore += 100;
             }
            else if(felixX == 306 && felixY == 300 && buildingStatus[41] == 0){
                buildingStatus[41] = 1;
                playerScore += 100;
             }
            
            //Bottom Floor Left to Right
            if(felixX == 50 && felixY == 400 && buildingStatus[44] == 0){
                buildingStatus[44] = 1;
                playerScore += 100;
             }
            else if(felixX == 114 && felixY == 400 && buildingStatus[47] == 0){
                buildingStatus[47] = 1;
                playerScore += 100;
            }
            else if(felixX == 242 && felixY == 400 && buildingStatus[50] == 0){
                buildingStatus[50] = 1;
                playerScore += 100;
            }
            else if(felixX == 306 && felixY == 400 && buildingStatus[53] == 0){
                buildingStatus[53] = 1;
                playerScore += 100;
            }
            
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Event Handlers */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    //-----------------------------------------------------------
    //event listeners   
    //listen for key entry and call eventKeyPressed
    window.addEventListener( "keydown", eventKeyDown, true );
    
    //-----------------------------------------------------------
    //keyboard coordinates event handler that moves the felix
    function eventKeyDown(e) {
        
        // get the keycode pressed and covert to a letter value
        var letterPressed = String.fromCharCode(e.keyCode); 

        //check for keys and move the felix
        if ( letterPressed == "A" && felixMoveable ) { // move left

            //move left
            felixX = felixX - felixLRSpeed;
            
            //check the left border
            if ( felixX <= 50 )               // if at the left border
                felixX = 50;                  // stay at the left border
            
        } else if ( letterPressed == "D" && felixMoveable ) {  // move right

            //move right
            felixX = felixX + felixLRSpeed; 
            
            //check the right border
            if ( felixX >= 306 )    // if at right border
                felixX = 306;       // stay at right border
            
        } else if ( letterPressed == "W" && felixMoveable ) { // move up
            
            //move up
            if( felixY < 400 && felixY > 186 )
                felixY = felixY - felixUDSpeedBetween;
            else
                felixY = felixY - felixUDSpeed;
            
            //check the top border
            if ( felixY <= 86 )               // if at the top               
                felixY = 86;                  // stay at the top
        
        } else if ( letterPressed == "S" && felixMoveable ) { // move down
        
            //move down
            if( felixY < 400 && felixY >= 186  )
                felixY = felixY + felixUDSpeedBetween;
            else
                felixY = felixY + felixUDSpeed;
            
            //check the bottom border
            if ( felixY >= 400 && felixY >= 186 )   // if at the bottom
                felixY = 400;      // stop at the bottom
            
        } else if ( letterPressed == " " ){
            felixState = 1;
            fixWindowStart();
            
        }
        
        
    }//eventKeyDown()
    
    window.addEventListener( "keyup", eventKeyUp, true );
    
    function eventKeyUp(e) {
        var letterUp = String.fromCharCode(e.keyCode); 
        
        if ( letterUp == " " ){
            fixWindowEnd(felixX, felixY);
        }
    }
    
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Clear and Draw Canvas */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    // clear canvas
    function clearCanvas( canvasColor ) {  
        
        // set a fill style of white
        context.fillStyle = canvasColor;
        
        // fill the while canvas with the fill style
        context.fillRect(0, 0, canvasWidth , canvasHeight);
        
    } //clearCanvas()
    
    //-----------------------------------------------------------
    //draw the canvas
    function drawCanvas() {
        
        //1. clear the canvas
        clearCanvas( canvasColor );
        
        checkCollisionRectangle();
        
        //2. move objects
        moveDebris();
        moveRalph(frameCounter);
        
        drawBuilding();
        
        //3. draw objects
        drawCharracters( felixX, felixY, felixWidth, felixHeight, felixState );
        drawCharracters( ralphX, ralphY, ralphWidth, ralphHeight, 3 );
        drawDebris( debrisXandY, debrisWidth, debrisHeight);
        
        //updates Gamer's score
        document.getElementById( "playerScore" ).innerHTML = playerScore;
        document.getElementById( "playerLives" ).innerHTML = felixLives;
        checkWindows();

    } //drawCanvas()
    
    function checkWindows(){
        var windowCheckNum = 0;
        for( var i = 2; i < buildingStatus.length; i+=3 ){
            if( buildingStatus[i] == 1){
                windowCheckNum++;
            }
        }

        if( windowCheckNum == windowNum ){
            gameWin = true;
        }
        
    }
    
    
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // Game Loop
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    
    //-----------------------------------------------------------
    // the game loop
    function gameLoop() {
        
        requestAnimationFrame( gameLoop );
        
        frameCounter++;
        
        if ( gameOn && !gameWin ) {
            drawCanvas();
        }
        else{
            context.font="50px Verdana";
        
            context.fillStyle="black";
            
            if( !gameOn ){
                //write the message
                context.fillText("Game Over!",60,200);
            }
            if( gameWin ){
                //write the message
                context.fillText("Winner!",110,200);
            }
            
        }
    } // gameLoop()

    //-----------------------------------------------------------
    //start the game loop
    loadCharracterImages( charracterImages, charracterImageSources, function(charracterImages) {

        loadDebrisImages( debrisImages, debrisImageSource, function(debrisImages){
            
            loadBuildingBrokenImages( buildingBrokenImages, buildingBrokenImageSource, function(buildingBrokenImages) {
               
                gameLoop();
                
            });
            
        });
        
    });

}// canvasApp()
