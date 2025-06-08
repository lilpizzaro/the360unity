(() => {
var exports = {};
exports.id = 9492;
exports.ids = [9492];
exports.modules = {

/***/ 869:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65239);
/* harmony import */ var next_dist_server_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48088);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88170);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30893);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
const notFound0 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54413));
const module1 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 94431));
const module2 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54431));
const module3 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54413));
const module4 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 89999, 23));
const module5 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 65284, 23));


// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
          children: ["/_not-found", {
            children: ['__PAGE__', {}, {
              page: [
                notFound0,
                "D:\\the360unity-master\\the360unity-master\\src\\app\\not-found.tsx"
              ]
            }]
          }, {}]
        },
        {
        'layout': [module1, "D:\\the360unity-master\\the360unity-master\\src\\app\\layout.tsx"],
'error': [module2, "D:\\the360unity-master\\the360unity-master\\src\\app\\error.tsx"],
'not-found': [module3, "D:\\the360unity-master\\the360unity-master\\src\\app\\not-found.tsx"],
'forbidden': [module4, "next/dist/client/components/forbidden-error"],
'unauthorized': [module5, "next/dist/client/components/unauthorized-error"],
        
      }
      ]
      }.children;
const pages = [];


const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new next_dist_server_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/_not-found/page",
        pathname: "/_not-found",
        // The following aren't used in production.
        bundlePath: '',
        filename: '',
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

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

/***/ 4343:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 47429, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 80380));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 52616));


/***/ }),

/***/ 4573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 8704:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map


/***/ }),

/***/ 10846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 14329:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Error)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85814);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function Error({ error, reset }) {
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [
        error
    ]);
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white",
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-md w-full space-y-8 text-center",
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                    className: "text-4xl font-bold",
                    children: "Something went wrong"
                }),
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-lg text-gray-400",
                    children: "We're sorry, but there was an error loading this page."
                }),
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pt-6 flex flex-col sm:flex-row gap-4 justify-center",
                    children: [
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: reset,
                            className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors",
                            children: "Try again"
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: "/",
                            className: "px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors",
                            children: "Return to home"
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 16685:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 14329));


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

/***/ 27910:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 29021:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 29294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 31162:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNextRouterError", ({
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
}));
const _httpaccessfallback = __webpack_require__(8704);
const _redirecterror = __webpack_require__(49026);
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map


/***/ }),

/***/ 33873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

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

/***/ 49026:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
        return RedirectType;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __webpack_require__(52836);
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map


/***/ }),

/***/ 51094:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 85814, 23));


/***/ }),

/***/ 51846:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// This has to be a shared module which is shared between client component error boundary and dynamic component

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map


/***/ }),

/***/ 52616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\components\\\\ClerkProvider.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\components\\ClerkProvider.tsx",
"default",
));


/***/ }),

/***/ 52637:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isPostpone", ({
    enumerable: true,
    get: function() {
        return isPostpone;
    }
}));
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
}

//# sourceMappingURL=is-postpone.js.map

/***/ }),

/***/ 52836:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "RedirectStatusCode", ({
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
}));
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map


/***/ }),

/***/ 53069:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54431));


/***/ }),

/***/ 54413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFound),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   viewport: () => (/* binding */ viewport)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92807);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4536);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);


function NotFound() {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center min-h-[70vh] text-center px-4",
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                className: "text-4xl font-bold mb-4",
                children: "404 - Page Not Found"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-lg mb-8",
                children: "The page you're looking for doesn't exist or has been moved."
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/",
                className: "px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                children: "Return to Home"
            })
        ]
    });
}
const metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.'
};
const viewport = {
    themeColor: '#000000'
};


/***/ }),

/***/ 54431:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\app\\\\error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\app\\error.tsx",
"default",
));


/***/ }),

/***/ 55511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 55962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientBody)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16189);
/* __next_internal_client_entry_do_not_use__ default auto */ 


// Create a separate component that uses searchParams
function SearchParamsWatcher({ setIsChangingRoute }) {
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();
    // Effect to notify parent when searchParams change
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsChangingRoute(true);
        const timer = setTimeout(()=>{
            setIsChangingRoute(false);
        }, 300);
        return ()=>clearTimeout(timer);
    }, [
        searchParams,
        setIsChangingRoute
    ]);
    return null;
}
function ClientBody({ children }) {
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const [isChangingRoute, setIsChangingRoute] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Remove any extension-added attributes during hydration
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // This runs only on the client after hydration
        document.body.className = "antialiased";
        // Clean up any attributes added by browser extensions
        const htmlElement = document.documentElement;
        const attributesToRemove = [];
        // Find all attributes that might be added by browser extensions
        for(let i = 0; i < htmlElement.attributes.length; i++){
            const attr = htmlElement.attributes[i];
            if (attr.name.includes('-injected') || attr.name.startsWith('data-') && !attr.name.startsWith('data-react-') || attr.name.includes('tooltip') || attr.name.includes('extension')) {
                attributesToRemove.push(attr.name);
            }
        }
        // Remove identified attributes
        attributesToRemove.forEach((attr)=>{
            htmlElement.removeAttribute(attr);
        });
        // Hide loading screen when app is initially loaded
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(()=>{
                loadingEl.style.display = 'none';
            }, 500);
        }
    }, []);
    // Handle route changes to show/hide loading screen
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsChangingRoute(true);
        // Hide loading after a short delay to allow the new page to render
        const timer = setTimeout(()=>{
            setIsChangingRoute(false);
        }, 300);
        return ()=>clearTimeout(timer);
    }, [
        pathname
    ]);
    // Show/hide loading screen on route changes
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadingEl = document.getElementById('app-loading');
        if (!loadingEl) return;
        if (isChangingRoute) {
            loadingEl.style.display = 'flex';
            setTimeout(()=>{
                loadingEl.style.opacity = '1';
            }, 0);
        } else {
            loadingEl.style.opacity = '0';
            setTimeout(()=>{
                loadingEl.style.display = 'none';
            }, 500);
        }
    }, [
        isChangingRoute
    ]);
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "antialiased",
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
                fallback: null,
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SearchParamsWatcher, {
                    setIsChangingRoute: setIsChangingRoute
                })
            }),
            children
        ]
    });
}


