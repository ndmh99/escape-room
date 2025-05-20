/**
 * Escape Room Game - Level 2 Script
 * Created by: ndmh99
 * Last updated: May 20, 2025
 * 
 * Description:
 * This file contains the JavaScript code for Level 2 of the Escape Room game.
 * The level features a more challenging environment with animated fire obstacles,
 * more enemy skeletons, and a different level theme. The player must navigate through
 * these challenges to find a key and reach the final exit to win the game.
 * 
 * Game Mechanics:
 * - Arrow key movement for player character
 * - Enhanced collision detection with obstacles and enemies
 * - Animated character, enemy, and fire obstacle sprites
 * - Sound effects for movement and item collection
 * - Hidden key and final exit mechanics
 * - More difficult riddle challenge for game completion
 * - Four enemy skeletons with different movement patterns (increased difficulty)
 */

"use strict";
// Initial position of the player character on the canvas
let x=450; // x for character initial position in Canvas
let y=430; // y for character initial position in Canvas

/**
 * Asset loading - Organized by type
 * Groups related images into objects for better code organization
 */

// Helper function to create and load an image
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

// Character assets
const characterAssets = {
    initial: loadImage("../assets/images/objects/character/character-intial.png"),
    moveUp: loadImage("../assets/images/objects/character/character-moveUp-animation.png"),
    moveDown: loadImage("../assets/images/objects/character/character-moveDown-animation.png"),
    moveLeft: loadImage("../assets/images/objects/character/character-moveLeft-animation.png"),
    moveRight: loadImage("../assets/images/objects/character/character-moveRight-animation.png")
};

// Enemy assets (skeleton)
const enemyAssets = {
    moveUp: loadImage("../assets/images/objects/enemy/skeleton/skeleton-moveUp-animation.png"),
    moveDown: loadImage("../assets/images/objects/enemy/skeleton/skeleton-moveDown-animation.png"),
    moveLeft: loadImage("../assets/images/objects/enemy/skeleton/skeleton-moveLeft-animation.png"),
    moveRight: loadImage("../assets/images/objects/enemy/skeleton/skeleton-moveRight-animation.png")
};

// Key asset for level 2
const keyAsset = loadImage("../assets/images/levels/level2/key/key.png");

// Obstacle assets for level 2
const obstacleAssets = {
    fire: loadImage("../assets/images/levels/level2/obstacles/animated-fire-lv2-obstacle.png"),
    rock: loadImage("../assets/images/levels/level2/obstacles/rock-lv2-obstacle.png"),
    finalExit: loadImage("../assets/images/levels/level2/obstacles/final-wall-lv2-obstacle.png")
};

// For backward compatibility with existing code
let character_initial = characterAssets.initial;
let start = character_initial;
let character_moveUp_animation = characterAssets.moveUp;
let character_moveDown_animation = characterAssets.moveDown;
let character_moveLeft_animation = characterAssets.moveLeft;
let character_moveRight_animation = characterAssets.moveRight;

let enemy_moveUp_animation = enemyAssets.moveUp;
let enemy_moveDown_animation = enemyAssets.moveDown;
let enemy_moveLeft_animation = enemyAssets.moveLeft;
let enemy_moveRight_animation = enemyAssets.moveRight;

let open_key = keyAsset;
let key = open_key;
let animated_fire_lv2_obstacle = obstacleAssets.fire;
let rock_lv2_obstacle = obstacleAssets.rock;
let final_exit = obstacleAssets.finalExit;

// character animation object

// Canvas context for drawing
let ctx;

/**
 * Setup function - initializes the game
 * Called when the body onload event triggers
 */
function setup() {
    ctx = document.getElementById("surface").getContext("2d");
    displayEverythingLv2();
}

// Arrays defining positions of objects in the level
let xBrick = [64,170,450,480,680,795]; // X coordinates for rocks
let yBrick = [78,245,121,480,87,328];  // Y coordinates for rocks
let xStone=[690,180,280,460,780];      // X coordinates for animated fire obstacles
let yStone=[480,430,180,320,180];      // Y coordinates for animated fire obstacles

// Animation intervals for enemies
let a,b,c,d;

/**
 * Main function to display all game elements for Level 2
 * Creates enemies, places objects, and starts animation loops
 */
