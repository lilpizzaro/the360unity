exports.id = 2283;
exports.ids = [2283];
exports.modules = {

/***/ 4343:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 47429, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 80380));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 52616));


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

/***/ 31255:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DashboardNav)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85814);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16189);
/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13781);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function DashboardNav() {
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const isActive = (path)=>{
        return pathname === path || pathname?.startsWith(`${path}/`);
    };
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
        className: "fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10",
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between h-16",
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-shrink-0",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/",
                            className: "flex items-center",
                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xl font-bold text-white",
                                children: "The360Unity"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "hidden md:flex md:items-center md:space-x-6",
                        children: [
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/dashboard",
                                className: `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive("/dashboard") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`,
                                children: "Dashboard"
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/projects",
                                className: `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive("/projects") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`,
                                children: "Projects"
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/forum",
                                className: `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive("/forum") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`,
                                children: "Forum"
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/collaborate",
                                className: `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive("/collaborate") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`,
                                children: "Collaborate"
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/showcase",
                                className: `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive("/showcase") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`,
                                children: "Showcase"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/profile",
                                className: `hidden md:block mr-4 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive("/profile") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"}`,
                                children: "Profile"
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "relative",
                                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_clerk_nextjs__WEBPACK_IMPORTED_MODULE_3__/* .UserButton */ .uF, {
                                    afterSignOutUrl: "/",
                                    appearance: {
                                        elements: {
                                            userButtonAvatarBox: "w-8 h-8",
                                            userButtonTrigger: "focus:shadow-none focus:ring-2 focus:ring-white/20 rounded-full",
                                            userButtonPopoverCard: "bg-black/80 border border-white/10 shadow-xl",
                                            userButtonPopoverFooter: "hidden",
                                            userButtonPopoverActionButton: "hover:bg-white/10 text-white",
                                            userButtonPopoverActionButtonText: "text-white",
                                            userPreviewMainIdentifier: "text-white",
                                            userPreviewSecondaryIdentifier: "text-white/70",
                                            userButtonPopoverActionButtonIcon: "text-white",
                                            userButtonPopoverIcon: "text-white",
                                            userProfileSectionPrimaryButton: "text-white hover:bg-white/10",
                                            userProfileSectionSecondaryButton: "text-white hover:bg-white/10",
                                            userButtonPopoverActionButtonIconBox: "text-white",
                                            userProfilePage: "text-white"
                                        },
                                        variables: {
                                            colorText: "white",
                                            colorTextSecondary: "rgba(255, 255, 255, 0.7)",
                                            colorBackground: "rgba(0, 0, 0, 0.8)"
                                        }
                                    }
                                })
                            })
                        ]
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 31497:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $0: () => (/* binding */ TypeScriptIcon),
/* harmony export */   A6: () => (/* binding */ ArrowLeftIcon),
/* harmony export */   Ab: () => (/* binding */ RocketIcon),
/* harmony export */   I: () => (/* binding */ RustIcon),
/* harmony export */   JM: () => (/* binding */ UploadIcon),
/* harmony export */   K0: () => (/* binding */ AngularIcon),
/* harmony export */   Mt: () => (/* binding */ DockerIcon),
/* harmony export */   Nb: () => (/* binding */ GithubIcon),
/* harmony export */   PB: () => (/* binding */ MessageCircleIcon),
/* harmony export */   Rn: () => (/* binding */ AwsIcon),
/* harmony export */   UW: () => (/* binding */ FileArchiveIcon),
/* harmony export */   WL: () => (/* binding */ GoIcon),
/* harmony export */   Xu: () => (/* binding */ VueIcon),
/* harmony export */   _d: () => (/* binding */ BriefcaseIcon),
/* harmony export */   _r: () => (/* binding */ NextjsIcon),
/* harmony export */   bY: () => (/* binding */ NodejsIcon),
/* harmony export */   ds: () => (/* binding */ FileTextIcon),
/* harmony export */   fA: () => (/* binding */ HomeIcon),
/* harmony export */   hf: () => (/* binding */ GraphQLIcon),
/* harmony export */   js: () => (/* binding */ JavaScriptIcon),
/* harmony export */   lo: () => (/* binding */ CodeIcon),
/* harmony export */   nf: () => (/* binding */ DevOpsIcon),
/* harmony export */   ny: () => (/* binding */ UserIcon),
/* harmony export */   oS: () => (/* binding */ FileIcon),
/* harmony export */   sZ: () => (/* binding */ MegaphoneIcon),
/* harmony export */   un: () => (/* binding */ PythonIcon),
/* harmony export */   uv: () => (/* binding */ XIcon),
/* harmony export */   vR: () => (/* binding */ ReactIcon),
/* harmony export */   xf: () => (/* binding */ ImageIcon),
/* harmony export */   xm: () => (/* binding */ LightbulbIcon),
/* harmony export */   yw: () => (/* binding */ ChatBubbleIcon)
/* harmony export */ });
/* unused harmony exports GlobeIcon, ChevronDownIcon, MenuIcon */
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function RocketIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
            })
        ]
    });
}
function CodeIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "16 18 22 12 16 6"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "8 6 2 12 8 18"
            })
        ]
    });
}
function UserIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: "12",
                cy: "7",
                r: "4"
            })
        ]
    });
}
function MessageCircleIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        })
    });
}
function GlobeIcon({ className, size = 24 }) {
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ _jsx("circle", {
                cx: "12",
                cy: "12",
                r: "10"
            }),
            /*#__PURE__*/ _jsx("line", {
                x1: "2",
                y1: "12",
                x2: "22",
                y2: "12"
            }),
            /*#__PURE__*/ _jsx("path", {
                d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            })
        ]
    });
}
function GithubIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        })
    });
}
function LightbulbIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "9",
                y1: "18",
                x2: "15",
                y2: "18"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "10",
                y1: "22",
                x2: "14",
                y2: "22"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"
            })
        ]
    });
}
function HomeIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "9 22 9 12 15 12 15 22"
            })
        ]
    });
}
function ChevronDownIcon({ className, size = 24 }) {
    return /*#__PURE__*/ _jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: /*#__PURE__*/ _jsx("polyline", {
            points: "6 9 12 15 18 9"
        })
    });
}
function MenuIcon({ className, size = 24 }) {
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ _jsx("line", {
                x1: "3",
                y1: "12",
                x2: "21",
                y2: "12"
            }),
            /*#__PURE__*/ _jsx("line", {
                x1: "3",
                y1: "6",
                x2: "21",
                y2: "6"
            }),
            /*#__PURE__*/ _jsx("line", {
                x1: "3",
                y1: "18",
                x2: "21",
                y2: "18"
            })
        ]
    });
}
function XIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "18",
                y1: "6",
                x2: "6",
                y2: "18"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "6",
                y1: "6",
                x2: "18",
                y2: "18"
            })
        ]
    });
}
function UploadIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "17 8 12 3 7 8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "12",
                y1: "3",
                x2: "12",
                y2: "15"
            })
        ]
    });
}
function FileIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "14 2 14 8 20 8"
            })
        ]
    });
}
function ImageIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "2",
                ry: "2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: "8.5",
                cy: "8.5",
                r: "1.5"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "21 15 16 10 5 21"
            })
        ]
    });
}
function FileTextIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "14 2 14 8 20 8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "16",
                y1: "13",
                x2: "8",
                y2: "13"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "16",
                y1: "17",
                x2: "8",
                y2: "17"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "10",
                y1: "9",
                x2: "8",
                y2: "9"
            })
        ]
    });
}
function FileArchiveIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "14 2 14 8 20 8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                x: "10",
                y: "12",
                width: "4",
                height: "4"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "12",
                y1: "16",
                x2: "12",
                y2: "20"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "12",
                y1: "8",
                x2: "12",
                y2: "12"
            })
        ]
    });
}
function ArrowLeftIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                x1: "19",
                y1: "12",
                x2: "5",
                y2: "12"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline", {
                points: "12 19 5 12 12 5"
            })
        ]
    });
}
// Forum category icons
function ChatBubbleIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        })
    });
}
function ReactIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: "12",
                cy: "12",
                r: "2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M19.79 15a9 9 0 1 1-17.58 0"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 12v.01"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 16a4 4 0 0 1-4-4"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M8 12c0-1.23.56-2.29 1.41-3"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16 12c0-1.23-.56-2.29-1.41-3"
            })
        ]
    });
}
function NextjsIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m9 8 6 8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m9 16 6-8"
            })
        ]
    });
}
function TypeScriptIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                x: "2",
                y: "2",
                width: "20",
                height: "20",
                rx: "2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M19 8v8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M7 8v8"
            })
        ]
    });
}
function NodejsIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m12 8-4 4 4 4"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m16 12-4-4"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m16 12-4 4"
            })
        ]
    });
}
function DevOpsIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        })
    });
}
function BriefcaseIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                x: "2",
                y: "7",
                width: "20",
                height: "14",
                rx: "2",
                ry: "2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
            })
        ]
    });
}
function MegaphoneIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m3 11 18-5v12L3 13v-2z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M11.6 16.8a3 3 0 1 1-5.8-1.6"
            })
        ]
    });
}
function VueIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 2l4.5 8L21 2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M18 2h3l-9 16L3 2h3l6 11 6-11Z"
            })
        ]
    });
}
function AngularIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16.24 19.56l-4.24 2.44-4.24-2.44A14.9 14.9 0 0 1 2 12c0-4 2-7 5-9l5-1 5 1c3 2 5 5 5 9a14.9 14.9 0 0 1-5.76 7.56"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m12 22-9-7 2-9 7-4 7 4 2 9Z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m12 22v-9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m9 9h6"
            })
        ]
    });
}
function PythonIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M11.33 12.86A4 4 0 0 1 9 16.19V22l3-3 3 3v-5.81a4 4 0 0 1-2.33-3.33"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M14.67 9.14A4 4 0 0 1 17 5.81V0l-3 3-3-3v5.81a4 4 0 0 1 2.33 3.33"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16.5 22h-9a4.5 4.5 0 0 1 0-9h9a4.5 4.5 0 0 0 0-9h-10"
            })
        ]
    });
}
function JavaScriptIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M2 8.994V20l10-7.5 10 7.5V8.994A3.993 3.993 0 0 0 18 5H6a3.993 3.993 0 0 0-4 3.994Z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "m2 19 10-8 10 8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 11v5"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M8 11v9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16 11v9"
            })
        ]
    });
}
function GoIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M9 12h6"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15 9v6"
            })
        ]
    });
}
function RustIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 2c4.5 0 9 4 9 9v0c0 4.5-4 9-9 9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 2c-5 0-9 4-9 9v0c0 5 4 9 9 9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 8.7v4.2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16.47 11.4c.2 0 .35.1.35.25s-.15.25-.35.25"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M7.53 11.4c-.2 0-.35.1-.35.25s.15.25.35.25"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16 16.2c0 .5-.9.9-2 .9S12 16.7 12 16.2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M7.1 8.7c0 .5.9.9 2 .9s2-.4 2-.9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15.97 14.5c.3 0 .5-.1.5-.35s-.2-.35-.5-.35"
            })
        ]
    });
}
function DockerIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M22 12.5c0 2.76-2.01 5-4.5 5s-4.5-2.24-4.5-5 2.01-5 4.5-5 4.5 2.24 4.5 5Z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M18 10v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15 10v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M13 10.5c0 2.76-2.01 5-4.5 5S4 13.26 4 10.5 6.01 5.5 8.5 5.5s4.5 2.24 4.5 5Z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M9 8v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M6 8v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M11 2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M18 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M5 19v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M11 19v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M17 19v1"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M8 22a2 2 0 0 1-2-2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16 22a2 2 0 0 0 2-2"
            })
        ]
    });
}
function AwsIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M19 13v3c0 1-1 2-2 2H6c-1 0-2-1-2-2v-3"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M5 13V7c0-1 1-2 2-2h3"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M19 13V7c0-1-1-2-2-2h-3"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 19v3"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 5V2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15 22h-3"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15 5h-3"
            })
        ]
    });
}
function GraphQLIcon({ className, size = 24 }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M14.7 10H9.3L7 15h10z"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M15 15V9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M9 15V9"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 22v-8"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M12 8V2"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M18 4.5 7.5 8.5"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M16.5 19.5 6 15.5"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M6 8.5 16.5 4.5"
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M7.5 15.5 18 19.5"
            })
        ]
    });
}