/***/ }),

/***/ 57075:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 57487:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 79167, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 55962));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 94570));


/***/ }),

/***/ 57975:
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ 61135:
/***/ (() => {



/***/ }),

/***/ 63033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 66237:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16444, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16042, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 88170, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 49477, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 29345, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 12089, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 46577, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31307, 23));


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

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 76760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 76926:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", ({
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
}));
const _react = /*#__PURE__*/ _interop_require_wildcard(__webpack_require__(61120));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Dynamic IO is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn =  false ? 0 : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache(// eslint-disable-next-line @typescript-eslint/no-unused-vars -- cache key
(key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if (false) { var _stack; } else {
            logErrorOrWarn(message);
        }
    };
}

//# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map

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

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 79428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 80380:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\app\\\\ClientBody.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\app\\ClientBody.tsx",
"default",
));


/***/ }),

/***/ 84797:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 86346, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 27924, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 35656, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 40099, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 38243, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 28827, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 62763, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 97173, 23));


/***/ }),

/***/ 88046:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 4536, 23));


/***/ }),

/***/ 94431:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLayout),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   viewport: () => (/* binding */ viewport)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92807);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22376);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(68726);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61135);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ClientBody__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80380);
/* harmony import */ var _components_ClerkProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52616);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36162);







const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#632cfb"
};
const metadata = {
    title: "The360Unity - Developer Community",
    description: "A community platform for developers to share projects, collaborate, and grow together."
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("html", {
        lang: "en",
        className: `${(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_5___default().variable)} ${(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_6___default().variable)}`,
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("head", {
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_script__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    id: "show-loading-on-route-change",
                    strategy: "beforeInteractive",
                    children: `
            // Show loading screen on route change
            if (typeof window !== 'undefined') {
              let loadingTimeout;
              
              window.addEventListener('beforeunload', () => {
                const loadingEl = document.getElementById('app-loading');
                if (loadingEl) {
                  loadingEl.style.display = 'flex';
                  loadingEl.style.opacity = '1';
                }
              });
            }
          `
                })
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("body", {
                suppressHydrationWarning: true,
                className: "antialiased",
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ClerkProvider__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ClientBody__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        children: children
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 94570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClerkProvider)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13292);
/* __next_internal_client_entry_do_not_use__ default auto */ 

function ClerkProvider({ children }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_clerk_nextjs__WEBPACK_IMPORTED_MODULE_1__/* .ClerkProvider */ .lJ, {
        appearance: {
            elements: {
                formButtonPrimary: "bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition-opacity",
                card: "bg-black/50 backdrop-blur-md border border-white/10",
                headerTitle: "text-white",
                headerSubtitle: "text-white/70",
                socialButtonsBlockButton: "bg-white/5 hover:bg-white/10 border border-white/10",
                socialButtonsBlockButtonText: "text-white",
                formFieldLabel: "text-white/70",
                formFieldInput: "bg-white/5 border border-white/10 text-white",
                footerActionText: "text-white/70",
                footerActionLink: "text-cyan hover:text-cyan/80",
                logoBox: "hidden",
                logoImage: "hidden",
                // Hide branding elements
                badge: "hidden",
                footer: "hidden",
                footerAction: "py-4",
                // Customizing the colors and styles
                rootBox: "bg-transparent",
                main: "bg-transparent",
                navbar: "hidden",
                navbarButtons: "hidden",
                identityPreview: "bg-white/10 border-white/10"
            },
            variables: {
                // Remove Clerk-specific color scheme
                colorPrimary: "rgb(14, 165, 233)",
                colorText: "white",
                colorTextSecondary: "rgba(255, 255, 255, 0.7)",
                colorBackground: "rgba(0, 0, 0, 0.3)",
                colorInputText: "white",
                colorInputBackground: "rgba(255, 255, 255, 0.05)",
                borderRadius: "0.5rem"
            }
        },
        children: children
    });
}


/***/ }),

/***/ 96487:
/***/ (() => {



/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,5283,4256], () => (__webpack_exec__(869)));
module.exports = __webpack_exports__;

})();