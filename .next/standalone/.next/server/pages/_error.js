(() => {
var exports = {};
exports.id = 2731;
exports.ids = [636,2731,3220];
exports.modules = {

/***/ 1523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(63885).vendored.contexts.HeadManagerContext;

//# sourceMappingURL=head-manager-context.js.map

/***/ }),

/***/ 3147:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();

    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) return cache.get(obj);

    var newObj = { __proto__: null };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }

    newObj.default = obj;

    if (cache) cache.set(obj, newObj);

    return newObj;
}
exports._ = _interop_require_wildcard;


/***/ }),

/***/ 7085:
/***/ ((module) => {

"use strict";
module.exports = require("styled-jsx/style");

/***/ }),

/***/ 8732:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 17341:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
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
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __webpack_require__(87020);
const _interop_require_wildcard = __webpack_require__(3147);
const _jsxruntime = __webpack_require__(8732);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(82015));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__webpack_require__(95996));
const _ampcontextsharedruntime = __webpack_require__(57043);
const _headmanagercontextsharedruntime = __webpack_require__(1523);
const _ampmode = __webpack_require__(28725);
const _warnonce = __webpack_require__(83901);
function defaultHead(inAmpMode) {
    if (inAmpMode === void 0) inAmpMode = false;
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset")
    ];
    if (!inAmpMode) {
        head.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport"));
    }
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements, props) {
    const { inAmpMode } = props;
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead(inAmpMode).reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ( true && process.env.__NEXT_OPTIMIZE_FONTS && !inAmpMode) {
            if (c.type === 'link' && c.props['href'] && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
            [
                'https://fonts.googleapis.com/css',
                'https://use.typekit.net/'
            ].some((url)=>c.props['href'].startsWith(url))) {
                const newProps = {
                    ...c.props || {}
                };
                newProps['data-href'] = newProps['href'];
                newProps['href'] = undefined;
                // Add this attribute to make it easy to identify optimized tags
                newProps['data-optimized-fonts'] = true;
                return /*#__PURE__*/ _react.default.cloneElement(c, newProps);
            }
        }
        if (false) {}
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head(param) {
    let { children } = param;
    const ampState = (0, _react.useContext)(_ampcontextsharedruntime.AmpStateContext);
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        inAmpMode: (0, _ampmode.isInAmpMode)(ampState),
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map


/***/ }),

/***/ 28725:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isInAmpMode", ({
    enumerable: true,
    get: function() {
        return isInAmpMode;
    }
}));
function isInAmpMode(param) {
    let { ampFirst = false, hybrid = false, hasQuery = false } = param === void 0 ? {} : param;
    return ampFirst || hybrid && hasQuery;
} //# sourceMappingURL=amp-mode.js.map


/***/ }),

/***/ 33873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 35124:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/* eslint-disable no-redeclare */ 
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
    NEXT_REQUEST_META: function() {
        return NEXT_REQUEST_META;
    },
    addRequestMeta: function() {
        return addRequestMeta;
    },
    getRequestMeta: function() {
        return getRequestMeta;
    },
    removeRequestMeta: function() {
        return removeRequestMeta;
    },
    setRequestMeta: function() {
        return setRequestMeta;
    }
});
const NEXT_REQUEST_META = Symbol.for('NextInternalRequestMeta');
function getRequestMeta(req, key) {
    const meta = req[NEXT_REQUEST_META] || {};
    return typeof key === 'string' ? meta[key] : meta;
}
function setRequestMeta(req, meta) {
    req[NEXT_REQUEST_META] = meta;
    return meta;
}
function addRequestMeta(request, key, value) {
    const meta = getRequestMeta(request);
    meta[key] = value;
    return setRequestMeta(request, meta);
}
function removeRequestMeta(request, key) {
    const meta = getRequestMeta(request);
    delete meta[key];
    return setRequestMeta(request, meta);
}

//# sourceMappingURL=request-meta.js.map

/***/ }),

/***/ 36411:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyApp)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51472);
/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76142);
/* harmony import */ var _app_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_globals_css__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__]);
bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {
        ...pageProps
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 40361:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");

/***/ }),

