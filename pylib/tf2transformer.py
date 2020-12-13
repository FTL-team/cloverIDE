import tf2_ros
import rospy

class TransformTimeout(BaseException):
    pass

class Tf2Transformer:
    def __init__(self):
        self.fcu_frame = rospy.get_param("mavros/local_position/tf/frame_id", "base_link")
        self.telemetry_transform_timeout = rospy.Duration(rospy.get_param(
            "/simple_offboard/telemetry_transform_timeout", 0.5))

        self.tf_buffer = tf2_ros.Buffer()
        self.listener = tf2_ros.TransformListener(self.tf_buffer)

    def wait_transform(self, target, source, stamp=None, timeout=None):
        if type(stamp) == type(None):
            stamp = rospy.Time()
        if type(timeout) == type(None):
            timeout = self.telemetry_transform_timeout

        r = rospy.Rate(100)
        start = rospy.Time.now()
        while not rospy.is_shutdown():
            if self.tf_buffer.can_transform(target, source, stamp):
                return True
            if rospy.Time.now() - start > timeout:
                return False
            r.sleep()

    def transform(self,source, target):
        stamp = rospy.Time.now()
        if not self.wait_transform(target, source, stamp):
            raise TransformTimeout
            
        transform = self.tf_buffer.lookup_transform(target, source, stamp)
        return transform

    def transform_from_base(self, target):
        return self.transform(self.fcu_frame, target)
