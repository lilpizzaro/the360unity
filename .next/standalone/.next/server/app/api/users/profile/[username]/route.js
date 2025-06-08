(() => {
var exports = {};
exports.id = 6747;
exports.ids = [6747];
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

/***/ 65591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $v: () => (/* binding */ clerkClient)
/* harmony export */ });
/* unused harmony export createClerkClient */
/* harmony import */ var _clerk_backend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10773);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5020);


const clerkClient = (0,_clerk_backend__WEBPACK_IMPORTED_MODULE_0__/* .Clerk */ .c2)({
  apiKey: _constants__WEBPACK_IMPORTED_MODULE_1__/* .API_KEY */ .Lq,
  secretKey: _constants__WEBPACK_IMPORTED_MODULE_1__/* .SECRET_KEY */ .rB,
  apiUrl: _constants__WEBPACK_IMPORTED_MODULE_1__/* .API_URL */ .H$,
  apiVersion: _constants__WEBPACK_IMPORTED_MODULE_1__/* .API_VERSION */ .mG,
  userAgent: `${"@clerk/nextjs"}@${"4.31.8"}`,
  proxyUrl: _constants__WEBPACK_IMPORTED_MODULE_1__/* .PROXY_URL */ .Rg,
  domain: _constants__WEBPACK_IMPORTED_MODULE_1__/* .DOMAIN */ .V2,
  isSatellite: _constants__WEBPACK_IMPORTED_MODULE_1__/* .IS_SATELLITE */ .fS
});
const createClerkClient = (/* unused pure expression or super */ null && (Clerk));



//# sourceMappingURL=clerkClient.js.map

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

/***/ 96291:
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

// NAMESPACE OBJECT: ./src/app/api/users/profile/[username]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-route/module.compiled.js
var module_compiled = __webpack_require__(96559);
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-kind.js
var route_kind = __webpack_require__(48088);
// EXTERNAL MODULE: ./node_modules/next/dist/server/lib/patch-fetch.js
var patch_fetch = __webpack_require__(37719);
// EXTERNAL MODULE: ./node_modules/next/dist/api/server.js
var server = __webpack_require__(32190);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js
var clerkClient = __webpack_require__(65591);
;// ./src/app/api/users/profile/[username]/route.ts


async function GET(request, { params }) {
    try {
        // Make sure params is properly awaited - in Next.js 14+, params is already resolved
        const { username } = params;
        if (!username) {
            return server.NextResponse.json({
                error: "Username is required"
            }, {
                status: 400
            });
        }
        ;
        // Try to find the user by exact username first
        let users = await clerkClient/* clerkClient */.$v.users.getUserList({
            limit: 100
        });
        ;
        // First try exact match
        let matchedUsers = users.filter((u)=>u.username === username);
        // If no exact match, try to match by user ID
        if (matchedUsers.length === 0 && username.startsWith("user_")) {
            matchedUsers = users.filter((u)=>u.id === username);
        }
        // If still no match, try to match by partial username (e.g., "user-user_2yB" should match "user_2yB")
        if (matchedUsers.length === 0) {
            matchedUsers = users.filter((u)=>{
                // Check if the username contains the user ID
                if (u.id && username.includes(u.id)) return true;
                // Check if the user ID is part of the URL username
                if (u.username && username.includes(u.username)) return true;
                return false;
            });
        }
        if (matchedUsers.length === 0) {
            ;
            return server.NextResponse.json({
                error: "User not found"
            }, {
                status: 404
            });
        }
        const user = matchedUsers[0];
        ;
        // Extract skills from metadata
        const skills = user.unsafeMetadata?.skills || [];
        // Format user data
        const userData = {
            id: user.id,
            username: user.username || user.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            imageUrl: user.imageUrl,
            bio: user.unsafeMetadata?.bio || "",
            jobTitle: user.unsafeMetadata?.jobTitle || "",
            location: user.unsafeMetadata?.location || "",
            website: user.unsafeMetadata?.website || "",
            github: user.unsafeMetadata?.github || "",
            twitter: user.unsafeMetadata?.twitter || "",
            skills,
            // We'll fetch these counts from the frontend separately
            followersCount: 0,
            followingCount: 0
        };
        return server.NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return server.NextResponse.json({
            error: "Server Error",
            message: "An unexpected error occurred",
            details: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fusers%2Fprofile%2F%5Busername%5D%2Froute&name=app%2Fapi%2Fusers%2Fprofile%2F%5Busername%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fprofile%2F%5Busername%5D%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2Fprofile%2F%5Busername%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/users/profile/[username]/route",
        pathname: "/api/users/profile/[username]",
        filename: "route",
        bundlePath: "app/api/users/profile/[username]/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\users\\profile\\[username]\\route.ts",
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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296], () => (__webpack_exec__(96291)));
module.exports = __webpack_exports__;

})();