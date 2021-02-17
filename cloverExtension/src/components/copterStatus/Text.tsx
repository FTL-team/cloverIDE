import React from 'react'
import styles from './mode.css'

export function Text({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>
}
