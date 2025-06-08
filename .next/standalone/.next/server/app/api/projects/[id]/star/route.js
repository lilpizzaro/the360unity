(() => {
var exports = {};
exports.id = 6945;
exports.ids = [6945];
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

/***/ 30145:
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

// NAMESPACE OBJECT: ./src/app/api/projects/[id]/star/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST),
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
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/index.js + 12 modules
var esm = __webpack_require__(65755);
// EXTERNAL MODULE: ./node_modules/@supabase/supabase-js/dist/module/index.js + 33 modules
var dist_module = __webpack_require__(39398);
;// ./src/app/api/projects/[id]/star/route.ts



// This is needed to ensure the route is properly compiled
const dynamic = 'force-dynamic';
async function POST(request, context) {
    try {
        const params = await context.params;
        ;
        // Get authenticated user
        const { userId } = await (0,esm/* auth */.j2)();
        if (!userId) {
            ;
            return server.NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { id } = params;
        if (!id) {
            ;
            return server.NextResponse.json({
                error: "Project ID is required"
            }, {
                status: 400
            });
        }
        ;
        // Initialize Supabase client
        const supabaseUrl = "https://lvehgsniklchobuhjobl.supabase.co";
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZWhnc25pa2xjaG9idWhqb2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzE3NjMsImV4cCI6MjA2NDgwNzc2M30.p8pNolmkEENmts-WsTaHWkI6lFlZnLJuBkTUIi8zVqg";
        if (!supabaseUrl || !supabaseKey) {
            ;
            return server.NextResponse.json({
                error: "Configuration Error",
                message: "Supabase environment variables not set"
            }, {
                status: 500
            });
        }
        const supabase = (0,dist_module.createClient)(supabaseUrl, supabaseKey);
        // Check if the project_likes table exists
        const { error: checkTableError } = await supabase.from('project_likes').select('*').limit(1);
        // If the table doesn't exist, create it
        if (checkTableError && checkTableError.code === '42P01') {
            ;
            try {
                // Create the project_likes table using SQL
                const { error: createError } = await supabase.rpc('execute_sql', {
                    sql_query: `
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE IF NOT EXISTS project_likes (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              project_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              UNIQUE(project_id, user_id)
            );
          `
                });
                if (createError) {
                    console.error("Failed to create project_likes table:", createError);
                    return server.NextResponse.json({
                        error: "Failed to create required database table",
                        details: createError
                    }, {
                        status: 500
                    });
                }
                ;
            } catch (createError) {
                console.error("Failed to create table:", createError);
                return server.NextResponse.json({
                    error: "Failed to create required database table",
                    details: createError
                }, {
                    status: 500
                });
            }
        } else if (checkTableError) {
            console.error("Error checking table existence:", checkTableError);
            return server.NextResponse.json({
                error: "Database error",
                details: checkTableError
            }, {
                status: 500
            });
        }
        // Check if the user has already starred the project
        const { data: existingStar, error: checkError } = await supabase.from("project_likes").select("*").eq("project_id", id).eq("user_id", userId).single();
        if (checkError && checkError.code !== 'PGRST116') {
            console.error("Error checking star status:", checkError);
            return server.NextResponse.json({
                error: "Failed to check star status",
                details: checkError
            }, {
                status: 500
            });
        }
        let action = 'starred';
        // If the user has already starred, remove the star (toggle)
        if (existingStar) {
            ;
            const { error: deleteError } = await supabase.from("project_likes").delete().eq("project_id", id).eq("user_id", userId);
            if (deleteError) {
                console.error("Error removing star:", deleteError);
                return server.NextResponse.json({
                    error: "Failed to remove star",
                    details: deleteError
                }, {
                    status: 500
                });
            }
            action = 'unstarred';
        } else {
            ;
            const { error: insertError } = await supabase.from("project_likes").insert({
                project_id: id,
                user_id: userId,
                created_at: new Date().toISOString()
            });
            if (insertError) {
                console.error("Error adding star:", insertError);
                return server.NextResponse.json({
                    error: "Failed to add star",
                    details: insertError
                }, {
                    status: 500
                });
            }
        }
        // Update the stars count in the projects table
        const { count: starsCount, error: countError } = await supabase.from("project_likes").select("*", {
            count: "exact",
            head: true
        }).eq("project_id", id);
        if (countError) {
            console.error("Error counting stars:", countError);
        }
        // Try to update the project's star count
        const { error: updateError } = await supabase.from("projects").update({
            stars: starsCount || 0
        }).eq("id", id);
        if (updateError) {
            console.error("Error updating project star count:", updateError);
        }
        ;
        return server.NextResponse.json({
            success: true,
            action,
            starsCount: starsCount || 0
        });
    } catch (error) {
        console.error("Error in star project API:", error);
        return server.NextResponse.json({
            error: "Server Error",
            message: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fprojects%2F%5Bid%5D%2Fstar%2Froute&name=app%2Fapi%2Fprojects%2F%5Bid%5D%2Fstar%2Froute&pagePath=private-next-app-dir%2Fapi%2Fprojects%2F%5Bid%5D%2Fstar%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fprojects%2F%5Bid%5D%2Fstar%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/projects/[id]/star/route",
        pathname: "/api/projects/[id]/star",
        filename: "route",
        bundlePath: "app/api/projects/[id]/star/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\projects\\[id]\\star\\route.ts",
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

/***/ 54299:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 63441));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7791));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 12918));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 62278));


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

/***/ 91091:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7161));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 93821));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 54976));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 50044));


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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,5283,9398,1283], () => (__webpack_exec__(30145)));
module.exports = __webpack_exports__;

})();