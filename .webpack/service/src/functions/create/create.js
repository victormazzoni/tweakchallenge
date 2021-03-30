/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/create/create.ts":
/*!****************************************!*\
  !*** ./src/functions/create/create.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handler\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_services_NotesService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/NotesService */ \"./src/services/NotesService.ts\");\n\r\n\r\nconst handler = async (event) => {\r\n    const data = JSON.parse(event.body);\r\n    const notesService = new src_services_NotesService__WEBPACK_IMPORTED_MODULE_1__.default();\r\n    const note = await notesService.createNote(data);\r\n    return {\r\n        statusCode: 201,\r\n        body: JSON.stringify({\r\n            note: note\r\n        })\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2NyZWF0ZS9jcmVhdGUudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90d2Vha2NoYWxsZW5nZS8uL3NyYy9mdW5jdGlvbnMvY3JlYXRlL2NyZWF0ZS50cz9mNWEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xyXG5pbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSdcclxuaW1wb3J0IE5vdGVzU2VydmljZSBmcm9tICdzcmMvc2VydmljZXMvTm90ZXNTZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcclxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcclxuXHJcbiAgY29uc3Qgbm90ZXNTZXJ2aWNlID0gbmV3IE5vdGVzU2VydmljZSgpXHJcbiAgY29uc3Qgbm90ZSA9IGF3YWl0IG5vdGVzU2VydmljZS5jcmVhdGVOb3RlKGRhdGEpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhdHVzQ29kZTogMjAxLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBub3RlOiBub3RlXHJcbiAgICB9KVxyXG4gIH07XHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/create/create.ts\n");

/***/ }),

/***/ "./src/repositories/NotesRepository.ts":
/*!*********************************************!*\
  !*** ./src/repositories/NotesRepository.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotesRepository)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass NotesRepository {\r\n    constructor(docClient = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient(), table = process.env.TABLE_NAME) {\r\n        this.docClient = docClient;\r\n        this.table = table;\r\n    }\r\n    async getAllNotes() {\r\n        const result = await this.docClient.scan({\r\n            TableName: this.table\r\n        }).promise();\r\n        return result.Items;\r\n    }\r\n    async createNote(note) {\r\n        await this.docClient.put({\r\n            TableName: this.table,\r\n            Item: note\r\n        }).promise();\r\n        return note;\r\n    }\r\n    async updateNote(partialNote) {\r\n        const updated = await this.docClient.update({\r\n            TableName: this.table,\r\n            Key: { 'id': partialNote.id },\r\n            UpdateExpression: 'set #name = :name, done = :done',\r\n            ExpressionAttributeNames: {\r\n                '#userId': 'userId'\r\n            },\r\n            ExpressionAttributeValues: {\r\n                ':userId': partialNote.userId\r\n            },\r\n            ReturnValues: 'ALL_NEW'\r\n        }).promise();\r\n        return updated.Attributes;\r\n    }\r\n    async deleteNoteById(noteId) {\r\n        return this.docClient.delete({\r\n            TableName: this.table,\r\n            Key: { 'noteId': noteId }\r\n        }).promise();\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVwb3NpdG9yaWVzL05vdGVzUmVwb3NpdG9yeS50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3ZWFrY2hhbGxlbmdlLy4vc3JjL3JlcG9zaXRvcmllcy9Ob3Rlc1JlcG9zaXRvcnkudHM/MTZlZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgIGZyb20gJ2F3cy1zZGsnXHJcbmltcG9ydCB7IERvY3VtZW50Q2xpZW50IH0gZnJvbSAnYXdzLXNkay9jbGllbnRzL2R5bmFtb2RiJ1xyXG5cclxuaW1wb3J0IHsgTm90ZSB9IGZyb20gJy4uL21vZGVscy9Ob3RlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZXNSZXBvc2l0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRvY0NsaWVudDogRG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCksXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSkge1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsTm90ZXMoKTogUHJvbWlzZTxOb3RlW10+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZG9jQ2xpZW50LnNjYW4oe1xyXG4gICAgICBUYWJsZU5hbWU6IHRoaXMudGFibGVcclxuICAgIH0pLnByb21pc2UoKTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lkl0ZW1zIGFzIE5vdGVbXTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZU5vdGUobm90ZTogTm90ZSk6IFByb21pc2U8Tm90ZT4ge1xyXG4gICAgYXdhaXQgdGhpcy5kb2NDbGllbnQucHV0KHtcclxuICAgICAgVGFibGVOYW1lOiB0aGlzLnRhYmxlLFxyXG4gICAgICBJdGVtOiBub3RlXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIG5vdGU7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZU5vdGUocGFydGlhbE5vdGU6IFBhcnRpYWw8Tm90ZT4pOiBQcm9taXNlPE5vdGU+IHtcclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCB0aGlzLmRvY0NsaWVudC51cGRhdGUoe1xyXG4gICAgICBUYWJsZU5hbWU6IHRoaXMudGFibGUsXHJcbiAgICAgIEtleTogeyAnaWQnOiBwYXJ0aWFsTm90ZS5pZCB9LFxyXG4gICAgICBVcGRhdGVFeHByZXNzaW9uOiAnc2V0ICNuYW1lID0gOm5hbWUsIGRvbmUgPSA6ZG9uZScsXHJcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xyXG4gICAgICAgICcjdXNlcklkJzogJ3VzZXJJZCdcclxuICAgICAgfSxcclxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xyXG4gICAgICAgICc6dXNlcklkJzogcGFydGlhbE5vdGUudXNlcklkXHJcbiAgICAgIH0sXHJcbiAgICAgIFJldHVyblZhbHVlczogJ0FMTF9ORVcnXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcbiAgICBcclxuICAgIHJldHVybiB1cGRhdGVkLkF0dHJpYnV0ZXMgYXMgTm90ZTtcclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgZGVsZXRlTm90ZUJ5SWQobm90ZUlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmRvY0NsaWVudC5kZWxldGUoe1xyXG4gICAgICBUYWJsZU5hbWU6IHRoaXMudGFibGUsXHJcbiAgICAgIEtleTogeyAnbm90ZUlkJzogbm90ZUlkIH1cclxuICAgIH0pLnByb21pc2UoKTtcclxuICB9XHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/repositories/NotesRepository.ts\n");

/***/ }),

