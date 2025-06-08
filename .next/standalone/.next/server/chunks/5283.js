exports.id = 5283;
exports.ids = [5283];
exports.modules = {

/***/ 3596:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  RZ: () => (/* reexport */ createDevOrStagingUrlCache),
  f9: () => (/* reexport */ isDevelopmentFromApiKey),
  r7: () => (/* reexport */ isLegacyFrontendApiKey),
  Be: () => (/* reexport */ isProductionFromApiKey),
  rA: () => (/* reexport */ isPublishableKey),
  q5: () => (/* reexport */ parsePublishableKey)
});

// UNUSED EXPORTS: buildPublishableKey

// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-TETGTEI2.mjs
var chunk_TETGTEI2 = __webpack_require__(46091);
;// ./node_modules/@clerk/shared/dist/chunk-IAZRYRAH.mjs


// src/keys.ts
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
var PUBLISHABLE_FRONTEND_API_DEV_REGEX = /^(([a-z]+)-){2}([0-9]{1,2})\.clerk\.accounts([a-z.]*)(dev|com)$/i;
function buildPublishableKey(frontendApi) {
  const keyPrefix = PUBLISHABLE_FRONTEND_API_DEV_REGEX.test(frontendApi) ? PUBLISHABLE_KEY_TEST_PREFIX : PUBLISHABLE_KEY_LIVE_PREFIX;
  return `${keyPrefix}${btoa(`${frontendApi}$`)}`;
}
function parsePublishableKey(key) {
  key = key || "";
  if (!isPublishableKey(key)) {
    return null;
  }
  const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
  let frontendApi = (0,chunk_TETGTEI2/* isomorphicAtob */.y)(key.split("_")[2]);
  if (!frontendApi.endsWith("$")) {
    return null;
  }
  frontendApi = frontendApi.slice(0, -1);
  return {
    instanceType,
    frontendApi
  };
}
function isPublishableKey(key) {
  key = key || "";
  const hasValidPrefix = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX);
  const hasValidFrontendApiPostfix = (0,chunk_TETGTEI2/* isomorphicAtob */.y)(key.split("_")[2] || "").endsWith("$");
  return hasValidPrefix && hasValidFrontendApiPostfix;
}
function isLegacyFrontendApiKey(key) {
  key = key || "";
  return key.startsWith("clerk.");
}
function createDevOrStagingUrlCache() {
  const DEV_OR_STAGING_SUFFIXES = [
    ".lcl.dev",
    ".stg.dev",
    ".lclstage.dev",
    ".stgstage.dev",
    ".dev.lclclerk.com",
    ".stg.lclclerk.com",
    ".accounts.lclclerk.com",
    "accountsstage.dev",
    "accounts.dev"
  ];
  const devOrStagingUrlCache = /* @__PURE__ */ new Map();
  return {
    isDevOrStagingUrl: (url) => {
      if (!url) {
        return false;
      }
      const hostname = typeof url === "string" ? url : url.hostname;
      let res = devOrStagingUrlCache.get(hostname);
      if (res === void 0) {
        res = DEV_OR_STAGING_SUFFIXES.some((s) => hostname.endsWith(s));
        devOrStagingUrlCache.set(hostname, res);
      }
      return res;
    }
  };
}
function isDevelopmentFromApiKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function isProductionFromApiKey(apiKey) {
  return apiKey.startsWith("live_") || apiKey.startsWith("sk_live_");
}


//# sourceMappingURL=chunk-IAZRYRAH.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs
var chunk_NDCDZYN6 = __webpack_require__(92549);
;// ./node_modules/@clerk/shared/dist/keys.mjs




//# sourceMappingURL=keys.mjs.map

/***/ }),

/***/ 3870:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ mergeNextClerkPropsWithEnv)
/* harmony export */ });
const mergeNextClerkPropsWithEnv = (props) => {
  return {
    ...props,
    frontendApi: props.frontendApi || process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || "",
    publishableKey: props.publishableKey || "pk_test_dXByaWdodC1yZXB0aWxlLTU5LmNsZXJrLmFjY291bnRzLmRldiQ" || 0,
    clerkJSUrl: props.clerkJSUrl || process.env.NEXT_PUBLIC_CLERK_JS,
    clerkJSVersion: props.clerkJSVersion || process.env.NEXT_PUBLIC_CLERK_JS_VERSION,
    proxyUrl: props.proxyUrl || process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "",
    domain: props.domain || process.env.NEXT_PUBLIC_CLERK_DOMAIN || "",
    isSatellite: props.isSatellite || process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE === "true",
    signInUrl: props.signInUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "",
    signUpUrl: props.signUpUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "",
    afterSignInUrl: props.afterSignInUrl || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "",
    afterSignUpUrl: props.afterSignUpUrl || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "",
    sdkMetadata: {
      name: "@clerk/nextjs",
      version: "4.31.8"
    }
  };
};

//# sourceMappingURL=mergeNextClerkPropsWithEnv.js.map

/***/ }),

/***/ 5066:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lx: () => (/* reexport safe */ _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__.Lx),
/* harmony export */   W1: () => (/* reexport safe */ _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__.W1),
/* harmony export */   io: () => (/* reexport safe */ _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__.io)
/* harmony export */ });
/* harmony import */ var _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65620);
/* harmony import */ var _chunk_NDCDZYN6_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92549);



//# sourceMappingURL=deprecated.mjs.map

/***/ }),

/***/ 7161:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ClientClerkProvider: () => (/* binding */ ClientClerkProvider)
});

// EXTERNAL MODULE: ./node_modules/@clerk/clerk-react/dist/esm/index.js + 52 modules
var esm = __webpack_require__(13781);
// EXTERNAL MODULE: ./node_modules/next/dist/api/navigation.js
var navigation = __webpack_require__(16189);
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js
var react = __webpack_require__(43210);
var react_default = /*#__PURE__*/__webpack_require__.n(react);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/client-boundary/NextOptionsContext.js
var NextOptionsContext = __webpack_require__(95486);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/client-boundary/useSafeLayoutEffect.js
var useSafeLayoutEffect = __webpack_require__(59433);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/utils/mergeNextClerkPropsWithEnv.js
var mergeNextClerkPropsWithEnv = __webpack_require__(3870);
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/client/useAwaitableNavigate.js
/* __next_internal_client_entry_do_not_use__ useAwaitableNavigate auto */ 

const useAwaitableNavigate = ()=>{
    const { push } = (0,navigation.useRouter)();
    const [isPending, startTransition] = (0,react.useTransition)();
    const clerkNavRef = (0,react.useRef)();
    const clerkNavPromiseBuffer = (0,react.useRef)([]);
    if (!clerkNavRef.current) {
        clerkNavRef.current = (to, opts)=>{
            return new Promise((res)=>{
                clerkNavPromiseBuffer.current.push(res);
                startTransition(()=>{
                    push(to, opts);
                });
            });
        };
    }
    (0,react.useEffect)(()=>{
        var _a;
        if (isPending) {
            return;
        }
        if ((_a = clerkNavPromiseBuffer == null ? void 0 : clerkNavPromiseBuffer.current) == null ? void 0 : _a.length) {
            clerkNavPromiseBuffer.current.forEach((resolve)=>resolve());
        }
        clerkNavPromiseBuffer.current = [];
    }, [
        isPending
    ]);
    return clerkNavRef.current;
};
 //# sourceMappingURL=useAwaitableNavigate.js.map

;// ./node_modules/@clerk/nextjs/dist/esm/app-router/client/ClerkProvider.js
/* __next_internal_client_entry_do_not_use__ ClientClerkProvider auto */ 






const ClientClerkProvider = (props)=>{
    const { __unstable_invokeMiddlewareOnAuthStateChange = true } = props;
    const router = (0,navigation.useRouter)();
    const navigate = useAwaitableNavigate();
    (0,useSafeLayoutEffect/* useSafeLayoutEffect */.U)(()=>{
        window.__unstable__onBeforeSetActive = ()=>{
            if (__unstable_invokeMiddlewareOnAuthStateChange) {
                router.refresh();
                router.push(window.location.href);
            }
        };
        window.__unstable__onAfterSetActive = ()=>{
            router.refresh();
        };
    }, []);
    const mergedProps = (0,mergeNextClerkPropsWithEnv/* mergeNextClerkPropsWithEnv */.O)({
        ...props,
        navigate
    });
    return /* @__PURE__ */ /*#__PURE__*/ react_default().createElement(NextOptionsContext/* ClerkNextOptionsProvider */._, {
        options: mergedProps
    }, /* @__PURE__ */ /*#__PURE__*/ react_default().createElement(esm/* ClerkProvider */.lJ, {
        ...mergedProps
    }));
};
 //# sourceMappingURL=ClerkProvider.js.map


/***/ }),

/***/ 7797:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StaticGenBailoutError: function() {
        return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
        return isStaticGenBailoutError;
    }
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map


/***/ }),

/***/ 9608:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "bailoutToClientRendering", ({
    enumerable: true,
    get: function() {
        return bailoutToClientRendering;
    }
}));
const _bailouttocsr = __webpack_require__(81208);
const _workasyncstorageexternal = __webpack_require__(29294);
function bailoutToClientRendering(reason) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore == null ? void 0 : workStore.forceStatic) return;
    if (workStore == null ? void 0 : workStore.isStaticGeneration) throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 10449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(94041).vendored.contexts.HooksClientContext;

//# sourceMappingURL=hooks-client-context.js.map

/***/ }),

/***/ 12907:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(65239).vendored["react-rsc"].ReactServerDOMWebpackServerEdge;

//# sourceMappingURL=react-server-dom-webpack-server-edge.js.map

/***/ }),

/***/ 13781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  B$: () => (/* reexport */ AuthenticateWithRedirectCallback),
  z0: () => (/* reexport */ ClerkLoaded),
  A0: () => (/* reexport */ ClerkLoading),
  lJ: () => (/* reexport */ ClerkProvider),
  ul: () => (/* reexport */ CreateOrganization),
  Ys: () => (/* reexport */ error/* EmailLinkErrorCode */.Ys),
  PQ: () => (/* reexport */ GoogleOneTap),
  dB: () => (/* reexport */ error/* MagicLinkErrorCode */.dB),
  k5: () => (/* reexport */ MultisessionAppSupport),
  oE: () => (/* reexport */ OrganizationList),
  nC: () => (/* reexport */ OrganizationProfile),
  NC: () => (/* reexport */ OrganizationSwitcher),
  EH: () => (/* reexport */ Protect),
  rm: () => (/* reexport */ RedirectToCreateOrganization),
  m2: () => (/* reexport */ RedirectToOrganizationProfile),
  W5: () => (/* reexport */ RedirectToSignIn),
  mO: () => (/* reexport */ RedirectToSignUp),
  eG: () => (/* reexport */ RedirectToUserProfile),
  Ls: () => (/* reexport */ SignIn),
  hZ: () => (/* reexport */ SignInButton),
  M_: () => (/* reexport */ SignInWithMetamaskButton),
  ct: () => (/* reexport */ SignOutButton),
  Hx: () => (/* reexport */ SignUp),
  Ny: () => (/* reexport */ SignUpButton),
  iB: () => (/* reexport */ SignedIn),
  Bl: () => (/* reexport */ SignedOut),
  uF: () => (/* reexport */ UserButton),
  Fv: () => (/* reexport */ UserProfile),
  s0: () => (/* reexport */ WithClerk),
  Lk: () => (/* reexport */ WithSession),
  MY: () => (/* reexport */ WithUser),
  XB: () => (/* reexport */ __internal__setErrorThrowerOptions),
  $R: () => (/* reexport */ error/* isClerkAPIResponseError */.$R),
  hl: () => (/* reexport */ error/* isEmailLinkError */.hl),
  ux: () => (/* reexport */ error/* isKnownError */.ux),
  Or: () => (/* reexport */ error/* isMagicLinkError */.Or),
  si: () => (/* reexport */ error/* isMetamaskError */.si),
  As: () => (/* reexport */ useAuth),
  ho: () => (/* reexport */ useClerk),
  ui: () => (/* reexport */ useEmailLink),
  f_: () => (/* reexport */ useMagicLink),
  Z5: () => (/* reexport */ useOrganization),
  D_: () => (/* reexport */ useOrganizationList),
  Gi: () => (/* reexport */ useOrganizations),
  wV: () => (/* reexport */ useSession),
  g7: () => (/* reexport */ useSessionList),
  go: () => (/* reexport */ useSignIn),
  yC: () => (/* reexport */ useSignUp),
  Jd: () => (/* reexport */ useUser),
  Q: () => (/* reexport */ withClerk),
  fQ: () => (/* reexport */ withSession),
  Cb: () => (/* reexport */ withUser)
});

// NAMESPACE OBJECT: ./node_modules/@clerk/shared/node_modules/swr/core/dist/index.mjs
var core_dist_namespaceObject = {};
__webpack_require__.r(core_dist_namespaceObject);
__webpack_require__.d(core_dist_namespaceObject, {
  SWRConfig: () => (dist_SWRConfig),
  "default": () => (useSWR),
  mutate: () => (mutate),
  preload: () => (preload),
  unstable_serialize: () => (unstable_serialize),
  useSWRConfig: () => (useSWRConfig)
});

// EXTERNAL MODULE: ./node_modules/@clerk/clerk-react/dist/esm/polyfills.js
var polyfills = __webpack_require__(27804);
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/keys.mjs + 1 modules
var keys = __webpack_require__(3596);
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js
var react = __webpack_require__(43210);
var react_default = /*#__PURE__*/__webpack_require__.n(react);
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/error.mjs
var error = __webpack_require__(77681);
;// ./node_modules/@clerk/clerk-react/dist/esm/errors.js


