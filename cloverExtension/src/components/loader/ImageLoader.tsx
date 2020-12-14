import React from 'react'
import styles from './loader.css'
import Loader from './Loader'

export default function ImageLoader({ width, height }: { width: number, height: number }) {
  return (
    <div
      style={{ width: width + 'px', height: height + 'px' }}
      className={styles.image}
    >
      <Loader />
    </div>
  )  
}