(() => {
var exports = {};
exports.id = 2621;
exports.ids = [2621];
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

/***/ 51301:
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

// NAMESPACE OBJECT: ./src/app/api/update-profile/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-route/module.compiled.js
var module_compiled = __webpack_require__(96559);
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-kind.js
var route_kind = __webpack_require__(48088);
// EXTERNAL MODULE: ./node_modules/next/dist/server/lib/patch-fetch.js
var patch_fetch = __webpack_require__(37719);
// EXTERNAL MODULE: ./node_modules/next/dist/api/server.js
var server = __webpack_require__(32190);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js + 3 modules
var auth = __webpack_require__(88443);
;// ./src/app/api/update-profile/route.ts


async function POST(req) {
    try {
        const { userId } = (0,auth/* auth */.j)();
        if (!userId) {
            return server.NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const data = await req.json();
        const { bio, jobTitle, location, website, github, twitter, skills } = data;
        // Convert skills from string to array if needed
        const skillsArray = typeof skills === "string" ? skills.split(",").map((skill)=>skill.trim()).filter((skill)=>skill !== "") : skills;
        try {
            // Import clerkClient dynamically to avoid the export error
            const { clerkClient } = await __webpack_require__.e(/* import() */ 8349).then(__webpack_require__.bind(__webpack_require__, 88349));
            // Update user metadata using clerk client
            const clerk = await clerkClient();
            const user = await clerk.users.updateUser(userId, {
                publicMetadata: {
                    bio,
                    jobTitle,
                    location,
                    website,
                    github,
                    twitter,
                    skills: skillsArray
                }
            });
            return server.NextResponse.json({
                success: true,
                user
            });
        } catch (clerkError) {
            console.error("Clerk API error:", clerkError);
            return server.NextResponse.json({
                error: "Clerk API error",
                message: clerkError.message || "Unknown Clerk error",
                details: JSON.stringify(clerkError)
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        return server.NextResponse.json({
            error: "Failed to update profile",
            message: error.message || "Unknown error",
            stack:  false ? 0 : undefined
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fupdate-profile%2Froute&name=app%2Fapi%2Fupdate-profile%2Froute&pagePath=private-next-app-dir%2Fapi%2Fupdate-profile%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fupdate-profile%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/update-profile/route",
        pathname: "/api/update-profile",
        filename: "route",
        bundlePath: "app/api/update-profile/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\update-profile\\route.ts",
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

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 79428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 96487:
/***/ (() => {



/***/ }),

/***/ 96559:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (false) {} else {
    if (false) {} else {
        if (false) {} else {
            if (false) {} else {
                module.exports = __webpack_require__(44870);
            }
        }
    }
}

//# sourceMappingURL=module.compiled.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443], () => (__webpack_exec__(51301)));
module.exports = __webpack_exports__;

})();