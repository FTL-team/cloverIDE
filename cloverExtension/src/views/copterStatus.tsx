import React, { Suspense } from 'react'
import { render } from 'react-dom'
import '../common.css'
import battery from '../battery.css'
import { Attitude } from '../components/Attitude'
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
        Mode: {state?.mode}{' '}
        <span style={{ color: state?.armed ? 'green' : 'red', marginLeft: 10 }}>
          {" "}{state?.armed ? 'ARMED' : 'DISARMED'}
        </span> 
      </div>
      <div
        style={{
          fontSize: '2em',
          display: 'flex'
        }}
      >
        Battery:
        <div className={battery.contain}>
          <div className={battery.batteryContainer}>
            <div className={battery.batteryOuter}>
              <div
                id={battery.batteryLevel}
                style={{
                  width: (75 * (mav.battery?.percentage ?? 0)) / 100
                }}
              ></div>
            </div>
            <div className={battery.batteryBump}></div>
          </div>
        </div>
        {mav.battery?.total.toFixed(2) ?? 0}V
      </div>

      <br />
      <Attitude
        yaw={mav.attitude?.yaw ?? 0}
        roll={-(mav.attitude?.roll ?? 0)}
        pitch={-(mav.attitude?.pitch ?? 0)}
      />

      <div
        style={{
          fontSize: '2em',
          display: 'flex'
        }}
      >
        Altitude: {mav.altitude?.toFixed(2)} M<br />
        Ground speed: {mav.hud?.groundSpeed.toFixed(3) ?? '0'} M/s
      </div>
    </>
  )
}

render(
  <Suspense fallback={<GlobalLoader />}>
    <App />
  </Suspense>,
  document.querySelector('#root')
)
