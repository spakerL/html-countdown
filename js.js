var CANVASWIDTH=1024;
var CANVASHEIGHT=600;
var RADIUS=7;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

var balls=[];
var colors=['red','yellow','blue','#ccc','chocolate','green','#669900','#FFBB33','#CC0000','#0099CC','#33B5E5'];

const endTime = new Date(2016,03,11,00,00,00);
var curShowTimeSeconds = 0

window.onload=function(){
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d')
	
	canvas.width=CANVASWIDTH;
	canvas.height=CANVASHEIGHT;
	curShowTimeSeconds=getCurrentShowTimeSeconds()
	
	setInterval(function(){
		render(context);
		upData();
	},30)
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 )

    return ret >= 0 ? ret : 0;
}



function upData(){
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=parseInt(curShowTimeSeconds % 60);

	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=parseInt(nextShowTimeSeconds%60);

	 if( nextSeconds != curSeconds ){
	 	if(parseInt(curHours/100)!=parseInt(nextHours/100)){
	 		addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10))
	 	}
	 	if(parseInt((curHours/10)%10)!=parseInt((nextHours/10)%10)){
	 		addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10))
	 	}
	 	if(parseInt(curHours%10)!=parseInt(nextHours%10)){
	 		addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10))
	 	}
	 	if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
	 		addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10))
	 	}
	 	if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
	 		addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10))
	 	}
	 	if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
	 		addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10))
	 	}
	 	if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
	 		addBalls(MARGIN_LEFT+108*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10))
	 	}
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    upDataBalls();
}


	function upDataBalls(){
		for(var i=0;i<balls.length;i++){
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			balls[i].vy+=balls[i].g;
		if(balls[i].y>=CANVASHEIGHT-RADIUS)
			{
				balls[i].y=CANVASHEIGHT-RADIUS;
				balls[i].vy=-balls[i].vy*0.8;
			}
	    }

	    var cnt=0;
	    for(var i=0;i<balls.length;i++)
	    	if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<CANVASWIDTH)
	    		balls[cnt++]=balls[i];
	    	while(balls.length>Math.min(300,cnt))
	    	{
	    		balls.pop();
	    	}

	    	console.log(balls.lengrh);
	}

	function addBalls(x,y,num){
		for(var i=0;i<digit[num].length;i++)
			for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1)
			{
				var aBall={
						  x:x+j*2*(RADIUS+1)+(RADIUS+1),
						  y:y+i*2*(RADIUS+1)+(RADIUS+1),
						  g:1+Math.random(),
						  vx:Math.pow(-1,Math.ceil( Math.random()*1000))*4,
						  vy:-3+Math.random(),
						  color:colors[Math.floor(Math.random()*colors.length)]	
						  }
						  balls.push(aBall);
			}
	}

function render(cxt){

	cxt.clearRect(0,0,CANVASWIDTH,CANVASHEIGHT)
    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
    var seconds = curShowTimeSeconds % 60
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/100),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours/10%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+45*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+84*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+108*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	  for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x,y,num,cxt){

	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1)
			{
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fillStyle = "chocolate";
				cxt.fill();
			}

}