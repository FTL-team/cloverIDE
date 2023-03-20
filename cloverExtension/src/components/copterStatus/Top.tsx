import React from 'react'
import { Battery } from './Battery'
import { Mode } from './Mode'
import { BatteryInfo } from '../../useMav'
import styles from './top.css'
import { CopterAction } from '../../copterActions'
import { TopButton } from './TopButton'
import { LEDStateArray } from '../../ros/builtinTypes'
import { LedStrip } from './LedStrip'

export function Top({
  mode,
  armed,
  battery,
  actions,
  onAction,
  leds
}: {
  mode: string
  armed: boolean
  battery: BatteryInfo
  actions: CopterAction[]
  onAction: (action: string) => void
  leds: LEDStateArray | null
}) {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.tools}>
          <Battery percentage={battery.percentage} voltage={battery.total} />
          <Mode mode={mode} armed={armed} />
          <div>
            {actions.map((action) => (
              <TopButton
                icon={action.icon}
                onClick={() => onAction(action.name)}
              >
                {action.name.toUpperCase()}
              </TopButton>
            ))}
          </div>
        </div>
        <LedStrip leds={leds} />
      </div>
    </>
  )
}
