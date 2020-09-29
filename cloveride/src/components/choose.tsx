import React from 'react'
import style from './choose.css'
import { quickPick } from '../common/vscode'

type ChooseProps = {
  text: string
  value: string | null
  getVariants: () => Promise<string[]>
  onChange: (val: string | null) => void
}

export function Choose(props: ChooseProps) {
  return (
    <div className={style.root}>
      <span className={style.text}>{props.text}: </span>
      <span className={style.value}>{props.value ? props.value : ''}</span>
      <button
        className={style.btn}
        onClick={async () => {
          props.onChange(null)
          let variants = await props.getVariants()
          let res = await quickPick(variants)
          props.onChange(res[0])
        }}
      >
        Choose
      </button>
    </div>
  )
}
