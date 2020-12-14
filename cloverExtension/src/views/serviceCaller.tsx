import React, { Suspense } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import { getServices } from '../ros/service'
import Service from '../components/Service'
import '../common.css'
import { useVsState } from '../useVSState'

function App() {
  const [service, setService] = useVsState<null | string>(null)

  return (
    <>
      <Choose
        text="Service"
        value={service}
        getVariants={async () => getServices()}
        onChange={(newService) => setService(newService)}
      />
      <Suspense fallback={<h1>Loading...</h1>}>
        {service && <Service service={service} />}
      </Suspense>
    </>
  )
}

render(<App />, document.querySelector('#root'))
