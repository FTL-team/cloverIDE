import { allBuiltinTypes, stringToType } from '../ros/builtinTypes'
import React from 'react'
import style from './message.css'

interface RequestTypedef {
  type: string
  fieldnames: string[]
  fieldtypes: string[]
  fieldarraylen: number[]
  examples: any[]
  constname: any[]
  consvalues: any[]
}

export default function Editor(props: {
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
        if (allBuiltinTypes.has(fieldtype)) {
          child = (
            <input
              value={props.value[fieldname]?.real ?? ''}
              onChange={(event) => {
                const value = stringToType(event.target.value, fieldtype)

                props.value[fieldname] = {
                  _____PARAMETER__PLEASE__WOW_MAGIC: true,
                  real: event.target.value,
                  val: value
                }
                props.setValue(Object.assign({}, props.value))
              }}
              onBlur={(event) => {
                const value = stringToType(event.target.value, fieldtype)

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
