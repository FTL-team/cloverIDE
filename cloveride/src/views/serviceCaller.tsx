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

let builtinTypes = {
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
    'uint8',
  ],
  boolean: ['bool'],
  string: ['char', 'string'],
}

let allBuiltins = [
  ...builtinTypes.numbers,
  ...builtinTypes.string,
  ...builtinTypes.boolean,
]

function Editor(props: {
  typedefs: RequestTypedef[]
  type: string
  pad?: string
  value: any
  setValue: (a: any) => void
}) {
  let typedef = props.typedefs.find((e) => e.type == props.type)
  let pad = props.pad ?? ''

  if (typedef === undefined) return <span>Type not found</span>

  return (
    <>
      {typedef.fieldnames.map((fieldname, i) => {
        let fieldtype = typedef?.fieldtypes[i] ?? ''
        let child = <span>strange things</span>
        if (allBuiltins.includes(fieldtype)) {
          child = (
            <input
              value={props.value[fieldname]?.real ?? ''}
              onChange={(e) => {
                let val: number | string | boolean = ''
                console.log(fieldtype)
                if (builtinTypes.numbers.includes(fieldtype)) {
                  val = parseFloat(e.target.value) ?? 0
                  if(isNaN(val)) val = 0
                } else if (builtinTypes.string.includes(fieldtype)) {
                  val = e.target.value
                } else if (builtinTypes.boolean.includes(fieldtype)) {
                  val = e.target.value.toLowerCase()
                  val = val[0] == 't' || val[1] == 'y'
                }

                props.value[fieldname] = {
                  _____PARAMETER__PLEASE__WOW_MAGIC: true,
                  real: e.target.value,
                  val,
                }
                props.setValue(Object.assign({}, props.value))
              }}
              onBlur={(e) => {
                let val: number | string | boolean = ''
                console.log(fieldtype)
                if (builtinTypes.numbers.includes(fieldtype)) {
                  val = parseFloat(e.target.value) ?? 0
                  if (isNaN(val)) val = 0
                } else if (builtinTypes.string.includes(fieldtype)) {
                  val = e.target.value
                } else if (builtinTypes.boolean.includes(fieldtype)) {
                  val = e.target.value.toLowerCase()
                  val = val[0] == 't' || val[1] == 'y'
                }

                props.value[fieldname] = {
                  _____PARAMETER__PLEASE__WOW_MAGIC: true,
                  real: val,
                  val,
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
          <div className={style.root}>
            {pad}
            <span className={style.key}>{fieldname}: </span>
            {child}
          </div>
        )
      })}
    </>
  )
}

function turnIntoMsg(o: Object) {
  let k: any = {}
  Object.entries(o).forEach(([key, value]: [string, Object]) => {
    let isP = value.hasOwnProperty('_____PARAMETER__PLEASE__WOW_MAGIC')
    k[key] = isP ? (value as { val: any }).val : turnIntoMsg(value)
  })
  return k
}

function Service(props: { service: string }) {
  let [type, setType] = useState<string | null>(null)
  let [typedefs, setTypedefs] = useState<RequestType | null>(null)
  let [val, setValue] = useState<any>({})
  let [lastResponse, setLastRespone] = useState<any>({})

  useEffect(() => {
    let stopped = false

    ;(async () => {
      let type = await ros.getServiceType(props.service)
      if (stopped) return
      let reqDetails = ((await ros.getServiceRequestDetails(
        type
      )) as unknown) as RequestType

      setType(type)
      setTypedefs(reqDetails)
    })()

    return () => {
      stopped = true
    }
  }, [props.service])

  if (typedefs == null) return <></>
  if (type == null) return <></>

  return (
    <div>
      <Editor
        typedefs={typedefs.typedefs}
        type={type + 'Request'}
        value={val}
        setValue={setValue}
      />
      <button
        onClick={async () => {
          let service = await ros.getService(props.service)
          service.callService(
            new ros.roslib.ServiceRequest(turnIntoMsg(val)),
            (res) => setLastRespone(res), console.warn
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
  let [service, setService] = useState<null | string>(null)

  return (
    <>
      <Choose
        text="Service"
        value={service}
        getVariants={async () => {
          let services = await ros.getServices()
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

render(<App />, document.getElementById('root'))
