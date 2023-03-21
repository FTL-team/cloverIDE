const cv = require('./opencv.js')

let isInited = false
let initHandlers: (() => void)[] = []

cv['onRuntimeInitialized'] = () => {
  console.log('cvloaded')
  isInited = true
  initHandlers.forEach((e) => e())
  initHandlers = []
}

export function load() {
  if (isInited) return cv
  return new Promise<void>((resolve) => {
    initHandlers.push(() => resolve())
  })
}
