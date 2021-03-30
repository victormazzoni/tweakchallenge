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

/***/ "./src/functions/delete/delete.ts":
/*!****************************************!*\
  !*** ./src/functions/delete/delete.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handler\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_services_NotesService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/NotesService */ \"./src/services/NotesService.ts\");\n\r\n\r\nconst handler = async (event) => {\r\n    const notesService = new src_services_NotesService__WEBPACK_IMPORTED_MODULE_1__.default();\r\n    await notesService.deleteNoteById(event.pathParameters.id, event.requestContext.identity.cognitoIdentityId);\r\n    return {\r\n        statusCode: 200,\r\n        body: ''\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2RlbGV0ZS9kZWxldGUudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90d2Vha2NoYWxsZW5nZS8uL3NyYy9mdW5jdGlvbnMvZGVsZXRlL2RlbGV0ZS50cz83ODlkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xyXG5pbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSdcclxuaW1wb3J0IE5vdGVzU2VydmljZSBmcm9tICdzcmMvc2VydmljZXMvTm90ZXNTZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcclxuICBjb25zdCBub3Rlc1NlcnZpY2UgPSBuZXcgTm90ZXNTZXJ2aWNlKClcclxuICBhd2FpdCBub3Rlc1NlcnZpY2UuZGVsZXRlTm90ZUJ5SWQoZXZlbnQucGF0aFBhcmFtZXRlcnMuaWQsIGV2ZW50LnJlcXVlc3RDb250ZXh0LmlkZW50aXR5LmNvZ25pdG9JZGVudGl0eUlkKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgIGJvZHk6ICcnXHJcbiAgfTtcclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/delete/delete.ts\n");

/***/ }),

