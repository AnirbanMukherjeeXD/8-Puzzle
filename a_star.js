//Goal state	
goal=[[0,1,2],[3,4,5],[6,7,8]]

//Required moves
moves=[]


//Check if grid is goal state
function check_goal(grid){
	for(i=0;i<3;i++){
		if(JSON.stringify(grid[i])!=JSON.stringify(goal[i]))
			return(false);
	}
	return true;
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

// function a_star(grid){
// 	console.log(grid);
// 	console.log(h(grid));
// }

function a_star(grid,level){

	//Creating a copy of real grid 
	var grid = grid.map(function(arr) {
		return arr.slice();
	});

	console.log("A star level: ",level);
	console.log(grid);
	console.log("______________________");
	if(level>32)
		return;

	//Check if goal state
	if(check_goal(grid)){
		console.log("Goal");
		return;
	}

	//Stores results of explored paths
	grid_moved=[]
	grid_moved[0]=gridMove(grid,'u')
	console.log("UUUUPPPP");
	console.log(grid_moved[0]);
	grid_moved[1]=gridMove(grid,'r')
	grid_moved[2]=gridMove(grid,'d')
	grid_moved[3]=gridMove(grid,'l')

	for(i=0;i<4;i++){
		console.log(to_dir(i));
		console.log(grid_moved[i])
	}

	//Best f score and best dir: best out of four directions
	best_f_score=10000;
	best_dir='';

	//Calculating the f-score for each explored paths
	for(ii=0;ii<4;ii++){

		if(grid_moved[ii]){
			f_score=h(grid_moved[ii])+level;
			console.log(f_score);
			if(f_score<best_f_score){
				best_f_score=f_score;
				best_dir=ii;
			}
		}
	}
	console.log("Best ",best_f_score, to_dir(best_dir));
	//console.log("Best move :"+best_dir)
	moves.push(best_dir);
	console.log("Next:");
	console.log(gridMove(grid,to_dir(best_dir)));
	a_star(gridMove(grid,to_dir(best_dir)),level+1)
	return;
}