import * as vscode from 'vscode'
import { Tool } from './tools'

export class TreeCloverToolsProvider
  implements vscode.TreeDataProvider<TreeCloverTool> {
  constructor(public tools: Tool[]) {}

  getTreeItem(element: TreeCloverTool): vscode.TreeItem {
    return element
  }

  getChildren(element?: TreeCloverTool): Thenable<TreeCloverTool[]> {
    if (element) {
      return Promise.resolve([])
    }

    return Promise.resolve(this.tools.map((cfg) => new TreeCloverTool(cfg)))
  }
}

export class TreeCloverTool extends vscode.TreeItem {
  constructor(public readonly cfg: Tool) {
    super(cfg.name, vscode.TreeItemCollapsibleState.None)
    this.tooltip = cfg.description
    this.command = {
      command: cfg.command,
      title: cfg.name
    }
  }
}
