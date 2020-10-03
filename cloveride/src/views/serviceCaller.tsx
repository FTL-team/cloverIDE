import * as ros from '../common/ros'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Choose } from '../components/choose'
import '../common/common.css'
import style from '../components/message.css'
import { Message } from '../components/message'

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

const builtinTypes = {
  numbers: [
    'byte',
    'float32',
    'float64',
    'int16',
    'int32',
    'int64',
    'int8',
    'uint16',
    'uint32',
    'uint64',
    'uint8'
  ],
  boolean: ['bool'],
  string: ['char', 'string']
}

const allBuiltins = new Set([
  ...builtinTypes.numbers,
  ...builtinTypes.string,
  ...builtinTypes.boolean
])

function Editor(props: {
  typedefs: RequestTypedef[]
  type: string
  pad?: string
  value: any
  setValue: (a: any) => void
}) {
  const typedef = props.typedefs.find((typedef) => typedef.type === props.type)
  const pad = props.pad ?? ''

  if (typedef === undefined) return <span>Type not found</span>

  return (
    <>
      {typedef.fieldnames.map((fieldname, i) => {
        const fieldtype = typedef?.fieldtypes[i] ?? ''
        let child = <span>strange things</span>
        if (allBuiltins.has(fieldtype)) {
          child = (
            <input
              value={props.value[fieldname]?.real ?? ''}
              onChange={(element) => {
                let value: number | string | boolean = ''
                console.log(fieldtype)
                if (builtinTypes.numbers.includes(fieldtype)) {
                  value = Number.parseFloat(element.target.value) ?? 0
                  if (Number.isNaN(value)) value = 0
                } else if (builtinTypes.string.includes(fieldtype)) {
                  value = element.target.value
                } else if (builtinTypes.boolean.includes(fieldtype)) {
                  value = element.target.value.toLowerCase()
                  value = value.startsWith('t') || value[1] === 'y'
                }

                props.value[fieldname] = {
                  _____PARAMETER__PLEASE__WOW_MAGIC: true,
                  real: element.target.value,
                  val: value
                }
                props.setValue(Object.assign({}, props.value))
              }}
              onBlur={(element) => {
                let value: number | string | boolean = ''
                console.log(fieldtype)
                if (builtinTypes.numbers.includes(fieldtype)) {
                  value = Number.parseFloat(element.target.value) ?? 0
                  if (Number.isNaN(value)) value = 0
                } else if (builtinTypes.string.includes(fieldtype)) {
                  value = element.target.value
                } else if (builtinTypes.boolean.includes(fieldtype)) {
                  value = element.target.value.toLowerCase()
                  value = value.startsWith('t') || value[1] === 'y'
                }

                props.value[fieldname] = {
                  _____PARAMETER__PLEASE__WOW_MAGIC: true,
                  real: value,
                  val: value
                }
                props.setValue(Object.assign({}, props.value))
              }}
            />
          )
        } else {
          child = (
            <Editor
              typedefs={props.typedefs}
              type={fieldtype}
              pad={pad + '    '}
              value={props.value[fieldname] ?? {}}
              setValue={(a) => {
                props.value[fieldname] = a
                props.setValue(Object.assign({}, props.value))
              }}
            />
          )
        }

        return (
          <div key={fieldname} className={style.root}>
            {pad}
            <span className={style.key}>{fieldname}: </span>
            {child}
          </div>
        )
      })}
    </>
  )
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

function Service(props: { service: string }) {
  const [type, setType] = useState<string | null>(null)
  const [typedefs, setTypedefs] = useState<RequestType | null>(null)
  const [value, setValue] = useState<any>({})
  const [lastResponse, setLastRespone] = useState<any>({})

  useEffect(() => {
    let stopped = false

    ;(async () => {
      const type = await ros.getServiceType(props.service)
      if (stopped) return
      const requestDetails = ((await ros.getServiceRequestDetails(
        type
      )) as unknown) as RequestType

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
          const service = await ros.getService(props.service)
          service.callService(
            new ros.roslib.ServiceRequest(turnIntoMessage(value)),
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

function App() {
  const [service, setService] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Service"
        value={service}
        getVariants={async () => {
          const services = await ros.getServices()
          return services
        }}
        onChange={(newService) => {
          setService(newService)
        }}
      />
      {service && <Service service={service} />}
    </>
  )
}

render(<App />, document.querySelector('#root'))
