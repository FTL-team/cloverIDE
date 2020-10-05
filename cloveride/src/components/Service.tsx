import React, { useState, useEffect } from 'react'
import Message from './message/Message'
import Editor from './message/Editor'
import {
  ServiceRequest,
  getService,
  getServiceType,
  getServiceRequestDetails
} from '../ros/service'
import {
  builtinBooleanTypes,
  builtinNumberTypes,
  builtinStringTypes,
  RosJsMessage
} from '../ros/builtinTypes'

interface RequestTypedef {
  type: string
  fieldnames: string[]
  fieldtypes: string[]
  fieldarraylen: number[]
  examples: any[]
  constname: any[]
  consvalues: any[]
}

function typedefsToMessage(typedefs: RequestTypedef[], type: string) {
  if (builtinBooleanTypes.includes(type)) return false
  if (builtinStringTypes.includes(type)) return ''
  if (builtinNumberTypes.includes(type)) return 0

  const typedef = typedefs.find((typedef) => typedef.type === type)
  const result: Record<string, unknown> = {}
  typedef?.fieldnames.map((name, i) => {
    result[name] = typedefsToMessage(
      typedefs,
      typedef?.fieldtypes[i] ?? 'string'
    )
  })
  return result
}

export default function Service(props: { service: string }) {
  const [value, setValue] = useState<RosJsMessage>({})
  const [lastResponse, setLastRespone] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      const type = await getServiceType(props.service)
      const requestDetails = await getServiceRequestDetails(type)
      setValue(
        typedefsToMessage(
          requestDetails.typedefs,
          `${type as string}Request`
        ) as RosJsMessage
      )
    })()
  }, [props.service])

  return (
    <div>
      <Editor msg={value} setMsg={setValue} />
      <button
        type="button"
        onClick={async () => {
          const service = await getService(props.service)
          service.callService(
            new ServiceRequest(value),
            (response) => setLastRespone(response),
            console.warn
          )
        }}
      >
        Call
      </button>
      <Message msg={lastResponse} />
    </div>
  )
}
