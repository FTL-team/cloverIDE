import * as ros from '../common/ros'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Choose } from '../components/choose'
import '../common/common.css'

// function Editor(props: { req: any, onChange: (newReq: any)=>void, pad?: string }){
//   let res: React.ReactElement[] = []
//   let msg = props.req
//   let pad = props.pad ? props.pad : ''
//   for (let key in msg) {
//     let child = <span>UNKNOWN TYPE</span>
//     if (typeof msg[key] == 'number') {
//       child = <input>{msg[key]}</input>
//     } else {
//       child = <Editor req={msg[key]} pad={pad + '    '} />
//     }
//     res.push(
//       <div key={key}>
//         {pad}
//         {/* <span className={style.key}>{key}: </span> */}
//         {child}
//       </div>
//     )
//   }
//   return <div className={style.root}>{res}</div>
// }

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

interface ResolvedRequestField {
  type: string
}

interface ResolvedRequestType {
  [type: string]: {
    [field: string]: ResolvedRequestField
  }
}

interface RequestTreeType {
  [a: string]: RequestTreeType | string | number | boolean
}

function buildResolver(req: RequestType) {
  let resolver: ResolvedRequestType = {}
  req.typedefs.forEach((e) => {
    let obj: { [field: string]: ResolvedRequestField } = {}
    for (let i = 0; i < e.fieldnames.length; i++) {
      obj[e.fieldnames[i]] = {
        type: e.fieldtypes[i],
      }
    }
    resolver[e.type] = obj
  })
  return resolver
}

function buildTree(resolver: ResolvedRequestType, type: string) {
  let res: RequestTreeType = {}
  for (let key in resolver[type]) {
    if (resolver.hasOwnProperty(resolver[type][key].type)) {
      res[key] = buildTree(resolver, resolver[type][key].type)
    } else {
      if (resolver[type][key].type == 'string') res[key] = ''
      else if (resolver[type][key].type == 'bool') res[key] = false
      else res[key] = 0
    }
  }
  return res
}

function Service(props: { service: string }) {
  let [requestType, setRequestType] = useState({})
  useEffect(() => {
    let stopped = false

    ;(async () => {
      let type = await ros.getServiceType(props.service)
      if (stopped) return
      let reqDetails = ((await ros.getServiceRequestDetails(
        type
      )) as unknown) as RequestType
      setRequestType(buildTree(buildResolver(reqDetails), type + 'Request'))
    })()

    return () => {
      stopped = true
    }
  }, [props.service])
  
  return <div>{JSON.stringify(requestType, undefined, 2)}</div>
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
