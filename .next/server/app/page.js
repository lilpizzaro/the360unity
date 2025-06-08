(() => {
var exports = {};
exports.id = 8974;
exports.ids = [8974];
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

/***/ 16255:
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
const module0 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 94431));
const module1 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54431));
const module2 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54413));
const module3 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 89999, 23));
const module4 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 65284, 23));
const page5 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 21204));


// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: ['__PAGE__', {}, {
          page: [page5, "D:\\the360unity-master\\the360unity-master\\src\\app\\page.tsx"],
          
        }]
      },
        {
        'layout': [module0, "D:\\the360unity-master\\the360unity-master\\src\\app\\layout.tsx"],
'error': [module1, "D:\\the360unity-master\\the360unity-master\\src\\app\\error.tsx"],
'not-found': [module2, "D:\\the360unity-master\\the360unity-master\\src\\app\\not-found.tsx"],
'forbidden': [module3, "next/dist/client/components/forbidden-error"],
'unauthorized': [module4, "next/dist/client/components/unauthorized-error"],
        
      }
      ]
      }.children;
const pages = ["D:\\the360unity-master\\the360unity-master\\src\\app\\page.tsx"];


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
        page: "/page",
        pathname: "/",
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

/***/ 21204:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92807);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4536);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57943);
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89163);




