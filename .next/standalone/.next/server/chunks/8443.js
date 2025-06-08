"use strict";
exports.id = 8443;
exports.ids = [8443];
exports.modules = {

/***/ 163:
/***/ ((module, exports, __webpack_require__) => {

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
const unstable_rethrow =  true ? (__webpack_require__(71042).unstable_rethrow) : 0;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map


/***/ }),

/***/ 8704:
/***/ ((module, exports) => {


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

/***/ 18492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  V: () => (/* binding */ withLogger)
});

// UNUSED EXPORTS: createDebugLogger

;// ./node_modules/next/package.json
const package_namespaceObject = {"rE":"15.3.3"};
;// ./node_modules/@clerk/nextjs/dist/esm/utils/logFormatter.js
const maskSecretKey = (str) => {
  if (!str || typeof str !== "string") {
    return str;
  }
  try {
    return (str || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
  } catch (e) {
    return "";
  }
};
const logFormatter = (entry) => {
  return (Array.isArray(entry) ? entry : [entry]).map((entry2) => {
    if (typeof entry2 === "string") {
      return maskSecretKey(entry2);
    }
    const masked = Object.fromEntries(Object.entries(entry2).map(([k, v]) => [k, maskSecretKey(v)]));
    return JSON.stringify(masked, null, 2);
  }).join(", ");
};

//# sourceMappingURL=logFormatter.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/utils/debugLogger.js


const createDebugLogger = (name, formatter) => () => {
  const entries = [];
  let isEnabled = false;
  return {
    enable: () => {
      isEnabled = true;
    },
    debug: (...args) => {
      if (isEnabled) {
        entries.push(args.map((arg) => typeof arg === "function" ? arg() : arg));
      }
    },
    commit: () => {
      if (isEnabled) {
        console.log(debugLogHeader(name));
        for (const log of entries) {
          let output = formatter(log);
          output = output.split("\n").map((l) => `  ${l}`).join("\n");
          if (process.env.VERCEL) {
            output = truncate(output, 4096);
          }
          console.log(output);
        }
        console.log(debugLogFooter(name));
      }
    }
  };
};
const withLogger = (loggerFactoryOrName, handlerCtor) => {
  return (...args) => {
    const factory = typeof loggerFactoryOrName === "string" ? createDebugLogger(loggerFactoryOrName, logFormatter) : loggerFactoryOrName;
    const logger = factory();
    const handler = handlerCtor(logger);
    try {
      const res = handler(...args);
      if (typeof res === "object" && "then" in res && typeof res.then === "function") {
        return res.then((val) => {
          logger.commit();
          return val;
        }).catch((err) => {
          logger.commit();
          throw err;
        });
      }
      logger.commit();
      return res;
    } catch (err) {
      logger.commit();
      throw err;
    }
  };
};
function debugLogHeader(name) {
  return `[clerk debug start: ${name}]`;
}
function debugLogFooter(name) {
  return `[clerk debug end: ${name}] (@clerk/nextjs=${"4.31.8"},next=${package_namespaceObject.rE})`;
}
function truncate(str, maxLength) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  const encodedString = encoder.encode(str);
  const truncatedString = encodedString.slice(0, maxLength);
  return decoder.decode(truncatedString).replace(/\uFFFD/g, "");
}

//# sourceMappingURL=debugLogger.js.map

/***/ }),

/***/ 22580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Y_: () => (/* binding */ apiEndpointUnauthorizedNextResponse),
  Bj: () => (/* binding */ decorateRequest),
  NE: () => (/* binding */ getAuthKeyFromRequest),
  _b: () => (/* binding */ getHeader),
  Xk: () => (/* binding */ handleMultiDomainAndProxy),
  K_: () => (/* binding */ injectSSRStateIntoObject),
  bD: () => (/* binding */ isCrossOrigin),
  f9: () => (/* binding */ isDevelopmentFromApiKey),
  Wx: () => (/* binding */ setCustomAttributeOnRequest),
  li: () => (/* binding */ setRequestHeadersOnNextResponse)
});

// UNUSED EXPORTS: getAuthStatusFromRequest, getCookie, getCustomAttributeFromRequest, nextJsVersionCanOverrideRequestHeaders

// EXTERNAL MODULE: ./node_modules/@clerk/backend/dist/esm/index.js + 10 modules
var esm = __webpack_require__(10773);
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
var chunk_NDCDZYN6 = __webpack_require__(51691);
;// ./node_modules/@clerk/shared/dist/handleValueOrFn.mjs



//# sourceMappingURL=handleValueOrFn.mjs.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/chunk-IC4FGZI3.mjs
var chunk_IC4FGZI3 = __webpack_require__(70386);
;// ./node_modules/@clerk/shared/dist/chunk-MHVPBPEZ.mjs


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
;// ./node_modules/@clerk/shared/dist/proxy.mjs




//# sourceMappingURL=proxy.mjs.map
// EXTERNAL MODULE: ./node_modules/next/dist/api/server.js
var server = __webpack_require__(32190);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/constants.js
var esm_constants = __webpack_require__(73832);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/constants.js
var server_constants = __webpack_require__(5020);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/errors.js
var errors = __webpack_require__(49270);
;// ./node_modules/@clerk/nextjs/dist/esm/server/utils.js







