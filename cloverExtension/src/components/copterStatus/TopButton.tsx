import React, { FunctionComponent } from 'react'
import styles from './top.css'

export function TopButton({
  icon: Icon,
  children,
  onClick
}: {
  icon: FunctionComponent
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <div className={styles.button} onClick={onClick}>
      <Icon />
      <br />
      {children}
    </div>
  )
}
