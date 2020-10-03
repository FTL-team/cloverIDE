import React, { useState } from 'react'
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
        getVariants={async () => {
          const services = await getServices()
          return services
        }}
        onChange={(newService) => {
          setService(newService)
        }}
      />
      {service && <Service service={service} />}
    </>
  )
}

render(<App />, document.querySelector('#root'))
