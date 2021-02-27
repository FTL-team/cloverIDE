/* eslint max-lines: ["error", 256] */

import * as vscode from 'vscode'
import { UIPanel, UIPanleSerializer } from './uipanel'
import { TreeCloverToolsProvider } from './tree'
import { tools } from './tools'

export function activate(context: vscode.ExtensionContext) {
  vscode.window.createTreeView('cloverTools', {
    treeDataProvider: new TreeCloverToolsProvider(tools)
  })

  for (const tool of tools) {
    const disposable = vscode.commands.registerCommand(
      'cloverextension.' + tool.viewType,
      () => new UIPanel(tool, context)
    )

    context.subscriptions.push(disposable)

    vscode.window.registerWebviewPanelSerializer(
      tool.viewType,
      new UIPanleSerializer(tool, context)
    )
  }
}

export function deactivate() {
  console.log('Deactivating')
}
