/**
 * Escape Room Game - Level 1 Script
 * Created by: ndmh99
 * Last updated: May 20, 2025
 * 
 * Description:
 * This file contains the JavaScript code for Level 1 of the Escape Room game.
 * The level features a desert environment where the player must navigate through
 * obstacles, avoid skeleton enemies, find a hidden key, and unlock a treasure chest
 * to complete the level. Upon unlocking the chest, the player must solve a riddle
 * to advance to Level 2.
 * 
 * Game Mechanics:
 * - Arrow key movement for player character
 * - Collision detection with obstacles and enemies
 * - Animated character and enemy sprites
 * - Sound effects for movement and item collection
 * - Hidden key and treasure chest mechanics
 * - Riddle challenge for level completion
 */

"use strict";
// Initial position of the player character on the canvas
let x=450; // x for character initial position in Canvas
let y=430; // y for character initial position in Canvas

/**
 * Character animation sprites
 * Each sprite sheet contains multiple frames for animation
 * Direction-specific animations for player movement
 */
// character animation object
let character_moveUp_animation = new Image();
character_moveUp_animation.src = "../assets/images/objects/character/character-moveUp-animation.png";
let character_moveDown_animation = new Image();
character_moveDown_animation.src = "../assets/images/objects/character/character-moveDown-animation.png";
let character_moveLeft_animation = new Image();
character_moveLeft_animation.src = "../assets/images/objects/character/character-moveLeft-animation.png";
let character_moveRight_animation = new Image();
character_moveRight_animation.src = "../assets/images/objects/character/character-moveRight-animation.png";
let character_initial = new Image();
character_initial.src = "../assets/images/objects/character/character-intial.png";

/**
 * Enemy animation sprites
 * Each sprite sheet contains multiple frames for skeleton animation
 * Direction-specific animations for enemy movement
 */
// enemy animation object
let enemy_moveDown_animation = new Image();
enemy_moveDown_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveDown-animation.png";
let enemy_moveUp_animation = new Image();
enemy_moveUp_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveUp-animation.png";
let enemy_moveLeft_animation = new Image();
enemy_moveLeft_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveLeft-animation.png";
let enemy_moveRight_animation = new Image();
enemy_moveRight_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveRight-animation.png";

/**
 * Treasure chest sprites
 * The chest appears closed initially and opens when the player finds the key
 */
// treasure chest animation object
let treasure_chest_closed = new Image();
treasure_chest_closed.src = "../assets/images/objects/treasure-chest/chest-closed.png";
let treasure_chest_open = new Image();
treasure_chest_open.src = "../assets/images/objects/treasure-chest/chest-open.png";

/**
 * Key object
 * The key is hidden at one of the cactus locations
 * Player must find the key to unlock the treasure chest
 */
// key object for level 1
let open_key = new Image();
open_key.src = "../assets/images/levels/level1/key/key.png";

/**
 * Obstacle sprites
 * These create the level boundaries and obstacles that the player must navigate around
 */
// Obstacle object for level 1
let cactus_lv1_obstacle = new Image();
cactus_lv1_obstacle.src = "../assets/images/levels/level1/obstacles/cactus-lv1-obstacle.png";
let stone_lv1_obstacle = new Image();
stone_lv1_obstacle.src = "../assets/images/levels/level1/obstacles/stone-lv1-obstacle.png";


let key=open_key;
let start=character_initial;

// Canvas context for drawing
let ctx;

/**
 * Setup function - initializes the game
 * Called when the body onload event triggers
 */
function setup() {
    ctx = document.getElementById("surface").getContext("2d");
    displayEverythingLv1();
}

// Arrays defining positions of objects in the level
let xBrick = [70,150,359,523,658,790]; // X coordinates for cactus obstacles
let yBrick = [35,224,121,592,27,320];  // Y coordinates for cactus obstacles
let xStone =[120,63,250,450,658];      // X coordinates for stone obstacles
let yStone=[590,480,270,250,328];      // Y coordinates for stone obstacles


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

// Sound effect variables
let stepSound;
let pickSound;

/**
 * Preloads all audio assets for the level
 * Should be called before playing any sounds
 */
function preload()
{
    stepSound = new Audio("../assets/audio/effect/step.mp3")
    pickSound = new Audio("../assets/audio/effect/pick.mp3")
}

// Variables for skeleton animation intervals
let a, b, c;

/**
 * Main function to display all game elements for Level 1
 * Creates enemies, places objects, and starts animation loops
 * Called by the setup function when the page loads
 */
