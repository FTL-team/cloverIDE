import * as ros from '../common/ros'
// import * as vscode from '../common/vscode'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Choose } from '../components/choose'
import { Message } from '../components/message'
import '../common/common.css'

function Topic(props: { topic: string }) {
  let [msg, setMsg] = useState({})
  useEffect(() => {
    let rosTopic: null | ros.roslib.Topic = null
    let stopped = false
    ros.getTopic(props.topic).then((newRosTopic) => {
      if (!stopped) {
        rosTopic = newRosTopic
        rosTopic.subscribe((newMsg) => setMsg(newMsg))
      }
    })
    return () => {
      if (rosTopic) rosTopic.unsubscribe()
      stopped = true
    }
  }, [props.topic])
  return <Message msg={msg}/>
}

function App() {
  let [topic, setTopic] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={async () => {
          let topics = await ros.getTopics()
          return topics.map((e) => e.name)
        }}
        onChange={(newTopic) => {
          setTopic(newTopic)
        }}
      />
      {topic && <Topic topic={topic} />}
    </>
  )
}

render(<App />, document.getElementById('root'))