function displayEverythingLv2(){
    preload();
    brickAndkey.draw();
    mainChar();
    startBurn();
    ctx.drawImage(final_exit,931,263);
    // Set up animation intervals for each skeleton enemy
    a=setInterval(function(){skeleton1.draw();},120);
    b=setInterval(function(){skeleton2.draw();},120);
    c=setInterval(function(){skeleton3.draw();},120);
    d=setInterval(function(){skeleton4.draw();},120);
    console.log("key in brick "+(brickAndkey.ran+1)); 
}
// Create skeleton enemies with different starting positions and movement patterns
// Parameters: (xPos, yPos, isVertical, initialSprite, startBoundary, endBoundary)
let skeleton1 = new Skeleton(940,600,false,enemy_moveLeft_animation,0,900); 
let skeleton2 = new Skeleton(0,600,true,enemy_moveUp_animation,70,600);
let skeleton3 = new Skeleton(0,25,false,enemy_moveRight_animation,0,900);
let skeleton4 = new Skeleton(600,25,true,enemy_moveDown_animation,70,530);

// Sound effect variables
let stepSound;
let pickSound;

/**
 * Preloads all audio assets for the level
 */
function preload() {
    stepSound=new Audio("../assets/audio/effect/step.mp3")
    pickSound=new Audio("../assets/audio/effect/pick.mp3")
}

/**
 * Generates a random integer between min and max (inclusive)
 * Used for randomizing the location of the key in the level
 * 
 * @param {number} min - Minimum possible value
 * @param {number} max - Maximum possible value
 * @returns {number} - Random integer between min and max
 */
function randomInteger(min,max){ 
	return Math.floor(Math.random()*(max-min+1)+min);
}

// Animation interval for fire obstacles
let burn;

/**
 * Initializes and starts the animation for fire obstacles
 * Creates a cyclic animation effect for all fire obstacles in the level
 */
function startBurn(){
    let cycle=0;
    let sW=80;  // Sprite width
    let sH=80;  // Sprite height
    burn=setInterval(
        function(){
                for (let i=0; i<5; i++){
                    ctx.clearRect(xStone[i],yStone[i],78,80);
                    ctx.drawImage(animated_fire_lv2_obstacle,cycle*sW,0,sW,sH,xStone[i],yStone[i],sW,sH);
                }
                cycle=(cycle+1)%5;  // Cycle through 5 animation frames
            
        }, 120);  // Update animation every 120ms
};

let test = true;

/**
 * Object that manages the rock obstacles and the hidden key
 * The key is randomly placed at one of the rock locations
 */
let brickAndkey={
    ran: randomInteger(0,5),  // Random index to determine which rock hides the key
    
    /**
     * Draws all rock obstacles and logs the key location to console
     * Called during initial level setup
     */
    draw: function()
    {
        // Log which rock contains the key (for debugging)
        for(let i=this.ran; i<this.ran+1; i++)
        {
            console.log("key in brick "+(i+1));
        }
        
        // Draw all rock obstacles
        for(let brick=0; brick<6; brick++)
        {
            ctx.drawImage(rock_lv2_obstacle, xBrick[brick], yBrick[brick]);
        }
    },
    
    /**
     * Draws only the rock obstacles
     * Used when redrawing the level during player movement
     */
    drawBrick: function()
    {
        for(let brick=0; brick<6; brick++)
        {
            ctx.drawImage(rock_lv2_obstacle, xBrick[brick], yBrick[brick]);
        }
    }
}

/**
 * Skeleton constructor - Creates an enemy skeleton with specific movement patterns
 * 
 * @param {number} xSke - Initial X coordinate
 * @param {number} ySke - Initial Y coordinate
 * @param {boolean} direction - True for vertical movement, false for horizontal
 * @param {Image} name - Initial sprite image to use
 * @param {number} start - Start boundary of movement (depends on direction)
 * @param {number} end - End boundary of movement (depends on direction)
 * @constructor
 */