function displayEverythingLv1()
{
    // Load sound effects
    preload();
    
    // Draw obstacles
    stone.draw();
    brickAndkey.drawBrick();
    
    // Set up animation intervals for each skeleton enemy
    // Each interval runs the draw method of the respective skeleton every 120ms
    a = setInterval(function(){skeleton1.draw();}, 120);
    b = setInterval(function(){skeleton2.draw();}, 120);
    c = setInterval(function(){skeleton3.draw();}, 120);
    
    // Initialize the player character
    mainChar();
    
    // For debugging - show which cactus contains the key
    console.log("key in brick " + (brickAndkey.ran + 1));
    
    // Draw the treasure chest (initially closed)
    ctx.drawImage(treasure_chest_closed, 0, 580, 120, 100)
}

// Create skeleton enemies with different starting positions and movement patterns
// Create skeleton enemies with different starting positions and movement patterns
// Parameters: (xPos, yPos, isVertical, initialSprite, startBoundary, endBoundary)
let skeleton1 = new Skeleton(940,0,true,enemy_moveDown_animation,0,600); 
let skeleton2 = new Skeleton(0,400,true,enemy_moveUp_animation,0,400);
let skeleton3 = new Skeleton(147,25,false,enemy_moveRight_animation,150,600);

/**
 * Object that manages the cactus obstacles and the hidden key
 * The key is randomly placed at one of the cactus locations
 */
let brickAndkey={
    ran: randomInteger(0,5), // Random index to determine which cactus hides the key
    
    /**
     * Draws the key at the position of the selected cactus
     * Called when the player approaches the cactus containing the key
     */
    drawKey: function()
    {
            ctx.drawImage(key, xBrick[this.ran]+20, yBrick[this.ran]+20);
            console.log("key in brick "+(this.ran+1));
    },
    
    /**
     * Draws all cactus obstacles on the canvas
     * One of the cacti will contain the hidden key
     */
    drawBrick: function()
    {
        for(let brick=0; brick<6; brick++)
        {
            ctx.drawImage(cactus_lv1_obstacle, xBrick[brick], yBrick[brick]);
        }
    }
}

/**
 * Object that manages stone obstacles
 * Stones are fixed obstacles that block player movement
 */
let stone = {
    /**
     * Draws all stone obstacles on the canvas
     * These obstacles provide boundaries for player movement
     * The player cannot pass through stone obstacles
     */
    draw: function()
    {
        for(let i=0; i<xStone.length; i++)
        {
            ctx.drawImage(stone_lv1_obstacle, xStone[i], yStone[i], 120, 100);
        }  
    }
}


/**
 * Presents a riddle challenge to the player
 * Player must correctly answer the riddle to advance to the next level
 * Incorrect answers will restart the current level
 * 
 * @returns {void}
 */
function challenge(){
    // Define the riddle question and correct answer
    let question = {
        prompt:"What do you call a woman who knows where her husband is all the time?",
        answer:"a widow"
    }
    
    // Display prompt and get user's answer
    let response = window.prompt(question.prompt);
    
    // Validate that the response is not empty and not a number
    while (response==""||isNaN(response)==false){
        alert("your answer is invalid!!!")
        response = window.prompt(question.prompt);
    }
    
    // Check if the answer is correct (case-insensitive)
    if (response.toLowerCase()==question.answer){
        alert("You win!!!");
        nextlv();
    } else {
        alert("You lose!!!");
        location.reload(true)
    }
}

// Flag to check if the player has found the key
let keyCheck=false;

/**
 * Main function that controls the player character
 * Handles keyboard input, collision detection, and game state
 * 
 * @returns {void}
 */