const noFrontendApiError = "Clerk: You must add the frontendApi prop to your <ClerkProvider>";
const noClerkProviderError = "Clerk: You must wrap your application in a <ClerkProvider> component.";
const errors_noGuaranteedLoadedError = (hookName) => `Clerk: You're calling ${hookName} before there's a guarantee the client has been loaded. Call ${hookName} from a child of <SignedIn>, <SignedOut>, or <ClerkLoaded>, or use the withClerk() HOC.`;
const noGuaranteedUserError = (hookName) => `Clerk: You're calling ${hookName} before there's a guarantee there's an active user. Call ${hookName} from a child of <SignedIn> or use the withUser() HOC.`;
const multipleClerkProvidersError = "Clerk: You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.";
const hocChildrenNotAFunctionError = "Clerk: Child of WithClerk must be a function.";
const multipleChildrenInButtonComponent = (name) => `Clerk: You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
const invalidStateError = "Clerk: Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support";
const unsupportedNonBrowserDomainOrProxyUrlFunction = "Clerk: Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.";
const userProfilePageRenderedError = "Clerk: <UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
const userProfileLinkRenderedError = "Clerk: <UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
const organizationProfilePageRenderedError = "Clerk: <OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
const organizationProfileLinkRenderedError = "Clerk: <OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
const customPagesIgnoredComponent = (componentName) => `Clerk: <${componentName} /> can only accept <${componentName}.Page /> and <${componentName}.Link /> as its children. Any other provided component will be ignored.`;
const customPageWrongProps = (componentName) => `Clerk: Missing props. <${componentName}.Page /> component requires the following props: url, label, labelIcon, alongside with children to be rendered inside the page.`;
const customLinkWrongProps = (componentName) => `Clerk: Missing props. <${componentName}.Link /> component requires the following props: url, label and labelIcon.`;
const useAuthHasRequiresRoleOrPermission = 'Clerk: Missing parameters. `has` from `useAuth` requires a permission or role key to be passed. Example usage: `has({permission: "org:posts:edit"`';

//# sourceMappingURL=errors.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/errorThrower.js


const errorThrower = (0,error/* buildErrorThrower */._r)({ packageName: "@clerk/react" });
function __internal__setErrorThrowerOptions(options) {
  errorThrower.setMessages(options).setPackageName(options);
}

//# sourceMappingURL=errorThrower.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/useMaxAllowedInstancesGuard.js


const counts = /* @__PURE__ */ new Map();
function useMaxAllowedInstancesGuard(name, error, maxCount = 1) {
  react_default().useEffect(() => {
    const count = counts.get(name) || 0;
    if (count == maxCount) {
      throw new Error(error);
    }
    counts.set(name, count + 1);
    return () => {
      counts.set(name, (counts.get(name) || 1) - 1);
    };
  }, []);
}
function withMaxAllowedInstancesGuard(WrappedComponent, name, error) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || name || "Component";
  const Hoc = (props) => {
    useMaxAllowedInstancesGuard(name, error);
    return /* @__PURE__ */ react_default().createElement(WrappedComponent, { ...props });
  };
  Hoc.displayName = `withMaxAllowedInstancesGuard(${displayName})`;
  return Hoc;
}

//# sourceMappingURL=useMaxAllowedInstancesGuard.js.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/deprecated.mjs
var dist_deprecated = __webpack_require__(5066);
;// ./node_modules/@clerk/clerk-react/dist/esm/chunk-XTU7I5IS.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};


//# sourceMappingURL=chunk-XTU7I5IS.js.map
;// ./node_modules/@clerk/shared/dist/chunk-LJ4R7M7R.mjs
// src/browser.ts
function inBrowser() {
  return typeof window !== "undefined";
}
var botAgents = [
  "bot",
  "spider",
  "crawl",
  "APIs-Google",
  "AdsBot",
  "Googlebot",
  "mediapartners",
  "Google Favicon",
  "FeedFetcher",
  "Google-Read-Aloud",
  "DuplexWeb-Google",
  "googleweblight",
  "bing",
  "yandex",
  "baidu",
  "duckduck",
  "yahoo",
  "ecosia",
  "ia_archiver",
  "facebook",
  "instagram",
  "pinterest",
  "reddit",
  "slack",
  "twitter",
  "whatsapp",
  "youtube",
  "semrush"
];
var botAgentRegex = new RegExp(botAgents.join("|"), "i");
function userAgentIsRobot(userAgent) {
  return !userAgent ? false : botAgentRegex.test(userAgent);
}
function isValidBrowser() {
  const navigator = inBrowser() ? window == null ? void 0 : window.navigator : null;
  if (!navigator) {
    return false;
  }
  return !userAgentIsRobot(navigator == null ? void 0 : navigator.userAgent) && !(navigator == null ? void 0 : navigator.webdriver);
}
function isBrowserOnline() {
  var _a, _b;
  const navigator = inBrowser() ? window == null ? void 0 : window.navigator : null;
  if (!navigator) {
    return false;
  }
  const isNavigatorOnline = navigator == null ? void 0 : navigator.onLine;
  const isExperimentalConnectionOnline = ((_a = navigator == null ? void 0 : navigator.connection) == null ? void 0 : _a.rtt) !== 0 && ((_b = navigator == null ? void 0 : navigator.connection) == null ? void 0 : _b.downlink) !== 0;
  return isExperimentalConnectionOnline && isNavigatorOnline;
}
function isValidBrowserOnline() {
  return isBrowserOnline() && isValidBrowser();
}


//# sourceMappingURL=chunk-LJ4R7M7R.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs
var chunk_NDCDZYN6 = __webpack_require__(92549);
;// ./node_modules/@clerk/shared/dist/browser.mjs



//# sourceMappingURL=browser.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/handleValueOrFn.mjs + 1 modules
var handleValueOrFn = __webpack_require__(40117);
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/isConstructor.js

function isConstructor(f) {
  return typeof f === "function";
}

//# sourceMappingURL=isConstructor.js.map
;// ./node_modules/@clerk/shared/dist/chunk-AOO6TJNL.mjs
// src/loadScript.ts
var NO_DOCUMENT_ERROR = "loadScript cannot be called when document does not exist";
var NO_SRC_ERROR = "loadScript cannot be called without a src";
async function loadScript(src = "", opts) {
  const { async, defer, beforeLoad, crossOrigin } = opts || {};
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(NO_SRC_ERROR);
    }
    if (!document || !document.body) {
      reject(NO_DOCUMENT_ERROR);
    }
    const script = document.createElement("script");
    crossOrigin && script.setAttribute("crossorigin", crossOrigin);
    script.async = async || false;
    script.defer = defer || false;
    script.addEventListener("load", () => {
      script.remove();
      resolve(script);
    });
    script.addEventListener("error", () => {
      script.remove();
      reject();
    });
    script.src = src;
    beforeLoad == null ? void 0 : beforeLoad(script);
    document.body.appendChild(script);
  });
}


//# sourceMappingURL=chunk-AOO6TJNL.mjs.map
;// ./node_modules/@clerk/shared/dist/loadScript.mjs



//# sourceMappingURL=loadScript.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/proxy.mjs
var proxy = __webpack_require__(22527);
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/url.mjs + 1 modules
var url = __webpack_require__(89213);
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/isDevOrStageUrl.js


const { isDevOrStagingUrl } = (0,keys/* createDevOrStagingUrlCache */.RZ)();

//# sourceMappingURL=isDevOrStageUrl.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/versionSelector.js

const versionSelector = (clerkJSVersion) => {
  if (clerkJSVersion) {
    return clerkJSVersion;
  }
  const prereleaseTag = getPrereleaseTag("4.32.5");
  if (prereleaseTag) {
    if (prereleaseTag === "snapshot") {
      return "4.73.14";
    }
    return prereleaseTag;
  }
  return getMajorVersion("4.32.5");
};
const getPrereleaseTag = (packageVersion) => {
  var _a;
  return (_a = packageVersion.match(/-(.*)\./)) == null ? void 0 : _a[1];
};
const getMajorVersion = (packageVersion) => packageVersion.split(".")[0];

//# sourceMappingURL=versionSelector.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/loadClerkJsScript.js








const FAILED_TO_LOAD_ERROR = "Clerk: Failed to load Clerk";
const loadClerkJsScript = (opts) => {
  const { frontendApi, publishableKey } = opts;
  if (!publishableKey && !frontendApi) {
    errorThrower.throwMissingPublishableKeyError();
  }
  return loadScript(clerkJsScriptUrl(opts), {
    async: true,
    crossOrigin: "anonymous",
    beforeLoad: applyClerkJsScriptAttributes(opts)
  }).catch(() => {
    throw new Error(FAILED_TO_LOAD_ERROR);
  });
};
const clerkJsScriptUrl = (opts) => {
  var _a, _b;
  const { clerkJSUrl, clerkJSVariant, clerkJSVersion, proxyUrl, domain, publishableKey, frontendApi } = opts;
  if (clerkJSUrl) {
    return clerkJSUrl;
  }
  let scriptHost = "";
  if (!!proxyUrl && (0,proxy/* isValidProxyUrl */._c)(proxyUrl)) {
    scriptHost = (0,proxy/* proxyUrlToAbsoluteURL */.zz)(proxyUrl).replace(/http(s)?:\/\//, "");
  } else if (domain && !isDevOrStagingUrl(((_a = (0,keys/* parsePublishableKey */.q5)(publishableKey)) == null ? void 0 : _a.frontendApi) || frontendApi || "")) {
    scriptHost = (0,url/* addClerkPrefix */.TV)(domain);
  } else {
    scriptHost = ((_b = (0,keys/* parsePublishableKey */.q5)(publishableKey)) == null ? void 0 : _b.frontendApi) || frontendApi || "";
  }
  const variant = clerkJSVariant ? `${clerkJSVariant.replace(/\.+$/, "")}.` : "";
  const version = versionSelector(clerkJSVersion);
  return `https://${scriptHost}/npm/@clerk/clerk-js@${version}/dist/clerk.${variant}browser.js`;
};
const applyClerkJsScriptAttributes = (options) => (script) => {
  const { publishableKey, frontendApi, proxyUrl, domain } = options;
  if (publishableKey) {
    script.setAttribute("data-clerk-publishable-key", publishableKey);
  } else if (frontendApi) {
    script.setAttribute("data-clerk-frontend-api", frontendApi);
  }
  if (proxyUrl) {
    script.setAttribute("data-clerk-proxy-url", proxyUrl);
  }
  if (domain) {
    script.setAttribute("data-clerk-domain", domain);
  }
};

//# sourceMappingURL=loadClerkJsScript.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/isomorphicClerk.js

var _loaded, _domain, _proxyUrl, _frontendApi, _publishableKey, _instance, _waitForClerkJS, waitForClerkJS_fn;





const _IsomorphicClerk = class _IsomorphicClerk {
  constructor(options) {
    __privateAdd(this, _waitForClerkJS);
    this.clerkjs = null;
    this.preopenOneTap = null;
    this.preopenSignIn = null;
    this.preopenSignUp = null;
    this.preopenUserProfile = null;
    this.preopenOrganizationProfile = null;
    this.preopenCreateOrganization = null;
    this.premountSignInNodes = /* @__PURE__ */ new Map();
    this.premountSignUpNodes = /* @__PURE__ */ new Map();
    this.premountUserProfileNodes = /* @__PURE__ */ new Map();
    this.premountUserButtonNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationProfileNodes = /* @__PURE__ */ new Map();
    this.premountCreateOrganizationNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationSwitcherNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationListNodes = /* @__PURE__ */ new Map();
    this.premountMethodCalls = /* @__PURE__ */ new Map();
    this.loadedListeners = [];
    __privateAdd(this, _loaded, false);
    __privateAdd(this, _domain, void 0);
    __privateAdd(this, _proxyUrl, void 0);
    __privateAdd(this, _frontendApi, void 0);
    __privateAdd(this, _publishableKey, void 0);
    this.isReady = () => {
      var _a;
      return Boolean((_a = this.clerkjs) == null ? void 0 : _a.isReady());
    };
    this.buildSignInUrl = (opts) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildSignInUrl(opts)) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildSignInUrl", callback);
      }
    };
    this.buildSignUpUrl = (opts) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildSignUpUrl(opts)) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildSignUpUrl", callback);
      }
    };
    this.buildUserProfileUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildUserProfileUrl()) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildUserProfileUrl", callback);
      }
    };
    this.buildCreateOrganizationUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildCreateOrganizationUrl()) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildCreateOrganizationUrl", callback);
      }
    };
    this.buildOrganizationProfileUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildOrganizationProfileUrl()) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildOrganizationProfileUrl", callback);
      }
    };
    this.buildHomeUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildHomeUrl()) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildHomeUrl", callback);
      }
    };
    this.buildUrlWithAuth = (to) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildUrlWithAuth(to)) || "";
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildUrlWithAuth", callback);
      }
    };
    this.handleUnauthenticated = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.handleUnauthenticated();
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("handleUnauthenticated", callback);
      }
    };
    this.addOnLoaded = (cb) => {
      this.loadedListeners.push(cb);
      if (this.loaded) {
        this.emitLoaded();
      }
    };
    this.emitLoaded = () => {
      this.loadedListeners.forEach((cb) => cb());
      this.loadedListeners = [];
    };
    this.hydrateClerkJS = (clerkjs) => {
      if (!clerkjs) {
        throw new Error("Failed to hydrate latest Clerk JS");
      }
      this.clerkjs = clerkjs;
      this.premountMethodCalls.forEach((cb) => cb());
      if (this.preopenSignIn !== null) {
        clerkjs.openSignIn(this.preopenSignIn);
      }
      if (this.preopenSignUp !== null) {
        clerkjs.openSignUp(this.preopenSignUp);
      }
      if (this.preopenUserProfile !== null) {
        clerkjs.openUserProfile(this.preopenUserProfile);
      }
      if (this.preopenOneTap !== null) {
        clerkjs.openGoogleOneTap(this.preopenOneTap);
      }
      if (this.preopenOrganizationProfile !== null) {
        clerkjs.openOrganizationProfile(this.preopenOrganizationProfile);
      }
      if (this.preopenCreateOrganization !== null) {
        clerkjs.openCreateOrganization(this.preopenCreateOrganization);
      }
      this.premountSignInNodes.forEach((props, node) => {
        clerkjs.mountSignIn(node, props);
      });
      this.premountSignUpNodes.forEach((props, node) => {
        clerkjs.mountSignUp(node, props);
      });
      this.premountUserProfileNodes.forEach((props, node) => {
        clerkjs.mountUserProfile(node, props);
      });
      this.premountUserButtonNodes.forEach((props, node) => {
        clerkjs.mountUserButton(node, props);
      });
      this.premountOrganizationListNodes.forEach((props, node) => {
        clerkjs.mountOrganizationList(node, props);
      });
      __privateSet(this, _loaded, true);
      this.emitLoaded();
      return this.clerkjs;
    };
    this.__unstable__updateProps = (props) => {
      if (this.clerkjs && "__unstable__updateProps" in this.clerkjs) {
        this.clerkjs.__unstable__updateProps(props);
      } else {
        return void 0;
      }
    };
    /**
     * `setActive` can be used to set the active session and/or organization.
     */
    this.setActive = ({ session, organization, beforeEmit }) => {
      if (this.clerkjs) {
        return this.clerkjs.setActive({ session, organization, beforeEmit });
      } else {
        return Promise.reject();
      }
    };
    this.setSession = (session, beforeEmit) => {
      (0,dist_deprecated/* deprecated */.io)("setSession", "Use `Clerk.setActive` instead");
      return this.setActive({ session, beforeEmit });
    };
    this.openSignIn = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openSignIn(props);
      } else {
        this.preopenSignIn = props;
      }
    };
    this.closeSignIn = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeSignIn();
      } else {
        this.preopenSignIn = null;
      }
    };
    this.openGoogleOneTap = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openGoogleOneTap(props);
      } else {
        this.preopenOneTap = props;
      }
    };
    this.closeGoogleOneTap = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeGoogleOneTap();
      } else {
        this.preopenOneTap = null;
      }
    };
    this.openUserProfile = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openUserProfile(props);
      } else {
        this.preopenUserProfile = props;
      }
    };
    this.closeUserProfile = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeUserProfile();
      } else {
        this.preopenUserProfile = null;
      }
    };
    this.openOrganizationProfile = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openOrganizationProfile(props);
      } else {
        this.preopenOrganizationProfile = props;
      }
    };
    this.closeOrganizationProfile = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeOrganizationProfile();
      } else {
        this.preopenOrganizationProfile = null;
      }
    };
    this.openCreateOrganization = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openCreateOrganization(props);
      } else {
        this.preopenCreateOrganization = props;
      }
    };
    this.closeCreateOrganization = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeCreateOrganization();
      } else {
        this.preopenCreateOrganization = null;
      }
    };
    this.openSignUp = (props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.openSignUp(props);
      } else {
        this.preopenSignUp = props;
      }
    };
    this.closeSignUp = () => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.closeSignUp();
      } else {
        this.preopenSignUp = null;
      }
    };
    this.mountSignIn = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountSignIn(node, props);
      } else {
        this.premountSignInNodes.set(node, props);
      }
    };
    this.unmountSignIn = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountSignIn(node);
      } else {
        this.premountSignInNodes.delete(node);
      }
    };
    this.mountSignUp = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountSignUp(node, props);
      } else {
        this.premountSignUpNodes.set(node, props);
      }
    };
    this.unmountSignUp = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountSignUp(node);
      } else {
        this.premountSignUpNodes.delete(node);
      }
    };
    this.mountUserProfile = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountUserProfile(node, props);
      } else {
        this.premountUserProfileNodes.set(node, props);
      }
    };
    this.unmountUserProfile = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountUserProfile(node);
      } else {
        this.premountUserProfileNodes.delete(node);
      }
    };
    this.mountOrganizationProfile = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountOrganizationProfile(node, props);
      } else {
        this.premountOrganizationProfileNodes.set(node, props);
      }
    };
    this.unmountOrganizationProfile = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountOrganizationProfile(node);
      } else {
        this.premountOrganizationProfileNodes.delete(node);
      }
    };
    this.mountCreateOrganization = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountCreateOrganization(node, props);
      } else {
        this.premountCreateOrganizationNodes.set(node, props);
      }
    };
    this.unmountCreateOrganization = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountCreateOrganization(node);
      } else {
        this.premountCreateOrganizationNodes.delete(node);
      }
    };
    this.mountOrganizationSwitcher = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountOrganizationSwitcher(node, props);
      } else {
        this.premountOrganizationSwitcherNodes.set(node, props);
      }
    };
    this.unmountOrganizationSwitcher = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountOrganizationSwitcher(node);
      } else {
        this.premountOrganizationSwitcherNodes.delete(node);
      }
    };
    this.mountOrganizationList = (node, props) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountOrganizationList(node, props);
      } else {
        this.premountOrganizationListNodes.set(node, props);
      }
    };
    this.unmountOrganizationList = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountOrganizationList(node);
      } else {
        this.premountOrganizationListNodes.delete(node);
      }
    };
    this.mountUserButton = (node, userButtonProps) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.mountUserButton(node, userButtonProps);
      } else {
        this.premountUserButtonNodes.set(node, userButtonProps);
      }
    };
    this.unmountUserButton = (node) => {
      if (this.clerkjs && __privateGet(this, _loaded)) {
        this.clerkjs.unmountUserButton(node);
      } else {
        this.premountUserButtonNodes.delete(node);
      }
    };
    this.addListener = (listener) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.addListener(listener);
      };
      if (this.clerkjs) {
        return callback();
      } else {
        this.premountMethodCalls.set("addListener", callback);
        return () => this.premountMethodCalls.delete("addListener");
      }
    };
    this.navigate = (to) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.navigate(to);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("navigate", callback);
      }
    };
    this.redirectWithAuth = (...args) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectWithAuth(...args);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("redirectWithAuth", callback);
      }
    };
    this.redirectToSignIn = (opts) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToSignIn(opts);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("redirectToSignIn", callback);
      }
    };
    this.redirectToSignUp = (opts) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToSignUp(opts);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void callback();
      } else {
        this.premountMethodCalls.set("redirectToSignUp", callback);
      }
    };
    this.redirectToUserProfile = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToUserProfile();
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToUserProfile", callback);
      }
    };
    this.redirectToHome = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToHome();
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToHome", callback);
      }
    };
    this.redirectToOrganizationProfile = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToOrganizationProfile();
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToOrganizationProfile", callback);
      }
    };
    this.redirectToCreateOrganization = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToCreateOrganization();
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToCreateOrganization", callback);
      }
    };
    this.handleRedirectCallback = (params) => {
      var _a;
      const callback = () => {
        var _a2;
        return (_a2 = this.clerkjs) == null ? void 0 : _a2.handleRedirectCallback(params);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void ((_a = callback()) == null ? void 0 : _a.catch(() => {
        }));
      } else {
        this.premountMethodCalls.set("handleRedirectCallback", callback);
      }
    };
    /**
     * @deprecated Use `handleEmailLinkVerification` instead.
     */
    this.handleMagicLinkVerification = async (params) => {
      (0,dist_deprecated/* deprecated */.io)("handleMagicLinkVerification", "Use `handleEmailLinkVerification` instead.");
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.handleMagicLinkVerification(params);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("handleMagicLinkVerification", callback);
      }
    };
    this.handleGoogleOneTapCallback = (signInOrUp, params) => {
      var _a;
      const callback = () => {
        var _a2;
        return (_a2 = this.clerkjs) == null ? void 0 : _a2.handleGoogleOneTapCallback(signInOrUp, params);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        void ((_a = callback()) == null ? void 0 : _a.catch(() => {
        }));
      } else {
        this.premountMethodCalls.set("handleGoogleOneTapCallback", callback);
      }
    };
    this.handleEmailLinkVerification = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.handleEmailLinkVerification(params);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("handleEmailLinkVerification", callback);
      }
    };
    this.authenticateWithMetamask = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.authenticateWithMetamask(params);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("authenticateWithMetamask", callback);
      }
    };
    this.authenticateWithGoogleOneTap = async (params) => {
      const clerkjs = await __privateMethod(this, _waitForClerkJS, waitForClerkJS_fn).call(this);
      return clerkjs.authenticateWithGoogleOneTap(params);
    };
    this.createOrganization = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.createOrganization(params);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("createOrganization", callback);
      }
    };
    this.getOrganizationMemberships = async () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.getOrganizationMemberships();
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("getOrganizationMemberships", callback);
      }
    };
    this.getOrganization = async (organizationId) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.getOrganization(organizationId);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("getOrganization", callback);
      }
    };
    this.signOut = async (signOutCallbackOrOptions, options) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.signOut(signOutCallbackOrOptions, options);
      };
      if (this.clerkjs && __privateGet(this, _loaded)) {
        return callback();
      } else {
        this.premountMethodCalls.set("signOut", callback);
      }
    };
    const { Clerk = null, frontendApi, publishableKey } = options || {};
    __privateSet(this, _frontendApi, frontendApi);
    __privateSet(this, _publishableKey, publishableKey);
    __privateSet(this, _proxyUrl, options == null ? void 0 : options.proxyUrl);
    __privateSet(this, _domain, options == null ? void 0 : options.domain);
    this.options = options;
    this.Clerk = Clerk;
    this.mode = inBrowser() ? "browser" : "server";
    void this.loadClerkJS();
  }
  get publishableKey() {
    return __privateGet(this, _publishableKey);
  }
  get loaded() {
    return __privateGet(this, _loaded);
  }
  static getOrCreateInstance(options) {
    if (!inBrowser() || !__privateGet(this, _instance) || options.Clerk && __privateGet(this, _instance).Clerk !== options.Clerk) {
      __privateSet(this, _instance, new _IsomorphicClerk(options));
    }
    return __privateGet(this, _instance);
  }
  static clearInstance() {
    __privateSet(this, _instance, null);
  }
  get domain() {
    if (typeof window !== "undefined" && window.location) {
      return (0,handleValueOrFn/* handleValueOrFn */.V)(__privateGet(this, _domain), new URL(window.location.href), "");
    }
    if (typeof __privateGet(this, _domain) === "function") {
      throw new Error(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return __privateGet(this, _domain) || "";
  }
  get proxyUrl() {
    if (typeof window !== "undefined" && window.location) {
      return (0,handleValueOrFn/* handleValueOrFn */.V)(__privateGet(this, _proxyUrl), new URL(window.location.href), "");
    }
    if (typeof __privateGet(this, _proxyUrl) === "function") {
      throw new Error(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return __privateGet(this, _proxyUrl) || "";
  }
  get sdkMetadata() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.sdkMetadata) || this.options.sdkMetadata || void 0;
  }
  get instanceType() {
    var _a;
    return (_a = this.clerkjs) == null ? void 0 : _a.instanceType;
  }
  get frontendApi() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.frontendApi) || __privateGet(this, _frontendApi) || "";
  }
  get isStandardBrowser() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.isStandardBrowser) || this.options.standardBrowser || false;
  }
  get isSatellite() {
    if (typeof window !== "undefined" && window.location) {
      return (0,handleValueOrFn/* handleValueOrFn */.V)(this.options.isSatellite, new URL(window.location.href), false);
    }
    if (typeof this.options.isSatellite === "function") {
      throw new Error(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return false;
  }
  async loadClerkJS() {
    var _a, _b, _c;
    if (this.mode !== "browser" || __privateGet(this, _loaded)) {
      return;
    }
    if (typeof window !== "undefined") {
      window.__clerk_frontend_api = this.frontendApi;
      window.__clerk_publishable_key = this.publishableKey;
      window.__clerk_proxy_url = this.proxyUrl;
      window.__clerk_domain = this.domain;
    }
    try {
      if (this.Clerk) {
        let c;
        if (isConstructor(this.Clerk)) {
          c = new this.Clerk(this.publishableKey || this.frontendApi || "", {
            proxyUrl: this.proxyUrl,
            domain: this.domain
          });
          await c.load(this.options);
        } else {
          c = this.Clerk;
          if (!c.isReady()) {
            await c.load(this.options);
          }
        }
        global.Clerk = c;
      } else {
        if (!global.Clerk) {
          await loadClerkJsScript({
            ...this.options,
            frontendApi: this.frontendApi,
            publishableKey: this.publishableKey,
            proxyUrl: this.proxyUrl,
            domain: this.domain
          });
        }
        if (!global.Clerk) {
          throw new Error("Failed to download latest ClerkJS. Contact support@clerk.com.");
        }
        await global.Clerk.load(this.options);
      }
      global.Clerk.sdkMetadata = (_a = this.options.sdkMetadata) != null ? _a : { name: "@clerk/clerk-react", version: "4.32.5" };
      if (((_b = global.Clerk) == null ? void 0 : _b.loaded) || ((_c = global.Clerk) == null ? void 0 : _c.isReady())) {
        return this.hydrateClerkJS(global.Clerk);
      }
      return;
    } catch (err) {
      const error = err;
      if (true) {
        console.error(error.stack || error.message || error);
      } else {}
      return;
    }
  }
  get version() {
    var _a;
    return (_a = this.clerkjs) == null ? void 0 : _a.version;
  }
  get client() {
    if (this.clerkjs) {
      return this.clerkjs.client;
    } else {
      return void 0;
    }
  }
  get session() {
    if (this.clerkjs) {
      return this.clerkjs.session;
    } else {
      return void 0;
    }
  }
  get user() {
    if (this.clerkjs) {
      return this.clerkjs.user;
    } else {
      return void 0;
    }
  }
  get organization() {
    if (this.clerkjs) {
      return this.clerkjs.organization;
    } else {
      return void 0;
    }
  }
  get __unstable__environment() {
    if (this.clerkjs) {
      return this.clerkjs.__unstable__environment;
    } else {
      return void 0;
    }
  }
  __unstable__setEnvironment(...args) {
    if (this.clerkjs && "__unstable__setEnvironment" in this.clerkjs) {
      this.clerkjs.__unstable__setEnvironment(args);
    } else {
      return void 0;
    }
  }
};
_loaded = new WeakMap();
_domain = new WeakMap();
_proxyUrl = new WeakMap();
_frontendApi = new WeakMap();
_publishableKey = new WeakMap();
_instance = new WeakMap();
_waitForClerkJS = new WeakSet();
waitForClerkJS_fn = function() {
  return new Promise((resolve) => {
    if (__privateGet(this, _loaded)) {
      resolve(this.clerkjs);
    }
    this.addOnLoaded(() => resolve(this.clerkjs));
  });
};
__privateAdd(_IsomorphicClerk, _instance, void 0);
let IsomorphicClerk = _IsomorphicClerk;

//# sourceMappingURL=isomorphicClerk.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/deriveState.js

const deriveState = (clerkLoaded, state, initialState) => {
  if (!clerkLoaded && initialState) {
    return deriveFromSsrInitialState(initialState);
  }
  return deriveFromClientSideState(state);
};
const deriveFromSsrInitialState = (initialState) => {
  const userId = initialState.userId;
  const user = initialState.user;
  const sessionId = initialState.sessionId;
  const session = initialState.session;
  const organization = initialState.organization;
  const orgId = initialState.orgId;
  const orgRole = initialState.orgRole;
  const orgPermissions = initialState.orgPermissions;
  const orgSlug = initialState.orgSlug;
  const actor = initialState.actor;
  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgPermissions,
    orgSlug,
    actor,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null
  };
};
const deriveFromClientSideState = (state) => {
  var _a;
  const userId = state.user ? state.user.id : state.user;
  const user = state.user;
  const sessionId = state.session ? state.session.id : state.session;
  const session = state.session;
  const actor = session == null ? void 0 : session.actor;
  const organization = state.organization;
  const orgId = state.organization ? state.organization.id : state.organization;
  const orgSlug = organization == null ? void 0 : organization.slug;
  const membership = organization ? (_a = user == null ? void 0 : user.organizationMemberships) == null ? void 0 : _a.find((om) => om.organization.id === orgId) : organization;
  const orgPermissions = membership ? membership.permissions : membership;
  const orgRole = membership ? membership.role : membership;
  const lastOrganizationInvitation = state.lastOrganizationInvitation;
  const lastOrganizationMember = state.lastOrganizationMember;
  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    orgPermissions,
    actor,
    lastOrganizationInvitation,
    lastOrganizationMember
  };
};

