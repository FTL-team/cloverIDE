import React from 'react'
import Message from './message/Message'
import { useTopic } from '../ros/hooks/topic'

export default function Topic(props: { topic: string }) {
  const message = useTopic(props.topic)

  if (message === null) {
    return <div>Waiting for message...</div>
  }

  return <Message msg={message} />
}
