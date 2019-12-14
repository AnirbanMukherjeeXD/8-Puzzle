
grid=[[0,1,2],[3,4,5],[6,7,8]];


function swp(id,dir){
	x=document.getElementById(id);	
	y=tiles[id];
	z=tiles[0];
	switch(dir){
		case('l'):console.log("left");
				y.posX-=105;
				x.style.transform="translateX("+y.posX+"px)";
				grid[y.loc[0]][y.loc[1]-1]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[1]-=1
				z.loc[1]+=1
				break;
		case('r'):console.log("right");
				y.posX+=105;
				x.style.transform="translateX("+y.posX+"px)";
				grid[y.loc[0]][y.loc[1]+1]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[1]+=1
				z.loc[1]-=1
				break;
		case('u'):console.log("up");
				y.posY-=105;
				x.style.transform="translateY("+y.posY+"px)";
				grid[y.loc[0]-1][y.loc[1]]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[0]-=1
				z.loc[0]+=1
				break;
		case('d'):console.log("down");
				y.posY+=105;
				x.style.transform="translateY("+y.posY+"px)";
				grid[y.loc[0]+1][y.loc[1]]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[0]+=1
				z.loc[0]-=1
				break;
		default: console.log("def");
	}
	
}
function tile(n){
	this.id=n;
	this.loc=[Math.floor(n/3),n%3];
	this.posX=0;
	this.posY=0;

}

tiles=[];
for(i=0;i<9;i++){		//Tile with id 0 is blank
	tiles.push(new tile(i))
}

function viewGrid(){
	for(i=0;i<3;i++)
		console.log(grid[i]);
}