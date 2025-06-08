(() => {
var exports = {};
exports.id = 1014;
exports.ids = [1014];
exports.modules = {

/***/ 1708:
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ 3295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 4573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 10846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 19121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 19771:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 29294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 37067:
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ 37830:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ 38522:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 44708:
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ 44870:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 54299:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 63441));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7791));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 12918));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 62278));


/***/ }),

/***/ 55511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 57075:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 57975:
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ 63033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 73024:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 73136:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 73566:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ 76760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 77030:
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ 77598:
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ 79428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 91091:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7161));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 93821));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54976));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 50044));


/***/ }),

/***/ 97272:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  patchFetch: () => (/* binding */ patchFetch),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  workAsyncStorage: () => (/* binding */ workAsyncStorage),
  workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)
});

// NAMESPACE OBJECT: ./src/app/api/auth/[...nextauth]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  config: () => (config),
  "default": () => (route)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-route/module.compiled.js
var module_compiled = __webpack_require__(96559);
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-kind.js
var route_kind = __webpack_require__(48088);
// EXTERNAL MODULE: ./node_modules/next/dist/server/lib/patch-fetch.js
var patch_fetch = __webpack_require__(37719);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/index.js + 12 modules
var esm = __webpack_require__(65755);
;// ./src/app/api/auth/[...nextauth]/route.ts

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
/* harmony default export */ const route = ((0,esm/* authMiddleware */.Uw)({
    publicRoutes: [
        "/",
        "/api/webhook"
    ]
}));
const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ]
};

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyEuK1xcLltcXHddKyR8X25leHQpLiopKShcXC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLygoPyEuK1xcLltcXHddKyR8X25leHQpLiopIn0seyJyZWdleHAiOiJeKD86XFwvKF9uZXh0XFwvZGF0YVxcL1teL117MSx9KSk%2FKD86XFwvKFxcLz9pbmRleHxcXC8%2FaW5kZXhcXC5qc29uKSk%2FW1xcLyNcXD9dPyQiLCJvcmlnaW5hbFNvdXJjZSI6Ii8ifSx7InJlZ2V4cCI6Il4oPzpcXC8oX25leHRcXC9kYXRhXFwvW14vXXsxLH0pKT8oPzpcXC8oYXBpfHRycGMpKSguKikoXFwuanNvbik%2FW1xcLyNcXD9dPyQiLCJvcmlnaW5hbFNvdXJjZSI6Ii8oYXBpfHRycGMpKC4qKSJ9XX0%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/auth/[...nextauth]/route",
        pathname: "/api/auth/[...nextauth]",
        filename: "route",
        bundlePath: "app/api/auth/[...nextauth]/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\auth\\[...nextauth]\\route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0,patch_fetch.patchFetch)({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,5283,1283], () => (__webpack_exec__(97272)));
module.exports = __webpack_exports__;

})();