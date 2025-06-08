(() => {
var exports = {};
exports.id = 2173;
exports.ids = [2173];
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

/***/ 12855:
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

// NAMESPACE OBJECT: ./src/app/api/setup-collab/route.ts
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
// EXTERNAL MODULE: ./src/lib/supabase.ts
var supabase = __webpack_require__(56621);
;// ./src/app/api/setup-collab/route.ts


async function GET() {
    try {
        // We need to create tables one by one using direct SQL
        // 1. Create collab_rooms table
        try {
            const { error: roomsError } = await supabase/* supabase */.ND.rpc('execute_sql', {
                query: `
          CREATE TABLE IF NOT EXISTS collab_rooms (
            id TEXT PRIMARY KEY,
            code TEXT NOT NULL DEFAULT '// Write your code here...',
            language TEXT NOT NULL DEFAULT 'javascript',
            created_by TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_by TEXT,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            is_active BOOLEAN DEFAULT TRUE
          );
        `
            });
            if (roomsError) {
                console.error('Error creating collab_rooms table:', roomsError);
                // Try alternative approach with direct insert
                const { error: createRoomsError } = await supabase/* supabase */.ND.from('collab_rooms').insert({
                    id: 'setup-test',
                    code: '// Test',
                    language: 'javascript',
                    created_by: 'system',
                    updated_by: 'system'
                }).select();
                if (createRoomsError && createRoomsError.code !== '23505') {
                    throw createRoomsError;
                }
            }
        } catch (err) {
            console.error('Cannot create collab_rooms table:', err);
        }
        // 2. Create collab_room_users table
        try {
            const { error: usersError } = await supabase/* supabase */.ND.rpc('execute_sql', {
                query: `
          CREATE TABLE IF NOT EXISTS collab_room_users (
            id SERIAL PRIMARY KEY,
            room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            username TEXT NOT NULL,
            joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(room_id, user_id)
          );
        `
            });
            if (usersError) {
                console.error('Error creating collab_room_users table:', usersError);
                // Check if the table exists using a select query
                const { error: checkUsersError } = await supabase/* supabase */.ND.from('collab_room_users').select('id').limit(1);
                if (checkUsersError && checkUsersError.code !== '42P01') {
                    throw checkUsersError;
                }
            }
        } catch (err) {
            console.error('Cannot create collab_room_users table:', err);
        }
        // 3. Create collab_messages table
        try {
            const { error: messagesError } = await supabase/* supabase */.ND.rpc('execute_sql', {
                query: `
          CREATE TABLE IF NOT EXISTS collab_messages (
            id SERIAL PRIMARY KEY,
            room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            username TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
            });
            if (messagesError) {
                console.error('Error creating collab_messages table:', messagesError);
                // Check if the table exists using a select query
                const { error: checkMessagesError } = await supabase/* supabase */.ND.from('collab_messages').select('id').limit(1);
                if (checkMessagesError && checkMessagesError.code !== '42P01') {
                    throw checkMessagesError;
                }
            }
        } catch (err) {
            console.error('Cannot create collab_messages table:', err);
        }
        // Create demo room
        try {
            const { error: demoRoomError } = await supabase/* supabase */.ND.from('collab_rooms').upsert({
                id: 'room-demo123',
                code: '// Welcome to the collaborative editor!\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Collaborator"));',
                language: 'javascript',
                created_by: 'system',
                updated_by: 'system',
                is_active: true
            });
            if (demoRoomError) {
                console.error('Error creating demo room:', demoRoomError);
            }
        } catch (err) {
            console.error('Cannot create demo room:', err);
        }
        // Verify tables exist by doing a simple query
        const { data: roomsData, error: roomsQueryError } = await supabase/* supabase */.ND.from('collab_rooms').select('id').limit(1);
        if (roomsQueryError) {
            return server.NextResponse.json({
                success: false,
                message: 'Failed to verify tables were created.',
                error: roomsQueryError
            }, {
                status: 500
            });
        }
        return server.NextResponse.json({
            success: true,
            message: 'Tables were created or already exist.',
            demo_room: 'room-demo123',
            note: 'You may need to enable realtime for these tables in the Supabase dashboard.'
        });
    } catch (error) {
        console.error('Unexpected error setting up collaboration tables:', error);
        return server.NextResponse.json({
            success: false,
            message: 'Unexpected error setting up collaboration tables.',
            error
        }, {
            status: 500
        });
    }
}

;// ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?page=%2Fapi%2Fsetup-collab%2Froute&name=app%2Fapi%2Fsetup-collab%2Froute&pagePath=private-next-app-dir%2Fapi%2Fsetup-collab%2Froute.ts&appDir=D%3A%5Cthe360unity-master%5Cthe360unity-master%5Csrc%5Capp&appPaths=%2Fapi%2Fsetup-collab%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=standalone&nextConfigExperimentalUseEarlyImport=&preferredRegion=&middlewareConfig=e30%3D!




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = "standalone"
const routeModule = new module_compiled.AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/setup-collab/route",
        pathname: "/api/setup-collab",
        filename: "route",
        bundlePath: "app/api/setup-collab/route"
    },
    resolvedPagePath: "D:\\the360unity-master\\the360unity-master\\src\\app\\api\\setup-collab\\route.ts",
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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4447,2190,9398], () => (__webpack_exec__(12855)));
module.exports = __webpack_exports__;

})();