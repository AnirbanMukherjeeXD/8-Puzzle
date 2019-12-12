grid=[[0,1,2],[3,4,5],[6,7,8]];
		function swp(id,dir){
			x=document.getElementById(id);	
			switch(dir){
				case('l'):console.log("left");
						x.style.transform="translateX(-105px)";
						break;
				case('r'):console.log("right");
						x.style.transform="translateX(105px)";
						break;
				case('u'):console.log("up");
						x.style.transform="translateY(-105px)";
						break;
				case('d'):console.log("down");
						x.style.transform="translateY(105px)";
						break;
				default: console.log("def");
			}
			
		}
		function tile(n){
			this.id=n;
			this.loc=n;
			this.move=function(dir){
				switch(dir){
					case('l'):console.log("left");
							this.loc-=1;
							break;
					case('r'):console.log("right");
							this.loc+=1;
							break;
					case('u'):console.log("up");
							this.loc-=3;
							break;
					case('d'):console.log("down");
							this.loc+=3;
							break;
					default: console.log("def");
				}
			}

		}

		tiles=[];
		tiles.push('blank')
		for(i=1;i<9;i++){
			tiles.push(new tile(i))
		}