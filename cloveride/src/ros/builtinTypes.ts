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

export function stringToType(input: string, fieldtype: string) {
  if (builtinNumberTypes.includes(fieldtype)) {
    const number = Number.parseFloat(input) ?? 0
    if (Number.isNaN(number)) return 0
    return number
  }

  if (builtinStringTypes.includes(fieldtype)) {
    return input
  }

  if (builtinBooleanTypes.includes(fieldtype)) {
    const string = input.toLowerCase()
    return string.startsWith('t') || string[1] === 'y'
  }

  return ''
}
