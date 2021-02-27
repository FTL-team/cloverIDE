import React, { useEffect, useState } from 'react'
import { RosJsMessage } from '../../ros/builtinTypes'
import Editor from '../message/Editor'
import styles from './dialog.css'

export function Dialog({
  text,
  iniVal,
  onCancel,
  onConfirm
}: {
  text: string
  iniVal: RosJsMessage
  onCancel: () => void
  onConfirm: (params: RosJsMessage) => void
}) {
  const [val, setVal] = useState(iniVal)
  useEffect(() => setVal(iniVal), [iniVal])

  return (
    <div className={styles.dialogBack}>
      <div className={styles.root}>
        <div>Are you sure you want to {text}</div>
        <Editor msg={val} setMsg={setVal} />
        <div className={styles.sp} />
        <div className={styles.b}>
          <button onClick={()=>onConfirm(val)}>Yes</button>
          <div className={styles.ss}></div>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}