//# sourceMappingURL=deriveState.js.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-IC4FGZI3.mjs
var chunk_IC4FGZI3 = __webpack_require__(65620);
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(57379);
;// ./node_modules/@clerk/shared/node_modules/swr/_internal/dist/index.mjs


// Shared state between server components and client components
const dist_noop = ()=>{};
// Using noop() as the undefined value as undefined can be replaced
// by something else. Prettier ignore and extra parentheses are necessary here
// to ensure that tsc doesn't remove the __NOINLINE__ comment.
// prettier-ignore
const UNDEFINED = /*#__NOINLINE__*/ dist_noop();
const OBJECT = Object;
const isUndefined = (v)=>v === UNDEFINED;
const isFunction = (v)=>typeof v == 'function';
const mergeObjects = (a, b)=>({
        ...a,
        ...b
    });
const isPromiseLike = (x)=>isFunction(x.then);

// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();
// counter of the key
let counter = 0;
// A stable hash implementation that supports:
// - Fast and ensures unique hash properties
// - Handles unserializable values
// - Handles object key ordering
// - Generates short results
//
// This is not a serialization function, and the result is not guaranteed to be
// parsable.
const stableHash = (arg)=>{
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
        // Object/function, not null/date/regexp. Use WeakMap to store the id first.
        // If it's already hashed, directly return the result.
        result = table.get(arg);
        if (result) return result;
        // Store the hash first for circular reference detection before entering the
        // recursive `stableHash` calls.
        // For other objects like set and map, we use this id directly as the hash.
        result = ++counter + '~';
        table.set(arg, result);
        if (constructor == Array) {
            // Array.
            result = '@';
            for(index = 0; index < arg.length; index++){
                result += stableHash(arg[index]) + ',';
            }
            table.set(arg, result);
        }
        if (constructor == OBJECT) {
            // Object, sort keys.
            result = '#';
            const keys = OBJECT.keys(arg).sort();
            while(!isUndefined(index = keys.pop())){
                if (!isUndefined(arg[index])) {
                    result += index + ':' + stableHash(arg[index]) + ',';
                }
            }
            table.set(arg, result);
        }
    } else {
        result = isDate ? arg.toJSON() : type == 'symbol' ? arg.toString() : type == 'string' ? JSON.stringify(arg) : '' + arg;
    }
    return result;
};

// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const INITIAL_CACHE = {};
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>!isUndefined(key) && cache.get(key) || EMPTY_CACHE,
        // Setter
        (info)=>{
            if (!isUndefined(key)) {
                const prev = cache.get(key);
                // Before writing to the store, we keep the value in the initial cache
                // if it's not there yet.
                if (!(key in INITIAL_CACHE)) {
                    INITIAL_CACHE[key] = prev;
                }
                state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
            }
        },
        // Subscriber
        state[6],
        // Get server cache snapshot
        ()=>{
            if (!isUndefined(key)) {
                // If the cache was updated on the client, we return the stored initial value.
                if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
            }
            // If we haven't done any client-side updates, we return the current value.
            return !isUndefined(key) && cache.get(key) || EMPTY_CACHE;
        }
    ];
} // export { UNDEFINED, OBJECT, isUndefined, isFunction, mergeObjects, isPromiseLike }
;

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on `navigator.onLine`.
 * As a workaround, we always assume it's online on the first load, and change
 * the status upon `online` or `offline` events.
 */ let online = true;
