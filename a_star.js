//Goal state	
const goal=[[0,1,2],[3,4,5],[6,7,8]]
goal_reached=0;

//Required moves
moves=[]

//Processing nodes
//open_list=new Set()
open_list=[]

//Compare two grids
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
		//alert(open_list[open_list_i]);
		//alert(g==open_list[open_list_i]);
		if(compare_grids(open_list[open_list_i][0],g)){
			//alert("TRUE!!!",open_list[open_list_i][0]);
			return false;
		}
	}
	return true;
}

//Visited nodes
closed_list=[]

//Check if element exists in closed list
function check_closed(g){
	if(closed_list.length>0){	
		for(closed_list_i=0;closed_list_i<closed_list.length;closed_list_i++){
			if(compare_grids(closed_list[closed_list_i][0],g)){
				//console.log("Same: ",closed_list[closed_list_i][0],g);
				return false;
			}
		}
		//alert(99);
		return true;
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

function state_val(grid){
	val=0;
	
	for(state_i=0;state_i<3;state_i++){
		for(state_j=0;state_j<3;state_j++){
			val=val*10+grid[state_i][state_j];
			
		}
	}
	return(val);
}

//Sorting open list in ascending order of f-score
function priority_sort(list){
	list = list.sort(function(a,b) {
    return a[1] - b[1];
});
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
	//alert("level "+level);
	//Creating a copy of real grid 
	var grid = grid.map(function(arr) {
		return arr.slice();
	});

	//console.log("A star level: ",level);

	//Creating state value
	//grid_state=state_val(grid);

	//Adding state value to closed list
	//closed_list.push([grid]);

	// console.log(grid);
	// console.log("______________________");
	
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
		return;
	}

	//Stores results of explored paths
	grid_moved=[]
	grid_moved[0]=gridMove(grid,'u')
	grid_moved[1]=gridMove(grid,'r')
	grid_moved[2]=gridMove(grid,'d')
	grid_moved[3]=gridMove(grid,'l')

	//alert(state_val(grid_moved[0]));
	count_null=0;
	for(ii=0;ii<4;ii++){

		//Check if explored states are in closed list

		//if(grid_moved[i] && closed_list.has(state_val(grid_moved[i]))){
		if(!grid_moved[ii] || check_closed(grid_moved[ii])==false){
			//alert("Deleted"+ closed_list);
			//alert("there"+grid_moved[ii]);

			grid_moved[ii]=null;
			count_null++;
			continue;
		}else{
			//alert("not there");
		}
		//alert(ii);
		// console.log(to_dir(ii));
		// console.log(grid_moved[ii]);
	}
	//If all neighbors are visited (dead-end)
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
	

	//Calculating the f-score for each explored paths
	// for(ii=0;ii<4;ii++){

	// 	if(grid_moved[ii]){
	// 		f_score=h(grid_moved[ii])+level;
	// 		console.log(f_score);
	// 		if(f_score<best_f_score){
	// 			best_f_score=f_score;
	// 			best_dir=ii;
	// 		}
	// 	}
	// }

	//Adding processing states & f_scores to OPEN LIST
	for(ii=0;ii<4;ii++){
		if(grid_moved[ii]){
			//alert(grid_moved[ii]);
			f_score=h(grid_moved[ii])+level;	
			//If open list doesn't have g state
			if(check_open(grid_moved[ii])){
				open_list.push([grid_moved[ii],f_score,ii,grid]);
				//alert("Pushed");
			}
		}
	}

	// console.log("Open list:",open_list);
	// console.log("Closed list:",closed_list);
	
	// for(x=0;x<open_list.length;x++){
	// 	for(y=0;y<open_list.length;y++){
	// 		if(x!=y){
	// 			if(compare_grids(open_list[x][0],open_list[y][0]))
	// 				alert("WRONG! ",x,y);
	// 		}
	// 	}
	// }

	//Sorting open list in ascending order of f-score
	priority_sort(open_list);
	//console.log("Open: ",open_list);
	//alert("OPENING");
	//Best f-score
	best_f_score=open_list[0][1];

	//Best direction
	best_dir=open_list[0][2];

	//console.log("Best ",best_f_score, to_dir(best_dir));
	//console.log("Best move :"+best_dir)
	//moves.push(best_dir);

	// console.log(moves,"Next:");
	// console.log(gridMove(grid,to_dir(best_dir)));
	
	//a_star(gridMove(grid,to_dir(best_dir)),level+1,best_dir)
	// console.log("Open list:");
	// console.log(open_list);

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