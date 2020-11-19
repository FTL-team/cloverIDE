emu:
		cd catkin_ws; catkin_make

extension:
		cd cloverextension; vsce package --yarn; 

ide: extension
		cd code; make