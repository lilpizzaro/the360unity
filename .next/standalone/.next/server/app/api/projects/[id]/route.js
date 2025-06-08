(() => {
var exports = {};
exports.id = 9514;
exports.ids = [9514];
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

/***/ 45576:
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

// NAMESPACE OBJECT: ./src/app/api/projects/[id]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
  PATCH: () => (PATCH)
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
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js
var currentUser = __webpack_require__(57943);
;// ./src/app/api/projects/[id]/route.ts



// Helper function to get user's display name
function getUserDisplayName(user) {
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
        return user.firstName;
    } else if (user.username) {
        return user.username;
    } else if (user.emailAddresses && user.emailAddresses.length > 0) {
        // Use email prefix as fallback (part before @)
        return user.emailAddresses[0].emailAddress.split('@')[0];
    } else {
        return "User";
    }
}
// GET a single project by ID
async function GET(request, { params }) {
    try {
        // In server components/API routes, params doesn't need to be unwrapped with React.use
        // But it should be awaited as it's a promise in the new Next.js
        const id = params.id;
        if (!id) {
            return server.NextResponse.json({
                error: "Missing project ID"
            }, {
                status: 400
            });
        }
        // Get project from Supabase
        const { data: project, error } = await supabase/* supabase */.ND.from('projects').select('*').eq('id', id).single();
        if (error) {
            console.error("Error fetching project:", error);
            return server.NextResponse.json({
                error: "Failed to fetch project"
            }, {
                status: 500
            });
        }
        if (!project) {
            return server.NextResponse.json({
                error: "Project not found"
            }, {
                status: 404
            });
        }
        // Increment view count
        await supabase/* supabase */.ND.from('projects').update({
            views: project.views + 1
        }).eq('id', id);
        return server.NextResponse.json(project);
    } catch (error) {
        console.error("Error in project GET route:", error);
        return server.NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
// PATCH to update a project
async function PATCH(request, { params }) {
    try {
        // In server components/API routes, params doesn't need to be unwrapped with React.use
        // But it should be awaited as it's a promise in the new Next.js
        const id = params.id;
        const data = await request.json();
        if (!id) {
            return server.NextResponse.json({
                error: "Missing project ID"
            }, {
                status: 400
            });
        }
        // Get current project to check ownership
        const { data: project, error: fetchError } = await supabase/* supabase */.ND.from('projects').select('author_id').eq('id', id).single();
        if (fetchError || !project) {
            return server.NextResponse.json({
                error: "Project not found"
            }, {
                status: 404
            });
        }
        // Get current user ID from auth
        const user = await (0,currentUser/* currentUser */.N)();
        if (!user) {
            return server.NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        // Check if user is the author
        if (project.author_id !== user.id) {
            return server.NextResponse.json({
                error: "Unauthorized to modify this project"
            }, {
                status: 403
            });
        }
        // Update project
        const { data: updatedProject, error } = await supabase/* supabase */.ND.from('projects').update(data).eq('id', id).select().single();
        if (error) {
            console.error("Error updating project:", error);
            return server.NextResponse.json({
                error: "Failed to update project"
            }, {
                status: 500
            });
        }
        return server.NextResponse.json(updatedProject);
    } catch (error) {
        console.error("Error in project PATCH route:", error);
        return server.NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
// DELETE a project
async function DELETE(request, { params }) {
    try {
        // In server components/API routes, params doesn't need to be unwrapped with React.use
        // But it should be awaited as it's a promise in the new Next.js
        const id = params.id;
        if (!id) {
            return server.NextResponse.json({
                error: "Missing project ID"
            }, {
                status: 400
            });
        }
        // Get current project to check ownership
        const { data: project, error: fetchError } = await supabase/* supabase */.ND.from('projects').select('author_id').eq('id', id).single();
        if (fetchError || !project) {
            return server.NextResponse.json({
                error: "Project not found"
            }, {
                status: 404
            });
        }
        // Get current user ID from auth
        const user = await (0,currentUser/* currentUser */.N)();
        if (!user) {
            return server.NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        // Check if user is the author
        if (project.author_id !== user.id) {
            return server.NextResponse.json({
                error: "Unauthorized to delete this project"
            }, {
                status: 403
            });
        }
        // Delete project
        const { error } = await supabase/* supabase */.ND.from('projects').delete().eq('id', id);
        if (error) {
            console.error("Error deleting project:", error);
            return server.NextResponse.json({
                error: "Failed to delete project"
            }, {
                status: 500
            });
        }
        // Delete project files from storage
        const { data: files } = await supabase/* supabase */.ND.storage.from('projects').list(`${user.id}/${id}`);
        if (files && files.length > 0) {
            const filePaths = files.map((file)=>`${user.id}/${id}/${file.name}`);
            await supabase/* supabase */.ND.storage.from('projects').remove(filePaths);
        }
        return server.NextResponse.json({
            success: true
        });
    } catch (error) {
        console.error("Error in project DELETE route:", error);
        return server.NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fprojects%2F%5Bid%5D%2Froute&name=app%2Fapi%2Fprojects%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fprojects%2F%5Bid%5D%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fprojects%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/projects/[id]/route",
        pathname: "/api/projects/[id]",
        filename: "route",
        bundlePath: "app/api/projects/[id]/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\projects\\[id]\\route.ts",
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
// Detect if we're in build mode (Next.js static optimization)
const isBuildTime =  true && process.env.NEXT_PHASE === 'phase-production-build';
// Create Supabase client with conditional Realtime config
const supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    },
    // Disable Realtime during build to avoid the constructor error
    realtime: isBuildTime ? false : {
        params: {
            eventsPerSecond: 10
        }
    }
});
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

/***/ 57075:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 57943:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ currentUser)
/* harmony export */ });
/* harmony import */ var _server_clerkClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65591);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88443);


async function currentUser() {
  const { userId } = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .auth */ .j)();
  return userId ? _server_clerkClient__WEBPACK_IMPORTED_MODULE_1__/* .clerkClient */ .$v.users.getUser(userId) : null;
}

//# sourceMappingURL=currentUser.js.map

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
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,7296,8443,9398], () => (__webpack_exec__(45576)));
module.exports = __webpack_exports__;

})();