import React, { useState, Suspense } from 'react'
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
        getVariants={async () =>
          (await getTopicsForType('sensor_msgs/Image')).map(
            (topics) => topics.name
          )
        }
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
