import * as vscode from 'vscode'

interface UIPanelConfig {
  name: string
  type: string
  script: string
}

class UIPanel {
  private cfg: UIPanelConfig
  private uiPath: vscode.Uri
  private panel: vscode.WebviewPanel

  private functions: { [a: string]: (...any: any[]) => void | Promise<any> }

  constructor(cfg: UIPanelConfig, context: vscode.ExtensionContext) {
    this.cfg = cfg
    this.uiPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'ui')
    this.panel = vscode.window.createWebviewPanel(
      cfg.type,
      cfg.name,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [this.uiPath],
        retainContextWhenHidden: true,
      }
    )

    this.panel.webview.html = this.getWebviewContent()

    this.functions = {}

    this.panel.webview.onDidReceiveMessage((msg) => {
      if (msg.type == 'call') {
        let id = msg.id
        if (this.functions[msg.name]) {
          let maybePromise = this.functions[msg.name](...msg.args)
          if (maybePromise && maybePromise instanceof Promise) {
            maybePromise.then((...res) => {
              this.panel.webview.postMessage({
                id,
                type: 'ok',
                res,
              })
            })
          } else {
            this.panel.webview.postMessage({
              id,
              type: 'ok',
            })
          }
        } else {
          this.panel.webview.postMessage({
            id,
            type: 'error',
            error: 'Command not found',
          })
        }
      }
    })

    this.registerFunction('quickPick', (items: string[]) => {
      return vscode.window.showQuickPick(items) as Promise<string | undefined>
    })
  }

  private getWebviewContent() {
    const scriptUri = vscode.Uri.joinPath(this.uiPath, this.cfg.script)
    const scriptWebUri = this.panel.webview.asWebviewUri(scriptUri)

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Config View</title>

        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.initialData = {};
        </script>
    </head>
    <body>
        <div id="root"></div>

        <script src="${scriptWebUri}"></script>
    </body>
    </html>`
  }

  public registerFunction(
    name: string,
    func: (...args: any[]) => void | Promise<any>
  ): void {
    this.functions[name] = func
  }
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('cloveride.topicVis', () => {
    let panel = new UIPanel(
      {
        name: 'Topic visualization',
        script: 'topicVisView.js',
        type: 'topicVis',
      },
      context
    )
    console.log('Panel created', panel)
  })

  context.subscriptions.push(disposable)

  let disposable2 = vscode.commands.registerCommand(
    'cloveride.imageVis',
    () => {
      let panel = new UIPanel(
        {
          name: 'Image topic visualization',
          script: 'imageVisView.js',
          type: 'imageVis',
        },
        context
      )
      console.log('Panel created', panel)
    }
  )
  context.subscriptions.push(disposable2)

  let disposable3 = vscode.commands.registerCommand(
    'cloveride.serviceCaller',
    () => {
      let panel = new UIPanel(
        {
          name: 'Service caller',
          script: 'serviceCallerView.js',
          type: 'serviceCaller',
        },
        context
      )
      console.log('Panel created', panel)
    }
  )
  context.subscriptions.push(disposable3)
}

export function deactivate() {}
