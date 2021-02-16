import {
  ros,
  RosTopic,
  rosGetTopics,
  rosGetTopicType,
  rosGetTopicsForType
} from './core'

export interface TopicInfo {
  name: string
  type: string
}

export async function getTopics(): Promise<TopicInfo[]> {
  const rawTopics = await rosGetTopics()
  return rawTopics.topics.map((name, i) => ({
    name,
    type: rawTopics.types[i]
  }))
}

export async function getTopicsForType(type: string): Promise<TopicInfo[]> {
  const rawTopics = await rosGetTopicsForType(type)
  return rawTopics.map((name) => ({
    name,
    type
  }))
}

export async function getTopicType(topicName: string): Promise<string> {
  return rosGetTopicType(topicName)
}

export async function getTopic(topicName: string, useCBOR = false): Promise<RosTopic> {
  const topicType = await getTopicType(topicName)
  return new RosTopic({
    ros,
    name: topicName,
    messageType: topicType,
    compression: useCBOR ? 'cbor' : undefined
  })
}

export { RosTopic as Topic } from './core'
