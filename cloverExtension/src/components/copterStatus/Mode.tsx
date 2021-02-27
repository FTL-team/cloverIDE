import React from 'react'
import styles from './mode.css'

export function Mode({ mode, armed }: { mode: string; armed: boolean }) {
  return (
    <div className={styles.root}>
      {mode}
      <span className={armed ? styles.armed : styles.disarmed}>
        {armed ? 'ARMED' : 'DISARMED'}
      </span>
    </div>
  )
}
