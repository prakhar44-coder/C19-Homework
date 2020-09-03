var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyGroup, Monkey1,Monkey2,Monkey3,Monkey4,Monkey5,Monkey6,Monkey7,Monkey8,Monkey9,Monkey10;

var banana, jungle, stone;

var player_running;

var bananaGroup, obstaclesGroup;


function preload(){

  bananaImage= loadImage("banana.png")

  jungleImage= loadImage("jungle.jpg")

  stoneImage= loadImage("stone.png")
  
  restartImage= loadImage("restart.png")

player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
}


function setup() {
  createCanvas(400, 400);
   
  

  bg=createSprite(200,200,400,400);
  bg.addImage("jungle",jungleImage);
  bg.x=bg.width/2;
  bg.velocityX=-3;
  
  monkey=createSprite(70,340,20,20);
monkey.addAnimation("running", player_running);
monkey.scale=0.2;

ground=createSprite(200,380,400,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.visible=false;

restart=createSprite(184,212);
restart.addImage("restart",restartImage);
restart.visible = false;

bananaGroup = new Group();
obstaclesGroup = new Group();

 count=0;
}

function draw() {
  
   background(220);
  if(bg.x<0){
    bg.x=bg.width/2
  }
  
 
 
 if(gameState===PLAY){
  //spawn banana, obstacle
    banana();
    obstacle();
    
   
   if(keyDown("space")){
 monkey.velocityY=-10;
}

monkey.velocityY=monkey.velocityY+0.25; 

  if(ground.x<0){
    ground.x=200;

  }
  text("Score: "+ count, 310, 26);
  
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    monkey.scale=monkey.scale+0.1;
  } 
  
 }
 else if(gameState===END){
   obstaclesGroup.destroyEach();
   monkey.visible=false;
   bananaGroup.setVisibleEach(false);
   ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    restart.visible=true;
    
   
 }
if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=monkey.scale-0.1; 
   }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
   
   createEdgeSprites();
   monkey.collide(ground);
   
  drawSprites();
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.addAnimation("running", player_running);
  count=0;
  restart.visible=false;
  monkey.visible=true;
  
}


function obstacle(){
  if(frameCount % 300===0 ){
    var obstacle=createSprite(380,350,20,20);
    obstacle.addImage("Stone", stoneImage);
    obstacle.scale=0.4;
    obstacle.velocityX=-5;
    obstacle.lifetime=90;
    obstaclesGroup.add(obstacle);
    
  }
  
}

function banana(){
if(frameCount % 80===0){
var banana=createSprite(350,random(120,200),20,20);
banana.addImage("Banana", bananaImage);
banana.scale=0.5;
banana.velocityX=-8;
banana.scale=0.1;
banana.lifetime=90;
bananaGroup.add(banana);
}
}
  
