import React, { Suspense, useEffect } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import { getServices } from '../ros/service'
import Service from '../components/Service'
import '../common.css'
import { useVsState } from '../useVSState'
import { changeTitle } from '../vscode'
import GlobalLoader from '../components/loader/GlobalLoader'

function App() {
  const [service, setService] = useVsState<null | string>(null)


  useEffect(() => {
   changeTitle(service ?? 'Service caller')
  }, [service])

  return (
    <>
      <Choose
        text="Service"
        value={service}
        getVariants={async () => getServices()}
        onChange={(newService) => setService(newService)}
      />
      <Suspense fallback={<GlobalLoader/>}>
        {service && <Service service={service} />}
      </Suspense>
    </>
  )
}

render(<App />, document.querySelector('#root'))
