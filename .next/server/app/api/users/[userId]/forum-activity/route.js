(() => {
var exports = {};
exports.id = 7221;
exports.ids = [7221];
exports.modules = {

/***/ 3295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

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

/***/ 39727:
/***/ (() => {

/* (ignored) */

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

/***/ 56269:
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

// NAMESPACE OBJECT: ./src/app/api/users/[userId]/forum-activity/route.ts
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
// EXTERNAL MODULE: ./node_modules/@supabase/supabase-js/dist/module/index.js + 33 modules
var dist_module = __webpack_require__(39398);
;// ./src/app/api/users/[userId]/forum-activity/route.ts


async function GET(request, { params }) {
    try {
        // Make sure params is properly awaited
        const { userId } = params;
        if (!userId) {
            return server.NextResponse.json({
                error: "User ID is required"
            }, {
                status: 400
            });
        }
        ;
        // Initialize Supabase client
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
        // Query forum posts created by the user using the correct column names
        const { data: postsData, error: postsError } = await supabase.from("forum_posts").select(`
        id,
        title,
        category,
        created_at
      `).eq("author_id", userId).order("created_at", {
            ascending: false
        });
        if (postsError) {
            console.error("Error fetching forum posts:", postsError);
            // Return empty array instead of error
            return server.NextResponse.json([]);
        }
        if (!postsData || postsData.length === 0) {
            ;
            return server.NextResponse.json([]);
        }
        ;
        // Get comments count for each post - try with post_id first, fall back to forum_post_id if needed
        const postIds = postsData.map((post)=>post.id);
        let commentsResults = [];
        try {
            // First try with post_id
            const commentsPromises = postIds.map((postId)=>supabase.from("forum_comments").select("id", {
                    count: "exact",
                    head: true
                }).eq("post_id", postId));
            commentsResults = await Promise.all(commentsPromises);
            // Check if we got any results
            const hasResults = commentsResults.some((result)=>result.count !== null && result.count !== undefined);
            // If no results, try with forum_post_id
            if (!hasResults) {
                ;
                const alternatePromises = postIds.map((postId)=>supabase.from("forum_comments").select("id", {
                        count: "exact",
                        head: true
                    }).eq("forum_post_id", postId));
                commentsResults = await Promise.all(alternatePromises);
            }
        } catch (error) {
            console.error("Error fetching comment counts:", error);
            // Initialize with zeros if there's an error
            commentsResults = postIds.map(()=>({
                    count: 0
                }));
        }
        // Combine all data
        const forumActivity = postsData.map((post, index)=>{
            return {
                id: post.id,
                title: post.title,
                category: post.category || "General",
                createdAt: post.created_at,
                replies: commentsResults[index]?.count || 0
            };
        });
        return server.NextResponse.json(forumActivity);
    } catch (error) {
        console.error("Error fetching user forum activity:", error);
        // Return empty array instead of error for better UX
        return server.NextResponse.json([]);
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fusers%2F%5BuserId%5D%2Fforum-activity%2Froute&name=app%2Fapi%2Fusers%2F%5BuserId%5D%2Fforum-activity%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5BuserId%5D%2Fforum-activity%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2F%5BuserId%5D%2Fforum-activity%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/users/[userId]/forum-activity/route",
        pathname: "/api/users/[userId]/forum-activity",
        filename: "route",
        bundlePath: "app/api/users/[userId]/forum-activity/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\users\\[userId]\\forum-activity\\route.ts",
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

/***/ 63033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,9398], () => (__webpack_exec__(56269)));
module.exports = __webpack_exports__;

})();