(() => {
var exports = {};
exports.id = 3010;
exports.ids = [3010];
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

/***/ 11997:
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ 17653:
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

// NAMESPACE OBJECT: ./src/app/api/users/suggested/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET),
  dynamic: () => (dynamic)
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
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js
var clerkClient = __webpack_require__(65591);
// EXTERNAL MODULE: ./node_modules/@supabase/supabase-js/dist/module/index.js + 33 modules
var dist_module = __webpack_require__(39398);
;// ./src/app/api/users/suggested/route.ts



// This is needed to ensure the route is properly compiled
const dynamic = 'force-dynamic';
async function GET(request) {
    try {
        // Properly await auth() to fix the headers error
        const session = await (0,auth/* auth */.j)();
        const userId = session?.userId;
        if (!userId) {
            return server.NextResponse.json({
                error: "Unauthorized",
                message: "You must be logged in to see suggested users"
            }, {
                status: 401
            });
        }
        ;
        // Initialize Supabase client with the correct environment variables
        const supabaseUrl = "https://lvehgsniklchobuhjobl.supabase.co";
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZWhnc25pa2xjaG9idWhqb2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzE3NjMsImV4cCI6MjA2NDgwNzc2M30.p8pNolmkEENmts-WsTaHWkI6lFlZnLJuBkTUIi8zVqg";
        if (!supabaseUrl || !supabaseKey) {
            return server.NextResponse.json({
                error: "Configuration Error",
                message: "Supabase environment variables not set"
            }, {
                status: 500
            });
        }
        const supabase = (0,dist_module.createClient)(supabaseUrl, supabaseKey);
        // Get all users from Clerk
        const users = await clerkClient/* clerkClient */.$v.users.getUserList({
            limit: 10
        });
        ;
        // Filter out the current user
        const filteredUsers = users.filter((user)=>user.id !== userId);
        // Get followers data from Supabase
        const { data: followersData, error: followersError } = await supabase.from("followers").select("following_id").eq("follower_id", userId);
        if (followersError) {
            console.error("Error fetching followers:", followersError);
            return server.NextResponse.json({
                error: "Database Error",
                message: "Failed to fetch followers data",
                details: followersError
            }, {
                status: 500
            });
        }
        // Create a set of user IDs that the current user is following
        const followingSet = new Set(followersData?.map((row)=>row.following_id) || []);
        // Transform users data to include following status
        const suggestedUsers = filteredUsers.map((user)=>{
            const isFollowing = followingSet.has(user.id);
            // Determine the best username to display
            let displayUsername = user.username;
            // If username is null or undefined, use a formatted version of their name or ID
            if (!displayUsername) {
                if (user.firstName) {
                    // Convert to lowercase and remove spaces
                    displayUsername = user.firstName.toLowerCase().replace(/\s+/g, '-');
                    if (user.lastName) {
                        displayUsername += '-' + user.lastName.toLowerCase().replace(/\s+/g, '');
                    }
                } else {
                    // Use part of the user ID as a fallback
                    displayUsername = 'user-' + user.id.substring(5, 13);
                }
            }
            return {
                id: user.id,
                username: displayUsername,
                firstName: user.firstName || "User",
                lastName: user.lastName || "",
                imageUrl: user.imageUrl,
                followersCount: 0,
                isFollowing
            };
        });
        // Get followers count for each user
        for (const user of suggestedUsers){
            const { count, error: countError } = await supabase.from("followers").select("*", {
                count: "exact",
                head: true
            }).eq("following_id", user.id);
            if (countError) {
                console.error(`Error fetching followers count for user ${user.id}:`, countError);
            } else {
                user.followersCount = count || 0;
            }
        }
        ;
        return server.NextResponse.json(suggestedUsers);
    } catch (error) {
        console.error("Error in suggested users API:", error);
        return server.NextResponse.json({
            error: "Server Error",
            message: "An unexpected error occurred",
            details: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fusers%2Fsuggested%2Froute&name=app%2Fapi%2Fusers%2Fsuggested%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsuggested%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2Fsuggested%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/users/suggested/route",
        pathname: "/api/users/suggested",
        filename: "route",
        bundlePath: "app/api/users/suggested/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\users\\suggested\\route.ts",
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

/***/ 29294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 34631:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

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

/***/ 39727:
/***/ (() => {

/* (ignored) */

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

/***/ 47990:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 51906:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 51906;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 55511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 55591:
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 79428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 79551:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 81630:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 91645:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 94735:
/***/ ((module) => {

"use strict";
module.exports = require("events");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,9398], () => (__webpack_exec__(17653)));
module.exports = __webpack_exports__;

})();