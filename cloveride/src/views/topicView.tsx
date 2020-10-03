import * as ros from '../common/ros'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Choose } from '../components/choose'
import { Message } from '../components/message'
import '../common/common.css'

function Topic(props: { topic: string }) {
  const [message, setMessage] = useState({})
  useEffect(() => {
    let rosTopic: null | ros.roslib.Topic = null
    let stopped = false
    ros.getTopic(props.topic).then(
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

function App() {
  const [topic, setTopic] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={async () => {
          const topics = await ros.getTopics()
          return topics.map((topic) => topic.name)
        }}
        onChange={(newTopic) => {
          setTopic(newTopic)
        }}
      />
      {topic && <Topic topic={topic} />}
    </>
  )
}

render(<App />, document.querySelector('#root'))
