"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/universal-user-agent";
exports.ids = ["vendor-chunks/universal-user-agent"];
exports.modules = {

/***/ "(rsc)/../node_modules/universal-user-agent/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/universal-user-agent/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserAgent: () => (/* binding */ getUserAgent)\n/* harmony export */ });\nfunction getUserAgent() {\n  if (typeof navigator === \"object\" && \"userAgent\" in navigator) {\n    return navigator.userAgent;\n  }\n\n  if (typeof process === \"object\" && process.version !== undefined) {\n    return `Node.js/${process.version.substr(1)} (${process.platform}; ${\n      process.arch\n    })`;\n  }\n\n  return \"<environment undetectable>\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzL3VuaXZlcnNhbC11c2VyLWFnZW50L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwyQkFBMkIsR0FBRyxtQkFBbUI7QUFDdkU7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2hpbmFuby93b3Jrc3BhY2UvYWdpbGVhcHAvbm9kZV9tb2R1bGVzL3VuaXZlcnNhbC11c2VyLWFnZW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQWdlbnQoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcIm9iamVjdFwiICYmIFwidXNlckFnZW50XCIgaW4gbmF2aWdhdG9yKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy52ZXJzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYE5vZGUuanMvJHtwcm9jZXNzLnZlcnNpb24uc3Vic3RyKDEpfSAoJHtwcm9jZXNzLnBsYXRmb3JtfTsgJHtcbiAgICAgIHByb2Nlc3MuYXJjaFxuICAgIH0pYDtcbiAgfVxuXG4gIHJldHVybiBcIjxlbnZpcm9ubWVudCB1bmRldGVjdGFibGU+XCI7XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/universal-user-agent/index.js\n");

/***/ }),

/***/ "(ssr)/../node_modules/universal-user-agent/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/universal-user-agent/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserAgent: () => (/* binding */ getUserAgent)\n/* harmony export */ });\nfunction getUserAgent() {\n  if (typeof navigator === \"object\" && \"userAgent\" in navigator) {\n    return navigator.userAgent;\n  }\n\n  if (typeof process === \"object\" && process.version !== undefined) {\n    return `Node.js/${process.version.substr(1)} (${process.platform}; ${\n      process.arch\n    })`;\n  }\n\n  return \"<environment undetectable>\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vbm9kZV9tb2R1bGVzL3VuaXZlcnNhbC11c2VyLWFnZW50L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwyQkFBMkIsR0FBRyxtQkFBbUI7QUFDdkU7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2hpbmFuby93b3Jrc3BhY2UvYWdpbGVhcHAvbm9kZV9tb2R1bGVzL3VuaXZlcnNhbC11c2VyLWFnZW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQWdlbnQoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcIm9iamVjdFwiICYmIFwidXNlckFnZW50XCIgaW4gbmF2aWdhdG9yKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy52ZXJzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYE5vZGUuanMvJHtwcm9jZXNzLnZlcnNpb24uc3Vic3RyKDEpfSAoJHtwcm9jZXNzLnBsYXRmb3JtfTsgJHtcbiAgICAgIHByb2Nlc3MuYXJjaFxuICAgIH0pYDtcbiAgfVxuXG4gIHJldHVybiBcIjxlbnZpcm9ubWVudCB1bmRldGVjdGFibGU+XCI7XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../node_modules/universal-user-agent/index.js\n");

/***/ })

};
;