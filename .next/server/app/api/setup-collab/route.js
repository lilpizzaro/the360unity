(()=>{var e={};e.id=173,e.ids=[173],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11997:e=>{"use strict";e.exports=require("punycode")},27910:e=>{"use strict";e.exports=require("stream")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},34631:e=>{"use strict";e.exports=require("tls")},39727:()=>{},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},47990:()=>{},51906:e=>{function r(e){var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}r.keys=()=>[],r.resolve=r,r.id=51906,e.exports=r},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},56621:(e,r,t)=>{"use strict";t.d(r,{ND:()=>s});let s=(0,t(39398).createClient)("https://lvehgsniklchobuhjobl.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZWhnc25pa2xjaG9idWhqb2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzE3NjMsImV4cCI6MjA2NDgwNzc2M30.p8pNolmkEENmts-WsTaHWkI6lFlZnLJuBkTUIi8zVqg",{auth:{persistSession:!0,autoRefreshToken:!0},realtime:{params:{eventsPerSecond:10}}});process.env.NEXT_PUBLIC_SUPABASE_STORAGE_ACCESS_KEY,process.env.NEXT_PUBLIC_SUPABASE_STORAGE_SECRET_KEY},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},78335:()=>{},79428:e=>{"use strict";e.exports=require("buffer")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},90815:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>d,routeModule:()=>u,serverHooks:()=>T,workAsyncStorage:()=>E,workUnitAsyncStorage:()=>p});var s={};t.r(s),t.d(s,{GET:()=>n});var o=t(96559),a=t(48088),i=t(37719),c=t(32190),l=t(56621);async function n(){try{try{let{error:e}=await l.ND.rpc("execute_sql",{query:`
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
        `});if(e){console.error("Error creating collab_rooms table:",e);let{error:r}=await l.ND.from("collab_rooms").insert({id:"setup-test",code:"// Test",language:"javascript",created_by:"system",updated_by:"system"}).select();if(r&&"23505"!==r.code)throw r}}catch(e){console.error("Cannot create collab_rooms table:",e)}try{let{error:e}=await l.ND.rpc("execute_sql",{query:`
          CREATE TABLE IF NOT EXISTS collab_room_users (
            id SERIAL PRIMARY KEY,
            room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            username TEXT NOT NULL,
            joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(room_id, user_id)
          );
        `});if(e){console.error("Error creating collab_room_users table:",e);let{error:r}=await l.ND.from("collab_room_users").select("id").limit(1);if(r&&"42P01"!==r.code)throw r}}catch(e){console.error("Cannot create collab_room_users table:",e)}try{let{error:e}=await l.ND.rpc("execute_sql",{query:`
          CREATE TABLE IF NOT EXISTS collab_messages (
            id SERIAL PRIMARY KEY,
            room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            username TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `});if(e){console.error("Error creating collab_messages table:",e);let{error:r}=await l.ND.from("collab_messages").select("id").limit(1);if(r&&"42P01"!==r.code)throw r}}catch(e){console.error("Cannot create collab_messages table:",e)}try{let{error:e}=await l.ND.from("collab_rooms").upsert({id:"room-demo123",code:'// Welcome to the collaborative editor!\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Collaborator"));',language:"javascript",created_by:"system",updated_by:"system",is_active:!0});e&&console.error("Error creating demo room:",e)}catch(e){console.error("Cannot create demo room:",e)}let{data:e,error:r}=await l.ND.from("collab_rooms").select("id").limit(1);if(r)return c.NextResponse.json({success:!1,message:"Failed to verify tables were created.",error:r},{status:500});return c.NextResponse.json({success:!0,message:"Tables were created or already exist.",demo_room:"room-demo123",note:"You may need to enable realtime for these tables in the Supabase dashboard."})}catch(e){return console.error("Unexpected error setting up collaboration tables:",e),c.NextResponse.json({success:!1,message:"Unexpected error setting up collaboration tables.",error:e},{status:500})}}let u=new o.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/setup-collab/route",pathname:"/api/setup-collab",filename:"route",bundlePath:"app/api/setup-collab/route"},resolvedPagePath:"D:\\the360unity-master\\the360unity-master\\src\\app\\api\\setup-collab\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:E,workUnitAsyncStorage:p,serverHooks:T}=u;function d(){return(0,i.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:p})}},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{},96559:(e,r,t)=>{"use strict";e.exports=t(44870)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[447,190,398],()=>t(90815));module.exports=s})();