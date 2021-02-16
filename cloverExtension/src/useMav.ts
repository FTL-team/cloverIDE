import { useEffect, useState } from 'react'
import usePromise from 'react-promise-suspense'
import { RosJsMessage } from './ros/builtinTypes'
import { getTopic, Topic as RosTopic } from './ros/topic'

interface BatteryInfo {
  cellsVoltage: number[]
  total: number
  percentage: number
}

interface HudInfo {
  heading: number
  groundSpeed: number
}

interface AttitudeInfo {
  roll: number
  pitch: number
  yaw: number
}

export function useMav() {
  const topic = usePromise(getTopic, ['/mavlink/from', true]) as RosTopic

  const [battery, setBattery] = useState<BatteryInfo | null>()
  const [hud, setHud] = useState<HudInfo | null>()
  const [attitude, setAttitude] = useState<AttitudeInfo | null>()
  const [altitude, setAltitude] = useState<number | null>()

  // const [message, setMessage] = useState<roslib.Message | null>(null)
  useEffect(() => {
    console.log('HOPE GOD WILL HELP')
    topic.subscribe((newMessageRaw) => {
      // console.log(newMessageRaw)
      const newMessage = newMessageRaw as RosJsMessage
      const payload64 = (newMessage.payload64 as unknown) as BigInt64Array

      if (newMessage.msgid == 147) {
        // const t: number[] = []
        // t.append()c
        const cellsVoltage = [
          ...new Uint16Array(payload64.buffer.slice(10), 0, 10).values()
        ]
          .filter((e) => e != 0xffff)
          .map((e) => e / 1000)

        setBattery({
          cellsVoltage,
          total: cellsVoltage.reduce((a, b) => a + b, 0),
          percentage: [
            ...new Uint8Array(
              payload64.buffer,
              payload64.byteOffset,
              payload64.byteLength
            ).values()
          ][35]
        })
      } else if (newMessage.msgid == 74) {
        const floats = new Float32Array(
          payload64.buffer,
          payload64.byteOffset,
          6
        )

        setHud({
          groundSpeed: floats[1],
          heading: new Int16Array(payload64.buffer, payload64.byteOffset, 12)[8]
        })
      } else if (newMessage.msgid == 141) {
        const floats = new Float32Array(
          payload64.buffer,
          payload64.byteOffset,
          6
        )

        setAltitude(floats[5])
      } else if (newMessage.msgid == 30) {
        const floats = new Float32Array(
          payload64.buffer,
          payload64.byteOffset,
          6
        )

        setAttitude({
          roll: floats[1],
          pitch: floats[2],
          yaw: floats[3]
        })
      }
    })
    return () => topic.unsubscribe()
  }, [topic])

  return {
    battery,
    hud,
    altitude,
    attitude
  }
}
