(() => {
var exports = {};
exports.id = 9181;
exports.ids = [9181];
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

/***/ 16488:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 30075));


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

/***/ 28043:
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
const page8 = () => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 43701));


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
        'profile',
        {
        children: [
        '[username]',
        {
        children: ['__PAGE__', {}, {
          page: [page8, "D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\profile\\[username]\\page.tsx"],
          
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
const pages = ["D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\profile\\[username]\\page.tsx"];


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
        page: "/(dashboard)/profile/[username]/page",
        pathname: "/profile/[username]",
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

/***/ 30075:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserProfilePage)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85814);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16189);
/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13781);
/* harmony import */ var _components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31255);
/* harmony import */ var _barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18106);
/* harmony import */ var _barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(71032);
/* harmony import */ var _barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(27853);
/* harmony import */ var _barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(86910);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37590);
/* __next_internal_client_entry_do_not_use__ default auto */ 







function UserProfilePage() {
    const { username } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useParams)();
    const { user: currentUser, isLoaded: isUserLoaded } = (0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_6__/* .useUser */ .Jd)();
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [projects, setProjects] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [forumActivity, setForumActivity] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("projects");
    const [isFollowLoading, setIsFollowLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchUserProfile = async ()=>{
            try {
                setLoading(true);
                setError(null);
                ;
                // Fetch user profile data from Clerk
                const response = await fetch(`/api/users/profile/${username}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(()=>({}));
                    console.error("Profile fetch error:", response.status, errorData);
                    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
                }
                const userData = await response.json();
                ;
                // Check if current user is following this profile
                if (isUserLoaded && currentUser && currentUser.id !== userData.id) {
                    try {
                        const followStatusResponse = await fetch(`/api/users/follow/status?followingId=${userData.id}`);
                        if (followStatusResponse.ok) {
                            const { isFollowing } = await followStatusResponse.json();
                            userData.isFollowing = isFollowing;
                        }
                    } catch (err) {
                        console.error("Error checking follow status:", err);
                        userData.isFollowing = false;
                    }
                }
                setUser(userData);
                // Fetch user's projects from Supabase
                const projectsResponse = await fetch(`/api/users/${userData.id}/projects`);
                if (projectsResponse.ok) {
                    const projectsData = await projectsResponse.json();
                    ;
                    setProjects(projectsData);
                } else {
                    console.error("Error fetching projects:", projectsResponse.statusText);
                    setProjects([]);
                }
                // Fetch user's forum activity from Supabase
                const forumResponse = await fetch(`/api/users/${userData.id}/forum-activity`);
                if (forumResponse.ok) {
                    const forumData = await forumResponse.json();
                    ;
                    setForumActivity(forumData);
                } else {
                    console.error("Error fetching forum activity:", forumResponse.statusText);
                    setForumActivity([]);
                }
            } catch (err) {
                console.error("Error in profile page:", err);
                setError(err instanceof Error ? err.message : "Failed to load user profile");
                setProjects([]);
                setForumActivity([]);
            } finally{
                setLoading(false);
            }
        };
        if (username) {
            fetchUserProfile();
        }
    }, [
        username,
        currentUser,
        isUserLoaded
    ]);
    // Handle follow/unfollow
    const handleFollowToggle = async ()=>{
        if (!isUserLoaded || !currentUser || !user) return;
        // Prevent following yourself
        if (currentUser.id === user.id) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay.error("You can't follow yourself");
            return;
        }
        setIsFollowLoading(true);
        try {
            const endpoint = user.isFollowing ? '/api/users/unfollow' : '/api/users/follow';
            // Optimistically update UI
            setUser((prev)=>{
                if (!prev) return prev;
                return {
                    ...prev,
                    isFollowing: !prev.isFollowing,
                    followersCount: prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
                };
            });
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    followingId: user.id
                })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || `Failed to ${user.isFollowing ? 'unfollow' : 'follow'} user`);
            }
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay.success(user.isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
        } catch (err) {
            console.error('Error toggling follow status:', err);
            // Revert UI state on error
            setUser((prev)=>{
                if (!prev) return prev;
                return {
                    ...prev,
                    isFollowing: !prev.isFollowing,
                    followersCount: !prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
                };
            });
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay.error(err instanceof Error ? err.message : 'Failed to update follow status');
        } finally{
            setIsFollowLoading(false);
        }
    };
    // Format date
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    if (loading) {
        return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "min-h-screen pt-24 px-4 md:px-6",
                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "max-w-7xl mx-auto",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex justify-center items-center py-20",
                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"
                            })
                        })
                    })
                })
            ]
        });
    }
    if (error || !user) {
        return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "min-h-screen pt-24 px-4 md:px-6",
                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "max-w-7xl mx-auto",
                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "bg-white/5 rounded-xl md:rounded-2xl p-6 backdrop-blur-sm border border-white/10",
                            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-center py-10",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-xl md:text-2xl font-bold mb-4",
                                        children: "User Not Found"
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-white/70 mb-6",
                                        children: error || "The user profile you're looking for doesn't exist or has been removed."
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        href: "/dashboard",
                                        className: "btn-primary",
                                        children: "Back to Dashboard"
                                    })
                                ]
                            })
                        })
                    })
                })
            ]
        });
    }
    // Update the follow button in the JSX
    const followButton = /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        onClick: handleFollowToggle,
        disabled: !isUserLoaded || !currentUser || isFollowLoading || currentUser.id === user.id,
        className: `px-6 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${!isUserLoaded || !currentUser || currentUser.id === user.id ? 'bg-white/10 text-white/50 cursor-not-allowed' : user.isFollowing ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 shadow-lg'}`,
        children: isFollowLoading ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"
        }) : user.isFollowing ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    size: 16
                }),
                "Unfollow"
            ]
        }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    size: 16
                }),
                "Follow"
            ]
        })
    });
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_DashboardNav__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "min-h-screen pt-24 px-4 md:px-6 pb-20 md:pb-6",
                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "bg-gradient-to-br from-white/5 to-white/10 rounded-xl md:rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-6 md:mb-8",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col md:flex-row items-center md:items-start gap-6",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-24 h-24 md:w-32 md:h-32",
                                            children: user.imageUrl ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                src: user.imageUrl,
                                                alt: `${user.firstName} ${user.lastName}`,
                                                className: "w-full h-full rounded-full object-cover border-2 border-white/20"
                                            }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-full h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold",
                                                children: user.firstName?.[0] || user.username?.[0] || "U"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 text-center md:text-left",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                                                    className: "text-2xl md:text-3xl font-bold mb-2",
                                                    children: [
                                                        user.firstName,
                                                        " ",
                                                        user.lastName
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "text-lg text-white/70 mb-2",
                                                    children: [
                                                        "@",
                                                        user.username
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-white/80 mb-4",
                                                    children: user.jobTitle || "Developer"
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-4 mb-4",
                                                    children: [
                                                        user.location && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "text-sm text-white/70 flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                    className: "w-4 h-4 mr-1",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: "2",
                                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                        }),
                                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: "2",
                                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        })
                                                                    ]
                                                                }),
                                                                user.location
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "text-sm text-white/70",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "font-medium text-white",
                                                                    children: user.followersCount || 0
                                                                }),
                                                                " followers"
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "text-sm text-white/70",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "font-medium text-white",
                                                                    children: user.followingCount || 0
                                                                }),
                                                                " following"
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex flex-wrap justify-center md:justify-start gap-3",
                                                    children: [
                                                        user.website && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: user.website.startsWith('http') ? user.website : `https://${user.website}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors",
                                                            children: "\uD83D\uDD17 Website"
                                                        }),
                                                        user.github && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: user.github.startsWith('http') ? user.github : `https://github.com/${user.github.replace(/^@|https:\/\/github\.com\//g, '')}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors",
                                                            children: "\uD83D\uDCBB GitHub"
                                                        }),
                                                        user.twitter && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: user.twitter.startsWith('http') ? user.twitter : `https://twitter.com/${user.twitter.replace(/^@|https:\/\/twitter\.com\//g, '')}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors",
                                                            children: "\uD83D\uDC26 Twitter"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "md:self-start",
                                            children: followButton
                                        })
                                    ]
                                }),
                                user.bio && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-6 pt-6 border-t border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "font-semibold mb-2",
                                            children: "About"
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-white/80",
                                            children: user.bio
                                        })
                                    ]
                                }),
                                user.skills && user.skills.length > 0 && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-6 pt-6 border-t border-white/10",
                                    children: [
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "font-semibold mb-3",
                                            children: "Skills"
                                        }),
                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: user.skills.map((skill, index)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xs bg-white/10 px-3 py-1 rounded-full",
                                                    children: skill
                                                }, index))
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex border-b border-white/10 mb-6",
                            children: [
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    className: `px-4 py-3 font-medium text-sm md:text-base ${activeTab === "projects" ? "border-b-2 border-cyan text-cyan" : "text-white/70 hover:text-white"}`,
                                    onClick: ()=>setActiveTab("projects"),
                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                size: 16,
                                                className: "mr-2"
                                            }),
                                            "Projects"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    className: `px-4 py-3 font-medium text-sm md:text-base ${activeTab === "forum" ? "border-b-2 border-cyan text-cyan" : "text-white/70 hover:text-white"}`,
                                    onClick: ()=>setActiveTab("forum"),
                                    children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                size: 16,
                                                className: "mr-2"
                                            }),
                                            "Forum Activity"
                                        ]
                                    })
                                })
                            ]
                        }),
                        activeTab === "projects" && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            children: projects.length > 0 ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                children: projects.map((project)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        href: `/projects/${project.id}`,
                                        className: "bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-40 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 relative",
                                                children: project.imageUrl && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: project.imageUrl,
                                                    alt: project.title,
                                                    className: "w-full h-full object-cover"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                        className: "font-bold mb-2 truncate",
                                                        children: project.title
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-sm text-white/70 mb-3 line-clamp-2",
                                                        children: project.description
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex flex-wrap gap-1 mb-3",
                                                        children: [
                                                            project.tags.slice(0, 3).map((tag, idx)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-xs px-2 py-0.5 bg-white/10 rounded-full",
                                                                    children: tag
                                                                }, idx)),
                                                            project.tags.length > 3 && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-xs px-2 py-0.5 bg-white/10 rounded-full",
                                                                children: [
                                                                    "+",
                                                                    project.tags.length - 3
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex justify-between text-xs text-white/60",
                                                        children: [
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                children: formatDate(project.createdAt)
                                                            }),
                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "flex items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                                className: "w-3 h-3 mr-1",
                                                                                fill: "currentColor",
                                                                                viewBox: "0 0 20 20",
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                                    d: "M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                                                                                })
                                                                            }),
                                                                            project.likes
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "flex items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                                className: "w-3 h-3 mr-1",
                                                                                fill: "currentColor",
                                                                                viewBox: "0 0 20 20",
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                                    fillRule: "evenodd",
                                                                                    d: "M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z",
                                                                                    clipRule: "evenodd"
                                                                                })
                                                                            }),
                                                                            project.comments
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, project.id))
                            }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-white/5 rounded-xl p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "inline-block p-3 bg-white/10 rounded-full mb-4",
                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                            size: 24,
                                            className: "text-white/40"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-lg font-bold mb-2",
                                        children: "No Projects Yet"
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-white/60",
                                        children: "This user hasn't created any projects yet."
                                    })
                                ]
                            })
                        }),
                        activeTab === "forum" && /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            children: forumActivity.length > 0 ? /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-4",
                                children: forumActivity.map((thread)=>/*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        href: `/forum/${thread.id}`,
                                        className: "block bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10",
                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start justify-between",
                                            children: [
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                            className: "font-medium mb-2",
                                                            children: thread.title
                                                        }),
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-3 text-sm text-white/70",
                                                            children: [
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "bg-white/10 px-2 py-0.5 rounded-full text-xs",
                                                                    children: thread.category
                                                                }),
                                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    children: formatDate(thread.createdAt)
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center text-sm text-white/70",
                                                    children: [
                                                        /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                            size: 14,
                                                            className: "mr-1"
                                                        }),
                                                        thread.replies
                                                    ]
                                                })
                                            ]
                                        })
                                    }, thread.id))
                            }) : /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-white/5 rounded-xl p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "inline-block p-3 bg-white/10 rounded-full mb-4",
                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Code_MessageCircle_UserMinus_UserPlus_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            size: 24,
                                            className: "text-white/40"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-lg font-bold mb-2",
                                        children: "No Forum Activity"
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-white/60",
                                        children: "This user hasn't posted in the forum yet."
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}


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

/***/ 43701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12907);
/* harmony import */ var react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server_edge__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"D:\\\\the360unity-master\\\\the360unity-master\\\\src\\\\app\\\\(dashboard)\\\\profile\\\\[username]\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\src\\app\\(dashboard)\\profile\\[username]\\page.tsx",
"default",
));


/***/ }),

/***/ 44708:
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ 52936:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 43701));


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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,5283,4256,5195,2283], () => (__webpack_exec__(28043)));
module.exports = __webpack_exports__;

})();