function setCustomAttributeOnRequest(req, key, value) {
  Object.assign(req, { [key]: value });
}
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  const val = getCustomAttributeFromRequest(req, esm/* constants */.AA.Attributes[key]) || getHeader(req, esm/* constants */.AA.Headers[key]);
  if (val) {
    return val;
  }
  if (key === "AuthStatus" || key === "AuthToken") {
    return getQueryParam(req, key) || void 0;
  }
  return void 0;
}
function getAuthStatusFromRequest(req) {
  return getCustomAttributeFromRequest(req, constants.Attributes.AuthStatus) || getHeader(req, constants.Headers.AuthStatus) || getQueryParam(req, constants.SearchParams.AuthStatus);
}
function getQueryParam(req, name) {
  if (isNextRequest(req)) {
    return req.nextUrl.searchParams.get(name);
  }
  let queryParam;
  if ("query" in req) {
    queryParam = req.query[name];
  }
  if (!queryParam) {
    const qs = (req.url || "").split("?")[1];
    queryParam = new URLSearchParams(qs).get(name);
  }
  return queryParam;
}
function getHeader(req, name) {
  var _a, _b;
  if (isNextRequest(req)) {
    return req.headers.get(name);
  }
  return req.headers[name] || req.headers[name.toLowerCase()] || ((_b = (_a = req.socket) == null ? void 0 : _a._httpMessage) == null ? void 0 : _b.getHeader(name));
}
function getCookie(req, name) {
  if (isNextRequest(req)) {
    const reqCookieOrString = req.cookies.get(name);
    if (!reqCookieOrString) {
      return void 0;
    }
    return typeof reqCookieOrString === "string" ? reqCookieOrString : reqCookieOrString.value;
  }
  return req.cookies[name];
}
function isNextRequest(val) {
  try {
    const { headers, nextUrl, cookies } = val || {};
    return typeof (headers == null ? void 0 : headers.get) === "function" && typeof (nextUrl == null ? void 0 : nextUrl.searchParams.get) === "function" && typeof (cookies == null ? void 0 : cookies.get) === "function";
  } catch (e) {
    return false;
  }
}
const OVERRIDE_HEADERS = "x-middleware-override-headers";
const MIDDLEWARE_HEADER_PREFIX = "x-middleware-request";
const setRequestHeadersOnNextResponse = (res, req, newHeaders) => {
  if (!res.headers.get(OVERRIDE_HEADERS)) {
    res.headers.set(OVERRIDE_HEADERS, [...req.headers.keys()]);
    req.headers.forEach((val, key) => {
      res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
    });
  }
  Object.entries(newHeaders).forEach(([key, val]) => {
    res.headers.set(OVERRIDE_HEADERS, `${res.headers.get(OVERRIDE_HEADERS)},${key}`);
    res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
  });
};
const nextJsVersionCanOverrideRequestHeaders = () => {
  try {
    const headerKey = "clerkTest";
    const headerKeyInRes = `${MIDDLEWARE_HEADER_PREFIX}-${headerKey}`;
    const res = server.NextResponse.next({ request: { headers: new Headers({ [headerKey]: "true" }) } });
    return res.headers.has(headerKeyInRes);
  } catch (e) {
    return false;
  }
};
const injectSSRStateIntoObject = (obj, authObject) => {
  const __clerk_ssr_state =  false ? 0 : { ...authObject };
  return { ...obj, __clerk_ssr_state };
};
function isDevelopmentFromApiKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function decorateRequest(req, res, requestState) {
  const { reason, message, status, token } = requestState;
  if (!res) {
    res = server.NextResponse.next();
  }
  if (res.headers.get(esm_constants/* constants */.A.Headers.NextRedirect)) {
    return res;
  }
  let rewriteURL;
  if (res.headers.get(esm_constants/* constants */.A.Headers.NextResume) === "1") {
    res.headers.delete(esm_constants/* constants */.A.Headers.NextResume);
    rewriteURL = new URL(req.url);
  }
  const rewriteURLHeader = res.headers.get(esm_constants/* constants */.A.Headers.NextRewrite);
  if (rewriteURLHeader) {
    const reqURL = new URL(req.url);
    rewriteURL = new URL(rewriteURLHeader);
    if (rewriteURL.origin !== reqURL.origin) {
      return res;
    }
  }
  if (rewriteURL) {
    if (nextJsVersionCanOverrideRequestHeaders()) {
      setRequestHeadersOnNextResponse(res, req, {
        [esm/* constants */.AA.Headers.AuthStatus]: status,
        [esm/* constants */.AA.Headers.AuthToken]: token || "",
        [esm/* constants */.AA.Headers.AuthMessage]: message || "",
        [esm/* constants */.AA.Headers.AuthReason]: reason || ""
      });
    } else {
      res.headers.set(esm/* constants */.AA.Headers.AuthStatus, status);
      res.headers.set(esm/* constants */.AA.Headers.AuthToken, token || "");
      res.headers.set(esm/* constants */.AA.Headers.AuthMessage, message || "");
      res.headers.set(esm/* constants */.AA.Headers.AuthReason, reason || "");
      rewriteURL.searchParams.set(esm/* constants */.AA.SearchParams.AuthStatus, status);
      rewriteURL.searchParams.set(esm/* constants */.AA.SearchParams.AuthToken, token || "");
      rewriteURL.searchParams.set(esm/* constants */.AA.Headers.AuthMessage, message || "");
      rewriteURL.searchParams.set(esm/* constants */.AA.Headers.AuthReason, reason || "");
    }
    res.headers.set(esm_constants/* constants */.A.Headers.NextRewrite, rewriteURL.href);
  }
  return res;
}
const apiEndpointUnauthorizedNextResponse = () => {
  return server.NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
};
const isCrossOrigin = (from, to) => {
  const fromUrl = new URL(from);
  const toUrl = new URL(to);
  return fromUrl.origin !== toUrl.origin;
};
const handleMultiDomainAndProxy = (req, opts) => {
  const requestURL = (0,esm/* buildRequestUrl */.v$)(req);
  const relativeOrAbsoluteProxyUrl = handleValueOrFn(opts == null ? void 0 : opts.proxyUrl, requestURL, server_constants/* PROXY_URL */.Rg);
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && !isHttpOrHttps(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, requestURL).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  const isSatellite = handleValueOrFn(opts.isSatellite, new URL(req.url), server_constants/* IS_SATELLITE */.fS);
  const domain = handleValueOrFn(opts.domain, new URL(req.url), server_constants/* DOMAIN */.V2);
  const signInUrl = (opts == null ? void 0 : opts.signInUrl) || server_constants/* SIGN_IN_URL */.qW;
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(errors/* missingDomainAndProxy */.st);
  }
  if (isSatellite && !isHttpOrHttps(signInUrl) && isDevelopmentFromApiKey(server_constants/* SECRET_KEY */.rB || server_constants/* API_KEY */.Lq)) {
    throw new Error(errors/* missingSignInUrlInDev */.Sg);
  }
  return {
    proxyUrl,
    isSatellite,
    domain,
    signInUrl
  };
};

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 31162:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNextRouterError", ({
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
}));
const _httpaccessfallback = __webpack_require__(8704);
const _redirecterror = __webpack_require__(49026);
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

