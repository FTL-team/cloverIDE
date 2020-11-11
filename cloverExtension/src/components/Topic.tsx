import React, { useState, useEffect } from 'react'
import Message from './message/Message'
import usePromise from 'react-promise-suspense'
import { getTopic, Topic as RosTopic } from '../ros/topic'

export default function Topic(props: { topic: string }) {
  const [message, setMessage] = useState({})
  const topic = usePromise(async (name) => getTopic(name), [
    props.topic
  ]) as RosTopic

  useEffect(() => {
    topic.subscribe((newMessage) => setMessage(newMessage))
    return () => topic.unsubscribe()
  }, [topic])

  return <Message msg={message} />
}
