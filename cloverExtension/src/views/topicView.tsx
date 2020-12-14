import React, { Suspense, useState } from 'react'
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
        getVariants={async () => (await getTopics()).map((topic) => topic.name)}
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
