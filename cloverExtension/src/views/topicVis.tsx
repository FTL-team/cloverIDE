import React, { Suspense, useEffect } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import Topic from '../components/Topic'
import { getTopics } from '../ros/topic'
import '../common'
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

let el = document.querySelector<HTMLDivElement>('#root')
if (el) {
  render(<App />, el)
  el.style.padding = '10px'
}