let points = [[1,10],[3,11],[4,11],[6,10],[4,9],[3,9],[1,8],[3,9],[4,9],[5,8],[5,6],[4,7],[3,7],[1,5],[2,4],[2,-1],[3,-3],[3,-5],[4,-5],[5,-4],[6,-4],[7,-5],[5,-7],[4,-7],[3,-6],[3,-7],[-5,-7],[-5,-6],[-4,-5],[-3,-5],[-4,-4],[-4,-3],[-3,-2],[-2,-2],[-3,0],[-3,1],[-4,2],[-5,1],[-6,2],[-5,3],[-4,3],[-4,4],[-5,3],[-6,4],[-5,5],[-4,5],[-3,4],[-2,5],[-3,6],[-3,7],[-1,10],[1,10],[1,10]];

var stroke_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
var fill_colors ="f7d1cd-e8c2ca-d1b3c4-b392ac-735d78".split("-").map(a=>"#"+a)

function preload(){    //最早執行的程式碼
	bullet_sound = loadSound("sound/boom.mp3")
  rabbit_sound = loadSound("sound/Boing Sound Effect.mp3")
}

var ball   //代表單一個物件，利用這個變數來做正在處理的物件
var balls = []   //陣列，放所有的物件資料，物件倉庫，裡面儲存所有的物件資料
var bullet
var bullets = []
var monster
var monsters = []
var score = 0
var shipP          //設定砲台位置


function setup() {   //設定兔子物件倉庫內的資料
  createCanvas(windowWidth,windowHeight);    //預設砲台的位置為視窗的中間
  shipP = createVector(width/2,height/2)
  //產生幾個物件
  for(var j=0;j<10;j=j+1)
  {
    ball = new Obj({})   //產生一個新的物件，"暫時"放入到ball變數中
    balls.push(ball)   //把ball物件放入到balls物件倉庫(陣列)中
  }
  for(var j=0;j<15;j=j+1)
  {
    monster = new Monster({})   //產生一個新的物件，"暫時"放入到monster變數中
    monsters.push(monster)   //把monster物件放入到monsters物件倉庫(陣列)中
  }
}

function draw() {   //每秒會執行60次
  background(220);
  if(keyIsPressed){    //鍵盤是否被按下，如果有鍵盤被按下keyPressed的值為true
    if(key =="ArrowLeft"){   //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key =="ArrowRight"){   //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key =="ArrowUp"){      //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key =="ArrowDown"){   //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
  for(let ball of balls){    //針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
    //由此判斷，每隻兔子有沒有接觸每一個飛彈
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){  //判斷ball與bullet有沒有碰觸
        score = score + 1
        rabbit_sound.play()
        balls.splice(balls.indexOf(ball),1)           
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  }

  for(let bullet of bullets){    //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    if(monster.IsDead==true){
      monsters.splice(monsters.indexOf(monster),1)
    }
    bullet.draw()
    bullet.update()
  }
  for(let monster of monsters){    //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){  //判斷ball與bullet有沒有碰觸
        score = score - 1
        //monsters.splice(monsters.indexOf(monster),1)           
        monster.IsDead = true  //已經被打到了，準備執行爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1)
      }
    }
  }
  

  textSize(50)
  text(score,50,50)
  //++++++++畫出中間砲台++++++++++++++++++
  push()
    let dx = mouseX-width/2    //滑鼠座標到中心點座標的x軸距離
    let dy = mouseY-height/2   //滑鼠座標到中心點座標的y軸距離
    let angle = atan2(dy,dx)   //利用反tan算出角度


    //translate(width/2,height/2)     //砲台的位置
    translate(shipP.x,shipP.y)       //砲台的位置,使用shipP的向量值
    rotate(angle)             //讓三角形翻轉一個angle的角度
    fill("#ffc03a")
    noStroke()
    ellipse(0,0,60)
    fill("#ff0000")
    triangle(50,0,-25,-25,-25,25)  //畫出三角形
    
  pop()
  //+++++++++++++++++++++++++++++++++++++
}
function mousePressed(){
  //按下滑鼠後刪除兔子物件
  // for(let ball of balls){
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     把倉庫的這個物件刪除
  //     score = score+1
  //     balls.splice(balls.indexOf(ball),1)    //把倉庫內編號第幾個刪除，只刪除一個(indexOf()找出ball的編號)
  //   }
  // }

  //新增一筆飛彈資料(還沒有顯示)
  bullet = new Bullet({})
  bullets.push(bullet)   //把這一筆資料放入飛彈倉庫
  bullet_sound.play()
}

function keyPressed(){
  if(key ==" "){
    bullet = new Bullet({})
    bullets.push(bullet)   //把這一筆資料放入飛彈倉庫
    bullet_sound.play()
    }
  
}

