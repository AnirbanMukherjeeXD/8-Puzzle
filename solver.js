function solve(grid){
	document.getElementById('btn_solve').innerHTML = "Solving..."
	setTimeout(function(){a_star(grid,0);
		moves_dir=moves.map(to_dir);
	for(i=0;i<moves.length;i++){
		setTimeout(function(){ move(moves_dir.pop()) }, 400*i);
	}
	moves=[];
	goal_reached=false;
	open_list=[];
	closed_list=[];
	setTimeout(function(){ document.getElementById('btn_solve').innerHTML = "Solve using AI"; }, 400*i)
	}, 100);
	
	
}