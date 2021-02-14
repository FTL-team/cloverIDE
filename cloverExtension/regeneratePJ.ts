import fs from 'fs'
import prettier from 'prettier'

import { tools } from './src/tools'

const ini = JSON.parse(fs.readFileSync('package.json').toString())

ini['contributes']['commands'] = tools.map((e) => ({
  command: `cloverextension.${e.viewType}`,
  title: 'Open ' + e.name.toLowerCase()
}))

const activationEvents = ['onView:cloverTools']

activationEvents.push(
  ...tools.map((e) => `onCommand:cloverextension.${e.viewType}`)
)

activationEvents.push(...tools.map((e) => `onWebviewPanel:${e.viewType}`))

ini['activationEvents'] = activationEvents

fs.writeFileSync(
  'package.json',
  prettier.format(JSON.stringify(ini), {
    parser: 'json'
  })
)
