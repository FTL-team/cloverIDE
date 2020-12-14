import { useState, useMemo } from 'react'
import {
  ServiceRequest,
  getService,
  getServiceRequestDetails
} from '../service'
import {
  builtinBooleanTypes,
  builtinNumberTypes,
  builtinStringTypes,
  RosJsMessage
} from '../builtinTypes'

import usePromise from 'react-promise-suspense'
import { RosService } from '../core'

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

export function useService(serviceName: string) {
  const service = usePromise(getService, [serviceName]) as RosService
  const serviceType = service.serviceType
  const requestDetailsRaw = usePromise(getServiceRequestDetails, [serviceType])
  const requestDetails = useMemo(
    () =>
      typedefsToMessage(
        requestDetailsRaw.typedefs,
        `${serviceType as string}Request`
      ) as RosJsMessage,
    [requestDetailsRaw, serviceType]
  )

  const [lastResponse, setLastRespone] = useState<any>({})
  const [loading, setLoading] = useState(false)

  return {
    call(request: Record<string, unknown>) {
      service.callService(
        new ServiceRequest(request),
        (response) => {
          setLastRespone(response)
          setLoading(false)
        },
        console.warn
      )
    },
    requestDetails,
    result: lastResponse,
    loading
  }
}
