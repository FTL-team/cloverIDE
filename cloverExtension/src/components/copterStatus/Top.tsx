import React from 'react'
import { Battery } from './Battery'
import { Mode } from './Mode'
import { BatteryInfo } from '../../useMav'
import styles from './top.css'
import { CopterAction } from '../../copterActions'
import { TopButton } from './TopButton'

export function Top({
  mode,
  armed,
  battery,
  actions,
  onAction
}: {
  mode: string
  armed: boolean
  battery: BatteryInfo
  actions: CopterAction[]
  onAction: (action: string) => void
}) {
  return (
    <>
      <div className={styles.root}>
        <Battery percentage={battery.percentage} voltage={battery.total} />
        <div className={styles.space}></div>
        <Mode mode={mode} armed={armed} />
        <div className={styles.fs} />
        {actions.map((action) => (
          <TopButton icon={action.icon} onClick={() => onAction(action.name)}>
            {action.name.toUpperCase()}
          </TopButton>
        ))}
        <div className={styles.space}></div>
      </div>

      <div className={styles.hs} />
    </>
  )
}
