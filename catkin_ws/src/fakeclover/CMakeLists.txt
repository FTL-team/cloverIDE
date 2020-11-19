cmake_minimum_required(VERSION 3.0.2)
project(cloveremu)

find_package(catkin REQUIRED COMPONENTS
  rospy
  std_msgs
  message_generation
)

################################################
## Declare ROS messages, services and actions ##
################################################

add_message_files(
  FILES
  IFBS.msg
  ExampleTopicMsg.msg
)
  
add_service_files(
  FILES
  ExampleServiceSrv.srv
)

generate_messages(
  DEPENDENCIES
  std_msgs
)


###################################
## catkin specific configuration ##
###################################

catkin_package()

###########
## Build ##
###########

include_directories(
  ${catkin_INCLUDE_DIRS}
)

#############
## Install ##
#############

catkin_install_python(PROGRAMS
  src/emu
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)
