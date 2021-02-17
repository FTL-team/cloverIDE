import React, { Suspense } from 'react'
import { render } from 'react-dom'
import '../common.css'
import { Battery } from '../components/copterStatus/Battery'
import { Attitude } from '../components/copterStatus/Attitude'
import { Text } from '../components/copterStatus/Text'
import GlobalLoader from '../components/loader/GlobalLoader'
import { useMav } from '../useMav'

import { useTopic } from '../ros/hooks/topic'

function App() {
  const mav = useMav()
  const state = useTopic('/mavros/state')
  return (
    <>
      {/* {JSON.stringify(mav, undefined, 4)}
      {JSON.stringify(state, undefined, 4)} */}
      <div
        style={{
          fontSize: '2em',
          display: 'flex'
        }}
      >
        Mode: {state?.mode}
        <span style={{ color: state?.armed ? 'green' : 'red', marginLeft: 10 }}>
          {state?.armed ? 'ARMED' : 'DISARMED'}
        </span>
      </div>

      <Battery
        percentage={mav.battery?.percentage ?? 50}
        voltage={mav.battery?.total ?? 11.5}
      />

      <br />
      <Attitude
        yaw={mav.attitude?.yaw ?? 0}
        roll={-(mav.attitude?.roll ?? 0)}
        pitch={-(mav.attitude?.pitch ?? 0)}
      />

      <Text>Altitude: {mav.altitude?.toFixed(2)} M</Text>
      <Text>Ground speed: {mav.hud?.groundSpeed.toFixed(3) ?? '0'} M/s</Text>
    </>
  )
}

render(
  <Suspense fallback={<GlobalLoader />}>
    <App />
  </Suspense>,
  document.querySelector('#root')
)