/***/ 39916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97576);
/* harmony import */ var _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _client_components_navigation_react_server__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


//# sourceMappingURL=navigation.react-server.js.map

/***/ }),

/***/ 44999:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: () => (/* reexport safe */ _server_request_cookies__WEBPACK_IMPORTED_MODULE_0__.B),
/* harmony export */   cookies: () => (/* reexport safe */ _server_request_cookies__WEBPACK_IMPORTED_MODULE_0__.U),
/* harmony export */   draftMode: () => (/* reexport safe */ _server_request_draft_mode__WEBPACK_IMPORTED_MODULE_2__.r),
/* harmony export */   headers: () => (/* reexport safe */ _server_request_headers__WEBPACK_IMPORTED_MODULE_1__.b)
/* harmony export */ });
/* harmony import */ var _server_request_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99933);
/* harmony import */ var _server_request_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86280);
/* harmony import */ var _server_request_draft_mode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73913);




//# sourceMappingURL=headers.js.map

/***/ }),

/***/ 48976:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "forbidden", ({
    enumerable: true,
    get: function() {
        return forbidden;
    }
}));
const _httpaccessfallback = __webpack_require__(8704);
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

/***/ 49026:
/***/ ((module, exports, __webpack_require__) => {


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
const _redirectstatuscode = __webpack_require__(52836);
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


/***/ }),

/***/ 49270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AG: () => (/* binding */ getAuthAuthHeaderMissing),
/* harmony export */   IK: () => (/* binding */ informAboutProtectedRouteInfo),
/* harmony export */   Sg: () => (/* binding */ missingSignInUrlInDev),
/* harmony export */   de: () => (/* binding */ clockSkewDetected),
/* harmony export */   sd: () => (/* binding */ authAuthHeaderMissing),
/* harmony export */   st: () => (/* binding */ missingDomainAndProxy),
/* harmony export */   vN: () => (/* binding */ receivedRequestForIgnoredRoute),
/* harmony export */   vf: () => (/* binding */ infiniteRedirectLoopDetected)
/* harmony export */ });
const missingDomainAndProxy = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default withClerkMiddleware(req => {...}, {domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `;
const missingSignInUrlInDev = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default withClerkMiddleware(req => {...}, {signInUrl:'SOME_URL',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`;
const receivedRequestForIgnoredRoute = (url, matcher) => `Clerk: The middleware was skipped for this request URL: ${url}. For performance reasons, it's recommended to your middleware matcher to:
export const config = {
  matcher: ${matcher},
};

Alternatively, you can set your own ignoredRoutes. See https://clerk.com/docs/nextjs/middleware
(This log only appears in development mode)
`;
const getAuthAuthHeaderMissing = () => authAuthHeaderMissing("getAuth");
const authAuthHeaderMissing = (helperName = "auth") => `Clerk: ${helperName}() was called but Clerk can't detect usage of authMiddleware(). Please ensure the following:
- authMiddleware() is used in your Next.js Middleware.
- Your Middleware matcher is configured to match this route or page.
- If you are using the src directory, make sure the Middleware file is inside of it.

For more details, see https://clerk.com/docs/quickstarts/nextjs
`;
const clockSkewDetected = (verifyMessage) => `Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will continuously try to issue new tokens, as the existing ones will be treated as "expired" due to clock skew.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${verifyMessage}`;
const infiniteRedirectLoopDetected = () => `Clerk: Infinite redirect loop detected. That usually means that we were not able to determine the auth state for this request. A list of common causes and solutions follows.

Reason 1:
Your Clerk instance keys are incorrect, or you recently changed keys (Publishable Key, Secret Key).
How to resolve:
-> Make sure you're using the correct keys from the Clerk Dashboard. If you changed keys recently, make sure to clear your browser application data and cookies.

Reason 2:
A bug that may have already been fixed in the latest version of Clerk NextJS package.
How to resolve:
-> Make sure you are using the latest version of '@clerk/nextjs' and 'next'.
`;
const informAboutProtectedRouteInfo = (path, hasPublicRoutes, hasIgnoredRoutes, isApiRoute, defaultIgnoredRoutes) => {
  const infoText = isApiRoute ? `INFO: Clerk: The request to ${path} is being protected (401) because there is no signed-in user, and the path is included in \`apiRoutes\`. To prevent this behavior, choose one of:` : `INFO: Clerk: The request to ${path} is being redirected because there is no signed-in user, and the path is not included in \`ignoredRoutes\` or \`publicRoutes\`. To prevent this behavior, choose one of:`;
  const apiRoutesText = isApiRoute ? `To prevent Clerk authentication from protecting (401) the api route, remove the rule matching "${path}" from the \`apiRoutes\` array passed to authMiddleware` : void 0;
  const publicRoutesText = hasPublicRoutes ? `To make the route accessible to both signed in and signed out users, add "${path}" to the \`publicRoutes\` array passed to authMiddleware` : `To make the route accessible to both signed in and signed out users, pass \`publicRoutes: ["${path}"]\` to authMiddleware`;
  const ignoredRoutes = [...defaultIgnoredRoutes, path].map((r) => `"${r}"`).join(", ");
  const ignoredRoutesText = hasIgnoredRoutes ? `To prevent Clerk authentication from running at all, add "${path}" to the \`ignoredRoutes\` array passed to authMiddleware` : `To prevent Clerk authentication from running at all, pass \`ignoredRoutes: [${ignoredRoutes}]\` to authMiddleware`;
  const afterAuthText = "Pass a custom `afterAuth` to authMiddleware, and replace Clerk's default behavior of redirecting unless a route is included in publicRoutes";
  return `${infoText}

${[apiRoutesText, publicRoutesText, ignoredRoutesText, afterAuthText].filter(Boolean).map((text, index) => `${index + 1}. ${text}`).join("\n")}

For additional information about middleware, please visit https://clerk.com/docs/nextjs/middleware
(This log only appears in development mode, or if \`debug: true\` is passed to authMiddleware)`;
};

//# sourceMappingURL=errors.js.map

/***/ }),

