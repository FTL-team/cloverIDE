import React, { lazy, Suspense } from 'react'
import { Attitude } from './Attitude'
import { Value } from './Value'
import { AttitudeInfo } from '../../useMav'
import styles from './main.css'
import { Translation } from '../../ros/builtinTypes'
import Choose from '../Choose'
import Loader from '../loader/Loader'

const ImageTopic = lazy(() => import('../ImageTopic'))

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
  cordFrame: string
  distToNav: number
  setCordFrame: (n: string) => void
}) {
  return (
    <div className={styles.root}>
      <div className={styles.altitude}>
        <Suspense
          fallback={
            <div className={styles.fallbackImage}>
              <Loader />
            </div>
          }
        >
          <ImageTopic topic="/main_camera/image_raw" />
        </Suspense>
        <Choose
          getVariants={() => frames}
          text="Frame"
          value={cordFrame}
          onChange={(a) => (a ? setCordFrame(a) : null)}
        />
        <div className={styles.cords}>
          <Value title="X" value={translation.x} />
          <Value title="Y" value={translation.y} />
          <Value title="Z" value={translation.z} />
        </div>
      </div>
      <div className={styles.attitude}>
        <Attitude
          yaw={attitude.yaw}
          roll={-attitude.roll}
          pitch={-attitude.pitch}
        />
        <Value title="Altitude (rel) (m)" value={altitude} />
        <Value title="Ground speed (m/s)" value={groundSpeed} />
        <Value title="Distance to target (m)" value={distToNav} />
      </div>
    </div>
  )
}
