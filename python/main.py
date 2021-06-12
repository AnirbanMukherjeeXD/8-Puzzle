import numpy as np

class state:
	def __init__(self,current,parent,depth,h):
		self.current=current
		self.parent=parent
		self.depth=depth
		self.h=h


# Goal State
goal=np.array([[0,1,2],[3,4,5],[6,7,8]])

# Compare two grids
def compare_grid(a,b):
	return(np.array_equal(a,b))

# Heuristic Function: Manhattan Distance
def h(grid,show_map=False):

	# If show_map is True, then return a grid of the heuristic values

	sum=0
	if(show_map):
		h_map=np.zeros(shape=(3,3))
	for i in range(3):
		for j in range(3):
			hi=abs(i-np.floor(grid[i][j]/3))+abs(j-grid[i][j]%3)
			if(show_map):
				h_map[i][j]=hi
			if(grid[i][j]!=0):
				sum+=hi
	if(show_map):
		return(tuple([sum,h_map]))
	else:
		return(sum)

# Find empty cell
def find_empty(grid):
	empty_loc=np.where(grid==0)
	return(tuple([empty_loc[0][0],empty_loc[1][0]]))

def move(grid,dir,hide_illegal=False):
	new_grid=np.array(grid)
	eloc=find_empty(grid)

	# Up
	if(dir==0):
		if(eloc[0] in (1,2)):
			new_grid[eloc[0]][eloc[1]]=new_grid[eloc[0]-1][eloc[1]]
			new_grid[eloc[0]-1][eloc[1]]=0
		else:
			if(hide_illegal==False):
				print("Illegal move")
	# Right
	elif(dir==1):
		if(eloc[1] in (0,1)):
			new_grid[eloc[0]][eloc[1]]=new_grid[eloc[0]][eloc[1]+1]
			new_grid[eloc[0]][eloc[1]+1]=0
		else:
			if(hide_illegal==False):
				print("Illegal move")

	# Down
	elif(dir==2):
		if(eloc[0] in (0,1)):
			new_grid[eloc[0]][eloc[1]]=new_grid[eloc[0]+1][eloc[1]]
			new_grid[eloc[0]+1][eloc[1]]=0
		else:
			if(hide_illegal==False):
				print("Illegal move")

	# Left
	elif(dir==3):
		if(eloc[1] in (1,2)):
			new_grid[eloc[0]][eloc[1]]=new_grid[eloc[0]][eloc[1]-1]
			new_grid[eloc[0]][eloc[1]-1]=0
		else:
			if(hide_illegal==False):
				print("Illegal move")
	else:
		print("Wrong direction given")
	return new_grid

la=np.array([[3,1,2],[4,0,5],[6,7,8]])

a=np.array(goal)

#inp=[1,1,2,2]
#inp=[3,0,1,2,3,0,1,2,3,0,1]
inp=[1,1,2,2,3,0,1,2,3,0,1,1,2,3,1,2,1,3,1,2,1,3,2,0,0,1,3,2]

inp_moves=0
while (inp_moves>=0 and inp_moves<=3):
    #inp_moves=int(input("Enter move "))
    if(len(inp)==0):
    	break
    inp_moves=inp.pop(0)

    a=move(a,inp_moves)
    print(a)

inp=[]

#a=np.array([[6,4,7],[8,5,0],[3,2,1]])

#for i in range(len(inp)):
#	a=move(a,inp[i])
print("\n\n")
print(a)
input("This is input")

### A Star

# Visited states
visited=[]

# State list to be explored
# format: (current, parent, g value or depth, h value)
state_list=[]

# Explored state list
explored=[]

# Starting state
state_list.append(state(a,None,0,h(a)))

# Main loop
while(1):

	# Current State being explored
	cur_state_val=np.array(state_list[0].current)
	cur_state=state_list[0]
	# Check if goal state
	if(compare_grid(cur_state_val, goal)):
		print("GOAL REACHED!!!")
		#print(state_list)
		input()

		backtrack=[]
		

		# Backtracking
		backtrack.append(state_list[0])
		nextSt=state_list[0].parent
		print(state_list)
		#print("STATE",state_list[-1])
		#print(explored[-1])

		print(nextSt)
		print("Type of next",type(nextSt))
		input("Wait")
		#######!!!!! MAKING WHILE LOOP
		while(nextSt!=None):
			backtrack.append(nextSt)
			nextSt=nextSt.parent

		# for b in range(len(explored)-1,-1,-1):
		# 	# print("\n\n",b)
		# 	# print(backtrack[-1][1],'\n',explored[b][0])
		# 	if(compare_grid(backtrack[-1][1],explored[b][0])):
		# 		backtrack.append(explored[b])
			

		for i in range(len(backtrack)-1,-1,-1):
			#print("State: ",i)
			print(backtrack[i].current,'\n')
			#print(explored[i][1])
			#print(explored[i][2])
			#print(explored[i][3])
		print("States: ",len(backtrack))
		exit()

	# Level of current state
	level=state_list[0].depth

	visited.append(np.array(cur_state_val))

	# Moving to all directions
	new=[]

	for dir_i in range(4):
		new.append(move(cur_state_val,dir_i,hide_illegal=True))

	# Eleminating illegal moves and visited states
	rem=[]	#To be removed

	for st in range(len(new)):
		for ii in range(len(visited)):
			if(compare_grid(new[st],visited[ii])):
				rem.append(st)
				break
	rem.sort(reverse=True)
	for ir in rem:
		new.pop(ir)

	# Appending to state list 
	########## !!!!!!!!!MAKING POINTER
	for ii in range(len(new)):
		#state_list.append(tuple((np.array(new[ii]),np.array(cur_state),level+1,h(new[ii]))))
		state_list.append(state(np.array(new[ii]),cur_state,level+1,h(new[ii])))

	# Appending to explored list
	explored.append(state_list.pop(0))

	# SORTING AS PER A-STAR VALUE
	state_list.sort(key=lambda state: state.h+state.depth)

	# for i in range(len(state_list)):
	# 	print("State: ",i)
	# 	print(state_list[i].current)
	# 	print(state_list[i].parent)
	# 	print(state_list[i].depth)
	# 	print(state_list[i].h)
	#input()



