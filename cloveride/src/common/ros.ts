import roslib from 'roslib'

const ros = new roslib.Ros({})

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

export async function getTopics(): Promise<TopicInfo[]> {
  return new Promise((resolve) => {
    ros.getTopics((response) => {
      const correctResponse = (response as unknown) as CorrectTopics

      resolve(
        correctResponse.topics.map((name, i) => {
          return {
            name,
            type: correctResponse.types[i]
          }
        })
      )
    })
  })
}

export async function getServices(): Promise<string[]> {
  return new Promise((resolve) => {
    ros.getServices((response) => {
      resolve(response)
    })
  })
}

export async function getTopicsForType(type: string): Promise<TopicInfo[]> {
  return new Promise((resolve) => {
    ros.getTopicsForType(type, (result) => {
      resolve(
        result.map((name) => {
          return {
            name,
            type
          }
        })
      )
    })
  })
}

export async function getTopicType(topicName: string): Promise<string> {
  return new Promise((resolve) => {
    ros.getTopicType(topicName, (type) => {
      resolve(type)
    })
  })
}

export async function getServiceType(serviceName: string): Promise<string> {
  return new Promise((resolve) => {
    ros.getServiceType(serviceName, (type) => {
      resolve(type)
    })
  })
}

export async function getServiceRequestDetails(
  serviceName: string
): Promise<string> {
  return new Promise((resolve) => {
    ros.getServiceRequestDetails(serviceName, (response) => {
      resolve(response)
    })
  })
}

export async function getTopic(topicName: string): Promise<roslib.Topic> {
  const topicType = await getTopicType(topicName)
  return new roslib.Topic({
    ros,
    name: topicName,
    messageType: topicType
  })
}

export async function getService(serviceName: string): Promise<roslib.Service> {
  const serviceType = await getServiceType(serviceName)
  return new roslib.Service({
    ros,
    serviceType,
    name: serviceName
  })
}

export { ros, roslib }
