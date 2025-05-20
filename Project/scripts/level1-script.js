"use strict";
let x=450; // x for character initial position in Canavs
let y=430; // y for character initial position in Canvas

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
character_initial.src = "../assets/images/objects/character/character_initial.png";


// enemy animation object
let enemy_moveUp_animation = new Image();
enemy_moveUp_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveUp-animation.png";
let enemy_moveDown_animation = new Image();
enemy_moveDown_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveDown-animation.png";
let enemy_moveLeft_animation = new Image();
enemy_moveLeft_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveLeft-animation.png";
let enemy_moveRight_animation = new Image();
enemy_moveRight_animation.src = "../assets/images/objects/enemy/skeleton/skeleton-moveRight-animation.png";

// treasure chest animation object
let treasure_chest_closed = new Image();
treasure_chest_closed.src = "../assets/images/objects/treasure-chest/chest-closed.png";
let treasure_chest_open = new Image();
treasure_chest_open.src = "../assets/images/objects/treasure-chest/chest-open.png";

// key object for level 1
let open_key = new Image();
open_key.src = "../assets/images/levels/level1/key/key.png";

// Obstacle object for level 1
let cactus_lv1_obstacle = new Image();
cactus_lv1_obstacle.src = "../assets/images/levels/level1/obstacle/cactus-lv1-obstacle.png";
let stone_lv1_obstacle = new Image();
stone_lv1_obstacle.src = "../assets/images/levels/level1/obstacle/stone-lv1-obstacle.png";


let key=open_key;
let start=character_initial;

// canvas object
let ctx;

function setup() {
    ctx = document.getElementById("surface").getContext("2d");
    displayEverythingLv1();
}

let xBrick = [70,150,359,523,658,790];
let yBrick = [35,224,121,592,27,320];
let xStone =[120,63,250,450,658];
let yStone=[590,480,270,250,328];


function randomInteger(min,max){ 
	return Math.floor(Math.random()*(max-min+1)+min);
}

let stepSound;
let pickSound;
function preload()
{
    stepSound=new Audio("../assets/effect/move.mp3")
    pickSound=new Audio("../assets/effect/pick.mp3")
}
let a,b,c;
function displayEverythingLv1()
{
    preload();
    stone.draw();
    brickAndkey.drawBrick();
    a=setInterval(function(){skeleton1.draw();},120);
    b=setInterval(function(){skeleton2.draw();},120);
    c=setInterval(function(){skeleton3.draw();},120);
    mainChar();
    console.log("key in brick "+(brickAndkey.ran+1));
    ctx.drawImage(treasure_chest_closed,0,580,120,100)
}
let skeleton1 = new Skeleton(940,0,true,enemy_moveDown_animation,0,600); 
let skeleton2 = new Skeleton(0,400,true,enemy_moveUp_animation,0,400);
let skeleton3 = new Skeleton(147,25,false,enemy_moveRight_animation,150,600);

let brickAndkey={
    ran:randomInteger(0,5),
    drawKey:function()
    {
            ctx.drawImage(key,xBrick[ran]+20,yBrick[ran]+20);
            console.log("key in brick "+(ran+1));
    },
    drawBrick:function()
    {
        for(let brick=0;brick<6;brick++)
        {
            ctx.drawImage(cactus_lv1_stone_lv1_obstacle,xBrick[brick],yBrick[brick]);
        }
    }
}

let stone={
    draw:function()
    {
        for(let i=0;i<xStone.length;i++)
        {
            ctx.drawImage(stone_lv1_obstacle,xStone[i],yStone[i],120,100);
        }  
    }
}


function challenge(){
    let question = {
        prompt:"What do you call a woman who knows where her husband is all the time?",
        answer:"a widow"
    }
    let response = window.prompt(question.prompt);
    while (response==""||isNaN(response)==false){
        alert("your answer is invalid!!!")
        response = window.prompt(question.prompt);
    }
    if (response.toLowerCase()==question.answer){
        alert("You win!!!");
        nextlv();
    } else {
        alert("You lose!!!");
        location.reload(true)
    }
}

let keyCheck=false;
function mainChar(){
    let speed=18;
    let cycle = 0;
    ctx.drawImage(start,x,y);
    addEventListener("keydown",function(e){
        let sW = 93 , sH = 110;
        let check=true;
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
            ctx.drawImage(enemy_moveUp_animation,cycle*sW,0,sW,sH,x,y,sW,sH);
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

function nextlv()
{
    location.href = 'levels/level2.html';
}


function Skeleton(xSke,ySke,direction,name,start,end){
    this.xSke = xSke;
    this.ySke = ySke;
    this.direction = direction;
    this.cycle = 0;
    this.speed=10;
    this.name =name;
    this.start=start;
    this.end=end;
    this.draw = function()
    {
        let sW = 64 , sH = 70;  
            if (this.direction == true){
                ctx.clearRect (this.xSke , this.ySke-10, sW , sH );
                ctx.drawImage(this.name,this.cycle*sW,0,sW,sH,this.xSke,this.ySke,sW,sH)
                this.cycle++;
                if(this.cycle>=9)
                {
                    this.cycle=0;
                }
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
            } else {
                sW=63.4;
                name = enemy_moveRight_animation;
                ctx.clearRect (this.xSke-10 , this.ySke, sW , sH );
                ctx.drawImage(this.name,this.cycle*sW,0,sW,sH,this.xSke,this.ySke,sW,sH)
                this.cycle++;
                if(this.cycle>=9)
                {
                    this.cycle=0;
                }
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
            if((x>this.xSke-50 && x<this.xSke+30 && y>this.ySke-90 && y<this.ySke+30))
            {
                alert("you lose")
                clearInterval(a);clearInterval(b);clearInterval(c);
                location.reload(true)
            }
    }
}