/***/ "./src/services/NotesService.ts":
/*!**************************************!*\
  !*** ./src/services/NotesService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotesService)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _repositories_NotesRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../repositories/NotesRepository */ \"./src/repositories/NotesRepository.ts\");\n\r\n\r\nclass NotesService {\r\n    constructor(notesRepository = new _repositories_NotesRepository__WEBPACK_IMPORTED_MODULE_1__.default()) {\r\n        this.notesRepository = notesRepository;\r\n    }\r\n    async getAllNotes() {\r\n        return this.notesRepository.getAllNotes();\r\n    }\r\n    async createNote(note) {\r\n        note.id = uuid__WEBPACK_IMPORTED_MODULE_0__.v4();\r\n        return await this.notesRepository.createNote(note);\r\n    }\r\n    async updateNote(partialNote) {\r\n        return await this.notesRepository.updateNote(partialNote);\r\n    }\r\n    async deleteNoteById(id) {\r\n        return await this.notesRepository.deleteNoteById(id);\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvTm90ZXNTZXJ2aWNlLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHdlYWtjaGFsbGVuZ2UvLi9zcmMvc2VydmljZXMvTm90ZXNTZXJ2aWNlLnRzP2ZkYTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJ1xyXG5cclxuaW1wb3J0IE5vdGVzUmVwb3NpdG9yeSBmcm9tICcuLi9yZXBvc2l0b3JpZXMvTm90ZXNSZXBvc2l0b3J5J1xyXG5pbXBvcnQgeyBOb3RlIH0gZnJvbSAnLi4vbW9kZWxzL05vdGUnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZXNTZXJ2aWNlIHtcclxuXHJcbiAgbm90ZXNSZXBvc2l0b3J5OiBOb3Rlc1JlcG9zaXRvcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5vdGVzUmVwb3NpdG9yeTogTm90ZXNSZXBvc2l0b3J5ID0gbmV3IE5vdGVzUmVwb3NpdG9yeSgpKSB7XHJcbiAgICB0aGlzLm5vdGVzUmVwb3NpdG9yeSA9IG5vdGVzUmVwb3NpdG9yeVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsTm90ZXMoKTogUHJvbWlzZTxOb3RlW10+IHtcclxuICAgIHJldHVybiB0aGlzLm5vdGVzUmVwb3NpdG9yeS5nZXRBbGxOb3RlcygpXHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVOb3RlKG5vdGU6IE5vdGUpOiBQcm9taXNlPE5vdGU+IHtcclxuICAgIG5vdGUuaWQgPSB1dWlkLnY0KCk7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5ub3Rlc1JlcG9zaXRvcnkuY3JlYXRlTm90ZShub3RlKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlTm90ZShwYXJ0aWFsTm90ZTogUGFydGlhbDxOb3RlPikge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubm90ZXNSZXBvc2l0b3J5LnVwZGF0ZU5vdGUocGFydGlhbE5vdGUpXHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGVOb3RlQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5ub3Rlc1JlcG9zaXRvcnkuZGVsZXRlTm90ZUJ5SWQoaWQpXHJcbiAgfVxyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFFQTtBQUlBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/services/NotesService.ts\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/create/create.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;