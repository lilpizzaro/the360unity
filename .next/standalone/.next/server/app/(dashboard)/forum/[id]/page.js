(() => {
var exports = {};
exports.id = 5998;
exports.ids = [5998];
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

/***/ 3461:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 90946));


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

/***/ 16613:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 20116));


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

/***/ 20116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadPage)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16189);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85814);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31255);
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31497);
/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13781);
/* __next_internal_client_entry_do_not_use__ default auto */ 






function ThreadPage() {
    const params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { user, isLoaded } = (0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_6__/* .useUser */ .Jd)();
    const [thread, setThread] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [replies, setReplies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [replyContent, setReplyContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const threadId = params.id;
    // Fetch thread data
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchThread = async ()=>{
            setLoading(true);
            setError(null);
            try {
                // In a real app, this would fetch from an API endpoint
                // For now, we'll just use our in-memory data from the API route
                const response = await fetch('/api/forum');
                if (!response.ok) {
                    throw new Error("Failed to fetch discussions");
                }
                const threads = await response.json();
                const thread = threads.find((t)=>t.id === parseInt(threadId));
                if (!thread) {
                    throw new Error("Thread not found");
                }
                setThread(thread);
                // Fetch actual replies from API
                const repliesResponse = await fetch(`/api/forum/comments?postId=${threadId}`);
                if (!repliesResponse.ok) {
                    throw new Error("Failed to fetch replies");
                }
                const repliesData = await repliesResponse.json();
                setReplies(repliesData);
            } catch (err) {
                console.error("Error fetching thread:", err);
                setError(err.message || "Failed to load discussion. Please try again.");
            } finally{
                setLoading(false);
            }
        };
        if (threadId) {
            fetchThread();
        }
    }, [
        threadId
    ]);
    // Format date
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    // Handle reply submission
    const handleReplySubmit = async (e)=>{
        e.preventDefault();
        if (!replyContent.trim()) return;
        setIsSubmitting(true);
        try {
            // Send reply to API
            const response = await fetch('/api/forum/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: parseInt(threadId),
                    content: replyContent
                }),
                credentials: 'include'
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to post reply");
            }
            const newReply = await response.json();
            // Add new reply to the list
            setReplies([
                ...replies,
                newReply
            ]);
            setReplyContent("");
            // Update thread with new reply count
            if (thread) {
                setThread({
                    ...thread,
                    replies: thread.replies + 1,
                    lastActivity: new Date().toISOString(),
                    lastAuthor: user?.fullName || user?.username || "Anonymous"
                });
            }
        } catch (err) {
            console.error("Error posting reply:", err);
            alert("Failed to post reply. Please try again.");
        } finally{
            setIsSubmitting(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "min-h-screen pt-24 px-6",
                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "max-w-4xl mx-auto",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex justify-center items-center py-12",
                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"
                            })
                        })
                    })
                })
            ]
        });
    }
    if (error || !thread) {
        return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "min-h-screen pt-24 px-6",
                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "max-w-4xl mx-auto",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-6 p-6 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "mb-4",
                                    children: error || "Thread not found"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>router.push("/forum"),
                                    className: "px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-colors",
                                    children: "Back to Forum"
                                })
                            ]
                        })
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "min-h-screen pt-24 px-6",
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                href: "/forum",
                                className: "inline-flex items-center text-white/70 hover:text-white transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_5__/* .ArrowLeftIcon */ .A6, {
                                        size: 16,
                                        className: "mr-2"
                                    }),
                                    "Back to Forum"
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-6",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center mb-4",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm bg-white/10 px-2 py-1 rounded-full mr-2",
                                            children: thread.categoryName
                                        }),
                                        thread.pinned && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs bg-cyan/20 text-cyan px-2 py-1 rounded-full mr-2",
                                            children: "Pinned"
                                        }),
                                        thread.solved && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full",
                                            children: "Solved"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                    className: "t-heading-lg mb-4",
                                    children: thread.title
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex flex-wrap gap-2 mb-6",
                                    children: thread.tags.map((tag)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs px-2 py-1 bg-white/10 rounded-full text-white/80",
                                            children: [
                                                "#",
                                                tag
                                            ]
                                        }, tag))
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between mb-6",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center",
                                            children: [
                                                thread.author.imageUrl ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: thread.author.imageUrl,
                                                    alt: thread.author.name,
                                                    className: "w-10 h-10 rounded-full mr-3"
                                                }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold mr-3",
                                                    children: thread.author.name[0]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "font-medium",
                                                            children: thread.author.name
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "text-sm text-white/70",
                                                            children: formatDate(thread.createdAt)
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "text-sm text-white/70",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        thread.views,
                                                        " views"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "mx-2",
                                                    children: "•"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        thread.replies,
                                                        " replies"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "prose prose-invert max-w-none",
                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        children: thread.content
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                    className: "t-heading-md mb-6",
                                    children: [
                                        "Replies (",
                                        replies.length,
                                        ")"
                                    ]
                                }),
                                replies.length > 0 ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "space-y-6",
                                    children: replies.map((reply)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `bg-white/5 rounded-2xl p-6 backdrop-blur-sm border ${reply.isAnswer ? "border-green-500/30" : "border-white/10"}`,
                                            children: [
                                                reply.isAnswer && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            width: "12",
                                                            height: "12",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                d: "M20 6 9 17l-5-5"
                                                            })
                                                        }),
                                                        "Solution"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center mb-4",
                                                    children: [
                                                        reply.author.imageUrl ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                            src: reply.author.imageUrl,
                                                            alt: reply.author.name,
                                                            className: "w-8 h-8 rounded-full mr-3"
                                                        }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mr-3",
                                                            children: reply.author.name[0]
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "font-medium",
                                                                    children: reply.author.name
                                                                }),
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "text-xs text-white/70",
                                                                    children: formatDate(reply.createdAt)
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "prose prose-invert max-w-none",
                                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        children: reply.content
                                                    })
                                                })
                                            ]
                                        }, reply.id))
                                }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center py-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-white/70 mb-2",
                                            children: "No replies yet"
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-white/70",
                                            children: "Be the first to reply to this discussion!"
                                        })
                                    ]
                                })
                            ]
                        }),
                        isLoaded && user ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                    className: "t-heading-sm mb-4",
                                    children: "Post a Reply"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                    onSubmit: handleReplySubmit,
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "mb-4",
                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                                rows: 6,
                                                value: replyContent,
                                                onChange: (e)=>setReplyContent(e.target.value),
                                                placeholder: "Write your reply here...",
                                                className: "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono text-sm",
                                                required: true
                                            })
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex justify-end",
                                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "submit",
                                                disabled: isSubmitting || !replyContent.trim(),
                                                className: "btn-primary px-6 py-3 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_icons__WEBPACK_IMPORTED_MODULE_5__/* .MessageCircleIcon */ .PB, {
                                                        size: 18
                                                    }),
                                                    isSubmitting ? "Posting..." : "Post Reply"
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "mb-4",
                                    children: "You need to sign in to reply to this discussion"
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    href: "/sign-in",
                                    className: "btn-primary px-6 py-3 inline-block",
                                    children: "Sign In"
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

/***/ 49657:
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
const page8 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 90946));


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
        children: [
        '[id]',
        {
        children: ['__PAGE__', {}, {
          page: [page8, "D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\forum\\[id]\\page.tsx"],
          
        }]
      },
        {
        
        
      }
      ]
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
const pages = ["D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\forum\\[id]\\page.tsx"];


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
        page: "/(dashboard)/forum/[id]/page",
        pathname: "/forum/[id]",
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

/***/ 90946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\app\\\\(dashboard)\\\\forum\\\\[id]\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\forum\\[id]\\page.tsx",
"default",
));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,5283,4256,2283], () => (__webpack_exec__(49657)));
module.exports = __webpack_exports__;

})();