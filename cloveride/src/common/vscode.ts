const vscode = window.acquireVsCodeApi()
console.log(vscode)

let waitingResult: Map<number, (msg: any) => void> = new Map()

export function call(name: string, ...args: any[]) {
  let id = Math.random() * 65535

  return new Promise((resolve, reject) => {
    waitingResult.set(id, (msg) => {
      if (msg.type == 'ok') {
        resolve(msg.res)
      } else {
        reject(msg.error)
      }
    })
    
    vscode.postMessage({
      type: 'call',
      id,
      name,
      args,
    })
  })
}

window.addEventListener('message', (event) => {
  const msg = event.data 
  let handler = waitingResult.get(msg.id) 
  if (handler) {
    handler(msg)
    waitingResult.delete(msg.id)
  }
})

export async function quickPick(items: string[]): Promise<[string] | [null]> {
  return (await call('quickPick', items)) as [string] | [null]
}

export { vscode }
