import * as vscode from 'vscode'

export interface UIPanelConfig {
  name: string
  viewType: string
}

export class UIPanel {
         private readonly cfg: UIPanelConfig
         // private readonly uiPath: string
         private readonly panel: vscode.WebviewPanel

         private functions: {
           [a: string]: (...any: any[]) => void | Promise<any>
         }

         constructor(
           cfg: UIPanelConfig,
           context: vscode.ExtensionContext,
           panel?: vscode.WebviewPanel
         ) {
           this.cfg = cfg

           this.panel =
             panel ??
             vscode.window.createWebviewPanel(
               cfg.viewType,
               cfg.name,
               vscode.ViewColumn.One,
               {
                 enableScripts: true,
                 retainContextWhenHidden: true
               }
             )

           // this.uiPath = 'vscode-resource:' + context.extensionPath + '/out/ui'
           this.panel.webview.html = this.getWebviewContent(context)

           this.functions = {}

           this.panel.webview.onDidReceiveMessage((message) => {
             if (message.type === 'call') {
               const id = message.id
               if (this.functions[message.name]) {
                 const maybePromise = this.functions[message.name](
                   ...message.args
                 )
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
             return vscode.window.showQuickPick(items) as Promise<
               string | undefined
             >
           })

           this.registerFunction('changeTitle', async (title: string) => {
             this.panel.title = title
           })
         }

         public registerFunction(
           name: string,
           func: (...args: any[]) => void | Promise<any>
         ): void {
           this.functions[name] = func
         }

         private getWebviewContent(context: vscode.ExtensionContext) {
           // const script = `${this.uiPath}/${this.cfg.viewType}.js`

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

        <script src="${this.panel.webview.asWebviewUri(
          vscode.Uri.joinPath(context.extensionUri, 'out', 'ui', 'commons.js')
        )}"></script>
        <script src="${this.panel.webview.asWebviewUri(
          vscode.Uri.joinPath(
            context.extensionUri,
            'out',
            'ui',
            this.cfg.viewType + '.js'
          )
        )}"></script>
    </body>
    </html>`
         }
       }

export class UIPanleSerializer implements vscode.WebviewPanelSerializer {
  constructor(
    private cfg: UIPanelConfig,
    private context: vscode.ExtensionContext
  ) {}
  async deserializeWebviewPanel(panel: vscode.WebviewPanel, state: any) {
    console.log(state)
    new UIPanel(this.cfg, this.context, panel)
  }
}
