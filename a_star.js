// STATE FORMAT:
// [ grid, f-score, direction, parent ]

max_level=-1;

//Goal state	
const goal=[[0,1,2],[3,4,5],[6,7,8]]
goal_reached=0;

//Required moves
moves=[]

//Processing nodes
//open_list=new Set()

///// List of unvisited nodes
open_list=[]

///// Compare two grids
// Returns true if grids are same
function compare_grids(grid1,grid2){
	for(i=0;i<3;i++){
		if(JSON.stringify(grid1[i])!=JSON.stringify(grid2[i]))
			return(false);
	}
	return true;
}

//Check if open list has a state
function check_open(g){
	for(open_list_i=0;open_list_i<open_list.length;open_list_i++){
		if(compare_grids(open_list[open_list_i][0],g)){
			//alert("TRUE!!!",open_list[open_list_i][0]);
			return true;
		}
	}
	return false;
}

///// List of Visited nodes
closed_list=[]

///// Check if element exists in closed list
// Returns true if element exists, else false
function check_closed(g){
	if(closed_list.length>0){	
		for(closed_list_i=0;closed_list_i<closed_list.length;closed_list_i++){
			if(compare_grids(closed_list[closed_list_i][0],g)){
				return true;
			}
		}
		return false;
	}
}


//Check if grid is goal state
function check_goal(grid){
	return(compare_grids(grid,goal));
}

//Convert number to direction character
function to_dir(x){
	switch(x){
		case(0):return('u');
		case(1):return('r');
		case(2):return('d');
		case(3):return('l');
	}
}


///// Returns value of state in number
// Initially 012345678

function state_val(grid){
	val=0;
	for(state_i=0;state_i<3;state_i++){
		for(state_j=0;state_j<3;state_j++){
			val=val*10+grid[state_i][state_j];
			
		}
	}
	return(val);
}

///// Sorting open list in ascending order of f-score

function priority_sort(list){
	list = list.sort(function(a,b) {
		return a[1] - b[1];
	});
	return(list);
}


//Heuristic
function h(grid){
	//Manhattan Distance
	sum=0;
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			hi=Math.abs(i-Math.floor(grid[i][j]/3))+Math.abs(j-grid[i][j]%3)
			//console.log('h'+(i*3+j)+'= ',hi);
			if(grid[i][j]!=0){
				sum+=hi;
			}
		}
	}
	return sum;
}

//Backtrack path
function backtrack_path(){
	console.log("Backtrack");
	state=closed_list.pop();
	parent=state_val(state[1]);
	moves.push(state[2]);
	while(closed_list.length>0){
		state=closed_list.pop();
		if(state_val(state[0])==parent){
			parent=state_val(state[1]);
			moves.push(state[2]);
		}
	}
}

//A* function
function a_star(grid,level,last){
	if(max_level<level){
		max_level=level;
		console.log("MAX LEVEL: ", max_level);
	}
	//alert("level "+level);
	//Creating a copy of real grid 
	var grid = grid.map(function(arr) {
		return arr.slice();
	});
	// console.log("OPEN: ", open_list);
	// console.log("CLOSE: ", closed_list);

	if(level<-1){
		console.log("Level constraint");
		return;
	}

	//Check if goal state
	if(check_goal(grid)){
		console.log("Goal");
		goal_reached=1;
		backtrack_path();
		console.log("Moves: ",moves);
		console.log("MAX LEVEL: ", max_level);
		return;
	}

	//Stores results of explored paths
	grid_moved=[]
	grid_moved[0]=gridMove(grid,'u')
	grid_moved[1]=gridMove(grid,'r')
	grid_moved[2]=gridMove(grid,'d')
	grid_moved[3]=gridMove(grid,'l')

	//alert(state_val(grid_moved[0]));

	// Check unvisitable neighbors
	count_null=0;
	for(ii=0;ii<4;ii++){

		//Check if explored states are in closed list

		//if(grid_moved[i] && closed_list.has(state_val(grid_moved[i]))){
		if(!grid_moved[ii] || check_closed(grid_moved[ii])){
			// alert("Deleted"+ closed_list);
			// alert("there"+grid_moved[ii]);

			grid_moved[ii]=null;
			count_null++;
			continue;
		}else{
		
		}
		
	}
	//If all neighbors are un-visitable (dead-end)
	if(count_null==4){
		//moves.pop();
		//a_star(gridMove(grid,to_dir((last+2)%4)),level+1)
		//console.log("Dead end");
		//alert("dead-end");
		return;
	}

	//Best f score and best dir: best out of four directions
	best_f_score=1000;
	best_dir='';
	

	//Adding processing states & f_scores to OPEN LIST
	for(ii=0;ii<4;ii++){
		if(grid_moved[ii]){
			//alert(grid_moved[ii]);
			f_score=h(grid_moved[ii])+level;	
			//If open list doesn't have g state
			if(!check_open(grid_moved[ii])){

				// Format: [ grid, f-score, direction, parent]
				open_list.push([grid_moved[ii],f_score,ii,grid]);
				//alert("Pushed");
			}
		}
	}
	list = priority_sort(open_list);
	
	//Best f-score
	best_f_score=open_list[0][1];

	//Best direction
	best_dir=open_list[0][2];

	//Taking best move out
	while(goal_reached==0 && open_list.length>0){
		next=open_list.shift();
		closed_list.push([next[0],next[3],next[2]]);
		// if(level==1)
		// 	alert("First level");
		// console.log("Closedlist: ",closed_list);
		//alert("Pushed");
		a_star(next[0],level+1);
	}	
	return;
}