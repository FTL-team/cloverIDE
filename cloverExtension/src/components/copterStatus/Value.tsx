import React from 'react'
import styles from './value.css'

export function Value({ title, value }: { title: string, value: number | null | undefined}) {
  let valtxt = '???'
  if(typeof value === 'number') {
    if(value < 0) valtxt = '-'
    else valtxt = ' '
    valtxt += Math.abs(value).toFixed(3) //.padStart(6, '0')
  }
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div> 
      <div className={styles.value}>{valtxt}</div>
    </div>
  )
}
