const cv = require('./opencv.js')

let isInited = false
let initHandlers: (() => void)[] = []

cv['onRuntimeInitialized'] = () => {
  isInited = true
  initHandlers.forEach((e) => e())
  initHandlers = []
}

export function load() {
  console.log(cv)
  if (isInited) return cv
  return new Promise<void>((resolve) => {
    console.log('CV', cv)
    initHandlers.push(() => resolve())
  })
}
