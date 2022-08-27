
function startGame(){

function init(){
  canvas=document.getElementById("main-canvas");
  w=h=canvas.width=canvas.height=500;
  pen=canvas.getContext('2d');
  cs=25; // cell size
  food_img=new Image();
  food_img.src="../../../assets/img/apple.png";
  trophy=new Image();
  trophy.src="../../../assets/img/trophy.png";
  score=0;

  food = getRandomFood();
  game_over=false;

  snake={
    init_len:5,
    color:"grey",
    cells:[],
    direction:"right",
    createSnake:function(){
      for(var i=this.init_len-1;i>=0;i--){
        this.cells.push({x:i,y:0});
      }
    },
    drawSnake:function(){
      pen.fillStyle=this.color;
      for(i=this.cells.length-1;i>=0;i--){
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
      }
    },
    updateSnake:function(){

      let sc=document.getElementById("score-text").innerText=score;


      //if food is eaten
      var currX=this.cells[0].x;
      var currY=this.cells[0].y;
      if(currX==food.x && currY==food.y){
        food=getRandomFood();
        score++;
      }
      else{
          this.cells.pop();
      }

      var nextX,nextY;
      if(this.direction=="right"){
        nextX=currX+1;
        nextY=currY;
      }
      else if(this.direction=="left"){
        nextX=currX-1;
        nextY=currY;
      }
      else if(this.direction=="up"){
        nextX=currX;
        nextY=currY-1;
      }
      else if(this.direction=="down"){
        nextX=currX;
        nextY=currY+1;
      }

      this.cells.unshift({x:nextX,y:nextY});

      var boundaryX=Math.round(w/cs);
      var boundaryY=Math.round(h/cs);
      if(this.cells[0].x<0 || this.cells[0].x >= boundaryX || this.cells[0].y<0 || this.cells[0].y>=boundaryY){
        game_over=true;
      }
    }
  };
  function keyIsPressed(e){
    if(e.key=="ArrowRight"){
      snake.direction="right";
    }
    else if(e.key=="ArrowLeft"){
      snake.direction="left";
    }
    else if(e.key=="ArrowUp"){
      snake.direction="up";
    }
    else if(e.key=="ArrowDown"){
      snake.direction="down";
    }
    else{
      console.log("not a valid key to move a snake");
    }
  }
  document.addEventListener("keydown",keyIsPressed);
  snake.createSnake();
}
function draw(){
  pen.clearRect(0,0,w,h);
  snake.drawSnake();
  pen.fillStyle=food.color;
  pen.drawImage(food_img,food.x*cs, food.y*cs, cs, cs);

  pen.drawImage(trophy,18,20,cs,cs);
  pen.fillStyle="grey";
  pen.font="10px Roboto";
  pen.fillText(score,28,32);
}

function update(){
  snake.updateSnake();
}

function getRandomFood(){
  var foodX=Math.round(Math.random()*(w-cs)/cs);
  var foodY=Math.round(Math.random()*(h-cs)/cs);
  var food={
    x:foodX,
    y:foodY,
    color:"red",
  };
  return food;
}

function gameloop(){
  if(game_over==true){
    clearInterval(f);
    var replay=document.getElementById("play-btn").innerText="REPLAY?";
  }
  draw();
  update();
}
init();
var f=setInterval(gameloop,150);
}
