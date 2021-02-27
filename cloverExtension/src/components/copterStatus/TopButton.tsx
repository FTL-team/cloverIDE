import React from 'react'
import styles from './top.css'

export function TopButton({
  icon,
  children,
  onClick
}: {
  icon: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <div className={styles.button} onClick={onClick}>
      <img src={icon} width="32" height="32" />
      <br />
      {children}
    </div>
  )
}
