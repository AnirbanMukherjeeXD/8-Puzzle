
grid=[[0,1,2],[3,4,5],[6,7,8]];


/*
l37
u38
r39
d40
*/

//Movement on clicking tiles
function moveT(id){
	if((tiles[id].loc[0]>0)&&(grid[tiles[id].loc[0]-1][tiles[id].loc[1]]==0))
		{swp(id,'u');}
	else if((tiles[id].loc[0]<2)&&(grid[tiles[id].loc[0]+1][tiles[id].loc[1]]==0))
		{swp(id,'d');}
	else if((tiles[id].loc[1]>0)&&(grid[tiles[id].loc[0]][tiles[id].loc[1]-1]==0))
		{swp(id,'l');}
	else if((tiles[id].loc[1]<2)&&(grid[tiles[id].loc[0]][tiles[id].loc[1]+1]==0))
		{swp(id,'r');}
	else console.log("Invalid tile")

}

//Movement on pressing keys
document.onkeydown=function(){
	switch(event.which){

		//LEFT
		case(37):if((tiles[0].loc[1]==0)||(tiles[0].loc[1]==1))
					swp(grid[tiles[0].loc[0]][tiles[0].loc[1]+1],'l');
				else
					console.log("Invalid move");
				break;
		//UP
		case(38):if((tiles[0].loc[0]==0)||(tiles[0].loc[0]==1))
					swp(grid[tiles[0].loc[0]+1][tiles[0].loc[1]],'u');
				else
					console.log("Invalid move");
				break;
		//RIGHT
		case(39):if((tiles[0].loc[1]==1)||(tiles[0].loc[1]==2))
					swp(grid[tiles[0].loc[0]][tiles[0].loc[1]-1],'r');
				else
					console.log("Invalid move");
				break;
		//DOWN
		case(40):if((tiles[0].loc[0]==1)||(tiles[0].loc[0]==2))
					swp(grid[tiles[0].loc[0]-1][tiles[0].loc[1]],'d');
				else
					console.log("Invalid move");
				break;		
		default:console.log(event.which);

	}
}

function swp(id,dir){
	x=document.getElementById(id);	
	y=tiles[id];
	z=tiles[0];
	switch(dir){
		case('l'):console.log("left");
				y.posX-=105;
				//x.style.transform="translateX("+y.posX+"px)";
				grid[y.loc[0]][y.loc[1]-1]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[1]-=1
				z.loc[1]+=1
				break;
		case('r'):console.log("right");
				y.posX+=105;
				//x.style.transform="translateX("+y.posX+"px)";
				grid[y.loc[0]][y.loc[1]+1]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[1]+=1
				z.loc[1]-=1
				break;
		case('u'):console.log("up");
				y.posY-=105;
				//x.style.transform="translateY("+y.posY+"px)";
				grid[y.loc[0]-1][y.loc[1]]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[0]-=1
				z.loc[0]+=1
				break;
		case('d'):console.log("down");
				y.posY+=105;
				//x.style.transform="translateY("+y.posY+"px)";
				grid[y.loc[0]+1][y.loc[1]]=grid[y.loc[0]][y.loc[1]]
				grid[y.loc[0]][y.loc[1]]=0
				y.loc[0]+=1
				z.loc[0]-=1
				break;
		default: console.log("def");
	}
	x.style.transform="translate("+y.posX+"px, "+y.posY+"px)";
	
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