/***/ }),

/***/ 43974:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 31255));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 45000));


/***/ }),

/***/ 45000:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MobileBottomNav)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85814);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16189);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31497);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function MobileBottomNav() {
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const isActive = (path)=>{
        return pathname === path || pathname?.startsWith(`${path}/`);
    };
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mobile-bottom-nav md:hidden",
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/dashboard",
                className: `flex flex-col items-center justify-center p-2 rounded-lg ${isActive("/dashboard") ? "text-cyan" : "text-white/70"}`,
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_3__/* .HomeIcon */ .fA, {
                        size: 24
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs mt-1",
                        children: "Home"
                    })
                ]
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/projects",
                className: `flex flex-col items-center justify-center p-2 rounded-lg ${isActive("/projects") ? "text-cyan" : "text-white/70"}`,
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_3__/* .RocketIcon */ .Ab, {
                        size: 24
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs mt-1",
                        children: "Projects"
                    })
                ]
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/forum",
                className: `flex flex-col items-center justify-center p-2 rounded-lg ${isActive("/forum") ? "text-cyan" : "text-white/70"}`,
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_3__/* .MessageCircleIcon */ .PB, {
                        size: 24
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs mt-1",
                        children: "Forum"
                    })
                ]
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/collaborate",
                className: `flex flex-col items-center justify-center p-2 rounded-lg ${isActive("/collaborate") ? "text-cyan" : "text-white/70"}`,
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_3__/* .CodeIcon */ .lo, {
                        size: 24
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs mt-1",
                        children: "Collab"
                    })
                ]
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/profile",
                className: `flex flex-col items-center justify-center p-2 rounded-lg ${isActive("/profile") ? "text-cyan" : "text-white/70"}`,
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_3__/* .UserIcon */ .ny, {
                        size: 24
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs mt-1",
                        children: "Profile"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 49069:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\components\\\\DashboardNav.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\components\\DashboardNav.tsx",
"default",
));


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

/***/ 57487:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 79167, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 55962));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 94570));


/***/ }),

/***/ 57675:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DashboardLayout),
/* harmony export */   dynamic: () => (/* binding */ dynamic)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92807);
/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(88443);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39916);
/* harmony import */ var _components_DashboardNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49069);
/* harmony import */ var _components_MobileBottomNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65182);





// This is needed to ensure the route is properly compiled
const dynamic = 'force-dynamic';
async function DashboardLayout({ children }) {
    const session = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .j)();
    const userId = session?.userId;
    if (!userId) {
        (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.redirect)("/sign-in");
    }
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen pb-16 md:pb-0",
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_2__["default"], {}),
            children,
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_MobileBottomNav__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        ]
    });
}


/***/ }),

/***/ 61135:
/***/ (() => {



/***/ }),

/***/ 61278:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 49069));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 65182));


/***/ }),

/***/ 65182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\components\\\\MobileBottomNav.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\components\\MobileBottomNav.tsx",
"default",
));


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