var bird,ground,obstacleGroup,obstacle2,obstacle,gamestate=0,score=-3,restart,bg1,crash,point,jump
function preload()
{
	a1=loadImage("1.png")
	a2=loadImage("22.png")
	a3=loadImage("3.png")
	a4=loadImage("4.png")
	a5=loadImage("5.png")

	jump=loadSound("jump.wav")
	crash=loadSound("crash.wav")
	point=loadSound("point.wav")
}

function setup() {
	createCanvas(1000, 500);
	

bird = createSprite(0,250,50,50)
bird.addImage(a5)
bird.scale=0.2
bird.setCollider("circle",0,0,100)

bg1=createSprite(bird.x,250,50,50)
	bg1.addImage(a1)
	bg1.scale=5

ground = createSprite(500,height,1000,20)
ground2 = createSprite(500,0,1000,20)

obstacleGroup=new Group
	
}


function draw() {
  background(0);
  ground.x =bird.x
  ground2.x=bird.x
  camera.position.x=bird.x

  bird.depth=bg1.depth+1
 
  
  
  if(gamestate===0){
	  if(restart){
		restart.remove=true
		
	  }
	  
	  score=-3



if(keyDown(32)){
	gamestate=1
}

  }



if(gamestate===1){

	bird.visible=true
  
	if(frameCount%50===0){
	  obstacle=createSprite(bird.x+500,random(500,400),50,200)
	  obstacle.addImage(a3)
	  obstacle.scale=0.7
	  
	  obstacle2=createSprite(bird.x+500,random(0,100),50,200)
	obstacle2.addImage(a3)
	obstacle2.scale=0.7
	  obstacle.lifetime=200
	  obstacle2.lifetime=200
	  
obstacleGroup.add(obstacle)
obstacleGroup.add(obstacle2)
  }

  bird.velocityX=5
	bird.velocityY=3
	bird.collide(ground)
	bird.collide(ground2)
  //bird.collide(obstacleGroup)

  if(keyDown(UP_ARROW)||keyIsDown(32)){
	bird.velocityY=-9
}
if(bird.x%500===0){
	bg1.x=bird.x
}



if(bird.y>500||bird.y<0){
	bird.y=250
}

if(frameCount%50===0){
	score++
	point.play()

}



}

if(bird.y===465||bird.y===0){
	gamestate=2
	crash.play()
}
if(bird.collide(obstacleGroup)){
	gamestate=2
	crash.play()
}



if(gamestate===2){
	bird.velocityX=0
bird.visible=false
	

	restart=createSprite(bird.x,350,50,50)
	restart.addImage(a2)
	restart.scale=0.2

	obstacleGroup.destroyEach()
	
}
if(mousePressedOver(restart)){
	gamestate=0
	
	
	
}

obstacleGroup.debug=true

  

  drawSprites();
  if(gamestate===2){
	textSize(50)
	text("Your Score = "+ score,bird.x-200,250)
  }
  if(gamestate===0){
	textSize(35)
	fill('red')
	text("Press SPACEBAR To Start",bird.x-200,150)
  }
  fill("red")
  textSize(20)
 text(score,bird.x,100)
console.log(bird.velocityY)

}



