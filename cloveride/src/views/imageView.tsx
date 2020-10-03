import React, { useState } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import ImageTopic from '../components/ImageTopic'
import { getTopicsForType } from '../ros/topic'
import '../common.css'

function App() {
  const [topic, setTopic] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={async () => {
          const topics = await getTopicsForType('sensor_msgs/Image')
          return topics.map((topics) => topics.name)
        }}
        onChange={(newTopic) => {
          setTopic(newTopic)
        }}
      />
      {topic && <ImageTopic topic={topic} />}
    </>
  )
}

render(<App />, document.querySelector('#root'))