/***/ 51846:
/***/ ((__unused_webpack_module, exports) => {

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

/***/ 52637:
/***/ ((__unused_webpack_module, exports) => {


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

/***/ 52836:
/***/ ((module, exports) => {


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

/***/ 62765:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "notFound", ({
    enumerable: true,
    get: function() {
        return notFound;
    }
}));
const _httpaccessfallback = __webpack_require__(8704);
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

/***/ 70899:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unauthorized", ({
    enumerable: true,
    get: function() {
        return unauthorized;
    }
}));
const _httpaccessfallback = __webpack_require__(8704);
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

/***/ 71042:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "unstable_rethrow", ({
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
}));
const _dynamicrenderingutils = __webpack_require__(68388);
const _ispostpone = __webpack_require__(52637);
const _bailouttocsr = __webpack_require__(51846);
const _isnextroutererror = __webpack_require__(31162);
const _dynamicrendering = __webpack_require__(84971);
const _hooksservercontext = __webpack_require__(98479);
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

/***/ 73832:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ constants)
/* harmony export */ });
const Headers = {
  NextRewrite: "x-middleware-rewrite",
  NextResume: "x-middleware-next",
  NextRedirect: "Location"
};
const constants = {
  Headers
};

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 73913:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "r", ({
    enumerable: true,
    get: function() {
        return draftMode;
    }
}));
const _workunitasyncstorageexternal = __webpack_require__(63033);
const _workasyncstorageexternal = __webpack_require__(29294);
const _dynamicrendering = __webpack_require__(84971);
const _creatededupedbycallsiteservererrorlogger = __webpack_require__(76926);
const _staticgenerationbailout = __webpack_require__(80023);
const _hooksservercontext = __webpack_require__(98479);
function draftMode() {
    const callingExpression = 'draftMode';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore || !workUnitStore) {
        (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
    }
    switch(workUnitStore.type){
        case 'request':
            return createOrGetCachedExoticDraftMode(workUnitStore.draftMode, workStore);
        case 'cache':
        case 'unstable-cache':
            // Inside of `"use cache"` or `unstable_cache`, draft mode is available if
            // the outmost work unit store is a request store, and if draft mode is
            // enabled.
            const draftModeProvider = (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore);
            if (draftModeProvider) {
                return createOrGetCachedExoticDraftMode(draftModeProvider, workStore);
            }
        // Otherwise, we fall through to providing an empty draft mode.
        // eslint-disable-next-line no-fallthrough
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
            // Return empty draft mode
            if (false) {} else {
                return createExoticDraftMode(null);
            }
        default:
            const _exhaustiveCheck = workUnitStore;
            return _exhaustiveCheck;
    }
}
function createOrGetCachedExoticDraftMode(draftModeProvider, workStore) {
    const cachedDraftMode = CachedDraftModes.get(draftMode);
    if (cachedDraftMode) {
        return cachedDraftMode;
    }
    let promise;
    if (false) {} else {
        promise = createExoticDraftMode(draftModeProvider);
    }
    CachedDraftModes.set(draftModeProvider, promise);
    return promise;
}
const CachedDraftModes = new WeakMap();
function createExoticDraftMode(underlyingProvider) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    Object.defineProperty(promise, 'isEnabled', {
        get () {
            return instance.isEnabled;
        },
        set (newValue) {
            Object.defineProperty(promise, 'isEnabled', {
                value: newValue,
                writable: true,
                enumerable: true
            });
        },
        enumerable: true,
        configurable: true
    });
    promise.enable = instance.enable.bind(instance);
    promise.disable = instance.disable.bind(instance);
    return promise;
}
function createExoticDraftModeWithDevWarnings(underlyingProvider, route) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    Object.defineProperty(promise, 'isEnabled', {
        get () {
            const expression = '`draftMode().isEnabled`';
            syncIODev(route, expression);
            return instance.isEnabled;
        },
        set (newValue) {
            Object.defineProperty(promise, 'isEnabled', {
                value: newValue,
                writable: true,
                enumerable: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(promise, 'enable', {
        value: function get() {
            const expression = '`draftMode().enable()`';
            syncIODev(route, expression);
            return instance.enable.apply(instance, arguments);
        }
    });
    Object.defineProperty(promise, 'disable', {
        value: function get() {
            const expression = '`draftMode().disable()`';
            syncIODev(route, expression);
            return instance.disable.apply(instance, arguments);
        }
    });
    return promise;
}
class DraftMode {
    constructor(provider){
        this._provider = provider;
    }
    get isEnabled() {
        if (this._provider !== null) {
            return this._provider.isEnabled;
        }
        return false;
    }
    enable() {
        // We have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        trackDynamicDraftMode('draftMode().enable()');
        if (this._provider !== null) {
            this._provider.enable();
        }
    }
    disable() {
        trackDynamicDraftMode('draftMode().disable()');
        if (this._provider !== null) {
            this._provider.disable();
        }
    }
}
function syncIODev(route, expression) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createDraftModeAccessError);
function createDraftModeAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`draftMode()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E377",
        enumerable: false,
        configurable: true
    });
}
function trackDynamicDraftMode(expression) {
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (store) {
        // We have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                    value: "E246",
                    enumerable: false,
                    configurable: true
                });
            } else if (workUnitStore.type === 'unstable-cache') {
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                    value: "E259",
                    enumerable: false,
                    configurable: true
                });
            } else if (workUnitStore.phase === 'after') {
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                    value: "E348",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (store.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E553",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                const error = Object.defineProperty(new Error(`Route ${store.route} used ${expression} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", {
                    value: "E126",
                    enumerable: false,
                    configurable: true
                });
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(store.route, expression, error, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender
                (0, _dynamicrendering.postponeWithTracking)(store.route, expression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // legacy Prerender
                workUnitStore.revalidate = 0;
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E558",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            } else if (false) {}
        }
    }
}

