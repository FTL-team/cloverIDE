import React, { useState, useEffect } from 'react'
import Message from './message/Message'
import Editor from './message/Editor'
import { useService } from '../ros/hooks/service'
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react'

export default function Service(props: { service: string }) {
  const { call, loading, requestDetails, result } = useService(props.service)
  const [value, setValue] = useState(requestDetails)
  useEffect(() => setValue(requestDetails), [requestDetails])

  return (
    <div>
      <Editor msg={value} setMsg={setValue} />
      <VSCodeButton type="button" onClick={() => call(value)}>
        Call
      </VSCodeButton>

      {!loading && result !== null && <Message msg={result} />}
    </div>
  )
}
