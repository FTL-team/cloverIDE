import React, { useState, useEffect } from 'react'
import Message from './Message'
import { getTopic, Topic as RosTopic } from '../ros/topic'

export default function Topic(props: { topic: string }) {
  const [message, setMessage] = useState({})
  useEffect(() => {
    let rosTopic: null | RosTopic = null
    let stopped = false
    getTopic(props.topic).then(
      (newRosTopic) => {
        if (!stopped) {
          rosTopic = newRosTopic
          rosTopic.subscribe((newMessage) => setMessage(newMessage))
        }
      },
      (error) => console.warn(error)
    )
    return () => {
      if (rosTopic) rosTopic.unsubscribe()
      stopped = true
    }
  }, [props.topic])
  return <Message msg={message} />
}
