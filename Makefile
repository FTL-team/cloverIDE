emu:
		cd catkin_ws; catkin_make

extension:
		cd cloveride; vsce package --yarn; 

ide: extension
		cd code; make