(() => {
var exports = {};
exports.id = 9156;
exports.ids = [9156];
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

/***/ 17884:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 34028));


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

/***/ 33873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 34028:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ForumPage)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85814);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_DashboardNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31255);
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31497);
/* __next_internal_client_entry_do_not_use__ default auto */ 




const categories = [
    {
        id: "all",
        name: "All Topics",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .ChatBubbleIcon */ .yw, {
            size: 20,
            className: "text-white/80"
        }),
        count: 0
    },
    {
        id: "react",
        name: "React",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .ReactIcon */ .vR, {
            size: 20,
            className: "text-cyan"
        }),
        count: 0
    },
    {
        id: "nextjs",
        name: "Next.js",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .NextjsIcon */ ._r, {
            size: 20,
            className: "text-white/80"
        }),
        count: 0
    },
    {
        id: "typescript",
        name: "TypeScript",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .TypeScriptIcon */ .$0, {
            size: 20,
            className: "text-cyan"
        }),
        count: 0
    },
    {
        id: "nodejs",
        name: "Node.js",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .NodejsIcon */ .bY, {
            size: 20,
            className: "text-green-400"
        }),
        count: 0
    },
    {
        id: "devops",
        name: "DevOps",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .DevOpsIcon */ .nf, {
            size: 20,
            className: "text-orange-400"
        }),
        count: 0
    },
    {
        id: "career",
        name: "Career",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .BriefcaseIcon */ ._d, {
            size: 20,
            className: "text-purple-400"
        }),
        count: 0
    },
    {
        id: "general",
        name: "General",
        icon: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .MegaphoneIcon */ .sZ, {
            size: 20,
            className: "text-white/80"
        }),
        count: 0
    }
];
function ForumPage() {
    const [selectedCategory, setSelectedCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("all");
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [threads, setThreads] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [categoryCounts, setCategoryCounts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    // Fetch threads from API
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchThreads = async ()=>{
            setLoading(true);
            setError(null);
            try {
                const url = new URL('/api/forum', window.location.origin);
                if (selectedCategory !== "all") {
                    url.searchParams.append("category", selectedCategory);
                }
                if (searchQuery) {
                    url.searchParams.append("search", searchQuery);
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch discussions");
                }
                const data = await response.json();
                setThreads(data);
                // Calculate category counts
                const counts = {
                    all: data.length
                };
                data.forEach((thread)=>{
                    counts[thread.category] = (counts[thread.category] || 0) + 1;
                });
                setCategoryCounts(counts);
            } catch (err) {
                console.error("Error fetching discussions:", err);
                setError("Failed to load discussions. Please try again.");
            } finally{
                setLoading(false);
            }
        };
        fetchThreads();
    }, [
        selectedCategory,
        searchQuery
    ]);
    // Format relative time
    const formatRelativeTime = (dateString)=>{
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };
    // Sort threads
    const sortedThreads = [
        ...threads
    ].sort((a, b)=>{
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    });
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_3__["default"], {}),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "min-h-screen pt-20 px-4 md:px-6 pb-20 md:pb-0",
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                            className: "text-2xl md:text-3xl font-bold mb-2",
                                            children: "Community Forum"
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm md:text-base text-white/70",
                                            children: "Connect, learn, and share knowledge with fellow developers"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/forum/new",
                                    className: "btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3 mt-4 md:mt-0 flex items-center justify-center gap-2 rounded-full shadow-lg",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .MessageCircleIcon */ .PB, {
                                            size: 18
                                        }),
                                        "Start Discussion"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "md:hidden mb-4 overflow-x-auto mobile-scroll pb-2",
                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex space-x-2 min-w-max",
                                children: categories.map((category)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setSelectedCategory(category.id),
                                        className: `flex items-center space-x-2 p-2 rounded-full whitespace-nowrap ${selectedCategory === category.id ? "bg-cyan/20 border-cyan/50 text-cyan border" : "bg-white/5 border border-white/10"}`,
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-lg",
                                                children: category.icon
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-sm font-medium",
                                                children: category.name
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs opacity-70 bg-white/10 px-1.5 py-0.5 rounded-full",
                                                children: categoryCounts[category.id] || 0
                                            })
                                        ]
                                    }, category.id))
                            })
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid lg:grid-cols-4 gap-4 md:gap-8",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "hidden md:block lg:col-span-1",
                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 sticky top-24 shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                className: "text-lg font-bold mb-4",
                                                children: "Categories"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "space-y-2",
                                                children: categories.map((category)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        onClick: ()=>setSelectedCategory(category.id),
                                                        className: `w-full text-left p-3 rounded-xl transition-all duration-200 ${selectedCategory === category.id ? "bg-cyan/20 border-cyan/50 text-cyan border" : "hover:bg-white/5"}`,
                                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "text-lg mr-3",
                                                                            children: category.icon
                                                                        }),
                                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "font-medium",
                                                                            children: category.name
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-sm opacity-70",
                                                                    children: categoryCounts[category.id] || 0
                                                                })
                                                            ]
                                                        })
                                                    }, category.id))
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mt-6 pt-6 border-t border-white/10",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                                                        className: "font-semibold mb-4",
                                                        children: "Forum Stats"
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "space-y-3 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "opacity-70",
                                                                        children: "Total Threads"
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        children: categoryCounts.all || 0
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "opacity-70",
                                                                        children: "Total Posts"
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        children: threads.reduce((acc, thread)=>acc + (thread.replies || 0), threads.length)
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "opacity-70",
                                                                        children: "Active Users"
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        children: new Set(threads.filter((t)=>t.author).map((t)=>t.author.id)).size
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "lg:col-span-3 w-full overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative mb-4 md:mb-6",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "text",
                                                    placeholder: "Search discussions...",
                                                    value: searchQuery,
                                                    onChange: (e)=>setSearchQuery(e.target.value),
                                                    className: "w-full px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/20 rounded-xl md:rounded-2xl backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        children: [
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                                cx: "11",
                                                                cy: "11",
                                                                r: "8"
                                                            }),
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                d: "m21 21-4.3-4.3"
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "md:hidden mb-4",
                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                        className: "text-lg font-bold",
                                                        children: categories.find((c)=>c.id === selectedCategory)?.name || "All Topics"
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "text-sm text-white/70",
                                                        children: [
                                                            categoryCounts[selectedCategory] || 0,
                                                            " threads"
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        loading ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex justify-center items-center py-12",
                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"
                                            })
                                        }) : error ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mb-6 p-4 md:p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "mb-4",
                                                    children: error
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>window.location.reload(),
                                                    className: "px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors",
                                                    children: "Try Again"
                                                })
                                            ]
                                        }) : sortedThreads.length === 0 ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "py-8 md:py-12 text-center bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "mb-4 inline-block p-3 bg-white/10 rounded-full",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .MessageCircleIcon */ .PB, {
                                                        size: 32,
                                                        className: "text-white/40"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                    className: "text-lg md:text-xl font-bold mb-2",
                                                    children: "No discussions found"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-white/60 max-w-md mx-auto mb-6 text-sm md:text-base",
                                                    children: selectedCategory !== "all" || searchQuery ? "Try adjusting your filters or search query." : "Be the first to start a discussion in our community!"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: "/forum/new",
                                                    className: "inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity shadow-lg",
                                                    children: "Start Discussion"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "space-y-3 md:space-y-4 w-full",
                                            children: sortedThreads.map((thread)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: `/forum/${thread.id}`,
                                                    className: "block bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg w-full",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-start justify-between w-full",
                                                        children: [
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex-1 min-w-0 pr-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex flex-wrap items-center gap-2 mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-xs bg-white/10 px-2 py-1 rounded-full",
                                                                                children: thread.categoryName
                                                                            }),
                                                                            thread.pinned && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-xs bg-cyan/20 text-cyan px-2 py-1 rounded-full",
                                                                                children: "Pinned"
                                                                            }),
                                                                            thread.solved && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full",
                                                                                children: "Solved"
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                                        className: "font-bold text-base md:text-lg mb-2 truncate",
                                                                        children: thread.title
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex flex-wrap gap-1 mb-3",
                                                                        children: [
                                                                            thread.tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                    className: "text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80",
                                                                                    children: [
                                                                                        "#",
                                                                                        tag
                                                                                    ]
                                                                                }, tag)),
                                                                            thread.tags.length > 3 && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: "text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80",
                                                                                children: [
                                                                                    "+",
                                                                                    thread.tags.length - 3
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "text-xs md:text-sm text-white/70",
                                                                        children: [
                                                                            "By ",
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-cyan",
                                                                                children: thread.author.name
                                                                            }),
                                                                            " • Last reply ",
                                                                            formatRelativeTime(thread.lastActivity)
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "text-right text-xs md:text-sm text-white/70 ml-3 flex flex-col items-end",
                                                                children: [
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-1 mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_4__/* .MessageCircleIcon */ .PB, {
                                                                                size: 14
                                                                            }),
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                children: thread.replies
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                                width: "14",
                                                                                height: "14",
                                                                                viewBox: "0 0 24 24",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                strokeWidth: "2",
                                                                                strokeLinecap: "round",
                                                                                strokeLinejoin: "round",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                                        d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                                                        cx: "12",
                                                                                        cy: "12",
                                                                                        r: "3"
                                                                                    })
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                children: thread.views
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                }, thread.id))
                                        }),
                                        !loading && !error && sortedThreads.length > 0 && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex justify-center mt-6 md:mt-8",
                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        className: "px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors",
                                                        children: "Previous"
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        className: "px-4 py-2 bg-cyan/20 text-cyan rounded-full",
                                                        children: "1"
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        className: "px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors",
                                                        children: "Next"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


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

/***/ 59740:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 81270));


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

/***/ 81270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\app\\\\(dashboard)\\\\forum\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\forum\\page.tsx",
"default",
));


/***/ }),

/***/ 95111:
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
const module5 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 57675));
const module6 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 89999, 23));
const module7 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 65284, 23));
const page8 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 81270));


// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: [
        '(dashboard)',
        {
        children: [
        'forum',
        {
        children: ['__PAGE__', {}, {
          page: [page8, "D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\forum\\page.tsx"],
          
        }]
      },
        {
        
        
      }
      ]
      },
        {
        'layout': [module5, "D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\layout.tsx"],
'forbidden': [module6, "next/dist/client/components/forbidden-error"],
'unauthorized': [module7, "next/dist/client/components/unauthorized-error"],
        
      }
      ]
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
const pages = ["D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\forum\\page.tsx"];


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
        page: "/(dashboard)/forum/page",
        pathname: "/forum",
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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,5283,4256,2283], () => (__webpack_exec__(95111)));
module.exports = __webpack_exports__;

})();