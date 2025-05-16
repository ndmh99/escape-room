"use strict";
let x=450; // x for character initial position in Canavs
let y=430; // y for character initial position in Canvas
let upImage = new Image();
upImage.src = "../assets/images/up.png";
let downImage = new Image();
downImage.src="../assets/images/down.png";
let rightImage= new Image();
rightImage.src="../assets/images/right.png";
let leftImage=new Image();
leftImage.src="../assets/images/left.png";
let stoneImage = new Image();
stoneImage.src = "../assets/images/red1.png";
let key= new Image();
key.src="../assets/images/hammer.png";
let start= new Image();
start.src="../assets/images/start.png"
let obstacle=new Image();
obstacle.src="../assets/images/stone.png"
let skeletonUp=new Image();
skeletonUp.src="../assets/images/skeletonUp.png"
let skeletonDown=new Image();
skeletonDown.src="../assets/images/skeletonDown.png"
let skeletonLeft=new Image();
skeletonLeft.src="../assets/images/skeletonLeft.png"
let skeletonRight=new Image();
skeletonRight.src="../assets/images/skeletonRight.png"
let keyPrize=new Image();
keyPrize.src="../assets/images/hammer.png"
let fire=new Image();
fire.src="../assets/images/aaa.png";
let exit=new Image();
exit.src="../assets/images/8.png";
let ctx;

function setup() {
    ctx = document.getElementById("surface").getContext("2d");
    displayEverythingLv2();
}

let xBrick = [64,170,450,480,680,795];
let yBrick = [78,245,121,480,87,328];
let xStone=[690,180,280,460,780];
let yStone=[480,430,180,320,180];

let a,b,c,d;
function displayEverythingLv2(){
    preload();
    brickAndkey.draw();
    mainChar();
    startBurn();
    ctx.drawImage(exit,931,263);
    a=setInterval(function(){skeleton1.draw();},120);
    b=setInterval(function(){skeleton2.draw();},120);
    c=setInterval(function(){skeleton3.draw();},120);
    d=setInterval(function(){skeleton4.draw();},120);
    console.log("key in brick "+(brickAndkey.ran+1)); 
}
let skeleton1 = new Skeleton(940,600,false,skeletonLeft,0,900); 
let skeleton2 = new Skeleton(0,600,true,skeletonUp,70,600);
let skeleton3 = new Skeleton(0,25,false,skeletonRight,0,900);
let skeleton4 = new Skeleton(600,25,true,skeletonDown,70,530);

let stepSound;
let pickSound;
function preload()
{
    stepSound=new Audio("../assets/effect/move.mp3")
    pickSound=new Audio("../assets/effect/pick.mp3")
}

function randomInteger(min,max){ 
	return Math.floor(Math.random()*(max-min+1)+min);
}

let burn;
function startBurn(){
    let cycle=0;
    let sW=80;
    let sH=80;
    burn=setInterval(
        function(){
                for (let i=0; i<5; i++){
                    ctx.clearRect(xStone[i],yStone[i],78,80);
                    ctx.drawImage(fire,cycle*sW,0,sW,sH,xStone[i],yStone[i],sW,sH);
                }
                cycle=(cycle+1)%5;
            
        }, 120);
};

let test = true;

let brickAndkey={
    ran:randomInteger(0,5),
    draw:function()
    {
        for(let i=this.ran;i<this.ran+1;i++)
        {
            console.log("key in brick "+(i+1));
        }
        for(let brick=0;brick<6;brick++)
        {
            ctx.drawImage(stoneImage,xBrick[brick],yBrick[brick]);
        }
    },
    drawBrick:function()
    {
        for(let brick=0;brick<6;brick++)
        {
            ctx.drawImage(stoneImage,xBrick[brick],yBrick[brick]);
        }
    }
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
                    this.name=skeletonUp;
                }
                else if(this.ySke<this.start)
                {
                    this.speed=10;
                    this.name=skeletonDown;
                }
                this.ySke+=this.speed;
            } else {
                sW=63.4;
                name = skeletonRight;
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
                    this.name=skeletonLeft;
                }
                else if(this.xSke<this.start)
                {
                    this.speed=10;
                    this.name=skeletonRight;
                }
                this.xSke+=this.speed;
            }
            if((x>this.xSke-50 && x<this.xSke+30 && y>this.ySke-90 && y<this.ySke+30))
            {
                alert("you lose")
                clearInterval(a);clearInterval(b);clearInterval(c);clearInterval(d);
                location.reload(true)
            }
    }
}

function challenge(){
    let question = {
        prompt:"What is it that goes up, but never comes down?",
        answer:"age"
    }
    let response = window.prompt(question.prompt);
    while (response==""||isNaN(response)==false){
        alert("your answer is invalid!!!")
        response = window.prompt(question.prompt);
    }
    if (response.toLowerCase()==question.answer){
        alert("You win!!!");
         ctx.clearRect(0,0,1000,700)
         clearInterval(a);clearInterval(b);clearInterval(c);clearInterval(d);
         clearInterval(burn);
         ctx.font="70px Comic Sans MS";
         ctx.fillStyle = "red";
         ctx.textAlign = "center";
         ctx.fillText("You won", 1000/2, 700/2);
    } else {
        alert("You lose!!!");
        location.reload(true)
    }
}

let escape = false;
function mainChar(){
    let speed=18;
    let cycle = 0;
    ctx.drawImage(start,x,y);
    addEventListener("keydown",function(e){
        let sW = 93 , sH = 110;
        let check=true;
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
            ctx.drawImage(upImage,cycle*sW,0,sW,sH,x,y,sW,sH);
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
                 ctx.drawImage(downImage,cycle*sW,0,sW,sH,x,y,sW,sH);
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
                    ctx.drawImage(downImage,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else{
                    ctx.drawImage(downImage,cycle*sW,0,sW,sH,x,y,sW,sH);
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
                ctx.drawImage(rightImage,cycle*sW,0,sW,sH,x,y,sW,sH);
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
                    ctx.drawImage(rightImage,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(rightImage,cycle*sW,0,sW,sH,x,y,sW,sH);
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
                ctx.drawImage(leftImage,cycle*sW,0,sW,sH,x,y,sW,sH);
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
                    ctx.drawImage(leftImage,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
                else
                {
                    ctx.drawImage(leftImage,cycle*sW,0,sW,sH,x,y,sW,sH);
                }
            }
            stepSound.play()
        }
        brickAndkey.drawBrick(); 
        if(Math.sqrt((x-xBrick[brickAndkey.ran])**2+(y-yBrick[brickAndkey.ran])**2)<40)
        {
            ctx.drawImage(key,xBrick[brickAndkey.ran],yBrick[brickAndkey.ran])
            alert("You got a hammer");
            escape=true;
            ctx.clearRect(931,263,60,200)
            pickSound.play();
            
        }
        if (escape==true && x>880 && y>230 & y<400){
                challenge();
                return;
        }      
    })
}














