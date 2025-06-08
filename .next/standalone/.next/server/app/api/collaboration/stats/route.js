(() => {
var exports = {};
exports.id = 9649;
exports.ids = [9649];
exports.modules = {

/***/ 3295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 8048:
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

// NAMESPACE OBJECT: ./src/app/api/collaboration/stats/route.ts
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
// EXTERNAL MODULE: ./src/lib/supabase.ts
var supabase = __webpack_require__(56621);
;// ./src/app/api/collaboration/stats/route.ts


const dynamic = "force-static";
async function GET() {
    try {
        // Check if table exists first
        const { data: tableExists, error: tableCheckError } = await supabase/* supabase */.ND.from('collab_rooms').select('id', {
            count: 'exact',
            head: true
        }).limit(1);
        // If there was an error checking the table or it doesn't exist, return 0
        if (tableCheckError || tableExists === null) {
            ;
            return server.NextResponse.json({
                count: 0,
                message: "Collaboration stats retrieved successfully"
            });
        }
        // Get count of active collaboration rooms
        const { count, error } = await supabase/* supabase */.ND.from('collab_rooms').select('*', {
            count: 'exact',
            head: true
        });
        if (error) {
            console.error("Error fetching collaboration stats:", error);
            return server.NextResponse.json({
                error: "Failed to fetch collaboration stats"
            }, {
                status: 500
            });
        }
        return server.NextResponse.json({
            count: count || 0,
            message: "Collaboration stats retrieved successfully"
        });
    } catch (error) {
        console.error("Error in collaboration stats GET route:", error);
        return server.NextResponse.json({
            error: "Internal server error",
            count: 0
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fcollaboration%2Fstats%2Froute&name=app%2Fapi%2Fcollaboration%2Fstats%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcollaboration%2Fstats%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fcollaboration%2Fstats%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/collaboration/stats/route",
        pathname: "/api/collaboration/stats",
        filename: "route",
        bundlePath: "app/api/collaboration/stats/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\collaboration\\stats\\route.ts",
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

/***/ 56621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ND: () => (/* binding */ supabase)
/* harmony export */ });
/* unused harmony exports storageConfig, uploadProjectFile, getProjectFiles */
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39398);

// Use environment variables from .env.local
const supabaseUrl = "https://lvehgsniklchobuhjobl.supabase.co" || 0;
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZWhnc25pa2xjaG9idWhqb2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzE3NjMsImV4cCI6MjA2NDgwNzc2M30.p8pNolmkEENmts-WsTaHWkI6lFlZnLJuBkTUIi8zVqg" || 0;
const supabaseServiceRoleKey = process.env.SUPABASE_KEY || '';
// Create Supabase client - use service role key for server-side API routes
const isServer = "undefined" === 'undefined';
const supabaseKey = isServer ? supabaseServiceRoleKey : supabaseAnonKey;
// Detect if we're in production
const isProduction = (/* unused pure expression or super */ null && ("production" === 'production'));
// Create Supabase client with conditional Realtime config
let supabase;
try {
    // Try to create client with realtime enabled
    supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true
        },
        realtime: {
            params: {
                eventsPerSecond: 10
            }
        }
    });
} catch (error) {
    console.error('Error creating Supabase client with realtime:', error);
    // Fallback to client without realtime
    supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true
        },
        realtime: false
    });
}

// Storage configuration from environment variables
const storageConfig = {
    accessKeyId: "d163df626469d09c3f29afa4406f9d0a" || 0 || 0,
    secretAccessKey: "6a24cdc6af0c14d1a6fce27e167fb8ba00425285d1db58907a96629bbd6a5493" || 0 || 0
};
// Storage helper functions
const uploadProjectFile = async (file, projectId, userId)=>{
    try {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${projectId}/${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('projects').upload(filePath, file);
        if (error) throw error;
        // Get public URL
        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(filePath);
        return urlData.publicUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
const getProjectFiles = async (projectId, userId)=>{
    try {
        const { data, error } = await supabase.storage.from('projects').list(`${userId}/${projectId}`);
        if (error) throw error;
        return data.map((file)=>{
            const { data: urlData } = supabase.storage.from('projects').getPublicUrl(`${userId}/${projectId}/${file.name}`);
            return urlData.publicUrl;
        });
    } catch (error) {
        console.error('Error getting project files:', error);
        return [];
    }
};


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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,9398], () => (__webpack_exec__(8048)));
module.exports = __webpack_exports__;

})();