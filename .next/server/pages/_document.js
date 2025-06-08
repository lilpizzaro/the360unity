"use strict";
(() => {
var exports = {};
exports.id = 3220;
exports.ids = [3220];
exports.modules = {

/***/ 7085:
/***/ ((module) => {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ 8732:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 33873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 40361:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");

/***/ }),

/***/ 41663:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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

module.exports = import("bippy/dist/jsx-runtime");;

/***/ }),

/***/ 82015:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2341], () => (__webpack_exec__(41663)));
module.exports = __webpack_exports__;

})();