/***/ 41663:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51472);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7085);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(82341);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__]);
bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function Document() {
    return /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {
        lang: "en",
        children: [
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", {
                        src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
                        defer: true
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
                        rel: "stylesheet"
                    })
                ]
            }),
            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                className: "jsx-da995ae0c3bdadf5",
                children: [
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        id: "app-loading",
                        className: "jsx-da995ae0c3bdadf5" + " " + "fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-50",
                        children: [
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                id: "loading-canvas-container",
                                className: "jsx-da995ae0c3bdadf5" + " " + "absolute inset-0 z-0"
                            }),
                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "jsx-da995ae0c3bdadf5" + " " + "w-full max-w-md px-8 flex flex-col items-center z-10",
                                children: [
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "jsx-da995ae0c3bdadf5" + " " + "mb-8 text-center logo-container",
                                        children: [
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                                className: "jsx-da995ae0c3bdadf5" + " " + "text-3xl sm:text-4xl font-bold text-white logo-text",
                                                children: "THE360UNITY"
                                            }),
                                            /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "jsx-da995ae0c3bdadf5" + " " + "text-white/60 text-sm mt-2 tracking-wide",
                                                children: "DEVELOPER COMMUNITY"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "jsx-da995ae0c3bdadf5" + " " + "relative w-72 h-2 bg-white/10 rounded-full overflow-hidden mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                                        children: /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "jsx-da995ae0c3bdadf5" + " " + "loading-bar absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "jsx-da995ae0c3bdadf5" + " " + "loading-text text-white/80 text-base font-medium shadow-[0_0_10px_rgba(255,255,255,0.2)] tracking-wide",
                                        children: "Initializing..."
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", {
                        dangerouslySetInnerHTML: {
                            __html: `
            // Initialize 3D background when document is loaded
            document.addEventListener('DOMContentLoaded', () => {
              // Check if Three.js is loaded
              if (typeof THREE !== 'undefined') {
                initThreeJsBackground();
              } else {
                // Fallback if Three.js failed to load
                console.warn('Three.js not loaded, falling back to static loading screen');
              }
            });

            // Initialize Three.js background
            function initThreeJsBackground() {
              try {
                // Initialize Three.js scene
                const container = document.getElementById('loading-canvas-container');
                if (!container) return;
                
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setClearColor(0x000000, 0);
                container.appendChild(renderer.domElement);
                
                // Create particles
                const particlesGeometry = new THREE.BufferGeometry();
                const particlesCount = 2000;
                
                const posArray = new Float32Array(particlesCount * 3);
                
                for(let i = 0; i < particlesCount * 3; i++) {
                  // Create a sphere of particles
                  posArray[i] = (Math.random() - 0.5) * 5;
                }
                
                particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                
                // Create material
                const particlesMaterial = new THREE.PointsMaterial({
                  size: 0.02,
                  color: 0x22d3ee,
                  transparent: true,
                  opacity: 0.8,
                  blending: THREE.AdditiveBlending
                });
                
                // Create mesh
                const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
                scene.add(particlesMesh);
                
                // Create a torus
                const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
                const torusMaterial = new THREE.MeshBasicMaterial({ 
                  color: 0x3b82f6,
                  transparent: true,
                  opacity: 0.2,
                  wireframe: true
                });
                const torus = new THREE.Mesh(torusGeometry, torusMaterial);
                scene.add(torus);
                
                // Create a second torus at different angle
                const torus2Geometry = new THREE.TorusGeometry(1.5, 0.2, 16, 100);
                const torus2Material = new THREE.MeshBasicMaterial({ 
                  color: 0x8b5cf6,
                  transparent: true,
                  opacity: 0.15,
                  wireframe: true
                });
                const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
                torus2.rotation.x = Math.PI / 4;
                scene.add(torus2);
                
                // Position camera
                camera.position.z = 3;
                
                // Animation
                function animate() {
                  if (document.getElementById('loading-canvas-container')) {
                    requestAnimationFrame(animate);
                    
                    particlesMesh.rotation.y += 0.001;
                    particlesMesh.rotation.x += 0.0005;
                    
                    torus.rotation.x += 0.01;
                    torus.rotation.y += 0.005;
                    
                    torus2.rotation.x += 0.005;
                    torus2.rotation.z += 0.008;
                    
                    renderer.render(scene, camera);
                  }
                }
                
                // Handle window resize
                window.addEventListener('resize', () => {
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  renderer.setSize(window.innerWidth, window.innerHeight);
                });
                
                animate();
              } catch (e) {
                console.error('Error initializing Three.js background:', e);
              }
            }

            // Update loading text periodically
            let loadingTexts = ["Initializing...", "Loading resources...", "Preparing workspace...", "Almost ready..."];
            let currentTextIndex = 0;
            
            const textInterval = setInterval(() => {
              const loadingTextEl = document.querySelector('.loading-text');
              if (loadingTextEl) {
                currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
                loadingTextEl.textContent = loadingTexts[currentTextIndex];
              }
            }, 2000);

            // Hide loading screen when app is loaded
            function hideLoadingScreen() {
              clearInterval(textInterval);
              const loadingEl = document.getElementById('app-loading');
              if (loadingEl) {
                loadingEl.style.opacity = '0';
                setTimeout(() => {
                  loadingEl.style.display = 'none';
                }, 500);
              }
            }
            
            // Add event listener for when the app is loaded
            window.addEventListener('load', () => {
              // Wait a bit to ensure React has hydrated
              setTimeout(hideLoadingScreen, 1000);
            });

            // Fallback in case the load event doesn't fire
            setTimeout(hideLoadingScreen, 5000);
          `
                        },
                        className: "jsx-da995ae0c3bdadf5"
                    }),
                    /*#__PURE__*/ (0,bippy_dist_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default()), {
                        id: "da995ae0c3bdadf5",
                        children: '#app-loading{-webkit-transition:opacity.5s ease;-moz-transition:opacity.5s ease;-o-transition:opacity.5s ease;transition:opacity.5s ease;font-family:"Inter",sans-serif}.logo-container{-webkit-animation:fadeInDown 1s ease-out forwards;-moz-animation:fadeInDown 1s ease-out forwards;-o-animation:fadeInDown 1s ease-out forwards;animation:fadeInDown 1s ease-out forwards}.logo-text{letter-spacing:-.5px;-webkit-filter:drop-shadow(0 0 8px rgba(255,255,255,.3));filter:drop-shadow(0 0 8px rgba(255,255,255,.3))}.loading-bar{width:30%;-webkit-animation:loading-bar-animation 2s infinite cubic-bezier(.4,0,.2,1);-moz-animation:loading-bar-animation 2s infinite cubic-bezier(.4,0,.2,1);-o-animation:loading-bar-animation 2s infinite cubic-bezier(.4,0,.2,1);animation:loading-bar-animation 2s infinite cubic-bezier(.4,0,.2,1)}.loading-text{-webkit-animation:loading-text-animation 2s infinite ease-in-out;-moz-animation:loading-text-animation 2s infinite ease-in-out;-o-animation:loading-text-animation 2s infinite ease-in-out;animation:loading-text-animation 2s infinite ease-in-out;letter-spacing:.5px}@-webkit-keyframes loading-bar-animation{0%{width:0%;left:0%}50%{width:100%;left:0%}100%{width:0%;left:100%}}@-moz-keyframes loading-bar-animation{0%{width:0%;left:0%}50%{width:100%;left:0%}100%{width:0%;left:100%}}@-o-keyframes loading-bar-animation{0%{width:0%;left:0%}50%{width:100%;left:0%}100%{width:0%;left:100%}}@keyframes loading-bar-animation{0%{width:0%;left:0%}50%{width:100%;left:0%}100%{width:0%;left:100%}}@-webkit-keyframes loading-text-animation{0%,100%{opacity:.6}50%{opacity:1}}@-moz-keyframes loading-text-animation{0%,100%{opacity:.6}50%{opacity:1}}@-o-keyframes loading-text-animation{0%,100%{opacity:.6}50%{opacity:1}}@keyframes loading-text-animation{0%,100%{opacity:.6}50%{opacity:1}}@-webkit-keyframes fadeInDown{from{opacity:0;-webkit-transform:translatey(-20px);transform:translatey(-20px)}to{opacity:1;-webkit-transform:translatey(0);transform:translatey(0)}}@-moz-keyframes fadeInDown{from{opacity:0;-moz-transform:translatey(-20px);transform:translatey(-20px)}to{opacity:1;-moz-transform:translatey(0);transform:translatey(0)}}@-o-keyframes fadeInDown{from{opacity:0;-o-transform:translatey(-20px);transform:translatey(-20px)}to{opacity:1;-o-transform:translatey(0);transform:translatey(0)}}@keyframes fadeInDown{from{opacity:0;-webkit-transform:translatey(-20px);-moz-transform:translatey(-20px);-o-transform:translatey(-20px);transform:translatey(-20px)}to{opacity:1;-webkit-transform:translatey(0);-moz-transform:translatey(0);-o-transform:translatey(0);transform:translatey(0)}}'
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 51472:
/***/ ((module) => {

"use strict";
module.exports = import("bippy/dist/jsx-runtime");;

/***/ }),

/***/ 57043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(63885).vendored.contexts.AmpContext;

//# sourceMappingURL=amp-context.js.map

/***/ }),

