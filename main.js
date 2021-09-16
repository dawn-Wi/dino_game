var canvas=document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width=window.innerWidth-100;
canvas.height=window.innerHeight-100;

var dino={
    x:40,
    y:200,
    width:10,
    height:10,
    draw(){
        ctx.fillStyle='green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Cactus{
    constructor(){
        this.x=500;
        this.y=180;
        this.width=10;  
        this.height=40;
    }
    draw(){
        ctx.fillStyle='red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

var timer = 0;
var cactuss=[];
var 점프timer=0;
var animation;


function frameact(){
    animation = requestAnimationFrame(frameact);
    timer++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if(timer%130==0){
        var cactus=new Cactus();
        cactuss.push(cactus);
    }

    cactuss.forEach((a,i,o)=>{
        //x좌표가 0미만이면 제거
        if(a.x < 0){
            o.splice(i,1)
        }
        a.x--; 

        충돌하니(dino,a);

        a.draw();
    })
    
    if(점프중==true){
        dino.y-=3;
        점프timer++;
    }
    if(점프중==false){
        if(dino.y<200){
            dino.y+=2;
        }
    }
    if(점프timer > 40){
        점프중= false;
        점프timer = 0;
    }

    dino.draw()
}

frameact();

//충돌확인
function 충돌하니(dino,cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if(x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation)
    }
}



var 점프중 = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        점프중 = true;
    }
})