const isOnline = ()=>online;
// For node and React Native, `add/removeEventListener` doesn't exist on window.
const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
] : [
    dist_noop,
    dist_noop
];
const isVisible = ()=>{
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== 'hidden';
};
const initFocus = (callback)=>{
    // focus revalidate
    if (isDocumentDefined) {
        document.addEventListener('visibilitychange', callback);
    }
    onWindowEvent('focus', callback);
    return ()=>{
        if (isDocumentDefined) {
            document.removeEventListener('visibilitychange', callback);
        }
        offWindowEvent('focus', callback);
    };
};
const initReconnect = (callback)=>{
    // revalidate on reconnected
    const onOnline = ()=>{
        online = true;
        callback();
    };
    // nothing to revalidate, just update the status
    const onOffline = ()=>{
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return ()=>{
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
const preset = {
    isOnline,
    isVisible
};
const defaultConfigOptions = {
    initFocus,
    initReconnect
};

const IS_REACT_LEGACY = !react.useId;
const IS_SERVER = !isWindowDefined || 'Deno' in window;
// Polyfill requestAnimationFrame
const rAF = (f)=>hasRequestAnimationFrame() ? window['requestAnimationFrame'](f) : setTimeout(f, 1);
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = IS_SERVER ? react.useEffect : react.useLayoutEffect;
// This assignment is to extend the Navigator type to use effectiveType.
const navigatorConnection = typeof navigator !== 'undefined' && navigator.connection;
// Adjust the config based on slow connection status (<= 70Kbps).
const slowConnection = !IS_SERVER && navigatorConnection && ([
    'slow-2g',
    '2g'
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);

const serialize = (key)=>{
    if (isFunction(key)) {
        try {
            key = key();
        } catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    // Use the original key as the argument of fetcher. This can be a string or an
    // array of values.
    const args = key;
    // If key is not falsy, or not an empty array, hash it.
    key = typeof key == 'string' ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : '';
    return [
        key,
        args
    ];
};

// Global timestamp.
let __timestamp = 0;
const getTimestamp = ()=>++__timestamp;

const FOCUS_EVENT = 0;
const RECONNECT_EVENT = 1;
const MUTATE_EVENT = 2;
const ERROR_REVALIDATE_EVENT = 3;

var constants = {
  __proto__: null,
  ERROR_REVALIDATE_EVENT: ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: FOCUS_EVENT,
  MUTATE_EVENT: MUTATE_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT
};

async function internalMutate(...args) {
    const [cache, _key, _data, _opts] = args;
    // When passing as a boolean, it's explicitly used to disable/enable
    // revalidation.
    const options = mergeObjects({
        populateCache: true,
        throwOnError: true
    }, typeof _opts === 'boolean' ? {
        revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const revalidate = options.revalidate !== false;
    const rollbackOnError = (error)=>{
        return typeof rollbackOnErrorOption === 'function' ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    // If the second argument is a key filter, return the mutation results for all
    // filtered keys.
    if (isFunction(_key)) {
        const keyFilter = _key;
        const matchedKeys = [];
        const it = cache.keys();
        for (const key of it){
            if (// Skip the special useSWRInfinite and useSWRSubscription keys.
            !/^\$(inf|sub)\$/.test(key) && keyFilter(cache.get(key)._k)) {
                matchedKeys.push(key);
            }
        }
        return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
        // Serialize key
        const [key] = serialize(_k);
        if (!key) return;
        const [get, set] = createCacheHelper(cache, key);
        const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
        const revalidators = EVENT_REVALIDATORS[key];
        const startRevalidate = ()=>{
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
                delete PRELOAD[key];
                if (revalidators && revalidators[0]) {
                    return revalidators[0](MUTATE_EVENT).then(()=>get().data);
                }
            }
            return get().data;
        };
        // If there is no new data provided, revalidate the key with current state.
        if (args.length < 3) {
            // Revalidate and broadcast state.
            return startRevalidate();
        }
        let data = _data;
        let error;
        // Update global timestamps.
        const beforeMutationTs = getTimestamp();
        MUTATION[key] = [
            beforeMutationTs,
            0
        ];
        const hasOptimisticData = !isUndefined(optimisticData);
        const state = get();
        // `displayedData` is the current value on screen. It could be the optimistic value
        // that is going to be overridden by a `committedData`, or get reverted back.
        // `committedData` is the validated value that comes from a fetch or mutation.
        const displayedData = state.data;
        const currentData = state._c;
        const committedData = isUndefined(currentData) ? displayedData : currentData;
        // Do optimistic data update.
        if (hasOptimisticData) {
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
            // When we set optimistic data, backup the current committedData data in `_c`.
            set({
                data: optimisticData,
                _c: committedData
            });
        }
        if (isFunction(data)) {
            // `data` is a function, call it passing current cache value.
            try {
                data = data(committedData);
            } catch (err) {
                // If it throws an error synchronously, we shouldn't update the cache.
                error = err;
            }
        }
        // `data` is a promise/thenable, resolve the final data first.
        if (data && isPromiseLike(data)) {
            // This means that the mutation is async, we need to check timestamps to
            // avoid race conditions.
            data = await data.catch((err)=>{
                error = err;
            });
            // Check if other mutations have occurred since we've started this mutation.
            // If there's a race we don't update cache or broadcast the change,
            // just return the data.
            if (beforeMutationTs !== MUTATION[key][0]) {
                if (error) throw error;
                return data;
            } else if (error && hasOptimisticData && rollbackOnError(error)) {
                // Rollback. Always populate the cache in this case but without
                // transforming the data.
                populateCache = true;
                data = committedData;
                // Reset data to be the latest committed data, and clear the `_c` value.
                set({
                    data,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    data = populateCache(data, committedData);
                }
                // Only update cached data and reset the error if there's no error. Data can be `undefined` here.
                set({
                    data,
                    error: UNDEFINED,
                    _c: UNDEFINED
                });
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        const res = await startRevalidate();
        // The mutation and revalidation are ended, we can clear it since the data is
        // not an optimistic value anymore.
        set({
            _c: UNDEFINED
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return populateCache ? res : data;
    }
}

const revalidateAllKeys = (revalidators, type)=>{
    for(const key in revalidators){
        if (revalidators[key][0]) revalidators[key][0](type);
    }
};
const initCache = (provider, options)=>{
    // The global state for a specific provider will be used to deduplicate
    // requests and store listeners. As well as a mutate function that is bound to
    // the cache.
    // The provider's global state might be already initialized. Let's try to get the
    // global state associated with the provider first.
    if (!SWRGlobalState.has(provider)) {
        const opts = mergeObjects(defaultConfigOptions, options);
        // If there's no global state bound to the provider, create a new one with the
        // new mutate function.
        const EVENT_REVALIDATORS = {};
        const mutate = internalMutate.bind(UNDEFINED, provider);
        let unmount = dist_noop;
        const subscriptions = {};
        const subscribe = (key, callback)=>{
            const subs = subscriptions[key] || [];
            subscriptions[key] = subs;
            subs.push(callback);
            return ()=>subs.splice(subs.indexOf(callback), 1);
        };
        const setter = (key, value, prev)=>{
            provider.set(key, value);
            const subs = subscriptions[key];
            if (subs) {
                for (const fn of subs){
                    fn(value, prev);
                }
            }
        };
        const initProvider = ()=>{
            if (!SWRGlobalState.has(provider)) {
                // Update the state if it's new, or if the provider has been extended.
                SWRGlobalState.set(provider, [
                    EVENT_REVALIDATORS,
                    {},
                    {},
                    {},
                    mutate,
                    setter,
                    subscribe
                ]);
                if (!IS_SERVER) {
                    // When listening to the native events for auto revalidations,
                    // we intentionally put a delay (setTimeout) here to make sure they are
                    // fired after immediate JavaScript executions, which can be
                    // React's state updates.
                    // This avoids some unnecessary revalidations such as
                    // https://github.com/vercel/swr/issues/1680.
                    const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
                    const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
                    unmount = ()=>{
                        releaseFocus && releaseFocus();
                        releaseReconnect && releaseReconnect();
                        // When un-mounting, we need to remove the cache provider from the state
                        // storage too because it's a side-effect. Otherwise, when re-mounting we
                        // will not re-register those event listeners.
                        SWRGlobalState.delete(provider);
                    };
                }
            }
        };
        initProvider();
        // This is a new provider, we need to initialize it and setup DOM events
        // listeners for `focus` and `reconnect` actions.
        // We might want to inject an extra layer on top of `provider` in the future,
        // such as key serialization, auto GC, etc.
        // For now, it's just a `Map` interface without any modifications.
        return [
            provider,
            mutate,
            initProvider,
            unmount
        ];
    }
    return [
        provider,
        SWRGlobalState.get(provider)[4]
    ];
};

// error retry
const onErrorRetry = (_, __, config, revalidate, opts)=>{
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    // Exponential backoff
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
        return;
    }
    setTimeout(revalidate, timeout, opts);
};
const compare = (currentData, newData)=>stableHash(currentData) == stableHash(newData);
// Default cache provider
const [cache, mutate] = initCache(new Map());
// Default config
const defaultConfig = mergeObjects({
    // events
    onLoadingSlow: dist_noop,
    onSuccess: dist_noop,
    onError: dist_noop,
    onErrorRetry,
    onDiscarded: dist_noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 10000 : 5000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: slowConnection ? 5000 : 3000,
    // providers
    compare,
    isPaused: ()=>false,
    cache,
    mutate,
    fallback: {}
}, // use web preset by default
preset);

const mergeConfigs = (a, b)=>{
    // Need to create a new object to avoid mutating the original here.
    const v = mergeObjects(a, b);
    // If two configs are provided, merge their `use` and `fallback` options.
    if (b) {
        const { use: u1 , fallback: f1  } = a;
        const { use: u2 , fallback: f2  } = b;
        if (u1 && u2) {
            v.use = u1.concat(u2);
        }
        if (f1 && f2) {
            v.fallback = mergeObjects(f1, f2);
        }
    }
    return v;
};

const SWRConfigContext = (0,react.createContext)({});
const SWRConfig = (props)=>{
    const { value  } = props;
    const parentConfig = (0,react.useContext)(SWRConfigContext);
    const isFunctionalConfig = isFunction(value);
    const config = (0,react.useMemo)(()=>isFunctionalConfig ? value(parentConfig) : value, [
        isFunctionalConfig,
        parentConfig,
        value
    ]);
    // Extend parent context values and middleware.
    const extendedConfig = (0,react.useMemo)(()=>isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
        isFunctionalConfig,
        parentConfig,
        config
    ]);
    // Should not use the inherited provider.
    const provider = config && config.provider;
    // initialize the cache only on first access.
    const cacheContextRef = (0,react.useRef)(UNDEFINED);
    if (provider && !cacheContextRef.current) {
        cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
    }
    const cacheContext = cacheContextRef.current;
    // Override the cache if a new provider is given.
    if (cacheContext) {
        extendedConfig.cache = cacheContext[0];
        extendedConfig.mutate = cacheContext[1];
    }
    // Unsubscribe events.
    useIsomorphicLayoutEffect(()=>{
        if (cacheContext) {
            cacheContext[2] && cacheContext[2]();
            return cacheContext[3];
        }
    }, []);
    return (0,react.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
        value: extendedConfig
    }));
};

// @ts-expect-error
const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
const use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
const setupDevTools = ()=>{
    if (enableDevtools) {
        // @ts-expect-error
        window.__SWR_DEVTOOLS_REACT__ = react;
    }
};

const normalize = (args)=>{
    return isFunction(args[1]) ? [
        args[0],
        args[1],
        args[2] || {}
    ] : [
        args[0],
        null,
        (args[1] === null ? args[2] : args[1]) || {}
    ];
};

const useSWRConfig = ()=>{
    return mergeObjects(defaultConfig, (0,react.useContext)(SWRConfigContext));
};

const preload = (key_, fetcher)=>{
    const [key, fnArg] = serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(fnArg);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const [key] = serialize(key_);
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            const req = PRELOAD[key];
            if (isUndefined(req)) return fetcher_(...args);
            delete PRELOAD[key];
            return req;
        });
        return useSWRNext(key_, fetcher, config);
    };

const BUILT_IN_MIDDLEWARE = use.concat(middleware);

// It's tricky to pass generic types as parameters, so we just directly override
// the types here.
const withArgs = (hook)=>{
    return function useSWRArgs(...args) {
        // Get the default and inherited configuration.
        const fallbackConfig = useSWRConfig();
        // Normalize arguments.
        const [key, fn, _config] = normalize(args);
        // Merge configurations.
        const config = mergeConfigs(fallbackConfig, _config);
        // Apply middleware
        let next = hook;
        const { use  } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

/**
 * An implementation of state with dependency-tracking.
 */ const useStateWithDeps = (state)=>{
    const rerender = useState({})[1];
    const unmountedRef = useRef(false);
    const stateRef = useRef(state);
    // If a state property (data, error, or isValidating) is accessed by the render
    // function, we mark the property as a dependency so if it is updated again
    // in the future, we trigger a rerender.
    // This is also known as dependency-tracking.
    const stateDependenciesRef = useRef({
        data: false,
        error: false,
        isValidating: false
    });
    /**
   * @param payload To change stateRef, pass the values explicitly to setState:
   * @example
   * ```js
   * setState({
   *   isValidating: false
   *   data: newData // set data to newData
   *   error: undefined // set error to undefined
   * })
   *
   * setState({
   *   isValidating: false
   *   data: undefined // set data to undefined
   *   error: err // set error to err
   * })
   * ```
   */ const setState = useCallback((payload)=>{
        let shouldRerender = false;
        const currentState = stateRef.current;
        for(const _ in payload){
            const k = _;
            // If the property has changed, update the state and mark rerender as
            // needed.
            if (currentState[k] !== payload[k]) {
                currentState[k] = payload[k];
                // If the property is accessed by the component, a rerender should be
                // triggered.
                if (stateDependenciesRef.current[k]) {
                    shouldRerender = true;
                }
            }
        }
        if (shouldRerender && !unmountedRef.current) {
            if (IS_REACT_LEGACY) {
                rerender({});
            } else {
                React.startTransition(()=>rerender({}));
            }
        }
    }, [
        rerender
    ]);
    useIsomorphicLayoutEffect(()=>{
        unmountedRef.current = false;
        return ()=>{
            unmountedRef.current = true;
        };
    });
    return [
        stateRef,
        stateDependenciesRef.current,
        setState
    ];
};

// Add a callback function to a list of keyed callback functions and return
// the unsubscribe function.
const subscribeCallback = (key, callbacks, callback)=>{
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return ()=>{
        const index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
            // O(1): faster than splice
            keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
            keyedRevalidators.pop();
        }
    };
};

// Create a custom hook with a middleware
const withMiddleware = (useSWR, middleware)=>{
    return (...args)=>{
        const [key, fn, config] = normalize(args);
        const uses = (config.use || []).concat(middleware);
        return useSWR(key, fn, {
            ...config,
            use: uses
        });
    };
};

setupDevTools();



;// ./node_modules/@clerk/shared/node_modules/swr/core/dist/index.mjs





const unstable_serialize = (key)=>serialize(key)[0];

/// <reference types="react/experimental" />
const dist_use = react.use || ((promise)=>{
    if (promise.status === 'pending') {
        throw promise;
    } else if (promise.status === 'fulfilled') {
        return promise.value;
    } else if (promise.status === 'rejected') {
        throw promise.reason;
    } else {
        promise.status = 'pending';
        promise.then((v)=>{
            promise.status = 'fulfilled';
            promise.value = v;
        }, (e)=>{
            promise.status = 'rejected';
            promise.reason = e;
        });
        throw promise;
    }
});
const WITH_DEDUPE = {
    dedupe: true
};
const useSWRHandler = (_key, fetcher, config)=>{
    const { cache , compare , suspense , fallbackData , revalidateOnMount , revalidateIfStale , refreshInterval , refreshWhenHidden , refreshWhenOffline , keepPreviousData  } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
    // `key` is the identifier of the SWR internal state,
    // `fnArg` is the argument/arguments parsed from the key, which will be passed
    // to the fetcher.
    // All of them are derived from `_key`.
    const [key, fnArg] = serialize(_key);
    // If it's the initial render of this hook.
    const initialMountedRef = (0,react.useRef)(false);
    // If the hook is unmounted already. This will be used to prevent some effects
    // to be called after unmounting.
    const unmountedRef = (0,react.useRef)(false);
    // Refs to keep the key and config.
    const keyRef = (0,react.useRef)(key);
    const fetcherRef = (0,react.useRef)(fetcher);
    const configRef = (0,react.useRef)(config);
    const getConfig = ()=>configRef.current;
    const isActive = ()=>getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache, key);
    const stateDependencies = (0,react.useRef)({}).current;
    const fallback = isUndefined(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current)=>{
        for(const _ in stateDependencies){
            const t = _;
            if (t === 'data') {
                if (!compare(prev[t], current[t])) {
                    if (!isUndefined(prev[t])) {
                        return false;
                    }
                    if (!compare(returnedData, current[t])) {
                        return false;
                    }
                }
            } else {
                if (current[t] !== prev[t]) {
                    return false;
                }
            }
        }
        return true;
    };
    const getSnapshot = (0,react.useMemo)(()=>{
        const shouldStartRequest = (()=>{
            if (!key) return false;
            if (!fetcher) return false;
            // If `revalidateOnMount` is set, we take the value directly.
            if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
            // If it's paused, we skip revalidation.
            if (getConfig().isPaused()) return false;
            if (suspense) return false;
            if (!isUndefined(revalidateIfStale)) return revalidateIfStale;
            return true;
        })();
        // Get the cache and merge it with expected states.
        const getSelectedCache = (state)=>{
            // We only select the needed fields from the state.
            const snapshot = mergeObjects(state);
            delete snapshot._k;
            if (!shouldStartRequest) {
                return snapshot;
            }
            return {
                isValidating: true,
                isLoading: true,
                ...snapshot
            };
        };
        const cachedData = getCache();
        const initialData = getInitialCache();
        const clientSnapshot = getSelectedCache(cachedData);
        const serverSnapshot = cachedData === initialData ? clientSnapshot : getSelectedCache(initialData);
        // To make sure that we are returning the same object reference to avoid
        // unnecessary re-renders, we keep the previous snapshot and use deep
        // comparison to check if we need to return a new one.
        let memorizedSnapshot = clientSnapshot;
        return [
            ()=>{
                const newSnapshot = getSelectedCache(getCache());
                const compareResult = isEqual(newSnapshot, memorizedSnapshot);
                if (compareResult) {
                    // Mentally, we should always return the `memorizedSnapshot` here
                    // as there's no change between the new and old snapshots.
                    // However, since the `isEqual` function only compares selected fields,
                    // the values of the unselected fields might be changed. That's
                    // simply because we didn't track them.
                    // To support the case in https://github.com/vercel/swr/pull/2576,
                    // we need to update these fields in the `memorizedSnapshot` too
                    // with direct mutations to ensure the snapshot is always up-to-date
                    // even for the unselected fields, but only trigger re-renders when
                    // the selected fields are changed.
                    memorizedSnapshot.data = newSnapshot.data;
                    memorizedSnapshot.isLoading = newSnapshot.isLoading;
                    memorizedSnapshot.isValidating = newSnapshot.isValidating;
                    memorizedSnapshot.error = newSnapshot.error;
                    return memorizedSnapshot;
                } else {
                    memorizedSnapshot = newSnapshot;
                    return newSnapshot;
                }
            },
            ()=>serverSnapshot
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cache,
        key
    ]);
    // Get the current state that SWR should return.
    const cached = (0,shim.useSyncExternalStore)((0,react.useCallback)((callback)=>subscribeCache(key, (current, prev)=>{
            if (!isEqual(prev, current)) callback();
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        cache,
        key
    ]), getSnapshot[0], getSnapshot[1]);
    const isInitialMount = !initialMountedRef.current;
    const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
    const cachedData = cached.data;
    const data = isUndefined(cachedData) ? fallback : cachedData;
    const error = cached.error;
    // Use a ref to store previously returned data. Use the initial data as its initial value.
    const laggyDataRef = (0,react.useRef)(data);
    const returnedData = keepPreviousData ? isUndefined(cachedData) ? laggyDataRef.current : cachedData : data;
    // - Suspense mode and there's stale data for the initial render.
    // - Not suspense mode and there is no fallback data and `revalidateIfStale` is enabled.
    // - `revalidateIfStale` is enabled but `data` is not defined.
    const shouldDoInitialRevalidation = (()=>{
        // if a key already has revalidators and also has error, we should not trigger revalidation
        if (hasRevalidator && !isUndefined(error)) return false;
        // If `revalidateOnMount` is set, we take the value directly.
        if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
        // If it's paused, we skip revalidation.
        if (getConfig().isPaused()) return false;
        // Under suspense mode, it will always fetch on render if there is no
        // stale data so no need to revalidate immediately mount it again.
        // If data exists, only revalidate if `revalidateIfStale` is true.
        if (suspense) return isUndefined(data) ? false : revalidateIfStale;
        // If there is no stale data, we need to revalidate when mount;
        // If `revalidateIfStale` is set to true, we will always revalidate.
        return isUndefined(data) || revalidateIfStale;
    })();
    // Resolve the default validating state:
    // If it's able to validate, and it should revalidate when mount, this will be true.
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    // The revalidation function is a carefully crafted wrapper of the original
    // `fetcher`, to correctly handle the many edge cases.
    const revalidate = (0,react.useCallback)(async (revalidateOpts)=>{
        const currentFetcher = fetcherRef.current;
        if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
            return false;
        }
        let newData;
        let startAt;
        let loading = true;
        const opts = revalidateOpts || {};
        // If there is no ongoing concurrent request, or `dedupe` is not set, a
        // new request should be initiated.
        const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
        /*
         For React 17
         Do unmount check for calls:
         If key has changed during the revalidation, or the component has been
         unmounted, old dispatch and old event callbacks should not take any
         effect

        For React 18
        only check if key has changed
        https://github.com/reactwg/react-18/discussions/82
      */ const callbackSafeguard = ()=>{
            if (IS_REACT_LEGACY) {
                return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
            }
            return key === keyRef.current;
        };
        // The final state object when the request finishes.
        const finalState = {
            isValidating: false,
            isLoading: false
        };
        const finishRequestAndUpdateState = ()=>{
            setCache(finalState);
        };
        const cleanupState = ()=>{
            // Check if it's still the same request before deleting it.
            const requestInfo = FETCH[key];
            if (requestInfo && requestInfo[1] === startAt) {
                delete FETCH[key];
            }
        };
        // Start fetching. Change the `isValidating` state, update the cache.
        const initialState = {
            isValidating: true
        };
        // It is in the `isLoading` state, if and only if there is no cached data.
        // This bypasses fallback data and laggy data.
        if (isUndefined(getCache().data)) {
            initialState.isLoading = true;
        }
        try {
            if (shouldStartNewRequest) {
                setCache(initialState);
                // If no cache is being rendered currently (it shows a blank page),
                // we trigger the loading slow event.
                if (config.loadingTimeout && isUndefined(getCache().data)) {
                    setTimeout(()=>{
                        if (loading && callbackSafeguard()) {
                            getConfig().onLoadingSlow(key, config);
                        }
                    }, config.loadingTimeout);
                }
                // Start the request and save the timestamp.
                // Key must be truthy if entering here.
                FETCH[key] = [
                    currentFetcher(fnArg),
                    getTimestamp()
                ];
            }
            [newData, startAt] = FETCH[key];
            newData = await newData;
            if (shouldStartNewRequest) {
                // If the request isn't interrupted, clean it up after the
                // deduplication interval.
                setTimeout(cleanupState, config.dedupingInterval);
            }
            // If there're other ongoing request(s), started after the current one,
            // we need to ignore the current one to avoid possible race conditions:
            //   req1------------------>res1        (current one)
            //        req2---------------->res2
            // the request that fired later will always be kept.
            // The timestamp maybe be `undefined` or a number
            if (!FETCH[key] || FETCH[key][1] !== startAt) {
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Clear error.
            finalState.error = UNDEFINED;
            // If there're other mutations(s), that overlapped with the current revalidation:
            // case 1:
            //   req------------------>res
            //       mutate------>end
            // case 2:
            //         req------------>res
            //   mutate------>end
            // case 3:
            //   req------------------>res
            //       mutate-------...---------->
            // we have to ignore the revalidation result (res) because it's no longer fresh.
            // meanwhile, a new revalidation should be triggered when the mutation ends.
            const mutationInfo = MUTATION[key];
            if (!isUndefined(mutationInfo) && // case 1
            (startAt <= mutationInfo[0] || // case 2
            startAt <= mutationInfo[1] || // case 3
            mutationInfo[1] === 0)) {
                finishRequestAndUpdateState();
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Deep compare with the latest state to avoid extra re-renders.
            // For local state, compare and assign.
            const cacheData = getCache().data;
            // Since the compare fn could be custom fn
            // cacheData might be different from newData even when compare fn returns True
            finalState.data = compare(cacheData, newData) ? cacheData : newData;
            // Trigger the successful callback if it's the original request.
            if (shouldStartNewRequest) {
                if (callbackSafeguard()) {
                    getConfig().onSuccess(newData, key, config);
                }
            }
        } catch (err) {
            cleanupState();
            const currentConfig = getConfig();
            const { shouldRetryOnError  } = currentConfig;
            // Not paused, we continue handling the error. Otherwise, discard it.
            if (!currentConfig.isPaused()) {
                // Get a new error, don't use deep comparison for errors.
                finalState.error = err;
                // Error event and retry logic. Only for the actual request, not
                // deduped ones.
                if (shouldStartNewRequest && callbackSafeguard()) {
                    currentConfig.onError(err, key, currentConfig);
                    if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
                        if (isActive()) {
                            // If it's inactive, stop. It will auto-revalidate when
                            // refocusing or reconnecting.
                            // When retrying, deduplication is always enabled.
                            currentConfig.onErrorRetry(err, key, currentConfig, (_opts)=>{
                                const revalidators = EVENT_REVALIDATORS[key];
                                if (revalidators && revalidators[0]) {
                                    revalidators[0](constants.ERROR_REVALIDATE_EVENT, _opts);
                                }
                            }, {
                                retryCount: (opts.retryCount || 0) + 1,
                                dedupe: true
                            });
                        }
                    }
                }
            }
        }
        // Mark loading as stopped.
        loading = false;
        // Update the current hook's state.
        finishRequestAndUpdateState();
        return true;
    }, // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        key,
        cache
    ]);
    // Similar to the global mutate but bound to the current cache and key.
    // `cache` isn't allowed to change during the lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const boundMutate = (0,react.useCallback)(// Use callback to make sure `keyRef.current` returns latest result every time
    (...args)=>{
        return internalMutate(cache, keyRef.current, ...args);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // The logic for updating refs.
    useIsomorphicLayoutEffect(()=>{
        fetcherRef.current = fetcher;
        configRef.current = config;
        // Handle laggy data updates. If there's cached data of the current key,
        // it'll be the correct reference.
        if (!isUndefined(cachedData)) {
            laggyDataRef.current = cachedData;
        }
    });
    // After mounted or key changed.
    useIsomorphicLayoutEffect(()=>{
        if (!key) return;
        const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
        // Expose revalidators to global event listeners. So we can trigger
        // revalidation from the outside.
        let nextFocusRevalidatedAt = 0;
        const onRevalidate = (type, opts = {})=>{
            if (type == constants.FOCUS_EVENT) {
                const now = Date.now();
                if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
                    nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
                    softRevalidate();
                }
            } else if (type == constants.RECONNECT_EVENT) {
                if (getConfig().revalidateOnReconnect && isActive()) {
                    softRevalidate();
                }
            } else if (type == constants.MUTATE_EVENT) {
                return revalidate();
            } else if (type == constants.ERROR_REVALIDATE_EVENT) {
                return revalidate(opts);
            }
            return;
        };
        const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
        // Mark the component as mounted and update corresponding refs.
        unmountedRef.current = false;
        keyRef.current = key;
        initialMountedRef.current = true;
        // Keep the original key in the cache.
        setCache({
            _k: fnArg
        });
        // Trigger a revalidation
        if (shouldDoInitialRevalidation) {
            if (isUndefined(data) || IS_SERVER) {
                // Revalidate immediately.
                softRevalidate();
            } else {
                // Delay the revalidate if we have data to return so we won't block
                // rendering.
                rAF(softRevalidate);
            }
        }
        return ()=>{
            // Mark it as unmounted.
            unmountedRef.current = true;
            unsubEvents();
        };
    }, [
        key
    ]);
    // Polling
    useIsomorphicLayoutEffect(()=>{
        let timer;
        function next() {
            // Use the passed interval
            // ...or invoke the function with the updated data to get the interval
            const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
            // We only start the next interval if `refreshInterval` is not 0, and:
            // - `force` is true, which is the start of polling
            // - or `timer` is not 0, which means the effect wasn't canceled
            if (interval && timer !== -1) {
                timer = setTimeout(execute, interval);
            }
        }
        function execute() {
            // Check if it's OK to execute:
            // Only revalidate when the page is visible, online, and not errored.
            if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
                revalidate(WITH_DEDUPE).then(next);
            } else {
                // Schedule the next interval to check again.
                next();
            }
        }
        next();
        return ()=>{
            if (timer) {
                clearTimeout(timer);
                timer = -1;
            }
        };
    }, [
        refreshInterval,
        refreshWhenHidden,
        refreshWhenOffline,
        key
    ]);
    // Display debug info in React DevTools.
    (0,react.useDebugValue)(returnedData);
    // In Suspense mode, we can't return the empty `data` state.
    // If there is an `error`, the `error` needs to be thrown to the error boundary.
    // If there is no `error`, the `revalidation` promise needs to be thrown to
    // the suspense boundary.
    if (suspense && isUndefined(data) && key) {
        // SWR should throw when trying to use Suspense on the server with React 18,
        // without providing any initial data. See:
        // https://github.com/vercel/swr/issues/1832
        if (!IS_REACT_LEGACY && IS_SERVER) {
            throw new Error('Fallback data is required when using suspense in SSR.');
        }
        // Always update fetcher and config refs even with the Suspense mode.
        fetcherRef.current = fetcher;
        configRef.current = config;
        unmountedRef.current = false;
        const req = PRELOAD[key];
        if (!isUndefined(req)) {
            const promise = boundMutate(req);
            dist_use(promise);
        }
        if (isUndefined(error)) {
            const promise = revalidate(WITH_DEDUPE);
            if (!isUndefined(returnedData)) {
                promise.status = 'fulfilled';
                promise.value = true;
            }
            dist_use(promise);
        } else {
            throw error;
        }
    }
    return {
        mutate: boundMutate,
        get data () {
            stateDependencies.data = true;
            return returnedData;
        },
        get error () {
            stateDependencies.error = true;
            return error;
        },
        get isValidating () {
            stateDependencies.isValidating = true;
            return isValidating;
        },
        get isLoading () {
            stateDependencies.isLoading = true;
            return isLoading;
        }
    };
};
const dist_SWRConfig = OBJECT.defineProperty(SWRConfig, 'defaultValue', {
    value: defaultConfig
});
/**
 * A hook to fetch data.
 *
 * @link https://swr.vercel.app
 * @example
 * ```jsx
 * import useSWR from 'swr'
 * function Profile() {
 *   const { data, error } = useSWR('/api/user', fetcher)
 *   if (error) return <div>failed to load</div>
 *   if (!data) return <div>loading...</div>
 *   return <div>hello {data.name}!</div>
 * }
 * ```
 */ const useSWR = withArgs(useSWRHandler);

// useSWR



;// ./node_modules/@clerk/shared/node_modules/swr/infinite/dist/index.mjs





const INFINITE_PREFIX = '$inf$';
const getFirstPageKey = (getKey)=>{
    return serialize(getKey ? getKey(0, null) : null)[0];
};
const dist_unstable_serialize = (getKey)=>{
    return INFINITE_PREFIX + getFirstPageKey(getKey);
};

// We have to several type castings here because `useSWRInfinite` is a special
// const INFINITE_PREFIX = '$inf$'
const EMPTY_PROMISE = Promise.resolve();
// export const unstable_serialize = (getKey: SWRInfiniteKeyLoader) => {
//   return INFINITE_PREFIX + getFirstPageKey(getKey)
// }
const infinite = (useSWRNext)=>(getKey, fn, config)=>{
        const didMountRef = (0,react.useRef)(false);
        const { cache , initialSize =1 , revalidateAll =false , persistSize =false , revalidateFirstPage =true , revalidateOnMount =false , parallel =false  } = config;
        // The serialized key of the first page. This key will be used to store
        // metadata of this SWR infinite hook.
        let infiniteKey;
        try {
            infiniteKey = getFirstPageKey(getKey);
            if (infiniteKey) infiniteKey = INFINITE_PREFIX + infiniteKey;
        } catch (err) {
        // Not ready yet.
        }
        const [get, set, subscribeCache] = createCacheHelper(cache, infiniteKey);
        const getSnapshot = (0,react.useCallback)(()=>{
            const size = isUndefined(get()._l) ? initialSize : get()._l;
            return size;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            cache,
            infiniteKey,
            initialSize
        ]);
        (0,shim.useSyncExternalStore)((0,react.useCallback)((callback)=>{
            if (infiniteKey) return subscribeCache(infiniteKey, ()=>{
                callback();
            });
            return ()=>{};
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            cache,
            infiniteKey
        ]), getSnapshot, getSnapshot);
        const resolvePageSize = (0,react.useCallback)(()=>{
            const cachedPageSize = get()._l;
            return isUndefined(cachedPageSize) ? initialSize : cachedPageSize;
        // `cache` isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            infiniteKey,
            initialSize
        ]);
        // keep the last page size to restore it with the persistSize option
        const lastPageSizeRef = (0,react.useRef)(resolvePageSize());
        // When the page key changes, we reset the page size if it's not persisted
        useIsomorphicLayoutEffect(()=>{
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (infiniteKey) {
                // If the key has been changed, we keep the current page size if persistSize is enabled
                // Otherwise, we reset the page size to cached pageSize
                set({
                    _l: persistSize ? lastPageSizeRef.current : resolvePageSize()
                });
            }
        // `initialSize` isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            infiniteKey,
            cache
        ]);
        // Needs to check didMountRef during mounting, not in the fetcher
        const shouldRevalidateOnMount = revalidateOnMount && !didMountRef.current;
        // Actual SWR hook to load all pages in one fetcher.
        const swr = useSWRNext(infiniteKey, async (key)=>{
            // get the revalidate context
            const forceRevalidateAll = get()._i;
            // return an array of page data
            const data = [];
            const pageSize = resolvePageSize();
            const [getCache] = createCacheHelper(cache, key);
            const cacheData = getCache().data;
            const revalidators = [];
            let previousPageData = null;
            for(let i = 0; i < pageSize; ++i){
                const [pageKey, pageArg] = serialize(getKey(i, parallel ? null : previousPageData));
                if (!pageKey) {
                    break;
                }
                const [getSWRCache, setSWRCache] = createCacheHelper(cache, pageKey);
                // Get the cached page data.
                let pageData = getSWRCache().data;
                // should fetch (or revalidate) if:
                // - `revalidateAll` is enabled
                // - `mutate()` called
                // - the cache is missing
                // - it's the first page and it's not the initial render
                // - `revalidateOnMount` is enabled and it's on mount
                // - cache for that page has changed
                const shouldFetchPage = revalidateAll || forceRevalidateAll || isUndefined(pageData) || revalidateFirstPage && !i && !isUndefined(cacheData) || shouldRevalidateOnMount || cacheData && !isUndefined(cacheData[i]) && !config.compare(cacheData[i], pageData);
                if (fn && shouldFetchPage) {
                    const revalidate = async ()=>{
                        pageData = await fn(pageArg);
                        setSWRCache({
                            data: pageData,
                            _k: pageArg
                        });
                        data[i] = pageData;
                    };
                    if (parallel) {
                        revalidators.push(revalidate);
                    } else {
                        await revalidate();
                    }
                } else {
                    data[i] = pageData;
                }
                if (!parallel) {
                    previousPageData = pageData;
                }
            }
            // flush all revalidateions in parallel
            if (parallel) {
                await Promise.all(revalidators.map((r)=>r()));
            }
            // once we executed the data fetching based on the context, clear the context
            set({
                _i: UNDEFINED
            });
            // return the data
            return data;
        }, config);
        const mutate = (0,react.useCallback)(// eslint-disable-next-line func-names
        function(data, opts) {
            // When passing as a boolean, it's explicitly used to disable/enable
            // revalidation.
            const options = typeof opts === 'boolean' ? {
                revalidate: opts
            } : opts || {};
            // Default to true.
            const shouldRevalidate = options.revalidate !== false;
            // It is possible that the key is still falsy.
            if (!infiniteKey) return EMPTY_PROMISE;
            if (shouldRevalidate) {
                if (!isUndefined(data)) {
                    // We only revalidate the pages that are changed
                    set({
                        _i: false
                    });
                } else {
                    // Calling `mutate()`, we revalidate all pages
                    set({
                        _i: true
                    });
                }
            }
            return arguments.length ? swr.mutate(data, {
                ...options,
                revalidate: shouldRevalidate
            }) : swr.mutate();
        }, // swr.mutate is always the same reference
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            infiniteKey,
            cache
        ]);
        // Extend the SWR API
        const setSize = (0,react.useCallback)((arg)=>{
            // It is possible that the key is still falsy.
            if (!infiniteKey) return EMPTY_PROMISE;
            const [, changeSize] = createCacheHelper(cache, infiniteKey);
            let size;
            if (isFunction(arg)) {
                size = arg(resolvePageSize());
            } else if (typeof arg == 'number') {
                size = arg;
            }
            if (typeof size != 'number') return EMPTY_PROMISE;
            changeSize({
                _l: size
            });
            lastPageSizeRef.current = size;
            // Calculate the page data after the size change.
            const data = [];
            const [getInfiniteCache] = createCacheHelper(cache, infiniteKey);
            let previousPageData = null;
            for(let i = 0; i < size; ++i){
                const [pageKey] = serialize(getKey(i, previousPageData));
                const [getCache] = createCacheHelper(cache, pageKey);
                // Get the cached page data.
                const pageData = pageKey ? getCache().data : UNDEFINED;
                // Call `mutate` with infinte cache data if we can't get it from the page cache.
                if (isUndefined(pageData)) {
                    return mutate(getInfiniteCache().data);
                }
                data.push(pageData);
                previousPageData = pageData;
            }
            return mutate(data);
        }, // exclude getKey from the dependencies, which isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            infiniteKey,
            cache,
            mutate,
            resolvePageSize
        ]);
        // Use getter functions to avoid unnecessary re-renders caused by triggering
        // all the getters of the returned swr object.
        return {
            size: resolvePageSize(),
            setSize,
            mutate,
            get data () {
                return swr.data;
            },
            get error () {
                return swr.error;
            },
            get isValidating () {
                return swr.isValidating;
            },
            get isLoading () {
                return swr.isLoading;
            }
        };
    };
const useSWRInfinite = withMiddleware(useSWR, infinite);



;// ./node_modules/@clerk/shared/dist/react/index.mjs



// src/react/hooks/createContextAndHook.ts

function assertContextExists(contextVal, msgOrCtx) {
  if (!contextVal) {
    throw typeof msgOrCtx === "string" ? new Error(msgOrCtx) : new Error(`${msgOrCtx.displayName} not found`);
  }
}
var createContextAndHook = (displayName, options) => {
  const { assertCtxFn = assertContextExists } = options || {};
  const Ctx = react.createContext(void 0);
  Ctx.displayName = displayName;
  const useCtx = () => {
    const ctx = react.useContext(Ctx);
    assertCtxFn(ctx, `${displayName} not found`);
    return ctx.value;
  };
  const useCtxWithoutGuarantee = () => {
    const ctx = react.useContext(Ctx);
    return ctx ? ctx.value : {};
  };
  return [Ctx, useCtx, useCtxWithoutGuarantee];
};

// src/react/clerk-swr.ts
var clerk_swr_exports = {};
(0,chunk_NDCDZYN6/* __export */.V)(clerk_swr_exports, {
  SWRConfig: () => dist_SWRConfig,
  useSWR: () => useSWR,
  useSWRInfinite: () => useSWRInfinite
});
(0,chunk_NDCDZYN6/* __reExport */.i)(clerk_swr_exports, core_dist_namespaceObject);




// src/react/contexts.tsx

var [ClerkInstanceContext, useClerkInstanceContext] = createContextAndHook("ClerkInstanceContext");
var [UserContext, useUserContext] = createContextAndHook("UserContext");
var [ClientContext, useClientContext] = createContextAndHook("ClientContext");
var [SessionContext, useSessionContext] = createContextAndHook(
  "SessionContext"
);
var [OrganizationContextInternal, useOrganizationContext] = createContextAndHook("OrganizationContext");
var OrganizationProvider = ({
  children,
  organization,
  lastOrganizationMember,
  lastOrganizationInvitation,
  swrConfig
}) => {
  return /* @__PURE__ */ react.createElement(dist_SWRConfig, { value: swrConfig }, /* @__PURE__ */ react.createElement(
    OrganizationContextInternal.Provider,
    {
      value: {
        value: {
          organization,
          lastOrganizationMember,
          lastOrganizationInvitation
        }
      }
    },
    children
  ));
};
var OrganizationContext = (...args) => {
  deprecated("OrganizationContext", "Use `OrganizationProvider` instead");
  return OrganizationProvider(...args);
};

// src/react/hooks/usePagesOrInfinite.ts

function getDifferentKeys(obj1, obj2) {
  const keysSet = new Set(Object.keys(obj2));
  const differentKeysObject = {};
  for (const key1 of Object.keys(obj1)) {
    if (!keysSet.has(key1)) {
      differentKeysObject[key1] = obj1[key1];
    }
  }
  return differentKeysObject;
}
var useWithSafeValues = (params, defaultValues) => {
  var _a, _b, _c;
  const shouldUseDefaults = typeof params === "boolean" && params;
  const initialPageRef = (0,react.useRef)(
    shouldUseDefaults ? defaultValues.initialPage : (_a = params == null ? void 0 : params.initialPage) != null ? _a : defaultValues.initialPage
  );
  const pageSizeRef = (0,react.useRef)(shouldUseDefaults ? defaultValues.pageSize : (_b = params == null ? void 0 : params.pageSize) != null ? _b : defaultValues.pageSize);
  const newObj = {};
  for (const key of Object.keys(defaultValues)) {
    newObj[key] = shouldUseDefaults ? defaultValues[key] : (_c = params == null ? void 0 : params[key]) != null ? _c : defaultValues[key];
  }
  return {
    ...newObj,
    initialPage: initialPageRef.current,
    pageSize: pageSizeRef.current
  };
};
var usePagesOrInfinite = (params, fetcher, options, cacheKeys) => {
  var _a, _b, _c, _d, _e, _f;
  const [paginatedPage, setPaginatedPage] = (0,react.useState)((_a = params.initialPage) != null ? _a : 1);
  const initialPageRef = (0,react.useRef)((_b = params.initialPage) != null ? _b : 1);
  const pageSizeRef = (0,react.useRef)((_c = params.pageSize) != null ? _c : 10);
  const enabled = (_d = options.enabled) != null ? _d : true;
  const triggerInfinite = (_e = options.infinite) != null ? _e : false;
  const keepPreviousData = (_f = options.keepPreviousData) != null ? _f : false;
  const pagesCacheKey = {
    ...cacheKeys,
    ...params,
    initialPage: paginatedPage,
    pageSize: pageSizeRef.current
  };
  const {
    data: swrData,
    isValidating: swrIsValidating,
    isLoading: swrIsLoading,
    error: swrError,
    mutate: swrMutate
  } = useSWR(
    !triggerInfinite && !!fetcher && enabled ? pagesCacheKey : null,
    (cacheKeyParams) => {
      const requestParams = getDifferentKeys(cacheKeyParams, cacheKeys);
      return fetcher == null ? void 0 : fetcher(requestParams);
    },
    { keepPreviousData }
  );
  const {
    data: swrInfiniteData,
    isLoading: swrInfiniteIsLoading,
    isValidating: swrInfiniteIsValidating,
    error: swrInfiniteError,
    size,
    setSize,
    mutate: swrInfiniteMutate
  } = useSWRInfinite(
    (pageIndex) => {
      if (!triggerInfinite || !enabled) {
        return null;
      }
      return {
        ...params,
        ...cacheKeys,
        initialPage: initialPageRef.current + pageIndex,
        pageSize: pageSizeRef.current
      };
    },
    (cacheKeyParams) => {
      const requestParams = getDifferentKeys(cacheKeyParams, cacheKeys);
      return fetcher == null ? void 0 : fetcher(requestParams);
    }
  );
  const page = (0,react.useMemo)(() => {
    if (triggerInfinite) {
      return size;
    }
    return paginatedPage;
  }, [triggerInfinite, size, paginatedPage]);
  const fetchPage = (0,react.useCallback)(
    (numberOrgFn) => {
      if (triggerInfinite) {
        void setSize(numberOrgFn);
        return;
      }
      return setPaginatedPage(numberOrgFn);
    },
    [setSize]
  );
  const data = (0,react.useMemo)(() => {
    var _a2, _b2;
    if (triggerInfinite) {
      return (_a2 = swrInfiniteData == null ? void 0 : swrInfiniteData.map((a) => a == null ? void 0 : a.data).flat()) != null ? _a2 : [];
    }
    return (_b2 = swrData == null ? void 0 : swrData.data) != null ? _b2 : [];
  }, [triggerInfinite, swrData, swrInfiniteData]);
  const count = (0,react.useMemo)(() => {
    var _a2, _b2;
    if (triggerInfinite) {
      return ((_a2 = swrInfiniteData == null ? void 0 : swrInfiniteData[(swrInfiniteData == null ? void 0 : swrInfiniteData.length) - 1]) == null ? void 0 : _a2.total_count) || 0;
    }
    return (_b2 = swrData == null ? void 0 : swrData.total_count) != null ? _b2 : 0;
  }, [triggerInfinite, swrData, swrInfiniteData]);
  const isLoading = triggerInfinite ? swrInfiniteIsLoading : swrIsLoading;
  const isFetching = triggerInfinite ? swrInfiniteIsValidating : swrIsValidating;
  const isError = !!(triggerInfinite ? swrInfiniteError : swrError);
  const fetchNext = (0,react.useCallback)(() => {
    fetchPage((n) => Math.max(0, n + 1));
  }, [fetchPage]);
  const fetchPrevious = (0,react.useCallback)(() => {
    fetchPage((n) => Math.max(0, n - 1));
  }, [fetchPage]);
  const offsetCount = (initialPageRef.current - 1) * pageSizeRef.current;
  const pageCount = Math.ceil((count - offsetCount) / pageSizeRef.current);
  const hasNextPage = count - offsetCount * pageSizeRef.current > page * pageSizeRef.current;
  const hasPreviousPage = (page - 1) * pageSizeRef.current > offsetCount * pageSizeRef.current;
  const setData = triggerInfinite ? (value) => swrInfiniteMutate(value, {
    revalidate: false
  }) : (value) => swrMutate(value, {
    revalidate: false
  });
  const revalidate = triggerInfinite ? () => swrInfiniteMutate() : () => swrMutate();
  return {
    data,
    count,
    isLoading,
    isFetching,
    isError,
    page,
    pageCount,
    fetchPage,
    fetchNext,
    fetchPrevious,
    hasNextPage,
    hasPreviousPage,
    // Let the hook return type define this type
    revalidate,
    // Let the hook return type define this type
    setData
  };
};

// src/react/hooks/useOrganization.tsx
var undefinedPaginatedResource = {
  data: void 0,
  count: void 0,
  isLoading: false,
  isFetching: false,
  isError: false,
  page: void 0,
  pageCount: void 0,
  fetchPage: void 0,
  fetchNext: void 0,
  fetchPrevious: void 0,
  hasNextPage: false,
  hasPreviousPage: false,
  revalidate: void 0,
  setData: void 0
};
var useOrganization = (params) => {
  const {
    invitationList: invitationListParams,
    membershipList: membershipListParams,
    domains: domainListParams,
    membershipRequests: membershipRequestsListParams,
    memberships: membersListParams,
    invitations: invitationsListParams
  } = params || {};
  const { organization, lastOrganizationMember, lastOrganizationInvitation } = useOrganizationContext();
  const session = useSessionContext();
  const domainSafeValues = useWithSafeValues(domainListParams, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false,
    enrollmentMode: void 0
  });
  const membershipRequestSafeValues = useWithSafeValues(membershipRequestsListParams, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const membersSafeValues = useWithSafeValues(membersListParams, {
    initialPage: 1,
    pageSize: 10,
    role: void 0,
    keepPreviousData: false,
    infinite: false
  });
  const invitationsSafeValues = useWithSafeValues(invitationsListParams, {
    initialPage: 1,
    pageSize: 10,
    status: ["pending"],
    keepPreviousData: false,
    infinite: false
  });
  const clerk = useClerkInstanceContext();
  const shouldFetch = !!(clerk.loaded && session && organization);
  const domainParams = typeof domainListParams === "undefined" ? void 0 : {
    initialPage: domainSafeValues.initialPage,
    pageSize: domainSafeValues.pageSize,
    enrollmentMode: domainSafeValues.enrollmentMode
  };
  const membershipRequestParams = typeof membershipRequestsListParams === "undefined" ? void 0 : {
    initialPage: membershipRequestSafeValues.initialPage,
    pageSize: membershipRequestSafeValues.pageSize,
    status: membershipRequestSafeValues.status
  };
  const membersParams = typeof membersListParams === "undefined" ? void 0 : {
    initialPage: membersSafeValues.initialPage,
    pageSize: membersSafeValues.pageSize,
    role: membersSafeValues.role
  };
  const invitationsParams = typeof invitationsListParams === "undefined" ? void 0 : {
    initialPage: invitationsSafeValues.initialPage,
    pageSize: invitationsSafeValues.pageSize,
    status: invitationsSafeValues.status
  };
  const domains = usePagesOrInfinite(
    {
      ...domainParams
    },
    organization == null ? void 0 : organization.getDomains,
    {
      keepPreviousData: domainSafeValues.keepPreviousData,
      infinite: domainSafeValues.infinite,
      enabled: !!domainParams
    },
    {
      type: "domains",
      organizationId: organization == null ? void 0 : organization.id
    }
  );
  const membershipRequests = usePagesOrInfinite(
    {
      ...membershipRequestParams
    },
    organization == null ? void 0 : organization.getMembershipRequests,
    {
      keepPreviousData: membershipRequestSafeValues.keepPreviousData,
      infinite: membershipRequestSafeValues.infinite,
      enabled: !!membershipRequestParams
    },
    {
      type: "membershipRequests",
      organizationId: organization == null ? void 0 : organization.id
    }
  );
  const memberships = usePagesOrInfinite(
    {
      ...membersParams,
      paginated: true
    },
    organization == null ? void 0 : organization.getMemberships,
    {
      keepPreviousData: membersSafeValues.keepPreviousData,
      infinite: membersSafeValues.infinite,
      enabled: !!membersParams
    },
    {
      type: "members",
      organizationId: organization == null ? void 0 : organization.id
    }
  );
  const invitations = usePagesOrInfinite(
    {
      ...invitationsParams
    },
    organization == null ? void 0 : organization.getInvitations,
    {
      keepPreviousData: invitationsSafeValues.keepPreviousData,
      infinite: invitationsSafeValues.infinite,
      enabled: !!invitationsParams
    },
    {
      type: "invitations",
      organizationId: organization == null ? void 0 : organization.id
    }
  );
  const pendingInvitations = !clerk.loaded ? () => [] : () => {
    var _a;
    return (_a = clerk.organization) == null ? void 0 : _a.getPendingInvitations(invitationListParams);
  };
  const currentOrganizationMemberships = !clerk.loaded ? () => [] : () => {
    var _a;
    return (_a = clerk.organization) == null ? void 0 : _a.getMemberships(membershipListParams);
  };
  if (invitationListParams) {
    (0,chunk_IC4FGZI3/* deprecated */.io)("invitationList in useOrganization", "Use the `invitations` property and return value instead.");
  }
  const {
    data: invitationList,
    isValidating: isInvitationsLoading,
    mutate: mutateInvitationList
  } = useSWR(
    shouldFetch && invitationListParams ? cacheKey("invites", organization, lastOrganizationInvitation, invitationListParams) : null,
    pendingInvitations
  );
  if (membershipListParams) {
    (0,chunk_IC4FGZI3/* deprecated */.io)("membershipList in useOrganization", "Use the `memberships` property and return value instead.");
  }
  const {
    data: membershipList,
    isValidating: isMembershipsLoading,
    mutate: mutateMembershipList
  } = useSWR(
    shouldFetch && membershipListParams ? cacheKey("memberships", organization, lastOrganizationMember, membershipListParams) : null,
    currentOrganizationMemberships
  );
  if (organization === void 0) {
    return {
      isLoaded: false,
      organization: void 0,
      invitationList: void 0,
      membershipList: void 0,
      membership: void 0,
      domains: undefinedPaginatedResource,
      membershipRequests: undefinedPaginatedResource,
      memberships: undefinedPaginatedResource,
      invitations: undefinedPaginatedResource
    };
  }
  if (organization === null) {
    return {
      isLoaded: true,
      organization: null,
      invitationList: null,
      membershipList: null,
      membership: null,
      domains: null,
      membershipRequests: null,
      memberships: null,
      invitations: null
    };
  }
  if (!clerk.loaded && organization) {
    return {
      isLoaded: true,
      organization,
      invitationList: void 0,
      membershipList: void 0,
      membership: void 0,
      domains: undefinedPaginatedResource,
      membershipRequests: undefinedPaginatedResource,
      memberships: undefinedPaginatedResource,
      invitations: undefinedPaginatedResource
    };
  }
  return {
    isLoaded: !isMembershipsLoading && !isInvitationsLoading,
    organization,
    membershipList,
    membership: getCurrentOrganizationMembership(session.user.organizationMemberships, organization.id),
    // your membership in the current org
    invitationList,
    unstable__mutate: () => {
      void mutateMembershipList();
      void mutateInvitationList();
    },
    domains,
    membershipRequests,
    memberships,
    invitations
  };
};
function getCurrentOrganizationMembership(organizationMemberships, activeOrganizationId) {
  return organizationMemberships.find(
    (organizationMembership) => organizationMembership.organization.id === activeOrganizationId
  );
}
function cacheKey(type, organization, resource, pagination) {
  return [type, organization.id, resource == null ? void 0 : resource.id, resource == null ? void 0 : resource.updatedAt, pagination.offset, pagination.limit].filter(Boolean).join("-");
}

// src/react/hooks/useOrganizationList.tsx
var undefinedPaginatedResource2 = {
  data: void 0,
  count: void 0,
  isLoading: false,
  isFetching: false,
  isError: false,
  page: void 0,
  pageCount: void 0,
  fetchPage: void 0,
  fetchNext: void 0,
  fetchPrevious: void 0,
  hasNextPage: false,
  hasPreviousPage: false,
  revalidate: void 0,
  setData: void 0
};
var useOrganizationList = (params) => {
  const { userMemberships, userInvitations, userSuggestions } = params || {};
  const userMembershipsSafeValues = useWithSafeValues(userMemberships, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false
  });
  const userInvitationsSafeValues = useWithSafeValues(userInvitations, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const userSuggestionsSafeValues = useWithSafeValues(userSuggestions, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const clerk = useClerkInstanceContext();
  const user = useUserContext();
  const userMembershipsParams = typeof userMemberships === "undefined" ? void 0 : {
    initialPage: userMembershipsSafeValues.initialPage,
    pageSize: userMembershipsSafeValues.pageSize
  };
  const userInvitationsParams = typeof userInvitations === "undefined" ? void 0 : {
    initialPage: userInvitationsSafeValues.initialPage,
    pageSize: userInvitationsSafeValues.pageSize,
    status: userInvitationsSafeValues.status
  };
  const userSuggestionsParams = typeof userSuggestions === "undefined" ? void 0 : {
    initialPage: userSuggestionsSafeValues.initialPage,
    pageSize: userSuggestionsSafeValues.pageSize,
    status: userSuggestionsSafeValues.status
  };
  const isClerkLoaded = !!(clerk.loaded && user);
  const memberships = usePagesOrInfinite(
    {
      ...userMembershipsParams,
      paginated: true
    },
    user == null ? void 0 : user.getOrganizationMemberships,
    {
      keepPreviousData: userMembershipsSafeValues.keepPreviousData,
      infinite: userMembershipsSafeValues.infinite,
      enabled: !!userMembershipsParams
    },
    {
      type: "userMemberships",
      userId: user == null ? void 0 : user.id
    }
  );
  const invitations = usePagesOrInfinite(
    {
      ...userInvitationsParams
    },
    user == null ? void 0 : user.getOrganizationInvitations,
    {
      keepPreviousData: userInvitationsSafeValues.keepPreviousData,
      infinite: userInvitationsSafeValues.infinite,
      enabled: !!userInvitationsParams
    },
    {
      type: "userInvitations",
      userId: user == null ? void 0 : user.id
    }
  );
  const suggestions = usePagesOrInfinite(
    {
      ...userSuggestionsParams
    },
    user == null ? void 0 : user.getOrganizationSuggestions,
    {
      keepPreviousData: userSuggestionsSafeValues.keepPreviousData,
      infinite: userSuggestionsSafeValues.infinite,
      enabled: !!userSuggestionsParams
    },
    {
      type: "userSuggestions",
      userId: user == null ? void 0 : user.id
    }
  );
  if (!isClerkLoaded) {
    return {
      isLoaded: false,
      organizationList: void 0,
      createOrganization: void 0,
      setActive: void 0,
      userMemberships: undefinedPaginatedResource2,
      userInvitations: undefinedPaginatedResource2,
      userSuggestions: undefinedPaginatedResource2
    };
  }
  const result = {
    isLoaded: isClerkLoaded,
    organizationList: createOrganizationList(user.organizationMemberships),
    setActive: clerk.setActive,
    createOrganization: clerk.createOrganization,
    userMemberships: memberships,
    userInvitations: invitations,
    userSuggestions: suggestions
  };
  (0,chunk_IC4FGZI3/* deprecatedObjectProperty */.W1)(result, "organizationList", "Use `userMemberships` instead.");
  return result;
};
function createOrganizationList(organizationMemberships) {
  return organizationMemberships.map((organizationMembership) => ({
    membership: organizationMembership,
    organization: organizationMembership.organization
  }));
}

// src/react/hooks/useOrganizations.tsx
var useOrganizations = () => {
  (0,chunk_IC4FGZI3/* deprecated */.io)("useOrganizations", "Use useOrganizationList, useOrganization, or useClerk instead.");
  const clerk = useClerkInstanceContext();
  if (!clerk.loaded) {
    return {
      isLoaded: false,
      createOrganization: void 0,
      getOrganizationMemberships: void 0,
      getOrganization: void 0
    };
  }
  return {
    isLoaded: true,
    createOrganization: clerk.createOrganization,
    getOrganizationMemberships: clerk.getOrganizationMemberships,
    getOrganization: clerk.getOrganization
  };
};

// src/react/hooks/useSafeLayoutEffect.tsx

var useSafeLayoutEffect = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;

//# sourceMappingURL=index.mjs.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/AuthContext.js


const [AuthContext, useAuthContext] = createContextAndHook("AuthContext");

//# sourceMappingURL=AuthContext.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/IsomorphicClerkContext.js


const [IsomorphicClerkContext, useIsomorphicClerkContext] = [ClerkInstanceContext, useClerkInstanceContext];

//# sourceMappingURL=IsomorphicClerkContext.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/ClerkContextProvider.js











function ClerkContextProvider(props) {
  const { isomorphicClerkOptions, initialState, children } = props;
  const { isomorphicClerk: clerk, loaded: clerkLoaded } = useLoadedIsomorphicClerk(isomorphicClerkOptions);
  if (isomorphicClerkOptions.frontendApi) {
    (0,dist_deprecated/* deprecated */.io)("frontendApi", "Use `publishableKey` instead.");
  }
  const [state, setState] = react_default().useState({
    client: clerk.client,
    session: clerk.session,
    user: clerk.user,
    organization: clerk.organization,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null
  });
  react_default().useEffect(() => {
    return clerk.addListener((e) => setState({ ...e }));
  }, []);
  const derivedState = deriveState(clerkLoaded, state, initialState);
  const clerkCtx = react_default().useMemo(() => ({ value: clerk }), [clerkLoaded]);
  const clientCtx = react_default().useMemo(() => ({ value: state.client }), [state.client]);
  const {
    sessionId,
    session,
    userId,
    user,
    orgId,
    actor,
    lastOrganizationInvitation,
    lastOrganizationMember,
    organization,
    orgRole,
    orgSlug,
    orgPermissions
  } = derivedState;
  const authCtx = react_default().useMemo(() => {
    const value = { sessionId, userId, actor, orgId, orgRole, orgSlug, orgPermissions };
    return { value };
  }, [sessionId, userId, actor, orgId, orgRole, orgSlug]);
  const userCtx = react_default().useMemo(() => ({ value: user }), [userId, user]);
  const sessionCtx = react_default().useMemo(() => ({ value: session }), [sessionId, session]);
  const organizationCtx = react_default().useMemo(() => {
    const value = {
      organization,
      lastOrganizationInvitation,
      lastOrganizationMember
    };
    return { value };
  }, [orgId, organization, lastOrganizationInvitation, lastOrganizationMember]);
  return (
    // @ts-expect-error value passed is of type IsomorphicClerk where the context expects LoadedClerk
    /* @__PURE__ */ react_default().createElement(IsomorphicClerkContext.Provider, { value: clerkCtx }, /* @__PURE__ */ react_default().createElement(ClientContext.Provider, { value: clientCtx }, /* @__PURE__ */ react_default().createElement(SessionContext.Provider, { value: sessionCtx }, /* @__PURE__ */ react_default().createElement(OrganizationProvider, { ...organizationCtx.value }, /* @__PURE__ */ react_default().createElement(AuthContext.Provider, { value: authCtx }, /* @__PURE__ */ react_default().createElement(UserContext.Provider, { value: userCtx }, children))))))
  );
}
const useLoadedIsomorphicClerk = (options) => {
  const [loaded, setLoaded] = react_default().useState(false);
  const isomorphicClerk = react_default().useMemo(() => IsomorphicClerk.getOrCreateInstance(options), []);
  react_default().useEffect(() => {
    isomorphicClerk.__unstable__updateProps({ appearance: options.appearance });
  }, [options.appearance]);
  react_default().useEffect(() => {
    isomorphicClerk.__unstable__updateProps({ options });
  }, [options.localization]);
  react_default().useEffect(() => {
    isomorphicClerk.addOnLoaded(() => setLoaded(true));
  }, []);
  react_default().useEffect(() => {
    return () => {
      IsomorphicClerk.clearInstance();
    };
  }, []);
  return { isomorphicClerk, loaded };
};

//# sourceMappingURL=ClerkContextProvider.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/assertHelpers.js


function assertWrappedByClerkProvider(contextVal) {
  if (!contextVal) {
    throw new Error(noClerkProviderError);
  }
}
function assertClerkLoadedGuarantee(guarantee, hookName) {
  if (!guarantee) {
    throw new Error(noGuaranteedLoadedError(hookName));
  }
}

//# sourceMappingURL=assertHelpers.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/StructureContext.js



const StructureContextStates = Object.freeze({
  noGuarantees: Object.freeze({
    guaranteedLoaded: false
  }),
  guaranteedLoaded: Object.freeze({
    guaranteedLoaded: true
  })
});
const StructureContext = react_default().createContext(void 0);
StructureContext.displayName = "StructureContext";
const useStructureContext = () => {
  const structureCtx = react_default().useContext(StructureContext);
  assertWrappedByClerkProvider(structureCtx);
  return structureCtx;
};
const LoadedGuarantee = ({ children }) => {
  const structure = useStructureContext();
  if (structure.guaranteedLoaded) {
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  }
  return /* @__PURE__ */ react_default().createElement(StructureContext.Provider, { value: StructureContextStates.guaranteedLoaded }, children);
};

//# sourceMappingURL=StructureContext.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/ClerkProvider.js







__internal__setErrorThrowerOptions({
  packageName: "@clerk/clerk-react"
});
function ClerkProviderBase(props) {
  const { initialState, children, ...restIsomorphicClerkOptions } = props;
  const { frontendApi = "", publishableKey = "", Clerk: userInitialisedClerk } = restIsomorphicClerkOptions;
  if (!userInitialisedClerk) {
    if (!publishableKey && !frontendApi) {
      errorThrower.throwMissingPublishableKeyError();
    } else if (publishableKey && !(0,keys/* isPublishableKey */.rA)(publishableKey)) {
      errorThrower.throwInvalidPublishableKeyError({ key: publishableKey });
    } else if (!publishableKey && frontendApi && !(0,keys/* isLegacyFrontendApiKey */.r7)(frontendApi)) {
      errorThrower.throwInvalidFrontendApiError({ key: frontendApi });
    }
  }
  return /* @__PURE__ */ react_default().createElement(StructureContext.Provider, { value: StructureContextStates.noGuarantees }, /* @__PURE__ */ react_default().createElement(
    ClerkContextProvider,
    {
      initialState,
      isomorphicClerkOptions: restIsomorphicClerkOptions
    },
    children
  ));
}
const ClerkProvider = withMaxAllowedInstancesGuard(ClerkProviderBase, "ClerkProvider", multipleClerkProvidersError);
ClerkProvider.displayName = "ClerkProvider";

//# sourceMappingURL=ClerkProvider.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/contexts/index.js



//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-MHVPBPEZ.mjs
var chunk_MHVPBPEZ = __webpack_require__(27271);
;// ./node_modules/@clerk/shared/dist/chunk-5QXIOV6T.mjs
// src/underscore.ts
var toSentence = (items) => {
  if (items.length == 0) {
    return "";
  }
  if (items.length == 1) {
    return items[0];
  }
  let sentence = items.slice(0, -1).join(", ");
  sentence += `, or ${items.slice(-1)}`;
  return sentence;
};
var IP_V4_ADDRESS_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
function isIPV4Address(str) {
  return IP_V4_ADDRESS_REGEX.test(str || "");
}
function titleize(str) {
  const s = str || "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function snakeToCamel(str) {
  return str ? str.replace(/([-_][a-z])/g, (match) => match.toUpperCase().replace(/-|_/, "")) : "";
}
function camelToSnake(str) {
  return str ? str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) : "";
}
var createDeepObjectTransformer = (transform) => {
  const deepTransform = (obj) => {
    if (!obj) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((el) => {
        if (typeof el === "object" || Array.isArray(el)) {
          return deepTransform(el);
        }
        return el;
      });
    }
    const copy = { ...obj };
    const keys = Object.keys(copy);
    for (const oldName of keys) {
      const newName = transform(oldName.toString());
      if (newName !== oldName) {
        copy[newName] = copy[oldName];
        delete copy[oldName];
      }
      if (typeof copy[newName] === "object") {
        copy[newName] = deepTransform(copy[newName]);
      }
    }
    return copy;
  };
  return deepTransform;
};
var deepCamelToSnake = createDeepObjectTransformer(camelToSnake);
var deepSnakeToCamel = createDeepObjectTransformer(snakeToCamel);


//# sourceMappingURL=chunk-5QXIOV6T.mjs.map
;// ./node_modules/@clerk/shared/dist/chunk-5JU2E5TY.mjs
// src/file.ts
function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      const result = JSON.parse(reader.result);
      resolve(result);
    });
    reader.addEventListener("error", reject);
    reader.readAsText(file);
  });
}
var MimeTypeToExtensionMap = Object.freeze({
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico"
});
var extension = (mimeType) => {
  return MimeTypeToExtensionMap[mimeType];
};


