
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
		{slide(id,'u');}
	else if((tiles[id].loc[0]<2)&&(grid[tiles[id].loc[0]+1][tiles[id].loc[1]]==0))
		{slide(id,'d');}
	else if((tiles[id].loc[1]>0)&&(grid[tiles[id].loc[0]][tiles[id].loc[1]-1]==0))
		{slide(id,'l');}
	else if((tiles[id].loc[1]<2)&&(grid[tiles[id].loc[0]][tiles[id].loc[1]+1]==0))
		{slide(id,'r');}
	else console.log("Invalid tile")

}

//Move Blank key
function move(dir){
	switch(dir){
		case('l'):if((tiles[0].loc[1]==0)||(tiles[0].loc[1]==1))
					slide(grid[tiles[0].loc[0]][tiles[0].loc[1]+1],'l');
				else
					console.log("Invalid move");
				break;
		//UP
		case('u'):if((tiles[0].loc[0]==0)||(tiles[0].loc[0]==1))
					slide(grid[tiles[0].loc[0]+1][tiles[0].loc[1]],'u');
				else
					console.log("Invalid move");
				break;
		//RIGHT
		case('r'):if((tiles[0].loc[1]==1)||(tiles[0].loc[1]==2))
					slide(grid[tiles[0].loc[0]][tiles[0].loc[1]-1],'r');
				else
					console.log("Invalid move");
				break;
		//DOWN
		case('d'):if((tiles[0].loc[0]==1)||(tiles[0].loc[0]==2))
					slide(grid[tiles[0].loc[0]-1][tiles[0].loc[1]],'d');
				else
					console.log("Invalid move");
				break;		
		//default:console.log(event.which);		
	}
}
//Movement on pressing keys
document.onkeydown=function(){
	switch(event.which){

		//LEFT
		case(37):move('l');
				break;
		//UP
		case(38):move('u');
				break;
		//RIGHT
		case(39):move('r');
				break;
		//DOWN
		case(40):move('d');
				break;		
		//default:console.log(event.which);

	}
}

function slide(id,dir){
	x=document.getElementById(id);	
	y=tiles[id];
	z=tiles[0];
	switch(dir){
		case('l'):console.log("left");
				y.posX-=106;
				grid=gridMove(grid,'l');
				y.loc[1]-=1
				z.loc[1]+=1
				break;
		case('r'):console.log("right");
				y.posX+=106;
				grid=gridMove(grid,'r');
				y.loc[1]+=1
				z.loc[1]-=1
				break;
		case('u'):console.log("up");
				y.posY-=106;
				grid=gridMove(grid,'u');
				y.loc[0]-=1
				z.loc[0]+=1
				break;
		case('d'):console.log("down");
				y.posY+=106;
				grid=gridMove(grid,'d');
				y.loc[0]+=1
				z.loc[0]-=1
				break;
		default: console.log("def");
	}
	x.style.transform="translate("+y.posX+"px, "+y.posY+"px)";
	
}

//To change values of grid
//returns new grid values

function gridMove(grid,dir){
	
	//Creating a copy of real grid 
	var local_grid = grid.map(function(arr) {
		return arr.slice();
	});

	//Find 0
	for(aa=0;aa<3;aa++){
		for(bb=0;bb<3;bb++){
			if(local_grid[aa][bb]==0){
				xi=aa;
				xj=bb;
				bb=4;
				break;
			}
		}
	}



	switch(dir){
		case('l'):

				if((xj==0)||(xj==1)){
					local_grid[xi][xj]=local_grid[xi][xj+1];
					local_grid[xi][xj+1]=0
				}
				else
					//console.log("Invalid move");
					return null;
				break;
		//UP
		case('u'):if((xi==0)||(xi==1)){
					local_grid[xi][xj]=local_grid[xi+1][xj];
					local_grid[xi+1][xj]=0
				}
				else
					//console.log("Invalid move");
					return null;
				break;
		//RIGHT
		case('r'):if((xj==1)||(xj==2)){
					local_grid[xi][xj]=local_grid[xi][xj-1];
					local_grid[xi][xj-1]=0;
				}
				else
					//console.log("Invalid move");
					return null;
				break;
		//DOWN
		case('d'):if((xi==1)||(xi==2)){
					local_grid[xi][xj]=local_grid[xi-1][xj];
					local_grid[xi-1][xj]=0;
				}
				else
					//console.log("Invalid move");
					return null;
				break;		
	}
	return local_grid;
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