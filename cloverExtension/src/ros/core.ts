import roslib from 'roslib'

export const ros = new roslib.Ros({})
export { roslib }

export {
  Topic as RosTopic,
  Service as RosService,
  ServiceRequest as RosServiceRequest
} from 'roslib'

ros.on('error', function (error) {
  console.error(error)
})

ros.on('connection', function () {
  console.log('Connected')
})

ros.on('close', function () {
  console.log('Disconnected')
})

const host =
  process.env.NODE_ENV === 'development' ? 'localhost:7777' : location.host
ros.connect(`ws://${host}/ros`)

function rosPromisifyNoArgs<R>(
  func: (
    okCallback: (result: R) => void,
    errCallback: (error: Error) => void
  ) => void
) {
  return async function () {
    return new Promise<R>((resolve, reject) => {
      func.call(
        ros,
        (result) => resolve(result),
        (error) => reject(error)
      )
    })
  }
}

function rosPromisifyOneArg<A1, R>(
  func: (
    arg: A1,
    okCallback: (result: R) => void,
    errCallback: (error: Error) => void
  ) => void
) {
  return async function (arg: A1) {
    return new Promise<R>((resolve, reject) => {
      func.call(
        ros,
        arg,
        (result) => resolve(result),
        (error) => reject(error)
      )
    })
  }
}

export const rosGetTopics = rosPromisifyNoArgs(ros.getTopics)
export const rosGetTopicsForType = rosPromisifyOneArg(ros.getTopicsForType)
export const rosGetTopicType = rosPromisifyOneArg(ros.getTopicType)

export const rosGetServices = rosPromisifyNoArgs(ros.getServices)
export const rosGetServiceType = rosPromisifyOneArg(ros.getServiceType)
export const rosGetServiceRequestDetails = rosPromisifyOneArg(
  ros.getServiceRequestDetails
)

// export function getTF() {
export function getTF() {
  return new roslib.TFClient({
    ros: ros,
    fixedFrame: 'body'
  })
}



export { Transform } from 'roslib'