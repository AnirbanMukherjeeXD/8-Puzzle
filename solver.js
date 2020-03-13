function solve(grid){
	a_star(grid,0);
	moves_dir=moves.map(to_dir);
	for(i=0;i<moves.length;i++){
		//move(moves_dir.shift());
		setTimeout(function(){ move(moves_dir.shift()) }, 500*i);
	}
}