//# sourceMappingURL=draft-mode.js.map

/***/ }),

/***/ 76926:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", ({
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
}));
const _react = /*#__PURE__*/ _interop_require_wildcard(__webpack_require__(61120));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Dynamic IO is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn =  false ? 0 : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache(// eslint-disable-next-line @typescript-eslint/no-unused-vars -- cache key
(key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if (false) { var _stack; } else {
            logErrorOrWarn(message);
        }
    };
}

//# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map

/***/ }),

/***/ 86280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "b", ({
    enumerable: true,
    get: function() {
        return headers;
    }
}));
const _headers = __webpack_require__(92584);
const _workasyncstorageexternal = __webpack_require__(29294);
const _workunitasyncstorageexternal = __webpack_require__(63033);
const _dynamicrendering = __webpack_require__(84971);
const _staticgenerationbailout = __webpack_require__(80023);
const _dynamicrenderingutils = __webpack_require__(68388);
const _creatededupedbycallsiteservererrorlogger = __webpack_require__(76926);
const _scheduler = __webpack_require__(44523);
const _utils = __webpack_require__(8719);
function headers() {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E367",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            const underlyingHeaders = _headers.HeadersAdapter.seal(new Headers({}));
            return makeUntrackedExoticHeaders(underlyingHeaders);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                    value: "E304",
                    enumerable: false,
                    configurable: true
                });
            } else if (workUnitStore.type === 'unstable-cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                    value: "E127",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E525",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                // We don't track dynamic access here because access will be tracked when you access
                // one of the properties of the headers object.
                return makeDynamicallyTrackedExoticHeaders(workStore.route, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                // We are prerendering with PPR. We need track dynamic access here eagerly
                // to keep continuity with how headers has worked in PPR without dynamicIO.
                // TODO consider switching the semantic to throw on property access instead
                (0, _dynamicrendering.postponeWithTracking)(workStore.route, 'headers', workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We are in a legacy static generation mode while prerendering
                // We track dynamic access here so we don't need to wrap the headers in
                // individual property access tracking.
                (0, _dynamicrendering.throwToInterruptStaticGeneration)('headers', workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using headers inside a cache context
        (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workStore, workUnitStore);
    }
    const requestStore = (0, _workunitasyncstorageexternal.getExpectedRequestStore)('headers');
    if (false) {} else {
        return makeUntrackedExoticHeaders(requestStore.headers);
    }
}
const CachedHeaders = new WeakMap();
function makeDynamicallyTrackedExoticHeaders(route, prerenderStore) {
    const cachedHeaders = CachedHeaders.get(prerenderStore);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`headers()`');
    CachedHeaders.set(prerenderStore, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${describeNameArg(arguments[0])}, ...)\``;
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${describeNameArg(arguments[0])}, ...)\``;
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`headers()[Symbol.iterator]()`';
                const error = createHeadersAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        }
    });
    return promise;
}
function makeUntrackedExoticHeaders(underlyingHeaders) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = Promise.resolve(underlyingHeaders);
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: underlyingHeaders.append.bind(underlyingHeaders)
        },
        delete: {
            value: underlyingHeaders.delete.bind(underlyingHeaders)
        },
        get: {
            value: underlyingHeaders.get.bind(underlyingHeaders)
        },
        has: {
            value: underlyingHeaders.has.bind(underlyingHeaders)
        },
        set: {
            value: underlyingHeaders.set.bind(underlyingHeaders)
        },
        getSetCookie: {
            value: underlyingHeaders.getSetCookie.bind(underlyingHeaders)
        },
        forEach: {
            value: underlyingHeaders.forEach.bind(underlyingHeaders)
        },
        keys: {
            value: underlyingHeaders.keys.bind(underlyingHeaders)
        },
        values: {
            value: underlyingHeaders.values.bind(underlyingHeaders)
        },
        entries: {
            value: underlyingHeaders.entries.bind(underlyingHeaders)
        },
        [Symbol.iterator]: {
            value: underlyingHeaders[Symbol.iterator].bind(underlyingHeaders)
        }
    });
    return promise;
}
function makeUntrackedExoticHeadersWithDevWarnings(underlyingHeaders, route) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = new Promise((resolve)=>(0, _scheduler.scheduleImmediate)(()=>resolve(underlyingHeaders)));
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${describeNameArg(arguments[0])}, ...)\``;
                syncIODev(route, expression);
                return underlyingHeaders.append.apply(underlyingHeaders, arguments);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.delete.apply(underlyingHeaders, arguments);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.get.apply(underlyingHeaders, arguments);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.has.apply(underlyingHeaders, arguments);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${describeNameArg(arguments[0])}, ...)\``;
                syncIODev(route, expression);
                return underlyingHeaders.set.apply(underlyingHeaders, arguments);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                syncIODev(route, expression);
                return underlyingHeaders.getSetCookie.apply(underlyingHeaders, arguments);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                syncIODev(route, expression);
                return underlyingHeaders.forEach.apply(underlyingHeaders, arguments);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                syncIODev(route, expression);
                return underlyingHeaders.keys.apply(underlyingHeaders, arguments);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                syncIODev(route, expression);
                return underlyingHeaders.values.apply(underlyingHeaders, arguments);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                syncIODev(route, expression);
                return underlyingHeaders.entries.apply(underlyingHeaders, arguments);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...headers()` or similar iteration';
                syncIODev(route, expression);
                return underlyingHeaders[Symbol.iterator].apply(underlyingHeaders, arguments);
            }
        }
    });
    return promise;
}
function describeNameArg(arg) {
    return typeof arg === 'string' ? `'${arg}'` : '...';
}
function syncIODev(route, expression) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createHeadersAccessError);
function createHeadersAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`headers()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E277",
        enumerable: false,
        configurable: true
    });
}

