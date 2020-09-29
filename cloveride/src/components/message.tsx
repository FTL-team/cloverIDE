import React from 'react'
import style from './message.css'

interface Msg {
  [key: string]: string | number | boolean | Msg 
}

export function Message(props: { msg: Msg; pad?: string }) {
  let res: React.ReactElement[] = []
  let msg = props.msg
  let pad = props.pad ? props.pad : ''

  for (let key in msg) {
    let child = <span>UNKNOWN TYPE</span>
    let type = typeof msg[key]
    if (type == 'number') {
      child = <span className={style.num}>{msg[key]}</span>
    } else if (type == 'string') {
      child = <span className={style.str}>{JSON.stringify(msg[key])}</span>
    } else if (type == 'boolean') {
      child = <span className={style.bool}>{JSON.stringify(msg[key])}</span>
    } else {
      child = <Message msg={msg[key] as Msg} pad={pad + '    '} />
    }

    res.push(
      <div key={key}>
        {pad}
        <span className={style.key}>{key}: </span>
        {child}
      </div>
    )
  }
  
  return <div className={style.root}>{res}</div>
}
