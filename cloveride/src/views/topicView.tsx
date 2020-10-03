import React, { useState } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import Topic from '../components/Topic'
import { getTopics } from '../ros/topic'
import '../common.css'

function App() {
  const [topic, setTopic] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={async () => {
          const topics = await getTopics()
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