function mainChar(){
    let speed=18;  // Movement speed of the character
    let cycle = 0; // Animation cycle counter
    
    // Draw the initial character sprite
    ctx.drawImage(start,x,y);
    
    // Event listener for keyboard controls
    addEventListener("keydown",function(e){
        let sW = 93 , sH = 110; // Sprite width and height
        let check=true;  // Flag for collision detection
        if(e.key == "ArrowUp")
        {
            for(let i=0;i<xStone.length;i++)
            {
                if(x>xStone[i]-30 && x<xStone[i]+95 && y>yStone[i] && y<yStone[i]+80)
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
            if(keyCheck==true)
            {
                ctx.drawImage(treasure_chest_open,0,580,120,100)
            }
            else
            {
                ctx.drawImage(treasure_chest_closed,0,580,120,100)
            }
            stone.draw();
            ctx.drawImage(character_moveUp_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
            brickAndkey.drawBrick();
            stepSound.play()
        }
        else if(e.key == "ArrowDown")
        {
            for(let i=0;i<xStone.length;i++)
            {
                if(x>xStone[i]-30 && x<xStone[i]+95 && y+105>yStone[i]+20 && y+105<yStone[i]+100)
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
                 stepSound.play()
                 stone.draw();
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
                if(keyCheck==true)
                {
                    ctx.drawImage(treasure_chest_open,0,580,120,100)
                }
                else
                {
                    ctx.drawImage(treasure_chest_closed,0,580,120,100)
                } 
                if(y>yStone[0] || y>yStone[1] || y>yStone[2] || y>yStone[3] || y>yStone[4])
                {
                    stone.draw();
                    ctx.drawImage(character_moveDown_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(character_moveDown_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                    stone.draw();
                }
                stepSound.play()
        }
        }
        else if(e.key == "ArrowRight")
        {
            for(let i=0;i<xStone.length;i++)
            {
                if(x>xStone[i]-80 && x<xStone[i]+80 && y>yStone[i]-75 && y<yStone[i]+20)
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
                stepSound.play()
                stone.draw();
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
                if(keyCheck==true)
                {
                    ctx.drawImage(treasure_chest_open,0,580,120,100)
                }
                else
                {
                    ctx.drawImage(treasure_chest_closed,0,580,120,100)
                } 
                if(y>yStone[0] || y>yStone[1] || y>yStone[2] || y>yStone[3] || y>yStone[4])
                {
                    stone.draw();
                    ctx.drawImage(character_moveRight_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(character_moveRight_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                    stone.draw();
                }
                stepSound.play()
            }
        }
        else if(e.key=="ArrowLeft")
        {
            for(let i=0;i<xStone.length;i++)
            {
                if(x<xStone[i]+100 && x>xStone[i]-30 && y>yStone[i]-60 && y<yStone[i]+20)
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
                stone.draw();
                ctx.drawImage(character_moveLeft_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                stepSound.play()
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
                if(keyCheck==true)
                {
                    ctx.drawImage(treasure_chest_open,0,580,120,100)
                }
                else
                {
                    ctx.drawImage(treasure_chest_closed,0,580,120,100)
                } 
                if(y>yStone[0] || y>yStone[1] || y>yStone[2] || y>yStone[3] || y>yStone[4])
                {
                    stone.draw();
                    ctx.drawImage(character_moveLeft_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(character_moveLeft_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
                    stone.draw();
                }
                stepSound.play()
        }
        }
        brickAndkey.drawBrick();
        if(Math.sqrt((x-xBrick[brickAndkey.ran])**2+(y-yBrick[brickAndkey.ran])**2)<60)
        {
            alert("You got a key");
            keyCheck=true;
            pickSound.play();
            ctx.clearRect(0,590,120,100)
            ctx.drawImage(treasure_chest_open,0,580,120,100)
            ctx.drawImage(key,xBrick[brickAndkey.ran],yBrick[brickAndkey.ran])
        }
        if(keyCheck==true && y>560 && x<63)
        {
            challenge();
        }
    })
}

/**
 * Function to navigate to the next level
 * Redirects the player to level2.html
 */
function nextlv()
{
    location.href = './level2.html';
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
function Skeleton(xSke,ySke,direction,name,start,end){
    this.xSke = xSke;        // X position
    this.ySke = ySke;        // Y position
    this.direction = direction; // Movement direction (vertical or horizontal)
    this.cycle = 0;          // Animation cycle counter
    this.speed=10;           // Movement speed
    this.name =name;         // Current sprite image
    this.start=start;        // Starting boundary
    this.end=end;            // Ending boundary
    
    /**
     * Draw and update the skeleton
     * Handles movement, animation, and collision with player
     */
    this.draw = function()
    {
        let sW = 64 , sH = 70;  // Sprite width and height
            if (this.direction == true){ // Vertical movement
                ctx.clearRect (this.xSke , this.ySke-10, sW , sH );
                ctx.drawImage(this.name,this.cycle*sW,0,sW,sH,this.xSke,this.ySke,sW,sH)
                this.cycle++;
                if(this.cycle>=9)
                {
                    this.cycle=0;
                }
                // Change direction when reaching boundaries
                if(this.ySke>this.end)
                {
                    this.speed=-10;
                    this.name=enemy_moveUp_animation;
                }
                else if(this.ySke<this.start)
                {
                    this.speed=10;
                    this.name=enemy_moveDown_animation;
                }
                this.ySke+=this.speed;
            } else { // Horizontal movement
                sW=63.4;
                name = enemy_moveRight_animation;
                ctx.clearRect (this.xSke-10 , this.ySke, sW , sH );
                ctx.drawImage(this.name,this.cycle*sW,0,sW,sH,this.xSke,this.ySke,sW,sH)
                this.cycle++;
                if(this.cycle>=9)
                {
                    this.cycle=0;
                }
                // Change direction when reaching boundaries
                if(this.xSke>this.end)
                {
                    this.speed=-10;
                    this.name=enemy_moveLeft_animation;
                }
                else if(this.xSke<this.start)
                {
                    this.speed=10;
                    this.name=enemy_moveRight_animation;
                }
                this.xSke+=this.speed;
            }
            // Check for collision with player
            if((x>this.xSke-50 && x<this.xSke+30 && y>this.ySke-90 && y<this.ySke+30))
            {
                alert("you lose")
                clearInterval(a);clearInterval(b);clearInterval(c);
                location.reload(true)
            }
    }
}