async function Home() {
    // Get the current user with the newer pattern
    const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__/* .currentUser */ .N)();
    const userId = user?.id;
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", {
                className: "fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:p-6",
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/",
                            className: "text-xl sm:text-2xl font-bold text-white",
                            children: "THE360UNITY"
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                            className: "hidden md:flex items-center space-x-8",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "#start",
                                    className: "nav-link t-caption",
                                    children: "Start"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "#what",
                                    className: "nav-link t-caption",
                                    children: "What"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "#why",
                                    className: "nav-link t-caption",
                                    children: "Why"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "#faq",
                                    className: "nav-link t-caption",
                                    children: "FAQ"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "hidden md:flex items-center space-x-4",
                                    children: userId ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/dashboard",
                                                className: "nav-link t-caption hover:text-cyan",
                                                children: "Dashboard"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer",
                                                children: user?.firstName?.[0] || user?.username?.[0] || "U"
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/sign-in",
                                                className: "nav-link t-caption hover:text-cyan",
                                                children: "Sign In"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/sign-up",
                                                className: "btn-primary t-caption",
                                                children: "Sign Up"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center md:hidden",
                                    children: userId ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/dashboard",
                                                className: "flex items-center justify-center px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors",
                                                children: "Dashboard"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-7 h-7 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold",
                                                children: user?.firstName?.[0] || user?.username?.[0] || "U"
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/sign-in",
                                                className: "px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors",
                                                children: "Sign In"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/sign-up",
                                                className: "px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-medium text-white shadow-lg hover:opacity-90 transition-opacity",
                                                children: "Sign Up"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        id: "start",
                        className: "section flex-col text-center relative overflow-hidden pt-20 sm:pt-24",
                        children: [
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative z-10 max-w-4xl mx-auto px-4",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                                        className: "t-heading-xl animate-text mb-8",
                                        children: [
                                            "Connect with",
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-cyan",
                                                children: "other developers"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "fade-in space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "t-lg max-w-2xl mx-auto opacity-90",
                                                children: "The360Unity is a community platform designed for developers to share their projects, learn from each other, collaborate, and grow together."
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex flex-col sm:flex-row items-center justify-center gap-4 mt-8",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                        href: userId ? "/dashboard" : "/sign-up",
                                                        className: "btn-primary text-base px-8 py-3 w-full sm:w-auto",
                                                        children: userId ? "Go to Dashboard" : "Join the platform"
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-white/70",
                                                        children: "or"
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                        href: "#what",
                                                        className: "text-cyan hover:underline",
                                                        children: "find out more"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in md:hidden",
                                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "#what",
                                    className: "btn-circle",
                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .ChevronDownIcon */ .D3, {
                                        size: 16
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                        id: "what",
                        className: "section flex-col py-20",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "max-w-6xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "t-heading-lg mb-16 animate-text",
                                    children: "What We Offer"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid md:grid-cols-3 gap-8",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "flex justify-center mb-4",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .RocketIcon */ .Ab, {
                                                        size: 48,
                                                        className: "text-cyan"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-4",
                                                    children: "Share Your Projects"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: "Showcase your latest projects, get feedback from the community, and discover amazing work from other developers."
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                    href: "/sign-up",
                                                    className: "mt-4 inline-block text-cyan hover:underline",
                                                    children: "Start sharing →"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in-delay-1 bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "flex justify-center mb-4",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .UserIcon */ .ny, {
                                                        size: 48,
                                                        className: "text-cyan"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-4",
                                                    children: "Build Your Profile"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: "Create a compelling developer profile that showcases your skills, technologies, and contributions to the community."
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                    href: "/sign-up",
                                                    className: "mt-4 inline-block text-cyan hover:underline",
                                                    children: "Create profile →"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in-delay-2 bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "flex justify-center mb-4",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .MessageCircleIcon */ .PB, {
                                                        size: 48,
                                                        className: "text-cyan"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-4",
                                                    children: "Collaborate & Learn"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: "Join discussions, participate in code reviews, and collaborate on projects with developers from around the world."
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                    href: "/sign-up",
                                                    className: "mt-4 inline-block text-cyan hover:underline",
                                                    children: "Join community →"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                        id: "why",
                        className: "section flex-col py-20",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-center mb-16",
                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "t-heading-lg mb-8 animate-text",
                                        children: "Why Choose The360Unity?"
                                    })
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid lg:grid-cols-2 gap-12 items-center",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-8",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "fade-in",
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-3 mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .RocketIcon */ .Ab, {
                                                                    size: 24,
                                                                    className: "text-cyan"
                                                                }),
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                                    className: "t-heading-md text-cyan",
                                                                    children: "Discover New Opportunities"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "t-base opacity-80",
                                                            children: "Connect with like-minded developers, discover job opportunities, and find collaborators for your next big project."
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "fade-in-delay-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-3 mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .LightbulbIcon */ .xm, {
                                                                    size: 24,
                                                                    className: "text-cyan"
                                                                }),
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                                    className: "t-heading-md text-cyan",
                                                                    children: "Learn and Grow"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "t-base opacity-80",
                                                            children: "Access tutorials, join study groups, and learn from experienced developers in our supportive community."
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "fade-in-delay-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-3 mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .CodeIcon */ .lo, {
                                                                    size: 24,
                                                                    className: "text-cyan"
                                                                }),
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                                    className: "t-heading-md text-cyan",
                                                                    children: "Build Together"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "t-base opacity-80",
                                                            children: "Find team members for hackathons, open source projects, or startup ideas. Build something amazing together."
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "relative",
                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-full h-96 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10",
                                                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "flex justify-center mb-4",
                                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_2__/* .GlobeIcon */ .fC, {
                                                                size: 64,
                                                                className: "text-white"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "t-heading-sm",
                                                            children: "Global Developer Network"
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "t-base opacity-70 mt-2",
                                                            children: "5,000+ active developers"
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "mt-6",
                                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                                href: "/sign-up",
                                                                className: "btn-primary text-sm px-6 py-2",
                                                                children: "Join the network"
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                        id: "faq",
                        className: "section flex-col py-20",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                            className: "t-heading-lg mb-8 animate-text",
                                            children: "Got Any Questions?"
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "t-lg opacity-80",
                                            children: "Here's what you might be wondering about The360Unity. Got another question? Feel free to contact us."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-3",
                                                    children: "What is The360Unity?"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: "The360Unity is a community platform designed for developers to share projects, collaborate, learn, and grow together. Whether you're a beginner or experienced developer, you'll find valuable connections and opportunities here."
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in-delay-1 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-3",
                                                    children: "Is The360Unity free?"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: "Yes! The360Unity is free to join and use. We believe in making developer collaboration accessible to everyone, regardless of their background or experience level."
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in-delay-2 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-3",
                                                    children: "What can I share on my profile?"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: "You can showcase your projects, list your technical skills, share your GitHub repositories, write about your development journey, and connect with other developers who share similar interests."
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "fade-in-delay-3 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "t-heading-sm mb-3",
                                                    children: "How do I get started?"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "t-base opacity-80",
                                                    children: 'Simply click the "Join the Community" button above to create your developer profile and start connecting with other developers right away!'
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                        className: "section flex-col py-20 text-center",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "t-heading-lg mb-8 animate-text",
                                    children: "Ready to join the community?"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: userId ? "/dashboard" : "/sign-up",
                                    className: "btn-primary text-lg px-12 py-4 bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300",
                                    children: userId ? "Go to Dashboard" : "Join The360Unity"
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
                className: "py-12 px-6 border-t border-white/10",
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "max-w-7xl mx-auto",
                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col md:flex-row justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-6 md:mb-0",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "text-2xl font-bold text-white mb-2",
                                        children: "THE360UNITY"
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "t-base opacity-70",
                                        children: [
                                            "\xa9 ",
                                            new Date().getFullYear(),
                                            " The360Unity",
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}),
                                            "Made with ❤ for developers"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex space-x-8",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                                                className: "t-caption mb-3 text-white",
                                                children: "Platform"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                className: "space-y-2 text-sm opacity-70",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                            href: "#",
                                                            className: "hover:text-cyan transition-colors",
                                                            children: "Privacy Policy"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                            href: "#",
                                                            className: "hover:text-cyan transition-colors",
                                                            children: "Terms of Service"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                                                className: "t-caption mb-3 text-white",
                                                children: "Support"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                className: "space-y-2 text-sm opacity-70",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                            href: "mailto:hello@the360unity.com",
                                                            className: "hover:text-cyan transition-colors",
                                                            children: "Email us"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                            href: "#",
                                                            className: "hover:text-cyan transition-colors",
                                                            children: "Help Center"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}


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

/***/ 51094:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 85814, 23));


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


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,5283,4256,9585], () => (__webpack_exec__(16255)));
module.exports = __webpack_exports__;

})();