//# sourceMappingURL=chunk-5JU2E5TY.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-VN4YMSVR.mjs
var chunk_VN4YMSVR = __webpack_require__(23000);
;// ./node_modules/@clerk/shared/dist/index.mjs



















// src/utils/createDeferredPromise.ts
var createDeferredPromise = () => {
  let resolve = noop;
  let reject = noop;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

// src/utils/runWithExponentialBackOff.ts
var defaultOptions = {
  firstDelay: 125,
  maxDelay: 0,
  timeMultiple: 2,
  shouldRetry: () => true
};
var sleep = async (ms) => new Promise((s) => setTimeout(s, ms));
var createExponentialDelayAsyncFn = (opts) => {
  let timesCalled = 0;
  const calculateDelayInMs = () => {
    const constant = opts.firstDelay;
    const base = opts.timeMultiple;
    const delay = constant * Math.pow(base, timesCalled);
    return Math.min(opts.maxDelay || delay, delay);
  };
  return async () => {
    await sleep(calculateDelayInMs());
    timesCalled++;
  };
};
var runWithExponentialBackOff = async (callback, options = {}) => {
  let iterationsCount = 0;
  const { shouldRetry, firstDelay, maxDelay, timeMultiple } = {
    ...defaultOptions,
    ...options
  };
  const delay = createExponentialDelayAsyncFn({ firstDelay, maxDelay, timeMultiple });
  while (true) {
    try {
      return await callback();
    } catch (e) {
      iterationsCount++;
      if (!shouldRetry(e, iterationsCount)) {
        throw e;
      }
      await delay();
    }
  }
};

// src/utils/logErrorInDevMode.ts
var logErrorInDevMode = (message) => {
  if ((0,chunk_IC4FGZI3/* isDevelopmentEnvironment */.b_)()) {
    console.error(message);
  }
};

//# sourceMappingURL=index.mjs.map
// EXTERNAL MODULE: ./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js
var react_dom = __webpack_require__(51215);
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/useCustomElementPortal.js



const useCustomElementPortal = (elements) => {
  const initialState = Array(elements.length).fill(null);
  const [nodes, setNodes] = (0,react.useState)(initialState);
  return elements.map((el, index) => ({
    id: el.id,
    mount: (node) => setNodes((prevState) => prevState.map((n, i) => i === index ? node : n)),
    unmount: () => setNodes((prevState) => prevState.map((n, i) => i === index ? null : n)),
    portal: () => /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, nodes[index] ? (0,react_dom.createPortal)(el.component, nodes[index]) : null)
  }));
};

