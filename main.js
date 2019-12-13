grid=[[0,1,2],[3,4,5],[6,7,8]];

function moveT(){alert("MOVV")}
function swp(id,dir){
	x=document.getElementById(id);	
	y=tiles[id];
	switch(dir){
		case('l'):console.log("left");
				y.posX-=105;
				x.style.transform="translateX("+y.posX+"px)";
				break;
		case('r'):console.log("right");
				y.posX+=105;
				x.style.transform="translateX("+y.posX+"px)";
				break;
		case('u'):console.log("up");
				y.posY-=105;
				x.style.transform="translateX("+y.posY+"px)";
				break;
		case('d'):console.log("down");
				y.posY+=105;
				x.style.transform="translateX("+y.posY+"px)";
				break;
		default: console.log("def");
	}
	
}
function tile(n){
	this.id=n;
	this.loc=n;
	this.posX=0;
	this.posY=0;
	this.move=function(dir){
		switch(dir){
			case('l'):console.log("left");
					this.loc-=1;
					break;
			case('r'):console.log("right");
					this.loc+=1;
					break;
			case('u'):console.log("up");
					this.loc-=3;
					break;
			case('d'):console.log("down");
					this.loc+=3;
					break;
			default: console.log("def");
		}
	}

}

tiles=[];
tiles.push('blank')
for(i=1;i<9;i++){
	tiles.push(new tile(i))
}