import React from 'react'
import styles from './battery.css'

export function Battery({
  percentage,
  voltage
}: {
  percentage: number
  voltage: number
}) {
  return (
    <div className={styles.root}>
      <div className={styles.inlineContainer}>
        <div className={styles.container}>
          <div className={styles.outer}>
            <div className={styles.voltage}>{voltage.toFixed(2)}V</div>
            <div
              className={styles.level}
              style={{
                width: 0.75 * percentage
              }}
            ></div>
          </div>
          <div className={styles.bump}></div>
        </div>
      </div>
    </div>
  )
}
