import React from 'react'
import { RosJsMessage } from '../../ros/builtinTypes'
import MessageInputField from './MessageInputField'
import MessageTree from './MessageTree'

export default function Editor(props: {
  msg: RosJsMessage
  setMsg: (a: RosJsMessage) => void
}) {
  return (
    <MessageTree
      msg={props.msg}
      renderVal={(value, setValue) => (
        <MessageInputField setValue={setValue} value={value} />
      )}
      setVal={(value) => props.setMsg(value as RosJsMessage)}
    />
  )
}