//# sourceMappingURL=headers.js.map

/***/ }),

/***/ 86897:
/***/ ((module, exports, __webpack_require__) => {


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
const _redirectstatuscode = __webpack_require__(52836);
const _redirecterror = __webpack_require__(49026);
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

/***/ 88443:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  j: () => (/* binding */ auth),
  u: () => (/* binding */ initialState)
});

// EXTERNAL MODULE: ./node_modules/@clerk/backend/dist/esm/index.js + 10 modules
var esm = __webpack_require__(10773);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/constants.js
var server_constants = __webpack_require__(5020);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/utils.js + 4 modules
var utils = __webpack_require__(22580);
;// ./node_modules/@clerk/nextjs/dist/esm/server/buildClerkProps.js



const buildClerkProps = (req, initState = {}) => {
  const authToken = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthToken");
  const authStatus = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthStatus");
  const authMessage = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthMessage");
  const authReason = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthReason");
  const options = {
    apiKey: server_constants/* API_KEY */.Lq,
    secretKey: server_constants/* SECRET_KEY */.rB,
    apiUrl: server_constants/* API_URL */.H$,
    apiVersion: server_constants/* API_VERSION */.mG,
    authStatus,
    authMessage,
    authReason
  };
  let authObject;
  if (!authStatus || authStatus !== esm/* AuthStatus */.TD.SignedIn) {
    authObject = (0,esm/* signedOutAuthObject */.wI)(options);
  } else {
    const { payload, raw } = (0,esm/* decodeJwt */.iU)(authToken);
    authObject = (0,esm/* signedInAuthObject */.Z5)(payload, { ...options, token: raw.text });
  }
  const sanitizedAuthObject = (0,esm/* makeAuthObjectSerializable */.pY)((0,esm/* sanitizeAuthObject */.LS)({ ...authObject, ...initState }));
  return (0,utils/* injectSSRStateIntoObject */.K_)({}, sanitizedAuthObject);
};

//# sourceMappingURL=buildClerkProps.js.map
// EXTERNAL MODULE: ./node_modules/@clerk/shared/dist/deprecated.mjs
var deprecated = __webpack_require__(1632);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/utils/debugLogger.js + 2 modules
var debugLogger = __webpack_require__(18492);
// EXTERNAL MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/errors.js
var errors = __webpack_require__(49270);
;// ./node_modules/@clerk/nextjs/dist/esm/server/createGetAuth.js






const createGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => (0,debugLogger/* withLogger */.V)(debugLoggerName, (logger) => {
  return (req, opts) => {
    if ((0,utils/* getHeader */._b)(req, esm/* constants */.AA.Headers.EnableDebug) === "true") {
      logger.enable();
    }
    const authToken = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthToken");
    const authStatus = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthStatus");
    const authMessage = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthMessage");
    const authReason = (0,utils/* getAuthKeyFromRequest */.NE)(req, "AuthReason");
    logger.debug("Debug", {
      authReason,
      authMessage,
      authStatus,
      authToken
    });
    if (!authStatus) {
      throw new Error(noAuthStatusMessage);
    }
    const options = {
      apiKey: (opts == null ? void 0 : opts.apiKey) || server_constants/* API_KEY */.Lq,
      authStatus,
      authMessage,
      secretKey: (opts == null ? void 0 : opts.secretKey) || server_constants/* SECRET_KEY */.rB,
      authReason,
      authToken,
      apiUrl: server_constants/* API_URL */.H$,
      apiVersion: server_constants/* API_VERSION */.mG
    };
    logger.debug("Options debug", options);
    if (authStatus !== esm/* AuthStatus */.TD.SignedIn) {
      return (0,esm/* signedOutAuthObject */.wI)(options);
    }
    const jwt = (0,esm/* decodeJwt */.iU)(authToken);
    logger.debug("JWT debug", jwt.raw.text);
    const signedIn = (0,esm/* signedInAuthObject */.Z5)(jwt.payload, {
      ...options,
      token: jwt.raw.text
    });
    if (signedIn) {
      if (signedIn.user) {
        (0,deprecated/* deprecatedObjectProperty */.W1)(signedIn, "user", "Use `clerkClient.users.getUser` instead.");
      }
      if (signedIn.organization) {
        (0,deprecated/* deprecatedObjectProperty */.W1)(
          signedIn,
          "organization",
          "Use `clerkClient.organizations.getOrganization` instead."
        );
      }
      if (signedIn.session) {
        (0,deprecated/* deprecatedObjectProperty */.W1)(signedIn, "session", "Use `clerkClient.sessions.getSession` instead.");
      }
    }
    return signedIn;
  };
});
const parseJwt = (req) => {
  var _a;
  const cookieToken = getCookie(req, constants.Cookies.Session);
  const headerToken = (_a = getHeader(req, "authorization")) == null ? void 0 : _a.replace("Bearer ", "");
  return decodeJwt(cookieToken || headerToken || "");
};
const getAuth = createGetAuth({
  debugLoggerName: "getAuth()",
  noAuthStatusMessage: (0,errors/* getAuthAuthHeaderMissing */.AG)()
});

//# sourceMappingURL=createGetAuth.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/api/server.js
var server = __webpack_require__(32190);
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/server/utils.js

const buildRequestLike = () => {
  try {
    const { headers } = __webpack_require__(44999);
    return new server.NextRequest("https://placeholder.com", { headers: headers() });
  } catch (e) {
    if (e && "message" in e && typeof e.message === "string" && e.message.toLowerCase().includes("Dynamic server usage".toLowerCase())) {
      throw e;
    }
    throw new Error(
      `Clerk: auth() and currentUser() are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e}`
    );
  }
};

