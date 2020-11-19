import React, { useState, Suspense } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import ImageTopic from '../components/ImageTopic'
import { getTopicsForType, TopicInfo } from '../ros/topic'
import '../common.css'
import usePromise from 'react-promise-suspense'

function App() {
  const [topic, setTopic] = useState<null | string>(null)
  const topics = usePromise(getTopicsForType, [
    'sensor_msgs/Image'
  ]) as TopicInfo[]
  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={() => topics.map((topics) => topics.name)}
        onChange={(newTopic) => setTopic(newTopic)}
      />
      {topic && <ImageTopic topic={topic} />}
    </>
  )
}

render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <App />
  </Suspense>,
  document.querySelector('#root')
)
