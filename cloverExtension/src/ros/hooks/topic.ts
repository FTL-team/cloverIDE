import { useState, useEffect } from 'react'
import usePromise from 'react-promise-suspense'
import { roslib } from '../core'
import { RosJsMessage } from '../builtinTypes'
import {
  getTopic,
  Topic as RosTopic,
} from '../topic'

export function useTopic(topicName: string) {
  const topic = usePromise(getTopic, [topicName]) as RosTopic

  const [message, setMessage] = useState<roslib.Message | null>(null)
  useEffect(() => {
    topic.subscribe((newMessage) => setMessage(newMessage))
    return () => topic.unsubscribe()
  }, [topic])

  return message as RosJsMessage
}
