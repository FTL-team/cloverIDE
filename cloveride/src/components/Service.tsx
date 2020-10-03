import React, { useState, useEffect } from 'react'
import Message from './Message'
import Editor from './Editor'
import {
  ServiceRequest,
  getService,
  getServiceType,
  getServiceRequestDetails
} from '../ros/service'

interface RequestTypedef {
  type: string
  fieldnames: string[]
  fieldtypes: string[]
  fieldarraylen: number[]
  examples: any[]
  constname: any[]
  consvalues: any[]
}

interface RequestType {
  typedefs: RequestTypedef[]
}

function turnIntoMessage(o: Record<string, unknown>) {
  const k: any = {}
  Object.entries(o).forEach(([key, value]) => {
    const isP = Object.prototype.hasOwnProperty.call(
      value,
      '_____PARAMETER__PLEASE__WOW_MAGIC'
    )
    k[key] = isP
      ? (value as { val: any }).val
      : turnIntoMessage(value as Record<string, unknown>)
  })
  return k
}

export default function Service(props: { service: string }) {
  const [type, setType] = useState<string | null>(null)
  const [typedefs, setTypedefs] = useState<RequestType | null>(null)
  const [value, setValue] = useState<any>({})
  const [lastResponse, setLastRespone] = useState<any>({})

  useEffect(() => {
    let stopped = false

    ;(async () => {
      const type = await getServiceType(props.service)
      if (stopped) return
      const requestDetails = await getServiceRequestDetails(type)

      setType(type)
      setTypedefs(requestDetails)
    })()

    return () => {
      stopped = true
    }
  }, [props.service])

  if (typedefs === null) return <h1>Loading...</h1>
  if (type === null) return <h1>Loading...</h1>

  return (
    <div>
      <Editor
        typedefs={typedefs.typedefs}
        type={type + 'Request'}
        value={value}
        setValue={setValue}
      />
      <button
        type="button"
        onClick={async () => {
          const service = await getService(props.service)
          service.callService(
            new ServiceRequest(turnIntoMessage(value)),
            (response) => setLastRespone(response),
            console.warn
          )
        }}
      >
        Call
      </button>
      <Message msg={lastResponse} />
      {/* <p>{JSON.stringify(turnIntoMsg(val), undefined, 2)}</p>
        <p>{JSON.stringify(typedefs, undefined, 2)}</p>
        <p>{type}</p> */}
    </div>
  )
}
