export const builtinNumberTypes = [
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
]

export const builtinBooleanTypes = ['bool']
export const builtinStringTypes = ['char', 'string']

export const allBuiltinTypes = new Set([
  ...builtinBooleanTypes,
  ...builtinNumberTypes,
  ...builtinStringTypes
])

export type RosJsType = string | boolean | number
export interface RosJsMessage {
  [key: string]: RosJsType | RosJsMessage
}
