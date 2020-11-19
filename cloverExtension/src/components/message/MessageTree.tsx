import React from 'react'
import style from './message.css'
import { RosJsType, RosJsMessage } from '../../ros/builtinTypes'

export default function MessageTree(props: {
  msg: RosJsMessage
  renderVal: (
    value: RosJsType,
    setVal: (newValue: RosJsType) => void
  ) => React.ReactElement
  setVal?: (newValue: RosJsType | RosJsMessage) => void
  pad?: string
}) {
  const result: React.ReactElement[] = []
  const message = props.msg
  const renderValue = props.renderVal
  const pad = props.pad ?? ''
  const setValue = props.setVal ?? (() => 0)

  for (const key in message) {
    if (Object.prototype.hasOwnProperty.call(message, key)) {
      const value = message[key]
      let valueElement = <h1>Unknow type</h1>
      if (
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string'
      )
        valueElement = renderValue(value, (newValue) => {
          message[key] = newValue
          setValue(Object.assign({}, message))
        })
      else
        valueElement = (
          <MessageTree
            msg={value}
            renderVal={renderValue}
            pad={pad + '    '}
            setVal={(newSubValue) => {
              message[key] = newSubValue
              setValue(Object.assign({}, message))
            }}
          />
        )

      result.push(
        <div key={key}>
          {pad}
          <span className={style.key}>{key}: </span>
          {valueElement}
        </div>
      )
    }
  }

  return <div className={style.root}>{result}</div>
}
