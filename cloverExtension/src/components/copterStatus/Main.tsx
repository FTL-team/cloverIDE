import React from 'react'
import { Attitude } from './Attitude'
import { Value } from './Value'
import ImageTopic from '../ImageTopic'
import { AttitudeInfo } from '../../useMav'
import styles from './main.css'
import { Translation } from '../../ros/builtinTypes'
import Choose from '../Choose'

export function Main({
  attitude,
  groundSpeed,
  altitude,
  translation,
  frames,
  setCordFrame,
  cordFrame,
  distToNav
}: {
  attitude: AttitudeInfo
  groundSpeed: number | null | undefined
  altitude: number | null | undefined
  translation: Translation
  frames: string[]
  cordFrame: string, 
  distToNav: number
  setCordFrame: (n: string)=>void
}) {
  return (
    <div className={styles.root}>
      <div className={styles.altitude}>
        <ImageTopic topic="/main_camera/image_raw" />
        <Choose
          getVariants={() => frames}
          text="Frame"
          value={cordFrame}
          onChange={(a) => (a ? setCordFrame(a) : null)}
        />
        <Value title="X" value={translation.x?.toFixed(3) ?? '???'} />
        <Value title="Y" value={translation.y?.toFixed(3) ?? '???'} />
        <Value title="Z" value={translation.z?.toFixed(3) ?? '???'} />
      </div>
      <div className={styles.attitude}>
        <Attitude
          yaw={attitude.yaw}
          roll={-attitude.roll}
          pitch={-attitude.pitch}
        />
        <Value
          title="Altitude (rel) (m)"
          value={altitude?.toFixed(2) ?? '???'}
        />
        <Value
          title="Ground speed (m/s)"
          value={groundSpeed?.toFixed(3) ?? '???'}
        />
        <Value
          title="Distance to target (m)"
          value={distToNav?.toFixed(3)}
        />
      </div>
    </div>
  )
}
