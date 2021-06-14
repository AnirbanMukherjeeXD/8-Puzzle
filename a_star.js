///// State object contains the state grid (3x3 matrix), direction moved to get to the state, the level (number of moves to get to the state), its parents state and the f-score of the state

function state(grid, direction, level, parent){
	this.grid = grid;
	this.direction = direction;
	this.level = level;
	this.f_score = h(this.grid)+this.level;
	this.parent = parent;
}

max_level=-1;
max_f_score=-1;

///// Goal state	
// Used to check whether goal is reached
const goal=[[0,1,2],[3,4,5],[6,7,8]]

// Flag to see whether goal is reached
// Used as a condition for iteration
goal_reached=false;

//Required moves
moves=[]


///// Open list
// List of states under consideration
open_list=[]

///// Closed list
// List of states done considering
closed_list=[]


///// Compare two grids
// Returns true if grids are same
function compare_grids(grid1,grid2){
	for(i=0;i<3;i++){
		if(JSON.stringify(grid1[i])!=JSON.stringify(grid2[i]))
			return(false);
	}
	return true;
}

//Check if grid is goal state
function check_goal(grid){
	return(compare_grids(grid,goal));
}

///// Check if open list has a grid
function check_open(g){
	for(open_list_i=0;open_list_i<open_list.length;open_list_i++){
		if(compare_grids(open_list[open_list_i].grid,g)){
			//alert("TRUE!!!",open_list[open_list_i][0]);
			return true;
		}
	}
	return false;
}

///// Check if closed list has a grid
function check_closed(g){
	if(closed_list.length>0){	
		for(closed_list_i=0;closed_list_i<closed_list.length;closed_list_i++){
			if(compare_grids(closed_list[closed_list_i].grid,g)){
				return true;
			}
		}
		return false;
	}
}

// Convert number to direction character
function to_dir(x){
	switch(x){
		case(0):return('u');
		case(1):return('r');
		case(2):return('d');
		case(3):return('l');
	}
}


///// Returns value of state in number
// Goal is 012345678

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
		return a.f_score - b.f_score;
	});
	return(list);
}

///// Heuristic function
// Using Manhattan Distance
function h(grid){
	sum=0;
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			hi=Math.abs(i-Math.floor(grid[i][j]/3))+Math.abs(j-grid[i][j]%3)
			if(grid[i][j]!=0){
				sum+=hi;
			}
		}
	}
	return sum;
}

///// Backtrack path
function backtrack_path(){
	console.log("Backtrack");
	present_state=closed_list.pop();
	//console.log(present_state, present_state.parent!=null);
	while(present_state.parent!=null){
		//console.log("DIR:", present_state.direction);
		moves.push(present_state.direction);
		present_state=present_state.parent;
	}
	console.log("Number of Moves: ", moves.length)
}



///// A* function 
// priority queue iterative

function a_star(grid,level,last){
	// Pushing start state
	open_list.push(new state(grid, null, 0, null));
	
	console.log("Start");

	while(goal_reached!=true){

		// Sorting open_list as per f_score
		open_list = priority_sort(open_list);

		// Taking present state as first element of sorted open list
		present_state = open_list.shift();

		if(present_state.level>max_level){
			max_level = present_state.level;
			console.log("New max_level: ", max_level);
		}

		if(present_state.f_score>max_f_score){
			max_f_score = present_state.f_score;
			console.log("New max_f_score: ", max_f_score);
		}

		// Pushing present state to closed_list
		closed_list.push(present_state);

		//Creating a copy of real grid 
		var grid = present_state.grid.map(function(arr) {
			return arr.slice();
		});

		//Check if goal state
		if(check_goal(grid)){
			console.log("Goal");
			goal_reached=true;
			backtrack_path();
			break;
		}

		// Array to store results of explored paths
		grid_moved=[]

		// Start exploring paths from present_state
		grid_moved[0]=gridMove(grid,'u')
		grid_moved[1]=gridMove(grid,'r')
		grid_moved[2]=gridMove(grid,'d')
		grid_moved[3]=gridMove(grid,'l')


		// Check unvisitable neighbors
		count_null=0;
		for(ii=0;ii<4;ii++){

			//Check if explored states are in closed list
			if(!grid_moved[ii] || check_closed(grid_moved[ii])){
				grid_moved[ii]=null;
				count_null++;
				continue;
			}else{
			
			}
			
		}

		//If all neighbors are un-visitable (dead-end)
		if(count_null==4){
			continue;
		}

		//Adding processing states & f_scores to OPEN LIST
		for(ii=0;ii<4;ii++){
			if(grid_moved[ii]){

				// Creating new state
				state_new = new state(grid_moved[ii], ii, present_state.level+1, present_state)
				
				//If open_list doesn't have new state, push to open_list
				if(!check_open(grid_moved[ii])){
					open_list.push(state_new);
				}
			}
		}
	}
}

