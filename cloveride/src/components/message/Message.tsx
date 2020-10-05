import React from 'react'
import { RosJsMessage } from '../../ros/builtinTypes'
import MessageTree from './MessageTree'
import MessageOutputField from './MessageOutputField'

export default function Message(props: { msg: RosJsMessage }) {
  return (
    <MessageTree
      msg={props.msg}
      renderVal={(value) => <MessageOutputField val={value} />}
    />
  )
}