function Skeleton(xSke, ySke, direction, name, start, end){
    this.xSke = xSke;        // X position
    this.ySke = ySke;        // Y position
    this.direction = direction; // Movement direction (vertical or horizontal)
    this.cycle = 0;          // Animation cycle counter
    this.speed = 10;         // Movement speed
    this.name = name;        // Current sprite image
    this.start = start;      // Starting boundary
    this.end = end;          // Ending boundary
    
    /**
     * Draw and update the skeleton
     * Handles movement, animation, and collision with player
     */
    this.draw = function()
    {
        let sW = 64 , sH = 70;  // Sprite width and height
            if (this.direction == true){ // Vertical movement
                ctx.clearRect(this.xSke, this.ySke-10, sW, sH);
                ctx.drawImage(this.name, this.cycle*sW, 0, sW, sH, this.xSke, this.ySke, sW, sH)
                this.cycle++;
                if(this.cycle >= 9)
                {
                    this.cycle = 0;
                }
                // Change direction when reaching boundaries
                if(this.ySke > this.end)
                {
                    this.speed = -10;
                    this.name = enemy_moveUp_animation;
                }
                else if(this.ySke < this.start)
                {
                    this.speed = 10;
                    this.name = enemy_moveDown_animation;
                }
                this.ySke += this.speed;
            } else { // Horizontal movement
                sW = 63.4;
                name = enemy_moveRight_animation;
                ctx.clearRect(this.xSke-10, this.ySke, sW, sH);
                ctx.drawImage(this.name, this.cycle*sW, 0, sW, sH, this.xSke, this.ySke, sW, sH)
                this.cycle++;
                if(this.cycle >= 9)
                {
                    this.cycle = 0;
                }
                // Change direction when reaching boundaries
                if(this.xSke > this.end)
                {
                    this.speed = -10;
                    this.name = enemy_moveLeft_animation;
                }
                else if(this.xSke < this.start)
                {
                    this.speed = 10;
                    this.name = enemy_moveRight_animation;
                }
                this.xSke += this.speed;
            }
            // Check for collision with player
            if((x > this.xSke-50 && x < this.xSke+30 && y > this.ySke-90 && y < this.ySke+30))
            {
                alert("you lose")
                clearInterval(a); clearInterval(b); clearInterval(c); clearInterval(d);
                location.reload(true)
            }
    }
}

/**
 * Presents the final riddle challenge to the player
 * Player must correctly answer the riddle to win the game
 * Incorrect answers will restart the current level
 * 
 * @returns {void}
 */
function challenge(){
    // Define the riddle question and correct answer
    let question = {
        prompt: "What is it that goes up, but never comes down?",
        answer: "age"
    }
    
    // Display prompt and get user's answer
    let response = window.prompt(question.prompt);
    
    // Validate that the response is not empty and not a number
    while (response == "" || isNaN(response) == false){
        alert("your answer is invalid!!!")
        response = window.prompt(question.prompt);
    }
    
    // Check if the answer is correct (case-insensitive)
    if (response.toLowerCase() == question.answer){
        alert("You win!!!");
        // Clear the canvas and stop all animation intervals
        ctx.clearRect(0, 0, 1000, 700)
        clearInterval(a); clearInterval(b); clearInterval(c); clearInterval(d);
        clearInterval(burn);
        
        // Display winning message
        ctx.font = "70px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("You won", 1000/2, 700/2);
    } else {
        alert("You lose!!!");
        location.reload(true)  // Reload the page to restart the level
    }
}

// Flag to check if the player has found the key/hammer
let escape = false;

/**
 * Main function that controls the player character in Level 2
 * Handles keyboard input, collision detection, and game state
 * Also manages interaction with the key and final exit
 * 
 * @returns {void}
 */
