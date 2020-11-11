import React, { useState } from 'react'

function stringToValueType(
  input: string,
  valueType: 'number' | 'string' | 'boolean' | string
) {
  if (valueType === 'number') {
    const number = Number.parseFloat(input) ?? 0
    if (Number.isNaN(number)) return 0
    return number
  }

  if (valueType === 'string') {
    return input
  }

  if (valueType === 'boolean') {
    const string = input.toLowerCase()
    return string.startsWith('t') || string[1] === 'y'
  }

  return ''
}

export default function MessageInputField({
  value,
  setValue
}: {
  value: number | string | boolean
  setValue: (value: number | string | boolean) => void
}) {
  const [focused, setFocused] = useState(false)
  const [inp, setInp] = useState('')

  if (!focused && value.toString() !== inp) setInp(value.toString())

  return (
    <input
      value={inp}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(element) => {
        setInp(element.target.value)
        setValue(stringToValueType(element.target.value, typeof value))
      }}
    />
  )
}
