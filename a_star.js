goal=[[0,1,2],[3,4,5],[6,7,8]]

//Heuristic
function h(grid){
	//Manhattan Distance
	sum=0;
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			hi=Math.abs(i-Math.floor(grid[i][j]/3))+Math.abs(j-grid[i][j]%3)
			sum+=hi
		}
	}
}

function a_star(grid){
	console.log(grid);
}