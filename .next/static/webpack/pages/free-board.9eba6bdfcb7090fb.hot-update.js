"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/free-board",{

/***/ "./src/components/PostItem.js":
/*!************************************!*\
  !*** ./src/components/PostItem.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PostItem; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _public_images_profile_image_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../public/images/profile-image.png */ \"./public/images/profile-image.png\");\n/* harmony import */ var _PostItem_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PostItem.module.css */ \"./src/components/PostItem.module.css\");\n/* harmony import */ var _PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n // Link 추가\n // 이미지 경로\n\nfunction PostItem(param) {\n    var post = param.post;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n        className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().postItem),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().postHeader),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: \"/post-detail/\".concat(post.id),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().postTitle),\n                            children: post.title\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                            lineNumber: 12,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        src: \"/images/post-Image.png\",\n                        alt: post.title,\n                        className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().bestPostImage),\n                        width: 72,\n                        height: 72\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                        lineNumber: 14,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().postFooter),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().postAuthorDate),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                src: _public_images_profile_image_png__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n                                alt: \"Profile\",\n                                className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().profileImage),\n                                width: 24,\n                                height: 24\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                                lineNumber: 24,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().authorName),\n                                children: post.author\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                                lineNumber: 31,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().postDate),\n                                children: new Date(post.createdAt).toLocaleDateString()\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                                lineNumber: 32,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                        lineNumber: 23,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: (_PostItem_module_css__WEBPACK_IMPORTED_MODULE_5___default().likeCount),\n                        children: [\n                            \"\\uD83D\\uDC99 \",\n                            post.likeCount\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\GRAM\\\\Desktop\\\\sprint6-FE\\\\src\\\\components\\\\PostItem.js\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n_c = PostItem;\nvar _c;\n$RefreshReg$(_c, \"PostItem\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Qb3N0SXRlbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0s7QUFDRixDQUFDLFVBQVU7QUFDMEIsQ0FBQyxTQUFTO0FBQ2pDO0FBRTVCLFNBQVNLLFNBQVMsS0FBUTtRQUFSLGFBQUVDO0lBQ2pDLHFCQUNFLDhEQUFDQztRQUFFQyxXQUFXSixzRUFBZTs7MEJBQzNCLDhEQUFDTTtnQkFBSUYsV0FBV0osd0VBQWlCOztrQ0FDL0IsOERBQUNGLGtEQUFJQTt3QkFBQ1UsTUFBTSxnQkFBd0IsT0FBUk4sS0FBS08sRUFBRTtrQ0FDakMsNEVBQUNDOzRCQUFLTixXQUFXSix1RUFBZ0I7c0NBQUdFLEtBQUtVLEtBQUs7Ozs7Ozs7Ozs7O2tDQUVoRCw4REFBQ2YsbURBQUtBO3dCQUNKZ0IsS0FBSTt3QkFDSkMsS0FBS1osS0FBS1UsS0FBSzt3QkFDZlIsV0FBV0osMkVBQW9CO3dCQUMvQmdCLE9BQU87d0JBQ1BDLFFBQVE7Ozs7Ozs7Ozs7OzswQkFHWiw4REFBQ1g7Z0JBQUlGLFdBQVdKLHdFQUFpQjs7a0NBQy9CLDhEQUFDTTt3QkFBSUYsV0FBV0osNEVBQXFCOzswQ0FDbkMsOERBQUNILG1EQUFLQTtnQ0FDSmdCLEtBQUtkLHdFQUFhQTtnQ0FDbEJlLEtBQUk7Z0NBQ0pWLFdBQVdKLDBFQUFtQjtnQ0FDOUJnQixPQUFPO2dDQUNQQyxRQUFROzs7Ozs7MENBRVYsOERBQUNQO2dDQUFLTixXQUFXSix3RUFBaUI7MENBQUdFLEtBQUtvQixNQUFNOzs7Ozs7MENBQ2hELDhEQUFDWjtnQ0FBS04sV0FBV0osc0VBQWU7MENBQzdCLElBQUl3QixLQUFLdEIsS0FBS3VCLFNBQVMsRUFBRUMsa0JBQWtCOzs7Ozs7Ozs7Ozs7a0NBR2hELDhEQUFDaEI7d0JBQUtOLFdBQVdKLHVFQUFnQjs7NEJBQUU7NEJBQUlFLEtBQUt5QixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTdEO0tBakN3QjFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1Bvc3RJdGVtLmpzP2M1ODYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiOyAvLyBMaW5rIOy2lOqwgFxyXG5pbXBvcnQgQXV0aG9yUHJvZmlsZSBmcm9tIFwiLi4vLi4vcHVibGljL2ltYWdlcy9wcm9maWxlLWltYWdlLnBuZ1wiOyAvLyDsnbTrr7jsp4Ag6rK966GcXHJcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vUG9zdEl0ZW0ubW9kdWxlLmNzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUG9zdEl0ZW0oeyBwb3N0IH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGEgY2xhc3NOYW1lPXtzdHlsZXMucG9zdEl0ZW19PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBvc3RIZWFkZXJ9PlxyXG4gICAgICAgIDxMaW5rIGhyZWY9e2AvcG9zdC1kZXRhaWwvJHtwb3N0LmlkfWB9PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMucG9zdFRpdGxlfT57cG9zdC50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgc3JjPVwiL2ltYWdlcy9wb3N0LUltYWdlLnBuZ1wiXHJcbiAgICAgICAgICBhbHQ9e3Bvc3QudGl0bGV9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5iZXN0UG9zdEltYWdlfVxyXG4gICAgICAgICAgd2lkdGg9ezcyfVxyXG4gICAgICAgICAgaGVpZ2h0PXs3Mn1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wb3N0Rm9vdGVyfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBvc3RBdXRob3JEYXRlfT5cclxuICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICBzcmM9e0F1dGhvclByb2ZpbGV9XHJcbiAgICAgICAgICAgIGFsdD1cIlByb2ZpbGVcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5wcm9maWxlSW1hZ2V9XHJcbiAgICAgICAgICAgIHdpZHRoPXsyNH1cclxuICAgICAgICAgICAgaGVpZ2h0PXsyNH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5hdXRob3JOYW1lfT57cG9zdC5hdXRob3J9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMucG9zdERhdGV9PlxyXG4gICAgICAgICAgICB7bmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmxpa2VDb3VudH0+8J+SmSB7cG9zdC5saWtlQ291bnR9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvYT5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkltYWdlIiwiTGluayIsIkF1dGhvclByb2ZpbGUiLCJzdHlsZXMiLCJQb3N0SXRlbSIsInBvc3QiLCJhIiwiY2xhc3NOYW1lIiwicG9zdEl0ZW0iLCJkaXYiLCJwb3N0SGVhZGVyIiwiaHJlZiIsImlkIiwic3BhbiIsInBvc3RUaXRsZSIsInRpdGxlIiwic3JjIiwiYWx0IiwiYmVzdFBvc3RJbWFnZSIsIndpZHRoIiwiaGVpZ2h0IiwicG9zdEZvb3RlciIsInBvc3RBdXRob3JEYXRlIiwicHJvZmlsZUltYWdlIiwiYXV0aG9yTmFtZSIsImF1dGhvciIsInBvc3REYXRlIiwiRGF0ZSIsImNyZWF0ZWRBdCIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImxpa2VDb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/PostItem.js\n"));

/***/ })

});