//# sourceMappingURL=utils.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js




const auth = () => {
  const authObject = createGetAuth({
    debugLoggerName: "auth()",
    noAuthStatusMessage: (0,errors/* authAuthHeaderMissing */.sd)()
  })(buildRequestLike());
  const { notFound, redirect } = __webpack_require__(39916);
  authObject.protect = (params, options) => {
    const paramsOrFunction = (params == null ? void 0 : params.redirectUrl) ? void 0 : params;
    const redirectUrl = (params == null ? void 0 : params.redirectUrl) || (options == null ? void 0 : options.redirectUrl);
    const handleUnauthorized = () => {
      if (redirectUrl) {
        redirect(redirectUrl);
      }
      notFound();
    };
    if (!authObject.userId) {
      return handleUnauthorized();
    }
    if (!paramsOrFunction) {
      return { ...authObject };
    }
    if (typeof paramsOrFunction === "function") {
      if (paramsOrFunction(authObject.has)) {
        return { ...authObject };
      }
      return handleUnauthorized();
    }
    if (authObject.has(paramsOrFunction)) {
      return { ...authObject };
    }
    return handleUnauthorized();
  };
  return authObject;
};
const initialState = () => {
  return buildClerkProps(buildRequestLike());
};

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 92584:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
    HeadersAdapter: function() {
        return HeadersAdapter;
    },
    ReadonlyHeadersError: function() {
        return ReadonlyHeadersError;
    }
});
const _reflect = __webpack_require__(43763);
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return _reflect.ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return _reflect.ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return _reflect.ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return _reflect.ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return _reflect.ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return _reflect.ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}

//# sourceMappingURL=headers.js.map

/***/ }),

