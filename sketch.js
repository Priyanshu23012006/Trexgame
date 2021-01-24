var trex,treximage,ground,groundimage,invisibleground,CloudImage,Obstacleimg1,Obstacleimg2,Obstacleimg3,Obstacleimg4,Obstacleimg5,Obstacleimg6,Score=0,restart;
var PLAY=1;
var END=0;
var gameState= PLAY;
var CloudsGroup,ObstacleGroup;
var edges;
var gameOverimage,Restartimage,trexcollided;
function preload(){
  treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  CloudImage=loadImage("cloud.png");
  Obstacleimg1=loadImage("obstacle1.png");
  Obstacleimg2=loadImage("obstacle2.png");
  Obstacleimg3=loadImage("obstacle3.png");
  Obstacleimg4=loadImage("obstacle4.png");
  Obstacleimg5=loadImage("obstacle5.png");
  Obstacleimg6=loadImage("obstacle6.png");
  trexcollided=loadAnimation("trex_collided.png");
  gameOverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
}

function setup(){
  createCanvas(600,200)
  edges=createEdgeSprites();
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",treximage);
  trex.scale= 0.5;
  Score= 0;
  ground =createSprite(50,180,600,10);
  
  ground.addImage(groundimage);
  invisibleground= createSprite(30,190,600,5);
  invisibleground.visible= false;
  ObstacleGroup=new Group();
  CloudsGroup=new Group();
  gameOver= createSprite(300,100);
  restart= createSprite(280,150);
  gameOver.visible= false;
  restart.visible= false;
}

function draw(){
  background("white")
  text("Score:"+Score,500,50);
  if(gameState===PLAY){
    Score= Score+Math.round(getFrameRate()/30);
   ground.velocityX= -3;
    spawingObstacle();
    spawnClouds();
  if(keyDown("space")&&trex.y>=50){   
    trex.velocityY = -10;

  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  trex.velocityY= trex.velocityY + 0.8;
    if(trex.isTouching(ObstacleGroup)){
       gameState= END;
       }
    
  }
  else if(gameState===END){
  ground.velocityX= 0;
    ObstacleGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    gameOver.addImage(gameOverimage);
    gameOver.scale= 0.5;
    gameOver.visible= true;
    
    restart.addImage(restartimage);
    restart.scale= 0.5;
    restart.visible= true;
    trex.changeAnimation("running",trexcollided);
    trex.velocityY= 0;
    trex.addAnimation("running",trexcollided);
  }
  if(mousePressedOver(restart)){
    reset();
  }
  trex.collide(invisibleground);
  
  
  drawSprites();

}
function spawnClouds(){
  if(frameCount% 60===0){
  var Cloud=createSprite(600,50);
  Cloud.addImage(CloudImage);
  Cloud.scale= 0.6;
  Cloud.y =random(50,150);
    Cloud.velocityX= -3;
   Cloud.depth= trex.depth;
    trex.depth=trex.depth + 1;
    CloudsGroup.add(Cloud);
}
}
function spawingObstacle(){
  if(frameCount% 70===0){
  var Obstacle=createSprite(580,150);
    var rand= Math.round(random(1,6));
    switch(rand){
        case 1:
         Obstacle.addImage(Obstacleimg1);
        break;
        case 2:
        Obstacle.addImage(Obstacleimg2);
        break;
        case 3:
        Obstacle.addImage(Obstacleimg3);
        break;
        case 4:
        Obstacle.addImage(Obstacleimg4);
        break;
        case 5:
        Obstacle.addImage(Obstacleimg5);
        break;
        case 6:
        Obstacle.addImage(Obstacleimg6);
        break;
        default:
        break;
    }
  Obstacle.scale= 0.7;
  Obstacle.velocityX= -4;
    ObstacleGroup.add(Obstacle);
  }
  }
function reset(){
  gameState = PLAY;
  restart.visible= false;
  gameOver.visible= false;
  ObstacleGroup.destroyEach();
  CloudsGroup.destroyEach();
  Score= 0;
  trex.addAnimation("running",treximage);
  trex.changeAnimation("running",treximage);
}
