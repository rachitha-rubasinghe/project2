function start(){
	
	//play start sound
	var startSound = '../sounds/start.mp3';
	var overSound = '../sounds/gameOver.mp3';
	var explosionSound = '../sounds/explosion.mp3';
	var shootSound = '../sounds/shooting.mp3';
	var catchSound = '../sounds/bingo.mp3';
	playSound(startSound);
	
	var canvas = document.getElementById('myCanvas');
	canvas.addEventListener("keyup", doKeyDown, true);
	var ctx = canvas.getContext('2d');
	var myCraft = document.getElementById('craft');
	var reversedCraft = document.getElementById('reverseCraft');
	//get craft's direction
	var x = 300;
	var y = 200;
	var w = 125;
	var h = 92;
	var point = 0;
	var score = 0;
	//fire direction
	var xfire;
	var yfire;
	var wfire = 30;
	var hfire = 10;		

	//store enemies
	var leftEnemies = [];
	var rightEnemies = [];
	var Enemies = leftEnemies + rightEnemies;
	var shot;
	//a for updating fire
	var a = 0;
	
	function doKeyDown(e){

		switch(event.keyCode){
			case 32:
				shot = setInterval(shooting, 30);
				playSound(shootSound);
				break;
			case 37:
				updateCanvas();						
				if(point == 0 && x > 0){
					point = 1;
					x -= 10;
					updateCraft(x,y);
				}
				else if(point == 1 && x > 0){
					x -= 10;
					updateCraft(x,y);
				}
				break;							
			case 38:
				updateCanvas();							
				if(point == 0 && y > 0){
					y -= 10;							
					updateCraft(x,y);
				}
				else if(point == 1 && y > 0){
					y -= 10;
					updateCraft(x,y);
				}
				break;
			case 39:
				updateCanvas();
				if(point == 0 && x + w < 1024){
					x += 10;
					updateCraft(x,y);
				}
				else if(point == 1 && x + w < 1024){
					point = 0;
					x += 10;
					updateCraft(x,y);
				}
				break;
			case 40:
				updateCanvas();
				if(point == 0 && y + h < 700){
					y += 10;							
					updateCraft(x,y);
				}
				else if(point == 1 && y + h < 700){
					y += 10;
					updateCraft(x,y);
				}
				break;	
		}
		check(x, y, w, h);
	}
	
	function drawFire(x,y,w,h,wfire,hfire){				
		
		if(point == 0){
			xfire = x + w + 5 + a;
			yfire = y + h/2;
			ctx.beginPath();
			ctx.fillStyle = 'blue';			
			ctx.lineWidth = '5';
			ctx.strokeStyle = 'lightBlue';
			ctx.rect(xfire,yfire,wfire,hfire);							
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
		}
		else{
			xfire = x - wfire - 5 - a;
			yfire = y + h/2;
			ctx.beginPath();
			ctx.fillStyle = 'blue';			
			ctx.lineWidth = '5';
			ctx.strokeStyle = 'lightBlue';
			ctx.rect(xfire,yfire,wfire,hfire);							
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
		}		
	}				
	
	function clearFire(x,y,w,h){
	
		if(point == 0){												
			ctx.clearRect(x + 5,y,canvas.width - x + w,h);						
		}
		else{
			ctx.clearRect(0,y,x - 2,h);					
		}
		
	}
	
	function shooting(){				
		
		if(point == 0){
			drawFire(x,y,w,h,wfire,hfire);					
			a += 40;
			if(xfire + wfire > 1024){
				clearInterval(shot);
				a = 0;
				clearFire(x,y,w,h);
			}	
		}
		else{
			drawFire(x,y,w,h,wfire,hfire);
			a += 40;
			if(xfire - wfire < 0){
				clearInterval(shot);
				a = 0;
				clearFire(x,y,w,h);
			}			
		}
		
	}
	
	function check(x, y, w, h){
		
		/*for(i = 0; i < Enemies.length; i++){
	
		var x1 = Enemies[i][0];
		var y1 = Enemies[i][1];
		var w1 = Enemies[i][2];
		var h1 = Enemies[i][3];
		
		if(intersects(x,y,w,h,x1,y1,w1,h1)){
			playSound(catchSound);
			score += 1;
			//splice(0,1,a): 0 means start from 0; 1 means remove the first item;
			//a means replace the first item to a.
			Enemies.splice(i,1);
			}
		}*/
		
	}
	
	function intersects(x1,y1,w1,h1,x2,y2,w2,h2){
		w2 += x2;
		w1 += x1;
		
		if(x2 > w1 || x1 > w2) return false;				
		h2 += y2;
		h1 += y1;
		if (y2 > h1 || y1 > h2) return false;					
		return true;
	}
	
	function playSound(soundPath){
			
		//add sound
		var start = new Audio(soundPath);
		start.controls = true;
		start.load();
		start.play();
		if(start.currentTime > 2){
			start.pause();
		}
		
	}
	
	function updateCraft(x,y){
	
		if(point == 0){
			reversedCraft.style.opacity = 0;
			myCraft.style.opacity = 1;
			myCraft.style.left = x + 'px';
			myCraft.style.top = y + 'px';
			reversedCraft.style.left = x + 'px';
			reversedCraft.style.top = y + 'px';
		}
		else{
			myCraft.style.opacity = 0;			
			reversedCraft.style.left = x + 'px';
			reversedCraft.style.top = y + 'px';
			myCraft.style.left = x + 'px';
			myCraft.style.top = y + 'px';
			reversedCraft.style.opacity = 1;
		}				
	}
	
	function updateCanvas(){
		clearCanvas();
		ctx.fillStyle = "lightBlue";
		
		if(Math.random() < 0.09){
			var nx = -10;
			var nrx = 1034;
			var ny = Math.floor(Math.random() * canvas.height);
			var nry = Math.floor(Math.random() * canvas.height);
			leftEnemies.push([nx,ny,5,0,2*Math.PI]);
			rightEnemies.push([nrx,nry,5,0,2*Math.PI]);
		}
		
		for(var i = leftEnemies.length - 1; i >= 0; i--){
			leftEnemies[i][0] = leftEnemies[i][0] + 5;
			if(leftEnemies[i][0] > canvas.width)
				leftEnemies.splice(i,1);
			else{
				ctx.beginPath();
				ctx.arc(leftEnemies[i][0],leftEnemies[i][1],leftEnemies[i][2],leftEnemies[i][3],leftEnemies[i][4]);
				ctx.closePath();
				ctx.fill();
			}
		}
		
		for(var r = rightEnemies.length - 1; r >= 0; r--){
			rightEnemies[r][0] = rightEnemies[r][0] - 5;
			if(rightEnemies[r][0] < 0)
				rightEnemies.splice(r, 1);
			else{
				ctx.beginPath();
				ctx.arc(rightEnemies[r][0], rightEnemies[r][1],rightEnemies[r][2],rightEnemies[r][3],rightEnemies[r][4]);
				ctx.closePath();
				ctx.fill();
			}
		}
		writeScore(score);
	}
	
	function gameOver(){
		playSound(overSound); 
	}
	
	function clearCanvas(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
	
	function writeScore(score){
		ctx.font = '35px "cursive"';
		ctx.fontWeight = "bolder";
		ctx.fillStyle = "pink";
		ctx.fillText("Your Score: " + score, 30, 40);
	}
}
			
function restart(){
	location.reload();
}