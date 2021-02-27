import React, { Suspense, useEffect } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import Topic from '../components/Topic'
import { getTopics } from '../ros/topic'
import '../common.css'
import { useVsState } from '../useVSState'
import { changeTitle } from '../vscode'
import GlobalLoader from '../components/loader/GlobalLoader'

function App() {
  const [topic, setTopic] = useVsState<null | string>(null)

  useEffect(() => {
    changeTitle(topic ?? 'Topic visualization')
  }, [topic])

  return (
    <>
      <Choose
        text="Topic"
        value={topic}
        getVariants={async () => (await getTopics()).map((topic) => topic.name)}
        onChange={(newTopic) => setTopic(newTopic)}
      />
      <Suspense fallback={<GlobalLoader/>}>
        {topic && <Topic topic={topic} />}
      </Suspense>
    </>
  )
}

render(
  <Suspense fallback={<GlobalLoader/ >}>
    <App />
  </Suspense>,
  document.querySelector('#root')
)
