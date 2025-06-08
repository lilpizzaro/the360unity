"use strict";
exports.id = 6554;
exports.ids = [6554];
exports.modules = {

/***/ 916:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Star)
/* harmony export */ });
/* unused harmony export __iconNode */
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82614);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Star", __iconNode);
 //# sourceMappingURL=star.js.map


/***/ }),

/***/ 95142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ UserAvatar)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91125);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30474);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function UserAvatar({ src, alt = "User", size = "md", className = "", fallbackText }) {
    const [imageError, setImageError] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    // Convert size to pixels if it's a string
    const sizeInPixels = typeof size === "number" ? size : size === "sm" ? 24 : size === "md" ? 40 : size === "lg" ? 64 : 96; // xl
    // Get the first letter for the fallback
    const letter = fallbackText ? fallbackText.charAt(0).toUpperCase() : alt.charAt(0).toUpperCase();
    // Adjust font size based on avatar size
    const fontSize = sizeInPixels < 32 ? "text-xs" : sizeInPixels < 48 ? "text-sm" : sizeInPixels < 64 ? "text-base" : "text-xl";
    // Show fallback if no image URL or if image failed to load
    if (!src || imageError) {
        return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: `bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold ${className}`,
            style: {
                width: sizeInPixels,
                height: sizeInPixels
            },
            children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: fontSize,
                children: letter
            })
        });
    }
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: `relative rounded-full overflow-hidden ${className}`,
        style: {
            width: sizeInPixels,
            height: sizeInPixels
        },
        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
            src: src,
            alt: alt,
            width: sizeInPixels,
            height: sizeInPixels,
            className: "object-cover w-full h-full",
            onError: ()=>setImageError(true),
            unoptimized: src.includes('clerk.com')
        })
    });
}


/***/ }),

/***/ 96554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ ProjectsShowcase)
});

// EXTERNAL MODULE: ./node_modules/bippy/dist/jsx-runtime.js
var jsx_runtime = __webpack_require__(91125);
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js
var react = __webpack_require__(43210);
// EXTERNAL MODULE: ./node_modules/next/dist/api/image.js
var api_image = __webpack_require__(30474);
// EXTERNAL MODULE: ./node_modules/next/dist/client/app-dir/link.js
var app_dir_link = __webpack_require__(85814);
var link_default = /*#__PURE__*/__webpack_require__.n(app_dir_link);
// EXTERNAL MODULE: ./src/components/icons/index.tsx
var icons = __webpack_require__(31497);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/star.js
var star = __webpack_require__(916);
// EXTERNAL MODULE: ./node_modules/react-hot-toast/dist/index.mjs + 1 modules
var dist = __webpack_require__(37590);
// EXTERNAL MODULE: ./node_modules/@clerk/clerk-react/dist/esm/index.js + 52 modules
var esm = __webpack_require__(13781);
;// ./src/components/StarButton.tsx