//# sourceMappingURL=useCustomElementPortal.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/useCustomPages.js






const isThatComponent = (v, component) => {
  return !!v && react_default().isValidElement(v) && (v == null ? void 0 : v.type) === component;
};
const useUserProfileCustomPages = (children) => {
  const reorderItemsLabels = ["account", "security"];
  return useCustomPages({
    children,
    reorderItemsLabels,
    LinkComponent: UserProfileLink,
    PageComponent: UserProfilePage,
    componentName: "UserProfile"
  });
};
const useOrganizationProfileCustomPages = (children) => {
  const reorderItemsLabels = ["members", "settings"];
  return useCustomPages({
    children,
    reorderItemsLabels,
    LinkComponent: OrganizationProfileLink,
    PageComponent: OrganizationProfilePage,
    componentName: "OrganizationProfile"
  });
};
const useCustomPages = ({
  children,
  LinkComponent,
  PageComponent,
  reorderItemsLabels,
  componentName
}) => {
  const validChildren = [];
  react_default().Children.forEach(children, (child) => {
    if (!isThatComponent(child, PageComponent) && !isThatComponent(child, LinkComponent)) {
      if (child) {
        logErrorInDevMode(customPagesIgnoredComponent(componentName));
      }
      return;
    }
    const { props } = child;
    const { children: children2, label, url, labelIcon } = props;
    if (isThatComponent(child, PageComponent)) {
      if (isReorderItem(props, reorderItemsLabels)) {
        validChildren.push({ label });
      } else if (isCustomPage(props)) {
        validChildren.push({ label, labelIcon, children: children2, url });
      } else {
        logErrorInDevMode(customPageWrongProps(componentName));
        return;
      }
    }
    if (isThatComponent(child, LinkComponent)) {
      if (isExternalLink(props)) {
        validChildren.push({ label, labelIcon, url });
      } else {
        logErrorInDevMode(customLinkWrongProps(componentName));
        return;
      }
    }
  });
  const customPageContents = [];
  const customPageLabelIcons = [];
  const customLinkLabelIcons = [];
  validChildren.forEach((cp, index) => {
    if (isCustomPage(cp)) {
      customPageContents.push({ component: cp.children, id: index });
      customPageLabelIcons.push({ component: cp.labelIcon, id: index });
      return;
    }
    if (isExternalLink(cp)) {
      customLinkLabelIcons.push({ component: cp.labelIcon, id: index });
    }
  });
  const customPageContentsPortals = useCustomElementPortal(customPageContents);
  const customPageLabelIconsPortals = useCustomElementPortal(customPageLabelIcons);
  const customLinkLabelIconsPortals = useCustomElementPortal(customLinkLabelIcons);
  const customPages = [];
  const customPagesPortals = [];
  validChildren.forEach((cp, index) => {
    if (isReorderItem(cp, reorderItemsLabels)) {
      customPages.push({ label: cp.label });
      return;
    }
    if (isCustomPage(cp)) {
      const {
        portal: contentPortal,
        mount,
        unmount
      } = customPageContentsPortals.find((p) => p.id === index);
      const {
        portal: labelPortal,
        mount: mountIcon,
        unmount: unmountIcon
      } = customPageLabelIconsPortals.find((p) => p.id === index);
      customPages.push({ label: cp.label, url: cp.url, mount, unmount, mountIcon, unmountIcon });
      customPagesPortals.push(contentPortal);
      customPagesPortals.push(labelPortal);
      return;
    }
    if (isExternalLink(cp)) {
      const {
        portal: labelPortal,
        mount: mountIcon,
        unmount: unmountIcon
      } = customLinkLabelIconsPortals.find((p) => p.id === index);
      customPages.push({ label: cp.label, url: cp.url, mountIcon, unmountIcon });
      customPagesPortals.push(labelPortal);
      return;
    }
  });
  return { customPages, customPagesPortals };
};
const isReorderItem = (childProps, validItems) => {
  const { children, label, url, labelIcon } = childProps;
  return !children && !url && !labelIcon && validItems.some((v) => v === label);
};
const isCustomPage = (childProps) => {
  const { children, label, url, labelIcon } = childProps;
  return !!children && !!url && !!labelIcon && !!label;
};
const isExternalLink = (childProps) => {
  const { children, label, url, labelIcon } = childProps;
  return !children && !!url && !!labelIcon && !!label;
};

//# sourceMappingURL=useCustomPages.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/withClerk.js





const withClerk = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const clerk = useIsomorphicClerkContext();
    if (!clerk.loaded) {
      return null;
    }
    return /* @__PURE__ */ react_default().createElement(LoadedGuarantee, null, /* @__PURE__ */ react_default().createElement(
      Component,
      {
        ...props,
        clerk
      }
    ));
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};
const WithClerk = ({ children }) => {
  const clerk = useIsomorphicClerkContext();
  if (typeof children !== "function") {
    throw new Error(hocChildrenNotAFunctionError);
  }
  if (!clerk.loaded) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement(LoadedGuarantee, null, children(clerk));
};

//# sourceMappingURL=withClerk.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/uiComponents.js






const isMountProps = (props) => {
  return "mount" in props;
};
const isOpenProps = (props) => {
  return "open" in props;
};
class Portal extends (react_default()).PureComponent {
  constructor() {
    super(...arguments);
    this.portalRef = react_default().createRef();
  }
  componentDidUpdate(prevProps) {
    var _a, _b, _c, _d;
    if (!isMountProps(prevProps) || !isMountProps(this.props)) {
      return;
    }
    if (prevProps.props.appearance !== this.props.props.appearance || ((_b = (_a = prevProps.props) == null ? void 0 : _a.customPages) == null ? void 0 : _b.length) !== ((_d = (_c = this.props.props) == null ? void 0 : _c.customPages) == null ? void 0 : _d.length)) {
      this.props.updateProps({ node: this.portalRef.current, props: this.props.props });
    }
  }
  componentDidMount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.mount(this.portalRef.current, this.props.props);
      }
      if (isOpenProps(this.props)) {
        this.props.open(this.props.props);
      }
    }
  }
  componentWillUnmount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.unmount(this.portalRef.current);
      }
      if (isOpenProps(this.props)) {
        this.props.close();
      }
    }
  }
  render() {
    var _a, _b;
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, /* @__PURE__ */ react_default().createElement("div", { ref: this.portalRef }), isMountProps(this.props) && ((_b = (_a = this.props) == null ? void 0 : _a.customPagesPortals) == null ? void 0 : _b.map((portal, index) => (0,react.createElement)(portal, { key: index }))));
  }
}
const SignIn = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountSignIn,
      unmount: clerk.unmountSignIn,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "SignIn");
const SignUp = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountSignUp,
      unmount: clerk.unmountSignUp,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "SignUp");
function UserProfilePage({ children }) {
  logErrorInDevMode(userProfilePageRenderedError);
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
}
function UserProfileLink({ children }) {
  logErrorInDevMode(userProfileLinkRenderedError);
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
}
const _UserProfile = withClerk(
  ({ clerk, ...props }) => {
    const { customPages, customPagesPortals } = useUserProfileCustomPages(props.children);
    return /* @__PURE__ */ react_default().createElement(
      Portal,
      {
        mount: clerk.mountUserProfile,
        unmount: clerk.unmountUserProfile,
        updateProps: clerk.__unstable__updateProps,
        props: { ...props, customPages },
        customPagesPortals
      }
    );
  },
  "UserProfile"
);
const UserProfile = Object.assign(_UserProfile, {
  Page: UserProfilePage,
  Link: UserProfileLink
});
const _UserButton = withClerk(
  ({ clerk, ...props }) => {
    const { customPages, customPagesPortals } = useUserProfileCustomPages(props.children);
    const userProfileProps = Object.assign(props.userProfileProps || {}, { customPages });
    return /* @__PURE__ */ react_default().createElement(
      Portal,
      {
        mount: clerk.mountUserButton,
        unmount: clerk.unmountUserButton,
        updateProps: clerk.__unstable__updateProps,
        props: { ...props, userProfileProps },
        customPagesPortals
      }
    );
  },
  "UserButton"
);
const UserButton = Object.assign(_UserButton, {
  UserProfilePage,
  UserProfileLink
});
function OrganizationProfilePage({ children }) {
  logErrorInDevMode(organizationProfilePageRenderedError);
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
}
function OrganizationProfileLink({ children }) {
  logErrorInDevMode(organizationProfileLinkRenderedError);
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
}
const _OrganizationProfile = withClerk(
  ({ clerk, ...props }) => {
    const { customPages, customPagesPortals } = useOrganizationProfileCustomPages(props.children);
    return /* @__PURE__ */ react_default().createElement(
      Portal,
      {
        mount: clerk.mountOrganizationProfile,
        unmount: clerk.unmountOrganizationProfile,
        updateProps: clerk.__unstable__updateProps,
        props: { ...props, customPages },
        customPagesPortals
      }
    );
  },
  "OrganizationProfile"
);
const OrganizationProfile = Object.assign(_OrganizationProfile, {
  Page: OrganizationProfilePage,
  Link: OrganizationProfileLink
});
const CreateOrganization = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountCreateOrganization,
      unmount: clerk.unmountCreateOrganization,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "CreateOrganization");
const _OrganizationSwitcher = withClerk(
  ({ clerk, ...props }) => {
    const { customPages, customPagesPortals } = useOrganizationProfileCustomPages(props.children);
    const organizationProfileProps = Object.assign(props.organizationProfileProps || {}, { customPages });
    return /* @__PURE__ */ react_default().createElement(
      Portal,
      {
        mount: clerk.mountOrganizationSwitcher,
        unmount: clerk.unmountOrganizationSwitcher,
        updateProps: clerk.__unstable__updateProps,
        props: { ...props, organizationProfileProps },
        customPagesPortals
      }
    );
  },
  "OrganizationSwitcher"
);
const OrganizationSwitcher = Object.assign(_OrganizationSwitcher, {
  OrganizationProfilePage,
  OrganizationProfileLink
});
const OrganizationList = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      mount: clerk.mountOrganizationList,
      unmount: clerk.unmountOrganizationList,
      updateProps: clerk.__unstable__updateProps,
      props
    }
  );
}, "OrganizationList");
const GoogleOneTap = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ react_default().createElement(
    Portal,
    {
      open: clerk.openGoogleOneTap,
      close: clerk.closeGoogleOneTap,
      props
    }
  );
}, "GoogleOneTap");

//# sourceMappingURL=uiComponents.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/utils.js

const clerkLoaded = (isomorphicClerk) => {
  return new Promise((resolve) => {
    if (isomorphicClerk.loaded) {
      resolve();
    }
    isomorphicClerk.addOnLoaded(resolve);
  });
};
const createGetToken = (isomorphicClerk) => {
  return async (options) => {
    await clerkLoaded(isomorphicClerk);
    if (!isomorphicClerk.session) {
      return null;
    }
    return isomorphicClerk.session.getToken(options);
  };
};
const createSignOut = (isomorphicClerk) => {
  return async (...args) => {
    await clerkLoaded(isomorphicClerk);
    return isomorphicClerk.signOut(...args);
  };
};

//# sourceMappingURL=utils.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useAuth.js






const useAuth = () => {
  const { sessionId, userId, actor, orgId, orgRole, orgSlug, orgPermissions } = useAuthContext();
  const isomorphicClerk = useIsomorphicClerkContext();
  const getToken = (0,react.useCallback)(createGetToken(isomorphicClerk), [isomorphicClerk]);
  const signOut = (0,react.useCallback)(createSignOut(isomorphicClerk), [isomorphicClerk]);
  const has = (0,react.useCallback)(
    (params) => {
      if (!(params == null ? void 0 : params.permission) && !(params == null ? void 0 : params.role)) {
        throw new Error(useAuthHasRequiresRoleOrPermission);
      }
      if (!orgId || !userId || !orgRole || !orgPermissions) {
        return false;
      }
      if (params.permission) {
        return orgPermissions.includes(params.permission);
      }
      if (params.role) {
        return orgRole === params.role;
      }
      return false;
    },
    [orgId, orgRole, userId, orgPermissions]
  );
  if (sessionId === void 0 && userId === void 0) {
    return {
      isLoaded: false,
      isSignedIn: void 0,
      sessionId,
      userId,
      actor: void 0,
      orgId: void 0,
      orgRole: void 0,
      orgSlug: void 0,
      has: void 0,
      signOut,
      getToken
    };
  }
  if (sessionId === null && userId === null) {
    return {
      isLoaded: true,
      isSignedIn: false,
      sessionId,
      userId,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!userId && !!orgId && !!orgRole) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor: actor || null,
      orgId,
      orgRole,
      orgSlug: orgSlug || null,
      has,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!userId && !orgId) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor: actor || null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut,
      getToken
    };
  }
  throw new Error(invalidStateError);
};

