import React, { Suspense, useState } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import Topic from '../components/Topic'
import { getTopics, TopicInfo } from '../ros/topic'
import '../common.css'
import usePromise from 'react-promise-suspense'

function App() {
  const [topic, setTopic] = useState<null | string>(null)
  const topics = usePromise(getTopics, []) as TopicInfo[]

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={() => topics.map((topic) => topic.name)}
        onChange={(newTopic) => setTopic(newTopic)}
      />
      <Suspense fallback={<h1>Loading...</h1>}>
        {topic && <Topic topic={topic} />}
      </Suspense>
    </>
  )
}

render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <App />
  </Suspense>,
  document.querySelector('#root')
)