/***/ 58527:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),
/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),
/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),
/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63885);
/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80237);
/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81413);
/* harmony import */ var private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41663);
/* harmony import */ var private_next_pages_app_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36411);
/* harmony import */ var next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66631);
/* harmony import */ var next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__, private_next_pages_app_js__WEBPACK_IMPORTED_MODULE_4__]);
([private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__, private_next_pages_app_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



// Import the app and document modules.


// Import the userland code.

// Re-export the component (should be the default export).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'default'));
// Re-export methods.
const getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');
const getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');
const getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');
const config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'config');
const reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');
// Re-export legacy methods.
const unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');
const unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');
const unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');
const unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');
const unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .M)(next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');
// Create and export the route module that will be consumed.
const routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__/* .RouteKind */ .A.PAGES,
        page: "/_error",
        pathname: "/_error",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    components: {
        // default export might not exist when optimized for data only
        App: private_next_pages_app_js__WEBPACK_IMPORTED_MODULE_4__["default"],
        Document: private_next_pages_document_tsx__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    userland: next_dist_pages_error__WEBPACK_IMPORTED_MODULE_5__
});

//# sourceMappingURL=pages.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 66631:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return Error;
    }
}));
const _interop_require_default = __webpack_require__(87020);
const _jsxruntime = __webpack_require__(8732);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(82015));
const _head = /*#__PURE__*/ _interop_require_default._(__webpack_require__(17341));
const statusCodes = {
    400: 'Bad Request',
    404: 'This page could not be found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error'
};
function _getInitialProps(param) {
    let { req, res, err } = param;
    const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
    let hostname;
    if (false) {} else if (req) {
        const { getRequestMeta } = __webpack_require__(35124);
        const initUrl = getRequestMeta(req, 'initURL');
        if (initUrl) {
            const url = new URL(initUrl);
            hostname = url.hostname;
        }
    }
    return {
        statusCode,
        hostname
    };
}
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        lineHeight: '48px'
    },
    h1: {
        display: 'inline-block',
        margin: '0 20px 0 0',
        paddingRight: 23,
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: 'top'
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '28px'
    },
    wrap: {
        display: 'inline-block'
    }
};
class Error extends _react.default.Component {
    render() {
        const { statusCode, withDarkMode = true } = this.props;
        const title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            style: styles.error,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)("title", {
                        children: statusCode ? statusCode + ": " + title : 'Application error: a client-side exception has occurred'
                    })
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    style: styles.desc,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                            dangerouslySetInnerHTML: {
                                /* CSS minified from
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                ${
                  withDarkMode
                    ? `@media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }`
                    : ''
                }
               */ __html: "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}" + (withDarkMode ? '@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}' : '')
                            }
                        }),
                        statusCode ? /*#__PURE__*/ (0, _jsxruntime.jsx)("h1", {
                            className: "next-error-h1",
                            style: styles.h1,
                            children: statusCode
                        }) : null,
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                            style: styles.wrap,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("h2", {
                                style: styles.h2,
                                children: [
                                    this.props.title || statusCode ? title : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                        children: [
                                            "Application error: a client-side exception has occurred",
                                            ' ',
                                            Boolean(this.props.hostname) && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                                children: [
                                                    "while loading ",
                                                    this.props.hostname
                                                ]
                                            }),
                                            ' ',
                                            "(see the browser console for more information)"
                                        ]
                                    }),
                                    "."
                                ]
                            })
                        })
                    ]
                })
            ]
        });
    }
}
Error.displayName = 'ErrorPage';
Error.getInitialProps = _getInitialProps;
Error.origGetInitialProps = _getInitialProps;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=_error.js.map