//# sourceMappingURL=useAuth.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/controlComponents.js








const SignedIn = ({ children }) => {
  const { userId } = useAuthContext();
  if (userId) {
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  }
  return null;
};
const SignedOut = ({ children }) => {
  const { userId } = useAuthContext();
  if (userId === null) {
    return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  }
  return null;
};
const ClerkLoaded = ({ children }) => {
  const isomorphicClerk = useIsomorphicClerkContext();
  if (!isomorphicClerk.loaded) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement(LoadedGuarantee, null, children);
};
const ClerkLoading = ({ children }) => {
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.loaded) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
};
const Protect = ({ children, fallback, ...restAuthorizedParams }) => {
  const { isLoaded, has, userId } = useAuth();
  if (!isLoaded) {
    return null;
  }
  const unauthorized = /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, fallback != null ? fallback : null);
  const authorized = /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children);
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    if (restAuthorizedParams.condition(has)) {
      return authorized;
    }
    return unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission) {
    if (has(restAuthorizedParams)) {
      return authorized;
    }
    return unauthorized;
  }
  return authorized;
};
const RedirectToSignIn = withClerk(({ clerk, ...props }) => {
  const { client, session } = clerk;
  const { __unstable__environment } = clerk;
  const hasActiveSessions = client.activeSessions && client.activeSessions.length > 0;
  react_default().useEffect(() => {
    if (session === null && hasActiveSessions && __unstable__environment) {
      const { afterSignOutOneUrl } = __unstable__environment.displayConfig;
      void clerk.navigate(afterSignOutOneUrl);
    } else {
      void clerk.redirectToSignIn(props);
    }
  }, []);
  return null;
}, "RedirectToSignIn");
const RedirectToSignUp = withClerk(({ clerk, ...props }) => {
  react_default().useEffect(() => {
    void clerk.redirectToSignUp(props);
  }, []);
  return null;
}, "RedirectToSignUp");
const RedirectToUserProfile = withClerk(({ clerk }) => {
  react_default().useEffect(() => {
    clerk.redirectToUserProfile();
  }, []);
  return null;
}, "RedirectToUserProfile");
const RedirectToOrganizationProfile = withClerk(({ clerk }) => {
  react_default().useEffect(() => {
    clerk.redirectToOrganizationProfile();
  }, []);
  return null;
}, "RedirectToOrganizationProfile");
const RedirectToCreateOrganization = withClerk(({ clerk }) => {
  react_default().useEffect(() => {
    clerk.redirectToCreateOrganization();
  }, []);
  return null;
}, "RedirectToCreateOrganization");
const AuthenticateWithRedirectCallback = withClerk(
  ({ clerk, ...handleRedirectCallbackParams }) => {
    react_default().useEffect(() => {
      void clerk.handleRedirectCallback(handleRedirectCallbackParams);
    }, []);
    return null;
  },
  "AuthenticateWithRedirectCallback"
);
const MultisessionAppSupport = ({ children }) => {
  const session = useSessionContext();
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, { key: session ? session.id : "no-users" }, children);
};

//# sourceMappingURL=controlComponents.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/withUser.js




const withUser = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const user = useUserContext();
    if (!user) {
      return null;
    }
    return /* @__PURE__ */ react_default().createElement(
      Component,
      {
        ...props,
        user
      }
    );
  };
  HOC.displayName = `withUser(${displayName})`;
  return HOC;
};
const WithUser = ({ children }) => {
  const user = useUserContext();
  if (typeof children !== "function") {
    throw new Error(hocChildrenNotAFunctionError);
  }
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children(user));
};

//# sourceMappingURL=withUser.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/withSession.js




const withSession = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const session = useSessionContext();
    if (!session) {
      return null;
    }
    return /* @__PURE__ */ react_default().createElement(
      Component,
      {
        ...props,
        session
      }
    );
  };
  HOC.displayName = `withSession(${displayName})`;
  return HOC;
};
const WithSession = ({ children }) => {
  const session = useSessionContext();
  if (typeof children !== "function") {
    throw new Error(hocChildrenNotAFunctionError);
  }
  if (!session) {
    return null;
  }
  return /* @__PURE__ */ react_default().createElement((react_default()).Fragment, null, children(session));
};

//# sourceMappingURL=withSession.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/utils/childrenUtils.js



const assertSingleChild = (children) => (name) => {
  try {
    return react_default().Children.only(children);
  } catch (e) {
    throw new Error(multipleChildrenInButtonComponent(name));
  }
};
const normalizeWithDefaultValue = (children, defaultText) => {
  if (!children) {
    children = defaultText;
  }
  if (typeof children === "string") {
    children = /* @__PURE__ */ react_default().createElement("button", null, children);
  }
  return children;
};
const safeExecute = (cb) => (...args) => {
  if (cb && typeof cb === "function") {
    return cb(...args);
  }
};

//# sourceMappingURL=childrenUtils.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/SignInButton.js




const SignInButton = withClerk(({ clerk, children, ...props }) => {
  const { afterSignInUrl, afterSignUpUrl, redirectUrl, mode, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign in");
  const child = assertSingleChild(children)("SignInButton");
  const clickHandler = () => {
    const opts = { afterSignInUrl, afterSignUpUrl, redirectUrl };
    if (mode === "modal") {
      return clerk.openSignIn(opts);
    }
    return clerk.redirectToSignIn(opts);
  };
  const wrappedChildClickHandler = async (e) => {
    await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return react_default().cloneElement(child, childProps);
}, "SignInButton");

//# sourceMappingURL=SignInButton.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/SignUpButton.js




const SignUpButton = withClerk(({ clerk, children, ...props }) => {
  const { afterSignInUrl, afterSignUpUrl, redirectUrl, mode, unsafeMetadata, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign up");
  const child = assertSingleChild(children)("SignUpButton");
  const clickHandler = () => {
    const opts = { afterSignInUrl, afterSignUpUrl, redirectUrl, unsafeMetadata };
    if (mode === "modal") {
      return clerk.openSignUp(opts);
    }
    return clerk.redirectToSignUp(opts);
  };
  const wrappedChildClickHandler = async (e) => {
    await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return react_default().cloneElement(child, childProps);
}, "SignUpButton");

//# sourceMappingURL=SignUpButton.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/SignOutButton.js




const SignOutButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { signOutCallback, signOutOptions, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign out");
    const child = assertSingleChild(children)("SignOutButton");
    const clickHandler = () => {
      return clerk.signOut(signOutCallback, signOutOptions);
    };
    const wrappedChildClickHandler = async (e) => {
      await safeExecute(child.props.onClick)(e);
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return react_default().cloneElement(child, childProps);
  },
  "SignOutButton"
);

//# sourceMappingURL=SignOutButton.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/SignInWithMetamaskButton.js




const SignInWithMetamaskButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { redirectUrl, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign in with Metamask");
    const child = assertSingleChild(children)("SignInWithMetamaskButton");
    const clickHandler = async () => {
      async function authenticate() {
        await clerk.authenticateWithMetamask({ redirectUrl });
      }
      void authenticate();
    };
    const wrappedChildClickHandler = async (e) => {
      await safeExecute(child.props.onClick)(e);
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return react_default().cloneElement(child, childProps);
  },
  "SignInWithMetamask"
);

//# sourceMappingURL=SignInWithMetamaskButton.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/components/index.js











//# sourceMappingURL=index.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useUser.js


function useUser() {
  const user = useUserContext();
  if (user === void 0) {
    return { isLoaded: false, isSignedIn: void 0, user: void 0 };
  }
  if (user === null) {
    return { isLoaded: true, isSignedIn: false, user: null };
  }
  return { isLoaded: true, isSignedIn: true, user };
}

//# sourceMappingURL=useUser.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSession.js


const useSession = () => {
  const session = useSessionContext();
  if (session === void 0) {
    return { isLoaded: false, isSignedIn: void 0, session: void 0 };
  }
  if (session === null) {
    return { isLoaded: true, isSignedIn: false, session: null };
  }
  return { isLoaded: true, isSignedIn: true, session };
};

//# sourceMappingURL=useSession.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useClerk.js


const useClerk = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  return isomorphicClerk;
};

//# sourceMappingURL=useClerk.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSignIn.js



const useSignIn = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  if (!client) {
    return { isLoaded: false, signIn: void 0, setSession: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signIn: client.signIn,
    setSession: isomorphicClerk.setSession,
    setActive: isomorphicClerk.setActive
  };
};

//# sourceMappingURL=useSignIn.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSignUp.js



const useSignUp = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  if (!client) {
    return { isLoaded: false, signUp: void 0, setSession: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signUp: client.signUp,
    setSession: isomorphicClerk.setSession,
    setActive: isomorphicClerk.setActive
  };
};

//# sourceMappingURL=useSignUp.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useSessionList.js



const useSessionList = () => {
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  if (!client) {
    return { isLoaded: false, sessions: void 0, setSession: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    sessions: client.sessions,
    setSession: isomorphicClerk.setSession,
    setActive: isomorphicClerk.setActive
  };
};

//# sourceMappingURL=useSessionList.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/index.js














//# sourceMappingURL=index.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useMagicLink.js



function useMagicLink(resource) {
  (0,dist_deprecated/* deprecated */.io)("useMagicLink", "Use `useEmailLink` instead.");
  const { startMagicLinkFlow, cancelMagicLinkFlow } = react_default().useMemo(() => resource.createMagicLinkFlow(), [resource]);
  react_default().useEffect(() => {
    return cancelMagicLinkFlow;
  }, []);
  return {
    startMagicLinkFlow,
    cancelMagicLinkFlow
  };
}

//# sourceMappingURL=useMagicLink.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/hooks/useEmailLink.js


function useEmailLink(resource) {
  const { startEmailLinkFlow, cancelEmailLinkFlow } = react_default().useMemo(() => resource.createEmailLinkFlow(), [resource]);
  react_default().useEffect(() => {
    return cancelEmailLinkFlow;
  }, []);
  return {
    startEmailLinkFlow,
    cancelEmailLinkFlow
  };
}

//# sourceMappingURL=useEmailLink.js.map
;// ./node_modules/@clerk/clerk-react/dist/esm/index.js









//# sourceMappingURL=index.js.map

/***/ }),

/***/ 16189:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65773);
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


//# sourceMappingURL=navigation.js.map

/***/ }),

/***/ 17388:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSegmentValue", ({
    enumerable: true,
    get: function() {
        return getSegmentValue;
    }
}));
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map


/***/ }),

/***/ 17974:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "RedirectStatusCode", ({
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
}));
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map


/***/ }),

/***/ 18238:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHangingPromiseRejectionError: function() {
        return isHangingPromiseRejectionError;
    },
    makeHangingPromise: function() {
        return makeHangingPromise;
    }
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}

//# sourceMappingURL=dynamic-rendering-utils.js.map

/***/ }),

/***/ 22113:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DynamicServerError: function() {
        return DynamicServerError;
    },
    isDynamicServerError: function() {
        return isDynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map


/***/ }),

/***/ 22142:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(94041).vendored.contexts.AppRouterContext;

//# sourceMappingURL=app-router-context.js.map

/***/ }),

/***/ 22527:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RE: () => (/* reexport safe */ _chunk_MHVPBPEZ_mjs__WEBPACK_IMPORTED_MODULE_0__.RE),
/* harmony export */   _c: () => (/* reexport safe */ _chunk_MHVPBPEZ_mjs__WEBPACK_IMPORTED_MODULE_0__._c),
/* harmony export */   zz: () => (/* reexport safe */ _chunk_MHVPBPEZ_mjs__WEBPACK_IMPORTED_MODULE_0__.zz)
/* harmony export */ });
/* harmony import */ var _chunk_MHVPBPEZ_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27271);
/* harmony import */ var _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65620);
/* harmony import */ var _chunk_NDCDZYN6_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92549);




//# sourceMappingURL=proxy.mjs.map

/***/ }),

/***/ 23000:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $R: () => (/* binding */ isClerkAPIResponseError),
/* harmony export */   LR: () => (/* binding */ ClerkAPIResponseError),
/* harmony export */   Or: () => (/* binding */ isMagicLinkError),
/* harmony export */   Ys: () => (/* binding */ EmailLinkErrorCode),
/* harmony export */   _r: () => (/* binding */ buildErrorThrower),
/* harmony export */   dB: () => (/* binding */ MagicLinkErrorCode),
/* harmony export */   hl: () => (/* binding */ isEmailLinkError),
/* harmony export */   si: () => (/* binding */ isMetamaskError),
/* harmony export */   ux: () => (/* binding */ isKnownError)
/* harmony export */ });
/* unused harmony exports isUnauthorizedError, isCaptchaError, is4xxError, isNetworkError, isClerkRuntimeError, isUserLockedError, parseErrors, isPasswordPwnedError, parseError, ClerkRuntimeError, MagicLinkError, EmailLinkError */
/* harmony import */ var _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65620);


// src/error.ts
function isUnauthorizedError(e) {
  var _a, _b;
  const status = e == null ? void 0 : e.status;
  const code = (_b = (_a = e == null ? void 0 : e.errors) == null ? void 0 : _a[0]) == null ? void 0 : _b.code;
  return code === "authentication_invalid" && status === 401;
}
function isCaptchaError(e) {
  return ["captcha_invalid", "captcha_not_enabled", "captcha_missing_token"].includes(e.errors[0].code);
}
function is4xxError(e) {
  const status = e == null ? void 0 : e.status;
  return !!status && status >= 400 && status < 500;
}
function isNetworkError(e) {
  const message = (`${e.message}${e.name}` || "").toLowerCase().replace(/\s+/g, "");
  return message.includes("networkerror");
}
function isKnownError(error) {
  return isClerkAPIResponseError(error) || isMetamaskError(error) || isClerkRuntimeError(error);
}
function isClerkAPIResponseError(err) {
  return "clerkError" in err;
}
function isClerkRuntimeError(err) {
  return "clerkRuntimeError" in err;
}
function isMetamaskError(err) {
  return "code" in err && [4001, 32602, 32603].includes(err.code) && "message" in err;
}
function isUserLockedError(err) {
  var _a, _b;
  return isClerkAPIResponseError(err) && ((_b = (_a = err.errors) == null ? void 0 : _a[0]) == null ? void 0 : _b.code) === "user_locked";
}
function parseErrors(data = []) {
  return data.length > 0 ? data.map(parseError) : [];
}
function isPasswordPwnedError(err) {
  var _a, _b;
  return isClerkAPIResponseError(err) && ((_b = (_a = err.errors) == null ? void 0 : _a[0]) == null ? void 0 : _b.code) === "form_password_pwned";
}
function parseError(error) {
  var _a, _b, _c, _d, _e;
  return {
    code: error.code,
    message: error.message,
    longMessage: error.long_message,
    meta: {
      paramName: (_a = error == null ? void 0 : error.meta) == null ? void 0 : _a.param_name,
      sessionId: (_b = error == null ? void 0 : error.meta) == null ? void 0 : _b.session_id,
      emailAddresses: (_c = error == null ? void 0 : error.meta) == null ? void 0 : _c.email_addresses,
      identifiers: (_d = error == null ? void 0 : error.meta) == null ? void 0 : _d.identifiers,
      zxcvbn: (_e = error == null ? void 0 : error.meta) == null ? void 0 : _e.zxcvbn
    }
  };
}
var ClerkAPIResponseError = class _ClerkAPIResponseError extends Error {
  constructor(message, { data, status, clerkTraceId }) {
    super(message);
    this.toString = () => {
      let message = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map(
        (e) => JSON.stringify(e)
      )}`;
      if (this.clerkTraceId) {
        message += `
Clerk Trace ID: ${this.clerkTraceId}`;
      }
      return message;
    };
    Object.setPrototypeOf(this, _ClerkAPIResponseError.prototype);
    this.status = status;
    this.message = message;
    this.clerkTraceId = clerkTraceId;
    this.clerkError = true;
    this.errors = parseErrors(data);
  }
};
var ClerkRuntimeError = class _ClerkRuntimeError extends Error {
  constructor(message, { code }) {
    super(message);
    /**
     * Returns a string representation of the error.
     *
     * @returns {string} A formatted string with the error name and message.
     * @memberof ClerkRuntimeError
     */
    this.toString = () => {
      return `[${this.name}]
Message:${this.message}`;
    };
    Object.setPrototypeOf(this, _ClerkRuntimeError.prototype);
    this.code = code;
    this.message = message;
    this.clerkRuntimeError = true;
  }
};
var MagicLinkError = class _MagicLinkError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
    Object.setPrototypeOf(this, _MagicLinkError.prototype);
    (0,_chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__/* .deprecated */ .io)("MagicLinkError", "Use `EmailLinkError` instead.");
  }
};
var EmailLinkError = class _EmailLinkError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
    Object.setPrototypeOf(this, _EmailLinkError.prototype);
  }
};
function isMagicLinkError(err) {
  (0,_chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__/* .deprecated */ .io)("isMagicLinkError", "Use `isEmailLinkError` instead.");
  return err instanceof MagicLinkError;
}
function isEmailLinkError(err) {
  return err instanceof EmailLinkError;
}
var _MagicLinkErrorCode = {
  Expired: "expired",
  Failed: "failed"
};
var MagicLinkErrorCode = new Proxy(_MagicLinkErrorCode, {
  get(target, prop, receiver) {
    (0,_chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__/* .deprecated */ .io)("MagicLinkErrorCode", "Use `EmailLinkErrorCode` instead.");
    return Reflect.get(target, prop, receiver);
  }
});
var EmailLinkErrorCode = {
  Expired: "expired",
  Failed: "failed"
};
var DefaultMessages = Object.freeze({
  InvalidFrontendApiErrorMessage: `The frontendApi passed to Clerk is invalid. You can get your Frontend API key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
  InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
  InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
  MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`
});
function buildErrorThrower({ packageName, customMessages }) {
  let pkg = packageName;
  const messages = {
    ...DefaultMessages,
    ...customMessages
  };
  function buildMessage(rawMessage, replacements) {
    if (!replacements) {
      return `${pkg}: ${rawMessage}`;
    }
    let msg = rawMessage;
    const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const match of matches) {
      const replacement = (replacements[match[1]] || "").toString();
      msg = msg.replace(`{{${match[1]}}}`, replacement);
    }
    return `${pkg}: ${msg}`;
  }
  return {
    setPackageName({ packageName: packageName2 }) {
      if (typeof packageName2 === "string") {
        pkg = packageName2;
      }
      return this;
    },
    setMessages({ customMessages: customMessages2 }) {
      Object.assign(messages, customMessages2 || {});
      return this;
    },
    throwInvalidPublishableKeyError(params) {
      throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
    },
    throwInvalidFrontendApiError(params) {
      throw new Error(buildMessage(messages.InvalidFrontendApiErrorMessage, params));
    },
    throwInvalidProxyUrl(params) {
      throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
    },
    throwMissingPublishableKeyError() {
      throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
    }
  };
}


//# sourceMappingURL=chunk-VN4YMSVR.mjs.map

/***/ }),

/***/ 24207:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';

//# sourceMappingURL=metadata-constants.js.map

/***/ }),

/***/ 27271:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RE: () => (/* binding */ isHttpOrHttps),
/* harmony export */   _c: () => (/* binding */ isValidProxyUrl),
/* harmony export */   zz: () => (/* binding */ proxyUrlToAbsoluteURL)
/* harmony export */ });
/* unused harmony exports isProxyUrlRelative, getRequestUrl */
/* harmony import */ var _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65620);


// src/proxy.ts
function isValidProxyUrl(key) {
  if (!key) {
    return true;
  }
  return isHttpOrHttps(key) || isProxyUrlRelative(key);
}
function isHttpOrHttps(key) {
  return /^http(s)?:\/\//.test(key || "");
}
function isProxyUrlRelative(key) {
  return key.startsWith("/");
}
function proxyUrlToAbsoluteURL(url) {
  if (!url) {
    return "";
  }
  return isProxyUrlRelative(url) ? new URL(url, window.location.origin).toString() : url;
}
function getRequestUrl({ request, relativePath }) {
  var _a, _b, _c, _d, _e, _f;
  deprecated("getRequestUrl", "Use `buildRequestUrl` from @clerk/backend instead.");
  const { headers, url: initialUrl } = request;
  const url = new URL(initialUrl);
  const host = (_c = (_b = (_a = headers.get("X-Forwarded-Host")) != null ? _a : headers.get("host")) != null ? _b : headers["host"]) != null ? _c : url.host;
  let protocol = (_f = (_e = (_d = headers.get("X-Forwarded-Proto")) != null ? _d : headers["X-Forwarded-Proto"]) == null ? void 0 : _e.split(",")[0]) != null ? _f : url.protocol;
  protocol = protocol.replace(/[:/]/, "");
  return new URL(relativePath || url.pathname, `${protocol}://${host}`);
}


//# sourceMappingURL=chunk-MHVPBPEZ.mjs.map

/***/ }),

