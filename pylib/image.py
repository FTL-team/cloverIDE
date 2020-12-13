from cv_bridge import CvBridge
import rospy
from sensor_msgs.msg import Image
import numpy as np

bridge = CvBridge()

class ImageSubscriber:
    def __init__(self, topic):
        rospy.Subscriber(topic, Image, self.process)
        self.topic = topic
        self.buf = np.zeros((32,32))
        self.readAtLeastOnce = False

    def process(self, img):
        self.buf = bridge.imgmsg_to_cv2(img, desired_encoding='passthrough')
        self.readAtLeastOnce = True
    
    def read(self):
        if not self.readAtLeastOnce:
            self.process(rospy.wait_for_message(self.topic, Image))
            
        return self.buf.copy()


class ImagePublisher:
    def __init__(self, topic):
        self.topic = rospy.Publisher(topic, Image, queue_size=10)
        
    
    def write(self, img, encoding=None):
        # print(bridge.cv2_to_imgmsg(img, encoding="passthrough"))
        if type(encoding) == type(None):
            if len(img.shape) == 2 or img.shape[2] == 1:
                encoding = 'mono8'
            else:
                encoding = 'bgr8'

        self.topic.publish(bridge.cv2_to_imgmsg(img, encoding=encoding))