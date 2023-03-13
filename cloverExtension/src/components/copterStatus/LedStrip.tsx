import React from 'react'
import { LEDStateArray } from '../../ros/builtinTypes'
import styles from './ledStrip.css'

export function LedStrip({ leds }: { leds: LEDStateArray | null }) {
  return (
    <div className={styles.root}>
      {(leds?.leds ?? []).map((e) => (
        <div
          key={e.index}
          className={styles.led}
          style={{
            backgroundColor: `rgb(${e.r}, ${e.g}, ${e.b})`
          }}
        />
      ))}
    </div>
  )
}
