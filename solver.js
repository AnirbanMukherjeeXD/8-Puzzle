function solve(grid){
	a_star(grid,0);
	moves_dir=moves.map(to_dir);
	for(i=0;i<moves.length;i++){
		//move(moves_dir.shift());
		setTimeout(function(){ move(moves_dir.pop()) }, 400*i);
	}
	moves=[];
	goal_reached=0;
	open_list=[];
	//closed_list=new Set();
	closed_list=[];
}