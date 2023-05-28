var monster_colors ="3d5a80-98c1d9-e0fbfc-ee6c4d-293241".split("-").map(a=>"#"+a)

class Monster{
    constructor(args){     //預設值，基本資料(包含物件顏色，位置，速度，大小...)
        this.r = args.r || random(50,70)    //如果飛彈有傳回直徑的大小，就以參數為直徑，否則預設為10
        this.p = args.p || createVector(random(width),random(height))  //飛彈起始的位置(以向量方式表示該座標)，要以中間砲台為發射，所以座標為(width/2,height/2)
        this.v =  createVector(random(-2,2),random(-2,2))  //怪物的速度
        this.color = args.color || random(monster_colors)  //怪物顏色 
        this.mode = random(["happy","bad"])
        this.IsDead = false //false代表怪物還活著
        this.timenum=0
      }
   
    draw(){
      if(this.IsDead==false){
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()   
            ellipse(0,0,this.r)
            if(this.mode ==  "happy"){
                fill(255)
                ellipse(0,0,this.r/2)
                fill(0)
                ellipse(0,0,this.r/3)
            }else{
                fill(255)
                arc(0,0,this.r/2,this.r/2,0,PI)
                fill(0)
                arc(0,0,this.r/3,this.r/3,0,PI)
            }
            //產生腳
            stroke(this.color)
            strokeWeight(4)
            //line(this.r/2,0,this.r,0)
            noFill();
            for( var j=0;j<8;j++){
                rotate(PI/4)    //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，
                beginShape()
                    for(var i=0;i<30;i++){
                        vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                    }
                endShape()
            }   
        pop()
    }else{
        this.timenum = this.timenum+1
        push()
          translate(this.p.x,this.p.y)
          fill(this.color)
          noStroke()   
          ellipse(0,0,this.r)
          stroke(255)
          line(-this.r/3,0,this.r/3,0)  //眼睛的線
          //產生腳
          stroke(this.color)
          strokeWeight(4)
          //line(this.r/2,0,this.r,0)
          noFill();
          for( var j=0;j<8;j++){
              rotate(PI/4)    //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，
              line(this.r/2,0,this.r,0)
          }
        pop()
    }
  }
    update(){
        this.p.add(this.v)
        if(this.p.x <= 0||this.p.x >= width){     //<0碰到左邊，>width為碰到右邊
            this.v.x = -this.v.x
          }
          if(this.p.y <= 0||this.p.y >= height){     //<0碰到左邊，>width為碰到右邊
            this.v.y = -this.v.y
          }
    }
  
    isBallInRanger(x,y){    //判斷有沒有被滑鼠按到
        let d = dist(x,y,this.p.x,this.p.y)    //計算滑鼠按下的點與此物件位置之間的距離
        if(d<this.r/2){    //飛彈與怪物間的距離如果小於半徑this.r/2，代表碰撞到
          return true         //代表距離有在範圍內
        }else{
          return false        //代表距離沒有在範圍內
        }
      }
    
}