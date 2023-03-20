import React, { Suspense, useState, useEffect, useMemo } from 'react'
import { render } from 'react-dom'
import '../common'
import { Top } from '../components/copterStatus/Top'
import { Main } from '../components/copterStatus/Main'
import GlobalLoader from '../components/loader/GlobalLoader'
import { useMav } from '../useMav'
import { useTopic } from '../ros/hooks/topic'
import { Dialog } from '../components/copterStatus/Dialog'
import { copterActions } from '../copterActions'
import { quickPick } from '../vscode'
import { getTF, Transform } from '../ros/core'
import { LEDStateArray, RosJsMessage, Translation } from '../ros/builtinTypes'
import { getTopic } from '../ros/topic'

function App() {
  const mav = useMav()
  const state = useTopic('/mavros/state')
  const [preparam, setPreparam] = useState<string>('')
  const [dis, setDis] = useState<null | string>(null)
  const tf = useMemo(() => getTF(), [])
  const [msg, setMsg] = useState<Translation>({ x: 0, y: 0, z: 0 })
  const [frames, setFrames] = useState<string[]>([])

  const [cordFrame, setCordFrame] = useState<string>('map')

  const [distToNav, setDistToNav] = useState<number>(0)

  const leds = useTopic("/led/state")

  useEffect(() => {
    const a: (a: Transform) => void = (t) =>
      setMsg({
        x: -t.translation.x,
        y: -t.translation.y,
        z: -t.translation.z
      })
    tf.subscribe(cordFrame, a)
    return () => tf.unsubscribe(cordFrame, a)
  }, [cordFrame])

  useEffect(() => {
    const a: (a: Transform) => void = (t) =>
      setDistToNav(
        Math.sqrt(
          t.translation.x * t.translation.x +
            t.translation.y * t.translation.y +
            t.translation.z * t.translation.z
        )
      )
    tf.subscribe('navigate_target', a)
    return () => tf.unsubscribe('navigate_target', a)
  }, [])

  useEffect(() => {
    const lf: string[] = []
    for (const top of ['/tf', '/tf_static'])
      getTopic(top).then((topic) =>
        topic.subscribe((msg) => {
          let frame = (((msg as RosJsMessage)
            .transforms as unknown) as RosJsMessage[])[0]
            .child_frame_id as string
          if (lf.indexOf(frame) == -1) {
            lf.push(frame)
            setFrames([...lf])
          }
          frame = ((((msg as RosJsMessage)
            .transforms as unknown) as RosJsMessage[])[0]
            .header as RosJsMessage).frame_id as string
          if (lf.indexOf(frame) == -1) {
            lf.push(frame)
            setFrames([...lf])
          }
        })
      )
  }, [])

  return (
    <>
      {dis !== null && (
        <Dialog
          text={
            copterActions
              .find((action) => action.name === dis)
              ?.text(preparam) ?? 'to do something'
          }
          iniVal={
            copterActions.find((action) => action.name === dis)?.param ?? {}
          }
          onCancel={() => setDis(null)}
          onConfirm={(params) => {
            console.log(params)
            copterActions
              .find((action) => action.name === dis)
              ?.run(params, preparam)
            setDis(null)
          }}
        />
      )}
      <Top
        armed={(state?.armed as boolean | undefined) ?? false}
        mode={(state?.mode as string | undefined) ?? 'Загрузка'}
        battery={
          mav.battery ?? {
            cellsVoltage: [4, 4, 4],
            total: 12,
            percentage: 50
          }
        }
        actions={copterActions.filter((action) =>
          action.show({
            armed: (state?.armed as boolean | undefined) ?? false,
            altitude: mav.altitude ?? 0
          })
        )}
        onAction={async (act) => {
          const preparam = copterActions.find((action) => action.name === act)
            ?.preparam
          let preparamI: string | null = ''
          if (preparam) preparamI = (await quickPick(preparam(frames)))[0]
          if (preparamI === null) return
          setPreparam(preparamI)
          setDis(act)
        }}
        leds={(leds as any) as LEDStateArray}
      />

      <Main
        attitude={
          mav.attitude ?? {
            yaw: 0,
            pitch: 0,
            roll: 0
          }
        }
        altitude={mav.altitude}
        groundSpeed={mav.hud?.groundSpeed}
        translation={msg}
        frames={frames}
        setCordFrame={setCordFrame}
        cordFrame={cordFrame}
        distToNav={distToNav}
      />

      {/* {JSON.stringify(frames)} */}
    </>
  )
}

render(
  <Suspense fallback={<GlobalLoader />}>
    <App />
  </Suspense>,
  document.querySelector('#root')
)
