import React, { lazy, Suspense, useEffect } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
// import ImageTopic from '../components/ImageTopic'
import { getTopicsForType } from '../ros/topic'
import '../common'
import { changeTitle } from '../vscode'
import { useVsState } from '../useVSState'
import GlobalLoader from '../components/loader/GlobalLoader'

const ImageTopic = lazy(() => import('../components/ImageTopic'))

function App() {
  const [topic, setTopic] = useVsState<null | string>(null)
  useEffect(() => {
    changeTitle(topic ?? 'Image topic visualization')
  }, [topic])
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
      <Suspense fallback={<GlobalLoader />}>
        {topic && <ImageTopic topic={topic} />}
      </Suspense>
    </>
  )
}

let el = document.querySelector<HTMLDivElement>('#root')
if (el) {
  render(<App />, el)
  el.style.padding = '10px'
}
