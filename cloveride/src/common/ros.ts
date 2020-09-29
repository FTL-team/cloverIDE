import * as roslib from 'roslib'

let ros = new roslib.Ros({})

ros.on('error', function (error) {
  console.error(error)
})

ros.on('connection', function () {
  console.log('Connected')
})

ros.on('close', function () {
  console.log('Disconnected')
})

ros.connect('ws://localhost:9090')

interface CorrectTopics {
  topics: string[]
  types: string[]
}

export interface TopicInfo {
  name: string
  type: string
}

export function getTopics(): Promise<TopicInfo[]> {
  return new Promise((resolve) => {
    ros.getTopics((res) => {
      let correctRes = (res as unknown) as CorrectTopics

      resolve(
        correctRes.topics.map((e, i) => {
          return {
            name: e,
            type: correctRes.types[i],
          }
        })
      )
    })
  })
}

export function getServices(): Promise<string[]> {
  return new Promise((resolve) => {
    ros.getServices((res) => {
      resolve(res)
    })
  })
}

export function getTopicsForType(type: string): Promise<TopicInfo[]> {
  return new Promise((resolve) => {
    ros.getTopicsForType(type, (res) => {
      resolve(
        res.map((e) => {
          return {
            name: e,
            type,
          }
        })
      )
    })
  })
}

export function getTopicType(topicName: string): Promise<string> {
  return new Promise((resolve) => {
    ros.getTopicType(topicName, (type) => {
      resolve(type)
    })
  })
}

export function getServiceType(serviceName: string): Promise<string> {
  return new Promise((resolve) => {
    ros.getServiceType(serviceName, (type) => {
      resolve(type)
    })
  })
}

export function getServiceRequestDetails(serviceName: string): Promise<string> {
  return new Promise((resolve) => {
    ros.getServiceRequestDetails(serviceName, (res) => {
      resolve(res)
    })
  })
}

export async function getTopic(topicName: string): Promise<roslib.Topic> {
  let topicType = await getTopicType(topicName)
  return new roslib.Topic({
    ros,
    name: topicName,
    messageType: topicType,
  })
}

export { ros, roslib }