/***/ 94069:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
    MutableRequestCookiesAdapter: function() {
        return MutableRequestCookiesAdapter;
    },
    ReadonlyRequestCookiesError: function() {
        return ReadonlyRequestCookiesError;
    },
    RequestCookiesAdapter: function() {
        return RequestCookiesAdapter;
    },
    appendMutableCookies: function() {
        return appendMutableCookies;
    },
    areCookiesMutableInCurrentPhase: function() {
        return areCookiesMutableInCurrentPhase;
    },
    getModifiedCookieValues: function() {
        return getModifiedCookieValues;
    },
    responseCookiesToRequestCookies: function() {
        return responseCookiesToRequestCookies;
    },
    wrapWithMutableAccessCheck: function() {
        return wrapWithMutableAccessCheck;
    }
});
const _cookies = __webpack_require__(23158);
const _reflect = __webpack_require__(43763);
const _workasyncstorageexternal = __webpack_require__(29294);
const _workunitasyncstorageexternal = __webpack_require__(63033);
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new _cookies.ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new _cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function wrapWithMutableAccessCheck(responseCookies) {
    const wrappedCookies = new Proxy(responseCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable('cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable('cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(callingExpression) {
    const requestStore = (0, _workunitasyncstorageexternal.getExpectedRequestStore)(callingExpression);
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new _cookies.RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
}

//# sourceMappingURL=request-cookies.js.map

/***/ }),

/***/ 97576:
/***/ ((module, exports, __webpack_require__) => {

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
const _redirect = __webpack_require__(86897);
const _redirecterror = __webpack_require__(49026);
const _notfound = __webpack_require__(62765);
const _forbidden = __webpack_require__(48976);
const _unauthorized = __webpack_require__(70899);
const _unstablerethrow = __webpack_require__(163);
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

/***/ 99933:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "B", ({
    value: true
}));
Object.defineProperty(exports, "U", ({
    enumerable: true,
    get: function() {
        return cookies;
    }
}));
const _requestcookies = __webpack_require__(94069);
const _cookies = __webpack_require__(23158);
const _workasyncstorageexternal = __webpack_require__(29294);
const _workunitasyncstorageexternal = __webpack_require__(63033);
const _dynamicrendering = __webpack_require__(84971);
const _staticgenerationbailout = __webpack_require__(80023);
const _dynamicrenderingutils = __webpack_require__(68388);
const _creatededupedbycallsiteservererrorlogger = __webpack_require__(76926);
const _scheduler = __webpack_require__(44523);
const _utils = __webpack_require__(8719);
function cookies() {
    const callingExpression = 'cookies';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(// TODO(after): clarify that this only applies to pages?
            `Route ${workStore.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E88",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // cookies object without tracking
            const underlyingCookies = createEmptyCookies();
            return makeUntrackedExoticCookies(underlyingCookies);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                    value: "E398",
                    enumerable: false,
                    configurable: true
                });
            } else if (workUnitStore.type === 'unstable-cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                    value: "E157",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E549",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                // We don't track dynamic access here because access will be tracked when you access
                // one of the properties of the cookies object.
                return makeDynamicallyTrackedExoticCookies(workStore.route, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                // We are prerendering with PPR. We need track dynamic access here eagerly
                // to keep continuity with how cookies has worked in PPR without dynamicIO.
                (0, _dynamicrendering.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We track dynamic access here so we don't need to wrap the cookies in
                // individual property access tracking.
                (0, _dynamicrendering.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using cookies inside a cache context
        (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workStore, workUnitStore);
    }
    // cookies is being called in a dynamic context
    const requestStore = (0, _workunitasyncstorageexternal.getExpectedRequestStore)(callingExpression);
    let underlyingCookies;
    if ((0, _requestcookies.areCookiesMutableInCurrentPhase)(requestStore)) {
        // We can't conditionally return different types here based on the context.
        // To avoid confusion, we always return the readonly type here.
        underlyingCookies = requestStore.userspaceMutableCookies;
    } else {
        underlyingCookies = requestStore.cookies;
    }
    if (false) {} else {
        return makeUntrackedExoticCookies(underlyingCookies);
    }
}
function createEmptyCookies() {
    return _requestcookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
}
const CachedCookies = new WeakMap();
function makeDynamicallyTrackedExoticCookies(route, prerenderStore) {
    const cachedPromise = CachedCookies.get(prerenderStore);
    if (cachedPromise) {
        return cachedPromise;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`cookies()`');
    CachedCookies.set(prerenderStore, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: function() {
                const expression = '`cookies()[Symbol.iterator]()`';
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        size: {
            get () {
                const expression = '`cookies().size`';
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        get: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().get()`';
                } else {
                    expression = `\`cookies().get(${describeNameArg(arguments[0])})\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        getAll: {
            value: function getAll() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().getAll()`';
                } else {
                    expression = `\`cookies().getAll(${describeNameArg(arguments[0])})\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        has: {
            value: function has() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().has()`';
                } else {
                    expression = `\`cookies().has(${describeNameArg(arguments[0])})\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        set: {
            value: function set() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().set()`';
                } else {
                    const arg = arguments[0];
                    if (arg) {
                        expression = `\`cookies().set(${describeNameArg(arg)}, ...)\``;
                    } else {
                        expression = '`cookies().set(...)`';
                    }
                }
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        delete: {
            value: function() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().delete()`';
                } else if (arguments.length === 1) {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])})\``;
                } else {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])}, ...)\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        clear: {
            value: function clear() {
                const expression = '`cookies().clear()`';
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        },
        toString: {
            value: function toString() {
                const expression = '`cookies().toString()`';
                const error = createCookiesAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
        }
    });
    return promise;
}
function makeUntrackedExoticCookies(underlyingCookies) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = Promise.resolve(underlyingCookies);
    CachedCookies.set(underlyingCookies, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].bind(underlyingCookies) : // We should remove this and unify our cookies types. We could just let this continue to throw lazily
            // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            polyfilledResponseCookiesIterator.bind(underlyingCookies)
        },
        size: {
            get () {
                return underlyingCookies.size;
            }
        },
        get: {
            value: underlyingCookies.get.bind(underlyingCookies)
        },
        getAll: {
            value: underlyingCookies.getAll.bind(underlyingCookies)
        },
        has: {
            value: underlyingCookies.has.bind(underlyingCookies)
        },
        set: {
            value: underlyingCookies.set.bind(underlyingCookies)
        },
        delete: {
            value: underlyingCookies.delete.bind(underlyingCookies)
        },
        clear: {
            value: // @ts-expect-error clear is defined in RequestCookies implementation but not in the type
            typeof underlyingCookies.clear === 'function' ? underlyingCookies.clear.bind(underlyingCookies) : // We should remove this and unify our cookies types. We could just let this continue to throw lazily
            // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            polyfilledResponseCookiesClear.bind(underlyingCookies, promise)
        },
        toString: {
            value: underlyingCookies.toString.bind(underlyingCookies)
        }
    });
    return promise;
}
function makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, route) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = new Promise((resolve)=>(0, _scheduler.scheduleImmediate)(()=>resolve(underlyingCookies)));
    CachedCookies.set(underlyingCookies, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...cookies()` or similar iteration';
                syncIODev(route, expression);
                return underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].apply(underlyingCookies, arguments) : // We should remove this and unify our cookies types. We could just let this continue to throw lazily
                // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
                // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
                // has extra properties not available on RequestCookie instances.
                polyfilledResponseCookiesIterator.call(underlyingCookies);
            },
            writable: false
        },
        size: {
            get () {
                const expression = '`cookies().size`';
                syncIODev(route, expression);
                return underlyingCookies.size;
            }
        },
        get: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().get()`';
                } else {
                    expression = `\`cookies().get(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.get.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        getAll: {
            value: function getAll() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().getAll()`';
                } else {
                    expression = `\`cookies().getAll(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.getAll.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        has: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().has()`';
                } else {
                    expression = `\`cookies().has(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.has.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        set: {
            value: function set() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().set()`';
                } else {
                    const arg = arguments[0];
                    if (arg) {
                        expression = `\`cookies().set(${describeNameArg(arg)}, ...)\``;
                    } else {
                        expression = '`cookies().set(...)`';
                    }
                }
                syncIODev(route, expression);
                return underlyingCookies.set.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        delete: {
            value: function() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().delete()`';
                } else if (arguments.length === 1) {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])})\``;
                } else {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])}, ...)\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.delete.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        clear: {
            value: function clear() {
                const expression = '`cookies().clear()`';
                syncIODev(route, expression);
                // @ts-ignore clear is defined in RequestCookies implementation but not in the type
                return typeof underlyingCookies.clear === 'function' ? underlyingCookies.clear.apply(underlyingCookies, arguments) : // We should remove this and unify our cookies types. We could just let this continue to throw lazily
                // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
                // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
                // has extra properties not available on RequestCookie instances.
                polyfilledResponseCookiesClear.call(underlyingCookies, promise);
            },
            writable: false
        },
        toString: {
            value: function toString() {
                const expression = '`cookies().toString()` or implicit casting';
                syncIODev(route, expression);
                return underlyingCookies.toString.apply(underlyingCookies, arguments);
            },
            writable: false
        }
    });
    return promise;
}
function describeNameArg(arg) {
    return typeof arg === 'object' && arg !== null && typeof arg.name === 'string' ? `'${arg.name}'` : typeof arg === 'string' ? `'${arg}'` : '...';
}
function syncIODev(route, expression) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createCookiesAccessError);
function createCookiesAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`cookies()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E223",
        enumerable: false,
        configurable: true
    });
}
function polyfilledResponseCookiesIterator() {
    return this.getAll().map((c)=>[
            c.name,
            c
        ]).values();
}
function polyfilledResponseCookiesClear(returnable) {
    for (const cookie of this.getAll()){
        this.delete(cookie.name);
    }
    return returnable;
}

//# sourceMappingURL=cookies.js.map

/***/ })

};
;