/***/ "./src/repositories/NotesRepository.ts":
/*!*********************************************!*\
  !*** ./src/repositories/NotesRepository.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotesRepository)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass NotesRepository {\r\n    constructor(docClient = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient(), table = process.env.TABLE_NAME) {\r\n        this.docClient = docClient;\r\n        this.table = table;\r\n    }\r\n    async getAllNotes(userId) {\r\n        const result = await this.docClient.scan({\r\n            TableName: this.table,\r\n            FilterExpression: \"userId = :userId\",\r\n            ExpressionAttributeValues: {\r\n                \":userId\": userId,\r\n            },\r\n        }).promise();\r\n        return result.Items;\r\n    }\r\n    async getNoteById(id, userId) {\r\n        return this.docClient.get({\r\n            TableName: this.table,\r\n            Key: {\r\n                'id': id,\r\n                'userId': userId\r\n            }\r\n        }).promise();\r\n    }\r\n    async createNote(note) {\r\n        await this.docClient.put({\r\n            TableName: this.table,\r\n            Item: note\r\n        }).promise();\r\n        return note;\r\n    }\r\n    async updateNote(partialNote, userId) {\r\n        const updated = await this.docClient.update({\r\n            TableName: this.table,\r\n            Key: {\r\n                'id': partialNote.id,\r\n                'userId': userId\r\n            },\r\n            UpdateExpression: 'set userId = :userId, content = :content, attachment = :attachment',\r\n            ExpressionAttributeValues: {\r\n                ':userId': partialNote.userId,\r\n                ':content': partialNote.content,\r\n                ':attachment': partialNote.attachment\r\n            },\r\n            ReturnValues: 'ALL_NEW'\r\n        }).promise();\r\n        return updated.Attributes;\r\n    }\r\n    async deleteNoteById(id, userId) {\r\n        return this.docClient.delete({\r\n            TableName: this.table,\r\n            Key: {\r\n                'id': id,\r\n                'userId': userId\r\n            }\r\n        }).promise();\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVwb3NpdG9yaWVzL05vdGVzUmVwb3NpdG9yeS50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3ZWFrY2hhbGxlbmdlLy4vc3JjL3JlcG9zaXRvcmllcy9Ob3Rlc1JlcG9zaXRvcnkudHM/MTZlZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgIGZyb20gJ2F3cy1zZGsnXHJcbmltcG9ydCB7IERvY3VtZW50Q2xpZW50IH0gZnJvbSAnYXdzLXNkay9jbGllbnRzL2R5bmFtb2RiJ1xyXG5pbXBvcnQgeyBOb3RlIH0gZnJvbSAnLi4vbW9kZWxzL05vdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3Rlc1JlcG9zaXRvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZG9jQ2xpZW50OiBEb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGFibGUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FKSB7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGxOb3Rlcyh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8Tm90ZVtdPiB7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kb2NDbGllbnQuc2Nhbih7XHJcbiAgICAgIFRhYmxlTmFtZTogdGhpcy50YWJsZSxcclxuICAgICAgLy8gJ0tleUNvbmRpdGlvbkV4cHJlc3Npb24nIGRlZmluZXMgdGhlIGNvbmRpdGlvbiBmb3IgdGhlIHF1ZXJ5XHJcbiAgICAgIC8vIC0gJ3VzZXJJZCA9IDp1c2VySWQnOiBvbmx5IHJldHVybiBpdGVtcyB3aXRoIG1hdGNoaW5nICd1c2VySWQnXHJcbiAgICAgIC8vICAgcGFydGl0aW9uIGtleVxyXG4gICAgICBGaWx0ZXJFeHByZXNzaW9uOiBcInVzZXJJZCA9IDp1c2VySWRcIixcclxuICAgICAgLy8gJ0V4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMnIGRlZmluZXMgdGhlIHZhbHVlIGluIHRoZSBjb25kaXRpb25cclxuICAgICAgLy8gLSAnOnVzZXJJZCc6IGRlZmluZXMgJ3VzZXJJZCcgdG8gYmUgdGhlIGlkIG9mIHRoZSBhdXRob3JcclxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xyXG4gICAgICAgIFwiOnVzZXJJZFwiOiB1c2VySWQsXHJcbiAgICAgIH0sXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5JdGVtcyBhcyBOb3RlW107XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXROb3RlQnlJZChpZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8b2JqZWN0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb2NDbGllbnQuZ2V0KHtcclxuICAgICAgVGFibGVOYW1lOiB0aGlzLnRhYmxlLFxyXG4gICAgICBLZXk6IHtcclxuICAgICAgICAnaWQnOiBpZCxcclxuICAgICAgICAndXNlcklkJzogdXNlcklkXHJcbiAgICAgIH1cclxuICAgIH0pLnByb21pc2UoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZU5vdGUobm90ZTogTm90ZSk6IFByb21pc2U8Tm90ZT4ge1xyXG4gICAgYXdhaXQgdGhpcy5kb2NDbGllbnQucHV0KHtcclxuICAgICAgVGFibGVOYW1lOiB0aGlzLnRhYmxlLFxyXG4gICAgICBJdGVtOiBub3RlXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIG5vdGU7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZU5vdGUocGFydGlhbE5vdGU6IFBhcnRpYWw8Tm90ZT4sIHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTxOb3RlPiB7XHJcbiAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgdGhpcy5kb2NDbGllbnQudXBkYXRlKHtcclxuICAgICAgVGFibGVOYW1lOiB0aGlzLnRhYmxlLFxyXG4gICAgICBLZXk6IHtcclxuICAgICAgICAnaWQnOiBwYXJ0aWFsTm90ZS5pZCxcclxuICAgICAgICAndXNlcklkJzogdXNlcklkXHJcbiAgICAgIH0sXHJcbiAgICAgIFVwZGF0ZUV4cHJlc3Npb246ICdzZXQgdXNlcklkID0gOnVzZXJJZCwgY29udGVudCA9IDpjb250ZW50LCBhdHRhY2htZW50ID0gOmF0dGFjaG1lbnQnLFxyXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XHJcbiAgICAgICAgJzp1c2VySWQnOiBwYXJ0aWFsTm90ZS51c2VySWQsXHJcbiAgICAgICAgJzpjb250ZW50JzogcGFydGlhbE5vdGUuY29udGVudCxcclxuICAgICAgICAnOmF0dGFjaG1lbnQnOiBwYXJ0aWFsTm90ZS5hdHRhY2htZW50XHJcbiAgICAgIH0sXHJcbiAgICAgIFJldHVyblZhbHVlczogJ0FMTF9ORVcnXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcbiAgICBcclxuICAgIHJldHVybiB1cGRhdGVkLkF0dHJpYnV0ZXMgYXMgTm90ZTtcclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgZGVsZXRlTm90ZUJ5SWQoaWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmRvY0NsaWVudC5kZWxldGUoe1xyXG4gICAgICBUYWJsZU5hbWU6IHRoaXMudGFibGUsXHJcbiAgICAgIEtleToge1xyXG4gICAgICAgICdpZCc6IGlkLFxyXG4gICAgICAgICd1c2VySWQnOiB1c2VySWRcclxuICAgICAgfVxyXG4gICAgfSkucHJvbWlzZSgpO1xyXG4gIH1cclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/repositories/NotesRepository.ts\n");

/***/ }),

