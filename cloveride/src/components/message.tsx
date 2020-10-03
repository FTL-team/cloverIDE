import React from 'react'
import style from './message.css'

interface Msg {
  [key: string]: string | number | boolean | Msg
}

export function Message(props: { msg: Msg; pad?: string }) {
  const result: React.ReactElement[] = []
  const message = props.msg
  const pad = props.pad ?? ''

  for (const key in message) {
    if (Object.prototype.hasOwnProperty.call(message, key)) {
      let child = <span>UNKNOWN TYPE</span>
      const type = typeof message[key]
      if (type === 'number') {
        child = <span className={style.num}>{message[key]}</span>
      } else if (type === 'string') {
        child = (
          <span className={style.str}>{JSON.stringify(message[key])}</span>
        )
      } else if (type === 'boolean') {
        child = (
          <span className={style.bool}>{JSON.stringify(message[key])}</span>
        )
      } else {
        child = <Message msg={message[key] as Msg} pad={pad + '    '} />
      }

      result.push(
        <div key={key}>
          {pad}
          <span className={style.key}>{key}: </span>
          {child}
        </div>
      )
    }
  }

  return <div className={style.root}>{result}</div>
}
