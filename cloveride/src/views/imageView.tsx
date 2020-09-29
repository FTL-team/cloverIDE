import * as ros from '../common/ros'
import React, { useState } from 'react'
import { render } from 'react-dom'
import { Choose } from '../components/choose'
import '../common/common.css'

function Topic(props: { topic: string }) {
  return <img src={'http://localhost:8080/stream?topic=' + props.topic} />
}

function App() {
  let [topic, setTopic] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={async () => {
          let topics = await ros.getTopicsForType('sensor_msgs/Image')
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
