module.exports = /******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = './src/extension.ts')
  )
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './src/extension.ts':
      /*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        'use strict'
        eval(
          '\n/* eslint max-lines: ["error", 256] */\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, "default", { enumerable: true, value: v });\n}) : function(o, v) {\n    o["default"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.deactivate = exports.activate = void 0;\nconst vscode = __importStar(__webpack_require__(/*! vscode */ "vscode"));\nconst uipanel_1 = __webpack_require__(/*! ./uipanel */ "./src/uipanel.ts");\nconst tree_1 = __webpack_require__(/*! ./tree */ "./src/tree.ts");\nconst tools_1 = __webpack_require__(/*! ./tools */ "./src/tools.ts");\nfunction activate(context) {\n    vscode.window.createTreeView(\'cloverTools\', {\n        treeDataProvider: new tree_1.TreeCloverToolsProvider(tools_1.tools)\n    });\n    for (const tool of tools_1.tools) {\n        const disposable = vscode.commands.registerCommand(tool.command, () => new uipanel_1.UIPanel(tool, context));\n        context.subscriptions.push(disposable);\n    }\n}\nexports.activate = activate;\nfunction deactivate() {\n    console.log(\'Deactivating\');\n}\nexports.deactivate = deactivate;\n\n\n//# sourceURL=webpack:///./src/extension.ts?'
        )

        /***/
      },

    /***/ './src/tools.ts':
      /*!**********************!*\
  !*** ./src/tools.ts ***!
  \**********************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        'use strict'
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.tools = void 0;\nexports.tools = [\n    {\n        name: 'Topic visualization',\n        script: 'topicVisView.js',\n        description: 'Special tool to visualize in real-time any ros topic',\n        viewType: 'topicVis',\n        command: 'cloverextension.topicVis'\n    },\n    {\n        name: 'Image topic visualization',\n        script: 'imageVisView.js',\n        description: 'Special tool to view image in real-time any ros topic',\n        viewType: 'imageVis',\n        command: 'cloverextension.imageVis'\n    },\n    {\n        name: 'Service caller',\n        script: 'serviceCallerView.js',\n        description: 'Special tool to call ros services',\n        viewType: 'serviceCaller',\n        command: 'cloverextension.serviceCaller'\n    }\n];\n\n\n//# sourceURL=webpack:///./src/tools.ts?"
        )

        /***/
      },

    /***/ './src/tree.ts':
      /*!*********************!*\
  !*** ./src/tree.ts ***!
  \*********************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        'use strict'
        eval(
          '\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, "default", { enumerable: true, value: v });\n}) : function(o, v) {\n    o["default"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.TreeCloverTool = exports.TreeCloverToolsProvider = void 0;\nconst vscode = __importStar(__webpack_require__(/*! vscode */ "vscode"));\nclass TreeCloverToolsProvider {\n    constructor(tools) {\n        this.tools = tools;\n    }\n    getTreeItem(element) {\n        return element;\n    }\n    getChildren(element) {\n        if (element) {\n            return Promise.resolve([]);\n        }\n        return Promise.resolve(this.tools.map((cfg) => new TreeCloverTool(cfg)));\n    }\n}\nexports.TreeCloverToolsProvider = TreeCloverToolsProvider;\nclass TreeCloverTool extends vscode.TreeItem {\n    constructor(cfg) {\n        super(cfg.name, vscode.TreeItemCollapsibleState.None);\n        this.cfg = cfg;\n        this.tooltip = cfg.description;\n        this.command = {\n            command: cfg.command,\n            title: cfg.name\n        };\n    }\n}\nexports.TreeCloverTool = TreeCloverTool;\n\n\n//# sourceURL=webpack:///./src/tree.ts?'
        )

        /***/
      },

    /***/ './src/uipanel.ts':
      /*!************************!*\
  !*** ./src/uipanel.ts ***!
  \************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        'use strict'
        eval(
          '\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, "default", { enumerable: true, value: v });\n}) : function(o, v) {\n    o["default"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.UIPanel = void 0;\nconst vscode = __importStar(__webpack_require__(/*! vscode */ "vscode"));\nclass UIPanel {\n    constructor(cfg, context) {\n        this.cfg = cfg;\n        this.uiPath = \'vscode-resource:\' + context.extensionPath + \'/out/ui\';\n        this.panel = vscode.window.createWebviewPanel(cfg.viewType, cfg.name, vscode.ViewColumn.One, {\n            enableScripts: true,\n            retainContextWhenHidden: true\n        });\n        this.panel.webview.html = this.getWebviewContent();\n        this.functions = {};\n        this.panel.webview.onDidReceiveMessage((message) => {\n            if (message.type === \'call\') {\n                const id = message.id;\n                if (this.functions[message.name]) {\n                    const maybePromise = this.functions[message.name](...message.args);\n                    if (maybePromise && maybePromise instanceof Promise) {\n                        maybePromise.then((...result) => {\n                            this.panel.webview\n                                .postMessage({\n                                id,\n                                type: \'ok\',\n                                res: result\n                            })\n                                .then(() => 0, (error) => console.warn(error));\n                        }, (error) => console.warn(error));\n                    }\n                    else {\n                        this.panel.webview\n                            .postMessage({\n                            id,\n                            type: \'ok\'\n                        })\n                            .then(() => 0, (error) => console.warn(error));\n                    }\n                }\n                else {\n                    this.panel.webview\n                        .postMessage({\n                        id,\n                        type: \'error\',\n                        error: \'Command not found\'\n                    })\n                        .then(() => 0, (error) => console.warn(error));\n                }\n            }\n        });\n        this.registerFunction(\'quickPick\', (items) => __awaiter(this, void 0, void 0, function* () {\n            return vscode.window.showQuickPick(items);\n        }));\n    }\n    registerFunction(name, func) {\n        this.functions[name] = func;\n    }\n    getWebviewContent() {\n        const script = this.uiPath + \'/\' + this.cfg.script;\n        return `<!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>Config View</title>\n\n        <script>\n          window.acquireVsCodeApi = acquireVsCodeApi;\n          window.initialData = {};\n        </script>\n    </head>\n    <body>\n        <div id="root"></div>\n\n        <script src="${script}"></script>\n    </body>\n    </html>`;\n    }\n}\nexports.UIPanel = UIPanel;\n\n\n//# sourceURL=webpack:///./src/uipanel.ts?'
        )

        /***/
      },

    /***/ vscode:
      /*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        eval(
          'module.exports = require("vscode");\n\n//# sourceURL=webpack:///external_%22vscode%22?'
        )

        /***/
      }

    /******/
  }
)
