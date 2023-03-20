import roslib from 'roslib'

export const ros = new roslib.Ros({})
export { roslib }

export {
  Topic as RosTopic,
  Service as RosService,
  ServiceRequest as RosServiceRequest
} from 'roslib'

const disconnectedEl = document.createElement('div')
disconnectedEl.setAttribute(
  'style',
  `border:4px solid red;background:#f99;
position:fixed;height:120px;margin-top:-60px;width:420px;margin-left:-210px;
left:50%;top:50%;text-align:center;font-family:"Courier New",monospace;
padding:15px;box-sizing:border-box;color:#1e1e1e;`
)
disconnectedEl.innerHTML = `
<h1 style="font-size:3em;margin:0;margin-bottom:0">Disconnected</h1>
<h2 sryle="margin:0;">New attempt in few seconds</h2>
`
document.body.appendChild(disconnectedEl)
disconnectedEl.style.visibility = 'hidden'

const rootUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:7777/')
    : new URL(location.href.substring(0, location.href.lastIndexOf('/ide/')))
const url = new URL('./ros', rootUrl)
url.protocol = url.protocol.replace('http', 'ws')

ros.on('error', function (error) {
  disconnectedEl.style.visibility = 'visible'
  setTimeout(() => ros.connect(url.toString()), 1000)
  console.error(error)
})

ros.on('connection', function () {
  disconnectedEl.style.visibility = 'hidden'
  console.log('Connected')
})

ros.on('close', function () {
  disconnectedEl.style.visibility = 'visible'
  setTimeout(() => ros.connect(url.toString()), 1000)
  console.log('Disconnected')
})

ros.connect(url.toString())

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
