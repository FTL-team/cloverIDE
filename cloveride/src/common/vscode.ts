const vscode = window.acquireVsCodeApi()
const waitingResult: Map<number, (msg: any) => void> = new Map()

export async function call(name: string, ...args: any[]) {
  const id = Math.random() * 65535

  return new Promise((resolve, reject) => {
    waitingResult.set(id, (message) => {
      if (message.type === 'ok') {
        resolve(message.res)
      } else {
        reject(message.error)
      }
    })

    vscode.postMessage({
      type: 'call',
      id,
      name,
      args
    })
  })
}

window.addEventListener('message', (event) => {
  const message = event.data
  const handler = waitingResult.get(message.id)
  if (handler) {
    handler(message)
    waitingResult.delete(message.id)
  }
})

export async function quickPick(items: string[]): Promise<[string] | [null]> {
  return (await call('quickPick', items)) as [string] | [null]
}

export { vscode }
