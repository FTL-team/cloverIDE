import React from 'react'
import styles from './value.css'

export function Value({ title, value }: { title: string, value: string}) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div> 
      <div className={styles.value}>{value}</div>
    </div>
  )
}
