var s;
var scl=20;
var food;
var d;



function setup()
{
 createCanvas(400,400)
 s=new snake();
 frameRate(15)
 traceLocation()
 textSize(20)
 
 
}
function traceLocation()
    {
       var cols=floor(width/scl);
       var rows=floor(height/scl);
        food=createVector(floor(random(cols)),floor(random(rows)))
        food.mult(scl)
    }


function draw()
{
    background("black")
    s.update();
    s.show();
    
    if (s.eat(food))
    {
        traceLocation()
    }
    fill("red");
    rect(food.x,food.y,scl,scl);
    s.death()
    
}

function snake()
{
    this.x=270;
    this.y=300;
    this.xspeed=1;
    this.yspeed=0;
    this.total=0;
    this.tail=[];
    this.bg=loadImage("gameover.png")
    this.eat=function(pos)
     {
        var d= dist(this.x,this.y,pos.x,pos.y)
        if (d < 1)
        {
            this.total++
            return true
        }
        else
         {
            return false
        }
    }
    this.death=function()
    {
        if(this.x===400 || this.x===0||this.y===0 ||this.y===400)
        {
            
            this.xspeed=0;
            this.yspeed=0;
            imageMode(CENTER)
            image(this.bg,200,200,200,200)
            for(var i=0;i<this.tail.length;i++)
            {
                var pos=this.tail[i];
                var d=dist(this.x,this.y,pos.x,pos.y);
                if(d<1)
                {
                    console.log("starting over")
                    this.total=0;
                    this.tail=[];
                    
                    

                }
                
            }
        }
    }
    this.dir=function(x,y)
    {
        this.xspeed=x;
        this.yspeed=y;
    }
    
    this.update=function()
    {
        for(var i=0;i<this.tail.length-1;i++)
        {
            this.tail[i]=this.tail[i+1]
        }
        this.tail[this.total-1]=createVector(this.x,this.y)
        this.x= this.x + this.xspeed *scl;
        this.y= this.y+ this.yspeed *scl;
        this.x=constrain(this.x,0,width-scl);
        this.y=constrain(this.y,0,height-scl);
        const arr = [2, 5, 7, 8, 9];
    }
    
    this.show=function()
    {
        fill("green")
        for(var i=0;i<this.total;i++)
        {
            rect(this.tail[i].x,this.tail[i].y,scl,scl)
        }
        rect(this.x,this.y,scl,scl)
        text("SCORE:"+this.total,200,50)
    }
}

function keyPressed()
{
    if(keyCode===UP_ARROW)
    {
        s.dir(0,-1)
    }
    else if (keyCode===DOWN_ARROW)
    {
        s.dir(0,1)
    }
    else if (keyCode===LEFT_ARROW)
    {
        s.dir(-1,0)
    }
    else 
    {
        s.dir(1,0)
    }
    
}
