import rospy
import tf2_ros
import math
from serviceProxies import ServiceProxies
from tf2transformer import TransformTimeout, Tf2Transformer
from navigator import Navigator

class Clover:
    def __init__(self, default_speed=0.5, default_tolerance=0.2, wait_transform=7):
        self.default_speed = default_speed
        self.default_tolerance = default_tolerance

        self.services = ServiceProxies()
        self.tf2transformer = Tf2Transformer()

        try:
            self.tf2transformer.wait_transform(self.tf2transformer.fcu_frame, 'navigate_target')
        except TransformTimeout:
            print("Transform timeout, this can lead to error")

    def arrived(self, tolerance=None):
        if type(tolerance) == type(None):
            tolerance = self.default_tolerance

        try:
            telem = self.tf2transformer.transform_from_base('navigate_target').transform.translation
        except TransformTimeout:
            print("Transform timeout")
            return False
        return math.sqrt(telem.x ** 2 + telem.y ** 2 + telem.z ** 2) < tolerance

    def wait_arrival(self, tolerance=None):
        r = rospy.Rate(32)
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