"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/post-detail",{

/***/ "./src/components/FreeBoardCommentItem.js":
/*!************************************************!*\
  !*** ./src/components/FreeBoardCommentItem.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FreeBoardCommentItem; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FreeBoardCommentItem.module.css */ \"./src/components/FreeBoardCommentItem.module.css\");\n/* harmony import */ var _FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _public_images_profile_image_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../public/images/profile-image.png */ \"./public/images/profile-image.png\");\n\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction FreeBoardCommentItem(param) {\n    var author = param.author, content = param.content, date = param.date;\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)(useState(false), 2), menuVisible = _useState[0], setMenuVisible = _useState[1];\n    var toggleMenu = function() {\n        return setMenuVisible(!menuVisible);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().commentContainer),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().commentHeader),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().content),\n                        children: \"댓글 내용\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                        lineNumber: 14,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().moreMenuButton),\n                        onClick: toggleMenu,\n                        children: \":\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                        lineNumber: 15,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().imageAuthorDate),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        src: _public_images_profile_image_png__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n                        alt: \"Profile\",\n                        className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().profileImage),\n                        width: 32,\n                        height: 32\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                        lineNumber: 20,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().authorDate),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().author),\n                                children: \"작성자\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                                lineNumber: 28,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: (_FreeBoardCommentItem_module_css__WEBPACK_IMPORTED_MODULE_3___default().date),\n                                children: \"작성한 시간\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                                lineNumber: 29,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                        lineNumber: 27,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n                lineNumber: 19,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\FreeBoardCommentItem.js\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, this);\n}\n_s(FreeBoardCommentItem, \"S8fHTNgi/KNDbc3f2iwwwdPIbEc=\");\n_c = FreeBoardCommentItem;\nvar _c;\n$RefreshReg$(_c, \"FreeBoardCommentItem\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9GcmVlQm9hcmRDb21tZW50SXRlbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNLO0FBQ3dCO0FBQ1c7QUFFbkQsU0FBU0kscUJBQXFCLEtBQXlCO1FBQXZCQyxTQUFGLE1BQUVBLFFBQVFDLFVBQVYsTUFBVUEsU0FBU0MsT0FBbkIsTUFBbUJBOztJQUM5RCxJQUFzQ0MsWUFBQUEsK0RBQUFBLENBQUFBLFNBQVMsWUFBeENDLGNBQStCRCxjQUFsQkUsaUJBQWtCRjtJQUV0QyxJQUFNRyxhQUFhO2VBQU1ELGVBQWUsQ0FBQ0Q7O0lBRXpDLHFCQUNFLDhEQUFDRztRQUFJQyxXQUFXWCwwRkFBdUI7OzBCQUNyQyw4REFBQ1U7Z0JBQUlDLFdBQVdYLHVGQUFvQjs7a0NBQ2xDLDhEQUFDYzt3QkFBRUgsV0FBV1gsaUZBQWM7a0NBQUU7Ozs7OztrQ0FDOUIsOERBQUNlO3dCQUFPSixXQUFXWCx3RkFBcUI7d0JBQUVpQixTQUFTUjtrQ0FBWTs7Ozs7Ozs7Ozs7OzBCQUlqRSw4REFBQ0M7Z0JBQUlDLFdBQVdYLHlGQUFzQjs7a0NBQ3BDLDhEQUFDRCxtREFBS0E7d0JBQ0pvQixLQUFLbEIsd0VBQWFBO3dCQUNsQm1CLEtBQUk7d0JBQ0pULFdBQVdYLHNGQUFtQjt3QkFDOUJzQixPQUFPO3dCQUNQQyxRQUFROzs7Ozs7a0NBRVYsOERBQUNiO3dCQUFJQyxXQUFXWCxvRkFBaUI7OzBDQUMvQiw4REFBQ3lCO2dDQUFLZCxXQUFXWCxnRkFBYTswQ0FBRTs7Ozs7OzBDQUNoQyw4REFBQ3lCO2dDQUFLZCxXQUFXWCw4RUFBVzswQ0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS3hDO0dBNUJ3QkU7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvRnJlZUJvYXJkQ29tbWVudEl0ZW0uanM/MWRlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL0ZyZWVCb2FyZENvbW1lbnRJdGVtLm1vZHVsZS5jc3NcIjtcclxuaW1wb3J0IEF1dGhvclByb2ZpbGUgZnJvbSBcIi4uLy4uL3B1YmxpYy9pbWFnZXMvcHJvZmlsZS1pbWFnZS5wbmdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZyZWVCb2FyZENvbW1lbnRJdGVtKHsgYXV0aG9yLCBjb250ZW50LCBkYXRlIH0pIHtcclxuICBjb25zdCBbbWVudVZpc2libGUsIHNldE1lbnVWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlTWVudSA9ICgpID0+IHNldE1lbnVWaXNpYmxlKCFtZW51VmlzaWJsZSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbW1lbnRDb250YWluZXJ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbW1lbnRIZWFkZXJ9PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PuuMk+q4gCDrgrTsmqk8L3A+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5tb3JlTWVudUJ1dHRvbn0gb25DbGljaz17dG9nZ2xlTWVudX0+XHJcbiAgICAgICAgICA6XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmltYWdlQXV0aG9yRGF0ZX0+XHJcbiAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICBzcmM9e0F1dGhvclByb2ZpbGV9XHJcbiAgICAgICAgICBhbHQ9XCJQcm9maWxlXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnByb2ZpbGVJbWFnZX1cclxuICAgICAgICAgIHdpZHRoPXszMn1cclxuICAgICAgICAgIGhlaWdodD17MzJ9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmF1dGhvckRhdGV9PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuYXV0aG9yfT7snpHshLHsnpA8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5kYXRlfT7snpHshLHtlZwg7Iuc6rCEPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiSW1hZ2UiLCJzdHlsZXMiLCJBdXRob3JQcm9maWxlIiwiRnJlZUJvYXJkQ29tbWVudEl0ZW0iLCJhdXRob3IiLCJjb250ZW50IiwiZGF0ZSIsInVzZVN0YXRlIiwibWVudVZpc2libGUiLCJzZXRNZW51VmlzaWJsZSIsInRvZ2dsZU1lbnUiLCJkaXYiLCJjbGFzc05hbWUiLCJjb21tZW50Q29udGFpbmVyIiwiY29tbWVudEhlYWRlciIsInAiLCJidXR0b24iLCJtb3JlTWVudUJ1dHRvbiIsIm9uQ2xpY2siLCJpbWFnZUF1dGhvckRhdGUiLCJzcmMiLCJhbHQiLCJwcm9maWxlSW1hZ2UiLCJ3aWR0aCIsImhlaWdodCIsImF1dGhvckRhdGUiLCJzcGFuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/FreeBoardCommentItem.js\n"));

/***/ })

});