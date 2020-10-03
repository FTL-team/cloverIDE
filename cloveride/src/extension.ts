import * as vscode from 'vscode'

interface UIPanelConfig {
  name: string
  type: string
  script: string
}

class UIPanel {
  private readonly cfg: UIPanelConfig
  private readonly uiPath: vscode.Uri
  private readonly panel: vscode.WebviewPanel

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
        retainContextWhenHidden: true
      }
    )

    this.panel.webview.html = this.getWebviewContent()

    this.functions = {}

    this.panel.webview.onDidReceiveMessage((message) => {
      if (message.type === 'call') {
        const id = message.id
        if (this.functions[message.name]) {
          const maybePromise = this.functions[message.name](...message.args)
          if (maybePromise && maybePromise instanceof Promise) {
            maybePromise.then(
              (...result) => {
                this.panel.webview
                  .postMessage({
                    id,
                    type: 'ok',
                    res: result
                  })
                  .then(
                    () => 0,
                    (error) => console.warn(error)
                  )
              },
              (error) => console.warn(error)
            )
          } else {
            this.panel.webview
              .postMessage({
                id,
                type: 'ok'
              })
              .then(
                () => 0,
                (error) => console.warn(error)
              )
          }
        } else {
          this.panel.webview
            .postMessage({
              id,
              type: 'error',
              error: 'Command not found'
            })
            .then(
              () => 0,
              (error) => console.warn(error)
            )
        }
      }
    })

    this.registerFunction('quickPick', async (items: string[]) => {
      return vscode.window.showQuickPick(items) as Promise<string | undefined>
    })
  }

  public registerFunction(
    name: string,
    func: (...args: any[]) => void | Promise<any>
  ): void {
    this.functions[name] = func
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

        <script src="${scriptWebUri.toString()}"></script>
    </body>
    </html>`
  }
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'cloveride.topicVis',
    () => {
      const panel = new UIPanel(
        {
          name: 'Topic visualization',
          script: 'topicVisView.js',
          type: 'topicVis'
        },
        context
      )
      console.log('Panel created', panel)
    }
  )

  context.subscriptions.push(disposable)

  const disposable2 = vscode.commands.registerCommand(
    'cloveride.imageVis',
    () => {
      const panel = new UIPanel(
        {
          name: 'Image topic visualization',
          script: 'imageVisView.js',
          type: 'imageVis'
        },
        context
      )
      console.log('Panel created', panel)
    }
  )
  context.subscriptions.push(disposable2)

  const disposable3 = vscode.commands.registerCommand(
    'cloveride.serviceCaller',
    () => {
      const panel = new UIPanel(
        {
          name: 'Service caller',
          script: 'serviceCallerView.js',
          type: 'serviceCaller'
        },
        context
      )
      console.log('Panel created', panel)
    }
  )
  context.subscriptions.push(disposable3)
}

export function deactivate() {
  console.log('Deactivating')
}