function mainChar(){
    let speed = 18;  // Movement speed of the character
    let cycle = 0;   // Animation cycle counter
    
    // Draw the initial character sprite
    ctx.drawImage(start, x, y);
    
    /**
     * Event listener for keyboard controls
     * 
     * Handles player movement (arrow keys), collision detection with obstacles,
     * updates character animation, checks for key/hammer pickup, and triggers
     * the final riddle challenge when the player reaches the exit with the key.
     * 
     * - ArrowUp: Move player up, check for fire obstacle collision, update animation.
     * - ArrowDown: Move player down, check for fire obstacle collision, update animation.
     * - ArrowLeft: Move player left, check for fire obstacle collision, update animation.
     * - ArrowRight: Move player right, check for fire obstacle collision, update animation.
     * - After each move, redraw obstacles and check for key pickup or exit condition.
     */
    addEventListener("keydown", function(e){
        let sW = 93, sH = 110;  // Sprite width and height
        let check = true;       // Flag for collision detection
        if(e.key == "ArrowUp")
        {
            for(let i=0;i<5;i++)
            {
                if(x>xStone[i]-55 && x<xStone[i]+75 && y>yStone[i] && y<yStone[i]+91)
                {
                    check=false;
                    break;
                }
            }
            if(check==false || y<0)
            {
                y+=0; 
                ctx.clearRect(x,y,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                }
            }
            else
            {
                y-=speed;
                ctx.clearRect(x,y+speed,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                }
            }
            ctx.drawImage(character_moveUp_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
            brickAndkey.drawBrick();
            stepSound.play()
        }
        else if(e.key == "ArrowDown")
        {
            for(let i=0;i<5;i++)
            {
                if(x>xStone[i]-57 && x<xStone[i]+75 && y+115>yStone[i] && y+105<yStone[i])
                {
                    check=false;
                    break;
                } 
            }
             if(check==false || y>570)
            {
                y-=0;
                ctx.clearRect(x,y,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                }
                 ctx.drawImage(character_moveDown_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                 speed=18;
            }
            else{
                y+=speed;
                ctx.clearRect(x,y-speed,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                } 
                if(y>yStone[0] || y>yStone[1] || y>yStone[2] || y>yStone[3] || y>yStone[4])
                {
                    ctx.drawImage(character_moveDown_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else{
                    ctx.drawImage(character_moveDown_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
            }
            stepSound.play()
    }
        else if(e.key == "ArrowRight")
        {
            for(let i=0;i<5;i++)
            {
                if(x>xStone[i]-80 && x<xStone[i]+80 && y>yStone[i]-95 && y<yStone[i]+73)
                {
                    check=false;
                    break;
                }
            }
            if(check==false || x>900)
            {
                x-=0;
                
                ctx.clearRect(x,y,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                }
                ctx.drawImage(character_moveRight_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
            }
            else
            {
                speed=18;
                x+=speed;
                ctx.clearRect(x-speed,y,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                }
                if(y>yStone[0] || y>yStone[1] || y>yStone[2] || y>yStone[3] || y>yStone[4])
                {
                    ctx.drawImage(character_moveRight_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(character_moveRight_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
            }
            stepSound.play()
        }
        else if(e.key=="ArrowLeft")
        {
            for(let i=0;i<5;i++)
            {
                if(x<xStone[i]+100 && x>xStone[i]-30 && y>yStone[i]-95 && y<yStone[i]+73)
                {
                    check=false;
                }
            }
            if(check==false || x<5)
            {
                x+=0;
                ctx.clearRect(x,y,70,109)
                cycle++;
                if(cycle>=3)
                {
                    cycle=0;
                }
                ctx.drawImage(character_moveLeft_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
            }
            else
            {
                x-=speed;
                ctx.clearRect(x+speed,y,70,109)
                cycle++; 
                if(cycle>=3)
                {
                    cycle=0;
                }
                if(y>yStone[0] || y>yStone[1] || y>yStone[2] || y>yStone[3] || y>yStone[4])
                {
                    ctx.drawImage(character_moveLeft_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(character_moveLeft_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
            }
            stepSound.play()        }
        // Redraw rock obstacles after character movement
        brickAndkey.drawBrick(); 
        
        // Check if player is close to the rock with the hidden key
        if(Math.sqrt((x-xBrick[brickAndkey.ran])**2+(y-yBrick[brickAndkey.ran])**2)<40)
        {
            // Display the key and notify player
            ctx.drawImage(key, xBrick[brickAndkey.ran], yBrick[brickAndkey.ran])
            alert("You got a hammer");
            escape = true;  // Set flag indicating player has the key/hammer
            
            // Clear the exit wall visual to show that it can now be broken
            ctx.clearRect(931, 263, 60, 200)
            
            // Play the pickup sound effect
            pickSound.play();
        }
        
        // Check if player with the key/hammer has reached the final exit
        if (escape == true && x > 880 && y > 230 && y < 400){
                challenge();  // Present the final riddle challenge
                return;
        }      
    })
}