/***/ "./src/services/NotesService.ts":
/*!**************************************!*\
  !*** ./src/services/NotesService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotesService)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _repositories_NotesRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../repositories/NotesRepository */ \"./src/repositories/NotesRepository.ts\");\n\r\n\r\nclass NotesService {\r\n    constructor(notesRepository = new _repositories_NotesRepository__WEBPACK_IMPORTED_MODULE_1__.default()) {\r\n        this.notesRepository = notesRepository;\r\n    }\r\n    async getAllNotes(userId) {\r\n        return this.notesRepository.getAllNotes(userId);\r\n    }\r\n    async getNoteById(id, userId) {\r\n        return this.notesRepository.getNoteById(id, userId);\r\n    }\r\n    async createNote(note) {\r\n        note.id = uuid__WEBPACK_IMPORTED_MODULE_0__.v4();\r\n        return await this.notesRepository.createNote(note);\r\n    }\r\n    async updateNote(partialNote, userId) {\r\n        return await this.notesRepository.updateNote(partialNote, userId);\r\n    }\r\n    async deleteNoteById(id, userId) {\r\n        return await this.notesRepository.deleteNoteById(id, userId);\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvTm90ZXNTZXJ2aWNlLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHdlYWtjaGFsbGVuZ2UvLi9zcmMvc2VydmljZXMvTm90ZXNTZXJ2aWNlLnRzP2ZkYTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJ1xyXG5cclxuaW1wb3J0IE5vdGVzUmVwb3NpdG9yeSBmcm9tICcuLi9yZXBvc2l0b3JpZXMvTm90ZXNSZXBvc2l0b3J5J1xyXG5pbXBvcnQgeyBOb3RlIH0gZnJvbSAnLi4vbW9kZWxzL05vdGUnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZXNTZXJ2aWNlIHtcclxuXHJcbiAgbm90ZXNSZXBvc2l0b3J5OiBOb3Rlc1JlcG9zaXRvcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5vdGVzUmVwb3NpdG9yeTogTm90ZXNSZXBvc2l0b3J5ID0gbmV3IE5vdGVzUmVwb3NpdG9yeSgpKSB7XHJcbiAgICB0aGlzLm5vdGVzUmVwb3NpdG9yeSA9IG5vdGVzUmVwb3NpdG9yeVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsTm90ZXModXNlcklkOiBzdHJpbmcpOiBQcm9taXNlPE5vdGVbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm90ZXNSZXBvc2l0b3J5LmdldEFsbE5vdGVzKHVzZXJJZClcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldE5vdGVCeUlkKGlkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTxvYmplY3Q+IHtcclxuICAgIHJldHVybiB0aGlzLm5vdGVzUmVwb3NpdG9yeS5nZXROb3RlQnlJZChpZCwgdXNlcklkKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgY3JlYXRlTm90ZShub3RlOiBOb3RlKTogUHJvbWlzZTxOb3RlPiB7XHJcbiAgICBub3RlLmlkID0gdXVpZC52NCgpO1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubm90ZXNSZXBvc2l0b3J5LmNyZWF0ZU5vdGUobm90ZSlcclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZU5vdGUocGFydGlhbE5vdGU6IFBhcnRpYWw8Tm90ZT4sIHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5ub3Rlc1JlcG9zaXRvcnkudXBkYXRlTm90ZShwYXJ0aWFsTm90ZSwgdXNlcklkKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlTm90ZUJ5SWQoaWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLm5vdGVzUmVwb3NpdG9yeS5kZWxldGVOb3RlQnlJZChpZCwgdXNlcklkKVxyXG4gIH1cclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBRUE7QUFJQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/services/NotesService.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/delete/delete.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;