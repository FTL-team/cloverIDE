import { useState } from 'react'
import { vscode } from './vscode'

export function useVsState<T>(defaultValue: T): [T, (newVal: T) => void] {
  const [state, setState] = useState<T>(vscode.getState() ?? defaultValue)
  return [state, (v: T)=>{
    vscode.setState(v)
    setState(v)
  }]
}