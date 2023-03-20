import React from 'react'
import { LEDStateArray } from '../../ros/builtinTypes'
import styles from './ledStrip.css'

export function LedStrip({ leds }: { leds: LEDStateArray | null }) {
  let prev = -1
  return (
    <div className={styles.root}>
      {(leds?.leds ?? [])
        .sort((a, b) => a.index - b.index)
        .filter((e) => {
          if (prev == e.index) return false
          prev = e.index
          return true
        })
        .map((e) => (
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
