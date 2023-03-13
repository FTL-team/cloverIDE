import React from 'react'
import style from './choose.css'
import { quickPick } from '../vscode'
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react'

type ChooseProps = {
  text: string
  value: string | null
  getVariants: () => Promise<string[]> | string[]
  onChange: (val: string | null) => void
}

export default function Choose(props: ChooseProps) {
  return (
    <div className={style.root}>
      <span className={style.text}>{props.text}: </span>
      <span className={style.value}>{props.value ? props.value : ''}</span>
      <VSCodeButton
        type="button"
        className={style.btn}
        onClick={async () => {
          props.onChange(null)
          const variants = await props.getVariants()
          const result = await quickPick(variants)
          props.onChange(result[0])
        }}
      >
        Choose
      </VSCodeButton>
    </div>
  )
}