/***/ 27804:
/***/ (() => {

if (typeof window !== "undefined" && !window.global) {
  window.global = typeof global === "undefined" ? window : global;
}
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ 36875:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __webpack_require__(17974);
const _redirecterror = __webpack_require__(97860);
const actionAsyncStorage =  true ? (__webpack_require__(19121).actionAsyncStorage) : 0;
function getRedirectError(url, type, statusCode) {
    if (statusCode === void 0) statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect;
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = _redirecterror.REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    var _actionAsyncStorage_getStore;
    type != null ? type : type = (actionAsyncStorage == null ? void 0 : (_actionAsyncStorage_getStore = actionAsyncStorage.getStore()) == null ? void 0 : _actionAsyncStorage_getStore.isAction) ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type) {
    if (type === void 0) type = _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 39695:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(94041).vendored.contexts.ServerInsertedHtml;

//# sourceMappingURL=server-inserted-html.js.map

/***/ }),

/***/ 40117:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  V: () => (/* reexport */ handleValueOrFn)
});

;// ./node_modules/@clerk/shared/dist/chunk-TRWMHODU.mjs
// src/handleValueOrFn.ts
function handleValueOrFn(value, url, defaultValue) {
  if (typeof value === "function") {
    return value(url);
  }
  if (typeof value !== "undefined") {
    return value;
  }
  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }
  return void 0;
}


//# sourceMappingURL=chunk-TRWMHODU.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs
var chunk_NDCDZYN6 = __webpack_require__(92549);
;// ./node_modules/@clerk/shared/dist/handleValueOrFn.mjs



//# sourceMappingURL=handleValueOrFn.mjs.map

/***/ }),

/***/ 42292:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unstable_rethrow", ({
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
}));
const _dynamicrenderingutils = __webpack_require__(18238);
const _ispostpone = __webpack_require__(76299);
const _bailouttocsr = __webpack_require__(81208);
const _isnextroutererror = __webpack_require__(88092);
const _dynamicrendering = __webpack_require__(54717);
const _hooksservercontext = __webpack_require__(22113);
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.server.js.map


/***/ }),

/***/ 43210:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(94041).vendored["react-ssr"].React;

//# sourceMappingURL=react.js.map

/***/ }),

/***/ 46091:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ isomorphicAtob)
/* harmony export */ });
// src/isomorphicAtob.ts
var isomorphicAtob = (data) => {
  if (typeof atob !== "undefined" && typeof atob === "function") {
    return atob(data);
  } else if (typeof global !== "undefined" && global.Buffer) {
    return new global.Buffer(data, "base64").toString();
  }
  return data;
};


//# sourceMappingURL=chunk-TETGTEI2.mjs.map

/***/ }),

/***/ 51215:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(94041).vendored["react-ssr"].ReactDOM;

//# sourceMappingURL=react-dom.js.map

/***/ }),

/***/ 52825:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    atLeastOneTask: function() {
        return atLeastOneTask;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
        return waitAtLeastOneReactRenderTask;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if (false) {} else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if (false) {} else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if (false) {} else {
        return new Promise((r)=>setImmediate(r));
    }
}

//# sourceMappingURL=scheduler.js.map

/***/ }),

/***/ 53332:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(43210);
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useState = React.useState,
  useEffect = React.useEffect,
  useLayoutEffect = React.useLayoutEffect,
  useDebugValue = React.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
    _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
    inst = _useState[0].inst,
    forceUpdate = _useState[1];
  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return !0;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim =
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;
exports.useSyncExternalStore =
  void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;


/***/ }),

/***/ 54717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Postpone: function() {
        return Postpone;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
        return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
        return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
        return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
        return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
        return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
        return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
        return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
        return createHangingInputAbortSignal;
    },
    createPostponedAbortSignal: function() {
        return createPostponedAbortSignal;
    },
    formatDynamicAPIAccesses: function() {
        return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
        return getFirstDynamicReason;
    },
    isDynamicPostpone: function() {
        return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
        return isPrerenderInterruptedError;
    },
    markCurrentScopeAsDynamic: function() {
        return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
        return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
        return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
        return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
        return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
        return trackDynamicDataInDynamicRender;
    },
    trackFallbackParamAccessed: function() {
        return trackFallbackParamAccessed;
    },
    trackSynchronousPlatformIOAccessInDev: function() {
        return trackSynchronousPlatformIOAccessInDev;
    },
    trackSynchronousRequestDataAccessInDev: function() {
        return trackSynchronousRequestDataAccessInDev;
    },
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__webpack_require__(43210));
const _hooksservercontext = __webpack_require__(22113);
const _staticgenerationbailout = __webpack_require__(7797);
const _workunitasyncstorageexternal = __webpack_require__(63033);
const _workasyncstorageexternal = __webpack_require__(29294);
const _dynamicrenderingutils = __webpack_require__(18238);
const _metadataconstants = __webpack_require__(24207);
const _scheduler = __webpack_require__(52825);
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const hasPostpone = typeof _react.default.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicExpression: undefined,
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspendedDynamic: false,
        hasDynamicMetadata: false,
        hasDynamicViewport: false,
        hasSyncDynamicErrors: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
            // forbidden inside a cache scope.
            return;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        if (workUnitStore.type === 'prerender-ppr') {
            postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
        } else if (workUnitStore.type === 'prerender-legacy') {
            workUnitStore.revalidate = 0;
            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
            const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                value: "E550",
                enumerable: false,
                configurable: true
            });
            store.dynamicUsageDescription = expression;
            store.dynamicUsageStack = err.stack;
            throw err;
        } else if (false) {}
    }
}
function trackFallbackParamAccessed(store, expression) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!prerenderStore || prerenderStore.type !== 'prerender-ppr') return;
    postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(_store, workUnitStore) {
    if (workUnitStore) {
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
            // forbidden inside a cache scope.
            return;
        }
        if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-legacy') {
            workUnitStore.revalidate = 0;
        }
        if (false) {}
    }
}
// Despite it's name we don't actually abort unless we have a controller to call abort on
// There are times when we let a prerender run long to discover caches where we want the semantics
// of tracking dynamic access without terminating the prerender early
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicExpression = expression;
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
}
function trackSynchronousPlatformIOAccessInDev(requestStore) {
    // We don't actually have a controller to abort but we do the semantic equivalent by
    // advancing the request store out of prerender mode
    requestStore.prerenderPhase = false;
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicExpression = expression;
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
                if (prerenderStore.validating === true) {
                    // We always log Request Access in dev at the point of calling the function
                    // So we mark the dynamic validation as not requiring it to be printed
                    dynamicTracking.syncDynamicLogged = true;
                }
            }
        }
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n')// Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createPostponedAbortSignal(reason) {
    assertPostpone();
    const controller = new AbortController();
    // We get our hands on a postpone instance by calling postpone and catching the throw
    try {
        _react.default.unstable_postpone(reason);
    } catch (x) {
        controller.abort(x);
    }
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    const controller = new AbortController();
    if (workUnitStore.cacheSignal) {
        // If we have a cacheSignal it means we're in a prospective render. If the input
        // we're waiting on is coming from another cache, we do want to wait for it so that
        // we can resolve this cache entry too.
        workUnitStore.cacheSignal.inputReady().then(()=>{
            controller.abort();
        });
    } else {
        // Otherwise we're in the final render and we should already have all our caches
        // filled. We might still be waiting on some microtasks so we wait one tick before
        // giving up. When we give up, we still want to render the content of this cache
        // as deeply as we can so that we can suspend as deeply as possible in the tree
        // or not at all if we don't end up waiting for the input.
        (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
    }
    return controller.signal;
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
        // There are fallback route params, we should track these as dynamic
        // accesses.
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workUnitStore) {
            // We're prerendering with dynamicIO or PPR or both
            if (workUnitStore.type === 'prerender') {
                // We are in a prerender with dynamicIO semantics
                // We are going to hang here and never resolve. This will cause the currently
                // rendering component to effectively be a dynamic hole
                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, expression));
            } else if (workUnitStore.type === 'prerender-ppr') {
                // We're prerendering with PPR
                postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                throwToInterruptStaticGeneration(expression, workStore, workUnitStore);
            }
        }
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_metadataconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_metadataconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_metadataconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
function trackAllowedDynamicAccess(route, componentStack, dynamicValidation, serverDynamic, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        dynamicValidation.hasSuspendedDynamic = true;
        return;
    } else if (serverDynamic.syncDynamicErrorWithStack || clientDynamic.syncDynamicErrorWithStack) {
        dynamicValidation.hasSyncDynamicErrors = true;
        return;
    } else {
        const message = `Route "${route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
        const error = createErrorWithComponentStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
function createErrorWithComponentStack(message, componentStack) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.stack = 'Error: ' + message + componentStack;
    return error;
}
function throwIfDisallowedDynamic(route, dynamicValidation, serverDynamic, clientDynamic) {
    let syncError;
    let syncExpression;
    let syncLogged;
    if (serverDynamic.syncDynamicErrorWithStack) {
        syncError = serverDynamic.syncDynamicErrorWithStack;
        syncExpression = serverDynamic.syncDynamicExpression;
        syncLogged = serverDynamic.syncDynamicLogged === true;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        syncError = clientDynamic.syncDynamicErrorWithStack;
        syncExpression = clientDynamic.syncDynamicExpression;
        syncLogged = clientDynamic.syncDynamicLogged === true;
    } else {
        syncError = null;
        syncExpression = undefined;
        syncLogged = false;
    }
    if (dynamicValidation.hasSyncDynamicErrors && syncError) {
        if (!syncLogged) {
            // In dev we already log errors about sync dynamic access. But during builds we need to ensure
            // the offending sync error is logged before we exit the build
            console.error(syncError);
        }
        // The actual error should have been logged when the sync access ocurred
        throw new _staticgenerationbailout.StaticGenBailoutError();
    }
    const dynamicErrors = dynamicValidation.dynamicErrors;
    if (dynamicErrors.length) {
        for(let i = 0; i < dynamicErrors.length; i++){
            console.error(dynamicErrors[i]);
        }
        throw new _staticgenerationbailout.StaticGenBailoutError();
    }
    if (!dynamicValidation.hasSuspendedDynamic) {
        if (dynamicValidation.hasDynamicMetadata) {
            if (syncError) {
                console.error(syncError);
                throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateMetadata\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E608",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                value: "E534",
                enumerable: false,
                configurable: true
            });
        } else if (dynamicValidation.hasDynamicViewport) {
            if (syncError) {
                console.error(syncError);
                throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateViewport\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E573",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                value: "E590",
                enumerable: false,
                configurable: true
            });
        }
    }
}

//# sourceMappingURL=dynamic-rendering.js.map

/***/ }),

/***/ 55211:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "notFound", ({
    enumerable: true,
    get: function() {
        return notFound;
    }
}));
const _httpaccessfallback = __webpack_require__(86358);
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 57379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(53332);
} else {}


/***/ }),

/***/ 59433:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ useSafeLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useSafeLayoutEffect = typeof window !== "undefined" ? (react__WEBPACK_IMPORTED_MODULE_0___default().useLayoutEffect) : (react__WEBPACK_IMPORTED_MODULE_0___default().useEffect);

//# sourceMappingURL=useSafeLayoutEffect.js.map

/***/ }),

/***/ 65620:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lx: () => (/* binding */ deprecatedProperty),
/* harmony export */   W1: () => (/* binding */ deprecatedObjectProperty),
/* harmony export */   b_: () => (/* binding */ isDevelopmentEnvironment),
/* harmony export */   io: () => (/* binding */ deprecated)
/* harmony export */ });
/* unused harmony exports isTestEnvironment, isProductionEnvironment */
// src/utils/runtimeEnvironment.ts
var isDevelopmentEnvironment = () => {
  try {
    return "production" === "development";
  } catch (err) {
  }
  return false;
};
var isTestEnvironment = () => {
  try {
    return "production" === "test";
  } catch (err) {
  }
  return false;
};
var isProductionEnvironment = () => {
  try {
    return "production" === "production";
  } catch (err) {
  }
  return false;
};

// src/deprecated.ts
var displayedWarnings = /* @__PURE__ */ new Set();
var deprecated = (fnName, warning, key) => {
  const hideWarning = isTestEnvironment() || isProductionEnvironment();
  const messageId = key != null ? key : fnName;
  if (displayedWarnings.has(messageId) || hideWarning) {
    return;
  }
  displayedWarnings.add(messageId);
  console.warn(
    `Clerk - DEPRECATION WARNING: "${fnName}" is deprecated and will be removed in the next major release.
${warning}`
  );
};
var deprecatedProperty = (cls, propName, warning, isStatic = false) => {
  const target = isStatic ? cls : cls.prototype;
  let value = target[propName];
  Object.defineProperty(target, propName, {
    get() {
      deprecated(propName, warning, `${cls.name}:${propName}`);
      return value;
    },
    set(v) {
      value = v;
    }
  });
};
var deprecatedObjectProperty = (obj, propName, warning, key) => {
  let value = obj[propName];
  Object.defineProperty(obj, propName, {
    get() {
      deprecated(propName, warning, key);
      return value;
    },
    set(v) {
      value = v;
    }
  });
};


//# sourceMappingURL=chunk-IC4FGZI3.mjs.map

/***/ }),

/***/ 65773:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _navigationreactserver.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _navigationreactserver.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
    },
    forbidden: function() {
        return _navigationreactserver.forbidden;
    },
    notFound: function() {
        return _navigationreactserver.notFound;
    },
    permanentRedirect: function() {
        return _navigationreactserver.permanentRedirect;
    },
    redirect: function() {
        return _navigationreactserver.redirect;
    },
    unauthorized: function() {
        return _navigationreactserver.unauthorized;
    },
    unstable_rethrow: function() {
        return _navigationreactserver.unstable_rethrow;
    },
    useParams: function() {
        return useParams;
    },
    usePathname: function() {
        return usePathname;
    },
    useRouter: function() {
        return useRouter;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
    }
});
const _react = __webpack_require__(43210);
const _approutercontextsharedruntime = __webpack_require__(22142);
const _hooksclientcontextsharedruntime = __webpack_require__(10449);
const _getsegmentvalue = __webpack_require__(17388);
const _segment = __webpack_require__(83913);
const _navigationreactserver = __webpack_require__(80178);
const _serverinsertedhtmlsharedruntime = __webpack_require__(39695);
const useDynamicRouteParams =  true ? (__webpack_require__(54717).useDynamicRouteParams) : 0;
function useSearchParams() {
    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new _navigationreactserver.ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering } = __webpack_require__(9608);
        // TODO-APP: handle dynamic = 'force-static' here and on the client
        bailoutToClientRendering('useSearchParams()');
    }
    return readonlySearchParams;
}
function usePathname() {
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('usePathname()');
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
}
function useRouter() {
    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
    if (router === null) {
        throw Object.defineProperty(new Error('invariant expected app router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
        });
    }
    return router;
}
function useParams() {
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useParams()');
    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
}
/** Get the canonical parameters from the current level to the leaf node. */ // Client components API
function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
    if (first === void 0) first = true;
    if (segmentPath === void 0) segmentPath = [];
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _parallelRoutes_children;
        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    let segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
    if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = 'children';
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useSelectedLayoutSegments()');
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    // @ts-expect-error This only happens in `pages`. Type is overwritten in navigation.d.ts
    if (!context) return null;
    return getSelectedLayoutSegmentPath(context.parentTree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = 'children';
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useSelectedLayoutSegment()');
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (!selectedLayoutSegments || selectedLayoutSegments.length === 0) {
        return null;
    }
    const selectedLayoutSegment = parallelRouteKey === 'children' ? selectedLayoutSegments[0] : selectedLayoutSegments[selectedLayoutSegments.length - 1];
    // if the default slot is showing, we return null since it's not technically "selected" (it's a fallback)
    // and returning an internal value like `__DEFAULT__` would be confusing.
    return selectedLayoutSegment === _segment.DEFAULT_SEGMENT_KEY ? null : selectedLayoutSegment;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 68613:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unstable_rethrow", ({
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
}));
const unstable_rethrow =  true ? (__webpack_require__(42292).unstable_rethrow) : 0;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map


/***/ }),

/***/ 76299:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isPostpone", ({
    enumerable: true,
    get: function() {
        return isPostpone;
    }
}));
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
}

//# sourceMappingURL=is-postpone.js.map

/***/ }),

/***/ 77681:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $R: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.$R),
/* harmony export */   LR: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.LR),
/* harmony export */   Or: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.Or),
/* harmony export */   Ys: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.Ys),
/* harmony export */   _r: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__._r),
/* harmony export */   dB: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.dB),
/* harmony export */   hl: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.hl),
/* harmony export */   si: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.si),
/* harmony export */   ux: () => (/* reexport safe */ _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__.ux)
/* harmony export */ });
/* harmony import */ var _chunk_VN4YMSVR_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23000);
/* harmony import */ var _chunk_IC4FGZI3_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65620);
/* harmony import */ var _chunk_NDCDZYN6_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92549);




//# sourceMappingURL=error.mjs.map

/***/ }),

/***/ 80178:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/** @internal */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _redirecterror.RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _redirect = __webpack_require__(36875);
const _redirecterror = __webpack_require__(97860);
const _notfound = __webpack_require__(55211);
const _forbidden = __webpack_require__(80414);
const _unauthorized = __webpack_require__(80929);
const _unstablerethrow = __webpack_require__(68613);
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map


/***/ }),

/***/ 80414:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "forbidden", ({
    enumerable: true,
    get: function() {
        return forbidden;
    }
}));
const _httpaccessfallback = __webpack_require__(86358);
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
function forbidden() {
    if (true) {
        throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map


/***/ }),

/***/ 80929:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unauthorized", ({
    enumerable: true,
    get: function() {
        return unauthorized;
    }
}));
const _httpaccessfallback = __webpack_require__(86358);
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
function unauthorized() {
    if (true) {
        throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map


/***/ }),

/***/ 81208:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// This has to be a shared module which is shared between client component error boundary and dynamic component

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map


/***/ }),

/***/ 83913:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
    },
    isGroupSegment: function() {
        return isGroupSegment;
    },
    isParallelRouteSegment: function() {
        return isParallelRouteSegment;
    }
});
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; //# sourceMappingURL=segment.js.map


/***/ }),

/***/ 86358:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map


/***/ }),

/***/ 88092:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNextRouterError", ({
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
}));
const _httpaccessfallback = __webpack_require__(86358);
const _redirecterror = __webpack_require__(97860);
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map


/***/ }),

/***/ 89213:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  TV: () => (/* reexport */ addClerkPrefix),
  lF: () => (/* reexport */ getClerkJsMajorVersionOrTag),
  jh: () => (/* reexport */ getScriptUrl)
});

// UNUSED EXPORTS: parseSearchParams, stripScheme

;// ./node_modules/@clerk/shared/dist/chunk-BX6URPWV.mjs
// src/utils/instance.ts
function isStaging(frontendApi) {
  return frontendApi.endsWith(".lclstage.dev") || frontendApi.endsWith(".stgstage.dev") || frontendApi.endsWith(".clerkstage.dev") || frontendApi.endsWith(".accountsstage.dev");
}

// src/url.ts
function parseSearchParams(queryString = "") {
  if (queryString.startsWith("?")) {
    queryString = queryString.slice(1);
  }
  return new URLSearchParams(queryString);
}
function stripScheme(url = "") {
  return (url || "").replace(/^.+:\/\//, "");
}
function addClerkPrefix(str) {
  if (!str) {
    return "";
  }
  let regex;
  if (str.match(/^(clerk\.)+\w*$/)) {
    regex = /(clerk\.)*(?=clerk\.)/;
  } else if (str.match(/\.clerk.accounts/)) {
    return str;
  } else {
    regex = /^(clerk\.)*/gi;
  }
  const stripped = str.replace(regex, "");
  return `clerk.${stripped}`;
}
var getClerkJsMajorVersionOrTag = (frontendApi, pkgVersion) => {
  if (!pkgVersion && isStaging(frontendApi)) {
    return "canary";
  }
  if (!pkgVersion) {
    return "latest";
  }
  return pkgVersion.split(".")[0] || "latest";
};
var getScriptUrl = (frontendApi, { pkgVersion = "4.73.9", clerkJSVersion }) => {
  const noSchemeFrontendApi = frontendApi.replace(/http(s)?:\/\//, "");
  const major = getClerkJsMajorVersionOrTag(frontendApi, pkgVersion);
  return `https://${noSchemeFrontendApi}/npm/@clerk/clerk-js@${clerkJSVersion || major}/dist/clerk.browser.js`;
};


//# sourceMappingURL=chunk-BX6URPWV.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs
var chunk_NDCDZYN6 = __webpack_require__(92549);
;// ./node_modules/@clerk/shared/dist/url.mjs



//# sourceMappingURL=url.mjs.map

/***/ }),

/***/ 92549:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ __export),
/* harmony export */   i: () => (/* binding */ __reExport)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));


//# sourceMappingURL=chunk-NDCDZYN6.mjs.map

/***/ }),

/***/ 94041:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (false) {} else {
    if (false) {} else {
        if (false) {} else {
            if (false) {} else {
                module.exports = __webpack_require__(10846);
            }
        }
    }
}

//# sourceMappingURL=module.compiled.js.map

/***/ }),

/***/ 95486:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ ClerkNextOptionsProvider),
/* harmony export */   c: () => (/* binding */ useClerkNextOptions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ClerkNextOptionsCtx = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(void 0);
ClerkNextOptionsCtx.displayName = "ClerkNextOptionsCtx";
const useClerkNextOptions = () => {
  const ctx = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(ClerkNextOptionsCtx);
  return ctx.value;
};
const ClerkNextOptionsProvider = (props) => {
  const { children, options } = props;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ClerkNextOptionsCtx.Provider, { value: { value: options } }, children);
};

//# sourceMappingURL=NextOptionsContext.js.map

/***/ }),

/***/ 97860:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
        return RedirectType;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __webpack_require__(17974);
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map


/***/ })

};
;