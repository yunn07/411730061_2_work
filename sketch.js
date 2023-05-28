let points = [[1,10],[3,11],[4,11],[6,10],[4,9],[3,9],[1,8],[3,9],[4,9],[5,8],[5,6],[4,7],[3,7],[1,5],[2,4],[2,-1],[3,-3],[3,-5],[4,-5],[5,-4],[6,-4],[7,-5],[5,-7],[4,-7],[3,-6],[3,-7],[-5,-7],[-5,-6],[-4,-5],[-3,-5],[-4,-4],[-4,-3],[-3,-2],[-2,-2],[-3,0],[-3,1],[-4,2],[-5,1],[-6,2],[-5,3],[-4,3],[-4,4],[-5,3],[-6,4],[-5,5],[-4,5],[-3,4],[-2,5],[-3,6],[-3,7],[-1,10],[1,10],[1,10]];

var stroke_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
var fill_colors ="f7d1cd-e8c2ca-d1b3c4-b392ac-735d78".split("-").map(a=>"#"+a)

//粒子，類別
class Obj{           //一隻兔子物件的設定
  constructor(args){     //預設值，基本資料(包含物件顏色，位置，速度，大小...)
    // this.p =  args.p || {x:random(width),y:random(height)}   //一個物件開始的位置
    this.p = args.p || createVector(random(width),random(height))
    // this.v =  {x:random(-1,1),y:random(-1,1)}  //速度，x、y移動的速度為亂數產生-1到1之間的數字
    this.v =  createVector(random(-1,1),random(-1,1))  //產生一個x座標值為random(-1,1)，y座標值為random(-1,1)
    this.size = random(10,20)  //放大倍率，物件的大小為亂數產生10到20之間
    this.color = random(fill_colors)  //亂數產生物件顏色
    this.stroke = random(stroke_colors) //亂數產生線條顏色
  }
  draw()   //把物件畫出來的函數
  {
    push()   //重新設定新的原點與顏色設定
      translate(this.p.x,this.p.y)  //原點設定在物件所在位置
      scale((this.v.x<0?1:-1),-1)   //放大縮小的指令，左右翻轉==>this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
      fill(this.color)
      stroke(this.stroke)
      beginShape()
        for(var i=0;i<points.length-1;i++){
          //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
          vertex(points[i][0]*this.size,points[i][1]*this.size)
          //curveVertex(points[i][0]*this.size,points[i][1]*this.size)
        }
      endShape()
    pop()
  }
  update(){   //移動後設置位置資料值為何
    //移動的程式碼+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // this.p.x = this.p.x + this.v.x
    // this.p.y = this.p.y + this.v.y
    this.p.add(this.v)   //此行的效果跟上面兩行一樣,add=+
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //算出滑鼠位置的向量
    let mouseV = createVector(mouseX,mouseY)  //把目前滑鼠的位置轉成向量值
    //let delta = mouseV.sub(this.p).limit(3)  //delta值紀錄與滑鼠方向移動的"單位"距離,sub微向量減法
    let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //與原本物件的速度有關，this.v.mag()==>取得物件的速度值
    this.p.add(delta)

    //碰壁的處理程式碼++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if(this.p.x <= 0||this.p.x >= width){     //<0碰到左邊，>width為碰到右邊
      this.v.x = -this.v.x
    }
    if(this.p.y <= 0||this.p.y >= height){     //<0碰到左邊，>width為碰到右邊
      this.v.y = -this.v.y
    }
  }
  isBallInRanger(){    //判斷有沒有被滑鼠按到
    let d = dist(mouseX,mouseY,this.p.x,this.p.y)    //計算滑鼠按下的點與此物件位置之間的距離
    if(d<this.size*4){    //4的由來:去看座標點最大的值，以此作為方框的高與寬
      return true         //代表距離有在範圍內
    }else{
      return false        //代表距離沒有在範圍內
    }
  }

}

var ball   //代表單一個物件，利用這個變數來做正在處理的物件
var balls = []   //陣列，放所有的物件資料，物件倉庫，裡面儲存所有的物件資料
var score = 0

function setup() {   //設定兔子物件倉庫內的資料
  createCanvas(windowWidth,windowHeight);
  //產生幾個物件
  for(var j=0;j<20;j=j+1)
  {
    ball = new Obj({})   //產生一個新的物件，"暫時"放入到ball變數中
    balls.push(ball)   //把ball物件放入到balls物件倉庫(陣列)中
  }
}

function draw() {   //每秒會執行60次
  background(220);
  // for(var k=0;k<balls.length;k=k+1){
  //   ball=balls[k]
  //   ball.draw()
  //   ball.update()
  // }

  for(let ball of balls){    //針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
  }
  textSize(50)
  text(score,50,50)
}


function mousePressed(){
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //按下滑鼠產生一個物件程式碼
  // ball = new Obj({
  //   p:{x:mouseX,y:mouseY}
  // })   //產生一個新的物件，"暫時"放入到ball變數中
  // balls.push(ball)   //把ball物件放入到balls物件倉庫(陣列)中
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //按下滑鼠後刪除該物件
  for(let ball of balls){
    if(ball.isBallInRanger()){
      //把倉庫的這個物件刪除
      score = score+1
      balls.splice(balls.indexOf(ball),1)    //把倉庫內編號第幾個刪除，只刪除一個(indexOf()找出ball的編號)
    }
  }
}