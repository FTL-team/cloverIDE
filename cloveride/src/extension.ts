/* eslint max-lines: ["error", 256] */

import * as vscode from 'vscode'
import { UIPanel } from './uipanel'
import { TreeCloverToolsProvider } from './tree'
import { tools } from './tools'

export function activate(context: vscode.ExtensionContext) {
  vscode.window.createTreeView('cloverTools', {
    treeDataProvider: new TreeCloverToolsProvider(tools)
  })

  for (const tool of tools) {
    const disposable = vscode.commands.registerCommand(
      tool.command,
      () => new UIPanel(tool, context)
    )

    context.subscriptions.push(disposable)
  }
}

export function deactivate() {
  console.log('Deactivating')
}
