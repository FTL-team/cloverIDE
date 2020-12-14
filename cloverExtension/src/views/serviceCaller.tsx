import React, { useState, Suspense } from 'react'
import { render } from 'react-dom'
import Choose from '../components/Choose'
import { getServices } from '../ros/service'
import Service from '../components/Service'
import '../common.css'

function App() {
  const [service, setService] = useState<null | string>(null)

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
