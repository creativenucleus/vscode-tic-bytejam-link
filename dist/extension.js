/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const promises_1 = __importDefault(__webpack_require__(2));
const path_1 = __importDefault(__webpack_require__(3));
// writeTicFile creates the showdown.dat file in TIC ByteBattle format
let isSaving = false; // Async guard
async function writeTicFile(editor, doRun, cursorX, cursorY) {
    if (isSaving) {
        return; // Abort if we're currently saving - #TODO: This might mean that the latest isn't saved!
    }
    isSaving = true;
    const dirName = (__webpack_require__(3).dirname)(editor.document.fileName);
    const filepath = dirName + path_1.default.sep + 'showdown.dat';
    const header = doRun ? '-- pos: 0,0\n' : `-- pos: ${cursorX + 1},${cursorY + 1}\n`;
    const code = editor.document.getText();
    try {
        await promises_1.default.writeFile(filepath, header + code);
    }
    catch (err) {
        if (err instanceof Error) {
            vscode.window.showErrorMessage(err.toString());
        }
    }
    isSaving = false;
}
function activate(context) {
    vscode.workspace.onDidChangeTextDocument(event => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            const offset = activeEditor.document.offsetAt(event.contentChanges[0].range.end);
            const pos = event.document.positionAt(offset);
            writeTicFile(activeEditor, false, pos.character, pos.line);
        }
    }, null, context.subscriptions);
    let disposeWatch = vscode.commands.registerCommand('tic-bytejam-link.ticWatch', () => {
        vscode.window.showInformationMessage('Extension "TIC ByteJam" is now active!');
    });
    let disposeRun = vscode.commands.registerCommand('tic-bytejam-link.ticRun', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            writeTicFile(activeEditor, true, 0, 0);
            vscode.window.showInformationMessage('TIC Code: RUN!');
        }
    });
    context.subscriptions.push(disposeWatch, disposeRun);
    console.log('Extension "TIC ByteJam" is now active!');
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map