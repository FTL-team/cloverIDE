import React from 'react'
import styles from './loader.css'
import Loader from './Loader'

export default function GlobalLoader() {
  return <div className={styles.center} >
    <Loader/>
  </div>  
}