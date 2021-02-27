# advancedClover PYLIB for simpler clover development
# Version: 1.0.0

import rospy
import math
from serviceProxies import ServiceProxies
from navigator import Navigator

class Clover:
    def __init__(self, default_speed=0.5, default_tolerance=0.2):
        self.default_speed = default_speed
        self.default_tolerance = default_tolerance

        self.services = ServiceProxies()

        self.should_land = False

    def arrived(self, tolerance=None):
        if type(tolerance) == type(None):
            tolerance = self.default_tolerance

        telem = self.services.get_telemetry(frame_id='navigate_target')
        return math.sqrt(telem.x ** 2 + telem.y ** 2 + telem.z ** 2) < tolerance
        

    def wait_arrival(self, tolerance=None):
        r = rospy.Rate(12)
        while not rospy.is_shutdown():
            if self.arrived(tolerance):
                break
            r.sleep()
            
    def create_navigator(self, frame_id):
        return Navigator(frame_id, self)
    
    def land_wait(self):
        res = self.services.land()
        if not res.success:
            raise Exception(res.message)

        r = rospy.Rate(10)
        while self.services.get_telemetry().armed:
            r.sleep()
    
    def atexit_handler(self):
        if not self.should_land: return
        try:
            self.services.land()
        except:
            pass

    def land_atexit(self):
        import atexit
        self.should_land = True
        atexit.register(self.atexit_handler)

    def disable_land_atexit(self):
        self.should_land = False
