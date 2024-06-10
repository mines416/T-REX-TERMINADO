
var trex ,trex_running, trex_collided,  ground, ground_image, invisible_ground;
var cloud, cloudImage;
var obstacle1, obasctacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var END=0;
var PLAY=1;
var gamestate=PLAY;
var cloudsGroup, obstaclesGroup;
var gameOver_image;
var restart_image;

function preload(){

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_image = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  trex_collided=loadAnimation("trex_collided.png");



  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");


  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.jpg");

}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
  trex = createSprite (50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale=0.6;

  trex.addAnimation("collided", trex_collided);

  ground = createSprite(200,180,400,20);
  ground.addImage(ground_image);

  gameOver = createSprite(width/2,100);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;

  restart= createSprite(width/2,160);
  restart.addImage(restart_image);
  restart.scale=0.5;

  invisible_ground = createSprite(200,190,400,10);
  invisible_ground.visible=false;


  obstaclesGroup= new Group();
  cloudsGroup = new Group();

  trex.setCollider("circle", 0,0,40);
  trex.debug=false;

  score=0;

 
}

function draw(){
  background("white");
  
  

  trex.collide(invisible_ground);

  text("Score: " +score,525,50 );

  

  if (gamestate==PLAY){

    score = score+Math.round(frameRate()/25);

    gameOver.visible=false;
    restart.visible=false;
    ground.velocityX=-(4+frameRate()/80);

    if (ground.x<0){
      ground.x=ground.width /2;
    }

    if (keyDown ("space") && trex.y>= 100 ){
      trex.velocityY = -12;
    }

    trex.velocityY=trex.velocityY+0.8;

    SpawnClouds();
    SpawnObstacles();

    if (obstaclesGroup.isTouching(trex)){
      gamestate=END;
    }
  }else if(gamestate==END){
    trex.changeAnimation("collided", trex_collided);

    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)){

      reiniciar();
    }

  }

  

  drawSprites();

}

function reiniciar(){

  gamestate=PLAY;

  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();

  trex.changeAnimation("running")

  score=0;



}

function SpawnClouds(){

  if (frameCount %60 === 0){
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,50));
    cloud.addImage(cloudImage);
    cloud.scale = 0.4;
    cloud.velocityX =-(4+frameRate()/80);

   

    cloud.lifetime=200;
 
    trex.depth = cloud.depth;
    trex.depth = trex.depth+1;

    cloudsGroup.add(cloud);



  }


}

function SpawnObstacles(){

  if (frameCount %60 === 0){
    var obstacle= createSprite(600,165,10,40);
    obstacle.velocityX=-(4+frameRate()/80);
    var numero=Math.round(random(1,6));
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    switch(numero){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default:
        break;
    }

    obstaclesGroup.add(obstacle);

  }


}