function StarButton({ projectId, initialStarCount = 0, isStarred = false, size = 'md', showCount = true, className = '' }) {
    const { isSignedIn } = (0,esm/* useUser */.Jd)();
    const [starred, setStarred] = (0,react.useState)(isStarred);
    const [starCount, setStarCount] = (0,react.useState)(initialStarCount);
    const [isLoading, setIsLoading] = (0,react.useState)(false);
    const handleStar = async ()=>{
        if (!isSignedIn) {
            dist/* default */.Ay.error('Please sign in to star projects');
            return;
        }
        if (!projectId) {
            console.error('Project ID is missing');
            dist/* default */.Ay.error('Cannot star project: missing ID');
            return;
        }
        setIsLoading(true);
        try {
            ;
            const response = await fetch(`/api/projects/${projectId}/star`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            ;
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Server error: ${errorText}`);
                throw new Error(`Failed to star project: ${response.statusText}`);
            }
            const data = await response.json();
            ;
            setStarred(data.action === 'starred');
            setStarCount(data.starsCount);
            dist/* default */.Ay.success(`Project ${data.action}!`);
        } catch (error) {
            console.error('Error starring project:', error);
            dist/* default */.Ay.error(error instanceof Error ? error.message : 'Failed to star project');
        } finally{
            setIsLoading(false);
        }
    };
    // Size classes
    const sizeClasses = {
        sm: 'p-1.5 text-xs',
        md: 'p-2 text-sm',
        lg: 'p-2.5 text-base'
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
        onClick: handleStar,
        disabled: isLoading,
        className: `flex items-center gap-1.5 rounded-full transition-all ${starred ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'} ${sizeClasses[size]} ${className}`,
        "aria-label": starred ? 'Unstar project' : 'Star project',
        children: [
            isLoading ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin"
            }) : /*#__PURE__*/ (0,jsx_runtime.jsx)(star/* default */.A, {
                size: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
                className: starred ? 'fill-yellow-300' : ''
            }),
            showCount && /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: starCount
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/components/UserAvatar.tsx
var UserAvatar = __webpack_require__(95142);
;// ./src/components/ProjectCard.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






function ProjectCard({ id, title, description, image, author, githubUrl, liveUrl, technologies, stars, isStarred = false, featured = false }) {
    const [isHovered, setIsHovered] = (0,react.useState)(false);
    // Get tech icon based on tech name
    const getTechIcon = (tech)=>{
        if (!tech) return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* CodeIcon */.lo, {
            size: 12,
            className: "text-cyan"
        });
        switch(tech.toLowerCase()){
            case 'react':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* ReactIcon */.vR, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'next.js':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* NextjsIcon */._r, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'vue.js':
            case 'vue':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* VueIcon */.Xu, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'angular':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* AngularIcon */.K0, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'node.js':
            case 'node':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* NodejsIcon */.bY, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'python':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* PythonIcon */.un, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'typescript':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* TypeScriptIcon */.$0, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'javascript':
            case 'js':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* JavaScriptIcon */.js, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'go':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* GoIcon */.WL, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'rust':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* RustIcon */.I, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'docker':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* DockerIcon */.Mt, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'aws':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* AwsIcon */.Rn, {
                    size: 12,
                    className: "text-cyan"
                });
            case 'graphql':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* GraphQLIcon */.hf, {
                    size: 12,
                    className: "text-cyan"
                });
            default:
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* CodeIcon */.lo, {
                    size: 12,
                    className: "text-cyan"
                });
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: `bg-white/5 rounded-xl overflow-hidden border ${featured ? "border-cyan/30" : "border-white/10"} backdrop-blur-sm transition-all duration-300 hover:bg-white/10`,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "relative h-40 md:h-48 overflow-hidden",
                children: [
                    image ? /*#__PURE__*/ (0,jsx_runtime.jsx)(api_image["default"], {
                        src: image,
                        alt: title,
                        fill: true,
                        className: "object-cover transition-transform duration-700 ease-in-out",
                        style: {
                            transform: isHovered ? "scale(1.05)" : "scale(1)"
                        }
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            className: "text-lg text-gray-400",
                            children: "No Image"
                        })
                    }),
                    featured && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "absolute top-2 left-2 bg-cyan/80 text-xs font-medium py-1 px-2 rounded-full backdrop-blur-sm",
                        children: "Featured"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "absolute top-2 right-2",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(StarButton, {
                            projectId: id,
                            initialStarCount: stars,
                            isStarred: isStarred,
                            size: "sm"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "p-3 md:p-5",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        className: "font-semibold text-lg mb-1 text-white",
                        children: title
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-sm text-white/70 mb-3 line-clamp-2",
                        children: description
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex flex-wrap gap-1 mb-4",
                        children: [
                            technologies.slice(0, 3).map((tech, index)=>{
                                // Handle both string and object technologies
                                const techName = typeof tech === 'string' ? tech : tech.name;
                                const techColor = typeof tech === 'string' ? 'white' : tech.color || 'white';
                                return /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: `text-xs px-2 py-1 rounded-full bg-${techColor}/20 text-${techColor} border border-${techColor}/30 flex items-center gap-1`,
                                    children: [
                                        getTechIcon(techName),
                                        techName || 'Other'
                                    ]
                                }, index);
                            }),
                            technologies.length > 3 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                className: "text-xs px-2 py-1 rounded-full bg-white/10 text-white/70",
                                children: [
                                    "+",
                                    technologies.length - 3
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                        href: `/projects/${id}`,
                        className: "block w-full text-center mb-4 bg-cyan/20 border border-cyan/30 text-cyan rounded-lg py-2 hover:bg-cyan/30 transition-colors flex items-center justify-center gap-2 min-h-[44px]",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "3"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: "View Project"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(UserAvatar/* default */.A, {
                                        src: author?.avatar,
                                        alt: author?.name || "User",
                                        size: "sm",
                                        fallbackText: author?.name || "User"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                        className: "text-xs text-white/70",
                                        children: author?.name || "User"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    githubUrl && /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                                        href: githubUrl,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-white/70 hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* GithubIcon */.Nb, {
                                            size: 16
                                        })
                                    }),
                                    liveUrl && /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                                        href: liveUrl,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-white/70 hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* RocketIcon */.Ab, {
                                            size: 16
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// ./src/components/ProjectsShowcase.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



function ProjectsShowcase({ limit, showFilters = true }) {
    const [filter, setFilter] = (0,react.useState)("all");
    const [projects, setProjects] = (0,react.useState)([]);
    const [loading, setLoading] = (0,react.useState)(true);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react.useEffect)(()=>{
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally{
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);
    // Filter projects based on selected filter
    const filteredProjects = projects.filter((project)=>{
        if (filter === "all") return true;
        if (filter === "featured") return project.featured;
        if (filter === "popular") return project.stars > 50;
        // Filter by technology - handle both string and object technologies
        return project.technologies?.some?.((tech)=>{
            const techName = typeof tech === 'string' ? tech : tech.name;
            return techName?.toLowerCase() === filter.toLowerCase();
        }) || false;
    });
    // Get unique technologies for filter - handle both string and object technologies
    const technologies = Array.from(new Set(projects.flatMap((project)=>project.technologies?.map?.((tech)=>{
            return typeof tech === 'string' ? tech : tech.name;
        }).filter(Boolean) || [])));
    // Limit the number of projects if specified
    const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;
    // Get tech icon based on tech name
    const getTechIcon = (tech)=>{
        if (!tech) return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* CodeIcon */.lo, {
            size: 14,
            className: "text-white"
        });
        switch(tech.toLowerCase()){
            case 'react':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* ReactIcon */.vR, {
                    size: 14,
                    className: "text-white"
                });
            case 'next.js':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* NextjsIcon */._r, {
                    size: 14,
                    className: "text-white"
                });
            case 'vue.js':
            case 'vue':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* VueIcon */.Xu, {
                    size: 14,
                    className: "text-white"
                });
            case 'angular':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* AngularIcon */.K0, {
                    size: 14,
                    className: "text-white"
                });
            case 'node.js':
            case 'node':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* NodejsIcon */.bY, {
                    size: 14,
                    className: "text-white"
                });
            case 'python':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* PythonIcon */.un, {
                    size: 14,
                    className: "text-white"
                });
            case 'typescript':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* TypeScriptIcon */.$0, {
                    size: 14,
                    className: "text-white"
                });
            case 'javascript':
            case 'js':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* JavaScriptIcon */.js, {
                    size: 14,
                    className: "text-white"
                });
            case 'go':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* GoIcon */.WL, {
                    size: 14,
                    className: "text-white"
                });
            case 'rust':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* RustIcon */.I, {
                    size: 14,
                    className: "text-white"
                });
            case 'docker':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* DockerIcon */.Mt, {
                    size: 14,
                    className: "text-white"
                });
            case 'aws':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* AwsIcon */.Rn, {
                    size: 14,
                    className: "text-white"
                });
            case 'graphql':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* GraphQLIcon */.hf, {
                    size: 14,
                    className: "text-white"
                });
            default:
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(icons/* CodeIcon */.lo, {
                    size: 14,
                    className: "text-white"
                });
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "py-8",
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: [
                    ...Array(limit || 3)
                ].map((_, i)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "animate-pulse bg-white/5 rounded-xl p-4 h-64"
                    }, i))
            })
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "py-8",
        children: [
            showFilters && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex flex-wrap gap-2 mb-6",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        onClick: ()=>setFilter("all"),
                        className: `px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-cyan text-black" : "bg-white/10 hover:bg-white/20"}`,
                        children: "All"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        onClick: ()=>setFilter("featured"),
                        className: `px-3 py-1 rounded-full text-sm ${filter === "featured" ? "bg-cyan text-black" : "bg-white/10 hover:bg-white/20"}`,
                        children: "Featured"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        onClick: ()=>setFilter("popular"),
                        className: `px-3 py-1 rounded-full text-sm ${filter === "popular" ? "bg-cyan text-black" : "bg-white/10 hover:bg-white/20"}`,
                        children: "Popular"
                    }),
                    technologies.slice(0, 5).map((tech)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                            onClick: ()=>setFilter(tech),
                            className: `px-3 py-1 rounded-full text-sm flex items-center gap-1 ${filter === tech ? "bg-cyan text-black" : "bg-white/10 hover:bg-white/20"}`,
                            children: [
                                getTechIcon(tech),
                                tech
                            ]
                        }, tech))
                ]
            }),
            projects.length === 0 && !loading ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "text-center py-8",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-lg opacity-70",
                        children: "No projects found"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                        href: "/projects/new",
                        className: "text-cyan hover:underline mt-2 inline-block",
                        children: "Create your first project"
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: displayedProjects.map((project)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ProjectCard, {
                        ...project,
                        image: project.image,
                        technologies: project.technologies || [],
                        author: {
                            name: project.author?.name || '',
                            avatar: project.author?.avatar
                        }
                    }, project.id))
            })
        ]
    });
}


/***/ })

};
;