/***/ }),

/***/ 76142:
/***/ (() => {



/***/ }),

/***/ 80237:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "A", ({
    enumerable: true,
    get: function() {
        return RouteKind;
    }
}));
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({});

//# sourceMappingURL=route-kind.js.map

/***/ }),

/***/ 81413:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ 
__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "M", ({
    enumerable: true,
    get: function() {
        return hoist;
    }
}));
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
}

//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 82015:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 83901:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "warnOnce", ({
    enumerable: true,
    get: function() {
        return warnOnce;
    }
}));
let warnOnce = (_)=>{};
if (false) {} //# sourceMappingURL=warn-once.js.map


/***/ }),

/***/ 95996:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return SideEffect;
    }
}));
const _react = __webpack_require__(82015);
const isServer = "undefined" === 'undefined';
const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements, props));
        }
    }
    if (isServer) {
        var _headManager_mountedInstances;
        headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect(()=>{
        var _headManager_mountedInstances;
        headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
        return ()=>{
            var _headManager_mountedInstances;
            headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.delete(props.children);
        };
    });
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect(()=>{
        if (headManager) {
            headManager._pendingUpdate = emitChange;
        }
        return ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
        };
    });
    useClientOnlyEffect(()=>{
        if (headManager && headManager._pendingUpdate) {
            headManager._pendingUpdate();
            headManager._pendingUpdate = null;
        }
        return ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
        };
    });
    return null;
} //# sourceMappingURL=side-effect.js.map


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2341], () => (__webpack_exec__(58527)));
module.exports = __webpack_exports__;

})();