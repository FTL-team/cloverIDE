import React from 'react'
import styles from './message.css'
import { RosJsType } from '../../ros/builtinTypes'

export default function MessageOutputField(props: { val: RosJsType }) {
  const value = props.val

  if (typeof value === 'string')
    return <span className={styles.str}>{JSON.stringify(value)}</span>

  if (typeof value === 'number')
    return <span className={styles.num}>{value}</span>

  if (typeof value === 'boolean')
    return <span className={styles.bool}>{JSON.stringify(value)}</span>

  return <span>Error!!!</span>
}
