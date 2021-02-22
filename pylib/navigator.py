class NavigationException(BaseException):
    pass

class Navigator:
    def __init__(self, frame_id, clover):
        self.frame_id = frame_id
        self.clover = clover
    
    def navigate(self, x=0, y=0, z=0, yaw=float('nan'), speed=None, auto_arm=False):
        if type(speed) == type(None):
            speed = self.clover.default_speed

        res = self.clover.services.navigate(x=x, y=y, z=z, yaw=yaw, speed=speed, frame_id=self.frame_id, auto_arm=auto_arm)
        if not res.success:
            raise NavigationException(res.message)

    def navigate_wait(self, x=0, y=0, z=0, yaw=float('nan'), speed=None, auto_arm=False, tolerance=None):
        self.navigate(x,y,z,yaw,speed,auto_arm)
        self.clover.wait_arrival(tolerance)

    def telemetry(self):
        return self.clover.services.get_telemetry(self.frame_id)