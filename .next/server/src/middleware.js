(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[550],{

/***/ 7:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.q = parse;
__webpack_unused_export__ = serialize;

/**
 * Module variables.
 * @private
 */

var __toString = Object.prototype.toString

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var dec = opt.decode || decode;

  var index = 0
  while (index < str.length) {
    var eqIdx = str.indexOf('=', index)

    // no more cookie pairs
    if (eqIdx === -1) {
      break
    }

    var endIdx = str.indexOf(';', index)

    if (endIdx === -1) {
      endIdx = str.length
    } else if (endIdx < eqIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(';', eqIdx - 1) + 1
      continue
    }

    var key = str.slice(index, eqIdx).trim()

    // only assign once
    if (undefined === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim()

      // quoted values
      if (val.charCodeAt(0) === 0x22) {
        val = val.slice(1, -1)
      }

      obj[key] = tryDecode(val, dec);
    }

    index = endIdx + 1
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    var expires = opt.expires

    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + expires.toUTCString()
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.priority) {
    var priority = typeof opt.priority === 'string'
      ? opt.priority.toLowerCase()
      : opt.priority

    switch (priority) {
      case 'low':
        str += '; Priority=Low'
        break
      case 'medium':
        str += '; Priority=Medium'
        break
      case 'high':
        str += '; Priority=High'
        break
      default:
        throw new TypeError('option priority is invalid')
    }
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */

function decode (str) {
  return str.indexOf('%') !== -1
    ? decodeURIComponent(str)
    : str
}

/**
 * URL-encode value.
 *
 * @param {string} str
 * @returns {string}
 */

function encode (val) {
  return encodeURIComponent(val)
}

/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */

function isDate (val) {
  return __toString.call(val) === '[object Date]' ||
    val instanceof Date
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),

/***/ 9:
/***/ ((module) => {

"use strict";


const isObject = value => typeof value === 'object' && value !== null;
const mapObjectSkip = Symbol('skip');

// Customized for this use-case
const isObjectCustom = value =>
	isObject(value) &&
	!(value instanceof RegExp) &&
	!(value instanceof Error) &&
	!(value instanceof Date);

const mapObject = (object, mapper, options, isSeen = new WeakMap()) => {
	options = {
		deep: false,
		target: {},
		...options
	};

	if (isSeen.has(object)) {
		return isSeen.get(object);
	}

	isSeen.set(object, options.target);

	const {target} = options;
	delete options.target;

	const mapArray = array => array.map(element => isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);
	if (Array.isArray(object)) {
		return mapArray(object);
	}

	for (const [key, value] of Object.entries(object)) {
		const mapResult = mapper(key, value, object);

		if (mapResult === mapObjectSkip) {
			continue;
		}

		let [newKey, newValue, {shouldRecurse = true} = {}] = mapResult;

		// Drop `__proto__` keys.
		if (newKey === '__proto__') {
			continue;
		}

		if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
			newValue = Array.isArray(newValue) ?
				mapArray(newValue) :
				mapObject(newValue, mapper, options, isSeen);
		}

		target[newKey] = newValue;
	}

	return target;
};

module.exports = (object, mapper, options) => {
	if (!isObject(object)) {
		throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
	}

	return mapObject(object, mapper, options);
};

module.exports.mapObjectSkip = mapObjectSkip;


/***/ }),

/***/ 16:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ DynamicServerError),
/* harmony export */   h: () => (/* binding */ isDynamicServerError)
/* harmony export */ });
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
} //# sourceMappingURL=hooks-server-context.js.map


/***/ }),

/***/ 35:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.react-server.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactSharedInternals = { H: null, A: null };
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var isArrayImpl = Array.isArray,
  REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
  REACT_MEMO_TYPE = Symbol.for("react.memo"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var hasOwnProperty = Object.prototype.hasOwnProperty,
  assign = Object.assign;
function ReactElement(type, key, self, source, owner, props) {
  self = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== self ? self : null,
    props: props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(
    oldElement.type,
    newKey,
    void 0,
    void 0,
    void 0,
    oldElement.props
  );
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key
    ? escape("" + element.key)
    : index.toString(36);
}
function noop() {}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch (
        ("string" === typeof thenable.status
          ? thenable.then(noop, noop)
          : ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            )),
        thenable.status)
      ) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
            break;
          case REACT_LAZY_TYPE:
            return (
              (invokeCallback = children._init),
              mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              )
            );
        }
    }
  if (invokeCallback)
    return (
      (callback = callback(children)),
      (invokeCallback =
        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
      isArrayImpl(callback)
        ? ((escapedPrefix = ""),
          null != invokeCallback &&
            (escapedPrefix =
              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
          mapIntoArray(callback, array, escapedPrefix, "", function (c) {
            return c;
          }))
        : null != callback &&
          (isValidElement(callback) &&
            (callback = cloneAndReplaceKey(
              callback,
              escapedPrefix +
                (null == callback.key ||
                (children && children.key === callback.key)
                  ? ""
                  : ("" + callback.key).replace(
                      userProvidedKeyEscapeRegex,
                      "$&/"
                    ) + "/") +
                invokeCallback
            )),
          array.push(callback)),
      1
    );
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children))
    for (var i = 0; i < children.length; i++)
      (nameSoFar = children[i]),
        (type = nextNamePrefix + getElementKey(nameSoFar, i)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if (((i = getIteratorFn(children)), "function" === typeof i))
    for (
      children = i.call(children), i = 0;
      !(nameSoFar = children.next()).done;

    )
      (nameSoFar = nameSoFar.value),
        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array
      )
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(
      function (moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 1), (payload._result = moduleObject);
      },
      function (error) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 2), (payload._result = error);
      }
    );
    -1 === payload._status && ((payload._status = 0), (payload._result = ctor));
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
function createCacheRoot() {
  return new WeakMap();
}
function createCacheNode() {
  return { s: 0, v: void 0, o: null, p: null };
}
exports.Children = {
  map: mapChildren,
  forEach: function (children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function () {
        forEachFunc.apply(this, arguments);
      },
      forEachContext
    );
  },
  count: function (children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  },
  toArray: function (children) {
    return (
      mapChildren(children, function (child) {
        return child;
      }) || []
    );
  },
  only: function (children) {
    if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
    return children;
  }
};
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  ReactSharedInternals;
exports.cache = function (fn) {
  return function () {
    var dispatcher = ReactSharedInternals.A;
    if (!dispatcher) return fn.apply(null, arguments);
    var fnMap = dispatcher.getCacheForType(createCacheRoot);
    dispatcher = fnMap.get(fn);
    void 0 === dispatcher &&
      ((dispatcher = createCacheNode()), fnMap.set(fn, dispatcher));
    fnMap = 0;
    for (var l = arguments.length; fnMap < l; fnMap++) {
      var arg = arguments[fnMap];
      if (
        "function" === typeof arg ||
        ("object" === typeof arg && null !== arg)
      ) {
        var objectCache = dispatcher.o;
        null === objectCache && (dispatcher.o = objectCache = new WeakMap());
        dispatcher = objectCache.get(arg);
        void 0 === dispatcher &&
          ((dispatcher = createCacheNode()), objectCache.set(arg, dispatcher));
      } else
        (objectCache = dispatcher.p),
          null === objectCache && (dispatcher.p = objectCache = new Map()),
          (dispatcher = objectCache.get(arg)),
          void 0 === dispatcher &&
            ((dispatcher = createCacheNode()),
            objectCache.set(arg, dispatcher));
    }
    if (1 === dispatcher.s) return dispatcher.v;
    if (2 === dispatcher.s) throw dispatcher.v;
    try {
      var result = fn.apply(null, arguments);
      fnMap = dispatcher;
      fnMap.s = 1;
      return (fnMap.v = result);
    } catch (error) {
      throw ((result = dispatcher), (result.s = 2), (result.v = error), error);
    }
  };
};
exports.captureOwnerStack = function () {
  return null;
};
exports.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element)
    throw Error(formatProdErrorMessage(267, element));
  var props = assign({}, element.props),
    key = element.key,
    owner = void 0;
  if (null != config)
    for (propName in (void 0 !== config.ref && (owner = void 0),
    void 0 !== config.key && (key = "" + config.key),
    config))
      !hasOwnProperty.call(config, propName) ||
        "key" === propName ||
        "__self" === propName ||
        "__source" === propName ||
        ("ref" === propName && void 0 === config.ref) ||
        (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, void 0, void 0, owner, props);
};
exports.createElement = function (type, config, children) {
  var propName,
    props = {},
    key = null;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      hasOwnProperty.call(config, propName) &&
        "key" !== propName &&
        "__self" !== propName &&
        "__source" !== propName &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, void 0, void 0, null, props);
};
exports.createRef = function () {
  return { current: null };
};
exports.forwardRef = function (render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
exports.isValidElement = isValidElement;
exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
exports.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
exports.useDebugValue = function () {};
exports.useId = function () {
  return ReactSharedInternals.H.useId();
};
exports.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
exports.version = "19.2.0-canary-3fbfb9ba-20250409";


/***/ }),

/***/ 58:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   xl: () => (/* binding */ createAsyncLocalStorage)
/* harmony export */ });
/* unused harmony exports bindSnapshot, createSnapshot */
const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
        return fn;
    }
}
const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}
function bindSnapshot(fn) {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
}
function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
        return fn(...args);
    };
}

//# sourceMappingURL=async-local-storage.js.map

/***/ }),

/***/ 115:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  lW: () => (/* binding */ getDraftModeProviderForCacheScope),
  XN: () => (/* binding */ getExpectedRequestStore),
  M1: () => (/* binding */ throwForMissingRequestStore),
  FP: () => (/* reexport */ workUnitAsyncStorageInstance)
});

// UNUSED EXPORTS: getHmrRefreshHash, getPrerenderResumeDataCache, getRenderResumeDataCache

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/async-local-storage.js
var async_local_storage = __webpack_require__(58);
;// ./node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js

const workUnitAsyncStorageInstance = (0,async_local_storage/* createAsyncLocalStorage */.xl)();

//# sourceMappingURL=work-unit-async-storage-instance.js.map
;// ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC_HEADER = 'RSC';
const ACTION_HEADER = 'Next-Action';
// TODO: Instead of sending the full router state, we only need to send the
// segment path. Saves bytes. Then we could also use this field for segment
// prefetches, which also need to specify a particular segment.
const NEXT_ROUTER_STATE_TREE_HEADER = 'Next-Router-State-Tree';
const NEXT_ROUTER_PREFETCH_HEADER = 'Next-Router-Prefetch';
// This contains the path to the segment being prefetched.
// TODO: If we change Next-Router-State-Tree to be a segment path, we can use
// that instead. Then Next-Router-Prefetch and Next-Router-Segment-Prefetch can
// be merged into a single enum.
const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = 'Next-Router-Segment-Prefetch';
const NEXT_HMR_REFRESH_HEADER = 'Next-HMR-Refresh';
const app_router_headers_NEXT_HMR_REFRESH_HASH_COOKIE = '__next_hmr_refresh_hash__';
const NEXT_URL = 'Next-Url';
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
const FLIGHT_HEADERS = [
    RSC_HEADER,
    NEXT_ROUTER_STATE_TREE_HEADER,
    NEXT_ROUTER_PREFETCH_HEADER,
    NEXT_HMR_REFRESH_HEADER,
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
];
const NEXT_RSC_UNION_QUERY = '_rsc';
const NEXT_ROUTER_STALE_TIME_HEADER = 'x-nextjs-stale-time';
const NEXT_DID_POSTPONE_HEADER = 'x-nextjs-postponed';
const NEXT_REWRITTEN_PATH_HEADER = 'x-nextjs-rewritten-path';
const NEXT_REWRITTEN_QUERY_HEADER = 'x-nextjs-rewritten-query';
const NEXT_IS_PRERENDER_HEADER = 'x-nextjs-prerender'; //# sourceMappingURL=app-router-headers.js.map

;// ./node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js
// Share the instance module in the next-shared layer



function getExpectedRequestStore(callingExpression) {
    const workUnitStore = workUnitAsyncStorageInstance.getStore();
    if (!workUnitStore) {
        throwForMissingRequestStore(callingExpression);
    }
    switch(workUnitStore.type){
        case 'request':
            return workUnitStore;
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
            // This should not happen because we should have checked it already.
            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
                value: "E401",
                enumerable: false,
                configurable: true
            });
        case 'cache':
            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                value: "E37",
                enumerable: false,
                configurable: true
            });
        case 'unstable-cache':
            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                value: "E69",
                enumerable: false,
                configurable: true
            });
        default:
            const _exhaustiveCheck = workUnitStore;
            return _exhaustiveCheck;
    }
}
function throwForMissingRequestStore(callingExpression) {
    throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: false,
        configurable: true
    });
}
function getPrerenderResumeDataCache(workUnitStore) {
    if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-ppr') {
        return workUnitStore.prerenderResumeDataCache;
    }
    return null;
}
function getRenderResumeDataCache(workUnitStore) {
    if (workUnitStore.type !== 'prerender-legacy' && workUnitStore.type !== 'cache' && workUnitStore.type !== 'unstable-cache') {
        if (workUnitStore.type === 'request') {
            return workUnitStore.renderResumeDataCache;
        }
        // We return the mutable resume data cache here as an immutable version of
        // the cache as it can also be used for reading.
        return workUnitStore.prerenderResumeDataCache;
    }
    return null;
}
function getHmrRefreshHash(workStore, workUnitStore) {
    var _workUnitStore_cookies_get;
    if (!workStore.dev) {
        return undefined;
    }
    return workUnitStore.type === 'cache' || workUnitStore.type === 'prerender' ? workUnitStore.hmrRefreshHash : workUnitStore.type === 'request' ? (_workUnitStore_cookies_get = workUnitStore.cookies.get(NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : _workUnitStore_cookies_get.value : undefined;
}
/**
 * Returns a draft mode provider only if draft mode is enabled.
 */ function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
    if (workStore.isDraftMode) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
            case 'request':
                return workUnitStore.draftMode;
            default:
                return undefined;
        }
    }
    return undefined;
}

//# sourceMappingURL=work-unit-async-storage.external.js.map

/***/ }),

/***/ 128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nHandler)
});

// NAMESPACE OBJECT: ./node_modules/@clerk/backend/dist/runtime/browser/fetch.mjs
var fetch_namespaceObject = {};
__webpack_require__.r(fetch_namespaceObject);
__webpack_require__.d(fetch_namespaceObject, {
  J1: () => (RuntimeAbortController),
  q6: () => (RuntimeBlob),
  LN: () => (RuntimeFetch),
  B: () => (RuntimeFormData),
  $6: () => (RuntimeHeaders),
  Yh: () => (RuntimeRequest),
  eE: () => (RuntimeResponse)
});

// NAMESPACE OBJECT: ./src/middleware.ts
var middleware_namespaceObject = {};
__webpack_require__.r(middleware_namespaceObject);
__webpack_require__.d(middleware_namespaceObject, {
  config: () => (config),
  "default": () => (middleware)
});

;// ./node_modules/next/dist/esm/server/web/globals.js
async function getEdgeInstrumentationModule() {
    const instrumentation = '_ENTRIES' in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
    return instrumentation;
}
let instrumentationModulePromise = null;
async function registerInstrumentation() {
    // Ensure registerInstrumentation is not called in production build
    if (process.env.NEXT_PHASE === 'phase-production-build') return;
    if (!instrumentationModulePromise) {
        instrumentationModulePromise = getEdgeInstrumentationModule();
    }
    const instrumentation = await instrumentationModulePromise;
    if (instrumentation == null ? void 0 : instrumentation.register) {
        try {
            await instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
async function edgeInstrumentationOnRequestError(...args) {
    const instrumentation = await getEdgeInstrumentationModule();
    try {
        var _instrumentation_onRequestError;
        await (instrumentation == null ? void 0 : (_instrumentation_onRequestError = instrumentation.onRequestError) == null ? void 0 : _instrumentation_onRequestError.call(instrumentation, ...args));
    } catch (err) {
        // Log the soft error and continue, since the original error has already been thrown
        console.error('Error in instrumentation.onRequestError:', err);
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === 'then') {
                return {};
            }
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        },
        construct () {
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        },
        apply (_target, _this, args) {
            if (typeof args[0] === 'function') {
                return args[0](proxy);
            }
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    if (false) {}
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, '__import_unsupported', {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals();

//# sourceMappingURL=globals.js.map
;// ./node_modules/next/dist/esm/server/web/error.js
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
}

//# sourceMappingURL=error.js.map
;// ./node_modules/next/dist/esm/lib/constants.js
const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
const MATCHED_PATH_HEADER = 'x-matched-path';
const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
const RSC_PREFETCH_SUFFIX = '.prefetch.rsc';
const RSC_SEGMENTS_DIR_SUFFIX = '.segments';
const RSC_SEGMENT_SUFFIX = '.segment.rsc';
const RSC_SUFFIX = '.rsc';
const ACTION_SUFFIX = '.action';
const NEXT_DATA_SUFFIX = '.json';
const NEXT_META_SUFFIX = '.meta';
const NEXT_BODY_SUFFIX = '.body';
const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
const NEXT_RESUME_HEADER = 'next-resume';
// if these change make sure we update the related
// documentation as well
const NEXT_CACHE_TAG_MAX_ITEMS = 128;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
// in seconds
const CACHE_ONE_YEAR = 31536000;
// in seconds, represents revalidate=false. I.e. never revaliate.
// We use this value since it can be represented as a V8 SMI for optimal performance.
// It can also be serialized as JSON if it ever leaks accidentally as an actual value.
const INFINITE_CACHE = 0xfffffffe;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = 'middleware';
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = 'private-next-pages';
const DOT_NEXT_ALIAS = 'private-dot-next';
const ROOT_DIR_ALIAS = 'private-next-root-dir';
const APP_DIR_ALIAS = 'private-next-app-dir';
const RSC_MOD_REF_PROXY_ALIAS = 'next/dist/build/webpack/loaders/next-flight-loader/module-proxy';
const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ('The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.'));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    'app',
    'pages',
    'components',
    'lib',
    'src'
]));
const SERVER_RUNTIME = {
    edge: 'edge',
    experimentalEdge: 'experimental-edge',
    nodejs: 'nodejs'
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: 'shared',
    /**
   * The layer for server-only runtime and picking up `react-server` export conditions.
   * Including app router RSC pages and app router custom routes and metadata routes.
   */ reactServerComponents: 'rsc',
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: 'ssr',
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: 'action-browser',
    /**
   * The Node.js bundle layer for the API routes.
   */ apiNode: 'api-node',
    /**
   * The Edge Lite bundle layer for the API routes.
   */ apiEdge: 'api-edge',
    /**
   * The layer for the middleware code.
   */ middleware: 'middleware',
    /**
   * The layer for the instrumentation hooks.
   */ instrument: 'instrument',
    /**
   * The layer for assets on the edge.
   */ edgeAsset: 'edge-asset',
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: 'app-pages-browser',
    /**
   * The browser client bundle layer for Pages directory.
   */ pagesDirBrowser: 'pages-dir-browser',
    /**
   * The Edge Lite bundle layer for Pages directory.
   */ pagesDirEdge: 'pages-dir-edge',
    /**
   * The Node.js bundle layer for Pages directory.
   */ pagesDirNode: 'pages-dir-node'
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        builtinReact: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ],
        serverOnly: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
            // pages api
            WEBPACK_LAYERS_NAMES.apiNode,
            WEBPACK_LAYERS_NAMES.apiEdge
        ],
        clientOnly: [
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        bundled: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        appPages: [
            // app router pages and layouts
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: '__next_edge_ssr_entry__',
    metadata: '__next_metadata__',
    metadataRoute: '__next_metadata_route__',
    metadataImageMeta: '__next_metadata_image_meta__'
};


//# sourceMappingURL=constants.js.map
;// ./node_modules/next/dist/esm/server/web/utils.js

/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === 'undefined') continue;
            if (typeof v === 'number') {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== '=' && ch !== ';' && ch !== ',';
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ',') {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === 'set-cookie') {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw Object.defineProperty(new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        }), "__NEXT_ERROR_CODE", {
            value: "E61",
            enumerable: false,
            configurable: true
        });
    }
}
/**
 * Normalizes `nxtP` and `nxtI` query param values to remove the prefix.
 * This function does not mutate the input key.
 */ function normalizeNextQueryParam(key) {
    const prefixes = [
        NEXT_QUERY_PARAM_PREFIX,
        NEXT_INTERCEPTION_MARKER_PREFIX
    ];
    for (const prefix of prefixes){
        if (key !== prefix && key.startsWith(prefix)) {
            return key.substring(prefix.length);
        }
    }
    return null;
}

//# sourceMappingURL=utils.js.map
;// ./node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js

const responseSymbol = Symbol('response');
const passThroughSymbol = Symbol('passThrough');
const waitUntilSymbol = Symbol('waitUntil');
class FetchEvent {
    constructor(_request, waitUntil){
        this[passThroughSymbol] = false;
        this[waitUntilSymbol] = waitUntil ? {
            kind: 'external',
            function: waitUntil
        } : {
            kind: 'internal',
            promises: []
        };
    }
    // TODO: is this dead code? NextFetchEvent never lets this get called
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    // TODO: is this dead code? passThroughSymbol is unused
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        if (this[waitUntilSymbol].kind === 'external') {
            // if we received an external waitUntil, we delegate to it
            // TODO(after): this will make us not go through `getServerError(error, 'edge-server')` in `sandbox`
            const waitUntil = this[waitUntilSymbol].function;
            return waitUntil(promise);
        } else {
            // if we didn't receive an external waitUntil, we make it work on our own
            // (and expect the caller to do something with the promises)
            this[waitUntilSymbol].promises.push(promise);
        }
    }
}
function getWaitUntilPromiseFromEvent(event) {
    return event[waitUntilSymbol].kind === 'internal' ? Promise.all(event[waitUntilSymbol].promises).then(()=>{}) : undefined;
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        var _params_context;
        super(params.request, (_params_context = params.context) == null ? void 0 : _params_context.waitUntil);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw Object.defineProperty(new PageSignatureError({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw Object.defineProperty(new PageSignatureError({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
}

//# sourceMappingURL=fetch-event.js.map
;// ./node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ function removeTrailingSlash(route) {
    return route.replace(/\/$/, '') || '/';
} //# sourceMappingURL=remove-trailing-slash.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if (pathHasPrefix(lower, '/api')) return path;
        if (pathHasPrefix(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return addPathPrefix(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js




function formatNextPathnameInfo(info) {
    let pathname = addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = removeTrailingSlash(pathname);
    }
    if (info.buildId) {
        pathname = addPathSuffix(addPathPrefix(pathname, "/_next/data/" + info.buildId), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = addPathPrefix(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? addPathSuffix(pathname, '/') : pathname : removeTrailingSlash(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

;// ./node_modules/next/dist/esm/shared/lib/get-hostname.js
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

;// ./node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js
/**
 * A cache of lowercased locales for each list of locales. This is stored as a
 * WeakMap so if the locales are garbage collected, the cache entry will be
 * removed as well.
 */ const cache = new WeakMap();
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    // If locales is undefined, return the pathname as is.
    if (!locales) return {
        pathname
    };
    // Get the cached lowercased locales or create a new cache entry.
    let lowercasedLocales = cache.get(locales);
    if (!lowercasedLocales) {
        lowercasedLocales = locales.map((locale)=>locale.toLowerCase());
        cache.set(locales, lowercasedLocales);
    }
    let detectedLocale;
    // The first segment will be empty, because it has a leading `/`. If
    // there is no further segment, there is no locale (or it's the default).
    const segments = pathname.split('/', 2);
    // If there's no second segment (ie, the pathname is just `/`), there's no
    // locale.
    if (!segments[1]) return {
        pathname
    };
    // The second segment will contain the locale part if any.
    const segment = segments[1].toLowerCase();
    // See if the segment matches one of the locales. If it doesn't, there is
    // no locale (or it's the default).
    const index = lowercasedLocales.indexOf(segment);
    if (index < 0) return {
        pathname
    };
    // Return the case-sensitive locale.
    detectedLocale = locales[index];
    // Remove the `/${locale}` part of the pathname.
    pathname = pathname.slice(detectedLocale.length + 1) || '/';
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!pathHasPrefix(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

;// ./node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js



function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && pathHasPrefix(info.pathname, basePath)) {
        info.pathname = removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? "/" + paths.slice(1).join('/') : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : normalizeLocalePath(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

;// ./node_modules/next/dist/esm/server/web/next-url.js




const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = getHostname(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : detectDomainLocale((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                value: "E597",
                enumerable: false,
                configurable: true
            });
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
}

//# sourceMappingURL=next-url.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
var spec_extension_cookies = __webpack_require__(725);
;// ./node_modules/next/dist/esm/server/web/spec-extension/request.js




const INTERNALS = Symbol('internal request');
/**
 * This class extends the [Web `Request` API](https://developer.mozilla.org/docs/Web/API/Request) with additional convenience methods.
 *
 * Read more: [Next.js Docs: `NextRequest`](https://nextjs.org/docs/app/api-reference/functions/next-request)
 */ class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        validateURL(url);
        // node Request instance requires duplex option when a body
        // is present or it errors, we don't handle this for
        // Request being passed in since it would have already
        // errored if this wasn't configured
        if (false) {}
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new NextURL(url, {
            headers: toNodeOutgoingHttpHeaders(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new spec_extension_cookies/* RequestCookies */.tm(this.headers),
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
}

//# sourceMappingURL=request.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js
var reflect = __webpack_require__(716);
;// ./node_modules/next/dist/esm/server/web/spec-extension/response.js





const response_INTERNALS = Symbol('internal response');
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw Object.defineProperty(new Error('request.headers must be an instance of Headers'), "__NEXT_ERROR_CODE", {
                value: "E119",
                enumerable: false,
                configurable: true
            });
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set('x-middleware-request-' + key, value);
            keys.push(key);
        }
        headers.set('x-middleware-override-headers', keys.join(','));
    }
}
/**
 * This class extends the [Web `Response` API](https://developer.mozilla.org/docs/Web/API/Response) with additional convenience methods.
 *
 * Read more: [Next.js Docs: `NextResponse`](https://nextjs.org/docs/app/api-reference/functions/next-response)
 */ class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        const headers = this.headers;
        const cookies = new spec_extension_cookies/* ResponseCookies */.VO(headers);
        const cookiesProxy = new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'delete':
                    case 'set':
                        {
                            return (...args)=>{
                                const result = Reflect.apply(target[prop], target, args);
                                const newHeaders = new Headers(headers);
                                if (result instanceof spec_extension_cookies/* ResponseCookies */.VO) {
                                    headers.set('x-middleware-set-cookie', result.getAll().map((cookie)=>(0,spec_extension_cookies/* stringifyCookie */.Ud)(cookie)).join(','));
                                }
                                handleMiddlewareField(init, newHeaders);
                                return result;
                            };
                        }
                    default:
                        return reflect/* ReflectAdapter */.l.get(target, prop, receiver);
                }
            }
        });
        this[response_INTERNALS] = {
            cookies: cookiesProxy,
            url: init.url ? new NextURL(init.url, {
                headers: toNodeOutgoingHttpHeaders(headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[response_INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === 'number' ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
                value: "E529",
                enumerable: false,
                configurable: true
            });
        }
        const initObj = typeof init === 'object' ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set('Location', validateURL(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-rewrite', validateURL(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-next', '1');
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
}

//# sourceMappingURL=response.js.map
;// ./node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js
/**
 * The result of parsing a URL relative to a base URL.
 */ function parseRelativeURL(url, base) {
    const baseURL = typeof base === 'string' ? new URL(base) : base;
    const relative = new URL(url, base);
    // The URL is relative if the origin is the same as the base URL.
    const isRelative = relative.origin === baseURL.origin;
    return {
        url: isRelative ? relative.toString().slice(baseURL.origin.length) : relative.toString(),
        isRelative
    };
}
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function getRelativeURL(url, base) {
    const relative = parseRelativeURL(url, base);
    return relative.url;
} //# sourceMappingURL=relativize-url.js.map

;// ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC_HEADER = 'RSC';
const ACTION_HEADER = 'Next-Action';
// TODO: Instead of sending the full router state, we only need to send the
// segment path. Saves bytes. Then we could also use this field for segment
// prefetches, which also need to specify a particular segment.
const NEXT_ROUTER_STATE_TREE_HEADER = 'Next-Router-State-Tree';
const NEXT_ROUTER_PREFETCH_HEADER = 'Next-Router-Prefetch';
// This contains the path to the segment being prefetched.
// TODO: If we change Next-Router-State-Tree to be a segment path, we can use
// that instead. Then Next-Router-Prefetch and Next-Router-Segment-Prefetch can
// be merged into a single enum.
const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = 'Next-Router-Segment-Prefetch';
const NEXT_HMR_REFRESH_HEADER = 'Next-HMR-Refresh';
const NEXT_HMR_REFRESH_HASH_COOKIE = '__next_hmr_refresh_hash__';
const NEXT_URL = 'Next-Url';
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
const FLIGHT_HEADERS = [
    RSC_HEADER,
    NEXT_ROUTER_STATE_TREE_HEADER,
    NEXT_ROUTER_PREFETCH_HEADER,
    NEXT_HMR_REFRESH_HEADER,
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
];
const NEXT_RSC_UNION_QUERY = '_rsc';
const NEXT_ROUTER_STALE_TIME_HEADER = 'x-nextjs-stale-time';
const NEXT_DID_POSTPONE_HEADER = 'x-nextjs-postponed';
const NEXT_REWRITTEN_PATH_HEADER = 'x-nextjs-rewritten-path';
const NEXT_REWRITTEN_QUERY_HEADER = 'x-nextjs-rewritten-query';
const NEXT_IS_PRERENDER_HEADER = 'x-nextjs-prerender'; //# sourceMappingURL=app-router-headers.js.map

;// ./node_modules/next/dist/esm/server/internal-utils.js

const INTERNAL_QUERY_NAMES = [
    NEXT_RSC_UNION_QUERY
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url) {
    const isStringUrl = typeof url === 'string';
    const instance = isStringUrl ? new URL(url) : url;
    instance.searchParams.delete(NEXT_RSC_UNION_QUERY);
    return isStringUrl ? instance.toString() : instance;
}

//# sourceMappingURL=internal-utils.js.map
;// ./node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js
/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : "/" + path;
} //# sourceMappingURL=ensure-leading-slash.js.map

;// ./node_modules/next/dist/esm/shared/lib/segment.js
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

;// ./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return ensureLeadingSlash(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (isGroupSegment(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === '@') {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ''));
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js
var adapters_headers = __webpack_require__(381);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js
var request_cookies = __webpack_require__(818);
;// ./node_modules/next/dist/esm/server/lib/trace/constants.js
/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */ var BaseServerSpan = /*#__PURE__*/ function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
    return BaseServerSpan;
}(BaseServerSpan || {});
var LoadComponentsSpan = /*#__PURE__*/ function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
    return LoadComponentsSpan;
}(LoadComponentsSpan || {});
var NextServerSpan = /*#__PURE__*/ function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
    return NextServerSpan;
}(NextServerSpan || {});
var NextNodeServerSpan = /*#__PURE__*/ function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
    return NextNodeServerSpan;
}(NextNodeServerSpan || {});
var StartServerSpan = /*#__PURE__*/ function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
    return StartServerSpan;
}(StartServerSpan || {});
var RenderSpan = /*#__PURE__*/ function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
    return RenderSpan;
}(RenderSpan || {});
var AppRenderSpan = /*#__PURE__*/ function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
    return AppRenderSpan;
}(AppRenderSpan || {});
var RouterSpan = /*#__PURE__*/ function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
    return RouterSpan;
}(RouterSpan || {});
var constants_NodeSpan = /*#__PURE__*/ function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
    return NodeSpan;
}(constants_NodeSpan || {});
var AppRouteRouteHandlersSpan = /*#__PURE__*/ function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
    return AppRouteRouteHandlersSpan;
}(AppRouteRouteHandlersSpan || {});
var ResolveMetadataSpan = /*#__PURE__*/ function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
    return ResolveMetadataSpan;
}(ResolveMetadataSpan || {});
var MiddlewareSpan = /*#__PURE__*/ function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
    return MiddlewareSpan;
}(MiddlewareSpan || {});
// This list is used to filter out spans that are not relevant to the user
const NextVanillaSpanAllowlist = [
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
];
// These Spans are allowed to be always logged
// when the otel log prefix env is set
const LogSpanAllowList = [
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
];


//# sourceMappingURL=constants.js.map
;// ./node_modules/next/dist/esm/shared/lib/is-thenable.js
/**
 * Check to see if a value is Thenable.
 *
 * @param promise the maybe-thenable value
 * @returns true if the value is thenable
 */ function isThenable(promise) {
    return promise !== null && typeof promise === 'object' && 'then' in promise && typeof promise.then === 'function';
} //# sourceMappingURL=is-thenable.js.map

;// ./node_modules/next/dist/esm/server/lib/trace/tracer.js


let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if (true) {
    api = __webpack_require__(956);
} else {}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
class BubbledError extends Error {
    constructor(bubble, result){
        super(), this.bubble = bubble, this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        var _trace_getSpanContext;
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        if (!NextVanillaSpanAllowlist.includes(type) && process.env.NEXT_OTEL_VERBOSE !== '1' || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        let isRootSpan = false;
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
            isRootSpan = true;
        } else if ((_trace_getSpanContext = trace.getSpanContext(spanContext)) == null ? void 0 : _trace_getSpanContext.isRemote) {
            isRootSpan = true;
        }
        const spanId = getSpanId();
        options.attributes = {
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                const startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                const onCleanup = ()=>{
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && LogSpanAllowList.includes(type || '')) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                    if (fn.length > 1) {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    }
                    const result = fn(span);
                    if (isThenable(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!NextVanillaSpanAllowlist.includes(name) && process.env.NEXT_OTEL_VERBOSE !== '1') {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
    setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes) {
            attributes.set(key, value);
        }
    }
}
const tracer_getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})();


//# sourceMappingURL=tracer.js.map
;// ./node_modules/next/dist/esm/server/api-utils/index.js




function wrapApiHandler(page, handler) {
    return (...args)=>{
        getTracer().setRootSpanAttribute('next.route', page);
        // Call API route method
        return getTracer().trace(NodeSpan.runHandler, {
            spanName: `executing api route (pages) ${page}`
        }, ()=>handler(...args));
    };
}
/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw Object.defineProperty(new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`), "__NEXT_ERROR_CODE", {
            value: "E389",
            enumerable: false,
            configurable: true
        });
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = adapters_headers/* HeadersAdapter */.o.from(req.headers);
    const previewModeId = headers.get(PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(890);
    const previous = res.getHeader('Set-Cookie');
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === 'string' ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
}

//# sourceMappingURL=index.js.map
;// ./node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js

class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && checkIsOnDemandRevalidate(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this._isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && (cookieValue === previewProps.previewModeId || // In dev mode, the cookie can be actual hash value preview id but the preview props can still be `development-id`.
         false && 0));
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    enable() {
        if (!this._previewModeId) {
            throw Object.defineProperty(new Error('Invariant: previewProps missing previewModeId this should never happen'), "__NEXT_ERROR_CODE", {
                value: "E93",
                enumerable: false,
                configurable: true
            });
        }
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/'
        });
        this._isEnabled = true;
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: '',
            httpOnly: true,
            sameSite:  true ? 'none' : 0,
            secure: "production" !== 'development',
            path: '/',
            expires: new Date(0)
        });
        this._isEnabled = false;
    }
}

//# sourceMappingURL=draft-mode-provider.js.map
;// ./node_modules/next/dist/esm/server/async-storage/request-store.js






function getHeaders(headers) {
    const cleaned = adapters_headers/* HeadersAdapter */.o.from(headers);
    for (const header of FLIGHT_HEADERS){
        cleaned.delete(header.toLowerCase());
    }
    return adapters_headers/* HeadersAdapter */.o.seal(cleaned);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new spec_extension_cookies/* RequestCookies */.tm(adapters_headers/* HeadersAdapter */.o.from(headers));
    return request_cookies/* MutableRequestCookiesAdapter */.K8.wrap(cookies, onUpdateCookies);
}
/**
 * If middleware set cookies in this request (indicated by `x-middleware-set-cookie`),
 * then merge those into the existing cookie object, so that when `cookies()` is accessed
 * it's able to read the newly set cookies.
 */ function mergeMiddlewareCookies(req, existingCookies) {
    if ('x-middleware-set-cookie' in req.headers && typeof req.headers['x-middleware-set-cookie'] === 'string') {
        const setCookieValue = req.headers['x-middleware-set-cookie'];
        const responseHeaders = new Headers();
        for (const cookie of splitCookiesString(setCookieValue)){
            responseHeaders.append('set-cookie', cookie);
        }
        const responseCookies = new spec_extension_cookies/* ResponseCookies */.VO(responseHeaders);
        // Transfer cookies from ResponseCookies to RequestCookies
        for (const cookie of responseCookies.getAll()){
            existingCookies.set(cookie);
        }
    }
}
function createRequestStoreForRender(req, res, url, rootParams, implicitTags, onUpdateCookies, previewProps, isHmrRefresh, serverComponentsHmrCache, renderResumeDataCache) {
    return createRequestStoreImpl(// Pages start in render phase by default
    'render', req, res, url, rootParams, implicitTags, onUpdateCookies, renderResumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache);
}
function createRequestStoreForAPI(req, url, implicitTags, onUpdateCookies, previewProps) {
    return createRequestStoreImpl(// API routes start in action phase by default
    'action', req, undefined, url, {}, implicitTags, onUpdateCookies, undefined, previewProps, false, undefined);
}
function createRequestStoreImpl(phase, req, res, url, rootParams, implicitTags, onUpdateCookies, renderResumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache) {
    function defaultOnUpdateCookies(cookies) {
        if (res) {
            res.setHeader('Set-Cookie', cookies);
        }
    }
    const cache = {};
    return {
        type: 'request',
        phase,
        implicitTags,
        // Rather than just using the whole `url` here, we pull the parts we want
        // to ensure we don't use parts of the URL that we shouldn't. This also
        // lets us avoid requiring an empty string for `search` in the type.
        url: {
            pathname: url.pathname,
            search: url.search ?? ''
        },
        rootParams,
        get headers () {
            if (!cache.headers) {
                // Seal the headers object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.headers = getHeaders(req.headers);
            }
            return cache.headers;
        },
        get cookies () {
            if (!cache.cookies) {
                // if middleware is setting cookie(s), then include those in
                // the initial cached cookies so they can be read in render
                const requestCookies = new spec_extension_cookies/* RequestCookies */.tm(adapters_headers/* HeadersAdapter */.o.from(req.headers));
                mergeMiddlewareCookies(req, requestCookies);
                // Seal the cookies object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.cookies = request_cookies/* RequestCookiesAdapter */.Ck.seal(requestCookies);
            }
            return cache.cookies;
        },
        set cookies (value){
            cache.cookies = value;
        },
        get mutableCookies () {
            if (!cache.mutableCookies) {
                const mutableCookies = getMutableCookies(req.headers, onUpdateCookies || (res ? defaultOnUpdateCookies : undefined));
                mergeMiddlewareCookies(req, mutableCookies);
                cache.mutableCookies = mutableCookies;
            }
            return cache.mutableCookies;
        },
        get userspaceMutableCookies () {
            if (!cache.userspaceMutableCookies) {
                const userspaceMutableCookies = (0,request_cookies/* wrapWithMutableAccessCheck */.hm)(this.mutableCookies);
                cache.userspaceMutableCookies = userspaceMutableCookies;
            }
            return cache.userspaceMutableCookies;
        },
        get draftMode () {
            if (!cache.draftMode) {
                cache.draftMode = new DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
            }
            return cache.draftMode;
        },
        renderResumeDataCache: renderResumeDataCache ?? null,
        isHmrRefresh,
        serverComponentsHmrCache: serverComponentsHmrCache || globalThis.__serverComponentsHmrCache
    };
}
function synchronizeMutableCookies(store) {
    // TODO: does this need to update headers as well?
    store.cookies = RequestCookiesAdapter.seal(responseCookiesToRequestCookies(store.mutableCookies));
}

//# sourceMappingURL=request-store.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js + 2 modules
var work_unit_async_storage_external = __webpack_require__(115);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/p-queue/index.js
var p_queue = __webpack_require__(802);
var p_queue_default = /*#__PURE__*/__webpack_require__.n(p_queue);
;// ./node_modules/next/dist/esm/shared/lib/invariant-error.js
class invariant_error_InvariantError extends Error {
    constructor(message, options){
        super("Invariant: " + (message.endsWith('.') ? message : message + '.') + " This is a bug in Next.js.", options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/work-async-storage.external.js + 1 modules
var work_async_storage_external = __webpack_require__(535);
;// ./node_modules/next/dist/esm/server/lib/lru-cache.js
class LRUCache {
    constructor(maxSize, calculateSize){
        this.cache = new Map();
        this.sizes = new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize || (()=>1);
    }
    set(key, value) {
        if (!key || !value) return;
        const size = this.calculateSize(value);
        if (size > this.maxSize) {
            console.warn('Single item size exceeds maxSize');
            return;
        }
        if (this.cache.has(key)) {
            this.totalSize -= this.sizes.get(key) || 0;
        }
        this.cache.set(key, value);
        this.sizes.set(key, size);
        this.totalSize += size;
        this.touch(key);
    }
    has(key) {
        if (!key) return false;
        this.touch(key);
        return Boolean(this.cache.get(key));
    }
    get(key) {
        if (!key) return;
        const value = this.cache.get(key);
        if (value === undefined) {
            return undefined;
        }
        this.touch(key);
        return value;
    }
    touch(key) {
        const value = this.cache.get(key);
        if (value !== undefined) {
            this.cache.delete(key);
            this.cache.set(key, value);
            this.evictIfNecessary();
        }
    }
    evictIfNecessary() {
        while(this.totalSize > this.maxSize && this.cache.size > 0){
            this.evictLeastRecentlyUsed();
        }
    }
    evictLeastRecentlyUsed() {
        const lruKey = this.cache.keys().next().value;
        if (lruKey !== undefined) {
            const lruSize = this.sizes.get(lruKey) || 0;
            this.totalSize -= lruSize;
            this.cache.delete(lruKey);
            this.sizes.delete(lruKey);
        }
    }
    reset() {
        this.cache.clear();
        this.sizes.clear();
        this.totalSize = 0;
    }
    keys() {
        return [
            ...this.cache.keys()
        ];
    }
    remove(key) {
        if (this.cache.has(key)) {
            this.totalSize -= this.sizes.get(key) || 0;
            this.cache.delete(key);
            this.sizes.delete(key);
        }
    }
    clear() {
        this.cache.clear();
        this.sizes.clear();
        this.totalSize = 0;
    }
    get size() {
        return this.cache.size;
    }
    get currentSize() {
        return this.totalSize;
    }
}

//# sourceMappingURL=lru-cache.js.map
;// ./node_modules/next/dist/esm/server/lib/incremental-cache/tags-manifest.external.js
// We share the tags manifest between the "use cache" handlers and the previous
// file-system cache.
const tagsManifest = new Map();
const isStale = (tags, timestamp)=>{
    for (const tag of tags){
        const revalidatedAt = tagsManifest.get(tag);
        if (typeof revalidatedAt === 'number' && revalidatedAt >= timestamp) {
            return true;
        }
    }
    return false;
};

//# sourceMappingURL=tags-manifest.external.js.map
;// ./node_modules/next/dist/esm/server/lib/cache-handlers/default.js
/* provided dependency */ var Buffer = __webpack_require__(356)["Buffer"];
/**
 * This is the default "use cache" handler it defaults to an in-memory store.
 * In-memory caches are fragile and should not use stale-while-revalidate
 * semantics on the caches because it's not worth warming up an entry that's
 * likely going to get evicted before we get to use it anyway. However, we also
 * don't want to reuse a stale entry for too long so stale entries should be
 * considered expired/missing in such cache handlers.
 */ 

// LRU cache default to max 50 MB but in future track
const memoryCache = new LRUCache(50 * 1024 * 1024, (entry)=>entry.size);
const pendingSets = new Map();
const debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? console.debug.bind(console, 'DefaultCacheHandler:') : undefined;
const default_DefaultCacheHandler = {
    async get (cacheKey) {
        const pendingPromise = pendingSets.get(cacheKey);
        if (pendingPromise) {
            debug == null ? void 0 : debug('get', cacheKey, 'pending');
            await pendingPromise;
        }
        const privateEntry = memoryCache.get(cacheKey);
        if (!privateEntry) {
            debug == null ? void 0 : debug('get', cacheKey, 'not found');
            return undefined;
        }
        const entry = privateEntry.entry;
        if (performance.timeOrigin + performance.now() > entry.timestamp + entry.revalidate * 1000) {
            // In-memory caches should expire after revalidate time because it is
            // unlikely that a new entry will be able to be used before it is dropped
            // from the cache.
            debug == null ? void 0 : debug('get', cacheKey, 'expired');
            return undefined;
        }
        if (isStale(entry.tags, entry.timestamp)) {
            debug == null ? void 0 : debug('get', cacheKey, 'had stale tag');
            return undefined;
        }
        const [returnStream, newSaved] = entry.value.tee();
        entry.value = newSaved;
        debug == null ? void 0 : debug('get', cacheKey, 'found', {
            tags: entry.tags,
            timestamp: entry.timestamp,
            revalidate: entry.revalidate,
            expire: entry.expire
        });
        return {
            ...entry,
            value: returnStream
        };
    },
    async set (cacheKey, pendingEntry) {
        debug == null ? void 0 : debug('set', cacheKey, 'start');
        let resolvePending = ()=>{};
        const pendingPromise = new Promise((resolve)=>{
            resolvePending = resolve;
        });
        pendingSets.set(cacheKey, pendingPromise);
        const entry = await pendingEntry;
        let size = 0;
        try {
            const [value, clonedValue] = entry.value.tee();
            entry.value = value;
            const reader = clonedValue.getReader();
            for(let chunk; !(chunk = await reader.read()).done;){
                size += Buffer.from(chunk.value).byteLength;
            }
            memoryCache.set(cacheKey, {
                entry,
                isErrored: false,
                errorRetryCount: 0,
                size
            });
            debug == null ? void 0 : debug('set', cacheKey, 'done');
        } catch (err) {
            // TODO: store partial buffer with error after we retry 3 times
            debug == null ? void 0 : debug('set', cacheKey, 'failed', err);
        } finally{
            resolvePending();
            pendingSets.delete(cacheKey);
        }
    },
    async refreshTags () {
    // Nothing to do for an in-memory cache handler.
    },
    async getExpiration (...tags) {
        const expiration = Math.max(...tags.map((tag)=>tagsManifest.get(tag) ?? 0));
        debug == null ? void 0 : debug('getExpiration', {
            tags,
            expiration
        });
        return expiration;
    },
    async expireTags (...tags) {
        const timestamp = Math.round(performance.timeOrigin + performance.now());
        debug == null ? void 0 : debug('expireTags', {
            tags,
            timestamp
        });
        for (const tag of tags){
            // TODO: update file-system-cache?
            tagsManifest.set(tag, timestamp);
        }
    }
};
/* harmony default export */ const cache_handlers_default = ((/* unused pure expression or super */ null && (default_DefaultCacheHandler)));

//# sourceMappingURL=default.js.map
;// ./node_modules/next/dist/esm/server/use-cache/handlers.js

const handlers_debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? (message, ...args)=>{
    console.log(`use-cache: ${message}`, ...args);
} : undefined;
const handlersSymbol = Symbol.for('@next/cache-handlers');
const handlersMapSymbol = Symbol.for('@next/cache-handlers-map');
const handlersSetSymbol = Symbol.for('@next/cache-handlers-set');
/**
 * The reference to the cache handlers. We store the cache handlers on the
 * global object so that we can access the same instance across different
 * boundaries (such as different copies of the same module).
 */ const reference = globalThis;
/**
 * Initialize the cache handlers.
 * @returns `true` if the cache handlers were initialized, `false` if they were already initialized.
 */ function initializeCacheHandlers() {
    // If the cache handlers have already been initialized, don't do it again.
    if (reference[handlersMapSymbol]) {
        handlers_debug == null ? void 0 : handlers_debug('cache handlers already initialized');
        return false;
    }
    handlers_debug == null ? void 0 : handlers_debug('initializing cache handlers');
    reference[handlersMapSymbol] = new Map();
    // Initialize the cache from the symbol contents first.
    if (reference[handlersSymbol]) {
        let fallback;
        if (reference[handlersSymbol].DefaultCache) {
            handlers_debug == null ? void 0 : handlers_debug('setting "default" cache handler from symbol');
            fallback = reference[handlersSymbol].DefaultCache;
        } else {
            handlers_debug == null ? void 0 : handlers_debug('setting "default" cache handler from default');
            fallback = DefaultCacheHandler;
        }
        reference[handlersMapSymbol].set('default', fallback);
        if (reference[handlersSymbol].RemoteCache) {
            handlers_debug == null ? void 0 : handlers_debug('setting "remote" cache handler from symbol');
            reference[handlersMapSymbol].set('remote', reference[handlersSymbol].RemoteCache);
        } else {
            handlers_debug == null ? void 0 : handlers_debug('setting "remote" cache handler from default');
            reference[handlersMapSymbol].set('remote', fallback);
        }
    } else {
        handlers_debug == null ? void 0 : handlers_debug('setting "default" cache handler from default');
        reference[handlersMapSymbol].set('default', DefaultCacheHandler);
        handlers_debug == null ? void 0 : handlers_debug('setting "remote" cache handler from default');
        reference[handlersMapSymbol].set('remote', DefaultCacheHandler);
    }
    // Create a set of the cache handlers.
    reference[handlersSetSymbol] = new Set(reference[handlersMapSymbol].values());
    return true;
}
/**
 * Get a cache handler by kind.
 * @param kind - The kind of cache handler to get.
 * @returns The cache handler, or `undefined` if it does not exist.
 * @throws If the cache handlers are not initialized.
 */ function getCacheHandler(kind) {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    return reference[handlersMapSymbol].get(kind);
}
/**
 * Get a set iterator over the cache handlers.
 * @returns An iterator over the cache handlers, or `undefined` if they are not
 * initialized.
 */ function getCacheHandlers() {
    if (!reference[handlersSetSymbol]) {
        return undefined;
    }
    return reference[handlersSetSymbol].values();
}
/**
 * Get a map iterator over the cache handlers (keyed by kind).
 * @returns An iterator over the cache handler entries, or `undefined` if they
 * are not initialized.
 * @throws If the cache handlers are not initialized.
 */ function getCacheHandlerEntries() {
    if (!reference[handlersMapSymbol]) {
        return undefined;
    }
    return reference[handlersMapSymbol].entries();
}
/**
 * Set a cache handler by kind.
 * @param kind - The kind of cache handler to set.
 * @param cacheHandler - The cache handler to set.
 */ function setCacheHandler(kind, cacheHandler) {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol] || !reference[handlersSetSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    handlers_debug == null ? void 0 : handlers_debug('setting cache handler for "%s"', kind);
    reference[handlersMapSymbol].set(kind, cacheHandler);
    reference[handlersSetSymbol].add(cacheHandler);
}

//# sourceMappingURL=handlers.js.map
;// ./node_modules/next/dist/esm/server/revalidation-utils.js

/** Run a callback, and execute any *new* revalidations added during its runtime. */ async function withExecuteRevalidates(store, callback) {
    if (!store) {
        return callback();
    }
    // If we executed any revalidates during the request, then we don't want to execute them again.
    // save the state so we can check if anything changed after we're done running callbacks.
    const savedRevalidationState = cloneRevalidationState(store);
    try {
        return await callback();
    } finally{
        // Check if we have any new revalidates, and if so, wait until they are all resolved.
        const newRevalidates = diffRevalidationState(savedRevalidationState, cloneRevalidationState(store));
        await executeRevalidates(store, newRevalidates);
    }
}
function cloneRevalidationState(store) {
    return {
        pendingRevalidatedTags: store.pendingRevalidatedTags ? [
            ...store.pendingRevalidatedTags
        ] : [],
        pendingRevalidates: {
            ...store.pendingRevalidates
        },
        pendingRevalidateWrites: store.pendingRevalidateWrites ? [
            ...store.pendingRevalidateWrites
        ] : []
    };
}
function diffRevalidationState(prev, curr) {
    const prevTags = new Set(prev.pendingRevalidatedTags);
    const prevRevalidateWrites = new Set(prev.pendingRevalidateWrites);
    return {
        pendingRevalidatedTags: curr.pendingRevalidatedTags.filter((tag)=>!prevTags.has(tag)),
        pendingRevalidates: Object.fromEntries(Object.entries(curr.pendingRevalidates).filter(([key])=>!(key in prev.pendingRevalidates))),
        pendingRevalidateWrites: curr.pendingRevalidateWrites.filter((promise)=>!prevRevalidateWrites.has(promise))
    };
}
async function revalidateTags(tags, incrementalCache) {
    if (tags.length === 0) {
        return;
    }
    const promises = [];
    if (incrementalCache) {
        promises.push(incrementalCache.revalidateTag(tags));
    }
    const handlers = getCacheHandlers();
    if (handlers) {
        for (const handler of handlers){
            promises.push(handler.expireTags(...tags));
        }
    }
    await Promise.all(promises);
}
async function executeRevalidates(workStore, state) {
    const pendingRevalidatedTags = (state == null ? void 0 : state.pendingRevalidatedTags) ?? workStore.pendingRevalidatedTags ?? [];
    const pendingRevalidates = (state == null ? void 0 : state.pendingRevalidates) ?? workStore.pendingRevalidates ?? {};
    const pendingRevalidateWrites = (state == null ? void 0 : state.pendingRevalidateWrites) ?? workStore.pendingRevalidateWrites ?? [];
    return Promise.all([
        revalidateTags(pendingRevalidatedTags, workStore.incrementalCache),
        ...Object.values(pendingRevalidates),
        ...pendingRevalidateWrites
    ]);
}

//# sourceMappingURL=revalidation-utils.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/async-local-storage.js
var async_local_storage = __webpack_require__(620);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js + 1 modules
var after_task_async_storage_external = __webpack_require__(427);
;// ./node_modules/next/dist/esm/server/after/after-context.js








class AfterContext {
    constructor({ waitUntil, onClose, onTaskError }){
        this.workUnitStores = new Set();
        this.waitUntil = waitUntil;
        this.onClose = onClose;
        this.onTaskError = onTaskError;
        this.callbackQueue = new (p_queue_default())();
        this.callbackQueue.pause();
    }
    after(task) {
        if (isThenable(task)) {
            if (!this.waitUntil) {
                errorWaitUntilNotAvailable();
            }
            this.waitUntil(task.catch((error)=>this.reportTaskError('promise', error)));
        } else if (typeof task === 'function') {
            // TODO(after): implement tracing
            this.addCallback(task);
        } else {
            throw Object.defineProperty(new Error('`after()`: Argument must be a promise or a function'), "__NEXT_ERROR_CODE", {
                value: "E50",
                enumerable: false,
                configurable: true
            });
        }
    }
    addCallback(callback) {
        // if something is wrong, throw synchronously, bubbling up to the `after` callsite.
        if (!this.waitUntil) {
            errorWaitUntilNotAvailable();
        }
        const workUnitStore = work_unit_async_storage_external/* workUnitAsyncStorage */.FP.getStore();
        if (workUnitStore) {
            this.workUnitStores.add(workUnitStore);
        }
        const afterTaskStore = after_task_async_storage_external/* afterTaskAsyncStorage */.Z.getStore();
        // This is used for checking if request APIs can be called inside `after`.
        // Note that we need to check the phase in which the *topmost* `after` was called (which should be "action"),
        // not the current phase (which might be "after" if we're in a nested after).
        // Otherwise, we might allow `after(() => headers())`, but not `after(() => after(() => headers()))`.
        const rootTaskSpawnPhase = afterTaskStore ? afterTaskStore.rootTaskSpawnPhase // nested after
         : workUnitStore == null ? void 0 : workUnitStore.phase // topmost after
        ;
        // this should only happen once.
        if (!this.runCallbacksOnClosePromise) {
            this.runCallbacksOnClosePromise = this.runCallbacksOnClose();
            this.waitUntil(this.runCallbacksOnClosePromise);
        }
        // Bind the callback to the current execution context (i.e. preserve all currently available ALS-es).
        // We do this because we want all of these to be equivalent in every regard except timing:
        //   after(() => x())
        //   after(x())
        //   await x()
        const wrappedCallback = (0,async_local_storage/* bindSnapshot */.cg)(async ()=>{
            try {
                await after_task_async_storage_external/* afterTaskAsyncStorage */.Z.run({
                    rootTaskSpawnPhase
                }, ()=>callback());
            } catch (error) {
                this.reportTaskError('function', error);
            }
        });
        this.callbackQueue.add(wrappedCallback);
    }
    async runCallbacksOnClose() {
        await new Promise((resolve)=>this.onClose(resolve));
        return this.runCallbacks();
    }
    async runCallbacks() {
        if (this.callbackQueue.size === 0) return;
        for (const workUnitStore of this.workUnitStores){
            workUnitStore.phase = 'after';
        }
        const workStore = work_async_storage_external/* workAsyncStorage */.J.getStore();
        if (!workStore) {
            throw Object.defineProperty(new invariant_error_InvariantError('Missing workStore in AfterContext.runCallbacks'), "__NEXT_ERROR_CODE", {
                value: "E547",
                enumerable: false,
                configurable: true
            });
        }
        return withExecuteRevalidates(workStore, ()=>{
            this.callbackQueue.start();
            return this.callbackQueue.onIdle();
        });
    }
    reportTaskError(taskKind, error) {
        // TODO(after): this is fine for now, but will need better intergration with our error reporting.
        // TODO(after): should we log this if we have a onTaskError callback?
        console.error(taskKind === 'promise' ? `A promise passed to \`after()\` rejected:` : `An error occurred in a function passed to \`after()\`:`, error);
        if (this.onTaskError) {
            // this is very defensive, but we really don't want anything to blow up in an error handler
            try {
                this.onTaskError == null ? void 0 : this.onTaskError.call(this, error);
            } catch (handlerError) {
                console.error(Object.defineProperty(new invariant_error_InvariantError('`onTaskError` threw while handling an error thrown from an `after` task', {
                    cause: handlerError
                }), "__NEXT_ERROR_CODE", {
                    value: "E569",
                    enumerable: false,
                    configurable: true
                }));
            }
        }
    }
}
function errorWaitUntilNotAvailable() {
    throw Object.defineProperty(new Error('`after()` will not work correctly, because `waitUntil` is not available in the current environment.'), "__NEXT_ERROR_CODE", {
        value: "E91",
        enumerable: false,
        configurable: true
    });
}

//# sourceMappingURL=after-context.js.map
;// ./node_modules/next/dist/esm/server/lib/lazy-result.js
/**
 * Calls the given async function only when the returned promise-like object is
 * awaited. Afterwards, it provides the resolved value synchronously as `value`
 * property.
 */ function createLazyResult(fn) {
    let pendingResult;
    const result = {
        then (onfulfilled, onrejected) {
            if (!pendingResult) {
                pendingResult = fn();
            }
            pendingResult.then((value)=>{
                result.value = value;
            }).catch(()=>{
            // The externally awaited result will be rejected via `onrejected`. We
            // don't need to handle it here. But we do want to avoid an unhandled
            // rejection.
            });
            return pendingResult.then(onfulfilled, onrejected);
        }
    };
    return result;
}
function isResolvedLazyResult(result) {
    return result.hasOwnProperty('value');
}

//# sourceMappingURL=lazy-result.js.map
;// ./node_modules/next/dist/esm/server/async-storage/work-store.js




function createWorkStore({ page, fallbackRouteParams, renderOpts, requestEndedState, isPrefetchRequest, buildId, previouslyRevalidatedTags }) {
    /**
   * Rules of Static & Dynamic HTML:
   *
   *    1.) We must generate static HTML unless the caller explicitly opts
   *        in to dynamic HTML support.
   *
   *    2.) If dynamic HTML support is requested, we must honor that request
   *        or throw an error. It is the sole responsibility of the caller to
   *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
   *
   *    3.) If the request is in draft mode, we must generate dynamic HTML.
   *
   *    4.) If the request is a server action, we must generate dynamic HTML.
   *
   * These rules help ensure that other existing features like request caching,
   * coalescing, and ISR continue working as intended.
   */ const isStaticGeneration = !renderOpts.shouldWaitOnAllReady && !renderOpts.supportsDynamicResponse && !renderOpts.isDraftMode && !renderOpts.isPossibleServerAction;
    const store = {
        isStaticGeneration,
        page,
        fallbackRouteParams,
        route: normalizeAppPath(page),
        incrementalCache: // we fallback to a global incremental cache for edge-runtime locally
        // so that it can access the fs cache without mocks
        renderOpts.incrementalCache || globalThis.__incrementalCache,
        cacheLifeProfiles: renderOpts.cacheLifeProfiles,
        isRevalidate: renderOpts.isRevalidate,
        isPrerendering: renderOpts.nextExport,
        fetchCache: renderOpts.fetchCache,
        isOnDemandRevalidate: renderOpts.isOnDemandRevalidate,
        isDraftMode: renderOpts.isDraftMode,
        requestEndedState,
        isPrefetchRequest,
        buildId,
        reactLoadableManifest: (renderOpts == null ? void 0 : renderOpts.reactLoadableManifest) || {},
        assetPrefix: (renderOpts == null ? void 0 : renderOpts.assetPrefix) || '',
        afterContext: createAfterContext(renderOpts),
        dynamicIOEnabled: renderOpts.experimental.dynamicIO,
        dev: renderOpts.dev ?? false,
        previouslyRevalidatedTags,
        refreshTagsByCacheKind: createRefreshTagsByCacheKind()
    };
    // TODO: remove this when we resolve accessing the store outside the execution context
    renderOpts.store = store;
    return store;
}
function createAfterContext(renderOpts) {
    const { waitUntil, onClose, onAfterTaskError } = renderOpts;
    return new AfterContext({
        waitUntil,
        onClose,
        onTaskError: onAfterTaskError
    });
}
/**
 * Creates a map with lazy results that refresh tags for the respective cache
 * kind when they're awaited for the first time.
 */ function createRefreshTagsByCacheKind() {
    const refreshTagsByCacheKind = new Map();
    const cacheHandlers = getCacheHandlerEntries();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('refreshTags' in cacheHandler) {
                refreshTagsByCacheKind.set(kind, createLazyResult(async ()=>cacheHandler.refreshTags()));
            }
        }
    }
    return refreshTagsByCacheKind;
}

//# sourceMappingURL=work-store.js.map
;// ./node_modules/next/dist/esm/server/web/web-on-close.js
/** Monitor when the consumer finishes reading the response body.
that's as close as we can get to `res.on('close')` using web APIs.
*/ function trackBodyConsumed(body, onEnd) {
    if (typeof body === 'string') {
        const generator = async function* generate() {
            const encoder = new TextEncoder();
            yield encoder.encode(body);
            onEnd();
        };
        // @ts-expect-error BodyInit typings doesn't seem to include AsyncIterables even though it's supported in practice
        return generator();
    } else {
        return trackStreamConsumed(body, onEnd);
    }
}
function trackStreamConsumed(stream, onEnd) {
    // NOTE: This function must handle `stream` being aborted or cancelled,
    // so it can't just be this:
    //
    //   return stream.pipeThrough(new TransformStream({ flush() { onEnd() } }))
    //
    // because that doesn't handle cancellations.
    // (and cancellation handling via `Transformer.cancel` is only available in node >20)
    const dest = new TransformStream();
    const runOnEnd = ()=>onEnd();
    stream.pipeTo(dest.writable).then(runOnEnd, runOnEnd);
    return dest.readable;
}
class CloseController {
    onClose(callback) {
        if (this.isClosed) {
            throw Object.defineProperty(new Error('Cannot subscribe to a closed CloseController'), "__NEXT_ERROR_CODE", {
                value: "E365",
                enumerable: false,
                configurable: true
            });
        }
        this.target.addEventListener('close', callback);
        this.listeners++;
    }
    dispatchClose() {
        if (this.isClosed) {
            throw Object.defineProperty(new Error('Cannot close a CloseController multiple times'), "__NEXT_ERROR_CODE", {
                value: "E229",
                enumerable: false,
                configurable: true
            });
        }
        if (this.listeners > 0) {
            this.target.dispatchEvent(new Event('close'));
        }
        this.isClosed = true;
    }
    constructor(){
        this.target = new EventTarget();
        this.listeners = 0;
        this.isClosed = false;
    }
}

//# sourceMappingURL=web-on-close.js.map
;// ./node_modules/next/dist/esm/server/web/get-edge-preview-props.js
/**
 * In edge runtime, these props directly accessed from environment variables.
 *   - local: env vars will be injected through edge-runtime as runtime env vars
 *   - deployment: env vars will be replaced by edge build pipeline
 */ function getEdgePreviewProps() {
    return {
        previewModeId:  true ? process.env.__NEXT_PREVIEW_MODE_ID : 0,
        previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || '',
        previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || ''
    };
}

//# sourceMappingURL=get-edge-preview-props.js.map
;// ./node_modules/next/dist/esm/server/after/builtin-request-context.js

function getBuiltinRequestContext() {
    const _globalThis = globalThis;
    const ctx = _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL];
    return ctx == null ? void 0 : ctx.get();
}
const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for('@next/request-context');
/** "@next/request-context" has a different signature from AsyncLocalStorage,
 * matching [AsyncContext.Variable](https://github.com/tc39/proposal-async-context).
 * We don't need a full AsyncContext adapter here, just having `.get()` is enough
 */ function createLocalRequestContext() {
    const storage = createAsyncLocalStorage();
    return {
        get: ()=>storage.getStore(),
        run: (value, callback)=>storage.run(value, callback)
    };
}

//# sourceMappingURL=builtin-request-context.js.map
;// ./node_modules/next/dist/esm/server/lib/implicit-tags.js



const getDerivedTags = (pathname)=>{
    const derivedTags = [
        `/layout`
    ];
    // we automatically add the current path segments as tags
    // for revalidatePath handling
    if (pathname.startsWith('/')) {
        const pathnameParts = pathname.split('/');
        for(let i = 1; i < pathnameParts.length + 1; i++){
            let curPathname = pathnameParts.slice(0, i).join('/');
            if (curPathname) {
                // all derived tags other than the page are layout tags
                if (!curPathname.endsWith('/page') && !curPathname.endsWith('/route')) {
                    curPathname = `${curPathname}${!curPathname.endsWith('/') ? '/' : ''}layout`;
                }
                derivedTags.push(curPathname);
            }
        }
    }
    return derivedTags;
};
/**
 * Creates a map with lazy results that fetch the expiration value for the given
 * tags and respective cache kind when they're awaited for the first time.
 */ function createTagsExpirationsByCacheKind(tags) {
    const expirationsByCacheKind = new Map();
    const cacheHandlers = getCacheHandlerEntries();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('getExpiration' in cacheHandler) {
                expirationsByCacheKind.set(kind, createLazyResult(async ()=>cacheHandler.getExpiration(...tags)));
            }
        }
    }
    return expirationsByCacheKind;
}
async function getImplicitTags(page, url, fallbackRouteParams) {
    const tags = [];
    const hasFallbackRouteParams = fallbackRouteParams && fallbackRouteParams.size > 0;
    // Add the derived tags from the page.
    const derivedTags = getDerivedTags(page);
    for (let tag of derivedTags){
        tag = `${NEXT_CACHE_IMPLICIT_TAG_ID}${tag}`;
        tags.push(tag);
    }
    // Add the tags from the pathname. If the route has unknown params, we don't
    // want to add the pathname as a tag, as it will be invalid.
    if (url.pathname && !hasFallbackRouteParams) {
        const tag = `${NEXT_CACHE_IMPLICIT_TAG_ID}${url.pathname}`;
        tags.push(tag);
    }
    return {
        tags,
        expirationsByCacheKind: createTagsExpirationsByCacheKind(tags)
    };
}

//# sourceMappingURL=implicit-tags.js.map
;// ./node_modules/next/dist/esm/server/web/adapter.js






















class NextRequestHint extends NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw Object.defineProperty(new PageSignatureError({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    respondWith() {
        throw Object.defineProperty(new PageSignatureError({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    waitUntil() {
        throw Object.defineProperty(new PageSignatureError({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
}
const headersGetter = {
    keys: (headers)=>Array.from(headers.keys()),
    get: (headers, key)=>headers.get(key) ?? undefined
};
let propagator = (request, fn)=>{
    const tracer = tracer_getTracer();
    return tracer.withPropagatedContext(request.headers, fn, headersGetter);
};
let testApisIntercepted = false;
function ensureTestApisIntercepted() {
    if (!testApisIntercepted) {
        testApisIntercepted = true;
        if (process.env.NEXT_PRIVATE_TEST_PROXY === 'true') {
            const { interceptTestApis, wrapRequestHandler } = __webpack_require__(905);
            interceptTestApis();
            propagator = wrapRequestHandler(propagator);
        }
    }
}
async function adapter(params) {
    var _getBuiltinRequestContext;
    ensureTestApisIntercepted();
    await ensureInstrumentationRegistered();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof globalThis.__BUILD_MANIFEST !== 'undefined';
    params.request.url = normalizeRscURL(params.request.url);
    const requestURL = new NextURL(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestURL.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestURL.searchParams.getAll(key);
        const normalizedKey = normalizeNextQueryParam(key);
        if (normalizedKey) {
            requestURL.searchParams.delete(normalizedKey);
            for (const val of value){
                requestURL.searchParams.append(normalizedKey, val);
            }
            requestURL.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestURL.buildId;
    requestURL.buildId = '';
    const requestHeaders = fromNodeOutgoingHttpHeaders(params.request.headers);
    const isNextDataRequest = requestHeaders.has('x-nextjs-data');
    const isRSCRequest = requestHeaders.get(RSC_HEADER) === '1';
    if (isNextDataRequest && requestURL.pathname === '/index') {
        requestURL.pathname = '/';
    }
    const flightHeaders = new Map();
    // Headers should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const header of FLIGHT_HEADERS){
            const key = header.toLowerCase();
            const value = requestHeaders.get(key);
            if (value !== null) {
                flightHeaders.set(key, value);
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeURL =  false ? 0 : requestURL;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: stripInternalSearchParams(normalizeURL).toString(),
        init: {
            body: params.request.body,
            headers: requestHeaders,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isNextDataRequest) {
        Object.defineProperty(request, '__isData', {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        ;
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: "production" !== 'development',
            fetchCacheKeyPrefix: "",
            dev: "production" === 'development',
            requestHeaders: params.request.headers,
            requestProtocol: 'https',
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: getEdgePreviewProps()
                };
            }
        });
    }
    // if we're in an edge runtime sandbox, we should use the waitUntil
    // that we receive from the enclosing NextServer
    const outerWaitUntil = params.request.waitUntil ?? ((_getBuiltinRequestContext = getBuiltinRequestContext()) == null ? void 0 : _getBuiltinRequestContext.waitUntil);
    const event = new NextFetchEvent({
        request,
        page: params.page,
        context: outerWaitUntil ? {
            waitUntil: outerWaitUntil
        } : undefined
    });
    let response;
    let cookiesFromResponse;
    response = await propagator(request, ()=>{
        // we only care to make async storage available for middleware
        const isMiddleware = params.page === '/middleware' || params.page === '/src/middleware';
        if (isMiddleware) {
            // if we're in an edge function, we only get a subset of `nextConfig` (no `experimental`),
            // so we have to inject it via DefinePlugin.
            // in `next start` this will be passed normally (see `NextNodeServer.runMiddleware`).
            const waitUntil = event.waitUntil.bind(event);
            const closeController = new CloseController();
            return tracer_getTracer().trace(MiddlewareSpan.execute, {
                spanName: `middleware ${request.method} ${request.nextUrl.pathname}`,
                attributes: {
                    'http.target': request.nextUrl.pathname,
                    'http.method': request.method
                }
            }, async ()=>{
                try {
                    var _params_request_nextConfig_experimental, _params_request_nextConfig, _params_request_nextConfig_experimental1, _params_request_nextConfig1;
                    const onUpdateCookies = (cookies)=>{
                        cookiesFromResponse = cookies;
                    };
                    const previewProps = getEdgePreviewProps();
                    const page = '/' // Fake Work
                    ;
                    const fallbackRouteParams = null;
                    const implicitTags = await getImplicitTags(page, request.nextUrl, fallbackRouteParams);
                    const requestStore = createRequestStoreForAPI(request, request.nextUrl, implicitTags, onUpdateCookies, previewProps);
                    const workStore = createWorkStore({
                        page,
                        fallbackRouteParams,
                        renderOpts: {
                            cacheLifeProfiles: (_params_request_nextConfig = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental = _params_request_nextConfig.experimental) == null ? void 0 : _params_request_nextConfig_experimental.cacheLife,
                            experimental: {
                                isRoutePPREnabled: false,
                                dynamicIO: false,
                                authInterrupts: !!((_params_request_nextConfig1 = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental1 = _params_request_nextConfig1.experimental) == null ? void 0 : _params_request_nextConfig_experimental1.authInterrupts)
                            },
                            supportsDynamicResponse: true,
                            waitUntil,
                            onClose: closeController.onClose.bind(closeController),
                            onAfterTaskError: undefined
                        },
                        requestEndedState: {
                            ended: false
                        },
                        isPrefetchRequest: request.headers.has(NEXT_ROUTER_PREFETCH_HEADER),
                        buildId: buildId ?? '',
                        previouslyRevalidatedTags: []
                    });
                    return await work_async_storage_external/* workAsyncStorage */.J.run(workStore, ()=>work_unit_async_storage_external/* workUnitAsyncStorage */.FP.run(requestStore, params.handler, request, event));
                } finally{
                    // middleware cannot stream, so we can consider the response closed
                    // as soon as the handler returns.
                    // we can delay running it until a bit later --
                    // if it's needed, we'll have a `waitUntil` lock anyway.
                    setTimeout(()=>{
                        closeController.dispatchClose();
                    }, 0);
                }
            });
        }
        return params.handler(request, event);
    });
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw Object.defineProperty(new TypeError('Expected an instance of Response to be returned'), "__NEXT_ERROR_CODE", {
            value: "E567",
            enumerable: false,
            configurable: true
        });
    }
    if (response && cookiesFromResponse) {
        response.headers.set('set-cookie', cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get('x-middleware-rewrite');
    if (response && rewrite && (isRSCRequest || !isEdgeRendering)) {
        const destination = new NextURL(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if ( true && !isEdgeRendering) {
            if (destination.host === request.nextUrl.host) {
                destination.buildId = buildId || destination.buildId;
                response.headers.set('x-middleware-rewrite', String(destination));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const { url: relativeDestination, isRelative } = parseRelativeURL(destination.toString(), requestURL.toString());
        if (!isEdgeRendering && isNextDataRequest && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !( false && 0)) {
            response.headers.set('x-nextjs-rewrite', relativeDestination);
        }
        // If this is an RSC request, and the pathname or search has changed, and
        // this isn't an external rewrite, we need to set the rewritten pathname and
        // query headers.
        if (isRSCRequest && isRelative) {
            if (requestURL.pathname !== destination.pathname) {
                response.headers.set(NEXT_REWRITTEN_PATH_HEADER, destination.pathname);
            }
            if (requestURL.search !== destination.search) {
                response.headers.set(NEXT_REWRITTEN_QUERY_HEADER, // remove the leading ? from the search string
                destination.search.slice(1));
            }
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get('Location');
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new NextURL(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === requestURL.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set('Location', redirectURL.toString());
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isNextDataRequest) {
            response.headers.delete('Location');
            response.headers.set('x-nextjs-redirect', getRelativeURL(redirectURL.toString(), requestURL.toString()));
        }
    }
    const finalResponse = response ? response : NextResponse.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get('x-middleware-override-headers');
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set('x-middleware-override-headers', middlewareOverrideHeaders + ',' + overwrittenHeaders.join(','));
        }
    }
    return {
        response: finalResponse,
        waitUntil: getWaitUntilPromiseFromEvent(event) ?? Promise.resolve(),
        fetchMetrics: request.fetchMetrics
    };
}

//# sourceMappingURL=adapter.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.react-server.js
var react_react_server = __webpack_require__(815);
;// ./node_modules/@clerk/nextjs/dist/esm/utils/mergeNextClerkPropsWithEnv.js
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
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react-server-dom-webpack/server.edge.js
var server_edge = __webpack_require__(936);
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/client/ClerkProvider.js

const ClientClerkProvider = (0,server_edge/* registerClientReference */.YR)(
function() { throw new Error("Attempted to call ClientClerkProvider() from the server but ClientClerkProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"D:\\the360unity-master\\the360unity-master\\node_modules\\@clerk\\nextjs\\dist\\esm\\app-router\\client\\ClerkProvider.js",
"ClientClerkProvider",
);
;// ./node_modules/@clerk/shared/dist/chunk-IC4FGZI3.mjs
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
var chunk_IC4FGZI3_deprecated = (fnName, warning, key) => {
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
      chunk_IC4FGZI3_deprecated(propName, warning, `${cls.name}:${propName}`);
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
      chunk_IC4FGZI3_deprecated(propName, warning, key);
      return value;
    },
    set(v) {
      value = v;
    }
  });
};


//# sourceMappingURL=chunk-IC4FGZI3.mjs.map
;// ./node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs
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
;// ./node_modules/@clerk/shared/dist/deprecated.mjs



//# sourceMappingURL=deprecated.mjs.map
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
;// ./node_modules/@clerk/shared/dist/url.mjs



//# sourceMappingURL=url.mjs.map
;// ./node_modules/@clerk/shared/dist/chunk-4PW5MDZA.mjs
// src/callWithRetry.ts
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
var MAX_NUMBER_OF_RETRIES = 5;
async function callWithRetry(fn, attempt = 1, maxAttempts = MAX_NUMBER_OF_RETRIES) {
  try {
    return await fn();
  } catch (e) {
    if (attempt >= maxAttempts) {
      throw e;
    }
    await wait(2 ** attempt * 100);
    return callWithRetry(fn, attempt + 1, maxAttempts);
  }
}


//# sourceMappingURL=chunk-4PW5MDZA.mjs.map
;// ./node_modules/@clerk/shared/dist/callWithRetry.mjs



//# sourceMappingURL=callWithRetry.mjs.map
;// ./node_modules/@clerk/shared/dist/chunk-TETGTEI2.mjs
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
  let frontendApi = isomorphicAtob(key.split("_")[2]);
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
  const hasValidFrontendApiPostfix = isomorphicAtob(key.split("_")[2] || "").endsWith("$");
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
;// ./node_modules/@clerk/shared/dist/keys.mjs




//# sourceMappingURL=keys.mjs.map
;// ./node_modules/@clerk/shared/dist/chunk-VN4YMSVR.mjs


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
    chunk_IC4FGZI3_deprecated("MagicLinkError", "Use `EmailLinkError` instead.");
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
  deprecated("isMagicLinkError", "Use `isEmailLinkError` instead.");
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
    chunk_IC4FGZI3_deprecated("MagicLinkErrorCode", "Use `EmailLinkErrorCode` instead.");
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
;// ./node_modules/@clerk/shared/dist/error.mjs




//# sourceMappingURL=error.mjs.map
;// ./node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs
/* harmony default export */ const browser_crypto = (crypto);

;// ./node_modules/@clerk/backend/dist/runtime/browser/fetch.mjs
/* harmony default export */ const browser_fetch = ((/* unused pure expression or super */ null && (fetch)));
const RuntimeBlob = Blob;
const RuntimeFormData = FormData;
const RuntimeHeaders = Headers;
const RuntimeRequest = Request;
const RuntimeResponse = Response;
const RuntimeAbortController = AbortController;
const RuntimeFetch = fetch;

// EXTERNAL MODULE: ./node_modules/deepmerge/dist/cjs.js
var cjs = __webpack_require__(654);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);
// EXTERNAL MODULE: ./node_modules/snakecase-keys/index.js
var snakecase_keys = __webpack_require__(412);
var snakecase_keys_default = /*#__PURE__*/__webpack_require__.n(snakecase_keys);
// EXTERNAL MODULE: ./node_modules/cookie/index.js
var cookie = __webpack_require__(7);
;// ./node_modules/@clerk/shared/dist/isomorphicAtob.mjs



//# sourceMappingURL=isomorphicAtob.mjs.map
;// ./node_modules/@clerk/backend/dist/esm/index.js
// src/index.ts


// src/api/endpoints/AbstractApi.ts
var AbstractAPI = class {
  constructor(request) {
    this.request = request;
  }
  requireId(id) {
    if (!id) {
      throw new Error("A valid resource ID is required.");
    }
  }
};

// src/util/path.ts
var SEPARATOR = "/";
var MULTIPLE_SEPARATOR_REGEX = new RegExp("(?<!:)" + SEPARATOR + "{1,}", "g");
function joinPaths(...args) {
  return args.filter((p) => p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
}

// src/api/endpoints/AllowlistIdentifierApi.ts
var basePath = "/allowlist_identifiers";
var AllowlistIdentifierAPI = class extends AbstractAPI {
  async getAllowlistIdentifierList() {
    return this.request({
      method: "GET",
      path: basePath
    });
  }
  async createAllowlistIdentifier(params) {
    return this.request({
      method: "POST",
      path: basePath,
      bodyParams: params
    });
  }
  async deleteAllowlistIdentifier(allowlistIdentifierId) {
    this.requireId(allowlistIdentifierId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath, allowlistIdentifierId)
    });
  }
};

// src/api/endpoints/ClientApi.ts
var basePath2 = "/clients";
var ClientAPI = class extends AbstractAPI {
  async getClientList() {
    return this.request({
      method: "GET",
      path: basePath2
    });
  }
  async getClient(clientId) {
    this.requireId(clientId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath2, clientId)
    });
  }
  verifyClient(token) {
    return this.request({
      method: "POST",
      path: joinPaths(basePath2, "verify"),
      bodyParams: { token }
    });
  }
};

// src/api/endpoints/DomainApi.ts
var basePath3 = "/domains";
var DomainAPI = class extends AbstractAPI {
  async deleteDomain(id) {
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath3, id)
    });
  }
};

// src/api/endpoints/EmailAddressApi.ts
var basePath4 = "/email_addresses";
var EmailAddressAPI = class extends AbstractAPI {
  async getEmailAddress(emailAddressId) {
    this.requireId(emailAddressId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath4, emailAddressId)
    });
  }
  async createEmailAddress(params) {
    return this.request({
      method: "POST",
      path: basePath4,
      bodyParams: params
    });
  }
  async updateEmailAddress(emailAddressId, params = {}) {
    this.requireId(emailAddressId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath4, emailAddressId),
      bodyParams: params
    });
  }
  async deleteEmailAddress(emailAddressId) {
    this.requireId(emailAddressId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath4, emailAddressId)
    });
  }
};

// src/api/endpoints/EmailApi.ts

var basePath5 = "/emails";
var EmailAPI = class extends AbstractAPI {
  /**
   * @deprecated This endpoint is no longer available and the function will be removed in the next major version.
   */
  async createEmail(params) {
    chunk_IC4FGZI3_deprecated(
      "EmailAPI.createEmail",
      "This endpoint is no longer available and the function will be removed in the next major version."
    );
    return this.request({
      method: "POST",
      path: basePath5,
      bodyParams: params
    });
  }
};

// src/util/shared.ts






var errorThrower = buildErrorThrower({ packageName: "@clerk/backend" });
var { isDevOrStagingUrl } = createDevOrStagingUrlCache();

// src/api/endpoints/InterstitialApi.ts
var InterstitialAPI = class extends AbstractAPI {
  async getInterstitial() {
    chunk_IC4FGZI3_deprecated(
      "getInterstitial()",
      'Switch to `Clerk(...).localInterstitial(...)` from `import { Clerk } from "@clerk/backend"`.'
    );
    return this.request({
      path: "internal/interstitial",
      method: "GET",
      headerParams: {
        "Content-Type": "text/html"
      }
    });
  }
};

// src/api/endpoints/InvitationApi.ts
var basePath6 = "/invitations";
var InvitationAPI = class extends AbstractAPI {
  async getInvitationList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath6,
      queryParams: params
    });
  }
  async createInvitation(params) {
    return this.request({
      method: "POST",
      path: basePath6,
      bodyParams: params
    });
  }
  async revokeInvitation(invitationId) {
    this.requireId(invitationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath6, invitationId, "revoke")
    });
  }
};

// src/api/endpoints/OrganizationApi.ts


// src/runtime/index.ts


var {
  /* RuntimeFetch */ "LN": esm_RuntimeFetch,
  /* RuntimeAbortController */ "J1": esm_RuntimeAbortController,
  /* RuntimeBlob */ "q6": esm_RuntimeBlob,
  /* RuntimeFormData */ "B": esm_RuntimeFormData,
  /* RuntimeHeaders */ "$6": esm_RuntimeHeaders,
  /* RuntimeRequest */ "Yh": esm_RuntimeRequest,
  /* RuntimeResponse */ "eE": esm_RuntimeResponse
} = fetch_namespaceObject;
var globalFetch = esm_RuntimeFetch.bind(globalThis);
var runtime = {
  crypto: browser_crypto,
  fetch: globalFetch,
  AbortController: esm_RuntimeAbortController,
  Blob: esm_RuntimeBlob,
  FormData: esm_RuntimeFormData,
  Headers: esm_RuntimeHeaders,
  Request: esm_RuntimeRequest,
  Response: esm_RuntimeResponse
};
var runtime_default = runtime;

// src/api/endpoints/OrganizationApi.ts
var basePath7 = "/organizations";
var OrganizationAPI = class extends AbstractAPI {
  async getOrganizationList(params) {
    return this.request({
      method: "GET",
      path: basePath7,
      queryParams: params
    });
  }
  async createOrganization(params) {
    return this.request({
      method: "POST",
      path: basePath7,
      bodyParams: params
    });
  }
  async getOrganization(params) {
    const organizationIdOrSlug = "organizationId" in params ? params.organizationId : params.slug;
    this.requireId(organizationIdOrSlug);
    return this.request({
      method: "GET",
      path: joinPaths(basePath7, organizationIdOrSlug)
    });
  }
  async updateOrganization(organizationId, params) {
    this.requireId(organizationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath7, organizationId),
      bodyParams: params
    });
  }
  async updateOrganizationLogo(organizationId, params) {
    this.requireId(organizationId);
    const formData = new runtime_default.FormData();
    formData.append("file", params?.file);
    formData.append("uploader_user_id", params?.uploaderUserId);
    return this.request({
      method: "PUT",
      path: joinPaths(basePath7, organizationId, "logo"),
      formData
    });
  }
  async deleteOrganizationLogo(organizationId) {
    this.requireId(organizationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath7, organizationId, "logo")
    });
  }
  async updateOrganizationMetadata(organizationId, params) {
    this.requireId(organizationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath7, organizationId, "metadata"),
      bodyParams: params
    });
  }
  async deleteOrganization(organizationId) {
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath7, organizationId)
    });
  }
  async getOrganizationMembershipList(params) {
    const { organizationId, limit, offset } = params;
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath7, organizationId, "memberships"),
      queryParams: { limit, offset }
    });
  }
  async createOrganizationMembership(params) {
    const { organizationId, userId, role } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath7, organizationId, "memberships"),
      bodyParams: {
        userId,
        role
      }
    });
  }
  async updateOrganizationMembership(params) {
    const { organizationId, userId, role } = params;
    this.requireId(organizationId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath7, organizationId, "memberships", userId),
      bodyParams: {
        role
      }
    });
  }
  async updateOrganizationMembershipMetadata(params) {
    const { organizationId, userId, publicMetadata, privateMetadata } = params;
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath7, organizationId, "memberships", userId, "metadata"),
      bodyParams: {
        publicMetadata,
        privateMetadata
      }
    });
  }
  async deleteOrganizationMembership(params) {
    const { organizationId, userId } = params;
    this.requireId(organizationId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath7, organizationId, "memberships", userId)
    });
  }
  async getOrganizationInvitationList(params) {
    const { organizationId, status, limit, offset } = params;
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath7, organizationId, "invitations"),
      queryParams: { status, limit, offset }
    });
  }
  /**
   * @deprecated  Use `getOrganizationInvitationList` instead along with the status parameter.
   */
  async getPendingOrganizationInvitationList(params) {
    chunk_IC4FGZI3_deprecated("getPendingOrganizationInvitationList", "Use `getOrganizationInvitationList` instead.");
    const { organizationId, limit, offset } = params;
    this.requireId(organizationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath7, organizationId, "invitations", "pending"),
      queryParams: { limit, offset }
    });
  }
  async createOrganizationInvitation(params) {
    const { organizationId, ...bodyParams } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath7, organizationId, "invitations"),
      bodyParams: { ...bodyParams }
    });
  }
  async getOrganizationInvitation(params) {
    const { organizationId, invitationId } = params;
    this.requireId(organizationId);
    this.requireId(invitationId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath7, organizationId, "invitations", invitationId)
    });
  }
  async revokeOrganizationInvitation(params) {
    const { organizationId, invitationId, requestingUserId } = params;
    this.requireId(organizationId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath7, organizationId, "invitations", invitationId, "revoke"),
      bodyParams: {
        requestingUserId
      }
    });
  }
};

// src/api/endpoints/PhoneNumberApi.ts
var basePath8 = "/phone_numbers";
var PhoneNumberAPI = class extends AbstractAPI {
  async getPhoneNumber(phoneNumberId) {
    this.requireId(phoneNumberId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath8, phoneNumberId)
    });
  }
  async createPhoneNumber(params) {
    return this.request({
      method: "POST",
      path: basePath8,
      bodyParams: params
    });
  }
  async updatePhoneNumber(phoneNumberId, params = {}) {
    this.requireId(phoneNumberId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath8, phoneNumberId),
      bodyParams: params
    });
  }
  async deletePhoneNumber(phoneNumberId) {
    this.requireId(phoneNumberId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath8, phoneNumberId)
    });
  }
};

// src/api/endpoints/RedirectUrlApi.ts
var basePath9 = "/redirect_urls";
var RedirectUrlAPI = class extends AbstractAPI {
  async getRedirectUrlList() {
    return this.request({
      method: "GET",
      path: basePath9
    });
  }
  async getRedirectUrl(redirectUrlId) {
    this.requireId(redirectUrlId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath9, redirectUrlId)
    });
  }
  async createRedirectUrl(params) {
    return this.request({
      method: "POST",
      path: basePath9,
      bodyParams: params
    });
  }
  async deleteRedirectUrl(redirectUrlId) {
    this.requireId(redirectUrlId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath9, redirectUrlId)
    });
  }
};

// src/api/endpoints/SessionApi.ts
var basePath10 = "/sessions";
var SessionAPI = class extends AbstractAPI {
  async getSessionList(queryParams) {
    return this.request({
      method: "GET",
      path: basePath10,
      queryParams
    });
  }
  async getSession(sessionId) {
    this.requireId(sessionId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath10, sessionId)
    });
  }
  async revokeSession(sessionId) {
    this.requireId(sessionId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath10, sessionId, "revoke")
    });
  }
  async verifySession(sessionId, token) {
    this.requireId(sessionId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath10, sessionId, "verify"),
      bodyParams: { token }
    });
  }
  async getToken(sessionId, template) {
    this.requireId(sessionId);
    return (await this.request({
      method: "POST",
      path: joinPaths(basePath10, sessionId, "tokens", template || "")
    })).jwt;
  }
};

// src/api/endpoints/SignInTokenApi.ts
var basePath11 = "/sign_in_tokens";
var SignInTokenAPI = class extends AbstractAPI {
  async createSignInToken(params) {
    return this.request({
      method: "POST",
      path: basePath11,
      bodyParams: params
    });
  }
  async revokeSignInToken(signInTokenId) {
    this.requireId(signInTokenId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath11, signInTokenId, "revoke")
    });
  }
};

// src/api/endpoints/SMSMessageApi.ts

var basePath12 = "/sms_messages";
var SMSMessageAPI = class extends AbstractAPI {
  /**
   * @deprecated This endpoint is no longer available and the function will be removed in the next major version.
   */
  async createSMSMessage(params) {
    chunk_IC4FGZI3_deprecated(
      "SMSMessageAPI.createSMSMessage",
      "This endpoint is no longer available and the function will be removed in the next major version."
    );
    return this.request({
      method: "POST",
      path: basePath12,
      bodyParams: params
    });
  }
};

// src/api/endpoints/UserApi.ts
var basePath13 = "/users";
var UserAPI = class extends AbstractAPI {
  async getUserList(params = {}) {
    return this.request({
      method: "GET",
      path: basePath13,
      queryParams: params
    });
  }
  async getUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath13, userId)
    });
  }
  async createUser(params) {
    return this.request({
      method: "POST",
      path: basePath13,
      bodyParams: params
    });
  }
  async updateUser(userId, params = {}) {
    this.requireId(userId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath13, userId),
      bodyParams: params
    });
  }
  async updateUserProfileImage(userId, params) {
    this.requireId(userId);
    const formData = new runtime_default.FormData();
    formData.append("file", params?.file);
    return this.request({
      method: "POST",
      path: joinPaths(basePath13, userId, "profile_image"),
      formData
    });
  }
  async updateUserMetadata(userId, params) {
    this.requireId(userId);
    return this.request({
      method: "PATCH",
      path: joinPaths(basePath13, userId, "metadata"),
      bodyParams: params
    });
  }
  async deleteUser(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath13, userId)
    });
  }
  async getCount(params = {}) {
    return this.request({
      method: "GET",
      path: joinPaths(basePath13, "count"),
      queryParams: params
    });
  }
  async getUserOauthAccessToken(userId, provider) {
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath13, userId, "oauth_access_tokens", provider)
    });
  }
  async disableUserMFA(userId) {
    this.requireId(userId);
    return this.request({
      method: "DELETE",
      path: joinPaths(basePath13, userId, "mfa")
    });
  }
  async getOrganizationMembershipList(params) {
    const { userId, limit, offset } = params;
    this.requireId(userId);
    return this.request({
      method: "GET",
      path: joinPaths(basePath13, userId, "organization_memberships"),
      queryParams: { limit, offset }
    });
  }
  async verifyPassword(params) {
    const { userId, password } = params;
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath13, userId, "verify_password"),
      bodyParams: { password }
    });
  }
  async verifyTOTP(params) {
    const { userId, code } = params;
    this.requireId(userId);
    return this.request({
      method: "POST",
      path: joinPaths(basePath13, userId, "verify_totp"),
      bodyParams: { code }
    });
  }
};

// src/api/request.ts




// src/constants.ts
var API_URL = "https://api.clerk.dev";
var API_VERSION = "v1";
var USER_AGENT = `${"@clerk/backend"}@${"0.38.15"}`;
var MAX_CACHE_LAST_UPDATED_AT_SECONDS = 5 * 60;
var Attributes = {
  AuthToken: "__clerkAuthToken",
  AuthStatus: "__clerkAuthStatus",
  AuthReason: "__clerkAuthReason",
  AuthMessage: "__clerkAuthMessage"
};
var Cookies = {
  Session: "__session",
  ClientUat: "__client_uat"
};
var esm_Headers = {
  AuthToken: "x-clerk-auth-token",
  AuthStatus: "x-clerk-auth-status",
  AuthReason: "x-clerk-auth-reason",
  AuthMessage: "x-clerk-auth-message",
  EnableDebug: "x-clerk-debug",
  ClerkRedirectTo: "x-clerk-redirect-to",
  CloudFrontForwardedProto: "cloudfront-forwarded-proto",
  Authorization: "authorization",
  ForwardedPort: "x-forwarded-port",
  ForwardedProto: "x-forwarded-proto",
  ForwardedHost: "x-forwarded-host",
  Referrer: "referer",
  UserAgent: "user-agent",
  Origin: "origin",
  Host: "host",
  ContentType: "content-type"
};
var SearchParams = {
  AuthStatus: esm_Headers.AuthStatus,
  AuthToken: esm_Headers.AuthToken
};
var ContentTypes = {
  Json: "application/json"
};
var esm_constants = {
  Attributes,
  Cookies,
  Headers: esm_Headers,
  SearchParams,
  ContentTypes
};

// src/util/assertValidSecretKey.ts
function assertValidSecretKey(val) {
  if (!val || typeof val !== "string") {
    throw Error(
      "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance."
    );
  }
}

// src/api/resources/AllowlistIdentifier.ts
var AllowlistIdentifier = class _AllowlistIdentifier {
  constructor(id, identifier, createdAt, updatedAt, invitationId) {
    this.id = id;
    this.identifier = identifier;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.invitationId = invitationId;
  }
  static fromJSON(data) {
    return new _AllowlistIdentifier(data.id, data.identifier, data.created_at, data.updated_at, data.invitation_id);
  }
};

// src/api/resources/Session.ts
var Session = class _Session {
  constructor(id, clientId, userId, status, lastActiveAt, expireAt, abandonAt, createdAt, updatedAt) {
    this.id = id;
    this.clientId = clientId;
    this.userId = userId;
    this.status = status;
    this.lastActiveAt = lastActiveAt;
    this.expireAt = expireAt;
    this.abandonAt = abandonAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _Session(
      data.id,
      data.client_id,
      data.user_id,
      data.status,
      data.last_active_at,
      data.expire_at,
      data.abandon_at,
      data.created_at,
      data.updated_at
    );
  }
};

// src/api/resources/Client.ts
var Client = class _Client {
  constructor(id, sessionIds, sessions, signInId, signUpId, lastActiveSessionId, createdAt, updatedAt) {
    this.id = id;
    this.sessionIds = sessionIds;
    this.sessions = sessions;
    this.signInId = signInId;
    this.signUpId = signUpId;
    this.lastActiveSessionId = lastActiveSessionId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _Client(
      data.id,
      data.session_ids,
      data.sessions.map((x) => Session.fromJSON(x)),
      data.sign_in_id,
      data.sign_up_id,
      data.last_active_session_id,
      data.created_at,
      data.updated_at
    );
  }
};

// src/api/resources/DeletedObject.ts
var DeletedObject = class _DeletedObject {
  constructor(object, id, slug, deleted) {
    this.object = object;
    this.id = id;
    this.slug = slug;
    this.deleted = deleted;
  }
  static fromJSON(data) {
    return new _DeletedObject(data.object, data.id || null, data.slug || null, data.deleted);
  }
};

// src/api/resources/Email.ts
var Email = class _Email {
  constructor(id, fromEmailName, emailAddressId, toEmailAddress, subject, body, bodyPlain, status, slug, data, deliveredByClerk) {
    this.id = id;
    this.fromEmailName = fromEmailName;
    this.emailAddressId = emailAddressId;
    this.toEmailAddress = toEmailAddress;
    this.subject = subject;
    this.body = body;
    this.bodyPlain = bodyPlain;
    this.status = status;
    this.slug = slug;
    this.data = data;
    this.deliveredByClerk = deliveredByClerk;
  }
  static fromJSON(data) {
    return new _Email(
      data.id,
      data.from_email_name,
      data.email_address_id,
      data.to_email_address,
      data.subject,
      data.body,
      data.body_plain,
      data.status,
      data.slug,
      data.data,
      data.delivered_by_clerk
    );
  }
};

// src/api/resources/IdentificationLink.ts
var IdentificationLink = class _IdentificationLink {
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
  static fromJSON(data) {
    return new _IdentificationLink(data.id, data.type);
  }
};

// src/api/resources/Verification.ts
var Verification = class _Verification {
  constructor(status, strategy, externalVerificationRedirectURL = null, attempts = null, expireAt = null, nonce = null) {
    this.status = status;
    this.strategy = strategy;
    this.externalVerificationRedirectURL = externalVerificationRedirectURL;
    this.attempts = attempts;
    this.expireAt = expireAt;
    this.nonce = nonce;
  }
  static fromJSON(data) {
    return new _Verification(
      data.status,
      data.strategy,
      data.external_verification_redirect_url ? new URL(data.external_verification_redirect_url) : null,
      data.attempts,
      data.expire_at,
      data.nonce
    );
  }
};

// src/api/resources/EmailAddress.ts
var EmailAddress = class _EmailAddress {
  constructor(id, emailAddress, verification, linkedTo) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.verification = verification;
    this.linkedTo = linkedTo;
  }
  static fromJSON(data) {
    return new _EmailAddress(
      data.id,
      data.email_address,
      data.verification && Verification.fromJSON(data.verification),
      data.linked_to.map((link) => IdentificationLink.fromJSON(link))
    );
  }
};

// src/api/resources/ExternalAccount.ts
var ExternalAccount = class _ExternalAccount {
  constructor(id, provider, identificationId, externalId, approvedScopes, emailAddress, firstName, lastName, picture, imageUrl, username, publicMetadata = {}, label, verification) {
    this.id = id;
    this.provider = provider;
    this.identificationId = identificationId;
    this.externalId = externalId;
    this.approvedScopes = approvedScopes;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.imageUrl = imageUrl;
    this.username = username;
    this.publicMetadata = publicMetadata;
    this.label = label;
    this.verification = verification;
  }
  static fromJSON(data) {
    return new _ExternalAccount(
      data.id,
      data.provider,
      data.identification_id,
      data.provider_user_id,
      data.approved_scopes,
      data.email_address,
      data.first_name,
      data.last_name,
      data.avatar_url,
      data.image_url,
      data.username,
      data.public_metadata,
      data.label,
      data.verification && Verification.fromJSON(data.verification)
    );
  }
};
deprecatedProperty(ExternalAccount, "picture", "Use `imageUrl` instead.");

// src/api/resources/Invitation.ts
var Invitation = class _Invitation {
  constructor(id, emailAddress, publicMetadata, createdAt, updatedAt, status, revoked) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.publicMetadata = publicMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.revoked = revoked;
  }
  static fromJSON(data) {
    return new _Invitation(
      data.id,
      data.email_address,
      data.public_metadata,
      data.created_at,
      data.updated_at,
      data.status,
      data.revoked
    );
  }
};

// src/api/resources/JSON.ts
var ObjectType = /* @__PURE__ */ ((ObjectType2) => {
  ObjectType2["AllowlistIdentifier"] = "allowlist_identifier";
  ObjectType2["Client"] = "client";
  ObjectType2["Email"] = "email";
  ObjectType2["EmailAddress"] = "email_address";
  ObjectType2["ExternalAccount"] = "external_account";
  ObjectType2["FacebookAccount"] = "facebook_account";
  ObjectType2["GoogleAccount"] = "google_account";
  ObjectType2["Invitation"] = "invitation";
  ObjectType2["OauthAccessToken"] = "oauth_access_token";
  ObjectType2["Organization"] = "organization";
  ObjectType2["OrganizationInvitation"] = "organization_invitation";
  ObjectType2["OrganizationMembership"] = "organization_membership";
  ObjectType2["PhoneNumber"] = "phone_number";
  ObjectType2["RedirectUrl"] = "redirect_url";
  ObjectType2["Session"] = "session";
  ObjectType2["SignInAttempt"] = "sign_in_attempt";
  ObjectType2["SignInToken"] = "sign_in_token";
  ObjectType2["SignUpAttempt"] = "sign_up_attempt";
  ObjectType2["SmsMessage"] = "sms_message";
  ObjectType2["User"] = "user";
  ObjectType2["Web3Wallet"] = "web3_wallet";
  ObjectType2["Token"] = "token";
  ObjectType2["TotalCount"] = "total_count";
  return ObjectType2;
})(ObjectType || {});

// src/api/resources/OauthAccessToken.ts
var OauthAccessToken = class _OauthAccessToken {
  constructor(provider, token, publicMetadata = {}, label, scopes, tokenSecret) {
    this.provider = provider;
    this.token = token;
    this.publicMetadata = publicMetadata;
    this.label = label;
    this.scopes = scopes;
    this.tokenSecret = tokenSecret;
  }
  static fromJSON(data) {
    return new _OauthAccessToken(
      data.provider,
      data.token,
      data.public_metadata,
      data.label,
      data.scopes,
      data.token_secret
    );
  }
};

// src/api/resources/Organization.ts
var Organization = class _Organization {
  constructor(id, name, slug, logoUrl, imageUrl, hasImage, createdBy, createdAt, updatedAt, publicMetadata = {}, privateMetadata = {}, maxAllowedMemberships, adminDeleteEnabled, members_count, membersCount) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.logoUrl = logoUrl;
    this.imageUrl = imageUrl;
    this.hasImage = hasImage;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.maxAllowedMemberships = maxAllowedMemberships;
    this.adminDeleteEnabled = adminDeleteEnabled;
    this.members_count = members_count;
    this.membersCount = membersCount;
  }
  static fromJSON(data) {
    return new _Organization(
      data.id,
      data.name,
      data.slug,
      data.logo_url,
      data.image_url,
      data.has_image,
      data.created_by,
      data.created_at,
      data.updated_at,
      data.public_metadata,
      data.private_metadata,
      data.max_allowed_memberships,
      data.admin_delete_enabled,
      data.members_count,
      data.members_count
    );
  }
};
deprecatedProperty(Organization, "logoUrl", "Use `imageUrl` instead.");
deprecatedProperty(Organization, "members_count", "Use `membersCount` instead.");

// src/api/resources/OrganizationInvitation.ts
var OrganizationInvitation = class _OrganizationInvitation {
  constructor(id, emailAddress, role, organizationId, createdAt, updatedAt, status, publicMetadata = {}, privateMetadata = {}) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.role = role;
    this.organizationId = organizationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
  }
  static fromJSON(data) {
    return new _OrganizationInvitation(
      data.id,
      data.email_address,
      data.role,
      data.organization_id,
      data.created_at,
      data.updated_at,
      data.status,
      data.public_metadata,
      data.private_metadata
    );
  }
};

// src/api/resources/OrganizationMembership.ts
var OrganizationMembership = class _OrganizationMembership {
  constructor(id, role, publicMetadata = {}, privateMetadata = {}, createdAt, updatedAt, organization, publicUserData) {
    this.id = id;
    this.role = role;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.organization = organization;
    this.publicUserData = publicUserData;
  }
  static fromJSON(data) {
    return new _OrganizationMembership(
      data.id,
      data.role,
      data.public_metadata,
      data.private_metadata,
      data.created_at,
      data.updated_at,
      Organization.fromJSON(data.organization),
      OrganizationMembershipPublicUserData.fromJSON(data.public_user_data)
    );
  }
};
var OrganizationMembershipPublicUserData = class _OrganizationMembershipPublicUserData {
  constructor(identifier, firstName, lastName, profileImageUrl, imageUrl, hasImage, userId) {
    this.identifier = identifier;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileImageUrl = profileImageUrl;
    this.imageUrl = imageUrl;
    this.hasImage = hasImage;
    this.userId = userId;
  }
  static fromJSON(data) {
    return new _OrganizationMembershipPublicUserData(
      data.identifier,
      data.first_name,
      data.last_name,
      data.profile_image_url,
      data.image_url,
      data.has_image,
      data.user_id
    );
  }
};
deprecatedProperty(OrganizationMembershipPublicUserData, "profileImageUrl", "Use `imageUrl` instead.");

// src/api/resources/PhoneNumber.ts
var PhoneNumber = class _PhoneNumber {
  constructor(id, phoneNumber, reservedForSecondFactor, defaultSecondFactor, verification, linkedTo) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.reservedForSecondFactor = reservedForSecondFactor;
    this.defaultSecondFactor = defaultSecondFactor;
    this.verification = verification;
    this.linkedTo = linkedTo;
  }
  static fromJSON(data) {
    return new _PhoneNumber(
      data.id,
      data.phone_number,
      data.reserved_for_second_factor,
      data.default_second_factor,
      data.verification && Verification.fromJSON(data.verification),
      data.linked_to.map((link) => IdentificationLink.fromJSON(link))
    );
  }
};

// src/api/resources/RedirectUrl.ts
var RedirectUrl = class _RedirectUrl {
  constructor(id, url, createdAt, updatedAt) {
    this.id = id;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _RedirectUrl(data.id, data.url, data.created_at, data.updated_at);
  }
};

// src/api/resources/SignInTokens.ts
var SignInToken = class _SignInToken {
  constructor(id, userId, token, status, url, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.status = status;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON(data) {
    return new _SignInToken(data.id, data.user_id, data.token, data.status, data.url, data.created_at, data.updated_at);
  }
};

// src/api/resources/SMSMessage.ts
var SMSMessage = class _SMSMessage {
  constructor(id, fromPhoneNumber, toPhoneNumber, message, status, phoneNumberId, data) {
    this.id = id;
    this.fromPhoneNumber = fromPhoneNumber;
    this.toPhoneNumber = toPhoneNumber;
    this.message = message;
    this.status = status;
    this.phoneNumberId = phoneNumberId;
    this.data = data;
  }
  static fromJSON(data) {
    return new _SMSMessage(
      data.id,
      data.from_phone_number,
      data.to_phone_number,
      data.message,
      data.status,
      data.phone_number_id,
      data.data
    );
  }
};

// src/api/resources/Token.ts
var Token = class _Token {
  constructor(jwt) {
    this.jwt = jwt;
  }
  static fromJSON(data) {
    return new _Token(data.jwt);
  }
};

// src/api/resources/Web3Wallet.ts
var Web3Wallet = class _Web3Wallet {
  constructor(id, web3Wallet, verification) {
    this.id = id;
    this.web3Wallet = web3Wallet;
    this.verification = verification;
  }
  static fromJSON(data) {
    return new _Web3Wallet(data.id, data.web3_wallet, data.verification && Verification.fromJSON(data.verification));
  }
};

// src/api/resources/User.ts
var User = class _User {
  constructor(id, passwordEnabled, totpEnabled, backupCodeEnabled, twoFactorEnabled, banned, createdAt, updatedAt, profileImageUrl, imageUrl, hasImage, gender, birthday, primaryEmailAddressId, primaryPhoneNumberId, primaryWeb3WalletId, lastSignInAt, externalId, username, firstName, lastName, publicMetadata = {}, privateMetadata = {}, unsafeMetadata = {}, emailAddresses = [], phoneNumbers = [], web3Wallets = [], externalAccounts = [], createOrganizationEnabled) {
    this.id = id;
    this.passwordEnabled = passwordEnabled;
    this.totpEnabled = totpEnabled;
    this.backupCodeEnabled = backupCodeEnabled;
    this.twoFactorEnabled = twoFactorEnabled;
    this.banned = banned;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.profileImageUrl = profileImageUrl;
    this.imageUrl = imageUrl;
    this.hasImage = hasImage;
    this.gender = gender;
    this.birthday = birthday;
    this.primaryEmailAddressId = primaryEmailAddressId;
    this.primaryPhoneNumberId = primaryPhoneNumberId;
    this.primaryWeb3WalletId = primaryWeb3WalletId;
    this.lastSignInAt = lastSignInAt;
    this.externalId = externalId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.publicMetadata = publicMetadata;
    this.privateMetadata = privateMetadata;
    this.unsafeMetadata = unsafeMetadata;
    this.emailAddresses = emailAddresses;
    this.phoneNumbers = phoneNumbers;
    this.web3Wallets = web3Wallets;
    this.externalAccounts = externalAccounts;
    this.createOrganizationEnabled = createOrganizationEnabled;
  }
  static fromJSON(data) {
    return new _User(
      data.id,
      data.password_enabled,
      data.totp_enabled,
      data.backup_code_enabled,
      data.two_factor_enabled,
      data.banned,
      data.created_at,
      data.updated_at,
      data.profile_image_url,
      data.image_url,
      data.has_image,
      data.gender,
      data.birthday,
      data.primary_email_address_id,
      data.primary_phone_number_id,
      data.primary_web3_wallet_id,
      data.last_sign_in_at,
      data.external_id,
      data.username,
      data.first_name,
      data.last_name,
      data.public_metadata,
      data.private_metadata,
      data.unsafe_metadata,
      (data.email_addresses || []).map((x) => EmailAddress.fromJSON(x)),
      (data.phone_numbers || []).map((x) => PhoneNumber.fromJSON(x)),
      (data.web3_wallets || []).map((x) => Web3Wallet.fromJSON(x)),
      (data.external_accounts || []).map((x) => ExternalAccount.fromJSON(x)),
      data.create_organization_enabled
    );
  }
};
deprecatedProperty(User, "profileImageUrl", "Use `imageUrl` instead.");

// src/api/resources/Deserializer.ts
function deserialize(payload) {
  if (Array.isArray(payload)) {
    return payload.map((item) => jsonToObject(item));
  } else if (isPaginated(payload)) {
    return payload.data.map((item) => jsonToObject(item));
  } else {
    return jsonToObject(payload);
  }
}
function isPaginated(payload) {
  return Array.isArray(payload.data) && payload.data !== void 0;
}
function getCount(item) {
  return item.total_count;
}
function jsonToObject(item) {
  if (typeof item !== "string" && "object" in item && "deleted" in item) {
    return DeletedObject.fromJSON(item);
  }
  switch (item.object) {
    case "allowlist_identifier" /* AllowlistIdentifier */:
      return AllowlistIdentifier.fromJSON(item);
    case "client" /* Client */:
      return Client.fromJSON(item);
    case "email_address" /* EmailAddress */:
      return EmailAddress.fromJSON(item);
    case "email" /* Email */:
      return Email.fromJSON(item);
    case "invitation" /* Invitation */:
      return Invitation.fromJSON(item);
    case "oauth_access_token" /* OauthAccessToken */:
      return OauthAccessToken.fromJSON(item);
    case "organization" /* Organization */:
      return Organization.fromJSON(item);
    case "organization_invitation" /* OrganizationInvitation */:
      return OrganizationInvitation.fromJSON(item);
    case "organization_membership" /* OrganizationMembership */:
      return OrganizationMembership.fromJSON(item);
    case "phone_number" /* PhoneNumber */:
      return PhoneNumber.fromJSON(item);
    case "redirect_url" /* RedirectUrl */:
      return RedirectUrl.fromJSON(item);
    case "sign_in_token" /* SignInToken */:
      return SignInToken.fromJSON(item);
    case "session" /* Session */:
      return Session.fromJSON(item);
    case "sms_message" /* SmsMessage */:
      return SMSMessage.fromJSON(item);
    case "token" /* Token */:
      return Token.fromJSON(item);
    case "total_count" /* TotalCount */:
      return getCount(item);
    case "user" /* User */:
      return User.fromJSON(item);
    default:
      return item;
  }
}

// src/api/request.ts
var withLegacyReturn = (cb) => async (...args) => {
  const response = await cb(...args);
  if (response.errors === null) {
    return response.data;
  } else {
    const { errors, clerkTraceId } = response;
    const { status, statusText } = response;
    const error = new ClerkAPIResponseError(statusText || "", {
      data: [],
      status: status || "",
      clerkTraceId
    });
    error.errors = errors;
    throw error;
  }
};
function buildRequest(options) {
  const request = async (requestOptions) => {
    const {
      apiKey,
      secretKey,
      httpOptions,
      apiUrl = API_URL,
      apiVersion = API_VERSION,
      userAgent = USER_AGENT
    } = options;
    if (apiKey) {
      chunk_IC4FGZI3_deprecated("apiKey", "Use `secretKey` instead.");
    }
    if (httpOptions) {
      chunk_IC4FGZI3_deprecated(
        "httpOptions",
        "This option has been deprecated and will be removed with the next major release.\nA RequestInit init object used by the `request` method."
      );
    }
    const { path, method, queryParams, headerParams, bodyParams, formData } = requestOptions;
    const key = secretKey || apiKey;
    assertValidSecretKey(key);
    const url = joinPaths(apiUrl, apiVersion, path);
    const finalUrl = new URL(url);
    if (queryParams) {
      const snakecasedQueryParams = snakecase_keys_default()({ ...queryParams });
      for (const [key2, val] of Object.entries(snakecasedQueryParams)) {
        if (val) {
          [val].flat().forEach((v) => finalUrl.searchParams.append(key2, v));
        }
      }
    }
    const headers = {
      Authorization: `Bearer ${key}`,
      "User-Agent": userAgent,
      ...headerParams
    };
    let res = void 0;
    try {
      if (formData) {
        res = await runtime_default.fetch(finalUrl.href, {
          ...httpOptions,
          method,
          headers,
          body: formData
        });
      } else {
        headers["Content-Type"] = "application/json";
        const hasBody = method !== "GET" && bodyParams && Object.keys(bodyParams).length > 0;
        const body = hasBody ? { body: JSON.stringify(snakecase_keys_default()(bodyParams, { deep: false })) } : null;
        res = await runtime_default.fetch(
          finalUrl.href,
          cjs_default()(httpOptions || {}, {
            method,
            headers,
            ...body
          })
        );
      }
      const isJSONResponse = res?.headers && res.headers?.get(esm_constants.Headers.ContentType) === esm_constants.ContentTypes.Json;
      const data = await (isJSONResponse ? res.json() : res.text());
      if (!res.ok) {
        throw data;
      }
      return {
        data: deserialize(data),
        errors: null
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          errors: [
            {
              code: "unexpected_error",
              message: err.message || "Unexpected error"
            }
          ],
          clerkTraceId: getTraceId(err, res?.headers)
        };
      }
      return {
        data: null,
        errors: esm_parseErrors(err),
        // TODO: To be removed with withLegacyReturn
        // @ts-expect-error
        status: res?.status,
        statusText: res?.statusText,
        clerkTraceId: getTraceId(err, res?.headers)
      };
    }
  };
  return withLegacyReturn(request);
}
function getTraceId(data, headers) {
  if (data && typeof data === "object" && "clerk_trace_id" in data && typeof data.clerk_trace_id === "string") {
    return data.clerk_trace_id;
  }
  const cfRay = headers?.get("cf-ray");
  return cfRay || "";
}
function esm_parseErrors(data) {
  if (!!data && typeof data === "object" && "errors" in data) {
    const errors = data.errors;
    return errors.length > 0 ? errors.map(esm_parseError) : [];
  }
  return [];
}
function esm_parseError(error) {
  return {
    code: error.code,
    message: error.message,
    longMessage: error.long_message,
    meta: {
      paramName: error?.meta?.param_name,
      sessionId: error?.meta?.session_id
    }
  };
}

// src/api/factory.ts
function createBackendApiClient(options) {
  const request = buildRequest(options);
  return {
    allowlistIdentifiers: new AllowlistIdentifierAPI(request),
    clients: new ClientAPI(request),
    emailAddresses: new EmailAddressAPI(request),
    emails: new EmailAPI(request),
    interstitial: new InterstitialAPI(request),
    invitations: new InvitationAPI(request),
    organizations: new OrganizationAPI(request),
    phoneNumbers: new PhoneNumberAPI(request),
    redirectUrls: new RedirectUrlAPI(request),
    sessions: new SessionAPI(request),
    signInTokens: new SignInTokenAPI(request),
    smsMessages: new SMSMessageAPI(request),
    users: new UserAPI(request),
    domains: new DomainAPI(request)
  };
}

// src/tokens/authObjects.ts

var createDebug = (data) => {
  return () => {
    const res = { ...data };
    res.apiKey = (res.apiKey || "").substring(0, 7);
    res.secretKey = (res.secretKey || "").substring(0, 7);
    res.jwtKey = (res.jwtKey || "").substring(0, 7);
    return { ...res };
  };
};
function signedInAuthObject(sessionClaims, options, debugData) {
  const {
    act: actor,
    sid: sessionId,
    org_id: orgId,
    org_role: orgRole,
    org_slug: orgSlug,
    org_permissions: orgPermissions,
    sub: userId
  } = sessionClaims;
  const { apiKey, secretKey, apiUrl, apiVersion, token, session, user, organization } = options;
  if (apiKey) {
    chunk_IC4FGZI3_deprecated("apiKey", "Use `secretKey` instead.");
  }
  const { sessions } = createBackendApiClient({
    apiKey,
    secretKey,
    apiUrl,
    apiVersion
  });
  const getToken = createGetToken({
    sessionId,
    sessionToken: token,
    fetcher: (...args) => sessions.getToken(...args)
  });
  return {
    actor,
    sessionClaims,
    sessionId,
    session,
    userId,
    user,
    orgId,
    orgRole,
    orgSlug,
    orgPermissions,
    organization,
    getToken,
    has: createHasAuthorization({ orgId, orgRole, orgPermissions, userId }),
    debug: createDebug({ ...options, ...debugData })
  };
}
function signedOutAuthObject(debugData) {
  if (debugData?.apiKey) {
    chunk_IC4FGZI3_deprecated("apiKey", "Use `secretKey` instead.");
  }
  return {
    sessionClaims: null,
    sessionId: null,
    session: null,
    userId: null,
    user: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    orgPermissions: null,
    organization: null,
    getToken: () => Promise.resolve(null),
    has: () => false,
    debug: createDebug(debugData)
  };
}
function prunePrivateMetadata(resource) {
  if (resource) {
    delete resource["privateMetadata"];
    delete resource["private_metadata"];
  }
  return resource;
}
function sanitizeAuthObject(authObject) {
  const user = authObject.user ? { ...authObject.user } : authObject.user;
  const organization = authObject.organization ? { ...authObject.organization } : authObject.organization;
  prunePrivateMetadata(user);
  prunePrivateMetadata(organization);
  return { ...authObject, user, organization };
}
var makeAuthObjectSerializable = (obj) => {
  const { debug, getToken, has, ...rest } = obj;
  return rest;
};
var createGetToken = (params) => {
  const { fetcher, sessionToken, sessionId } = params || {};
  return async (options = {}) => {
    if (!sessionId) {
      return null;
    }
    if (options.template) {
      return fetcher(sessionId, options.template);
    }
    return sessionToken;
  };
};
var createHasAuthorization = ({
  orgId,
  orgRole,
  userId,
  orgPermissions
}) => (params) => {
  if (!params?.permission && !params?.role) {
    throw new Error(
      'Missing parameters. `has` from `auth` or `getAuth` requires a permission or role key to be passed. Example usage: `has({permission: "org:posts:edit"`'
    );
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
};

// src/tokens/errors.ts
var TokenVerificationError = class _TokenVerificationError extends Error {
  constructor({
    action,
    message,
    reason
  }) {
    super(message);
    Object.setPrototypeOf(this, _TokenVerificationError.prototype);
    this.reason = reason;
    this.message = message;
    this.action = action;
  }
  getFullMessage() {
    return `${[this.message, this.action].filter((m) => m).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
  }
};

// src/tokens/interstitial.ts
function loadInterstitialFromLocal(options) {
  if (options.frontendApi) {
    chunk_IC4FGZI3_deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  if (options.pkgVersion) {
    chunk_IC4FGZI3_deprecated("pkgVersion", "Use `clerkJSVersion` instead.");
  }
  options.frontendApi = parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi || "";
  const domainOnlyInProd = !isDevOrStagingUrl(options.frontendApi) ? addClerkPrefix(options.domain) : "";
  const {
    debugData,
    frontendApi,
    pkgVersion,
    clerkJSUrl,
    clerkJSVersion,
    publishableKey,
    proxyUrl,
    isSatellite = false,
    domain,
    signInUrl
  } = options;
  return `
    <head>
        <meta charset="UTF-8" />
        <style>
          @media (prefers-color-scheme: dark) {
            body {
              background-color: black;
            }
          }
        </style>
    </head>
    <body>
        <script>
            window.__clerk_frontend_api = '${frontendApi}';
            window.__clerk_debug = ${JSON.stringify(debugData || {})};
            ${proxyUrl ? `window.__clerk_proxy_url = '${proxyUrl}'` : ""}
            ${domain ? `window.__clerk_domain = '${domain}'` : ""}
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite: ${isSatellite},
                        isInterstitial: ${true},
                        signInUrl: ${signInUrl ? `'${signInUrl}'` : void 0}
                    });
                    if(Clerk.loaded){
                      if(window.location.href.indexOf("#") === -1){
                        window.location.href = window.location.href;
                      } else if (window.navigator.userAgent.toLowerCase().includes("firefox/")){
                          formRedirect();
                      } else {
                          window.location.reload();
                      }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                ${publishableKey ? `script.setAttribute('data-clerk-publishable-key', '${publishableKey}');` : `script.setAttribute('data-clerk-frontend-api', '${frontendApi}');`}

                ${domain ? `script.setAttribute('data-clerk-domain', '${domain}');` : ""}
                ${proxyUrl ? `script.setAttribute('data-clerk-proxy-url', '${proxyUrl}')` : ""};
                script.async = true;
                script.src = '${clerkJSUrl || getScriptUrl(proxyUrl || domainOnlyInProd || frontendApi, {
    pkgVersion,
    clerkJSVersion
  })}';
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
`;
}
async function loadInterstitialFromBAPI(options) {
  if (options.frontendApi) {
    chunk_IC4FGZI3_deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  if (options.pkgVersion) {
    chunk_IC4FGZI3_deprecated("pkgVersion", "Use `clerkJSVersion` instead.");
  }
  options.frontendApi = parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi || "";
  const url = buildPublicInterstitialUrl(options);
  const response = await callWithRetry(
    () => runtime_default.fetch(buildPublicInterstitialUrl(options), {
      method: "GET",
      headers: {
        "Clerk-Backend-SDK": options.userAgent || USER_AGENT
      }
    })
  );
  if (!response.ok) {
    throw new TokenVerificationError({
      action: "Contact support@clerk.com" /* ContactSupport */,
      message: `Error loading Clerk Interstitial from ${url} with code=${response.status}`,
      reason: "interstitial-remote-failed-to-load" /* RemoteInterstitialFailedToLoad */
    });
  }
  return response.text();
}
function buildPublicInterstitialUrl(options) {
  if (options.frontendApi) {
    chunk_IC4FGZI3_deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  options.frontendApi = parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi || "";
  const { apiUrl, frontendApi, pkgVersion, clerkJSVersion, publishableKey, proxyUrl, isSatellite, domain, signInUrl } = options;
  const url = new URL(apiUrl);
  url.pathname = joinPaths(url.pathname, API_VERSION, "/public/interstitial");
  url.searchParams.append("clerk_js_version", clerkJSVersion || getClerkJsMajorVersionOrTag(frontendApi, pkgVersion));
  if (publishableKey) {
    url.searchParams.append("publishable_key", publishableKey);
  } else {
    url.searchParams.append("frontend_api", frontendApi);
  }
  if (proxyUrl) {
    url.searchParams.append("proxy_url", proxyUrl);
  }
  if (isSatellite) {
    url.searchParams.append("is_satellite", "true");
  }
  url.searchParams.append("sign_in_url", signInUrl || "");
  if (!isDevOrStagingUrl(options.frontendApi)) {
    url.searchParams.append("use_domain_for_script", "true");
  }
  if (domain) {
    url.searchParams.append("domain", domain);
  }
  return url.href;
}

// src/util/IsomorphicRequest.ts


// src/utils.ts
var esm_getHeader = (req, key) => req.headers.get(key);
var getFirstValueFromHeader = (value) => value?.split(",")[0];
var buildRequestUrl = (request, path) => {
  const initialUrl = new URL(request.url);
  const forwardedProto = esm_getHeader(request, esm_constants.Headers.ForwardedProto);
  const forwardedHost = esm_getHeader(request, esm_constants.Headers.ForwardedHost);
  const host = esm_getHeader(request, esm_constants.Headers.Host);
  const protocol = initialUrl.protocol;
  const base = buildOrigin({ protocol, forwardedProto, forwardedHost, host: host || initialUrl.host });
  return new URL(path || initialUrl.pathname, base);
};
var buildOrigin = ({ protocol, forwardedProto, forwardedHost, host }) => {
  const resolvedHost = getFirstValueFromHeader(forwardedHost) ?? host;
  const resolvedProtocol = getFirstValueFromHeader(forwardedProto) ?? protocol?.replace(/[:/]/, "");
  if (!resolvedHost || !resolvedProtocol) {
    return "";
  }
  return `${resolvedProtocol}://${resolvedHost}`;
};

// src/util/IsomorphicRequest.ts
var createIsomorphicRequest = (cb) => {
  const req = cb(runtime_default.Request, runtime_default.Headers);
  const headersGeneratedURL = buildRequestUrl(req);
  return new runtime_default.Request(headersGeneratedURL, req);
};
var buildRequest2 = (req) => {
  if (!req) {
    return {};
  }
  const cookies = parseIsomorphicRequestCookies(req);
  const headers = getHeaderFromIsomorphicRequest(req);
  const searchParams = getSearchParamsFromIsomorphicRequest(req);
  return {
    cookies,
    headers,
    searchParams
  };
};
var decode = (str) => {
  if (!str) {
    return str;
  }
  return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};
var parseIsomorphicRequestCookies = (req) => {
  const cookies = req.headers && req.headers?.get("cookie") ? (0,cookie/* parse */.q)(req.headers.get("cookie")) : {};
  return (key) => {
    const value = cookies?.[key];
    if (value === void 0) {
      return void 0;
    }
    return decode(value);
  };
};
var getHeaderFromIsomorphicRequest = (req) => (key) => req?.headers?.get(key) || void 0;
var getSearchParamsFromIsomorphicRequest = (req) => req?.url ? new URL(req.url)?.searchParams : void 0;
var stripAuthorizationHeader = (authValue) => {
  return authValue?.replace("Bearer ", "");
};

// src/tokens/authStatus.ts
var AuthStatus = /* @__PURE__ */ ((AuthStatus2) => {
  AuthStatus2["SignedIn"] = "signed-in";
  AuthStatus2["SignedOut"] = "signed-out";
  AuthStatus2["Interstitial"] = "interstitial";
  AuthStatus2["Unknown"] = "unknown";
  return AuthStatus2;
})(AuthStatus || {});
async function signedIn(options, sessionClaims) {
  const {
    apiKey,
    secretKey,
    apiUrl,
    apiVersion,
    cookieToken,
    frontendApi,
    proxyUrl,
    publishableKey,
    domain,
    isSatellite,
    headerToken,
    loadSession,
    loadUser,
    loadOrganization,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    token
  } = options;
  const { sid: sessionId, org_id: orgId, sub: userId } = sessionClaims;
  const { sessions, users, organizations } = createBackendApiClient({
    apiKey,
    secretKey,
    apiUrl,
    apiVersion
  });
  const [sessionResp, userResp, organizationResp] = await Promise.all([
    loadSession ? sessions.getSession(sessionId) : Promise.resolve(void 0),
    loadUser ? users.getUser(userId) : Promise.resolve(void 0),
    loadOrganization && orgId ? organizations.getOrganization({ organizationId: orgId }) : Promise.resolve(void 0)
  ]);
  const session = sessionResp;
  const user = userResp;
  const organization = organizationResp;
  const authObject = signedInAuthObject(
    sessionClaims,
    {
      secretKey,
      apiKey,
      apiUrl,
      apiVersion,
      token: cookieToken || headerToken || "",
      session,
      user,
      organization
    },
    { ...options, status: "signed-in" /* SignedIn */ }
  );
  return {
    status: "signed-in" /* SignedIn */,
    reason: null,
    message: null,
    frontendApi,
    proxyUrl,
    publishableKey,
    domain,
    isSatellite,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: true,
    isInterstitial: false,
    isUnknown: false,
    toAuth: () => authObject,
    token
  };
}
function signedOut(options, reason, message = "") {
  const {
    frontendApi,
    publishableKey,
    proxyUrl,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl
  } = options;
  return {
    status: "signed-out" /* SignedOut */,
    reason,
    message,
    frontendApi,
    proxyUrl,
    publishableKey,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: false,
    isInterstitial: false,
    isUnknown: false,
    toAuth: () => signedOutAuthObject({ ...options, status: "signed-out" /* SignedOut */, reason, message }),
    token: null
  };
}
function interstitial(options, reason, message = "") {
  const {
    frontendApi,
    publishableKey,
    proxyUrl,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl
  } = options;
  return {
    status: "interstitial" /* Interstitial */,
    reason,
    message,
    frontendApi,
    publishableKey,
    isSatellite,
    domain,
    proxyUrl,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: false,
    isInterstitial: true,
    isUnknown: false,
    toAuth: () => null,
    token: null
  };
}
function unknownState(options, reason, message = "") {
  const { frontendApi, publishableKey, isSatellite, domain, signInUrl, signUpUrl, afterSignInUrl, afterSignUpUrl } = options;
  return {
    status: "unknown" /* Unknown */,
    reason,
    message,
    frontendApi,
    publishableKey,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: false,
    isInterstitial: false,
    isUnknown: true,
    toAuth: () => null,
    token: null
  };
}

// src/util/request.ts
function checkCrossOrigin({
  originURL,
  host,
  forwardedHost,
  forwardedProto
}) {
  const finalURL = buildOrigin({ forwardedProto, forwardedHost, protocol: originURL.protocol, host });
  return finalURL && new URL(finalURL).origin !== originURL.origin;
}
var getErrorObjectByCode = (errors, code) => {
  if (!errors) {
    return null;
  }
  return errors.find((err) => err.code === code);
};

// src/tokens/jwt/verifyJwt.ts


// src/util/rfc4648.ts
var base64url = {
  parse(string, opts) {
    return parse2(string, base64UrlEncoding, opts);
  },
  stringify(data, opts) {
    return stringify(data, base64UrlEncoding, opts);
  }
};
var base64UrlEncoding = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bits: 6
};
function parse2(string, encoding, opts = {}) {
  if (!encoding.codes) {
    encoding.codes = {};
    for (let i = 0; i < encoding.chars.length; ++i) {
      encoding.codes[encoding.chars[i]] = i;
    }
  }
  if (!opts.loose && string.length * encoding.bits & 7) {
    throw new SyntaxError("Invalid padding");
  }
  let end = string.length;
  while (string[end - 1] === "=") {
    --end;
    if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
      throw new SyntaxError("Invalid padding");
    }
  }
  const out = new (opts.out ?? Uint8Array)(end * encoding.bits / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = encoding.codes[string[i]];
    if (value === void 0) {
      throw new SyntaxError("Invalid character " + string[i]);
    }
    buffer = buffer << encoding.bits | value;
    bits += encoding.bits;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function stringify(data, encoding, opts = {}) {
  const { pad = true } = opts;
  const mask = (1 << encoding.bits) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | 255 & data[i];
    bits += 8;
    while (bits > encoding.bits) {
      bits -= encoding.bits;
      out += encoding.chars[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += encoding.chars[mask & buffer << encoding.bits - bits];
  }
  if (pad) {
    while (out.length * encoding.bits & 7) {
      out += "=";
    }
  }
  return out;
}

// src/tokens/jwt/algorithms.ts
var algToHash = {
  RS256: "SHA-256",
  RS384: "SHA-384",
  RS512: "SHA-512"
};
var RSA_ALGORITHM_NAME = "RSASSA-PKCS1-v1_5";
var jwksAlgToCryptoAlg = {
  RS256: RSA_ALGORITHM_NAME,
  RS384: RSA_ALGORITHM_NAME,
  RS512: RSA_ALGORITHM_NAME
};
var algs = Object.keys(algToHash);
function getCryptoAlgorithm(algorithmName) {
  const hash = algToHash[algorithmName];
  const name = jwksAlgToCryptoAlg[algorithmName];
  if (!hash || !name) {
    throw new Error(`Unsupported algorithm ${algorithmName}, expected one of ${algs.join(",")}.`);
  }
  return {
    hash: { name: algToHash[algorithmName] },
    name: jwksAlgToCryptoAlg[algorithmName]
  };
}

// src/tokens/jwt/assertions.ts
var isArrayString = (s) => {
  return Array.isArray(s) && s.length > 0 && s.every((a) => typeof a === "string");
};
var assertAudienceClaim = (aud, audience) => {
  const audienceList = [audience].flat().filter((a) => !!a);
  const audList = [aud].flat().filter((a) => !!a);
  const shouldVerifyAudience = audienceList.length > 0 && audList.length > 0;
  if (!shouldVerifyAudience) {
    return;
  }
  if (typeof aud === "string") {
    if (!audienceList.includes(aud)) {
      throw new TokenVerificationError({
        action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
        reason: "token-verification-failed" /* TokenVerificationFailed */,
        message: `Invalid JWT audience claim (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
          audienceList
        )}".`
      });
    }
  } else if (isArrayString(aud)) {
    if (!aud.some((a) => audienceList.includes(a))) {
      throw new TokenVerificationError({
        action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
        reason: "token-verification-failed" /* TokenVerificationFailed */,
        message: `Invalid JWT audience claim array (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
          audienceList
        )}".`
      });
    }
  }
};
var assertHeaderType = (typ) => {
  if (typeof typ === "undefined") {
    return;
  }
  if (typ !== "JWT") {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-invalid" /* TokenInvalid */,
      message: `Invalid JWT type ${JSON.stringify(typ)}. Expected "JWT".`
    });
  }
};
var assertHeaderAlgorithm = (alg) => {
  if (!algs.includes(alg)) {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-invalid-algorithm" /* TokenInvalidAlgorithm */,
      message: `Invalid JWT algorithm ${JSON.stringify(alg)}. Supported: ${algs}.`
    });
  }
};
var assertSubClaim = (sub) => {
  if (typeof sub !== "string") {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-verification-failed" /* TokenVerificationFailed */,
      message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(sub)}.`
    });
  }
};
var assertAuthorizedPartiesClaim = (azp, authorizedParties) => {
  if (!azp || !authorizedParties || authorizedParties.length === 0) {
    return;
  }
  if (!authorizedParties.includes(azp)) {
    throw new TokenVerificationError({
      reason: "token-invalid-authorized-parties" /* TokenInvalidAuthorizedParties */,
      message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(azp)}. Expected "${authorizedParties}".`
    });
  }
};
var assertIssuerClaim = (iss, issuer) => {
  if (typeof issuer === "function" && !issuer(iss)) {
    throw new TokenVerificationError({
      reason: "token-invalid-issuer" /* TokenInvalidIssuer */,
      message: "Failed JWT issuer resolver. Make sure that the resolver returns a truthy value."
    });
  } else if (typeof issuer === "string" && iss && iss !== issuer) {
    throw new TokenVerificationError({
      reason: "token-invalid-issuer" /* TokenInvalidIssuer */,
      message: `Invalid JWT issuer claim (iss) ${JSON.stringify(iss)}. Expected "${issuer}".`
    });
  }
};
var assertExpirationClaim = (exp, clockSkewInMs) => {
  if (typeof exp !== "number") {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-verification-failed" /* TokenVerificationFailed */,
      message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(exp)}. Expected number.`
    });
  }
  const currentDate = new Date(Date.now());
  const expiryDate = /* @__PURE__ */ new Date(0);
  expiryDate.setUTCSeconds(exp);
  const expired = expiryDate.getTime() <= currentDate.getTime() - clockSkewInMs;
  if (expired) {
    throw new TokenVerificationError({
      reason: "token-expired" /* TokenExpired */,
      message: `JWT is expired. Expiry date: ${expiryDate.toUTCString()}, Current date: ${currentDate.toUTCString()}.`
    });
  }
};
var assertActivationClaim = (nbf, clockSkewInMs) => {
  if (typeof nbf === "undefined") {
    return;
  }
  if (typeof nbf !== "number") {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-verification-failed" /* TokenVerificationFailed */,
      message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(nbf)}. Expected number.`
    });
  }
  const currentDate = new Date(Date.now());
  const notBeforeDate = /* @__PURE__ */ new Date(0);
  notBeforeDate.setUTCSeconds(nbf);
  const early = notBeforeDate.getTime() > currentDate.getTime() + clockSkewInMs;
  if (early) {
    throw new TokenVerificationError({
      reason: "token-not-active-yet" /* TokenNotActiveYet */,
      message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${notBeforeDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
    });
  }
};
var assertIssuedAtClaim = (iat, clockSkewInMs) => {
  if (typeof iat === "undefined") {
    return;
  }
  if (typeof iat !== "number") {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-verification-failed" /* TokenVerificationFailed */,
      message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(iat)}. Expected number.`
    });
  }
  const currentDate = new Date(Date.now());
  const issuedAtDate = /* @__PURE__ */ new Date(0);
  issuedAtDate.setUTCSeconds(iat);
  const postIssued = issuedAtDate.getTime() > currentDate.getTime() + clockSkewInMs;
  if (postIssued) {
    throw new TokenVerificationError({
      reason: "token-not-active-yet" /* TokenNotActiveYet */,
      message: `JWT issued at date claim (iat) is in the future. Issued at date: ${issuedAtDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
    });
  }
};

// src/tokens/jwt/cryptoKeys.ts

function pemToBuffer(secret) {
  const trimmed = secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "");
  const decoded = isomorphicAtob(trimmed);
  const buffer = new ArrayBuffer(decoded.length);
  const bufView = new Uint8Array(buffer);
  for (let i = 0, strLen = decoded.length; i < strLen; i++) {
    bufView[i] = decoded.charCodeAt(i);
  }
  return bufView;
}
function importKey(key, algorithm, keyUsage) {
  if (typeof key === "object") {
    return runtime_default.crypto.subtle.importKey("jwk", key, algorithm, false, [keyUsage]);
  }
  const keyData = pemToBuffer(key);
  const format = keyUsage === "sign" ? "pkcs8" : "spki";
  return runtime_default.crypto.subtle.importKey(format, keyData, algorithm, false, [keyUsage]);
}

// src/tokens/jwt/verifyJwt.ts
var DEFAULT_CLOCK_SKEW_IN_SECONDS = 5 * 1e3;
async function hasValidSignature(jwt, key) {
  const { header, signature, raw } = jwt;
  const encoder = new TextEncoder();
  const data = encoder.encode([raw.header, raw.payload].join("."));
  const algorithm = getCryptoAlgorithm(header.alg);
  const cryptoKey = await importKey(key, algorithm, "verify");
  return runtime_default.crypto.subtle.verify(algorithm.name, cryptoKey, signature, data);
}
function esm_decodeJwt(token) {
  const tokenParts = (token || "").toString().split(".");
  if (tokenParts.length !== 3) {
    throw new TokenVerificationError({
      reason: "token-invalid" /* TokenInvalid */,
      message: `Invalid JWT form. A JWT consists of three parts separated by dots.`
    });
  }
  const [rawHeader, rawPayload, rawSignature] = tokenParts;
  const decoder = new TextDecoder();
  const header = JSON.parse(decoder.decode(base64url.parse(rawHeader, { loose: true })));
  const payload = JSON.parse(decoder.decode(base64url.parse(rawPayload, { loose: true })));
  const signature = base64url.parse(rawSignature, { loose: true });
  deprecatedObjectProperty(
    payload,
    "orgs",
    'Add orgs to your session token using the "user.organizations" shortcode in JWT Templates instead.',
    "decodeJwt:orgs"
  );
  return {
    header,
    payload,
    signature,
    raw: {
      header: rawHeader,
      payload: rawPayload,
      signature: rawSignature,
      text: token
    }
  };
}
async function verifyJwt(token, { audience, authorizedParties, clockSkewInSeconds, clockSkewInMs, issuer, key }) {
  if (clockSkewInSeconds) {
    chunk_IC4FGZI3_deprecated("clockSkewInSeconds", "Use `clockSkewInMs` instead.");
  }
  const clockSkew = clockSkewInMs || clockSkewInSeconds || DEFAULT_CLOCK_SKEW_IN_SECONDS;
  const decoded = esm_decodeJwt(token);
  const { header, payload } = decoded;
  const { typ, alg } = header;
  assertHeaderType(typ);
  assertHeaderAlgorithm(alg);
  const { azp, sub, aud, iss, iat, exp, nbf } = payload;
  assertSubClaim(sub);
  assertAudienceClaim([aud], [audience]);
  assertAuthorizedPartiesClaim(azp, authorizedParties);
  assertIssuerClaim(iss, issuer);
  assertExpirationClaim(exp, clockSkew);
  assertActivationClaim(nbf, clockSkew);
  assertIssuedAtClaim(iat, clockSkew);
  let signatureValid;
  try {
    signatureValid = await hasValidSignature(decoded, key);
  } catch (err) {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
      reason: "token-verification-failed" /* TokenVerificationFailed */,
      message: `Error verifying JWT signature. ${err}`
    });
  }
  if (!signatureValid) {
    throw new TokenVerificationError({
      reason: "token-invalid-signature" /* TokenInvalidSignature */,
      message: "JWT signature is invalid."
    });
  }
  return payload;
}

// src/tokens/jwt/signJwt.ts
function encodeJwtData(value) {
  const stringified = JSON.stringify(value);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(stringified);
  return base64url.stringify(encoded, { pad: false });
}
async function signJwt(payload, key, options) {
  if (!options.algorithm) {
    throw new Error("No algorithm specified");
  }
  const encoder = new TextEncoder();
  const algorithm = getCryptoAlgorithm(options.algorithm);
  if (!algorithm) {
    throw new Error(`Unsupported algorithm ${options.algorithm}`);
  }
  const cryptoKey = await importKey(key, algorithm, "sign");
  const header = options.header || { typ: "JWT" };
  header.alg = options.algorithm;
  payload.iat = Math.floor(Date.now() / 1e3);
  const encodedHeader = encodeJwtData(header);
  const encodedPayload = encodeJwtData(payload);
  const firstPart = `${encodedHeader}.${encodedPayload}`;
  const signature = await runtime_default.crypto.subtle.sign(algorithm, cryptoKey, encoder.encode(firstPart));
  return `${firstPart}.${base64url.stringify(new Uint8Array(signature), { pad: false })}`;
}

// src/tokens/keys.ts
var esm_cache = {};
var lastUpdatedAt = 0;
function getFromCache(kid) {
  return esm_cache[kid];
}
function getCacheValues() {
  return Object.values(esm_cache);
}
function setInCache(jwk, shouldExpire = true) {
  esm_cache[jwk.kid] = jwk;
  lastUpdatedAt = shouldExpire ? Date.now() : -1;
}
var LocalJwkKid = "local";
var PEM_HEADER = "-----BEGIN PUBLIC KEY-----";
var PEM_TRAILER = "-----END PUBLIC KEY-----";
var RSA_PREFIX = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA";
var RSA_SUFFIX = "IDAQAB";
function loadClerkJWKFromLocal(localKey) {
  if (!getFromCache(LocalJwkKid)) {
    if (!localKey) {
      throw new TokenVerificationError({
        action: "Set the CLERK_JWT_KEY environment variable." /* SetClerkJWTKey */,
        message: "Missing local JWK.",
        reason: "jwk-local-missing" /* LocalJWKMissing */
      });
    }
    const modulus = localKey.replace(/(\r\n|\n|\r)/gm, "").replace(PEM_HEADER, "").replace(PEM_TRAILER, "").replace(RSA_PREFIX, "").replace(RSA_SUFFIX, "").replace(/\+/g, "-").replace(/\//g, "_");
    setInCache(
      {
        kid: "local",
        kty: "RSA",
        alg: "RS256",
        n: modulus,
        e: "AQAB"
      },
      false
      // local key never expires in cache
    );
  }
  return getFromCache(LocalJwkKid);
}
async function loadClerkJWKFromRemote({
  apiKey,
  secretKey,
  apiUrl = API_URL,
  apiVersion = API_VERSION,
  issuer,
  kid,
  skipJwksCache
}) {
  if (cacheHasExpired()) {
    esm_cache = {};
  }
  const shouldRefreshCache = !getFromCache(kid);
  if (skipJwksCache || shouldRefreshCache) {
    let fetcher;
    const key = secretKey || apiKey;
    if (key) {
      fetcher = () => fetchJWKSFromBAPI(apiUrl, key, apiVersion);
    } else if (issuer) {
      fetcher = () => fetchJWKSFromFAPI(issuer);
    } else {
      throw new TokenVerificationError({
        action: "Contact support@clerk.com" /* ContactSupport */,
        message: "Failed to load JWKS from Clerk Backend or Frontend API.",
        reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
      });
    }
    const { keys } = await callWithRetry(fetcher);
    if (!keys || !keys.length) {
      throw new TokenVerificationError({
        action: "Contact support@clerk.com" /* ContactSupport */,
        message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.",
        reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
      });
    }
    keys.forEach((key2) => setInCache(key2));
  }
  const jwk = getFromCache(kid);
  if (!jwk) {
    const cacheValues = getCacheValues();
    const jwkKeys = cacheValues.map((jwk2) => jwk2.kid).join(", ");
    throw new TokenVerificationError({
      action: "Contact support@clerk.com" /* ContactSupport */,
      message: `Unable to find a signing key in JWKS that matches the kid='${kid}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT.${jwkKeys ? ` The following kid are available: ${jwkKeys}` : ""}`,
      reason: "jwk-remote-missing" /* RemoteJWKMissing */
    });
  }
  return jwk;
}
async function fetchJWKSFromFAPI(issuer) {
  const url = new URL(issuer);
  url.pathname = joinPaths(url.pathname, ".well-known/jwks.json");
  const response = await runtime_default.fetch(url.href);
  if (!response.ok) {
    throw new TokenVerificationError({
      action: "Contact support@clerk.com" /* ContactSupport */,
      message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
      reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
    });
  }
  return response.json();
}
async function fetchJWKSFromBAPI(apiUrl, key, apiVersion) {
  if (!key) {
    throw new TokenVerificationError({
      action: "Set the CLERK_SECRET_KEY or CLERK_API_KEY environment variable." /* SetClerkSecretKeyOrAPIKey */,
      message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.",
      reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
    });
  }
  const url = new URL(apiUrl);
  url.pathname = joinPaths(url.pathname, apiVersion, "/jwks");
  const response = await runtime_default.fetch(url.href, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const json = await response.json();
    const invalidSecretKeyError = getErrorObjectByCode(json?.errors, "clerk_key_invalid" /* InvalidSecretKey */);
    if (invalidSecretKeyError) {
      const reason = "secret-key-invalid" /* InvalidSecretKey */;
      throw new TokenVerificationError({
        action: "Contact support@clerk.com" /* ContactSupport */,
        message: invalidSecretKeyError.message,
        reason
      });
    }
    throw new TokenVerificationError({
      action: "Contact support@clerk.com" /* ContactSupport */,
      message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
      reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
    });
  }
  return response.json();
}
function cacheHasExpired() {
  if (lastUpdatedAt === -1) {
    return false;
  }
  const isExpired = Date.now() - lastUpdatedAt >= MAX_CACHE_LAST_UPDATED_AT_SECONDS * 1e3;
  return isExpired;
}

// src/tokens/verify.ts
async function verifyToken(token, options) {
  const {
    apiKey,
    secretKey,
    apiUrl,
    apiVersion,
    audience,
    authorizedParties,
    clockSkewInSeconds,
    clockSkewInMs,
    issuer,
    jwksCacheTtlInMs,
    jwtKey,
    skipJwksCache
  } = options;
  if (options.apiKey) {
    chunk_IC4FGZI3_deprecated("apiKey", "Use `secretKey` instead.");
  }
  const { header } = esm_decodeJwt(token);
  const { kid } = header;
  let key;
  if (jwtKey) {
    key = loadClerkJWKFromLocal(jwtKey);
  } else if (typeof issuer === "string") {
    key = await loadClerkJWKFromRemote({ issuer, kid, jwksCacheTtlInMs, skipJwksCache });
  } else if (apiKey || secretKey) {
    key = await loadClerkJWKFromRemote({ apiKey, secretKey, apiUrl, apiVersion, kid, jwksCacheTtlInMs, skipJwksCache });
  } else {
    throw new TokenVerificationError({
      action: "Set the CLERK_JWT_KEY environment variable." /* SetClerkJWTKey */,
      message: "Failed to resolve JWK during verification.",
      reason: "jwk-failed-to-resolve" /* JWKFailedToResolve */
    });
  }
  return await verifyJwt(token, {
    audience,
    authorizedParties,
    clockSkewInSeconds,
    clockSkewInMs,
    key,
    issuer
  });
}

// src/tokens/interstitialRule.ts
var shouldRedirectToSatelliteUrl = (qp) => !!qp?.get("__clerk_satellite_url");
var hasJustSynced = (qp) => qp?.get("__clerk_synced") === "true";
var VALID_USER_AGENTS = /^Mozilla\/|(Amazon CloudFront)/;
var isBrowser = (userAgent) => VALID_USER_AGENTS.test(userAgent || "");
var nonBrowserRequestInDevRule = (options) => {
  const { apiKey, secretKey, userAgent } = options;
  const key = secretKey || apiKey || "";
  if (isDevelopmentFromApiKey(key) && !isBrowser(userAgent)) {
    return signedOut(options, "header-missing-non-browser" /* HeaderMissingNonBrowser */);
  }
  return void 0;
};
var crossOriginRequestWithoutHeader = (options) => {
  const { origin, host, forwardedHost, forwardedProto } = options;
  const isCrossOrigin = origin && checkCrossOrigin({
    originURL: new URL(origin),
    host,
    forwardedHost,
    forwardedProto
  });
  if (isCrossOrigin) {
    return signedOut(options, "header-missing-cors" /* HeaderMissingCORS */);
  }
  return void 0;
};
var isPrimaryInDevAndRedirectsToSatellite = (options) => {
  const { apiKey, secretKey, isSatellite, searchParams } = options;
  const key = secretKey || apiKey || "";
  const isDev = isDevelopmentFromApiKey(key);
  if (isDev && !isSatellite && shouldRedirectToSatelliteUrl(searchParams)) {
    return interstitial(options, "primary-responds-to-syncing" /* PrimaryRespondsToSyncing */);
  }
  return void 0;
};
var potentialFirstLoadInDevWhenUATMissing = (options) => {
  const { apiKey, secretKey, clientUat } = options;
  const key = secretKey || apiKey || "";
  const res = isDevelopmentFromApiKey(key);
  if (res && !clientUat) {
    return interstitial(options, "uat-missing" /* CookieUATMissing */);
  }
  return void 0;
};
var potentialRequestAfterSignInOrOutFromClerkHostedUiInDev = (options) => {
  const { apiKey, secretKey, referrer, host, forwardedHost, forwardedProto } = options;
  const crossOriginReferrer = referrer && checkCrossOrigin({ originURL: new URL(referrer), host, forwardedHost, forwardedProto });
  const key = secretKey || apiKey || "";
  if (isDevelopmentFromApiKey(key) && crossOriginReferrer) {
    return interstitial(options, "cross-origin-referrer" /* CrossOriginReferrer */);
  }
  return void 0;
};
var potentialFirstRequestOnProductionEnvironment = (options) => {
  const { apiKey, secretKey, clientUat, cookieToken } = options;
  const key = secretKey || apiKey || "";
  if (isProductionFromApiKey(key) && !clientUat && !cookieToken) {
    return signedOut(options, "cookie-and-uat-missing" /* CookieAndUATMissing */);
  }
  return void 0;
};
var isNormalSignedOutState = (options) => {
  const { clientUat } = options;
  if (clientUat === "0") {
    return signedOut(options, "standard-signed-out" /* StandardSignedOut */);
  }
  return void 0;
};
var hasPositiveClientUatButCookieIsMissing = (options) => {
  const { clientUat, cookieToken } = options;
  if (clientUat && Number.parseInt(clientUat) > 0 && !cookieToken) {
    return interstitial(options, "cookie-missing" /* CookieMissing */);
  }
  return void 0;
};
var hasValidHeaderToken = async (options) => {
  const { headerToken } = options;
  const sessionClaims = await verifyRequestState(options, headerToken);
  return await signedIn({ ...options, token: headerToken }, sessionClaims);
};
var hasValidCookieToken = async (options) => {
  const { cookieToken, clientUat } = options;
  const sessionClaims = await verifyRequestState(options, cookieToken);
  const state = await signedIn({ ...options, token: cookieToken }, sessionClaims);
  const jwt = state.toAuth().sessionClaims;
  const cookieTokenIsOutdated = jwt.iat < Number.parseInt(clientUat);
  if (!clientUat || cookieTokenIsOutdated) {
    return interstitial(options, "cookie-outdated" /* CookieOutDated */);
  }
  return state;
};
async function runInterstitialRules(opts, rules) {
  for (const rule of rules) {
    const res = await rule(opts);
    if (res) {
      return res;
    }
  }
  return signedOut(opts, "unexpected-error" /* UnexpectedError */);
}
async function verifyRequestState(options, token) {
  const { isSatellite, proxyUrl } = options;
  let issuer;
  if (isSatellite) {
    issuer = null;
  } else if (proxyUrl) {
    issuer = proxyUrl;
  } else {
    issuer = (iss) => iss.startsWith("https://clerk.") || iss.includes(".clerk.accounts");
  }
  return verifyToken(token, { ...options, issuer });
}
var isSatelliteAndNeedsSyncing = (options) => {
  const { clientUat, isSatellite, searchParams, userAgent } = options;
  const isSignedOut = !clientUat || clientUat === "0";
  if (isSatellite && isSignedOut && !isBrowser(userAgent)) {
    return signedOut(options, "satellite-needs-syncing" /* SatelliteCookieNeedsSyncing */);
  }
  if (isSatellite && isSignedOut && !hasJustSynced(searchParams)) {
    return interstitial(options, "satellite-needs-syncing" /* SatelliteCookieNeedsSyncing */);
  }
  return void 0;
};

// src/tokens/request.ts
function assertSignInUrlExists(signInUrl, key) {
  if (!signInUrl && isDevelopmentFromApiKey(key)) {
    throw new Error(`Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite`);
  }
}
function assertProxyUrlOrDomain(proxyUrlOrDomain) {
  if (!proxyUrlOrDomain) {
    throw new Error(`Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl`);
  }
}
function assertSignInUrlFormatAndOrigin(_signInUrl, origin) {
  let signInUrl;
  try {
    signInUrl = new URL(_signInUrl);
  } catch {
    throw new Error(`The signInUrl needs to have a absolute url format.`);
  }
  if (signInUrl.origin === origin) {
    throw new Error(`The signInUrl needs to be on a different origin than your satellite application.`);
  }
}
async function authenticateRequest(options) {
  const { cookies, headers, searchParams } = buildRequest2(options?.request);
  if (options.frontendApi) {
    chunk_IC4FGZI3_deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  if (options.apiKey) {
    chunk_IC4FGZI3_deprecated("apiKey", "Use `secretKey` instead.");
  }
  options = {
    ...options,
    ...loadOptionsFromHeaders(options, headers),
    frontendApi: parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi,
    apiUrl: options.apiUrl || API_URL,
    apiVersion: options.apiVersion || API_VERSION,
    cookieToken: options.cookieToken || cookies?.(esm_constants.Cookies.Session),
    clientUat: options.clientUat || cookies?.(esm_constants.Cookies.ClientUat),
    searchParams: options.searchParams || searchParams || void 0
  };
  assertValidSecretKey(options.secretKey || options.apiKey);
  if (options.isSatellite) {
    assertSignInUrlExists(options.signInUrl, options.secretKey || options.apiKey);
    if (options.signInUrl && options.origin) {
      assertSignInUrlFormatAndOrigin(options.signInUrl, options.origin);
    }
    assertProxyUrlOrDomain(options.proxyUrl || options.domain);
  }
  async function authenticateRequestWithTokenInHeader() {
    try {
      const state = await runInterstitialRules(options, [hasValidHeaderToken]);
      return state;
    } catch (err) {
      return handleError(err, "header");
    }
  }
  async function authenticateRequestWithTokenInCookie() {
    try {
      const state = await runInterstitialRules(options, [
        crossOriginRequestWithoutHeader,
        nonBrowserRequestInDevRule,
        isSatelliteAndNeedsSyncing,
        isPrimaryInDevAndRedirectsToSatellite,
        potentialFirstRequestOnProductionEnvironment,
        potentialFirstLoadInDevWhenUATMissing,
        potentialRequestAfterSignInOrOutFromClerkHostedUiInDev,
        hasPositiveClientUatButCookieIsMissing,
        isNormalSignedOutState,
        hasValidCookieToken
      ]);
      return state;
    } catch (err) {
      return handleError(err, "cookie");
    }
  }
  function handleError(err, tokenCarrier) {
    if (err instanceof TokenVerificationError) {
      err.tokenCarrier = tokenCarrier;
      const reasonToReturnInterstitial = [
        "token-expired" /* TokenExpired */,
        "token-not-active-yet" /* TokenNotActiveYet */
      ].includes(err.reason);
      if (reasonToReturnInterstitial) {
        if (tokenCarrier === "header") {
          return unknownState(options, err.reason, err.getFullMessage());
        }
        return interstitial(options, err.reason, err.getFullMessage());
      }
      return signedOut(options, err.reason, err.getFullMessage());
    }
    return signedOut(options, "unexpected-error" /* UnexpectedError */, err.message);
  }
  if (options.headerToken) {
    return authenticateRequestWithTokenInHeader();
  }
  return authenticateRequestWithTokenInCookie();
}
var debugRequestState = (params) => {
  const { frontendApi, isSignedIn, proxyUrl, isInterstitial, reason, message, publishableKey, isSatellite, domain } = params;
  return { frontendApi, isSignedIn, proxyUrl, isInterstitial, reason, message, publishableKey, isSatellite, domain };
};
var loadOptionsFromHeaders = (options, headers) => {
  if (!headers) {
    return {};
  }
  return {
    headerToken: stripAuthorizationHeader(options.headerToken || headers(esm_constants.Headers.Authorization)),
    origin: options.origin || headers(esm_constants.Headers.Origin),
    host: options.host || headers(esm_constants.Headers.Host),
    forwardedHost: options.forwardedHost || headers(esm_constants.Headers.ForwardedHost),
    forwardedPort: options.forwardedPort || headers(esm_constants.Headers.ForwardedPort),
    forwardedProto: options.forwardedProto || headers(esm_constants.Headers.CloudFrontForwardedProto) || headers(esm_constants.Headers.ForwardedProto),
    referrer: options.referrer || headers(esm_constants.Headers.Referrer),
    userAgent: options.userAgent || headers(esm_constants.Headers.UserAgent)
  };
};

// src/tokens/factory.ts
function createAuthenticateRequest(params) {
  const { apiClient } = params;
  const {
    apiKey: buildtimeApiKey = "",
    secretKey: buildtimeSecretKey = "",
    jwtKey: buildtimeJwtKey = "",
    apiUrl = API_URL,
    apiVersion = API_VERSION,
    frontendApi: buildtimeFrontendApi = "",
    proxyUrl: buildProxyUrl = "",
    publishableKey: buildtimePublishableKey = "",
    isSatellite: buildtimeIsSatellite = false,
    domain: buildtimeDomain = "",
    audience: buildtimeAudience = "",
    userAgent: buildUserAgent
  } = params.options;
  const authenticateRequest2 = ({
    apiKey: runtimeApiKey,
    secretKey: runtimeSecretKey,
    audience: runtimeAudience,
    frontendApi: runtimeFrontendApi,
    proxyUrl: runtimeProxyUrl,
    publishableKey: runtimePublishableKey,
    jwtKey: runtimeJwtKey,
    isSatellite: runtimeIsSatellite,
    domain: runtimeDomain,
    searchParams,
    ...rest
  }) => {
    return authenticateRequest({
      ...rest,
      apiKey: runtimeApiKey || buildtimeApiKey,
      secretKey: runtimeSecretKey || buildtimeSecretKey,
      audience: runtimeAudience || buildtimeAudience,
      apiUrl,
      apiVersion,
      frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
      proxyUrl: runtimeProxyUrl || buildProxyUrl,
      publishableKey: runtimePublishableKey || buildtimePublishableKey,
      isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
      domain: runtimeDomain || buildtimeDomain,
      jwtKey: runtimeJwtKey || buildtimeJwtKey,
      searchParams
    });
  };
  const localInterstitial = ({
    frontendApi: runtimeFrontendApi,
    publishableKey: runtimePublishableKey,
    proxyUrl: runtimeProxyUrl,
    isSatellite: runtimeIsSatellite,
    domain: runtimeDomain,
    ...rest
  }) => loadInterstitialFromLocal({
    ...rest,
    frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
    proxyUrl: runtimeProxyUrl || buildProxyUrl,
    publishableKey: runtimePublishableKey || buildtimePublishableKey,
    isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
    domain: runtimeDomain || buildtimeDomain
  });
  const remotePublicInterstitial = ({
    frontendApi: runtimeFrontendApi,
    publishableKey: runtimePublishableKey,
    proxyUrl: runtimeProxyUrl,
    isSatellite: runtimeIsSatellite,
    domain: runtimeDomain,
    userAgent: runtimeUserAgent,
    ...rest
  }) => {
    return loadInterstitialFromBAPI({
      ...rest,
      apiUrl,
      frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
      publishableKey: runtimePublishableKey || buildtimePublishableKey,
      proxyUrl: runtimeProxyUrl || buildProxyUrl,
      isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
      domain: runtimeDomain || buildtimeDomain,
      userAgent: runtimeUserAgent || buildUserAgent
    });
  };
  const remotePublicInterstitialUrl = buildPublicInterstitialUrl;
  const remotePrivateInterstitial = () => apiClient.interstitial.getInterstitial();
  return {
    authenticateRequest: authenticateRequest2,
    localInterstitial,
    remotePublicInterstitial,
    remotePrivateInterstitial,
    remotePublicInterstitialUrl,
    debugRequestState
  };
}

// src/redirections.ts
var buildUrl = (targetUrl, redirectUrl) => {
  let url;
  if (!targetUrl.startsWith("http")) {
    if (!redirectUrl || !redirectUrl.startsWith("http")) {
      throw new Error("destination url or return back url should be an absolute path url!");
    }
    const baseURL = new URL(redirectUrl);
    url = new URL(targetUrl, baseURL.origin);
  } else {
    url = new URL(targetUrl);
  }
  if (redirectUrl) {
    url.searchParams.set("redirect_url", redirectUrl);
  }
  return url.toString();
};
function esm_redirect({ redirectAdapter, signUpUrl, signInUrl, frontendApi, publishableKey }) {
  if (!frontendApi) {
    frontendApi = parsePublishableKey(publishableKey)?.frontendApi;
  } else {
    chunk_IC4FGZI3_deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  const accountsBaseUrl = buildAccountsBaseUrl(frontendApi);
  const redirectToSignUp = ({ returnBackUrl } = {}) => {
    if (!signUpUrl && !accountsBaseUrl) {
      errorThrower.throwMissingPublishableKeyError();
    }
    const accountsSignUpUrl = `${accountsBaseUrl}/sign-up`;
    return redirectAdapter(buildUrl(signUpUrl || accountsSignUpUrl, returnBackUrl));
  };
  const redirectToSignIn = ({ returnBackUrl } = {}) => {
    if (!signInUrl && !accountsBaseUrl) {
      errorThrower.throwMissingPublishableKeyError();
    }
    const accountsSignInUrl = `${accountsBaseUrl}/sign-in`;
    return redirectAdapter(buildUrl(signInUrl || accountsSignInUrl, returnBackUrl));
  };
  return { redirectToSignUp, redirectToSignIn };
}
function buildAccountsBaseUrl(frontendApi) {
  if (!frontendApi) {
    return "";
  }
  const accountsBaseUrl = frontendApi.replace(/(clerk\.accountsstage\.)/, "accountsstage.").replace(/(clerk\.accounts\.|clerk\.)/, "accounts.");
  return `https://${accountsBaseUrl}`;
}

// src/index.ts
function esm_Clerk(options) {
  const opts = { ...options };
  const apiClient = createBackendApiClient(opts);
  const requestState = createAuthenticateRequest({ options: opts, apiClient });
  const clerkInstance = {
    ...apiClient,
    ...requestState,
    /**
     * @deprecated This prop has been deprecated and will be removed in the next major release.
     */
    __unstable_options: opts
  };
  deprecatedObjectProperty(
    clerkInstance,
    "__unstable_options",
    "Use `createClerkClient({...})` to create a new clerk instance instead."
  );
  return clerkInstance;
}

//# sourceMappingURL=index.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/constants.js

const JS_VERSION = process.env.CLERK_JS_VERSION || "";
if (JS_VERSION) {
  chunk_IC4FGZI3_deprecated("CLERK_JS_VERSION", "Use `NEXT_PUBLIC_CLERK_JS_VERSION` environment variable instead.");
}
const CLERK_JS_VERSION = process.env.NEXT_PUBLIC_CLERK_JS_VERSION || "";
const CLERK_JS_URL = process.env.NEXT_PUBLIC_CLERK_JS || "";
const constants_API_URL = process.env.CLERK_API_URL || "https://api.clerk.dev";
const constants_API_VERSION = process.env.CLERK_API_VERSION || "v1";
const API_KEY = process.env.CLERK_API_KEY || "";
if (API_KEY) {
  chunk_IC4FGZI3_deprecated("CLERK_API_KEY", "Use `CLERK_SECRET_KEY` environment variable instead.");
}
const SECRET_KEY = process.env.CLERK_SECRET_KEY || "";
const FRONTEND_API = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || "";
if (FRONTEND_API) {
  chunk_IC4FGZI3_deprecated("NEXT_PUBLIC_CLERK_FRONTEND_API", "Use `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` environment variable instead.");
}
const PUBLISHABLE_KEY = "pk_test_dXByaWdodC1yZXB0aWxlLTU5LmNsZXJrLmFjY291bnRzLmRldiQ" || 0;
const DOMAIN = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "";
const PROXY_URL = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "";
const IS_SATELLITE = process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE === "true" || false;
const SIGN_IN_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
const SIGN_UP_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";

//# sourceMappingURL=constants.js.map
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
;// ./node_modules/@clerk/shared/dist/handleValueOrFn.mjs



//# sourceMappingURL=handleValueOrFn.mjs.map
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
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/ua-parser-js/ua-parser.js
var ua_parser = __webpack_require__(280);
;// ./node_modules/next/dist/esm/server/web/spec-extension/user-agent.js

function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...parseua(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers }) {
    return userAgentFromString(headers.get('user-agent') || undefined);
}

//# sourceMappingURL=user-agent.js.map
;// ./node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js
const GlobalURLPattern = // @ts-expect-error: URLPattern is not available in Node.js
typeof URLPattern === 'undefined' ? undefined : URLPattern;


//# sourceMappingURL=url-pattern.js.map
;// ./node_modules/next/dist/esm/server/after/after.js

/**
 * This function allows you to schedule callbacks to be executed after the current request finishes.
 */ function after(task) {
    const workStore = workAsyncStorage.getStore();
    if (!workStore) {
        // TODO(after): the linked docs page talks about *dynamic* APIs, which after soon won't be anymore
        throw Object.defineProperty(new Error('`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context'), "__NEXT_ERROR_CODE", {
            value: "E468",
            enumerable: false,
            configurable: true
        });
    }
    const { afterContext } = workStore;
    return afterContext.after(task);
}

//# sourceMappingURL=after.js.map
;// ./node_modules/next/dist/esm/server/after/index.js


//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js + 1 modules
var dynamic_rendering = __webpack_require__(557);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/static-generation-bailout.js
var static_generation_bailout = __webpack_require__(602);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/dynamic-rendering-utils.js
var dynamic_rendering_utils = __webpack_require__(801);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/request/utils.js
var utils = __webpack_require__(335);
;// ./node_modules/next/dist/esm/server/request/connection.js






/**
 * This function allows you to indicate that you require an actual user Request before continuing.
 *
 * During prerendering it will never resolve and during rendering it resolves immediately.
 */ function connection() {
    const workStore = workAsyncStorage.getStore();
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !isRequestAPICallableInsideAfter()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E186",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            return Promise.resolve(undefined);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                    value: "E111",
                    enumerable: false,
                    configurable: true
                });
            } else if (workUnitStore.type === 'unstable-cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                    value: "E1",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E562",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                // We return a promise that never resolves to allow the prender to stall at this point
                return makeHangingPromise(workUnitStore.renderSignal, '`connection()`');
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                // We use React's postpone API to interrupt rendering here to create a dynamic hole
                postponeWithTracking(workStore.route, 'connection', workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We throw an error here to interrupt prerendering to mark the route as dynamic
                throwToInterruptStaticGeneration('connection', workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using headers inside a cache context
        trackDynamicDataInDynamicRender(workStore, workUnitStore);
    }
    return Promise.resolve(undefined);
}

//# sourceMappingURL=connection.js.map
;// ./node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js
// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function reflect_utils_describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return "`" + target + "." + prop + "`";
    }
    return "`" + target + "[" + JSON.stringify(prop) + "]`";
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
}
const reflect_utils_wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    // fallthrough
    'then',
    'catch',
    'finally',
    // React Promise extension
    // fallthrough
    'status',
    // React introspection
    'displayName',
    // Common tested properties
    // fallthrough
    'toJSON',
    '$$typeof',
    '__esModule'
]); //# sourceMappingURL=reflect-utils.js.map

;// ./node_modules/next/dist/esm/server/request/root-params.js






const CachedParams = new WeakMap();
async function unstable_rootParams() {
    const workStore = workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new InvariantError('Missing workStore in unstable_rootParams'), "__NEXT_ERROR_CODE", {
            value: "E615",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (!workUnitStore) {
        throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
            value: "E641",
            enumerable: false,
            configurable: true
        });
    }
    switch(workUnitStore.type){
        case 'unstable-cache':
        case 'cache':
            {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                    value: "E642",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
            return createPrerenderRootParams(workUnitStore.rootParams, workStore, workUnitStore);
        default:
            return Promise.resolve(workUnitStore.rootParams);
    }
}
function createPrerenderRootParams(underlyingParams, workStore, prerenderStore) {
    const fallbackParams = workStore.fallbackRouteParams;
    if (fallbackParams) {
        let hasSomeFallbackParams = false;
        for(const key in underlyingParams){
            if (fallbackParams.has(key)) {
                hasSomeFallbackParams = true;
                break;
            }
        }
        if (hasSomeFallbackParams) {
            // params need to be treated as dynamic because we have at least one fallback param
            if (prerenderStore.type === 'prerender') {
                // We are in a dynamicIO (PPR or otherwise) prerender
                const cachedParams = CachedParams.get(underlyingParams);
                if (cachedParams) {
                    return cachedParams;
                }
                const promise = makeHangingPromise(prerenderStore.renderSignal, '`unstable_rootParams`');
                CachedParams.set(underlyingParams, promise);
                return promise;
            }
            // remaining cases are prerender-ppr and prerender-legacy
            // We aren't in a dynamicIO prerender but we do have fallback params at this
            // level so we need to make an erroring params object which will postpone
            // if you access the fallback params
            return makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore);
        }
    }
    // We don't have any fallback params so we have an entirely static safe params object
    return Promise.resolve(underlyingParams);
}
function makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const augmentedUnderlying = {
        ...underlyingParams
    };
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(augmentedUnderlying);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            if (fallbackParams.has(prop)) {
                Object.defineProperty(augmentedUnderlying, prop, {
                    get () {
                        const expression = describeStringPropertyAccess('unstable_rootParams', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when dynamicIO is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no dynamicIO)
                            postponeWithTracking(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            throwToInterruptStaticGeneration(expression, workStore, prerenderStore);
                        }
                    },
                    enumerable: true
                });
            } else {
                ;
                promise[prop] = underlyingParams[prop];
            }
        }
    });
    return promise;
}

//# sourceMappingURL=root-params.js.map
;// ./node_modules/next/dist/esm/server/web/exports/index.js
// Alias index file of next/server for edge runtime for tree-shaking purpose









//# sourceMappingURL=index.js.map
;// ./node_modules/next/dist/esm/api/server.js


//# sourceMappingURL=server.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/constants.js
const constants_Headers = {
  NextRewrite: "x-middleware-rewrite",
  NextResume: "x-middleware-next",
  NextRedirect: "Location"
};
const constants_constants = {
  Headers: constants_Headers
};

//# sourceMappingURL=constants.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/errors.js
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
;// ./node_modules/@clerk/nextjs/dist/esm/server/utils.js







function setCustomAttributeOnRequest(req, key, value) {
  Object.assign(req, { [key]: value });
}
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  const val = getCustomAttributeFromRequest(req, esm_constants.Attributes[key]) || utils_getHeader(req, esm_constants.Headers[key]);
  if (val) {
    return val;
  }
  if (key === "AuthStatus" || key === "AuthToken") {
    return getQueryParam(req, key) || void 0;
  }
  return void 0;
}
function getAuthStatusFromRequest(req) {
  return getCustomAttributeFromRequest(req, constants.Attributes.AuthStatus) || utils_getHeader(req, constants.Headers.AuthStatus) || getQueryParam(req, constants.SearchParams.AuthStatus);
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
function utils_getHeader(req, name) {
  var _a, _b;
  if (isNextRequest(req)) {
    return req.headers.get(name);
  }
  return req.headers[name] || req.headers[name.toLowerCase()] || ((_b = (_a = req.socket) == null ? void 0 : _a._httpMessage) == null ? void 0 : _b.getHeader(name));
}
function utils_getCookie(req, name) {
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
    const res = NextResponse.next({ request: { headers: new Headers({ [headerKey]: "true" }) } });
    return res.headers.has(headerKeyInRes);
  } catch (e) {
    return false;
  }
};
const injectSSRStateIntoObject = (obj, authObject) => {
  const __clerk_ssr_state =  false ? 0 : { ...authObject };
  return { ...obj, __clerk_ssr_state };
};
function utils_isDevelopmentFromApiKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function decorateRequest(req, res, requestState) {
  const { reason, message, status, token } = requestState;
  if (!res) {
    res = NextResponse.next();
  }
  if (res.headers.get(constants_constants.Headers.NextRedirect)) {
    return res;
  }
  let rewriteURL;
  if (res.headers.get(constants_constants.Headers.NextResume) === "1") {
    res.headers.delete(constants_constants.Headers.NextResume);
    rewriteURL = new URL(req.url);
  }
  const rewriteURLHeader = res.headers.get(constants_constants.Headers.NextRewrite);
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
        [esm_constants.Headers.AuthStatus]: status,
        [esm_constants.Headers.AuthToken]: token || "",
        [esm_constants.Headers.AuthMessage]: message || "",
        [esm_constants.Headers.AuthReason]: reason || ""
      });
    } else {
      res.headers.set(esm_constants.Headers.AuthStatus, status);
      res.headers.set(esm_constants.Headers.AuthToken, token || "");
      res.headers.set(esm_constants.Headers.AuthMessage, message || "");
      res.headers.set(esm_constants.Headers.AuthReason, reason || "");
      rewriteURL.searchParams.set(esm_constants.SearchParams.AuthStatus, status);
      rewriteURL.searchParams.set(esm_constants.SearchParams.AuthToken, token || "");
      rewriteURL.searchParams.set(esm_constants.Headers.AuthMessage, message || "");
      rewriteURL.searchParams.set(esm_constants.Headers.AuthReason, reason || "");
    }
    res.headers.set(constants_constants.Headers.NextRewrite, rewriteURL.href);
  }
  return res;
}
const apiEndpointUnauthorizedNextResponse = () => {
  return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
};
const isCrossOrigin = (from, to) => {
  const fromUrl = new URL(from);
  const toUrl = new URL(to);
  return fromUrl.origin !== toUrl.origin;
};
const handleMultiDomainAndProxy = (req, opts) => {
  const requestURL = buildRequestUrl(req);
  const relativeOrAbsoluteProxyUrl = handleValueOrFn(opts == null ? void 0 : opts.proxyUrl, requestURL, PROXY_URL);
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && !isHttpOrHttps(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, requestURL).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  const isSatellite = handleValueOrFn(opts.isSatellite, new URL(req.url), IS_SATELLITE);
  const domain = handleValueOrFn(opts.domain, new URL(req.url), DOMAIN);
  const signInUrl = (opts == null ? void 0 : opts.signInUrl) || SIGN_IN_URL;
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(missingDomainAndProxy);
  }
  if (isSatellite && !isHttpOrHttps(signInUrl) && utils_isDevelopmentFromApiKey(SECRET_KEY || API_KEY)) {
    throw new Error(missingSignInUrlInDev);
  }
  return {
    proxyUrl,
    isSatellite,
    domain,
    signInUrl
  };
};

//# sourceMappingURL=utils.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/buildClerkProps.js



const buildClerkProps = (req, initState = {}) => {
  const authToken = getAuthKeyFromRequest(req, "AuthToken");
  const authStatus = getAuthKeyFromRequest(req, "AuthStatus");
  const authMessage = getAuthKeyFromRequest(req, "AuthMessage");
  const authReason = getAuthKeyFromRequest(req, "AuthReason");
  const options = {
    apiKey: API_KEY,
    secretKey: SECRET_KEY,
    apiUrl: constants_API_URL,
    apiVersion: constants_API_VERSION,
    authStatus,
    authMessage,
    authReason
  };
  let authObject;
  if (!authStatus || authStatus !== AuthStatus.SignedIn) {
    authObject = signedOutAuthObject(options);
  } else {
    const { payload, raw } = esm_decodeJwt(authToken);
    authObject = signedInAuthObject(payload, { ...options, token: raw.text });
  }
  const sanitizedAuthObject = makeAuthObjectSerializable(sanitizeAuthObject({ ...authObject, ...initState }));
  return injectSSRStateIntoObject({}, sanitizedAuthObject);
};

//# sourceMappingURL=buildClerkProps.js.map
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
;// ./node_modules/@clerk/nextjs/dist/esm/server/createGetAuth.js






const createGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => withLogger(debugLoggerName, (logger) => {
  return (req, opts) => {
    if (utils_getHeader(req, esm_constants.Headers.EnableDebug) === "true") {
      logger.enable();
    }
    const authToken = getAuthKeyFromRequest(req, "AuthToken");
    const authStatus = getAuthKeyFromRequest(req, "AuthStatus");
    const authMessage = getAuthKeyFromRequest(req, "AuthMessage");
    const authReason = getAuthKeyFromRequest(req, "AuthReason");
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
      apiKey: (opts == null ? void 0 : opts.apiKey) || API_KEY,
      authStatus,
      authMessage,
      secretKey: (opts == null ? void 0 : opts.secretKey) || SECRET_KEY,
      authReason,
      authToken,
      apiUrl: constants_API_URL,
      apiVersion: constants_API_VERSION
    };
    logger.debug("Options debug", options);
    if (authStatus !== AuthStatus.SignedIn) {
      return signedOutAuthObject(options);
    }
    const jwt = esm_decodeJwt(authToken);
    logger.debug("JWT debug", jwt.raw.text);
    const signedIn = signedInAuthObject(jwt.payload, {
      ...options,
      token: jwt.raw.text
    });
    if (signedIn) {
      if (signedIn.user) {
        deprecatedObjectProperty(signedIn, "user", "Use `clerkClient.users.getUser` instead.");
      }
      if (signedIn.organization) {
        deprecatedObjectProperty(
          signedIn,
          "organization",
          "Use `clerkClient.organizations.getOrganization` instead."
        );
      }
      if (signedIn.session) {
        deprecatedObjectProperty(signedIn, "session", "Use `clerkClient.sessions.getSession` instead.");
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
  noAuthStatusMessage: getAuthAuthHeaderMissing()
});

//# sourceMappingURL=createGetAuth.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/server/utils.js

const buildRequestLike = () => {
  try {
    const { headers } = __webpack_require__(221);
    return new NextRequest("https://placeholder.com", { headers: headers() });
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
    noAuthStatusMessage: authAuthHeaderMissing()
  })(buildRequestLike());
  const { notFound, redirect } = __webpack_require__(137);
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
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/server/ClerkProvider.js




function ClerkProvider(props) {
  var _a;
  const { children, ...rest } = props;
  const state = (_a = initialState()) == null ? void 0 : _a.__clerk_ssr_state;
  return /* @__PURE__ */ react_react_server.createElement(
    ClientClerkProvider,
    {
      ...mergeNextClerkPropsWithEnv(rest),
      initialState: state
    },
    children
  );
}

//# sourceMappingURL=ClerkProvider.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/server/controlComponents.js


function SignedIn(props) {
  const { children } = props;
  const { userId } = auth();
  return userId ? /* @__PURE__ */ react_react_server.createElement(react_react_server.Fragment, null, children) : null;
}
function SignedOut(props) {
  const { children } = props;
  const { userId } = auth();
  return userId ? null : /* @__PURE__ */ react_react_server.createElement(react_react_server.Fragment, null, children);
}
function Protect(props) {
  const { children, fallback, ...restAuthorizedParams } = props;
  const { has, userId } = auth();
  const unauthorized = /* @__PURE__ */ react_react_server.createElement(react_react_server.Fragment, null, fallback != null ? fallback : null);
  const authorized = /* @__PURE__ */ react_react_server.createElement(react_react_server.Fragment, null, children);
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
}

//# sourceMappingURL=controlComponents.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/clerkClient.js


const clerkClient = esm_Clerk({
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  apiUrl: constants_API_URL,
  apiVersion: constants_API_VERSION,
  userAgent: `${"@clerk/nextjs"}@${"4.31.8"}`,
  proxyUrl: PROXY_URL,
  domain: DOMAIN,
  isSatellite: IS_SATELLITE
});
const createClerkClient = (/* unused pure expression or super */ null && (Clerk));



//# sourceMappingURL=clerkClient.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js


async function currentUser() {
  const { userId } = auth();
  return userId ? clerkClient.users.getUser(userId) : null;
}

//# sourceMappingURL=currentUser.js.map
;// ./node_modules/@clerk/shared/dist/chunk-ECUSKG7K.mjs
// src/devBrowser.ts
var DEV_BROWSER_SSO_JWT_PARAMETER = "__dev_session";
var DEV_BROWSER_JWT_MARKER = "__clerk_db_jwt";
var DEV_BROWSER_JWT_MARKER_REGEXP = /__clerk_db_jwt\[(.*)\]/;
function setDevBrowserJWTInURL(url, jwt, opts = { hash: true }) {
  const resultURL = new URL(url);
  const jwtFromHash = extractDevBrowserJWTFromURLHash(resultURL);
  const jwtFromSearch = extractDevBrowserJWTFromURLSearchParams(resultURL);
  const jwtToSet = jwtFromHash || jwtFromSearch || jwt;
  if (jwtToSet) {
    resultURL.searchParams.append(DEV_BROWSER_SSO_JWT_PARAMETER, jwtToSet);
    resultURL.searchParams.append(DEV_BROWSER_JWT_MARKER, jwtToSet);
    if (opts.hash) {
      resultURL.hash = resultURL.hash + `${DEV_BROWSER_JWT_MARKER}[${jwtToSet}]`;
    }
  }
  return resultURL;
}
function extractDevBrowserJWTFromHash(hash) {
  const matches = hash.match(DEV_BROWSER_JWT_MARKER_REGEXP);
  return matches ? matches[1] : "";
}
function extractDevBrowserJWTFromURLHash(url) {
  const jwt = extractDevBrowserJWTFromHash(url.hash);
  url.hash = url.hash.replace(DEV_BROWSER_JWT_MARKER_REGEXP, "");
  if (url.href.endsWith("#")) {
    url.hash = "";
  }
  return jwt;
}
function extractDevBrowserJWTFromURLSearchParams(url) {
  const jwtFromDevSession = url.searchParams.get(DEV_BROWSER_SSO_JWT_PARAMETER);
  url.searchParams.delete(DEV_BROWSER_SSO_JWT_PARAMETER);
  const jwtFromClerkDbJwt = url.searchParams.get(DEV_BROWSER_JWT_MARKER);
  url.searchParams.delete(DEV_BROWSER_JWT_MARKER);
  return jwtFromDevSession || jwtFromClerkDbJwt || "";
}


//# sourceMappingURL=chunk-ECUSKG7K.mjs.map
;// ./node_modules/@clerk/shared/dist/devBrowser.mjs



//# sourceMappingURL=devBrowser.mjs.map
;// ./node_modules/@clerk/nextjs/dist/esm/utils/response.js


const mergeResponses = (...responses) => {
  const normalisedResponses = responses.filter(Boolean).map((res) => {
    if (res instanceof NextResponse) {
      return res;
    }
    return new NextResponse(res.body, res);
  });
  if (normalisedResponses.length === 0) {
    return;
  }
  const lastResponse = normalisedResponses[normalisedResponses.length - 1];
  const finalResponse = new NextResponse(lastResponse.body, lastResponse);
  for (const response of normalisedResponses) {
    response.headers.forEach((value, name) => {
      finalResponse.headers.set(name, value);
    });
    response.cookies.getAll().forEach((cookie) => {
      const { name, value, ...options } = cookie;
      finalResponse.cookies.set(name, value, options);
    });
  }
  return finalResponse;
};
const isRedirect = (res) => {
  return res.headers.get(constants_constants.Headers.NextRedirect);
};
const setHeader = (res, name, val) => {
  res.headers.set(name, val);
  return res;
};
const stringifyHeaders = (headers) => {
  if (!headers) {
    return JSON.stringify({});
  }
  const obj = {};
  headers.forEach((value, name) => {
    obj[name] = value;
  });
  return JSON.stringify(obj);
};

//# sourceMappingURL=response.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/utils/pathToRegexp.js
function _(r) {
  for (var n = [], e = 0; e < r.length; ) {
    const t = r[e];
    if (t === "*" || t === "+" || t === "?") {
      n.push({ type: "MODIFIER", index: e, value: r[e++] });
      continue;
    }
    if (t === "\\") {
      n.push({ type: "ESCAPED_CHAR", index: e++, value: r[e++] });
      continue;
    }
    if (t === "{") {
      n.push({ type: "OPEN", index: e, value: r[e++] });
      continue;
    }
    if (t === "}") {
      n.push({ type: "CLOSE", index: e, value: r[e++] });
      continue;
    }
    if (t === ":") {
      for (var u = "", a = e + 1; a < r.length; ) {
        const f = r.charCodeAt(a);
        if (f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || f === 95) {
          u += r[a++];
          continue;
        }
        break;
      }
      if (!u) {
        throw new TypeError("Missing parameter name at ".concat(e));
      }
      n.push({ type: "NAME", index: e, value: u }), e = a;
      continue;
    }
    if (t === "(") {
      var l = 1, d = "", a = e + 1;
      if (r[a] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(a));
      }
      for (; a < r.length; ) {
        if (r[a] === "\\") {
          d += r[a++] + r[a++];
          continue;
        }
        if (r[a] === ")") {
          if (l--, l === 0) {
            a++;
            break;
          }
        } else if (r[a] === "(" && (l++, r[a + 1] !== "?")) {
          throw new TypeError("Capturing groups are not allowed at ".concat(a));
        }
        d += r[a++];
      }
      if (l) {
        throw new TypeError("Unbalanced pattern at ".concat(e));
      }
      if (!d) {
        throw new TypeError("Missing pattern at ".concat(e));
      }
      n.push({ type: "PATTERN", index: e, value: d }), e = a;
      continue;
    }
    n.push({ type: "CHAR", index: e, value: r[e++] });
  }
  return n.push({ type: "END", index: e, value: "" }), n;
}
function D(r, n) {
  n === void 0 && (n = {});
  for (var e = _(r), t = n.prefixes, u = t === void 0 ? "./" : t, a = "[^".concat(y(n.delimiter || "/#?"), "]+?"), f = [], l = 0, d = 0, p = "", c = function(v) {
    if (d < e.length && e[d].type === v) {
      return e[d++].value;
    }
  }, w = function(v) {
    const g = c(v);
    if (g !== void 0) {
      return g;
    }
    const h = e[d], b = h.type, N = h.index;
    throw new TypeError("Unexpected ".concat(b, " at ").concat(N, ", expected ").concat(v));
  }, A = function() {
    for (var v = "", g; g = c("CHAR") || c("ESCAPED_CHAR"); ) {
      v += g;
    }
    return v;
  }; d < e.length; ) {
    const s = c("CHAR"), C = c("NAME"), E = c("PATTERN");
    if (C || E) {
      var x = s || "";
      u.indexOf(x) === -1 && (p += x, x = ""), p && (f.push(p), p = ""), f.push({ name: C || l++, prefix: x, suffix: "", pattern: E || a, modifier: c("MODIFIER") || "" });
      continue;
    }
    const o = s || c("ESCAPED_CHAR");
    if (o) {
      p += o;
      continue;
    }
    p && (f.push(p), p = "");
    const R = c("OPEN");
    if (R) {
      var x = A(), T = c("NAME") || "", i = c("PATTERN") || "", m = A();
      w("CLOSE"), f.push({
        name: T || (i ? l++ : ""),
        pattern: T && !i ? a : i,
        prefix: x,
        suffix: m,
        modifier: c("MODIFIER") || ""
      });
      continue;
    }
    w("END");
  }
  return f;
}
function y(r) {
  return r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function O(r) {
  return r && r.sensitive ? "" : "i";
}
function M(r, n) {
  if (!n) {
    return r;
  }
  for (let e = /\((?:\?<(.*?)>)?(?!\?)/g, t = 0, u = e.exec(r.source); u; ) {
    n.push({ name: u[1] || t++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = e.exec(r.source);
  }
  return r;
}
function S(r, n, e) {
  const t = r.map(function(u) {
    return P(u, n, e).source;
  });
  return new RegExp("(?:".concat(t.join("|"), ")"), O(e));
}
function F(r, n, e) {
  return H(D(r, e), n, e);
}
function H(r, n, e) {
  e === void 0 && (e = {});
  for (var t = e.strict, u = t === void 0 ? false : t, a = e.start, f = a === void 0 ? true : a, l = e.end, d = l === void 0 ? true : l, p = e.encode, c = p === void 0 ? function(N) {
    return N;
  } : p, w = e.delimiter, A = w === void 0 ? "/#?" : w, s = e.endsWith, C = s === void 0 ? "" : s, E = "[".concat(y(C), "]|$"), x = "[".concat(y(A), "]"), o = f ? "^" : "", R = 0, T = r; R < T.length; R++) {
    const i = T[R];
    if (typeof i == "string") {
      o += y(c(i));
    } else {
      const m = y(c(i.prefix)), v = y(c(i.suffix));
      if (i.pattern) {
        if (n && n.push(i), m || v) {
          if (i.modifier === "+" || i.modifier === "*") {
            const g = i.modifier === "*" ? "?" : "";
            o += "(?:".concat(m, "((?:").concat(i.pattern, ")(?:").concat(v).concat(m, "(?:").concat(i.pattern, "))*)").concat(v, ")").concat(g);
          } else {
            o += "(?:".concat(m, "(").concat(i.pattern, ")").concat(v, ")").concat(i.modifier);
          }
        } else {
          i.modifier === "+" || i.modifier === "*" ? o += "((?:".concat(i.pattern, ")").concat(i.modifier, ")") : o += "(".concat(i.pattern, ")").concat(i.modifier);
        }
      } else {
        o += "(?:".concat(m).concat(v, ")").concat(i.modifier);
      }
    }
  }
  if (d) {
    u || (o += "".concat(x, "?")), o += e.endsWith ? "(?=".concat(E, ")") : "$";
  } else {
    const h = r[r.length - 1], b = typeof h == "string" ? x.indexOf(h[h.length - 1]) > -1 : h === void 0;
    u || (o += "(?:".concat(x, "(?=").concat(E, "))?")), b || (o += "(?=".concat(x, "|").concat(E, ")"));
  }
  return new RegExp(o, O(e));
}
function P(r, n, e) {
  return r instanceof RegExp ? M(r, n) : Array.isArray(r) ? S(r, n, e) : F(r, n, e);
}

//# sourceMappingURL=pathToRegexp.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/utils/pathMatchers.js

const paths = {
  toRegexp: (path) => {
    try {
      return P(path);
    } catch (e) {
      throw new Error(
        `Invalid path: ${path}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp
${e.message}`
      );
    }
  }
};

//# sourceMappingURL=pathMatchers.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/withClerkMiddleware.js





const decorateResponseWithObservabilityHeaders = (res, requestState) => {
  requestState.message && res.headers.set(esm_constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.headers.set(esm_constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.headers.set(esm_constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
const withClerkMiddleware = (...args) => {
  const noop = () => void 0;
  const [handler = noop, opts = {}] = args;
  chunk_IC4FGZI3_deprecated(
    "withClerkMiddleware",
    "Use `authMiddleware` instead.\nFor more details, consult the middleware documentation: https://clerk.com/docs/nextjs/middleware"
  );
  return async (req, event) => {
    const { isSatellite, domain, signInUrl, proxyUrl } = handleMultiDomainAndProxy(req, opts);
    const requestState = await clerkClient.authenticateRequest({
      ...opts,
      apiKey: opts.apiKey || API_KEY,
      secretKey: opts.secretKey || SECRET_KEY,
      frontendApi: opts.frontendApi || FRONTEND_API,
      publishableKey: opts.publishableKey || PUBLISHABLE_KEY,
      isSatellite,
      domain,
      signInUrl,
      proxyUrl,
      request: req
    });
    if (requestState.isUnknown) {
      const response = new NextResponse(null, { status: 401, headers: { "Content-Type": "text/html" } });
      decorateResponseWithObservabilityHeaders(response, requestState);
      return response;
    }
    if (requestState.isInterstitial) {
      const response = NextResponse.rewrite(
        clerkClient.remotePublicInterstitialUrl({
          apiUrl: constants_API_URL,
          frontendApi: opts.frontendApi || FRONTEND_API,
          publishableKey: opts.publishableKey || PUBLISHABLE_KEY,
          clerkJSUrl: CLERK_JS_URL,
          clerkJSVersion: CLERK_JS_VERSION,
          proxyUrl: requestState.proxyUrl,
          isSatellite: requestState.isSatellite,
          domain: requestState.domain,
          debugData: debugRequestState(requestState),
          signInUrl: requestState.signInUrl
        }),
        { status: 401 }
      );
      decorateResponseWithObservabilityHeaders(response, requestState);
      return response;
    }
    setCustomAttributeOnRequest(req, esm_constants.Attributes.AuthStatus, requestState.status);
    setCustomAttributeOnRequest(req, esm_constants.Attributes.AuthToken, requestState.token || "");
    setCustomAttributeOnRequest(req, esm_constants.Attributes.AuthMessage, requestState.message || "");
    setCustomAttributeOnRequest(req, esm_constants.Attributes.AuthReason, requestState.reason || "");
    const res = await handler(req, event);
    return decorateRequest(req, res, requestState);
  };
};

//# sourceMappingURL=withClerkMiddleware.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/authenticateRequest.js




const authenticateRequest_authenticateRequest = async (req, opts) => {
  const { isSatellite, domain, signInUrl, proxyUrl } = handleMultiDomainAndProxy(req, opts);
  return await clerkClient.authenticateRequest({
    ...opts,
    apiKey: opts.apiKey || API_KEY,
    secretKey: opts.secretKey || SECRET_KEY,
    frontendApi: opts.frontendApi || FRONTEND_API,
    publishableKey: opts.publishableKey || PUBLISHABLE_KEY,
    isSatellite,
    domain,
    signInUrl,
    proxyUrl,
    request: req
  });
};
const handleUnknownState = (requestState) => {
  const response = apiEndpointUnauthorizedNextResponse();
  decorateResponseWithObservabilityHeaders(response, requestState);
  return response;
};
const handleInterstitialState = (requestState, opts) => {
  const response = new NextResponse(
    clerkClient.localInterstitial({
      frontendApi: opts.frontendApi || FRONTEND_API,
      publishableKey: opts.publishableKey || PUBLISHABLE_KEY,
      clerkJSUrl: CLERK_JS_URL,
      clerkJSVersion: CLERK_JS_VERSION,
      proxyUrl: requestState.proxyUrl,
      isSatellite: requestState.isSatellite,
      domain: requestState.domain,
      debugData: debugRequestState(requestState),
      signInUrl: requestState.signInUrl
    }),
    {
      status: 401,
      headers: {
        "content-type": "text/html"
      }
    }
  );
  decorateResponseWithObservabilityHeaders(response, requestState);
  return response;
};

//# sourceMappingURL=authenticateRequest.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/redirect.js




const redirectAdapter = (url) => {
  const res = NextResponse.redirect(url);
  return setHeader(res, esm_constants.Headers.ClerkRedirectTo, "true");
};
const { redirectToSignIn, redirectToSignUp } = esm_redirect({
  redirectAdapter,
  signInUrl: SIGN_IN_URL,
  signUpUrl: SIGN_UP_URL,
  publishableKey: PUBLISHABLE_KEY,
  frontendApi: FRONTEND_API
});

//# sourceMappingURL=redirect.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/server/authMiddleware.js










const INFINITE_REDIRECTION_LOOP_COOKIE = "__clerk_redirection_loop";
const DEFAULT_CONFIG_MATCHER = ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"];
const DEFAULT_IGNORED_ROUTES = [`/((?!api|trpc))(_next.*|.+\\.[\\w]+$)`];
const DEFAULT_API_ROUTES = ["/api/(.*)", "/trpc/(.*)"];
const authMiddleware = (...args) => {
  const [params = {}] = args;
  const { beforeAuth, afterAuth, publicRoutes, ignoredRoutes, apiRoutes, ...options } = params;
  const isIgnoredRoute = createRouteMatcher(ignoredRoutes || DEFAULT_IGNORED_ROUTES);
  const isPublicRoute = createRouteMatcher(withDefaultPublicRoutes(publicRoutes));
  const isApiRoute = createApiRoutes(apiRoutes);
  const defaultAfterAuth = createDefaultAfterAuth(isPublicRoute, isApiRoute, params);
  return withLogger("authMiddleware", (logger) => async (_req, evt) => {
    if (options.debug) {
      logger.enable();
    }
    const req = withNormalizedClerkUrl(_req);
    logger.debug("URL debug", {
      url: req.nextUrl.href,
      method: req.method,
      headers: stringifyHeaders(req.headers),
      nextUrl: req.nextUrl.href,
      clerkUrl: req.experimental_clerkUrl.href
    });
    logger.debug("Options debug", { ...options, beforeAuth: !!beforeAuth, afterAuth: !!afterAuth });
    if (isIgnoredRoute(req)) {
      logger.debug({ isIgnoredRoute: true });
      if (utils_isDevelopmentFromApiKey(options.secretKey || SECRET_KEY) && !params.ignoredRoutes) {
        console.warn(
          receivedRequestForIgnoredRoute(req.experimental_clerkUrl.href, JSON.stringify(DEFAULT_CONFIG_MATCHER))
        );
      }
      return setHeader(NextResponse.next(), esm_constants.Headers.AuthReason, "ignored-route");
    }
    const beforeAuthRes = await (beforeAuth && beforeAuth(req, evt));
    if (beforeAuthRes === false) {
      logger.debug("Before auth returned false, skipping");
      return setHeader(NextResponse.next(), esm_constants.Headers.AuthReason, "skip");
    } else if (beforeAuthRes && isRedirect(beforeAuthRes)) {
      logger.debug("Before auth returned redirect, following redirect");
      return setHeader(beforeAuthRes, esm_constants.Headers.AuthReason, "redirect");
    }
    const requestState = await authenticateRequest_authenticateRequest(req, options);
    if (requestState.isUnknown) {
      logger.debug("authenticateRequest state is unknown", requestState);
      return handleUnknownState(requestState);
    } else if (requestState.isInterstitial && isApiRoute(req)) {
      logger.debug("authenticateRequest state is interstitial in an API route", requestState);
      return handleUnknownState(requestState);
    } else if (requestState.isInterstitial) {
      logger.debug("authenticateRequest state is interstitial", requestState);
      assertClockSkew(requestState, options);
      const res = handleInterstitialState(requestState, options);
      return assertInfiniteRedirectionLoop(req, res, options, requestState);
    }
    const auth = Object.assign(requestState.toAuth(), {
      isPublicRoute: isPublicRoute(req),
      isApiRoute: isApiRoute(req)
    });
    logger.debug(() => ({ auth: JSON.stringify(auth), debug: auth.debug() }));
    const afterAuthRes = await (afterAuth || defaultAfterAuth)(auth, req, evt);
    const finalRes = mergeResponses(beforeAuthRes, afterAuthRes) || NextResponse.next();
    logger.debug(() => ({ mergedHeaders: stringifyHeaders(finalRes.headers) }));
    if (isRedirect(finalRes)) {
      logger.debug("Final response is redirect, following redirect");
      const res = setHeader(finalRes, esm_constants.Headers.AuthReason, "redirect");
      return appendDevBrowserOnCrossOrigin(req, res, options);
    }
    if (options.debug) {
      setRequestHeadersOnNextResponse(finalRes, req, { [esm_constants.Headers.EnableDebug]: "true" });
      logger.debug(`Added ${esm_constants.Headers.EnableDebug} on request`);
    }
    return decorateRequest(req, finalRes, requestState);
  });
};
const createRouteMatcher = (routes) => {
  if (typeof routes === "function") {
    return (req) => routes(req);
  }
  const routePatterns = [routes || ""].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);
  return (req) => matchers.some((matcher) => matcher.test(req.nextUrl.pathname));
};
const createDefaultAfterAuth = (isPublicRoute, isApiRoute, params) => {
  return (auth, req) => {
    if (!auth.userId && !isPublicRoute(req)) {
      if (isApiRoute(req)) {
        informAboutProtectedRoute(req.experimental_clerkUrl.pathname, params, true);
        return apiEndpointUnauthorizedNextResponse();
      } else {
        informAboutProtectedRoute(req.experimental_clerkUrl.pathname, params, false);
      }
      return redirectToSignIn({ returnBackUrl: req.experimental_clerkUrl.href });
    }
    return NextResponse.next();
  };
};
const precomputePathRegex = (patterns) => {
  return patterns.map((pattern) => pattern instanceof RegExp ? pattern : paths.toRegexp(pattern));
};
const matchRoutesStartingWith = (path) => {
  path = path.replace(/\/$/, "");
  return new RegExp(`^${path}(/.*)?$`);
};
const withDefaultPublicRoutes = (publicRoutes) => {
  if (typeof publicRoutes === "function") {
    return publicRoutes;
  }
  const routes = [publicRoutes || ""].flat().filter(Boolean);
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
  if (signInUrl) {
    routes.push(matchRoutesStartingWith(signInUrl));
  }
  const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";
  if (signUpUrl) {
    routes.push(matchRoutesStartingWith(signUpUrl));
  }
  return routes;
};
const appendDevBrowserOnCrossOrigin = (req, res, opts) => {
  var _a;
  const location = res.headers.get("location");
  const shouldAppendDevBrowser = res.headers.get(esm_constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && utils_isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY) && isCrossOrigin(req.experimental_clerkUrl, location)) {
    const dbJwt = ((_a = req.cookies.get(DEV_BROWSER_JWT_MARKER)) == null ? void 0 : _a.value) || "";
    const url = new URL(location);
    const urlWithDevBrowser = setDevBrowserJWTInURL(url, dbJwt, { hash: false });
    return NextResponse.redirect(urlWithDevBrowser.href, res);
  }
  return res;
};
const createApiRoutes = (apiRoutes) => {
  if (apiRoutes) {
    return createRouteMatcher(apiRoutes);
  }
  const isDefaultApiRoute = createRouteMatcher(DEFAULT_API_ROUTES);
  return (req) => isDefaultApiRoute(req) || isRequestMethodIndicatingApiRoute(req) || isRequestContentTypeJson(req);
};
const isRequestContentTypeJson = (req) => {
  const requestContentType = req.headers.get(esm_constants.Headers.ContentType);
  return requestContentType === esm_constants.ContentTypes.Json;
};
const isRequestMethodIndicatingApiRoute = (req) => {
  const requestMethod = req.method.toLowerCase();
  return !["get", "head", "options"].includes(requestMethod);
};
const assertClockSkew = (requestState, opts) => {
  if (!utils_isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY)) {
    return;
  }
  if (requestState.reason === "token-not-active-yet") {
    throw new Error(clockSkewDetected(requestState.message));
  }
};
const assertInfiniteRedirectionLoop = (req, res, opts, requestState) => {
  var _a;
  if (!utils_isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY)) {
    return res;
  }
  const infiniteRedirectsCounter = Number((_a = req.cookies.get(INFINITE_REDIRECTION_LOOP_COOKIE)) == null ? void 0 : _a.value) || 0;
  if (infiniteRedirectsCounter === 6) {
    if (requestState.reason === "token-expired") {
      throw new Error(clockSkewDetected(requestState.message));
    }
    throw new Error(infiniteRedirectLoopDetected());
  }
  if (req.headers.get("referer") === req.url) {
    res.cookies.set({
      name: INFINITE_REDIRECTION_LOOP_COOKIE,
      value: `${infiniteRedirectsCounter + 1}`,
      maxAge: 3
    });
  }
  return res;
};
const withNormalizedClerkUrl = (req) => {
  const clerkUrl = req.nextUrl.clone();
  const originUrl = buildRequestUrl(req);
  clerkUrl.port = originUrl.port;
  clerkUrl.protocol = originUrl.protocol;
  clerkUrl.host = originUrl.host;
  return Object.assign(req, { experimental_clerkUrl: clerkUrl });
};
const informAboutProtectedRoute = (path, params, isApiRoute) => {
  if (params.debug || utils_isDevelopmentFromApiKey(params.secretKey || SECRET_KEY)) {
    console.warn(
      informAboutProtectedRouteInfo(
        path,
        !!params.publicRoutes,
        !!params.ignoredRoutes,
        isApiRoute,
        DEFAULT_IGNORED_ROUTES
      )
    );
  }
};

//# sourceMappingURL=authMiddleware.js.map
;// ./node_modules/@clerk/nextjs/dist/esm/index.js





const esm_ClerkProvider = ClerkProvider;
const esm_SignedIn = SignedIn;
const esm_SignedOut = SignedOut;
const esm_Protect = Protect;
const esm_auth = auth;
const esm_currentUser = currentUser;
const esm_clerkClient = clerkClient;
const esm_authMiddleware = authMiddleware;
const esm_redirectToSignIn = redirectToSignIn;
const esm_redirectToSignUp = redirectToSignUp;
const esm_withClerkMiddleware = withClerkMiddleware;

//# sourceMappingURL=index.js.map
;// ./src/middleware.ts

// Define the public routes that don't require authentication
const publicRoutes = [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook(.*)"
];
/* harmony default export */ const middleware = (esm_authMiddleware({
    // Routes that can be accessed while signed out
    publicRoutes: publicRoutes
}));
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ]
};

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/is-next-router-error.js
var is_next_router_error = __webpack_require__(199);
;// ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fsrc%2Fmiddleware.ts&page=%2Fsrc%2Fmiddleware&rootDir=D%3A%5Cthe360unity-master%5Cthe360unity-master&matchers=W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyEuKlxcLi4qfF9uZXh0KS4qKSkoXFwuanNvbik%2FW1xcLyNcXD9dPyQiLCJvcmlnaW5hbFNvdXJjZSI6Ii8oKD8hLipcXC4uKnxfbmV4dCkuKikifSx7InJlZ2V4cCI6Il4oPzpcXC8oX25leHRcXC9kYXRhXFwvW14vXXsxLH0pKT8oPzpcXC8oXFwvP2luZGV4fFxcLz9pbmRleFxcLmpzb24pKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLyJ9LHsicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLyhhcGl8dHJwYykpKC4qKShcXC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLyhhcGl8dHJwYykoLiopIn1d&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyEuKlxcLi4qfF9uZXh0KS4qKSkoXFwuanNvbik%2FW1xcLyNcXD9dPyQiLCJvcmlnaW5hbFNvdXJjZSI6Ii8oKD8hLipcXC4uKnxfbmV4dCkuKikifSx7InJlZ2V4cCI6Il4oPzpcXC8oX25leHRcXC9kYXRhXFwvW14vXXsxLH0pKT8oPzpcXC8oXFwvP2luZGV4fFxcLz9pbmRleFxcLmpzb24pKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLyJ9LHsicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLyhhcGl8dHJwYykpKC4qKShcXC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLyhhcGl8dHJwYykoLiopIn1dfQ%3D%3D!


// Import the userland code.



const mod = {
    ...middleware_namespaceObject
};
const handler = mod.middleware || mod.default;
const page = "/src/middleware";
if (typeof handler !== 'function') {
    throw Object.defineProperty(new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", {
        value: "E120",
        enumerable: false,
        configurable: true
    });
}
// Middleware will only sent out the FetchEvent to next server,
// so load instrumentation module here and track the error inside middleware module.
function errorHandledHandler(fn) {
    return async (...args)=>{
        try {
            return await fn(...args);
        } catch (err) {
            // In development, error the navigation API usage in runtime,
            // since it's not allowed to be used in middleware as it's outside of react component tree.
            if (false) {}
            const req = args[0];
            const url = new URL(req.url);
            const resource = url.pathname + url.search;
            await edgeInstrumentationOnRequestError(err, {
                path: resource,
                method: req.method,
                headers: Object.fromEntries(req.headers.entries())
            }, {
                routerKind: 'Pages Router',
                routePath: '/middleware',
                routeType: 'middleware',
                revalidateReason: undefined
            });
            throw err;
        }
    };
}
function nHandler(opts) {
    return adapter({
        ...opts,
        page,
        handler: errorHandledHandler(handler)
    });
}

//# sourceMappingURL=middleware.js.map

/***/ }),

/***/ 137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ReadonlyURLSearchParams: () => (/* reexport */ ReadonlyURLSearchParams),
  RedirectType: () => (/* reexport */ redirect_error/* RedirectType */.zB),
  forbidden: () => (/* reexport */ forbidden),
  notFound: () => (/* reexport */ notFound),
  permanentRedirect: () => (/* reexport */ permanentRedirect),
  redirect: () => (/* reexport */ redirect),
  unauthorized: () => (/* reexport */ unauthorized),
  unstable_rethrow: () => (/* reexport */ unstable_rethrow)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/redirect-status-code.js
var redirect_status_code = __webpack_require__(821);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/redirect-error.js
var redirect_error = __webpack_require__(167);
;// ./node_modules/next/dist/esm/client/components/redirect.js


const actionAsyncStorage =  true ? (__webpack_require__(830)/* .actionAsyncStorage */ .s) : 0;
function getRedirectError(url, type, statusCode) {
    if (statusCode === void 0) statusCode = redirect_status_code/* RedirectStatusCode */.Q.TemporaryRedirect;
    const error = Object.defineProperty(new Error(redirect_error/* REDIRECT_ERROR_CODE */.oJ), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = redirect_error/* REDIRECT_ERROR_CODE */.oJ + ";" + type + ";" + url + ";" + statusCode + ";";
    return error;
}
/**
 * This function allows you to redirect the user to another URL. It can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a meta tag to redirect the user to the target page.
 * - In a Route Handler or Server Action, it will serve a 307/303 to the caller.
 * - In a Server Action, type defaults to 'push' and 'replace' elsewhere.
 *
 * Read more: [Next.js Docs: `redirect`](https://nextjs.org/docs/app/api-reference/functions/redirect)
 */ function redirect(/** The URL to redirect to */ url, type) {
    var _actionAsyncStorage_getStore;
    type != null ? type : type = (actionAsyncStorage == null ? void 0 : (_actionAsyncStorage_getStore = actionAsyncStorage.getStore()) == null ? void 0 : _actionAsyncStorage_getStore.isAction) ? redirect_error/* RedirectType */.zB.push : redirect_error/* RedirectType */.zB.replace;
    throw getRedirectError(url, type, redirect_status_code/* RedirectStatusCode */.Q.TemporaryRedirect);
}
/**
 * This function allows you to redirect the user to another URL. It can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a meta tag to redirect the user to the target page.
 * - In a Route Handler or Server Action, it will serve a 308/303 to the caller.
 *
 * Read more: [Next.js Docs: `redirect`](https://nextjs.org/docs/app/api-reference/functions/redirect)
 */ function permanentRedirect(/** The URL to redirect to */ url, type) {
    if (type === void 0) type = redirect_error/* RedirectType */.zB.replace;
    throw getRedirectError(url, type, redirect_status_code/* RedirectStatusCode */.Q.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!isRedirectError(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!isRedirectError(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
} //# sourceMappingURL=redirect.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/http-access-fallback/http-access-fallback.js
var http_access_fallback = __webpack_require__(159);
;// ./node_modules/next/dist/esm/client/components/not-found.js

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
 */ const DIGEST = "" + http_access_fallback/* HTTP_ERROR_FALLBACK_ERROR_CODE */.s8 + ";404";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
} //# sourceMappingURL=not-found.js.map

;// ./node_modules/next/dist/esm/client/components/forbidden.js

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
 */ const forbidden_DIGEST = "" + http_access_fallback/* HTTP_ERROR_FALLBACK_ERROR_CODE */.s8 + ";403";
function forbidden() {
    if (true) {
        throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(forbidden_DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = forbidden_DIGEST;
    throw error;
} //# sourceMappingURL=forbidden.js.map

;// ./node_modules/next/dist/esm/client/components/unauthorized.js

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
 */ const unauthorized_DIGEST = "" + http_access_fallback/* HTTP_ERROR_FALLBACK_ERROR_CODE */.s8 + ";401";
function unauthorized() {
    if (true) {
        throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(unauthorized_DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = unauthorized_DIGEST;
    throw error;
} //# sourceMappingURL=unauthorized.js.map

;// ./node_modules/next/dist/esm/client/components/unstable-rethrow.js
/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */ const unstable_rethrow =  true ? (__webpack_require__(792)/* .unstable_rethrow */ .X) : 0; //# sourceMappingURL=unstable-rethrow.js.map

;// ./node_modules/next/dist/esm/client/components/navigation.react-server.js
/** @internal */ class ReadonlyURLSearchParamsError extends Error {
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






 //# sourceMappingURL=navigation.react-server.js.map

;// ./node_modules/next/dist/esm/api/navigation.react-server.js


//# sourceMappingURL=navigation.react-server.js.map

/***/ }),

/***/ 159:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RM: () => (/* binding */ isHTTPAccessFallbackError),
/* harmony export */   s8: () => (/* binding */ HTTP_ERROR_FALLBACK_ERROR_CODE)
/* harmony export */ });
/* unused harmony exports HTTPAccessErrorStatus, getAccessFallbackHTTPStatus, getAccessFallbackErrorTypeByStatus */
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
/**
 * Checks an error to determine if it's an error generated by
 * the HTTP navigation APIs `notFound()`, `forbidden()` or `unauthorized()`.
 *
 * @param error the error that may reference a HTTP access error
 * @returns true if the error is a HTTP access error
 */ function isHTTPAccessFallbackError(error) {
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
} //# sourceMappingURL=http-access-fallback.js.map


/***/ }),

/***/ 167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nJ: () => (/* binding */ isRedirectError),
/* harmony export */   oJ: () => (/* binding */ REDIRECT_ERROR_CODE),
/* harmony export */   zB: () => (/* binding */ RedirectType)
/* harmony export */ });
/* harmony import */ var _redirect_status_code__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(821);

const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
/**
 * Checks an error to determine if it's an error generated by the
 * `redirect(url)` helper.
 *
 * @param error the error that may reference a redirect error
 * @returns true if the error is a redirect error
 */ function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirect_status_code__WEBPACK_IMPORTED_MODULE_0__/* .RedirectStatusCode */ .Q;
} //# sourceMappingURL=redirect-error.js.map


/***/ }),

/***/ 199:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ isNextRouterError)
/* harmony export */ });
/* harmony import */ var _http_access_fallback_http_access_fallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(159);
/* harmony import */ var _redirect_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(167);


/**
 * Returns true if the error is a navigation signal error. These errors are
 * thrown by user code to perform navigation operations and interrupt the React
 * render.
 */ function isNextRouterError(error) {
    return (0,_redirect_error__WEBPACK_IMPORTED_MODULE_1__/* .isRedirectError */ .nJ)(error) || (0,_http_access_fallback_http_access_fallback__WEBPACK_IMPORTED_MODULE_0__/* .isHTTPAccessFallbackError */ .RM)(error);
} //# sourceMappingURL=is-next-router-error.js.map


/***/ }),

/***/ 201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
    getTestReqInfo: function() {
        return getTestReqInfo;
    },
    withRequest: function() {
        return withRequest;
    }
});
const _nodeasync_hooks = __webpack_require__(521);
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, 'next-test-proxy-port');
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, 'next-test-data') || '';
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
}

//# sourceMappingURL=context.js.map

/***/ }),

/***/ 221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  cookies: () => (/* reexport */ cookies_cookies),
  draftMode: () => (/* reexport */ draftMode),
  headers: () => (/* reexport */ headers_headers)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js
var request_cookies = __webpack_require__(818);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
var cookies = __webpack_require__(725);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/work-async-storage.external.js + 1 modules
var work_async_storage_external = __webpack_require__(535);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js + 2 modules
var work_unit_async_storage_external = __webpack_require__(115);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js + 1 modules
var dynamic_rendering = __webpack_require__(557);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/static-generation-bailout.js
var static_generation_bailout = __webpack_require__(602);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/dynamic-rendering-utils.js
var dynamic_rendering_utils = __webpack_require__(801);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.react-server.js
var react_react_server = __webpack_require__(815);
;// ./node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js

const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof react_react_server.cache === 'function' ? react_react_server.cache : (fn)=>fn;
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
/**
 * Creates a function that logs an error message that is deduped by the userland
 * callsite.
 * This requires no indirection between the call of this function and the userland
 * callsite i.e. there's only a single library frame above this.
 * Do not use on the Client where sourcemaps and ignore listing might be enabled.
 * Only use that for warnings need a fix independent of the callstack.
 *
 * @param getMessage
 * @returns
 */ function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if (false) { var _stack; } else {
            logErrorOrWarn(message);
        }
    };
}

//# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/request/utils.js
var utils = __webpack_require__(335);
;// ./node_modules/next/dist/esm/server/request/cookies.js











function cookies_cookies() {
    const callingExpression = 'cookies';
    const workStore = work_async_storage_external/* workAsyncStorage */.J.getStore();
    const workUnitStore = work_unit_async_storage_external/* workUnitAsyncStorage */.FP.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0,utils/* isRequestAPICallableInsideAfter */.iC)()) {
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
            throw Object.defineProperty(new static_generation_bailout/* StaticGenBailoutError */.f(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
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
                (0,dynamic_rendering/* postponeWithTracking */.Ui)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We track dynamic access here so we don't need to wrap the cookies in
                // individual property access tracking.
                (0,dynamic_rendering/* throwToInterruptStaticGeneration */.xI)(callingExpression, workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using cookies inside a cache context
        (0,dynamic_rendering/* trackDynamicDataInDynamicRender */.Pk)(workStore, workUnitStore);
    }
    // cookies is being called in a dynamic context
    const requestStore = (0,work_unit_async_storage_external/* getExpectedRequestStore */.XN)(callingExpression);
    let underlyingCookies;
    if ((0,request_cookies/* areCookiesMutableInCurrentPhase */.Xj)(requestStore)) {
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
    return request_cookies/* RequestCookiesAdapter */.Ck.seal(new cookies/* RequestCookies */.tm(new Headers({})));
}
const CachedCookies = new WeakMap();
function makeDynamicallyTrackedExoticCookies(route, prerenderStore) {
    const cachedPromise = CachedCookies.get(prerenderStore);
    if (cachedPromise) {
        return cachedPromise;
    }
    const promise = (0,dynamic_rendering_utils/* makeHangingPromise */.W)(prerenderStore.renderSignal, '`cookies()`');
    CachedCookies.set(prerenderStore, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: function() {
                const expression = '`cookies()[Symbol.iterator]()`';
                const error = createCookiesAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        size: {
            get () {
                const expression = '`cookies().size`';
                const error = createCookiesAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        clear: {
            value: function clear() {
                const expression = '`cookies().clear()`';
                const error = createCookiesAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        toString: {
            value: function toString() {
                const expression = '`cookies().toString()`';
                const error = createCookiesAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
    const promise = new Promise((resolve)=>scheduleImmediate(()=>resolve(underlyingCookies)));
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
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        trackSynchronousRequestDataAccessInDev(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = createDedupedByCallsiteServerErrorLoggerDev(createCookiesAccessError);
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
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js
var headers = __webpack_require__(381);
;// ./node_modules/next/dist/esm/server/request/headers.js










/**
 * This function allows you to read the HTTP incoming request headers in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) and
 * [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware).
 *
 * Read more: [Next.js Docs: `headers`](https://nextjs.org/docs/app/api-reference/functions/headers)
 */ function headers_headers() {
    const workStore = work_async_storage_external/* workAsyncStorage */.J.getStore();
    const workUnitStore = work_unit_async_storage_external/* workUnitAsyncStorage */.FP.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0,utils/* isRequestAPICallableInsideAfter */.iC)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E367",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            const underlyingHeaders = headers/* HeadersAdapter */.o.seal(new Headers({}));
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
            throw Object.defineProperty(new static_generation_bailout/* StaticGenBailoutError */.f(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
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
                (0,dynamic_rendering/* postponeWithTracking */.Ui)(workStore.route, 'headers', workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We are in a legacy static generation mode while prerendering
                // We track dynamic access here so we don't need to wrap the headers in
                // individual property access tracking.
                (0,dynamic_rendering/* throwToInterruptStaticGeneration */.xI)('headers', workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using headers inside a cache context
        (0,dynamic_rendering/* trackDynamicDataInDynamicRender */.Pk)(workStore, workUnitStore);
    }
    const requestStore = (0,work_unit_async_storage_external/* getExpectedRequestStore */.XN)('headers');
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
    const promise = (0,dynamic_rendering_utils/* makeHangingPromise */.W)(prerenderStore.renderSignal, '`headers()`');
    CachedHeaders.set(prerenderStore, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${headers_describeNameArg(arguments[0])}, ...)\``;
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${headers_describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${headers_describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${headers_describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${headers_describeNameArg(arguments[0])}, ...)\``;
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`headers()[Symbol.iterator]()`';
                const error = createHeadersAccessError(route, expression);
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(route, expression, error, prerenderStore);
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
    const promise = new Promise((resolve)=>scheduleImmediate(()=>resolve(underlyingHeaders)));
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${headers_describeNameArg(arguments[0])}, ...)\``;
                headers_syncIODev(route, expression);
                return underlyingHeaders.append.apply(underlyingHeaders, arguments);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${headers_describeNameArg(arguments[0])})\``;
                headers_syncIODev(route, expression);
                return underlyingHeaders.delete.apply(underlyingHeaders, arguments);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${headers_describeNameArg(arguments[0])})\``;
                headers_syncIODev(route, expression);
                return underlyingHeaders.get.apply(underlyingHeaders, arguments);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${headers_describeNameArg(arguments[0])})\``;
                headers_syncIODev(route, expression);
                return underlyingHeaders.has.apply(underlyingHeaders, arguments);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${headers_describeNameArg(arguments[0])}, ...)\``;
                headers_syncIODev(route, expression);
                return underlyingHeaders.set.apply(underlyingHeaders, arguments);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                headers_syncIODev(route, expression);
                return underlyingHeaders.getSetCookie.apply(underlyingHeaders, arguments);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                headers_syncIODev(route, expression);
                return underlyingHeaders.forEach.apply(underlyingHeaders, arguments);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                headers_syncIODev(route, expression);
                return underlyingHeaders.keys.apply(underlyingHeaders, arguments);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                headers_syncIODev(route, expression);
                return underlyingHeaders.values.apply(underlyingHeaders, arguments);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                headers_syncIODev(route, expression);
                return underlyingHeaders.entries.apply(underlyingHeaders, arguments);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...headers()` or similar iteration';
                headers_syncIODev(route, expression);
                return underlyingHeaders[Symbol.iterator].apply(underlyingHeaders, arguments);
            }
        }
    });
    return promise;
}
function headers_describeNameArg(arg) {
    return typeof arg === 'string' ? `'${arg}'` : '...';
}
function headers_syncIODev(route, expression) {
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        trackSynchronousRequestDataAccessInDev(requestStore);
    }
    // In all cases we warn normally
    headers_warnForSyncAccess(route, expression);
}
const headers_warnForSyncAccess = createDedupedByCallsiteServerErrorLoggerDev(createHeadersAccessError);
function createHeadersAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`headers()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E277",
        enumerable: false,
        configurable: true
    });
}

//# sourceMappingURL=headers.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/hooks-server-context.js
var hooks_server_context = __webpack_require__(16);
;// ./node_modules/next/dist/esm/server/request/draft-mode.js







function draftMode() {
    const callingExpression = 'draftMode';
    const workStore = work_async_storage_external/* workAsyncStorage */.J.getStore();
    const workUnitStore = work_unit_async_storage_external/* workUnitAsyncStorage */.FP.getStore();
    if (!workStore || !workUnitStore) {
        (0,work_unit_async_storage_external/* throwForMissingRequestStore */.M1)(callingExpression);
    }
    switch(workUnitStore.type){
        case 'request':
            return createOrGetCachedExoticDraftMode(workUnitStore.draftMode, workStore);
        case 'cache':
        case 'unstable-cache':
            // Inside of `"use cache"` or `unstable_cache`, draft mode is available if
            // the outmost work unit store is a request store, and if draft mode is
            // enabled.
            const draftModeProvider = (0,work_unit_async_storage_external/* getDraftModeProviderForCacheScope */.lW)(workStore, workUnitStore);
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
            draft_mode_syncIODev(route, expression);
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
            draft_mode_syncIODev(route, expression);
            return instance.enable.apply(instance, arguments);
        }
    });
    Object.defineProperty(promise, 'disable', {
        value: function get() {
            const expression = '`draftMode().disable()`';
            draft_mode_syncIODev(route, expression);
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
function draft_mode_syncIODev(route, expression) {
    const workUnitStore = workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        trackSynchronousRequestDataAccessInDev(requestStore);
    }
    // In all cases we warn normally
    draft_mode_warnForSyncAccess(route, expression);
}
const draft_mode_warnForSyncAccess = createDedupedByCallsiteServerErrorLoggerDev(createDraftModeAccessError);
function createDraftModeAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`draftMode()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E377",
        enumerable: false,
        configurable: true
    });
}
function trackDynamicDraftMode(expression) {
    const store = work_async_storage_external/* workAsyncStorage */.J.getStore();
    const workUnitStore = work_unit_async_storage_external/* workUnitAsyncStorage */.FP.getStore();
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
            throw Object.defineProperty(new static_generation_bailout/* StaticGenBailoutError */.f(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
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
                (0,dynamic_rendering/* abortAndThrowOnSynchronousRequestDataAccess */.t3)(store.route, expression, error, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender
                (0,dynamic_rendering/* postponeWithTracking */.Ui)(store.route, expression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // legacy Prerender
                workUnitStore.revalidate = 0;
                const err = Object.defineProperty(new hooks_server_context/* DynamicServerError */.F(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
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
;// ./node_modules/next/dist/esm/api/headers.js




//# sourceMappingURL=headers.js.map

/***/ }),

/***/ 280:
/***/ ((module, exports, __webpack_require__) => {

var __dirname = "/";
var __WEBPACK_AMD_DEFINE_RESULT__;(()=>{var i={226:function(i,e){(function(o,a){"use strict";var r="1.0.35",t="",n="?",s="function",b="undefined",w="object",l="string",d="major",c="model",u="name",p="type",m="vendor",f="version",h="architecture",v="console",g="mobile",k="tablet",x="smarttv",_="wearable",y="embedded",q=350;var T="Amazon",S="Apple",z="ASUS",N="BlackBerry",A="Browser",C="Chrome",E="Edge",O="Firefox",U="Google",j="Huawei",P="LG",R="Microsoft",M="Motorola",B="Opera",V="Samsung",D="Sharp",I="Sony",W="Viera",F="Xiaomi",G="Zebra",H="Facebook",L="Chromium OS",Z="Mac OS";var extend=function(i,e){var o={};for(var a in i){if(e[a]&&e[a].length%2===0){o[a]=e[a].concat(i[a])}else{o[a]=i[a]}}return o},enumerize=function(i){var e={};for(var o=0;o<i.length;o++){e[i[o].toUpperCase()]=i[o]}return e},has=function(i,e){return typeof i===l?lowerize(e).indexOf(lowerize(i))!==-1:false},lowerize=function(i){return i.toLowerCase()},majorize=function(i){return typeof i===l?i.replace(/[^\d\.]/g,t).split(".")[0]:a},trim=function(i,e){if(typeof i===l){i=i.replace(/^\s\s*/,t);return typeof e===b?i:i.substring(0,q)}};var rgxMapper=function(i,e){var o=0,r,t,n,b,l,d;while(o<e.length&&!l){var c=e[o],u=e[o+1];r=t=0;while(r<c.length&&!l){if(!c[r]){break}l=c[r++].exec(i);if(!!l){for(n=0;n<u.length;n++){d=l[++t];b=u[n];if(typeof b===w&&b.length>0){if(b.length===2){if(typeof b[1]==s){this[b[0]]=b[1].call(this,d)}else{this[b[0]]=b[1]}}else if(b.length===3){if(typeof b[1]===s&&!(b[1].exec&&b[1].test)){this[b[0]]=d?b[1].call(this,d,b[2]):a}else{this[b[0]]=d?d.replace(b[1],b[2]):a}}else if(b.length===4){this[b[0]]=d?b[3].call(this,d.replace(b[1],b[2])):a}}else{this[b]=d?d:a}}}}o+=2}},strMapper=function(i,e){for(var o in e){if(typeof e[o]===w&&e[o].length>0){for(var r=0;r<e[o].length;r++){if(has(e[o][r],i)){return o===n?a:o}}}else if(has(e[o],i)){return o===n?a:o}}return i};var $={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},X={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"};var K={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[f,[u,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[f,[u,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[u,f],[/opios[\/ ]+([\w\.]+)/i],[f,[u,B+" Mini"]],[/\bopr\/([\w\.]+)/i],[f,[u,B]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[u,f],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[f,[u,"UC"+A]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[f,[u,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[f,[u,"WeChat"]],[/konqueror\/([\w\.]+)/i],[f,[u,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[f,[u,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[f,[u,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[u,/(.+)/,"$1 Secure "+A],f],[/\bfocus\/([\w\.]+)/i],[f,[u,O+" Focus"]],[/\bopt\/([\w\.]+)/i],[f,[u,B+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[f,[u,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[f,[u,"Dolphin"]],[/coast\/([\w\.]+)/i],[f,[u,B+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[f,[u,"MIUI "+A]],[/fxios\/([-\w\.]+)/i],[f,[u,O]],[/\bqihu|(qi?ho?o?|360)browser/i],[[u,"360 "+A]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[u,/(.+)/,"$1 "+A],f],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],f],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[u,f],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[u],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[u,H],f],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[u,f],[/\bgsa\/([\w\.]+) .*safari\//i],[f,[u,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[f,[u,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[f,[u,C+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[u,C+" WebView"],f],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[f,[u,"Android "+A]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[u,f],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[f,[u,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[f,u],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[u,[f,strMapper,$]],[/(webkit|khtml)\/([\w\.]+)/i],[u,f],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[u,"Netscape"],f],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[f,[u,O+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[u,f],[/(cobalt)\/([\w\.]+)/i],[u,[f,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows (ce|mobile); ppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[h,/ower/,t,lowerize]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[c,[m,V],[p,k]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[c,[m,V],[p,g]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[c,[m,S],[p,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[c,[m,S],[p,k]],[/(macintosh);/i],[c,[m,S]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[c,[m,D],[p,g]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[c,[m,j],[p,k]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[c,[m,j],[p,g]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[c,/_/g," "],[m,F],[p,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[c,/_/g," "],[m,F],[p,k]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[c,[m,"OPPO"],[p,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[c,[m,"Vivo"],[p,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[c,[m,"Realme"],[p,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[c,[m,M],[p,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[c,[m,M],[p,k]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[c,[m,P],[p,k]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[c,[m,P],[p,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[c,[m,"Lenovo"],[p,k]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[c,/_/g," "],[m,"Nokia"],[p,g]],[/(pixel c)\b/i],[c,[m,U],[p,k]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[c,[m,U],[p,g]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[c,[m,I],[p,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[c,"Xperia Tablet"],[m,I],[p,k]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[c,[m,"OnePlus"],[p,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[c,[m,T],[p,k]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[c,/(.+)/g,"Fire Phone $1"],[m,T],[p,g]],[/(playbook);[-\w\),; ]+(rim)/i],[c,m,[p,k]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[c,[m,N],[p,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[c,[m,z],[p,k]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[c,[m,z],[p,g]],[/(nexus 9)/i],[c,[m,"HTC"],[p,k]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[m,[c,/_/g," "],[p,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[c,[m,"Acer"],[p,k]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[c,[m,"Meizu"],[p,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[m,c,[p,g]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[m,c,[p,k]],[/(surface duo)/i],[c,[m,R],[p,k]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[c,[m,"Fairphone"],[p,g]],[/(u304aa)/i],[c,[m,"AT&T"],[p,g]],[/\bsie-(\w*)/i],[c,[m,"Siemens"],[p,g]],[/\b(rct\w+) b/i],[c,[m,"RCA"],[p,k]],[/\b(venue[\d ]{2,7}) b/i],[c,[m,"Dell"],[p,k]],[/\b(q(?:mv|ta)\w+) b/i],[c,[m,"Verizon"],[p,k]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[c,[m,"Barnes & Noble"],[p,k]],[/\b(tm\d{3}\w+) b/i],[c,[m,"NuVision"],[p,k]],[/\b(k88) b/i],[c,[m,"ZTE"],[p,k]],[/\b(nx\d{3}j) b/i],[c,[m,"ZTE"],[p,g]],[/\b(gen\d{3}) b.+49h/i],[c,[m,"Swiss"],[p,g]],[/\b(zur\d{3}) b/i],[c,[m,"Swiss"],[p,k]],[/\b((zeki)?tb.*\b) b/i],[c,[m,"Zeki"],[p,k]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[m,"Dragon Touch"],c,[p,k]],[/\b(ns-?\w{0,9}) b/i],[c,[m,"Insignia"],[p,k]],[/\b((nxa|next)-?\w{0,9}) b/i],[c,[m,"NextBook"],[p,k]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[m,"Voice"],c,[p,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[m,"LvTel"],c,[p,g]],[/\b(ph-1) /i],[c,[m,"Essential"],[p,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[c,[m,"Envizen"],[p,k]],[/\b(trio[-\w\. ]+) b/i],[c,[m,"MachSpeed"],[p,k]],[/\btu_(1491) b/i],[c,[m,"Rotor"],[p,k]],[/(shield[\w ]+) b/i],[c,[m,"Nvidia"],[p,k]],[/(sprint) (\w+)/i],[m,c,[p,g]],[/(kin\.[onetw]{3})/i],[[c,/\./g," "],[m,R],[p,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[c,[m,G],[p,k]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[c,[m,G],[p,g]],[/smart-tv.+(samsung)/i],[m,[p,x]],[/hbbtv.+maple;(\d+)/i],[[c,/^/,"SmartTV"],[m,V],[p,x]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[m,P],[p,x]],[/(apple) ?tv/i],[m,[c,S+" TV"],[p,x]],[/crkey/i],[[c,C+"cast"],[m,U],[p,x]],[/droid.+aft(\w)( bui|\))/i],[c,[m,T],[p,x]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[c,[m,D],[p,x]],[/(bravia[\w ]+)( bui|\))/i],[c,[m,I],[p,x]],[/(mitv-\w{5}) bui/i],[c,[m,F],[p,x]],[/Hbbtv.*(technisat) (.*);/i],[m,c,[p,x]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[m,trim],[c,trim],[p,x]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[p,x]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[m,c,[p,v]],[/droid.+; (shield) bui/i],[c,[m,"Nvidia"],[p,v]],[/(playstation [345portablevi]+)/i],[c,[m,I],[p,v]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[c,[m,R],[p,v]],[/((pebble))app/i],[m,c,[p,_]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[c,[m,S],[p,_]],[/droid.+; (glass) \d/i],[c,[m,U],[p,_]],[/droid.+; (wt63?0{2,3})\)/i],[c,[m,G],[p,_]],[/(quest( 2| pro)?)/i],[c,[m,H],[p,_]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[m,[p,y]],[/(aeobc)\b/i],[c,[m,T],[p,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[c,[p,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[c,[p,k]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[p,k]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[p,g]],[/(android[-\w\. ]{0,9});.+buil/i],[c,[m,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[f,[u,E+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[f,[u,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[u,f],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[f,u]],os:[[/microsoft (windows) (vista|xp)/i],[u,f],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[u,[f,strMapper,X]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[u,"Windows"],[f,strMapper,X]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/ios;fbsv\/([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[f,/_/g,"."],[u,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[u,Z],[f,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[f,u],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[u,f],[/\(bb(10);/i],[f,[u,N]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[f,[u,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[f,[u,O+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[f,[u,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[f,[u,"watchOS"]],[/crkey\/([\d\.]+)/i],[f,[u,C+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[u,L],f],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[u,f],[/(sunos) ?([\w\.\d]*)/i],[[u,"Solaris"],f],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[u,f]]};var UAParser=function(i,e){if(typeof i===w){e=i;i=a}if(!(this instanceof UAParser)){return new UAParser(i,e).getResult()}var r=typeof o!==b&&o.navigator?o.navigator:a;var n=i||(r&&r.userAgent?r.userAgent:t);var v=r&&r.userAgentData?r.userAgentData:a;var x=e?extend(K,e):K;var _=r&&r.userAgent==n;this.getBrowser=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.browser);i[d]=majorize(i[f]);if(_&&r&&r.brave&&typeof r.brave.isBrave==s){i[u]="Brave"}return i};this.getCPU=function(){var i={};i[h]=a;rgxMapper.call(i,n,x.cpu);return i};this.getDevice=function(){var i={};i[m]=a;i[c]=a;i[p]=a;rgxMapper.call(i,n,x.device);if(_&&!i[p]&&v&&v.mobile){i[p]=g}if(_&&i[c]=="Macintosh"&&r&&typeof r.standalone!==b&&r.maxTouchPoints&&r.maxTouchPoints>2){i[c]="iPad";i[p]=k}return i};this.getEngine=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.engine);return i};this.getOS=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.os);if(_&&!i[u]&&v&&v.platform!="Unknown"){i[u]=v.platform.replace(/chrome os/i,L).replace(/macos/i,Z)}return i};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return n};this.setUA=function(i){n=typeof i===l&&i.length>q?trim(i,q):i;return this};this.setUA(n);return this};UAParser.VERSION=r;UAParser.BROWSER=enumerize([u,f,d]);UAParser.CPU=enumerize([h]);UAParser.DEVICE=enumerize([c,m,p,v,g,x,k,_,y]);UAParser.ENGINE=UAParser.OS=enumerize([u,f]);if(typeof e!==b){if("object"!==b&&i.exports){e=i.exports=UAParser}e.UAParser=UAParser}else{if("function"===s&&__webpack_require__.amdO){!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return UAParser}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else if(typeof o!==b){o.UAParser=UAParser}}var Q=typeof o!==b&&(o.jQuery||o.Zepto);if(Q&&!Q.ua){var Y=new UAParser;Q.ua=Y.getResult();Q.ua.get=function(){return Y.getUA()};Q.ua.set=function(i){Y.setUA(i);var e=Y.getResult();for(var o in e){Q.ua[o]=e[o]}}}})(typeof window==="object"?window:this)}};var e={};function __nccwpck_require__(o){var a=e[o];if(a!==undefined){return a.exports}var r=e[o]={exports:{}};var t=true;try{i[o].call(r.exports,r,r.exports,__nccwpck_require__);t=false}finally{if(t)delete e[o]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var o=__nccwpck_require__(226);module.exports=o})();

/***/ }),

/***/ 335:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iC: () => (/* binding */ isRequestAPICallableInsideAfter)
/* harmony export */ });
/* unused harmony exports throwWithStaticGenerationBailoutError, throwWithStaticGenerationBailoutErrorWithDynamicError, throwForSearchParamsAccessInUseCache */
/* harmony import */ var _client_components_static_generation_bailout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(602);
/* harmony import */ var _app_render_after_task_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(427);


function throwWithStaticGenerationBailoutError(route, expression) {
    throw Object.defineProperty(new StaticGenBailoutError(`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E576",
        enumerable: false,
        configurable: true
    });
}
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E634",
        enumerable: false,
        configurable: true
    });
    workStore.invalidUsageError ??= error;
    throw error;
}
function isRequestAPICallableInsideAfter() {
    const afterTaskStore = _app_render_after_task_async_storage_external__WEBPACK_IMPORTED_MODULE_1__/* .afterTaskAsyncStorage */ .Z.getStore();
    return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === 'action';
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 356:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ HeadersAdapter)
/* harmony export */ });
/* unused harmony export ReadonlyHeadersError */
/* harmony import */ var _reflect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(716);

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
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
                    return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.deleteProperty(target, original);
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
                        return _reflect__WEBPACK_IMPORTED_MODULE_0__/* .ReflectAdapter */ .l.get(target, prop, receiver);
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

/***/ 412:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const map = __webpack_require__(9)
const { snakeCase } = __webpack_require__(540)

module.exports = function (obj, options) {
  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)

  return map(obj, function (key, val) {
    return [
      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),
      val
    ]
  }, options)
}

function matches (patterns, value) {
  return patterns.some(function (pattern) {
    return typeof pattern === 'string'
      ? pattern === value
      : pattern.test(value)
  })
}


/***/ }),

/***/ 427:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* reexport */ afterTaskAsyncStorageInstance)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/async-local-storage.js
var async_local_storage = __webpack_require__(620);
;// ./node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js

const afterTaskAsyncStorageInstance = (0,async_local_storage/* createAsyncLocalStorage */.xl)();

//# sourceMappingURL=after-task-async-storage-instance.js.map
;// ./node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js
// Share the instance module in the next-shared layer



//# sourceMappingURL=after-task-async-storage.external.js.map

/***/ }),

/***/ 499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(803);
} else {}


/***/ }),

/***/ 521:
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ 535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  J: () => (/* reexport */ workAsyncStorageInstance)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/async-local-storage.js
var async_local_storage = __webpack_require__(58);
;// ./node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js

const workAsyncStorageInstance = (0,async_local_storage/* createAsyncLocalStorage */.xl)();

//# sourceMappingURL=work-async-storage-instance.js.map
;// ./node_modules/next/dist/esm/server/app-render/work-async-storage.external.js
// Share the instance module in the next-shared layer



//# sourceMappingURL=work-async-storage.external.js.map

/***/ }),

/***/ 540:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  snakeCase: () => (/* binding */ snakeCase)
});

;// ./node_modules/tslib/tslib.es6.js
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

;// ./node_modules/lower-case/dist.es2015/index.js
/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
var SUPPORTED_LOCALE = {
    tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069",
        },
    },
    az: {
        regexp: /\u0130/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069",
        },
    },
    lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
            I: "\u0069\u0307",
            J: "\u006A\u0307",
            Į: "\u012F\u0307",
            Ì: "\u0069\u0307\u0300",
            Í: "\u0069\u0307\u0301",
            Ĩ: "\u0069\u0307\u0303",
        },
    },
};
/**
 * Localized lower case.
 */
function localeLowerCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang)
        return lowerCase(str.replace(lang.regexp, function (m) { return lang.map[m]; }));
    return lowerCase(str);
}
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}
//# sourceMappingURL=index.js.map
;// ./node_modules/no-case/dist.es2015/index.js

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}
//# sourceMappingURL=index.js.map
;// ./node_modules/dot-case/dist.es2015/index.js


function dotCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "." }, options));
}
//# sourceMappingURL=index.js.map
;// ./node_modules/snake-case/dist.es2015/index.js


function snakeCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "_" }, options));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 552:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(356)["Buffer"];

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
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    },
    reader: function() {
        return reader;
    }
});
const _context = __webpack_require__(201);
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? '').split('\n');
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes('/next/dist/'));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace('webpack-internal:///(rsc)/', '').trim());
    return stack.join('    ');
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: 'fetch',
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    'next-test-stack',
                    getTestStack()
                ]
            ],
            body: body ? Buffer.from(await request.arrayBuffer()).toString('base64') : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? Buffer.from(body, 'base64') : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        // Passthrough non-test requests.
        return originalFetch(request);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: 'POST',
        body: JSON.stringify(proxyRequest),
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw Object.defineProperty(new Error(`Proxy request failed: ${resp.status}`), "__NEXT_ERROR_CODE", {
            value: "E146",
            enumerable: false,
            configurable: true
        });
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case 'continue':
            return originalFetch(request);
        case 'abort':
        case 'unhandled':
            throw Object.defineProperty(new Error(`Proxy request aborted [${request.method} ${request.url}]`), "__NEXT_ERROR_CODE", {
                value: "E145",
                enumerable: false,
                configurable: true
            });
        default:
            break;
    }
    return buildResponse(proxyResponse);
}
function interceptFetch(originalFetch) {
    __webpack_require__.g.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        __webpack_require__.g.fetch = originalFetch;
    };
}

//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ 557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  t3: () => (/* binding */ abortAndThrowOnSynchronousRequestDataAccess),
  I3: () => (/* binding */ isDynamicPostpone),
  Ui: () => (/* binding */ postponeWithTracking),
  xI: () => (/* binding */ throwToInterruptStaticGeneration),
  Pk: () => (/* binding */ trackDynamicDataInDynamicRender)
});

// UNUSED EXPORTS: Postpone, abortOnSynchronousPlatformIOAccess, accessedDynamicData, annotateDynamicAccess, consumeDynamicAccess, createDynamicTrackingState, createDynamicValidationState, createHangingInputAbortSignal, createPostponedAbortSignal, formatDynamicAPIAccesses, getFirstDynamicReason, isPrerenderInterruptedError, markCurrentScopeAsDynamic, throwIfDisallowedDynamic, trackAllowedDynamicAccess, trackFallbackParamAccessed, trackSynchronousPlatformIOAccessInDev, trackSynchronousRequestDataAccessInDev, useDynamicRouteParams

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.react-server.js
var react_react_server = __webpack_require__(815);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/hooks-server-context.js
var hooks_server_context = __webpack_require__(16);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/static-generation-bailout.js
var static_generation_bailout = __webpack_require__(602);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js + 2 modules
var work_unit_async_storage_external = __webpack_require__(115);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/work-async-storage.external.js + 1 modules
var work_async_storage_external = __webpack_require__(535);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/dynamic-rendering-utils.js
var dynamic_rendering_utils = __webpack_require__(801);
;// ./node_modules/next/dist/esm/lib/metadata/metadata-constants.js
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';

//# sourceMappingURL=metadata-constants.js.map
;// ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js
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
 */ // Once postpone is in stable we should switch to importing the postpone export directly








const hasPostpone = typeof react_react_server.unstable_postpone === 'function';
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
/**
 * This function communicates that the current scope should be treated as dynamic.
 *
 * In most cases this function is a no-op but if called during
 * a PPR prerender it will postpone the current sub-tree and calling
 * it during a normal prerender will cause the entire prerender to abort
 */ function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
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
        throw Object.defineProperty(new StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
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
            const err = Object.defineProperty(new DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
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
/**
 * This function communicates that some dynamic path parameter was read. This
 * differs from the more general `trackDynamicDataAccessed` in that it is will
 * not error when `dynamic = "error"` is set.
 *
 * @param store The static generation store
 * @param expression The expression that was accessed dynamically
 */ function trackFallbackParamAccessed(store, expression) {
    const prerenderStore = workUnitAsyncStorage.getStore();
    if (!prerenderStore || prerenderStore.type !== 'prerender-ppr') return;
    postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
}
/**
 * This function is meant to be used when prerendering without dynamicIO or PPR.
 * When called during a build it will cause Next.js to consider the route as dynamic.
 *
 * @internal
 */ function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new hooks_server_context/* DynamicServerError */.F(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
/**
 * This function should be used to track whether something dynamic happened even when
 * we are in a dynamic render. This is useful for Dev where all renders are dynamic but
 * we still track whether dynamic APIs were accessed for helpful messaging
 *
 * @internal
 */ function trackDynamicDataInDynamicRender(_store, workUnitStore) {
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
/**
 * use this function when prerendering with dynamicIO. If we are doing a
 * prospective prerender we don't actually abort because we want to discover
 * all caches for the shell. If this is the actual prerender we do abort.
 *
 * This function accepts a prerenderStore but the caller should ensure we're
 * actually running in dynamicIO mode.
 *
 * @internal
 */ function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
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
// For now these implementations are the same so we just reexport
const trackSynchronousRequestDataAccessInDev = (/* unused pure expression or super */ null && (trackSynchronousPlatformIOAccessInDev));
function Postpone({ reason, route }) {
    const prerenderStore = workUnitAsyncStorage.getStore();
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
    react_react_server.unstable_postpone(createPostponeReason(route, expression));
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
/**
 * This is a bit of a hack to allow us to abort a render using a Postpone instance instead of an Error which changes React's
 * abort semantics slightly.
 */ function createPostponedAbortSignal(reason) {
    assertPostpone();
    const controller = new AbortController();
    // We get our hands on a postpone instance by calling postpone and catching the throw
    try {
        React.unstable_postpone(reason);
    } catch (x) {
        controller.abort(x);
    }
    return controller.signal;
}
/**
 * In a prerender, we may end up with hanging Promises as inputs due them
 * stalling on connection() or because they're loading dynamic data. In that
 * case we need to abort the encoding of arguments since they'll never complete.
 */ function createHangingInputAbortSignal(workUnitStore) {
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
        scheduleOnNextTick(()=>controller.abort());
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
    const workStore = workAsyncStorage.getStore();
    if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
        // There are fallback route params, we should track these as dynamic
        // accesses.
        const workUnitStore = workUnitAsyncStorage.getStore();
        if (workUnitStore) {
            // We're prerendering with dynamicIO or PPR or both
            if (workUnitStore.type === 'prerender') {
                // We are in a prerender with dynamicIO semantics
                // We are going to hang here and never resolve. This will cause the currently
                // rendering component to effectively be a dynamic hole
                React.use(makeHangingPromise(workUnitStore.renderSignal, expression));
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
const hasMetadataRegex = new RegExp(`\\n\\s+at ${METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${OUTLET_BOUNDARY_NAME}[\\n\\s]`);
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
        throw new StaticGenBailoutError();
    }
    const dynamicErrors = dynamicValidation.dynamicErrors;
    if (dynamicErrors.length) {
        for(let i = 0; i < dynamicErrors.length; i++){
            console.error(dynamicErrors[i]);
        }
        throw new StaticGenBailoutError();
    }
    if (!dynamicValidation.hasSuspendedDynamic) {
        if (dynamicValidation.hasDynamicMetadata) {
            if (syncError) {
                console.error(syncError);
                throw Object.defineProperty(new StaticGenBailoutError(`Route "${route}" has a \`generateMetadata\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E608",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new StaticGenBailoutError(`Route "${route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                value: "E534",
                enumerable: false,
                configurable: true
            });
        } else if (dynamicValidation.hasDynamicViewport) {
            if (syncError) {
                console.error(syncError);
                throw Object.defineProperty(new StaticGenBailoutError(`Route "${route}" has a \`generateViewport\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E573",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new StaticGenBailoutError(`Route "${route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                value: "E590",
                enumerable: false,
                configurable: true
            });
        }
    }
}

//# sourceMappingURL=dynamic-rendering.js.map

/***/ }),

/***/ 602:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ StaticGenBailoutError)
/* harmony export */ });
/* unused harmony export isStaticGenBailoutError */
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
} //# sourceMappingURL=static-generation-bailout.js.map


/***/ }),

/***/ 620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cg: () => (/* binding */ bindSnapshot),
/* harmony export */   xl: () => (/* binding */ createAsyncLocalStorage)
/* harmony export */ });
/* unused harmony export createSnapshot */
const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
        return fn;
    }
}
const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}
function bindSnapshot(fn) {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
}
function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
        return fn(...args);
    };
}

//# sourceMappingURL=async-local-storage.js.map

/***/ }),

/***/ 654:
/***/ ((module) => {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ 716:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ ReflectAdapter)
/* harmony export */ });
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}

//# sourceMappingURL=reflect.js.map

/***/ }),

/***/ 724:
/***/ ((module) => {

"use strict";

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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  RequestCookies: () => RequestCookies,
  ResponseCookies: () => ResponseCookies,
  parseCookie: () => parseCookie,
  parseSetCookie: () => parseSetCookie,
  stringifyCookie: () => stringifyCookie
});
module.exports = __toCommonJS(src_exports);

// src/serialize.ts
function stringifyCookie(c) {
  var _a;
  const attrs = [
    "path" in c && c.path && `Path=${c.path}`,
    "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
    "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
    "domain" in c && c.domain && `Domain=${c.domain}`,
    "secure" in c && c.secure && "Secure",
    "httpOnly" in c && c.httpOnly && "HttpOnly",
    "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
    "partitioned" in c && c.partitioned && "Partitioned",
    "priority" in c && c.priority && `Priority=${c.priority}`
  ].filter(Boolean);
  const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
  return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
  const map = /* @__PURE__ */ new Map();
  for (const pair of cookie.split(/; */)) {
    if (!pair)
      continue;
    const splitAt = pair.indexOf("=");
    if (splitAt === -1) {
      map.set(pair, "true");
      continue;
    }
    const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
    try {
      map.set(key, decodeURIComponent(value != null ? value : "true"));
    } catch {
    }
  }
  return map;
}
function parseSetCookie(setCookie) {
  if (!setCookie) {
    return void 0;
  }
  const [[name, value], ...attributes] = parseCookie(setCookie);
  const {
    domain,
    expires,
    httponly,
    maxage,
    path,
    samesite,
    secure,
    partitioned,
    priority
  } = Object.fromEntries(
    attributes.map(([key, value2]) => [
      key.toLowerCase().replace(/-/g, ""),
      value2
    ])
  );
  const cookie = {
    name,
    value: decodeURIComponent(value),
    domain,
    ...expires && { expires: new Date(expires) },
    ...httponly && { httpOnly: true },
    ...typeof maxage === "string" && { maxAge: Number(maxage) },
    path,
    ...samesite && { sameSite: parseSameSite(samesite) },
    ...secure && { secure: true },
    ...priority && { priority: parsePriority(priority) },
    ...partitioned && { partitioned: true }
  };
  return compact(cookie);
}
function compact(t) {
  const newT = {};
  for (const key in t) {
    if (t[key]) {
      newT[key] = t[key];
    }
  }
  return newT;
}
var SAME_SITE = ["strict", "lax", "none"];
function parseSameSite(string) {
  string = string.toLowerCase();
  return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = ["low", "medium", "high"];
function parsePriority(string) {
  string = string.toLowerCase();
  return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
  if (!cookiesString)
    return [];
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

// src/request-cookies.ts
var RequestCookies = class {
  constructor(requestHeaders) {
    /** @internal */
    this._parsed = /* @__PURE__ */ new Map();
    this._headers = requestHeaders;
    const header = requestHeaders.get("cookie");
    if (header) {
      const parsed = parseCookie(header);
      for (const [name, value] of parsed) {
        this._parsed.set(name, { name, value });
      }
    }
  }
  [Symbol.iterator]() {
    return this._parsed[Symbol.iterator]();
  }
  /**
   * The amount of cookies received from the client
   */
  get size() {
    return this._parsed.size;
  }
  get(...args) {
    const name = typeof args[0] === "string" ? args[0] : args[0].name;
    return this._parsed.get(name);
  }
  getAll(...args) {
    var _a;
    const all = Array.from(this._parsed);
    if (!args.length) {
      return all.map(([_, value]) => value);
    }
    const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
    return all.filter(([n]) => n === name).map(([_, value]) => value);
  }
  has(name) {
    return this._parsed.has(name);
  }
  set(...args) {
    const [name, value] = args.length === 1 ? [args[0].name, args[0].value] : args;
    const map = this._parsed;
    map.set(name, { name, value });
    this._headers.set(
      "cookie",
      Array.from(map).map(([_, value2]) => stringifyCookie(value2)).join("; ")
    );
    return this;
  }
  /**
   * Delete the cookies matching the passed name or names in the request.
   */
  delete(names) {
    const map = this._parsed;
    const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
    this._headers.set(
      "cookie",
      Array.from(map).map(([_, value]) => stringifyCookie(value)).join("; ")
    );
    return result;
  }
  /**
   * Delete all the cookies in the cookies in the request.
   */
  clear() {
    this.delete(Array.from(this._parsed.keys()));
    return this;
  }
  /**
   * Format the cookies in the request as a string for logging
   */
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
  }
};

// src/response-cookies.ts
var ResponseCookies = class {
  constructor(responseHeaders) {
    /** @internal */
    this._parsed = /* @__PURE__ */ new Map();
    var _a, _b, _c;
    this._headers = responseHeaders;
    const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
    const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
    for (const cookieString of cookieStrings) {
      const parsed = parseSetCookie(cookieString);
      if (parsed)
        this._parsed.set(parsed.name, parsed);
    }
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */
  get(...args) {
    const key = typeof args[0] === "string" ? args[0] : args[0].name;
    return this._parsed.get(key);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */
  getAll(...args) {
    var _a;
    const all = Array.from(this._parsed.values());
    if (!args.length) {
      return all;
    }
    const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
    return all.filter((c) => c.name === key);
  }
  has(name) {
    return this._parsed.has(name);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */
  set(...args) {
    const [name, value, cookie] = args.length === 1 ? [args[0].name, args[0].value, args[0]] : args;
    const map = this._parsed;
    map.set(name, normalizeCookie({ name, value, ...cookie }));
    replace(map, this._headers);
    return this;
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */
  delete(...args) {
    const [name, options] = typeof args[0] === "string" ? [args[0]] : [args[0].name, args[0]];
    return this.set({ ...options, name, value: "", expires: /* @__PURE__ */ new Date(0) });
  }
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map(stringifyCookie).join("; ");
  }
};
function replace(bag, headers) {
  headers.delete("set-cookie");
  for (const [, value] of bag) {
    const serialized = stringifyCookie(value);
    headers.append("set-cookie", serialized);
  }
}
function normalizeCookie(cookie = { name: "", value: "" }) {
  if (typeof cookie.expires === "number") {
    cookie.expires = new Date(cookie.expires);
  }
  if (cookie.maxAge) {
    cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
  }
  if (cookie.path === null || cookie.path === void 0) {
    cookie.path = "/";
  }
  return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ud: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.stringifyCookie),
/* harmony export */   VO: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.ResponseCookies),
/* harmony export */   tm: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.RequestCookies)
/* harmony export */ });
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(724);
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__);


//# sourceMappingURL=cookies.js.map

/***/ }),

/***/ 792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  X: () => (/* binding */ unstable_rethrow)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/dynamic-rendering-utils.js
var dynamic_rendering_utils = __webpack_require__(801);
;// ./node_modules/next/dist/esm/server/lib/router-utils/is-postpone.js
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
}

//# sourceMappingURL=is-postpone.js.map
;// ./node_modules/next/dist/esm/shared/lib/lazy-dynamic/bailout-to-csr.js
// This has to be a shared module which is shared between client component error boundary and dynamic component
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
/** An error that should be thrown when we want to bail out to client-side rendering. */ class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
/** Checks if a passed argument is an error that is thrown if we want to bail out to client-side rendering. */ function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/is-next-router-error.js
var is_next_router_error = __webpack_require__(199);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js + 1 modules
var dynamic_rendering = __webpack_require__(557);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/client/components/hooks-server-context.js
var hooks_server_context = __webpack_require__(16);
;// ./node_modules/next/dist/esm/client/components/unstable-rethrow.server.js






function unstable_rethrow(error) {
    if ((0,is_next_router_error/* isNextRouterError */.p)(error) || isBailoutToCSRError(error) || (0,hooks_server_context/* isDynamicServerError */.h)(error) || (0,dynamic_rendering/* isDynamicPostpone */.I3)(error) || isPostpone(error) || (0,dynamic_rendering_utils/* isHangingPromiseRejectionError */.T)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
} //# sourceMappingURL=unstable-rethrow.server.js.map


/***/ }),

/***/ 799:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-server-dom-webpack-server.edge.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var ReactDOM = __webpack_require__(499), React = __webpack_require__(815), REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
Symbol.for("react.postpone");
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ASYNC_ITERATOR = Symbol.asyncIterator;
function handleErrorInNextTick(error) {
    setTimeoutOrImmediate(function() {
        throw error;
    });
}
var LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
    LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
}, currentView = null, writtenBytes = 0;
function writeChunkAndReturn(destination, chunk) {
    if (0 !== chunk.byteLength) if (2048 < chunk.byteLength) 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
    else {
        var allowableBytes = currentView.length - writtenBytes;
        allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(chunk.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
        currentView.set(chunk, writtenBytes);
        writtenBytes += chunk.byteLength;
    }
    return !0;
}
var textEncoder = new TextEncoder();
function stringToChunk(content) {
    return textEncoder.encode(content);
}
function byteLengthOfChunk(chunk) {
    return chunk.byteLength;
}
function closeWithError(destination, error) {
    "function" === typeof destination.error ? destination.error(error) : destination.close();
}
var CLIENT_REFERENCE_TAG$1 = Symbol.for("react.client.reference"), SERVER_REFERENCE_TAG = Symbol.for("react.server.reference");
function registerClientReferenceImpl(proxyImplementation, id, async) {
    return Object.defineProperties(proxyImplementation, {
        $$typeof: {
            value: CLIENT_REFERENCE_TAG$1
        },
        $$id: {
            value: id
        },
        $$async: {
            value: async
        }
    });
}
var FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice;
function bind() {
    var newFn = FunctionBind.apply(this, arguments);
    if (this.$$typeof === SERVER_REFERENCE_TAG) {
        var args = ArraySlice.call(arguments, 1), $$typeof = {
            value: SERVER_REFERENCE_TAG
        }, $$id = {
            value: this.$$id
        };
        args = {
            value: this.$$bound ? this.$$bound.concat(args) : args
        };
        return Object.defineProperties(newFn, {
            $$typeof: $$typeof,
            $$id: $$id,
            $$bound: args,
            bind: {
                value: bind,
                configurable: !0
            }
        });
    }
    return newFn;
}
var PROMISE_PROTOTYPE = Promise.prototype, deepProxyHandlers = {
    get: function(target, name) {
        switch(name){
            case "$$typeof":
                return target.$$typeof;
            case "$$id":
                return target.$$id;
            case "$$async":
                return target.$$async;
            case "name":
                return target.name;
            case "displayName":
                return;
            case "defaultProps":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case Symbol.toStringTag:
                return Object.prototype[Symbol.toStringTag];
            case "Provider":
                throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
            case "then":
                throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
        }
        throw Error("Cannot access " + (String(target.name) + "." + String(name)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
    },
    set: function() {
        throw Error("Cannot assign to a client module from a server module.");
    }
};
function getReference(target, name) {
    switch(name){
        case "$$typeof":
            return target.$$typeof;
        case "$$id":
            return target.$$id;
        case "$$async":
            return target.$$async;
        case "name":
            return target.name;
        case "defaultProps":
            return;
        case "toJSON":
            return;
        case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
        case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
        case "__esModule":
            var moduleId = target.$$id;
            target.default = registerClientReferenceImpl(function() {
                throw Error("Attempted to call the default export of " + moduleId + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
            }, target.$$id + "#", target.$$async);
            return !0;
        case "then":
            if (target.then) return target.then;
            if (target.$$async) return;
            var clientReference = registerClientReferenceImpl({}, target.$$id, !0), proxy = new Proxy(clientReference, proxyHandlers$1);
            target.status = "fulfilled";
            target.value = proxy;
            return target.then = registerClientReferenceImpl(function(resolve) {
                return Promise.resolve(resolve(proxy));
            }, target.$$id + "#then", !1);
    }
    if ("symbol" === typeof name) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
    clientReference = target[name];
    clientReference || (clientReference = registerClientReferenceImpl(function() {
        throw Error("Attempted to call " + String(name) + "() from the server but " + String(name) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
    }, target.$$id + "#" + name, target.$$async), Object.defineProperty(clientReference, "name", {
        value: name
    }), clientReference = target[name] = new Proxy(clientReference, deepProxyHandlers));
    return clientReference;
}
var proxyHandlers$1 = {
    get: function(target, name) {
        return getReference(target, name);
    },
    getOwnPropertyDescriptor: function(target, name) {
        var descriptor = Object.getOwnPropertyDescriptor(target, name);
        descriptor || (descriptor = {
            value: getReference(target, name),
            writable: !1,
            configurable: !1,
            enumerable: !1
        }, Object.defineProperty(target, name, descriptor));
        return descriptor;
    },
    getPrototypeOf: function() {
        return PROMISE_PROTOTYPE;
    },
    set: function() {
        throw Error("Cannot assign to a client module from a server module.");
    }
}, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, previousDispatcher = ReactDOMSharedInternals.d;
ReactDOMSharedInternals.d = {
    f: previousDispatcher.f,
    r: previousDispatcher.r,
    D: prefetchDNS,
    C: preconnect,
    L: preload,
    m: preloadModule$1,
    X: preinitScript,
    S: preinitStyle,
    M: preinitModuleScript
};
function prefetchDNS(href) {
    if ("string" === typeof href && href) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "D|" + href;
            hints.has(key) || (hints.add(key), emitHint(request, "D", href));
        } else previousDispatcher.D(href);
    }
}
function preconnect(href, crossOrigin) {
    if ("string" === typeof href) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "C|" + (null == crossOrigin ? "null" : crossOrigin) + "|" + href;
            hints.has(key) || (hints.add(key), "string" === typeof crossOrigin ? emitHint(request, "C", [
                href,
                crossOrigin
            ]) : emitHint(request, "C", href));
        } else previousDispatcher.C(href, crossOrigin);
    }
}
function preload(href, as, options) {
    if ("string" === typeof href) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "L";
            if ("image" === as && options) {
                var imageSrcSet = options.imageSrcSet, imageSizes = options.imageSizes, uniquePart = "";
                "string" === typeof imageSrcSet && "" !== imageSrcSet ? (uniquePart += "[" + imageSrcSet + "]", "string" === typeof imageSizes && (uniquePart += "[" + imageSizes + "]")) : uniquePart += "[][]" + href;
                key += "[image]" + uniquePart;
            } else key += "[" + as + "]" + href;
            hints.has(key) || (hints.add(key), (options = trimOptions(options)) ? emitHint(request, "L", [
                href,
                as,
                options
            ]) : emitHint(request, "L", [
                href,
                as
            ]));
        } else previousDispatcher.L(href, as, options);
    }
}
function preloadModule$1(href, options) {
    if ("string" === typeof href) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "m|" + href;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "m", [
                href,
                options
            ]) : emitHint(request, "m", href);
        }
        previousDispatcher.m(href, options);
    }
}
function preinitStyle(href, precedence, options) {
    if ("string" === typeof href) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "S|" + href;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "S", [
                href,
                "string" === typeof precedence ? precedence : 0,
                options
            ]) : "string" === typeof precedence ? emitHint(request, "S", [
                href,
                precedence
            ]) : emitHint(request, "S", href);
        }
        previousDispatcher.S(href, precedence, options);
    }
}
function preinitScript(src, options) {
    if ("string" === typeof src) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "X|" + src;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "X", [
                src,
                options
            ]) : emitHint(request, "X", src);
        }
        previousDispatcher.X(src, options);
    }
}
function preinitModuleScript(src, options) {
    if ("string" === typeof src) {
        var request = resolveRequest();
        if (request) {
            var hints = request.hints, key = "M|" + src;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "M", [
                src,
                options
            ]) : emitHint(request, "M", src);
        }
        previousDispatcher.M(src, options);
    }
}
function trimOptions(options) {
    if (null == options) return null;
    var hasProperties = !1, trimmed = {}, key;
    for(key in options)null != options[key] && (hasProperties = !0, trimmed[key] = options[key]);
    return hasProperties ? trimmed : null;
}
var supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null;
"object" === typeof async_hooks ? async_hooks.createHook : function() {
    return {
        enable: function() {},
        disable: function() {}
    };
};
"object" === typeof async_hooks ? async_hooks.executionAsyncId : null;
var TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"), proxyHandlers = {
    get: function(target, name) {
        switch(name){
            case "$$typeof":
                return target.$$typeof;
            case "name":
                return;
            case "displayName":
                return;
            case "defaultProps":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case Symbol.toStringTag:
                return Object.prototype[Symbol.toStringTag];
            case "Provider":
                throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
        }
        throw Error("Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
    },
    set: function() {
        throw Error("Cannot assign to a temporary client reference from a server module.");
    }
};
function createTemporaryReference(temporaryReferences, id) {
    var reference = Object.defineProperties(function() {
        throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
    }, {
        $$typeof: {
            value: TEMPORARY_REFERENCE_TAG
        }
    });
    reference = new Proxy(reference, proxyHandlers);
    temporaryReferences.set(reference, id);
    return reference;
}
var SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
function noop$1() {}
function trackUsedThenable(thenableState, thenable, index) {
    index = thenableState[index];
    void 0 === index ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop$1, noop$1), thenable = index);
    switch(thenable.status){
        case "fulfilled":
            return thenable.value;
        case "rejected":
            throw thenable.reason;
        default:
            "string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenableState = thenable, thenableState.status = "pending", thenableState.then(function(fulfilledValue) {
                if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                }
            }, function(error) {
                if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                }
            }));
            switch(thenable.status){
                case "fulfilled":
                    return thenable.value;
                case "rejected":
                    throw thenable.reason;
            }
            suspendedThenable = thenable;
            throw SuspenseException;
    }
}
var suspendedThenable = null;
function getSuspendedThenable() {
    if (null === suspendedThenable) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var thenable = suspendedThenable;
    suspendedThenable = null;
    return thenable;
}
var currentRequest$1 = null, thenableIndexCounter = 0, thenableState = null;
function getThenableStateAfterSuspending() {
    var state = thenableState || [];
    thenableState = null;
    return state;
}
var HooksDispatcher = {
    readContext: unsupportedContext,
    use: use,
    useCallback: function(callback) {
        return callback;
    },
    useContext: unsupportedContext,
    useEffect: unsupportedHook,
    useImperativeHandle: unsupportedHook,
    useLayoutEffect: unsupportedHook,
    useInsertionEffect: unsupportedHook,
    useMemo: function(nextCreate) {
        return nextCreate();
    },
    useReducer: unsupportedHook,
    useRef: unsupportedHook,
    useState: unsupportedHook,
    useDebugValue: function() {},
    useDeferredValue: unsupportedHook,
    useTransition: unsupportedHook,
    useSyncExternalStore: unsupportedHook,
    useId: useId,
    useHostTransitionStatus: unsupportedHook,
    useFormState: unsupportedHook,
    useActionState: unsupportedHook,
    useOptimistic: unsupportedHook,
    useMemoCache: function(size) {
        for(var data = Array(size), i = 0; i < size; i++)data[i] = REACT_MEMO_CACHE_SENTINEL;
        return data;
    },
    useCacheRefresh: function() {
        return unsupportedRefresh;
    }
};
function unsupportedHook() {
    throw Error("This Hook is not supported in Server Components.");
}
function unsupportedRefresh() {
    throw Error("Refreshing the cache is not supported in Server Components.");
}
function unsupportedContext() {
    throw Error("Cannot read a Client Context from a Server Component.");
}
function useId() {
    if (null === currentRequest$1) throw Error("useId can only be used while React is rendering");
    var id = currentRequest$1.identifierCount++;
    return ":" + currentRequest$1.identifierPrefix + "S" + id.toString(32) + ":";
}
function use(usable) {
    if (null !== usable && "object" === typeof usable || "function" === typeof usable) {
        if ("function" === typeof usable.then) {
            var index = thenableIndexCounter;
            thenableIndexCounter += 1;
            null === thenableState && (thenableState = []);
            return trackUsedThenable(thenableState, usable, index);
        }
        usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
    }
    if (usable.$$typeof === CLIENT_REFERENCE_TAG$1) {
        if (null != usable.value && usable.value.$$typeof === REACT_CONTEXT_TYPE) throw Error("Cannot read a Client Context from a Server Component.");
        throw Error("Cannot use() an already resolved Client Reference.");
    }
    throw Error("An unsupported type was passed to use(): " + String(usable));
}
var DefaultAsyncDispatcher = {
    getCacheForType: function(resourceType) {
        var JSCompiler_inline_result = (JSCompiler_inline_result = resolveRequest()) ? JSCompiler_inline_result.cache : new Map();
        var entry = JSCompiler_inline_result.get(resourceType);
        void 0 === entry && (entry = resourceType(), JSCompiler_inline_result.set(resourceType, entry));
        return entry;
    }
}, ReactSharedInternalsServer = React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
if (!ReactSharedInternalsServer) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
var isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf;
function objectName(object) {
    return Object.prototype.toString.call(object).replace(/^\[object (.*)\]$/, function(m, p0) {
        return p0;
    });
}
function describeValueForErrorMessage(value) {
    switch(typeof value){
        case "string":
            return JSON.stringify(10 >= value.length ? value : value.slice(0, 10) + "...");
        case "object":
            if (isArrayImpl(value)) return "[...]";
            if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG) return "client";
            value = objectName(value);
            return "Object" === value ? "{...}" : value;
        case "function":
            return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
        default:
            return String(value);
    }
}
function describeElementType(type) {
    if ("string" === typeof type) return type;
    switch(type){
        case REACT_SUSPENSE_TYPE:
            return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
    }
    if ("object" === typeof type) switch(type.$$typeof){
        case REACT_FORWARD_REF_TYPE:
            return describeElementType(type.render);
        case REACT_MEMO_TYPE:
            return describeElementType(type.type);
        case REACT_LAZY_TYPE:
            var payload = type._payload;
            type = type._init;
            try {
                return describeElementType(type(payload));
            } catch (x) {}
    }
    return "";
}
var CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference");
function describeObjectForErrorMessage(objectOrArray, expandedName) {
    var objKind = objectName(objectOrArray);
    if ("Object" !== objKind && "Array" !== objKind) return objKind;
    objKind = -1;
    var length = 0;
    if (isArrayImpl(objectOrArray)) {
        var str = "[";
        for(var i = 0; i < objectOrArray.length; i++){
            0 < i && (str += ", ");
            var value = objectOrArray[i];
            value = "object" === typeof value && null !== value ? describeObjectForErrorMessage(value) : describeValueForErrorMessage(value);
            "" + i === expandedName ? (objKind = str.length, length = value.length, str += value) : str = 10 > value.length && 40 > str.length + value.length ? str + value : str + "...";
        }
        str += "]";
    } else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE) str = "<" + describeElementType(objectOrArray.type) + "/>";
    else {
        if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
        str = "{";
        i = Object.keys(objectOrArray);
        for(value = 0; value < i.length; value++){
            0 < value && (str += ", ");
            var name = i[value], encodedKey = JSON.stringify(name);
            str += ('"' + name + '"' === encodedKey ? name : encodedKey) + ": ";
            encodedKey = objectOrArray[name];
            encodedKey = "object" === typeof encodedKey && null !== encodedKey ? describeObjectForErrorMessage(encodedKey) : describeValueForErrorMessage(encodedKey);
            name === expandedName ? (objKind = str.length, length = encodedKey.length, str += encodedKey) : str = 10 > encodedKey.length && 40 > str.length + encodedKey.length ? str + encodedKey : str + "...";
        }
        str += "}";
    }
    return void 0 === expandedName ? str : -1 < objKind && 0 < length ? (objectOrArray = " ".repeat(objKind) + "^".repeat(length), "\n  " + str + "\n  " + objectOrArray) : "\n  " + str;
}
var ObjectPrototype = Object.prototype, stringify = JSON.stringify;
function defaultErrorHandler(error) {
    console.error(error);
}
function defaultPostponeHandler() {}
function RequestInstance(type, model, bundlerConfig, onError, identifierPrefix, onPostpone, temporaryReferences, environmentName, filterStackFrame, onAllReady, onFatalError) {
    if (null !== ReactSharedInternalsServer.A && ReactSharedInternalsServer.A !== DefaultAsyncDispatcher) throw Error("Currently React only supports one RSC renderer at a time.");
    ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
    filterStackFrame = new Set();
    environmentName = [];
    var hints = new Set();
    this.type = type;
    this.status = 10;
    this.flushScheduled = !1;
    this.destination = this.fatalError = null;
    this.bundlerConfig = bundlerConfig;
    this.cache = new Map();
    this.pendingChunks = this.nextChunkId = 0;
    this.hints = hints;
    this.abortListeners = new Set();
    this.abortableTasks = filterStackFrame;
    this.pingedTasks = environmentName;
    this.completedImportChunks = [];
    this.completedHintChunks = [];
    this.completedRegularChunks = [];
    this.completedErrorChunks = [];
    this.writtenSymbols = new Map();
    this.writtenClientReferences = new Map();
    this.writtenServerReferences = new Map();
    this.writtenObjects = new WeakMap();
    this.temporaryReferences = temporaryReferences;
    this.identifierPrefix = identifierPrefix || "";
    this.identifierCount = 1;
    this.taintCleanupQueue = [];
    this.onError = void 0 === onError ? defaultErrorHandler : onError;
    this.onPostpone = void 0 === onPostpone ? defaultPostponeHandler : onPostpone;
    this.onAllReady = onAllReady;
    this.onFatalError = onFatalError;
    type = createTask(this, model, null, !1, filterStackFrame);
    environmentName.push(type);
}
function noop() {}
var currentRequest = null;
function resolveRequest() {
    if (currentRequest) return currentRequest;
    if (supportsRequestStorage) {
        var store = requestStorage.getStore();
        if (store) return store;
    }
    return null;
}
function serializeThenable(request, task, thenable) {
    var newTask = createTask(request, null, task.keyPath, task.implicitSlot, request.abortableTasks);
    switch(thenable.status){
        case "fulfilled":
            return newTask.model = thenable.value, pingTask(request, newTask), newTask.id;
        case "rejected":
            return erroredTask(request, newTask, thenable.reason), newTask.id;
        default:
            if (12 === request.status) return request.abortableTasks.delete(newTask), newTask.status = 3, task = stringify(serializeByValueID(request.fatalError)), emitModelChunk(request, newTask.id, task), newTask.id;
            "string" !== typeof thenable.status && (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            }, function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }));
    }
    thenable.then(function(value) {
        newTask.model = value;
        pingTask(request, newTask);
    }, function(reason) {
        0 === newTask.status && (erroredTask(request, newTask, reason), enqueueFlush(request));
    });
    return newTask.id;
}
function serializeReadableStream(request, task, stream) {
    function progress(entry) {
        if (!aborted) if (entry.done) request.abortListeners.delete(abortStream), entry = streamTask.id.toString(16) + ":C\n", request.completedRegularChunks.push(stringToChunk(entry)), enqueueFlush(request), aborted = !0;
        else try {
            streamTask.model = entry.value, request.pendingChunks++, emitChunk(request, streamTask, streamTask.model), enqueueFlush(request), reader.read().then(progress, error);
        } catch (x$7) {
            error(x$7);
        }
    }
    function error(reason) {
        aborted || (aborted = !0, request.abortListeners.delete(abortStream), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
    }
    function abortStream(reason) {
        aborted || (aborted = !0, request.abortListeners.delete(abortStream), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
    }
    var supportsBYOB = stream.supportsBYOB;
    if (void 0 === supportsBYOB) try {
        stream.getReader({
            mode: "byob"
        }).releaseLock(), supportsBYOB = !0;
    } catch (x) {
        supportsBYOB = !1;
    }
    var reader = stream.getReader(), streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
    request.abortableTasks.delete(streamTask);
    request.pendingChunks++;
    task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
    request.completedRegularChunks.push(stringToChunk(task));
    var aborted = !1;
    request.abortListeners.add(abortStream);
    reader.read().then(progress, error);
    return serializeByValueID(streamTask.id);
}
function serializeAsyncIterable(request, task, iterable, iterator) {
    function progress(entry) {
        if (!aborted) if (entry.done) {
            request.abortListeners.delete(abortIterable);
            if (void 0 === entry.value) var endStreamRow = streamTask.id.toString(16) + ":C\n";
            else try {
                var chunkId = outlineModel(request, entry.value);
                endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
            } catch (x) {
                error(x);
                return;
            }
            request.completedRegularChunks.push(stringToChunk(endStreamRow));
            enqueueFlush(request);
            aborted = !0;
        } else try {
            streamTask.model = entry.value, request.pendingChunks++, emitChunk(request, streamTask, streamTask.model), enqueueFlush(request), iterator.next().then(progress, error);
        } catch (x$8) {
            error(x$8);
        }
    }
    function error(reason) {
        aborted || (aborted = !0, request.abortListeners.delete(abortIterable), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
    }
    function abortIterable(reason) {
        aborted || (aborted = !0, request.abortListeners.delete(abortIterable), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
    }
    iterable = iterable === iterator;
    var streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
    request.abortableTasks.delete(streamTask);
    request.pendingChunks++;
    task = streamTask.id.toString(16) + ":" + (iterable ? "x" : "X") + "\n";
    request.completedRegularChunks.push(stringToChunk(task));
    var aborted = !1;
    request.abortListeners.add(abortIterable);
    iterator.next().then(progress, error);
    return serializeByValueID(streamTask.id);
}
function emitHint(request, code, model) {
    model = stringify(model);
    code = stringToChunk(":H" + code + model + "\n");
    request.completedHintChunks.push(code);
    enqueueFlush(request);
}
function readThenable(thenable) {
    if ("fulfilled" === thenable.status) return thenable.value;
    if ("rejected" === thenable.status) throw thenable.reason;
    throw thenable;
}
function createLazyWrapperAroundWakeable(wakeable) {
    switch(wakeable.status){
        case "fulfilled":
        case "rejected":
            break;
        default:
            "string" !== typeof wakeable.status && (wakeable.status = "pending", wakeable.then(function(fulfilledValue) {
                "pending" === wakeable.status && (wakeable.status = "fulfilled", wakeable.value = fulfilledValue);
            }, function(error) {
                "pending" === wakeable.status && (wakeable.status = "rejected", wakeable.reason = error);
            }));
    }
    return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: wakeable,
        _init: readThenable
    };
}
function voidHandler() {}
function processServerComponentReturnValue(request, task, Component, result) {
    if ("object" !== typeof result || null === result || result.$$typeof === CLIENT_REFERENCE_TAG$1) return result;
    if ("function" === typeof result.then) return "fulfilled" === result.status ? result.value : createLazyWrapperAroundWakeable(result);
    var iteratorFn = getIteratorFn(result);
    return iteratorFn ? (request = {}, request[Symbol.iterator] = function() {
        return iteratorFn.call(result);
    }, request) : "function" !== typeof result[ASYNC_ITERATOR] || "function" === typeof ReadableStream && result instanceof ReadableStream ? result : (request = {}, request[ASYNC_ITERATOR] = function() {
        return result[ASYNC_ITERATOR]();
    }, request);
}
function renderFunctionComponent(request, task, key, Component, props) {
    var prevThenableState = task.thenableState;
    task.thenableState = null;
    thenableIndexCounter = 0;
    thenableState = prevThenableState;
    props = Component(props, void 0);
    if (12 === request.status) throw "object" === typeof props && null !== props && "function" === typeof props.then && props.$$typeof !== CLIENT_REFERENCE_TAG$1 && props.then(voidHandler, voidHandler), null;
    props = processServerComponentReturnValue(request, task, Component, props);
    Component = task.keyPath;
    prevThenableState = task.implicitSlot;
    null !== key ? task.keyPath = null === Component ? key : Component + "," + key : null === Component && (task.implicitSlot = !0);
    request = renderModelDestructive(request, task, emptyRoot, "", props);
    task.keyPath = Component;
    task.implicitSlot = prevThenableState;
    return request;
}
function renderFragment(request, task, children) {
    return null !== task.keyPath ? (request = [
        REACT_ELEMENT_TYPE,
        REACT_FRAGMENT_TYPE,
        task.keyPath,
        {
            children: children
        }
    ], task.implicitSlot ? [
        request
    ] : request) : children;
}
function renderElement(request, task, type, key, ref, props) {
    if (null !== ref && void 0 !== ref) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
    if ("function" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1 && type.$$typeof !== TEMPORARY_REFERENCE_TAG) return renderFunctionComponent(request, task, key, type, props);
    if (type === REACT_FRAGMENT_TYPE && null === key) return type = task.implicitSlot, null === task.keyPath && (task.implicitSlot = !0), props = renderModelDestructive(request, task, emptyRoot, "", props.children), task.implicitSlot = type, props;
    if (null != type && "object" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1) switch(type.$$typeof){
        case REACT_LAZY_TYPE:
            var init = type._init;
            type = init(type._payload);
            if (12 === request.status) throw null;
            return renderElement(request, task, type, key, ref, props);
        case REACT_FORWARD_REF_TYPE:
            return renderFunctionComponent(request, task, key, type.render, props);
        case REACT_MEMO_TYPE:
            return renderElement(request, task, type.type, key, ref, props);
    }
    request = key;
    key = task.keyPath;
    null === request ? request = key : null !== key && (request = key + "," + request);
    props = [
        REACT_ELEMENT_TYPE,
        type,
        request,
        props
    ];
    task = task.implicitSlot && null !== request ? [
        props
    ] : props;
    return task;
}
function pingTask(request, task) {
    var pingedTasks = request.pingedTasks;
    pingedTasks.push(task);
    1 === pingedTasks.length && (request.flushScheduled = null !== request.destination, 21 === request.type || 10 === request.status ? scheduleMicrotask(function() {
        return performWork(request);
    }) : setTimeoutOrImmediate(function() {
        return performWork(request);
    }, 0));
}
function createTask(request, model, keyPath, implicitSlot, abortSet) {
    request.pendingChunks++;
    var id = request.nextChunkId++;
    "object" !== typeof model || null === model || null !== keyPath || implicitSlot || request.writtenObjects.set(model, serializeByValueID(id));
    var task = {
        id: id,
        status: 0,
        model: model,
        keyPath: keyPath,
        implicitSlot: implicitSlot,
        ping: function() {
            return pingTask(request, task);
        },
        toJSON: function(parentPropertyName, value) {
            var prevKeyPath = task.keyPath, prevImplicitSlot = task.implicitSlot;
            try {
                var JSCompiler_inline_result = renderModelDestructive(request, task, this, parentPropertyName, value);
            } catch (thrownValue) {
                if (parentPropertyName = task.model, parentPropertyName = "object" === typeof parentPropertyName && null !== parentPropertyName && (parentPropertyName.$$typeof === REACT_ELEMENT_TYPE || parentPropertyName.$$typeof === REACT_LAZY_TYPE), 12 === request.status) task.status = 3, prevKeyPath = request.fatalError, JSCompiler_inline_result = parentPropertyName ? "$L" + prevKeyPath.toString(16) : serializeByValueID(prevKeyPath);
                else if (value = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof value && null !== value && "function" === typeof value.then) {
                    JSCompiler_inline_result = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
                    var ping = JSCompiler_inline_result.ping;
                    value.then(ping, ping);
                    JSCompiler_inline_result.thenableState = getThenableStateAfterSuspending();
                    task.keyPath = prevKeyPath;
                    task.implicitSlot = prevImplicitSlot;
                    JSCompiler_inline_result = parentPropertyName ? "$L" + JSCompiler_inline_result.id.toString(16) : serializeByValueID(JSCompiler_inline_result.id);
                } else task.keyPath = prevKeyPath, task.implicitSlot = prevImplicitSlot, request.pendingChunks++, prevKeyPath = request.nextChunkId++, prevImplicitSlot = logRecoverableError(request, value, task), emitErrorChunk(request, prevKeyPath, prevImplicitSlot), JSCompiler_inline_result = parentPropertyName ? "$L" + prevKeyPath.toString(16) : serializeByValueID(prevKeyPath);
            }
            return JSCompiler_inline_result;
        },
        thenableState: null
    };
    abortSet.add(task);
    return task;
}
function serializeByValueID(id) {
    return "$" + id.toString(16);
}
function encodeReferenceChunk(request, id, reference) {
    request = stringify(reference);
    id = id.toString(16) + ":" + request + "\n";
    return stringToChunk(id);
}
function serializeClientReference(request, parent, parentPropertyName, clientReference) {
    var clientReferenceKey = clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id, writtenClientReferences = request.writtenClientReferences, existingId = writtenClientReferences.get(clientReferenceKey);
    if (void 0 !== existingId) return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? "$L" + existingId.toString(16) : serializeByValueID(existingId);
    try {
        var config = request.bundlerConfig, modulePath = clientReference.$$id;
        existingId = "";
        var resolvedModuleData = config[modulePath];
        if (resolvedModuleData) existingId = resolvedModuleData.name;
        else {
            var idx = modulePath.lastIndexOf("#");
            -1 !== idx && (existingId = modulePath.slice(idx + 1), resolvedModuleData = config[modulePath.slice(0, idx)]);
            if (!resolvedModuleData) throw Error('Could not find the module "' + modulePath + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
        }
        if (!0 === resolvedModuleData.async && !0 === clientReference.$$async) throw Error('The module "' + modulePath + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.');
        var JSCompiler_inline_result = !0 === resolvedModuleData.async || !0 === clientReference.$$async ? [
            resolvedModuleData.id,
            resolvedModuleData.chunks,
            existingId,
            1
        ] : [
            resolvedModuleData.id,
            resolvedModuleData.chunks,
            existingId
        ];
        request.pendingChunks++;
        var importId = request.nextChunkId++, json = stringify(JSCompiler_inline_result), row = importId.toString(16) + ":I" + json + "\n", processedChunk = stringToChunk(row);
        request.completedImportChunks.push(processedChunk);
        writtenClientReferences.set(clientReferenceKey, importId);
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? "$L" + importId.toString(16) : serializeByValueID(importId);
    } catch (x) {
        return request.pendingChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName), serializeByValueID(parent);
    }
}
function outlineModel(request, value) {
    value = createTask(request, value, null, !1, request.abortableTasks);
    retryTask(request, value);
    return value.id;
}
function serializeTypedArray(request, tag, typedArray) {
    request.pendingChunks++;
    var bufferId = request.nextChunkId++;
    emitTypedArrayChunk(request, bufferId, tag, typedArray);
    return serializeByValueID(bufferId);
}
function serializeBlob(request, blob) {
    function progress(entry) {
        if (!aborted) if (entry.done) request.abortListeners.delete(abortBlob), aborted = !0, pingTask(request, newTask);
        else return model.push(entry.value), reader.read().then(progress).catch(error);
    }
    function error(reason) {
        aborted || (aborted = !0, request.abortListeners.delete(abortBlob), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
    }
    function abortBlob(reason) {
        aborted || (aborted = !0, request.abortListeners.delete(abortBlob), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
    }
    var model = [
        blob.type
    ], newTask = createTask(request, model, null, !1, request.abortableTasks), reader = blob.stream().getReader(), aborted = !1;
    request.abortListeners.add(abortBlob);
    reader.read().then(progress).catch(error);
    return "$B" + newTask.id.toString(16);
}
var modelRoot = !1;
function renderModelDestructive(request, task, parent, parentPropertyName, value) {
    task.model = value;
    if (value === REACT_ELEMENT_TYPE) return "$";
    if (null === value) return null;
    if ("object" === typeof value) {
        switch(value.$$typeof){
            case REACT_ELEMENT_TYPE:
                var elementReference = null, writtenObjects = request.writtenObjects;
                if (null === task.keyPath && !task.implicitSlot) {
                    var existingReference = writtenObjects.get(value);
                    if (void 0 !== existingReference) if (modelRoot === value) modelRoot = null;
                    else return existingReference;
                    else -1 === parentPropertyName.indexOf(":") && (parent = writtenObjects.get(parent), void 0 !== parent && (elementReference = parent + ":" + parentPropertyName, writtenObjects.set(value, elementReference)));
                }
                parentPropertyName = value.props;
                parent = parentPropertyName.ref;
                request = renderElement(request, task, value.type, value.key, void 0 !== parent ? parent : null, parentPropertyName);
                "object" === typeof request && null !== request && null !== elementReference && (writtenObjects.has(request) || writtenObjects.set(request, elementReference));
                return request;
            case REACT_LAZY_TYPE:
                task.thenableState = null;
                parentPropertyName = value._init;
                value = parentPropertyName(value._payload);
                if (12 === request.status) throw null;
                return renderModelDestructive(request, task, emptyRoot, "", value);
            case REACT_LEGACY_ELEMENT_TYPE:
                throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
        }
        if (value.$$typeof === CLIENT_REFERENCE_TAG$1) return serializeClientReference(request, parent, parentPropertyName, value);
        if (void 0 !== request.temporaryReferences && (elementReference = request.temporaryReferences.get(value), void 0 !== elementReference)) return "$T" + elementReference;
        elementReference = request.writtenObjects;
        writtenObjects = elementReference.get(value);
        if ("function" === typeof value.then) {
            if (void 0 !== writtenObjects) {
                if (null !== task.keyPath || task.implicitSlot) return "$@" + serializeThenable(request, task, value).toString(16);
                if (modelRoot === value) modelRoot = null;
                else return writtenObjects;
            }
            request = "$@" + serializeThenable(request, task, value).toString(16);
            elementReference.set(value, request);
            return request;
        }
        if (void 0 !== writtenObjects) if (modelRoot === value) modelRoot = null;
        else return writtenObjects;
        else if (-1 === parentPropertyName.indexOf(":") && (writtenObjects = elementReference.get(parent), void 0 !== writtenObjects)) {
            existingReference = parentPropertyName;
            if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE) switch(parentPropertyName){
                case "1":
                    existingReference = "type";
                    break;
                case "2":
                    existingReference = "key";
                    break;
                case "3":
                    existingReference = "props";
                    break;
                case "4":
                    existingReference = "_owner";
            }
            elementReference.set(value, writtenObjects + ":" + existingReference);
        }
        if (isArrayImpl(value)) return renderFragment(request, task, value);
        if (value instanceof Map) return value = Array.from(value), "$Q" + outlineModel(request, value).toString(16);
        if (value instanceof Set) return value = Array.from(value), "$W" + outlineModel(request, value).toString(16);
        if ("function" === typeof FormData && value instanceof FormData) return value = Array.from(value.entries()), "$K" + outlineModel(request, value).toString(16);
        if (value instanceof Error) return "$Z";
        if (value instanceof ArrayBuffer) return serializeTypedArray(request, "A", new Uint8Array(value));
        if (value instanceof Int8Array) return serializeTypedArray(request, "O", value);
        if (value instanceof Uint8Array) return serializeTypedArray(request, "o", value);
        if (value instanceof Uint8ClampedArray) return serializeTypedArray(request, "U", value);
        if (value instanceof Int16Array) return serializeTypedArray(request, "S", value);
        if (value instanceof Uint16Array) return serializeTypedArray(request, "s", value);
        if (value instanceof Int32Array) return serializeTypedArray(request, "L", value);
        if (value instanceof Uint32Array) return serializeTypedArray(request, "l", value);
        if (value instanceof Float32Array) return serializeTypedArray(request, "G", value);
        if (value instanceof Float64Array) return serializeTypedArray(request, "g", value);
        if (value instanceof BigInt64Array) return serializeTypedArray(request, "M", value);
        if (value instanceof BigUint64Array) return serializeTypedArray(request, "m", value);
        if (value instanceof DataView) return serializeTypedArray(request, "V", value);
        if ("function" === typeof Blob && value instanceof Blob) return serializeBlob(request, value);
        if (elementReference = getIteratorFn(value)) return parentPropertyName = elementReference.call(value), parentPropertyName === value ? "$i" + outlineModel(request, Array.from(parentPropertyName)).toString(16) : renderFragment(request, task, Array.from(parentPropertyName));
        if ("function" === typeof ReadableStream && value instanceof ReadableStream) return serializeReadableStream(request, task, value);
        elementReference = value[ASYNC_ITERATOR];
        if ("function" === typeof elementReference) return null !== task.keyPath ? (request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            {
                children: value
            }
        ], request = task.implicitSlot ? [
            request
        ] : request) : (parentPropertyName = elementReference.call(value), request = serializeAsyncIterable(request, task, value, parentPropertyName)), request;
        if (value instanceof Date) return "$D" + value.toJSON();
        request = getPrototypeOf(value);
        if (request !== ObjectPrototype && (null === request || null !== getPrototypeOf(request))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + describeObjectForErrorMessage(parent, parentPropertyName));
        return value;
    }
    if ("string" === typeof value) {
        if ("Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date) return "$D" + value;
        if (1024 <= value.length && null !== byteLengthOfChunk) return request.pendingChunks++, task = request.nextChunkId++, emitTextChunk(request, task, value), serializeByValueID(task);
        request = "$" === value[0] ? "$" + value : value;
        return request;
    }
    if ("boolean" === typeof value) return value;
    if ("number" === typeof value) return Number.isFinite(value) ? 0 === value && -Infinity === 1 / value ? "$-0" : value : Infinity === value ? "$Infinity" : -Infinity === value ? "$-Infinity" : "$NaN";
    if ("undefined" === typeof value) return "$undefined";
    if ("function" === typeof value) {
        if (value.$$typeof === CLIENT_REFERENCE_TAG$1) return serializeClientReference(request, parent, parentPropertyName, value);
        if (value.$$typeof === SERVER_REFERENCE_TAG) return task = request.writtenServerReferences, parentPropertyName = task.get(value), void 0 !== parentPropertyName ? request = "$F" + parentPropertyName.toString(16) : (parentPropertyName = value.$$bound, parentPropertyName = null === parentPropertyName ? null : Promise.resolve(parentPropertyName), request = outlineModel(request, {
            id: value.$$id,
            bound: parentPropertyName
        }), task.set(value, request), request = "$F" + request.toString(16)), request;
        if (void 0 !== request.temporaryReferences && (request = request.temporaryReferences.get(value), void 0 !== request)) return "$T" + request;
        if (value.$$typeof === TEMPORARY_REFERENCE_TAG) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
        if (/^on[A-Z]/.test(parentPropertyName)) throw Error("Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
        throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + describeObjectForErrorMessage(parent, parentPropertyName));
    }
    if ("symbol" === typeof value) {
        task = request.writtenSymbols;
        elementReference = task.get(value);
        if (void 0 !== elementReference) return serializeByValueID(elementReference);
        elementReference = value.description;
        if (Symbol.for(elementReference) !== value) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName));
        request.pendingChunks++;
        parentPropertyName = request.nextChunkId++;
        parent = encodeReferenceChunk(request, parentPropertyName, "$S" + elementReference);
        request.completedImportChunks.push(parent);
        task.set(value, parentPropertyName);
        return serializeByValueID(parentPropertyName);
    }
    if ("bigint" === typeof value) return "$n" + value.toString(10);
    throw Error("Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName));
}
function logRecoverableError(request, error) {
    var prevRequest = currentRequest;
    currentRequest = null;
    try {
        var onError = request.onError;
        var errorDigest = supportsRequestStorage ? requestStorage.run(void 0, onError, error) : onError(error);
    } finally{
        currentRequest = prevRequest;
    }
    if (null != errorDigest && "string" !== typeof errorDigest) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
    return errorDigest || "";
}
function fatalError(request, error) {
    var onFatalError = request.onFatalError;
    onFatalError(error);
    null !== request.destination ? (request.status = 14, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
}
function emitErrorChunk(request, id, digest) {
    digest = {
        digest: digest
    };
    id = id.toString(16) + ":E" + stringify(digest) + "\n";
    id = stringToChunk(id);
    request.completedErrorChunks.push(id);
}
function emitModelChunk(request, id, json) {
    id = id.toString(16) + ":" + json + "\n";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id);
}
function emitTypedArrayChunk(request, id, tag, typedArray) {
    request.pendingChunks++;
    var buffer = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    typedArray = 2048 < typedArray.byteLength ? buffer.slice() : buffer;
    buffer = typedArray.byteLength;
    id = id.toString(16) + ":" + tag + buffer.toString(16) + ",";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id, typedArray);
}
function emitTextChunk(request, id, text) {
    if (null === byteLengthOfChunk) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
    request.pendingChunks++;
    text = stringToChunk(text);
    var binaryLength = text.byteLength;
    id = id.toString(16) + ":T" + binaryLength.toString(16) + ",";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id, text);
}
function emitChunk(request, task, value) {
    var id = task.id;
    "string" === typeof value && null !== byteLengthOfChunk ? emitTextChunk(request, id, value) : value instanceof ArrayBuffer ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value)) : value instanceof Int8Array ? emitTypedArrayChunk(request, id, "O", value) : value instanceof Uint8Array ? emitTypedArrayChunk(request, id, "o", value) : value instanceof Uint8ClampedArray ? emitTypedArrayChunk(request, id, "U", value) : value instanceof Int16Array ? emitTypedArrayChunk(request, id, "S", value) : value instanceof Uint16Array ? emitTypedArrayChunk(request, id, "s", value) : value instanceof Int32Array ? emitTypedArrayChunk(request, id, "L", value) : value instanceof Uint32Array ? emitTypedArrayChunk(request, id, "l", value) : value instanceof Float32Array ? emitTypedArrayChunk(request, id, "G", value) : value instanceof Float64Array ? emitTypedArrayChunk(request, id, "g", value) : value instanceof BigInt64Array ? emitTypedArrayChunk(request, id, "M", value) : value instanceof BigUint64Array ? emitTypedArrayChunk(request, id, "m", value) : value instanceof DataView ? emitTypedArrayChunk(request, id, "V", value) : (value = stringify(value, task.toJSON), emitModelChunk(request, task.id, value));
}
function erroredTask(request, task, error) {
    request.abortableTasks.delete(task);
    task.status = 4;
    error = logRecoverableError(request, error, task);
    emitErrorChunk(request, task.id, error);
}
var emptyRoot = {};
function retryTask(request, task) {
    if (0 === task.status) {
        task.status = 5;
        try {
            modelRoot = task.model;
            var resolvedModel = renderModelDestructive(request, task, emptyRoot, "", task.model);
            modelRoot = resolvedModel;
            task.keyPath = null;
            task.implicitSlot = !1;
            if ("object" === typeof resolvedModel && null !== resolvedModel) request.writtenObjects.set(resolvedModel, serializeByValueID(task.id)), emitChunk(request, task, resolvedModel);
            else {
                var json = stringify(resolvedModel);
                emitModelChunk(request, task.id, json);
            }
            request.abortableTasks.delete(task);
            task.status = 1;
        } catch (thrownValue) {
            if (12 === request.status) {
                request.abortableTasks.delete(task);
                task.status = 3;
                var model = stringify(serializeByValueID(request.fatalError));
                emitModelChunk(request, task.id, model);
            } else {
                var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                    task.status = 0;
                    task.thenableState = getThenableStateAfterSuspending();
                    var ping = task.ping;
                    x.then(ping, ping);
                } else erroredTask(request, task, x);
            }
        } finally{}
    }
}
function performWork(request) {
    var prevDispatcher = ReactSharedInternalsServer.H;
    ReactSharedInternalsServer.H = HooksDispatcher;
    var prevRequest = currentRequest;
    currentRequest$1 = currentRequest = request;
    var hadAbortableTasks = 0 < request.abortableTasks.size;
    try {
        var pingedTasks = request.pingedTasks;
        request.pingedTasks = [];
        for(var i = 0; i < pingedTasks.length; i++)retryTask(request, pingedTasks[i]);
        null !== request.destination && flushCompletedChunks(request, request.destination);
        if (hadAbortableTasks && 0 === request.abortableTasks.size) {
            var onAllReady = request.onAllReady;
            onAllReady();
        }
    } catch (error) {
        logRecoverableError(request, error, null), fatalError(request, error);
    } finally{
        ReactSharedInternalsServer.H = prevDispatcher, currentRequest$1 = null, currentRequest = prevRequest;
    }
}
function flushCompletedChunks(request, destination) {
    currentView = new Uint8Array(2048);
    writtenBytes = 0;
    try {
        for(var importsChunks = request.completedImportChunks, i = 0; i < importsChunks.length; i++)request.pendingChunks--, writeChunkAndReturn(destination, importsChunks[i]);
        importsChunks.splice(0, i);
        var hintChunks = request.completedHintChunks;
        for(i = 0; i < hintChunks.length; i++)writeChunkAndReturn(destination, hintChunks[i]);
        hintChunks.splice(0, i);
        var regularChunks = request.completedRegularChunks;
        for(i = 0; i < regularChunks.length; i++)request.pendingChunks--, writeChunkAndReturn(destination, regularChunks[i]);
        regularChunks.splice(0, i);
        var errorChunks = request.completedErrorChunks;
        for(i = 0; i < errorChunks.length; i++)request.pendingChunks--, writeChunkAndReturn(destination, errorChunks[i]);
        errorChunks.splice(0, i);
    } finally{
        request.flushScheduled = !1, currentView && 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
    }
    0 === request.pendingChunks && (request.status = 14, destination.close(), request.destination = null);
}
function startWork(request) {
    request.flushScheduled = null !== request.destination;
    supportsRequestStorage ? scheduleMicrotask(function() {
        requestStorage.run(request, performWork, request);
    }) : scheduleMicrotask(function() {
        return performWork(request);
    });
    setTimeoutOrImmediate(function() {
        10 === request.status && (request.status = 11);
    }, 0);
}
function enqueueFlush(request) {
    !1 === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = !0, setTimeoutOrImmediate(function() {
        request.flushScheduled = !1;
        var destination = request.destination;
        destination && flushCompletedChunks(request, destination);
    }, 0));
}
function startFlowing(request, destination) {
    if (13 === request.status) request.status = 14, closeWithError(destination, request.fatalError);
    else if (14 !== request.status && null === request.destination) {
        request.destination = destination;
        try {
            flushCompletedChunks(request, destination);
        } catch (error) {
            logRecoverableError(request, error, null), fatalError(request, error);
        }
    }
}
function abort(request, reason) {
    try {
        11 >= request.status && (request.status = 12);
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size) {
            var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason, digest = logRecoverableError(request, error, null), errorId = request.nextChunkId++;
            request.fatalError = errorId;
            request.pendingChunks++;
            emitErrorChunk(request, errorId, digest, error);
            abortableTasks.forEach(function(task) {
                if (5 !== task.status) {
                    task.status = 3;
                    var ref = serializeByValueID(errorId);
                    task = encodeReferenceChunk(request, task.id, ref);
                    request.completedErrorChunks.push(task);
                }
            });
            abortableTasks.clear();
            var onAllReady = request.onAllReady;
            onAllReady();
        }
        var abortListeners = request.abortListeners;
        if (0 < abortListeners.size) {
            var error$22 = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason;
            abortListeners.forEach(function(callback) {
                return callback(error$22);
            });
            abortListeners.clear();
        }
        null !== request.destination && flushCompletedChunks(request, request.destination);
    } catch (error$23) {
        logRecoverableError(request, error$23, null), fatalError(request, error$23);
    }
}
function resolveServerReference(bundlerConfig, id) {
    var name = "", resolvedModuleData = bundlerConfig[id];
    if (resolvedModuleData) name = resolvedModuleData.name;
    else {
        var idx = id.lastIndexOf("#");
        -1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
        if (!resolvedModuleData) throw Error('Could not find the module "' + id + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
    }
    return resolvedModuleData.async ? [
        resolvedModuleData.id,
        resolvedModuleData.chunks,
        name,
        1
    ] : [
        resolvedModuleData.id,
        resolvedModuleData.chunks,
        name
    ];
}
var chunkCache = new Map();
function requireAsyncModule(id) {
    var promise = globalThis.__next_require__(id);
    if ("function" !== typeof promise.then || "fulfilled" === promise.status) return null;
    promise.then(function(value) {
        promise.status = "fulfilled";
        promise.value = value;
    }, function(reason) {
        promise.status = "rejected";
        promise.reason = reason;
    });
    return promise;
}
function ignoreReject() {}
function preloadModule(metadata) {
    for(var chunks = metadata[1], promises = [], i = 0; i < chunks.length;){
        var chunkId = chunks[i++];
        chunks[i++];
        var entry = chunkCache.get(chunkId);
        if (void 0 === entry) {
            entry = __webpack_require__.e(chunkId);
            promises.push(entry);
            var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
            entry.then(resolve, ignoreReject);
            chunkCache.set(chunkId, entry);
        } else null !== entry && promises.push(entry);
    }
    return 4 === metadata.length ? 0 === promises.length ? requireAsyncModule(metadata[0]) : Promise.all(promises).then(function() {
        return requireAsyncModule(metadata[0]);
    }) : 0 < promises.length ? Promise.all(promises) : null;
}
function requireModule(metadata) {
    var moduleExports = globalThis.__next_require__(metadata[0]);
    if (4 === metadata.length && "function" === typeof moduleExports.then) if ("fulfilled" === moduleExports.status) moduleExports = moduleExports.value;
    else throw moduleExports.reason;
    return "*" === metadata[2] ? moduleExports : "" === metadata[2] ? moduleExports.__esModule ? moduleExports.default : moduleExports : moduleExports[metadata[2]];
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function Chunk(status, value, reason, response) {
    this.status = status;
    this.value = value;
    this.reason = reason;
    this._response = response;
}
Chunk.prototype = Object.create(Promise.prototype);
Chunk.prototype.then = function(resolve, reject) {
    switch(this.status){
        case "resolved_model":
            initializeModelChunk(this);
    }
    switch(this.status){
        case "fulfilled":
            resolve(this.value);
            break;
        case "pending":
        case "blocked":
        case "cyclic":
            resolve && (null === this.value && (this.value = []), this.value.push(resolve));
            reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
            break;
        default:
            reject(this.reason);
    }
};
function createPendingChunk(response) {
    return new Chunk("pending", null, null, response);
}
function wakeChunk(listeners, value) {
    for(var i = 0; i < listeners.length; i++)(0, listeners[i])(value);
}
function triggerErrorOnChunk(chunk, error) {
    if ("pending" !== chunk.status && "blocked" !== chunk.status) chunk.reason.error(error);
    else {
        var listeners = chunk.reason;
        chunk.status = "rejected";
        chunk.reason = error;
        null !== listeners && wakeChunk(listeners, error);
    }
}
function resolveModelChunk(chunk, value, id) {
    if ("pending" !== chunk.status) chunk = chunk.reason, "C" === value[0] ? chunk.close("C" === value ? '"$undefined"' : value.slice(1)) : chunk.enqueueModel(value);
    else {
        var resolveListeners = chunk.value, rejectListeners = chunk.reason;
        chunk.status = "resolved_model";
        chunk.value = value;
        chunk.reason = id;
        if (null !== resolveListeners) switch(initializeModelChunk(chunk), chunk.status){
            case "fulfilled":
                wakeChunk(resolveListeners, chunk.value);
                break;
            case "pending":
            case "blocked":
            case "cyclic":
                if (chunk.value) for(value = 0; value < resolveListeners.length; value++)chunk.value.push(resolveListeners[value]);
                else chunk.value = resolveListeners;
                if (chunk.reason) {
                    if (rejectListeners) for(value = 0; value < rejectListeners.length; value++)chunk.reason.push(rejectListeners[value]);
                } else chunk.reason = rejectListeners;
                break;
            case "rejected":
                rejectListeners && wakeChunk(rejectListeners, chunk.reason);
        }
    }
}
function createResolvedIteratorResultChunk(response, value, done) {
    return new Chunk("resolved_model", (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}", -1, response);
}
function resolveIteratorResultChunk(chunk, value, done) {
    resolveModelChunk(chunk, (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}", -1);
}
function loadServerReference$1(response, id, bound, parentChunk, parentObject, key) {
    var serverReference = resolveServerReference(response._bundlerConfig, id);
    id = preloadModule(serverReference);
    if (bound) bound = Promise.all([
        bound,
        id
    ]).then(function(_ref) {
        _ref = _ref[0];
        var fn = requireModule(serverReference);
        return fn.bind.apply(fn, [
            null
        ].concat(_ref));
    });
    else if (id) bound = Promise.resolve(id).then(function() {
        return requireModule(serverReference);
    });
    else return requireModule(serverReference);
    bound.then(createModelResolver(parentChunk, parentObject, key, !1, response, createModel, []), createModelReject(parentChunk));
    return null;
}
function reviveModel(response, parentObj, parentKey, value, reference) {
    if ("string" === typeof value) return parseModelString(response, parentObj, parentKey, value, reference);
    if ("object" === typeof value && null !== value) if (void 0 !== reference && void 0 !== response._temporaryReferences && response._temporaryReferences.set(value, reference), Array.isArray(value)) for(var i = 0; i < value.length; i++)value[i] = reviveModel(response, value, "" + i, value[i], void 0 !== reference ? reference + ":" + i : void 0);
    else for(i in value)hasOwnProperty.call(value, i) && (parentObj = void 0 !== reference && -1 === i.indexOf(":") ? reference + ":" + i : void 0, parentObj = reviveModel(response, value, i, value[i], parentObj), void 0 !== parentObj ? value[i] = parentObj : delete value[i]);
    return value;
}
var initializingChunk = null, initializingChunkBlockedModel = null;
function initializeModelChunk(chunk) {
    var prevChunk = initializingChunk, prevBlocked = initializingChunkBlockedModel;
    initializingChunk = chunk;
    initializingChunkBlockedModel = null;
    var rootReference = -1 === chunk.reason ? void 0 : chunk.reason.toString(16), resolvedModel = chunk.value;
    chunk.status = "cyclic";
    chunk.value = null;
    chunk.reason = null;
    try {
        var rawModel = JSON.parse(resolvedModel), value = reviveModel(chunk._response, {
            "": rawModel
        }, "", rawModel, rootReference);
        if (null !== initializingChunkBlockedModel && 0 < initializingChunkBlockedModel.deps) initializingChunkBlockedModel.value = value, chunk.status = "blocked";
        else {
            var resolveListeners = chunk.value;
            chunk.status = "fulfilled";
            chunk.value = value;
            null !== resolveListeners && wakeChunk(resolveListeners, value);
        }
    } catch (error) {
        chunk.status = "rejected", chunk.reason = error;
    } finally{
        initializingChunk = prevChunk, initializingChunkBlockedModel = prevBlocked;
    }
}
function reportGlobalError(response, error) {
    response._closed = !0;
    response._closedReason = error;
    response._chunks.forEach(function(chunk) {
        "pending" === chunk.status && triggerErrorOnChunk(chunk, error);
    });
}
function getChunk(response, id) {
    var chunks = response._chunks, chunk = chunks.get(id);
    chunk || (chunk = response._formData.get(response._prefix + id), chunk = null != chunk ? new Chunk("resolved_model", chunk, id, response) : response._closed ? new Chunk("rejected", null, response._closedReason, response) : createPendingChunk(response), chunks.set(id, chunk));
    return chunk;
}
function createModelResolver(chunk, parentObject, key, cyclic, response, map, path) {
    if (initializingChunkBlockedModel) {
        var blocked = initializingChunkBlockedModel;
        cyclic || blocked.deps++;
    } else blocked = initializingChunkBlockedModel = {
        deps: cyclic ? 0 : 1,
        value: null
    };
    return function(value) {
        for(var i = 1; i < path.length; i++)value = value[path[i]];
        parentObject[key] = map(response, value);
        "" === key && null === blocked.value && (blocked.value = parentObject[key]);
        blocked.deps--;
        0 === blocked.deps && "blocked" === chunk.status && (value = chunk.value, chunk.status = "fulfilled", chunk.value = blocked.value, null !== value && wakeChunk(value, blocked.value));
    };
}
function createModelReject(chunk) {
    return function(error) {
        return triggerErrorOnChunk(chunk, error);
    };
}
function getOutlinedModel(response, reference, parentObject, key, map) {
    reference = reference.split(":");
    var id = parseInt(reference[0], 16);
    id = getChunk(response, id);
    switch(id.status){
        case "resolved_model":
            initializeModelChunk(id);
    }
    switch(id.status){
        case "fulfilled":
            parentObject = id.value;
            for(key = 1; key < reference.length; key++)parentObject = parentObject[reference[key]];
            return map(response, parentObject);
        case "pending":
        case "blocked":
        case "cyclic":
            var parentChunk = initializingChunk;
            id.then(createModelResolver(parentChunk, parentObject, key, "cyclic" === id.status, response, map, reference), createModelReject(parentChunk));
            return null;
        default:
            throw id.reason;
    }
}
function createMap(response, model) {
    return new Map(model);
}
function createSet(response, model) {
    return new Set(model);
}
function extractIterator(response, model) {
    return model[Symbol.iterator]();
}
function createModel(response, model) {
    return model;
}
function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey) {
    reference = parseInt(reference.slice(2), 16);
    reference = response._formData.get(response._prefix + reference);
    reference = constructor === ArrayBuffer ? reference.arrayBuffer() : reference.arrayBuffer().then(function(buffer) {
        return new constructor(buffer);
    });
    bytesPerElement = initializingChunk;
    reference.then(createModelResolver(bytesPerElement, parentObject, parentKey, !1, response, createModel, []), createModelReject(bytesPerElement));
    return null;
}
function resolveStream(response, id, stream, controller) {
    var chunks = response._chunks;
    stream = new Chunk("fulfilled", stream, controller, response);
    chunks.set(id, stream);
    response = response._formData.getAll(response._prefix + id);
    for(id = 0; id < response.length; id++)chunks = response[id], "C" === chunks[0] ? controller.close("C" === chunks ? '"$undefined"' : chunks.slice(1)) : controller.enqueueModel(chunks);
}
function parseReadableStream(response, reference, type) {
    reference = parseInt(reference.slice(2), 16);
    var controller = null;
    type = new ReadableStream({
        type: type,
        start: function(c) {
            controller = c;
        }
    });
    var previousBlockedChunk = null;
    resolveStream(response, reference, type, {
        enqueueModel: function(json) {
            if (null === previousBlockedChunk) {
                var chunk = new Chunk("resolved_model", json, -1, response);
                initializeModelChunk(chunk);
                "fulfilled" === chunk.status ? controller.enqueue(chunk.value) : (chunk.then(function(v) {
                    return controller.enqueue(v);
                }, function(e) {
                    return controller.error(e);
                }), previousBlockedChunk = chunk);
            } else {
                chunk = previousBlockedChunk;
                var chunk$26 = createPendingChunk(response);
                chunk$26.then(function(v) {
                    return controller.enqueue(v);
                }, function(e) {
                    return controller.error(e);
                });
                previousBlockedChunk = chunk$26;
                chunk.then(function() {
                    previousBlockedChunk === chunk$26 && (previousBlockedChunk = null);
                    resolveModelChunk(chunk$26, json, -1);
                });
            }
        },
        close: function() {
            if (null === previousBlockedChunk) controller.close();
            else {
                var blockedChunk = previousBlockedChunk;
                previousBlockedChunk = null;
                blockedChunk.then(function() {
                    return controller.close();
                });
            }
        },
        error: function(error) {
            if (null === previousBlockedChunk) controller.error(error);
            else {
                var blockedChunk = previousBlockedChunk;
                previousBlockedChunk = null;
                blockedChunk.then(function() {
                    return controller.error(error);
                });
            }
        }
    });
    return type;
}
function asyncIterator() {
    return this;
}
function createIterator(next) {
    next = {
        next: next
    };
    next[ASYNC_ITERATOR] = asyncIterator;
    return next;
}
function parseAsyncIterable(response, reference, iterator) {
    reference = parseInt(reference.slice(2), 16);
    var buffer = [], closed = !1, nextWriteIndex = 0, $jscomp$compprop2 = {};
    $jscomp$compprop2 = ($jscomp$compprop2[ASYNC_ITERATOR] = function() {
        var nextReadIndex = 0;
        return createIterator(function(arg) {
            if (void 0 !== arg) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
            if (nextReadIndex === buffer.length) {
                if (closed) return new Chunk("fulfilled", {
                    done: !0,
                    value: void 0
                }, null, response);
                buffer[nextReadIndex] = createPendingChunk(response);
            }
            return buffer[nextReadIndex++];
        });
    }, $jscomp$compprop2);
    iterator = iterator ? $jscomp$compprop2[ASYNC_ITERATOR]() : $jscomp$compprop2;
    resolveStream(response, reference, iterator, {
        enqueueModel: function(value) {
            nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !1) : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !1);
            nextWriteIndex++;
        },
        close: function(value) {
            closed = !0;
            nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !0) : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !0);
            for(nextWriteIndex++; nextWriteIndex < buffer.length;)resolveIteratorResultChunk(buffer[nextWriteIndex++], '"$undefined"', !0);
        },
        error: function(error) {
            closed = !0;
            for(nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = createPendingChunk(response)); nextWriteIndex < buffer.length;)triggerErrorOnChunk(buffer[nextWriteIndex++], error);
        }
    });
    return iterator;
}
function parseModelString(response, obj, key, value, reference) {
    if ("$" === value[0]) {
        switch(value[1]){
            case "$":
                return value.slice(1);
            case "@":
                return obj = parseInt(value.slice(2), 16), getChunk(response, obj);
            case "F":
                return value = value.slice(2), value = getOutlinedModel(response, value, obj, key, createModel), loadServerReference$1(response, value.id, value.bound, initializingChunk, obj, key);
            case "T":
                if (void 0 === reference || void 0 === response._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
                return createTemporaryReference(response._temporaryReferences, reference);
            case "Q":
                return value = value.slice(2), getOutlinedModel(response, value, obj, key, createMap);
            case "W":
                return value = value.slice(2), getOutlinedModel(response, value, obj, key, createSet);
            case "K":
                obj = value.slice(2);
                var formPrefix = response._prefix + obj + "_", data = new FormData();
                response._formData.forEach(function(entry, entryKey) {
                    entryKey.startsWith(formPrefix) && data.append(entryKey.slice(formPrefix.length), entry);
                });
                return data;
            case "i":
                return value = value.slice(2), getOutlinedModel(response, value, obj, key, extractIterator);
            case "I":
                return Infinity;
            case "-":
                return "$-0" === value ? -0 : -Infinity;
            case "N":
                return NaN;
            case "u":
                return;
            case "D":
                return new Date(Date.parse(value.slice(2)));
            case "n":
                return BigInt(value.slice(2));
        }
        switch(value[1]){
            case "A":
                return parseTypedArray(response, value, ArrayBuffer, 1, obj, key);
            case "O":
                return parseTypedArray(response, value, Int8Array, 1, obj, key);
            case "o":
                return parseTypedArray(response, value, Uint8Array, 1, obj, key);
            case "U":
                return parseTypedArray(response, value, Uint8ClampedArray, 1, obj, key);
            case "S":
                return parseTypedArray(response, value, Int16Array, 2, obj, key);
            case "s":
                return parseTypedArray(response, value, Uint16Array, 2, obj, key);
            case "L":
                return parseTypedArray(response, value, Int32Array, 4, obj, key);
            case "l":
                return parseTypedArray(response, value, Uint32Array, 4, obj, key);
            case "G":
                return parseTypedArray(response, value, Float32Array, 4, obj, key);
            case "g":
                return parseTypedArray(response, value, Float64Array, 8, obj, key);
            case "M":
                return parseTypedArray(response, value, BigInt64Array, 8, obj, key);
            case "m":
                return parseTypedArray(response, value, BigUint64Array, 8, obj, key);
            case "V":
                return parseTypedArray(response, value, DataView, 1, obj, key);
            case "B":
                return obj = parseInt(value.slice(2), 16), response._formData.get(response._prefix + obj);
        }
        switch(value[1]){
            case "R":
                return parseReadableStream(response, value, void 0);
            case "r":
                return parseReadableStream(response, value, "bytes");
            case "X":
                return parseAsyncIterable(response, value, !1);
            case "x":
                return parseAsyncIterable(response, value, !0);
        }
        value = value.slice(1);
        return getOutlinedModel(response, value, obj, key, createModel);
    }
    return value;
}
function createResponse(bundlerConfig, formFieldPrefix, temporaryReferences) {
    var backingFormData = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData(), chunks = new Map();
    return {
        _bundlerConfig: bundlerConfig,
        _prefix: formFieldPrefix,
        _formData: backingFormData,
        _chunks: chunks,
        _closed: !1,
        _closedReason: null,
        _temporaryReferences: temporaryReferences
    };
}
function close(response) {
    reportGlobalError(response, Error("Connection closed."));
}
function loadServerReference(bundlerConfig, id, bound) {
    var serverReference = resolveServerReference(bundlerConfig, id);
    bundlerConfig = preloadModule(serverReference);
    return bound ? Promise.all([
        bound,
        bundlerConfig
    ]).then(function(_ref) {
        _ref = _ref[0];
        var fn = requireModule(serverReference);
        return fn.bind.apply(fn, [
            null
        ].concat(_ref));
    }) : bundlerConfig ? Promise.resolve(bundlerConfig).then(function() {
        return requireModule(serverReference);
    }) : Promise.resolve(requireModule(serverReference));
}
function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix) {
    body = createResponse(serverManifest, formFieldPrefix, void 0, body);
    close(body);
    body = getChunk(body, 0);
    body.then(function() {});
    if ("fulfilled" !== body.status) throw body.reason;
    return body.value;
}
exports.createClientModuleProxy = function(moduleId) {
    moduleId = registerClientReferenceImpl({}, moduleId, !1);
    return new Proxy(moduleId, proxyHandlers$1);
};
exports.createTemporaryReferenceSet = function() {
    return new WeakMap();
};
exports.decodeAction = function(body, serverManifest) {
    var formData = new FormData(), action = null;
    body.forEach(function(value, key) {
        key.startsWith("$ACTION_") ? key.startsWith("$ACTION_REF_") ? (value = "$ACTION_" + key.slice(12) + ":", value = decodeBoundActionMetaData(body, serverManifest, value), action = loadServerReference(serverManifest, value.id, value.bound)) : key.startsWith("$ACTION_ID_") && (value = key.slice(11), action = loadServerReference(serverManifest, value, null)) : formData.append(key, value);
    });
    return null === action ? null : action.then(function(fn) {
        return fn.bind(null, formData);
    });
};
exports.decodeFormState = function(actionResult, body, serverManifest) {
    var keyPath = body.get("$ACTION_KEY");
    if ("string" !== typeof keyPath) return Promise.resolve(null);
    var metaData = null;
    body.forEach(function(value, key) {
        key.startsWith("$ACTION_REF_") && (value = "$ACTION_" + key.slice(12) + ":", metaData = decodeBoundActionMetaData(body, serverManifest, value));
    });
    if (null === metaData) return Promise.resolve(null);
    var referenceId = metaData.id;
    return Promise.resolve(metaData.bound).then(function(bound) {
        return null === bound ? null : [
            actionResult,
            keyPath,
            referenceId,
            bound.length - 1
        ];
    });
};
exports.decodeReply = function(body, webpackMap, options) {
    if ("string" === typeof body) {
        var form = new FormData();
        form.append("0", body);
        body = form;
    }
    body = createResponse(webpackMap, "", options ? options.temporaryReferences : void 0, body);
    webpackMap = getChunk(body, 0);
    close(body);
    return webpackMap;
};
exports.decodeReplyFromAsyncIterable = function(iterable, webpackMap, options) {
    function progress(entry) {
        if (entry.done) close(response);
        else {
            entry = entry.value;
            var name = entry[0];
            entry = entry[1];
            if ("string" === typeof entry) {
                response._formData.append(name, entry);
                var prefix = response._prefix;
                if (name.startsWith(prefix)) {
                    var chunks = response._chunks;
                    name = +name.slice(prefix.length);
                    (chunks = chunks.get(name)) && resolveModelChunk(chunks, entry, name);
                }
            } else response._formData.append(name, entry);
            iterator.next().then(progress, error);
        }
    }
    function error(reason) {
        reportGlobalError(response, reason);
        "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
    }
    var iterator = iterable[ASYNC_ITERATOR](), response = createResponse(webpackMap, "", options ? options.temporaryReferences : void 0);
    iterator.next().then(progress, error);
    return getChunk(response, 0);
};
exports.registerClientReference = function(proxyImplementation, id, exportName) {
    return registerClientReferenceImpl(proxyImplementation, id + "#" + exportName, !1);
};
exports.registerServerReference = function(reference, id, exportName) {
    return Object.defineProperties(reference, {
        $$typeof: {
            value: SERVER_REFERENCE_TAG
        },
        $$id: {
            value: null === exportName ? id : id + "#" + exportName,
            configurable: !0
        },
        $$bound: {
            value: null,
            configurable: !0
        },
        bind: {
            value: bind,
            configurable: !0
        }
    });
};
// This is a patch added by Next.js
const setTimeoutOrImmediate = typeof globalThis['set' + 'Immediate'] === 'function' && // edge runtime sandbox defines a stub for setImmediate
// (see 'addStub' in packages/next/src/server/web/sandbox/context.ts)
// but it's made non-enumerable, so we can detect it
globalThis.propertyIsEnumerable('setImmediate') ? globalThis['set' + 'Immediate'] : setTimeout;
exports.renderToReadableStream = function(model, webpackMap, options) {
    var request = new RequestInstance(20, model, webpackMap, options ? options.onError : void 0, options ? options.identifierPrefix : void 0, options ? options.onPostpone : void 0, options ? options.temporaryReferences : void 0, void 0, void 0, noop, noop);
    if (options && options.signal) {
        var signal = options.signal;
        if (signal.aborted) abort(request, signal.reason);
        else {
            var listener = function() {
                abort(request, signal.reason);
                signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
        }
    }
    return new ReadableStream({
        type: "bytes",
        start: function() {
            startWork(request);
        },
        pull: function(controller) {
            startFlowing(request, controller);
        },
        cancel: function(reason) {
            request.destination = null;
            abort(request, reason);
        }
    }, {
        highWaterMark: 0
    });
};
exports.unstable_prerender = function(model, webpackMap, options) {
    return new Promise(function(resolve, reject) {
        var request = new RequestInstance(21, model, webpackMap, options ? options.onError : void 0, options ? options.identifierPrefix : void 0, options ? options.onPostpone : void 0, options ? options.temporaryReferences : void 0, void 0, void 0, function() {
            var stream = new ReadableStream({
                type: "bytes",
                start: function() {
                    startWork(request);
                },
                pull: function(controller) {
                    startFlowing(request, controller);
                },
                cancel: function(reason) {
                    request.destination = null;
                    abort(request, reason);
                }
            }, {
                highWaterMark: 0
            });
            resolve({
                prelude: stream
            });
        }, reject);
        if (options && options.signal) {
            var signal = options.signal;
            if (signal.aborted) abort(request, signal.reason);
            else {
                var listener = function() {
                    abort(request, signal.reason);
                    signal.removeEventListener("abort", listener);
                };
                signal.addEventListener("abort", listener);
            }
        }
        startWork(request);
    });
};


/***/ }),

/***/ 801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ isHangingPromiseRejectionError),
/* harmony export */   W: () => (/* binding */ makeHangingPromise)
/* harmony export */ });
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
/**
 * This function constructs a promise that will never resolve. This is primarily
 * useful for dynamicIO where we use promise resolution timing to determine which
 * parts of a render can be included in a prerender.
 *
 * @internal
 */ function makeHangingPromise(signal, expression) {
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

/***/ 802:
/***/ ((module) => {

var __dirname = "/";
(()=>{"use strict";var e={993:e=>{var t=Object.prototype.hasOwnProperty,n="~";function Events(){}if(Object.create){Events.prototype=Object.create(null);if(!(new Events).__proto__)n=false}function EE(e,t,n){this.fn=e;this.context=t;this.once=n||false}function addListener(e,t,r,i,s){if(typeof r!=="function"){throw new TypeError("The listener must be a function")}var o=new EE(r,i||e,s),u=n?n+t:t;if(!e._events[u])e._events[u]=o,e._eventsCount++;else if(!e._events[u].fn)e._events[u].push(o);else e._events[u]=[e._events[u],o];return e}function clearEvent(e,t){if(--e._eventsCount===0)e._events=new Events;else delete e._events[t]}function EventEmitter(){this._events=new Events;this._eventsCount=0}EventEmitter.prototype.eventNames=function eventNames(){var e=[],r,i;if(this._eventsCount===0)return e;for(i in r=this._events){if(t.call(r,i))e.push(n?i.slice(1):i)}if(Object.getOwnPropertySymbols){return e.concat(Object.getOwnPropertySymbols(r))}return e};EventEmitter.prototype.listeners=function listeners(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,s=r.length,o=new Array(s);i<s;i++){o[i]=r[i].fn}return o};EventEmitter.prototype.listenerCount=function listenerCount(e){var t=n?n+e:e,r=this._events[t];if(!r)return 0;if(r.fn)return 1;return r.length};EventEmitter.prototype.emit=function emit(e,t,r,i,s,o){var u=n?n+e:e;if(!this._events[u])return false;var a=this._events[u],l=arguments.length,c,h;if(a.fn){if(a.once)this.removeListener(e,a.fn,undefined,true);switch(l){case 1:return a.fn.call(a.context),true;case 2:return a.fn.call(a.context,t),true;case 3:return a.fn.call(a.context,t,r),true;case 4:return a.fn.call(a.context,t,r,i),true;case 5:return a.fn.call(a.context,t,r,i,s),true;case 6:return a.fn.call(a.context,t,r,i,s,o),true}for(h=1,c=new Array(l-1);h<l;h++){c[h-1]=arguments[h]}a.fn.apply(a.context,c)}else{var _=a.length,f;for(h=0;h<_;h++){if(a[h].once)this.removeListener(e,a[h].fn,undefined,true);switch(l){case 1:a[h].fn.call(a[h].context);break;case 2:a[h].fn.call(a[h].context,t);break;case 3:a[h].fn.call(a[h].context,t,r);break;case 4:a[h].fn.call(a[h].context,t,r,i);break;default:if(!c)for(f=1,c=new Array(l-1);f<l;f++){c[f-1]=arguments[f]}a[h].fn.apply(a[h].context,c)}}}return true};EventEmitter.prototype.on=function on(e,t,n){return addListener(this,e,t,n,false)};EventEmitter.prototype.once=function once(e,t,n){return addListener(this,e,t,n,true)};EventEmitter.prototype.removeListener=function removeListener(e,t,r,i){var s=n?n+e:e;if(!this._events[s])return this;if(!t){clearEvent(this,s);return this}var o=this._events[s];if(o.fn){if(o.fn===t&&(!i||o.once)&&(!r||o.context===r)){clearEvent(this,s)}}else{for(var u=0,a=[],l=o.length;u<l;u++){if(o[u].fn!==t||i&&!o[u].once||r&&o[u].context!==r){a.push(o[u])}}if(a.length)this._events[s]=a.length===1?a[0]:a;else clearEvent(this,s)}return this};EventEmitter.prototype.removeAllListeners=function removeAllListeners(e){var t;if(e){t=n?n+e:e;if(this._events[t])clearEvent(this,t)}else{this._events=new Events;this._eventsCount=0}return this};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.addListener=EventEmitter.prototype.on;EventEmitter.prefixed=n;EventEmitter.EventEmitter=EventEmitter;if(true){e.exports=EventEmitter}},213:e=>{e.exports=(e,t)=>{t=t||(()=>{});return e.then((e=>new Promise((e=>{e(t())})).then((()=>e))),(e=>new Promise((e=>{e(t())})).then((()=>{throw e}))))}},574:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});function lowerBound(e,t,n){let r=0;let i=e.length;while(i>0){const s=i/2|0;let o=r+s;if(n(e[o],t)<=0){r=++o;i-=s+1}else{i=s}}return r}t["default"]=lowerBound},821:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:true});const r=n(574);class PriorityQueue{constructor(){this._queue=[]}enqueue(e,t){t=Object.assign({priority:0},t);const n={priority:t.priority,run:e};if(this.size&&this._queue[this.size-1].priority>=t.priority){this._queue.push(n);return}const i=r.default(this._queue,n,((e,t)=>t.priority-e.priority));this._queue.splice(i,0,n)}dequeue(){const e=this._queue.shift();return e===null||e===void 0?void 0:e.run}filter(e){return this._queue.filter((t=>t.priority===e.priority)).map((e=>e.run))}get size(){return this._queue.length}}t["default"]=PriorityQueue},816:(e,t,n)=>{const r=n(213);class TimeoutError extends Error{constructor(e){super(e);this.name="TimeoutError"}}const pTimeout=(e,t,n)=>new Promise(((i,s)=>{if(typeof t!=="number"||t<0){throw new TypeError("Expected `milliseconds` to be a positive number")}if(t===Infinity){i(e);return}const o=setTimeout((()=>{if(typeof n==="function"){try{i(n())}catch(e){s(e)}return}const r=typeof n==="string"?n:`Promise timed out after ${t} milliseconds`;const o=n instanceof Error?n:new TimeoutError(r);if(typeof e.cancel==="function"){e.cancel()}s(o)}),t);r(e.then(i,s),(()=>{clearTimeout(o)}))}));e.exports=pTimeout;e.exports["default"]=pTimeout;e.exports.TimeoutError=TimeoutError}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var i=t[n]={exports:{}};var s=true;try{e[n](i,i.exports,__nccwpck_require__);s=false}finally{if(s)delete t[n]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:true});const t=__nccwpck_require__(993);const r=__nccwpck_require__(816);const i=__nccwpck_require__(821);const empty=()=>{};const s=new r.TimeoutError;class PQueue extends t{constructor(e){var t,n,r,s;super();this._intervalCount=0;this._intervalEnd=0;this._pendingCount=0;this._resolveEmpty=empty;this._resolveIdle=empty;e=Object.assign({carryoverConcurrencyCount:false,intervalCap:Infinity,interval:0,concurrency:Infinity,autoStart:true,queueClass:i.default},e);if(!(typeof e.intervalCap==="number"&&e.intervalCap>=1)){throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(n=(t=e.intervalCap)===null||t===void 0?void 0:t.toString())!==null&&n!==void 0?n:""}\` (${typeof e.intervalCap})`)}if(e.interval===undefined||!(Number.isFinite(e.interval)&&e.interval>=0)){throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(s=(r=e.interval)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:""}\` (${typeof e.interval})`)}this._carryoverConcurrencyCount=e.carryoverConcurrencyCount;this._isIntervalIgnored=e.intervalCap===Infinity||e.interval===0;this._intervalCap=e.intervalCap;this._interval=e.interval;this._queue=new e.queueClass;this._queueClass=e.queueClass;this.concurrency=e.concurrency;this._timeout=e.timeout;this._throwOnTimeout=e.throwOnTimeout===true;this._isPaused=e.autoStart===false}get _doesIntervalAllowAnother(){return this._isIntervalIgnored||this._intervalCount<this._intervalCap}get _doesConcurrentAllowAnother(){return this._pendingCount<this._concurrency}_next(){this._pendingCount--;this._tryToStartAnother();this.emit("next")}_resolvePromises(){this._resolveEmpty();this._resolveEmpty=empty;if(this._pendingCount===0){this._resolveIdle();this._resolveIdle=empty;this.emit("idle")}}_onResumeInterval(){this._onInterval();this._initializeIntervalIfNeeded();this._timeoutId=undefined}_isIntervalPaused(){const e=Date.now();if(this._intervalId===undefined){const t=this._intervalEnd-e;if(t<0){this._intervalCount=this._carryoverConcurrencyCount?this._pendingCount:0}else{if(this._timeoutId===undefined){this._timeoutId=setTimeout((()=>{this._onResumeInterval()}),t)}return true}}return false}_tryToStartAnother(){if(this._queue.size===0){if(this._intervalId){clearInterval(this._intervalId)}this._intervalId=undefined;this._resolvePromises();return false}if(!this._isPaused){const e=!this._isIntervalPaused();if(this._doesIntervalAllowAnother&&this._doesConcurrentAllowAnother){const t=this._queue.dequeue();if(!t){return false}this.emit("active");t();if(e){this._initializeIntervalIfNeeded()}return true}}return false}_initializeIntervalIfNeeded(){if(this._isIntervalIgnored||this._intervalId!==undefined){return}this._intervalId=setInterval((()=>{this._onInterval()}),this._interval);this._intervalEnd=Date.now()+this._interval}_onInterval(){if(this._intervalCount===0&&this._pendingCount===0&&this._intervalId){clearInterval(this._intervalId);this._intervalId=undefined}this._intervalCount=this._carryoverConcurrencyCount?this._pendingCount:0;this._processQueue()}_processQueue(){while(this._tryToStartAnother()){}}get concurrency(){return this._concurrency}set concurrency(e){if(!(typeof e==="number"&&e>=1)){throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`)}this._concurrency=e;this._processQueue()}async add(e,t={}){return new Promise(((n,i)=>{const run=async()=>{this._pendingCount++;this._intervalCount++;try{const o=this._timeout===undefined&&t.timeout===undefined?e():r.default(Promise.resolve(e()),t.timeout===undefined?this._timeout:t.timeout,(()=>{if(t.throwOnTimeout===undefined?this._throwOnTimeout:t.throwOnTimeout){i(s)}return undefined}));n(await o)}catch(e){i(e)}this._next()};this._queue.enqueue(run,t);this._tryToStartAnother();this.emit("add")}))}async addAll(e,t){return Promise.all(e.map((async e=>this.add(e,t))))}start(){if(!this._isPaused){return this}this._isPaused=false;this._processQueue();return this}pause(){this._isPaused=true}clear(){this._queue=new this._queueClass}async onEmpty(){if(this._queue.size===0){return}return new Promise((e=>{const t=this._resolveEmpty;this._resolveEmpty=()=>{t();e()}}))}async onIdle(){if(this._pendingCount===0&&this._queue.size===0){return}return new Promise((e=>{const t=this._resolveIdle;this._resolveIdle=()=>{t();e()}}))}get size(){return this._queue.size}sizeBy(e){return this._queue.filter(e).length}get pending(){return this._pendingCount}get isPaused(){return this._isPaused}get timeout(){return this._timeout}set timeout(e){this._timeout=e}}e["default"]=PQueue})();module.exports=n})();

/***/ }),

/***/ 803:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.react-server.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(815);
function noop() {}
var Internals = {
  d: {
    f: noop,
    r: function () {
      throw Error(
        "Invalid form element. requestFormReset must be passed a form that was rendered by React."
      );
    },
    D: noop,
    C: noop,
    L: noop,
    m: noop,
    X: noop,
    S: noop,
    M: noop
  },
  p: 0,
  findDOMNode: null
};
if (!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE)
  throw Error(
    'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
  );
function getCrossOriginStringAs(as, input) {
  if ("font" === as) return "";
  if ("string" === typeof input)
    return "use-credentials" === input ? input : "";
}
exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  Internals;
exports.preconnect = function (href, options) {
  "string" === typeof href &&
    (options
      ? ((options = options.crossOrigin),
        (options =
          "string" === typeof options
            ? "use-credentials" === options
              ? options
              : ""
            : void 0))
      : (options = null),
    Internals.d.C(href, options));
};
exports.prefetchDNS = function (href) {
  "string" === typeof href && Internals.d.D(href);
};
exports.preinit = function (href, options) {
  if ("string" === typeof href && options && "string" === typeof options.as) {
    var as = options.as,
      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
      integrity =
        "string" === typeof options.integrity ? options.integrity : void 0,
      fetchPriority =
        "string" === typeof options.fetchPriority
          ? options.fetchPriority
          : void 0;
    "style" === as
      ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin: crossOrigin,
            integrity: integrity,
            fetchPriority: fetchPriority
          }
        )
      : "script" === as &&
        Internals.d.X(href, {
          crossOrigin: crossOrigin,
          integrity: integrity,
          fetchPriority: fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
  }
};
exports.preinitModule = function (href, options) {
  if ("string" === typeof href)
    if ("object" === typeof options && null !== options) {
      if (null == options.as || "script" === options.as) {
        var crossOrigin = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        );
        Internals.d.M(href, {
          crossOrigin: crossOrigin,
          integrity:
            "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    } else null == options && Internals.d.M(href);
};
exports.preload = function (href, options) {
  if (
    "string" === typeof href &&
    "object" === typeof options &&
    null !== options &&
    "string" === typeof options.as
  ) {
    var as = options.as,
      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
    Internals.d.L(href, as, {
      crossOrigin: crossOrigin,
      integrity:
        "string" === typeof options.integrity ? options.integrity : void 0,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
      type: "string" === typeof options.type ? options.type : void 0,
      fetchPriority:
        "string" === typeof options.fetchPriority
          ? options.fetchPriority
          : void 0,
      referrerPolicy:
        "string" === typeof options.referrerPolicy
          ? options.referrerPolicy
          : void 0,
      imageSrcSet:
        "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
      imageSizes:
        "string" === typeof options.imageSizes ? options.imageSizes : void 0,
      media: "string" === typeof options.media ? options.media : void 0
    });
  }
};
exports.preloadModule = function (href, options) {
  if ("string" === typeof href)
    if (options) {
      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
      Internals.d.m(href, {
        as:
          "string" === typeof options.as && "script" !== options.as
            ? options.as
            : void 0,
        crossOrigin: crossOrigin,
        integrity:
          "string" === typeof options.integrity ? options.integrity : void 0
      });
    } else Internals.d.m(href);
};
exports.version = "19.2.0-canary-3fbfb9ba-20250409";


/***/ }),

/***/ 815:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(35);
} else {}


/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ck: () => (/* binding */ RequestCookiesAdapter),
/* harmony export */   K8: () => (/* binding */ MutableRequestCookiesAdapter),
/* harmony export */   Xj: () => (/* binding */ areCookiesMutableInCurrentPhase),
/* harmony export */   hm: () => (/* binding */ wrapWithMutableAccessCheck)
/* harmony export */ });
/* unused harmony exports ReadonlyRequestCookiesError, getModifiedCookieValues, appendMutableCookies, responseCookiesToRequestCookies */
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(725);
/* harmony import */ var _reflect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(716);
/* harmony import */ var _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(535);
/* harmony import */ var _app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(115);





/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
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
                        return _reflect__WEBPACK_IMPORTED_MODULE_3__/* .ReflectAdapter */ .l.get(target, prop, receiver);
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
    const resCookies = new ResponseCookies(headers);
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
        const responseCookies = new _cookies__WEBPACK_IMPORTED_MODULE_0__/* .ResponseCookies */ .VO(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _app_render_work_async_storage_external__WEBPACK_IMPORTED_MODULE_1__/* .workAsyncStorage */ .J.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies__WEBPACK_IMPORTED_MODULE_0__/* .ResponseCookies */ .VO(new Headers());
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
                        return _reflect__WEBPACK_IMPORTED_MODULE_3__/* .ReflectAdapter */ .l.get(target, prop, receiver);
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
                    return _reflect__WEBPACK_IMPORTED_MODULE_3__/* .ReflectAdapter */ .l.get(target, prop, receiver);
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
    const requestStore = (0,_app_render_work_unit_async_storage_external__WEBPACK_IMPORTED_MODULE_2__/* .getExpectedRequestStore */ .XN)(callingExpression);
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
}

//# sourceMappingURL=request-cookies.js.map

/***/ }),

/***/ 821:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ RedirectStatusCode)
/* harmony export */ });
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({}); //# sourceMappingURL=redirect-status-code.js.map


/***/ }),

/***/ 830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  s: () => (/* reexport */ actionAsyncStorageInstance)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/app-render/async-local-storage.js
var async_local_storage = __webpack_require__(58);
;// ./node_modules/next/dist/esm/server/app-render/action-async-storage-instance.js

const actionAsyncStorageInstance = (0,async_local_storage/* createAsyncLocalStorage */.xl)();

//# sourceMappingURL=action-async-storage-instance.js.map
;// ./node_modules/next/dist/esm/server/app-render/action-async-storage.external.js
// Share the instance module in the next-shared layer



//# sourceMappingURL=action-async-storage.external.js.map

/***/ }),

/***/ 890:
/***/ ((module) => {

var __dirname = "/";
(()=>{"use strict";if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e={};(()=>{var r=e;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */r.parse=parse;r.serialize=serialize;var i=decodeURIComponent;var t=encodeURIComponent;var a=/; */;var n=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function parse(e,r){if(typeof e!=="string"){throw new TypeError("argument str must be a string")}var t={};var n=r||{};var o=e.split(a);var s=n.decode||i;for(var p=0;p<o.length;p++){var f=o[p];var u=f.indexOf("=");if(u<0){continue}var v=f.substr(0,u).trim();var c=f.substr(++u,f.length).trim();if('"'==c[0]){c=c.slice(1,-1)}if(undefined==t[v]){t[v]=tryDecode(c,s)}}return t}function serialize(e,r,i){var a=i||{};var o=a.encode||t;if(typeof o!=="function"){throw new TypeError("option encode is invalid")}if(!n.test(e)){throw new TypeError("argument name is invalid")}var s=o(r);if(s&&!n.test(s)){throw new TypeError("argument val is invalid")}var p=e+"="+s;if(null!=a.maxAge){var f=a.maxAge-0;if(isNaN(f)||!isFinite(f)){throw new TypeError("option maxAge is invalid")}p+="; Max-Age="+Math.floor(f)}if(a.domain){if(!n.test(a.domain)){throw new TypeError("option domain is invalid")}p+="; Domain="+a.domain}if(a.path){if(!n.test(a.path)){throw new TypeError("option path is invalid")}p+="; Path="+a.path}if(a.expires){if(typeof a.expires.toUTCString!=="function"){throw new TypeError("option expires is invalid")}p+="; Expires="+a.expires.toUTCString()}if(a.httpOnly){p+="; HttpOnly"}if(a.secure){p+="; Secure"}if(a.sameSite){var u=typeof a.sameSite==="string"?a.sameSite.toLowerCase():a.sameSite;switch(u){case true:p+="; SameSite=Strict";break;case"lax":p+="; SameSite=Lax";break;case"strict":p+="; SameSite=Strict";break;case"none":p+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return p}function tryDecode(e,r){try{return r(e)}catch(r){return e}}})();module.exports=e})();

/***/ }),

/***/ 905:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __webpack_require__(201);
const _fetch = __webpack_require__(552);
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(__webpack_require__.g.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
}

//# sourceMappingURL=server-edge.js.map

/***/ }),

/***/ 936:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var s;
if (true) {
  s = __webpack_require__(799);
} else {}

__webpack_unused_export__ = s.renderToReadableStream;
__webpack_unused_export__ = s.decodeReply;
__webpack_unused_export__ = s.decodeReplyFromAsyncIterable;
__webpack_unused_export__ = s.decodeAction;
__webpack_unused_export__ = s.decodeFormState;
__webpack_unused_export__ = s.registerServerReference;
exports.YR = s.registerClientReference;
__webpack_unused_export__ = s.createClientModuleProxy;
__webpack_unused_export__ = s.createTemporaryReferenceSet;


/***/ }),

/***/ 956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
(()=>{"use strict";var e={491:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.ContextAPI=void 0;const n=r(223);const a=r(172);const o=r(930);const i="context";const c=new n.NoopContextManager;class ContextAPI{constructor(){}static getInstance(){if(!this._instance){this._instance=new ContextAPI}return this._instance}setGlobalContextManager(e){return(0,a.registerGlobal)(i,e,o.DiagAPI.instance())}active(){return this._getContextManager().active()}with(e,t,r,...n){return this._getContextManager().with(e,t,r,...n)}bind(e,t){return this._getContextManager().bind(e,t)}_getContextManager(){return(0,a.getGlobal)(i)||c}disable(){this._getContextManager().disable();(0,a.unregisterGlobal)(i,o.DiagAPI.instance())}}t.ContextAPI=ContextAPI},930:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagAPI=void 0;const n=r(56);const a=r(912);const o=r(957);const i=r(172);const c="diag";class DiagAPI{constructor(){function _logProxy(e){return function(...t){const r=(0,i.getGlobal)("diag");if(!r)return;return r[e](...t)}}const e=this;const setLogger=(t,r={logLevel:o.DiagLogLevel.INFO})=>{var n,c,s;if(t===e){const t=new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");e.error((n=t.stack)!==null&&n!==void 0?n:t.message);return false}if(typeof r==="number"){r={logLevel:r}}const u=(0,i.getGlobal)("diag");const l=(0,a.createLogLevelDiagLogger)((c=r.logLevel)!==null&&c!==void 0?c:o.DiagLogLevel.INFO,t);if(u&&!r.suppressOverrideMessage){const e=(s=(new Error).stack)!==null&&s!==void 0?s:"<failed to generate stacktrace>";u.warn(`Current logger will be overwritten from ${e}`);l.warn(`Current logger will overwrite one already registered from ${e}`)}return(0,i.registerGlobal)("diag",l,e,true)};e.setLogger=setLogger;e.disable=()=>{(0,i.unregisterGlobal)(c,e)};e.createComponentLogger=e=>new n.DiagComponentLogger(e);e.verbose=_logProxy("verbose");e.debug=_logProxy("debug");e.info=_logProxy("info");e.warn=_logProxy("warn");e.error=_logProxy("error")}static instance(){if(!this._instance){this._instance=new DiagAPI}return this._instance}}t.DiagAPI=DiagAPI},653:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.MetricsAPI=void 0;const n=r(660);const a=r(172);const o=r(930);const i="metrics";class MetricsAPI{constructor(){}static getInstance(){if(!this._instance){this._instance=new MetricsAPI}return this._instance}setGlobalMeterProvider(e){return(0,a.registerGlobal)(i,e,o.DiagAPI.instance())}getMeterProvider(){return(0,a.getGlobal)(i)||n.NOOP_METER_PROVIDER}getMeter(e,t,r){return this.getMeterProvider().getMeter(e,t,r)}disable(){(0,a.unregisterGlobal)(i,o.DiagAPI.instance())}}t.MetricsAPI=MetricsAPI},181:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.PropagationAPI=void 0;const n=r(172);const a=r(874);const o=r(194);const i=r(277);const c=r(369);const s=r(930);const u="propagation";const l=new a.NoopTextMapPropagator;class PropagationAPI{constructor(){this.createBaggage=c.createBaggage;this.getBaggage=i.getBaggage;this.getActiveBaggage=i.getActiveBaggage;this.setBaggage=i.setBaggage;this.deleteBaggage=i.deleteBaggage}static getInstance(){if(!this._instance){this._instance=new PropagationAPI}return this._instance}setGlobalPropagator(e){return(0,n.registerGlobal)(u,e,s.DiagAPI.instance())}inject(e,t,r=o.defaultTextMapSetter){return this._getGlobalPropagator().inject(e,t,r)}extract(e,t,r=o.defaultTextMapGetter){return this._getGlobalPropagator().extract(e,t,r)}fields(){return this._getGlobalPropagator().fields()}disable(){(0,n.unregisterGlobal)(u,s.DiagAPI.instance())}_getGlobalPropagator(){return(0,n.getGlobal)(u)||l}}t.PropagationAPI=PropagationAPI},997:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.TraceAPI=void 0;const n=r(172);const a=r(846);const o=r(139);const i=r(607);const c=r(930);const s="trace";class TraceAPI{constructor(){this._proxyTracerProvider=new a.ProxyTracerProvider;this.wrapSpanContext=o.wrapSpanContext;this.isSpanContextValid=o.isSpanContextValid;this.deleteSpan=i.deleteSpan;this.getSpan=i.getSpan;this.getActiveSpan=i.getActiveSpan;this.getSpanContext=i.getSpanContext;this.setSpan=i.setSpan;this.setSpanContext=i.setSpanContext}static getInstance(){if(!this._instance){this._instance=new TraceAPI}return this._instance}setGlobalTracerProvider(e){const t=(0,n.registerGlobal)(s,this._proxyTracerProvider,c.DiagAPI.instance());if(t){this._proxyTracerProvider.setDelegate(e)}return t}getTracerProvider(){return(0,n.getGlobal)(s)||this._proxyTracerProvider}getTracer(e,t){return this.getTracerProvider().getTracer(e,t)}disable(){(0,n.unregisterGlobal)(s,c.DiagAPI.instance());this._proxyTracerProvider=new a.ProxyTracerProvider}}t.TraceAPI=TraceAPI},277:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.deleteBaggage=t.setBaggage=t.getActiveBaggage=t.getBaggage=void 0;const n=r(491);const a=r(780);const o=(0,a.createContextKey)("OpenTelemetry Baggage Key");function getBaggage(e){return e.getValue(o)||undefined}t.getBaggage=getBaggage;function getActiveBaggage(){return getBaggage(n.ContextAPI.getInstance().active())}t.getActiveBaggage=getActiveBaggage;function setBaggage(e,t){return e.setValue(o,t)}t.setBaggage=setBaggage;function deleteBaggage(e){return e.deleteValue(o)}t.deleteBaggage=deleteBaggage},993:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.BaggageImpl=void 0;class BaggageImpl{constructor(e){this._entries=e?new Map(e):new Map}getEntry(e){const t=this._entries.get(e);if(!t){return undefined}return Object.assign({},t)}getAllEntries(){return Array.from(this._entries.entries()).map((([e,t])=>[e,t]))}setEntry(e,t){const r=new BaggageImpl(this._entries);r._entries.set(e,t);return r}removeEntry(e){const t=new BaggageImpl(this._entries);t._entries.delete(e);return t}removeEntries(...e){const t=new BaggageImpl(this._entries);for(const r of e){t._entries.delete(r)}return t}clear(){return new BaggageImpl}}t.BaggageImpl=BaggageImpl},830:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.baggageEntryMetadataSymbol=void 0;t.baggageEntryMetadataSymbol=Symbol("BaggageEntryMetadata")},369:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.baggageEntryMetadataFromString=t.createBaggage=void 0;const n=r(930);const a=r(993);const o=r(830);const i=n.DiagAPI.instance();function createBaggage(e={}){return new a.BaggageImpl(new Map(Object.entries(e)))}t.createBaggage=createBaggage;function baggageEntryMetadataFromString(e){if(typeof e!=="string"){i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);e=""}return{__TYPE__:o.baggageEntryMetadataSymbol,toString(){return e}}}t.baggageEntryMetadataFromString=baggageEntryMetadataFromString},67:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.context=void 0;const n=r(491);t.context=n.ContextAPI.getInstance()},223:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopContextManager=void 0;const n=r(780);class NoopContextManager{active(){return n.ROOT_CONTEXT}with(e,t,r,...n){return t.call(r,...n)}bind(e,t){return t}enable(){return this}disable(){return this}}t.NoopContextManager=NoopContextManager},780:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.ROOT_CONTEXT=t.createContextKey=void 0;function createContextKey(e){return Symbol.for(e)}t.createContextKey=createContextKey;class BaseContext{constructor(e){const t=this;t._currentContext=e?new Map(e):new Map;t.getValue=e=>t._currentContext.get(e);t.setValue=(e,r)=>{const n=new BaseContext(t._currentContext);n._currentContext.set(e,r);return n};t.deleteValue=e=>{const r=new BaseContext(t._currentContext);r._currentContext.delete(e);return r}}}t.ROOT_CONTEXT=new BaseContext},506:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.diag=void 0;const n=r(930);t.diag=n.DiagAPI.instance()},56:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagComponentLogger=void 0;const n=r(172);class DiagComponentLogger{constructor(e){this._namespace=e.namespace||"DiagComponentLogger"}debug(...e){return logProxy("debug",this._namespace,e)}error(...e){return logProxy("error",this._namespace,e)}info(...e){return logProxy("info",this._namespace,e)}warn(...e){return logProxy("warn",this._namespace,e)}verbose(...e){return logProxy("verbose",this._namespace,e)}}t.DiagComponentLogger=DiagComponentLogger;function logProxy(e,t,r){const a=(0,n.getGlobal)("diag");if(!a){return}r.unshift(t);return a[e](...r)}},972:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagConsoleLogger=void 0;const r=[{n:"error",c:"error"},{n:"warn",c:"warn"},{n:"info",c:"info"},{n:"debug",c:"debug"},{n:"verbose",c:"trace"}];class DiagConsoleLogger{constructor(){function _consoleFunc(e){return function(...t){if(console){let r=console[e];if(typeof r!=="function"){r=console.log}if(typeof r==="function"){return r.apply(console,t)}}}}for(let e=0;e<r.length;e++){this[r[e].n]=_consoleFunc(r[e].c)}}}t.DiagConsoleLogger=DiagConsoleLogger},912:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.createLogLevelDiagLogger=void 0;const n=r(957);function createLogLevelDiagLogger(e,t){if(e<n.DiagLogLevel.NONE){e=n.DiagLogLevel.NONE}else if(e>n.DiagLogLevel.ALL){e=n.DiagLogLevel.ALL}t=t||{};function _filterFunc(r,n){const a=t[r];if(typeof a==="function"&&e>=n){return a.bind(t)}return function(){}}return{error:_filterFunc("error",n.DiagLogLevel.ERROR),warn:_filterFunc("warn",n.DiagLogLevel.WARN),info:_filterFunc("info",n.DiagLogLevel.INFO),debug:_filterFunc("debug",n.DiagLogLevel.DEBUG),verbose:_filterFunc("verbose",n.DiagLogLevel.VERBOSE)}}t.createLogLevelDiagLogger=createLogLevelDiagLogger},957:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.DiagLogLevel=void 0;var r;(function(e){e[e["NONE"]=0]="NONE";e[e["ERROR"]=30]="ERROR";e[e["WARN"]=50]="WARN";e[e["INFO"]=60]="INFO";e[e["DEBUG"]=70]="DEBUG";e[e["VERBOSE"]=80]="VERBOSE";e[e["ALL"]=9999]="ALL"})(r=t.DiagLogLevel||(t.DiagLogLevel={}))},172:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.unregisterGlobal=t.getGlobal=t.registerGlobal=void 0;const n=r(200);const a=r(521);const o=r(130);const i=a.VERSION.split(".")[0];const c=Symbol.for(`opentelemetry.js.api.${i}`);const s=n._globalThis;function registerGlobal(e,t,r,n=false){var o;const i=s[c]=(o=s[c])!==null&&o!==void 0?o:{version:a.VERSION};if(!n&&i[e]){const t=new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);r.error(t.stack||t.message);return false}if(i.version!==a.VERSION){const t=new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);r.error(t.stack||t.message);return false}i[e]=t;r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);return true}t.registerGlobal=registerGlobal;function getGlobal(e){var t,r;const n=(t=s[c])===null||t===void 0?void 0:t.version;if(!n||!(0,o.isCompatible)(n)){return}return(r=s[c])===null||r===void 0?void 0:r[e]}t.getGlobal=getGlobal;function unregisterGlobal(e,t){t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);const r=s[c];if(r){delete r[e]}}t.unregisterGlobal=unregisterGlobal},130:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.isCompatible=t._makeCompatibilityCheck=void 0;const n=r(521);const a=/^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;function _makeCompatibilityCheck(e){const t=new Set([e]);const r=new Set;const n=e.match(a);if(!n){return()=>false}const o={major:+n[1],minor:+n[2],patch:+n[3],prerelease:n[4]};if(o.prerelease!=null){return function isExactmatch(t){return t===e}}function _reject(e){r.add(e);return false}function _accept(e){t.add(e);return true}return function isCompatible(e){if(t.has(e)){return true}if(r.has(e)){return false}const n=e.match(a);if(!n){return _reject(e)}const i={major:+n[1],minor:+n[2],patch:+n[3],prerelease:n[4]};if(i.prerelease!=null){return _reject(e)}if(o.major!==i.major){return _reject(e)}if(o.major===0){if(o.minor===i.minor&&o.patch<=i.patch){return _accept(e)}return _reject(e)}if(o.minor<=i.minor){return _accept(e)}return _reject(e)}}t._makeCompatibilityCheck=_makeCompatibilityCheck;t.isCompatible=_makeCompatibilityCheck(n.VERSION)},886:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.metrics=void 0;const n=r(653);t.metrics=n.MetricsAPI.getInstance()},901:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.ValueType=void 0;var r;(function(e){e[e["INT"]=0]="INT";e[e["DOUBLE"]=1]="DOUBLE"})(r=t.ValueType||(t.ValueType={}))},102:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.createNoopMeter=t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC=t.NOOP_OBSERVABLE_GAUGE_METRIC=t.NOOP_OBSERVABLE_COUNTER_METRIC=t.NOOP_UP_DOWN_COUNTER_METRIC=t.NOOP_HISTOGRAM_METRIC=t.NOOP_COUNTER_METRIC=t.NOOP_METER=t.NoopObservableUpDownCounterMetric=t.NoopObservableGaugeMetric=t.NoopObservableCounterMetric=t.NoopObservableMetric=t.NoopHistogramMetric=t.NoopUpDownCounterMetric=t.NoopCounterMetric=t.NoopMetric=t.NoopMeter=void 0;class NoopMeter{constructor(){}createHistogram(e,r){return t.NOOP_HISTOGRAM_METRIC}createCounter(e,r){return t.NOOP_COUNTER_METRIC}createUpDownCounter(e,r){return t.NOOP_UP_DOWN_COUNTER_METRIC}createObservableGauge(e,r){return t.NOOP_OBSERVABLE_GAUGE_METRIC}createObservableCounter(e,r){return t.NOOP_OBSERVABLE_COUNTER_METRIC}createObservableUpDownCounter(e,r){return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC}addBatchObservableCallback(e,t){}removeBatchObservableCallback(e){}}t.NoopMeter=NoopMeter;class NoopMetric{}t.NoopMetric=NoopMetric;class NoopCounterMetric extends NoopMetric{add(e,t){}}t.NoopCounterMetric=NoopCounterMetric;class NoopUpDownCounterMetric extends NoopMetric{add(e,t){}}t.NoopUpDownCounterMetric=NoopUpDownCounterMetric;class NoopHistogramMetric extends NoopMetric{record(e,t){}}t.NoopHistogramMetric=NoopHistogramMetric;class NoopObservableMetric{addCallback(e){}removeCallback(e){}}t.NoopObservableMetric=NoopObservableMetric;class NoopObservableCounterMetric extends NoopObservableMetric{}t.NoopObservableCounterMetric=NoopObservableCounterMetric;class NoopObservableGaugeMetric extends NoopObservableMetric{}t.NoopObservableGaugeMetric=NoopObservableGaugeMetric;class NoopObservableUpDownCounterMetric extends NoopObservableMetric{}t.NoopObservableUpDownCounterMetric=NoopObservableUpDownCounterMetric;t.NOOP_METER=new NoopMeter;t.NOOP_COUNTER_METRIC=new NoopCounterMetric;t.NOOP_HISTOGRAM_METRIC=new NoopHistogramMetric;t.NOOP_UP_DOWN_COUNTER_METRIC=new NoopUpDownCounterMetric;t.NOOP_OBSERVABLE_COUNTER_METRIC=new NoopObservableCounterMetric;t.NOOP_OBSERVABLE_GAUGE_METRIC=new NoopObservableGaugeMetric;t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC=new NoopObservableUpDownCounterMetric;function createNoopMeter(){return t.NOOP_METER}t.createNoopMeter=createNoopMeter},660:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NOOP_METER_PROVIDER=t.NoopMeterProvider=void 0;const n=r(102);class NoopMeterProvider{getMeter(e,t,r){return n.NOOP_METER}}t.NoopMeterProvider=NoopMeterProvider;t.NOOP_METER_PROVIDER=new NoopMeterProvider},200:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){if(n===undefined)n=r;Object.defineProperty(e,n,{enumerable:true,get:function(){return t[r]}})}:function(e,t,r,n){if(n===undefined)n=r;e[n]=t[r]});var a=this&&this.__exportStar||function(e,t){for(var r in e)if(r!=="default"&&!Object.prototype.hasOwnProperty.call(t,r))n(t,e,r)};Object.defineProperty(t,"__esModule",{value:true});a(r(46),t)},651:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t._globalThis=void 0;t._globalThis=typeof globalThis==="object"?globalThis:__webpack_require__.g},46:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){if(n===undefined)n=r;Object.defineProperty(e,n,{enumerable:true,get:function(){return t[r]}})}:function(e,t,r,n){if(n===undefined)n=r;e[n]=t[r]});var a=this&&this.__exportStar||function(e,t){for(var r in e)if(r!=="default"&&!Object.prototype.hasOwnProperty.call(t,r))n(t,e,r)};Object.defineProperty(t,"__esModule",{value:true});a(r(651),t)},939:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.propagation=void 0;const n=r(181);t.propagation=n.PropagationAPI.getInstance()},874:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopTextMapPropagator=void 0;class NoopTextMapPropagator{inject(e,t){}extract(e,t){return e}fields(){return[]}}t.NoopTextMapPropagator=NoopTextMapPropagator},194:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.defaultTextMapSetter=t.defaultTextMapGetter=void 0;t.defaultTextMapGetter={get(e,t){if(e==null){return undefined}return e[t]},keys(e){if(e==null){return[]}return Object.keys(e)}};t.defaultTextMapSetter={set(e,t,r){if(e==null){return}e[t]=r}}},845:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.trace=void 0;const n=r(997);t.trace=n.TraceAPI.getInstance()},403:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NonRecordingSpan=void 0;const n=r(476);class NonRecordingSpan{constructor(e=n.INVALID_SPAN_CONTEXT){this._spanContext=e}spanContext(){return this._spanContext}setAttribute(e,t){return this}setAttributes(e){return this}addEvent(e,t){return this}setStatus(e){return this}updateName(e){return this}end(e){}isRecording(){return false}recordException(e,t){}}t.NonRecordingSpan=NonRecordingSpan},614:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopTracer=void 0;const n=r(491);const a=r(607);const o=r(403);const i=r(139);const c=n.ContextAPI.getInstance();class NoopTracer{startSpan(e,t,r=c.active()){const n=Boolean(t===null||t===void 0?void 0:t.root);if(n){return new o.NonRecordingSpan}const s=r&&(0,a.getSpanContext)(r);if(isSpanContext(s)&&(0,i.isSpanContextValid)(s)){return new o.NonRecordingSpan(s)}else{return new o.NonRecordingSpan}}startActiveSpan(e,t,r,n){let o;let i;let s;if(arguments.length<2){return}else if(arguments.length===2){s=t}else if(arguments.length===3){o=t;s=r}else{o=t;i=r;s=n}const u=i!==null&&i!==void 0?i:c.active();const l=this.startSpan(e,o,u);const g=(0,a.setSpan)(u,l);return c.with(g,s,undefined,l)}}t.NoopTracer=NoopTracer;function isSpanContext(e){return typeof e==="object"&&typeof e["spanId"]==="string"&&typeof e["traceId"]==="string"&&typeof e["traceFlags"]==="number"}},124:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.NoopTracerProvider=void 0;const n=r(614);class NoopTracerProvider{getTracer(e,t,r){return new n.NoopTracer}}t.NoopTracerProvider=NoopTracerProvider},125:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.ProxyTracer=void 0;const n=r(614);const a=new n.NoopTracer;class ProxyTracer{constructor(e,t,r,n){this._provider=e;this.name=t;this.version=r;this.options=n}startSpan(e,t,r){return this._getTracer().startSpan(e,t,r)}startActiveSpan(e,t,r,n){const a=this._getTracer();return Reflect.apply(a.startActiveSpan,a,arguments)}_getTracer(){if(this._delegate){return this._delegate}const e=this._provider.getDelegateTracer(this.name,this.version,this.options);if(!e){return a}this._delegate=e;return this._delegate}}t.ProxyTracer=ProxyTracer},846:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.ProxyTracerProvider=void 0;const n=r(125);const a=r(124);const o=new a.NoopTracerProvider;class ProxyTracerProvider{getTracer(e,t,r){var a;return(a=this.getDelegateTracer(e,t,r))!==null&&a!==void 0?a:new n.ProxyTracer(this,e,t,r)}getDelegate(){var e;return(e=this._delegate)!==null&&e!==void 0?e:o}setDelegate(e){this._delegate=e}getDelegateTracer(e,t,r){var n;return(n=this._delegate)===null||n===void 0?void 0:n.getTracer(e,t,r)}}t.ProxyTracerProvider=ProxyTracerProvider},996:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.SamplingDecision=void 0;var r;(function(e){e[e["NOT_RECORD"]=0]="NOT_RECORD";e[e["RECORD"]=1]="RECORD";e[e["RECORD_AND_SAMPLED"]=2]="RECORD_AND_SAMPLED"})(r=t.SamplingDecision||(t.SamplingDecision={}))},607:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.getSpanContext=t.setSpanContext=t.deleteSpan=t.setSpan=t.getActiveSpan=t.getSpan=void 0;const n=r(780);const a=r(403);const o=r(491);const i=(0,n.createContextKey)("OpenTelemetry Context Key SPAN");function getSpan(e){return e.getValue(i)||undefined}t.getSpan=getSpan;function getActiveSpan(){return getSpan(o.ContextAPI.getInstance().active())}t.getActiveSpan=getActiveSpan;function setSpan(e,t){return e.setValue(i,t)}t.setSpan=setSpan;function deleteSpan(e){return e.deleteValue(i)}t.deleteSpan=deleteSpan;function setSpanContext(e,t){return setSpan(e,new a.NonRecordingSpan(t))}t.setSpanContext=setSpanContext;function getSpanContext(e){var t;return(t=getSpan(e))===null||t===void 0?void 0:t.spanContext()}t.getSpanContext=getSpanContext},325:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.TraceStateImpl=void 0;const n=r(564);const a=32;const o=512;const i=",";const c="=";class TraceStateImpl{constructor(e){this._internalState=new Map;if(e)this._parse(e)}set(e,t){const r=this._clone();if(r._internalState.has(e)){r._internalState.delete(e)}r._internalState.set(e,t);return r}unset(e){const t=this._clone();t._internalState.delete(e);return t}get(e){return this._internalState.get(e)}serialize(){return this._keys().reduce(((e,t)=>{e.push(t+c+this.get(t));return e}),[]).join(i)}_parse(e){if(e.length>o)return;this._internalState=e.split(i).reverse().reduce(((e,t)=>{const r=t.trim();const a=r.indexOf(c);if(a!==-1){const o=r.slice(0,a);const i=r.slice(a+1,t.length);if((0,n.validateKey)(o)&&(0,n.validateValue)(i)){e.set(o,i)}else{}}return e}),new Map);if(this._internalState.size>a){this._internalState=new Map(Array.from(this._internalState.entries()).reverse().slice(0,a))}}_keys(){return Array.from(this._internalState.keys()).reverse()}_clone(){const e=new TraceStateImpl;e._internalState=new Map(this._internalState);return e}}t.TraceStateImpl=TraceStateImpl},564:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.validateValue=t.validateKey=void 0;const r="[_0-9a-z-*/]";const n=`[a-z]${r}{0,255}`;const a=`[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;const o=new RegExp(`^(?:${n}|${a})$`);const i=/^[ -~]{0,255}[!-~]$/;const c=/,|=/;function validateKey(e){return o.test(e)}t.validateKey=validateKey;function validateValue(e){return i.test(e)&&!c.test(e)}t.validateValue=validateValue},98:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.createTraceState=void 0;const n=r(325);function createTraceState(e){return new n.TraceStateImpl(e)}t.createTraceState=createTraceState},476:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.INVALID_SPAN_CONTEXT=t.INVALID_TRACEID=t.INVALID_SPANID=void 0;const n=r(475);t.INVALID_SPANID="0000000000000000";t.INVALID_TRACEID="00000000000000000000000000000000";t.INVALID_SPAN_CONTEXT={traceId:t.INVALID_TRACEID,spanId:t.INVALID_SPANID,traceFlags:n.TraceFlags.NONE}},357:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.SpanKind=void 0;var r;(function(e){e[e["INTERNAL"]=0]="INTERNAL";e[e["SERVER"]=1]="SERVER";e[e["CLIENT"]=2]="CLIENT";e[e["PRODUCER"]=3]="PRODUCER";e[e["CONSUMER"]=4]="CONSUMER"})(r=t.SpanKind||(t.SpanKind={}))},139:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:true});t.wrapSpanContext=t.isSpanContextValid=t.isValidSpanId=t.isValidTraceId=void 0;const n=r(476);const a=r(403);const o=/^([0-9a-f]{32})$/i;const i=/^[0-9a-f]{16}$/i;function isValidTraceId(e){return o.test(e)&&e!==n.INVALID_TRACEID}t.isValidTraceId=isValidTraceId;function isValidSpanId(e){return i.test(e)&&e!==n.INVALID_SPANID}t.isValidSpanId=isValidSpanId;function isSpanContextValid(e){return isValidTraceId(e.traceId)&&isValidSpanId(e.spanId)}t.isSpanContextValid=isSpanContextValid;function wrapSpanContext(e){return new a.NonRecordingSpan(e)}t.wrapSpanContext=wrapSpanContext},847:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.SpanStatusCode=void 0;var r;(function(e){e[e["UNSET"]=0]="UNSET";e[e["OK"]=1]="OK";e[e["ERROR"]=2]="ERROR"})(r=t.SpanStatusCode||(t.SpanStatusCode={}))},475:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.TraceFlags=void 0;var r;(function(e){e[e["NONE"]=0]="NONE";e[e["SAMPLED"]=1]="SAMPLED"})(r=t.TraceFlags||(t.TraceFlags={}))},521:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.VERSION=void 0;t.VERSION="1.6.0"}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var a=t[r]={exports:{}};var o=true;try{e[r].call(a.exports,a,a.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return a.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:true});e.trace=e.propagation=e.metrics=e.diag=e.context=e.INVALID_SPAN_CONTEXT=e.INVALID_TRACEID=e.INVALID_SPANID=e.isValidSpanId=e.isValidTraceId=e.isSpanContextValid=e.createTraceState=e.TraceFlags=e.SpanStatusCode=e.SpanKind=e.SamplingDecision=e.ProxyTracerProvider=e.ProxyTracer=e.defaultTextMapSetter=e.defaultTextMapGetter=e.ValueType=e.createNoopMeter=e.DiagLogLevel=e.DiagConsoleLogger=e.ROOT_CONTEXT=e.createContextKey=e.baggageEntryMetadataFromString=void 0;var t=__nccwpck_require__(369);Object.defineProperty(e,"baggageEntryMetadataFromString",{enumerable:true,get:function(){return t.baggageEntryMetadataFromString}});var n=__nccwpck_require__(780);Object.defineProperty(e,"createContextKey",{enumerable:true,get:function(){return n.createContextKey}});Object.defineProperty(e,"ROOT_CONTEXT",{enumerable:true,get:function(){return n.ROOT_CONTEXT}});var a=__nccwpck_require__(972);Object.defineProperty(e,"DiagConsoleLogger",{enumerable:true,get:function(){return a.DiagConsoleLogger}});var o=__nccwpck_require__(957);Object.defineProperty(e,"DiagLogLevel",{enumerable:true,get:function(){return o.DiagLogLevel}});var i=__nccwpck_require__(102);Object.defineProperty(e,"createNoopMeter",{enumerable:true,get:function(){return i.createNoopMeter}});var c=__nccwpck_require__(901);Object.defineProperty(e,"ValueType",{enumerable:true,get:function(){return c.ValueType}});var s=__nccwpck_require__(194);Object.defineProperty(e,"defaultTextMapGetter",{enumerable:true,get:function(){return s.defaultTextMapGetter}});Object.defineProperty(e,"defaultTextMapSetter",{enumerable:true,get:function(){return s.defaultTextMapSetter}});var u=__nccwpck_require__(125);Object.defineProperty(e,"ProxyTracer",{enumerable:true,get:function(){return u.ProxyTracer}});var l=__nccwpck_require__(846);Object.defineProperty(e,"ProxyTracerProvider",{enumerable:true,get:function(){return l.ProxyTracerProvider}});var g=__nccwpck_require__(996);Object.defineProperty(e,"SamplingDecision",{enumerable:true,get:function(){return g.SamplingDecision}});var p=__nccwpck_require__(357);Object.defineProperty(e,"SpanKind",{enumerable:true,get:function(){return p.SpanKind}});var d=__nccwpck_require__(847);Object.defineProperty(e,"SpanStatusCode",{enumerable:true,get:function(){return d.SpanStatusCode}});var _=__nccwpck_require__(475);Object.defineProperty(e,"TraceFlags",{enumerable:true,get:function(){return _.TraceFlags}});var f=__nccwpck_require__(98);Object.defineProperty(e,"createTraceState",{enumerable:true,get:function(){return f.createTraceState}});var b=__nccwpck_require__(139);Object.defineProperty(e,"isSpanContextValid",{enumerable:true,get:function(){return b.isSpanContextValid}});Object.defineProperty(e,"isValidTraceId",{enumerable:true,get:function(){return b.isValidTraceId}});Object.defineProperty(e,"isValidSpanId",{enumerable:true,get:function(){return b.isValidSpanId}});var v=__nccwpck_require__(476);Object.defineProperty(e,"INVALID_SPANID",{enumerable:true,get:function(){return v.INVALID_SPANID}});Object.defineProperty(e,"INVALID_TRACEID",{enumerable:true,get:function(){return v.INVALID_TRACEID}});Object.defineProperty(e,"INVALID_SPAN_CONTEXT",{enumerable:true,get:function(){return v.INVALID_SPAN_CONTEXT}});const O=__nccwpck_require__(67);Object.defineProperty(e,"context",{enumerable:true,get:function(){return O.context}});const P=__nccwpck_require__(506);Object.defineProperty(e,"diag",{enumerable:true,get:function(){return P.diag}});const N=__nccwpck_require__(886);Object.defineProperty(e,"metrics",{enumerable:true,get:function(){return N.metrics}});const S=__nccwpck_require__(939);Object.defineProperty(e,"propagation",{enumerable:true,get:function(){return S.propagation}});const C=__nccwpck_require__(845);Object.defineProperty(e,"trace",{enumerable:true,get:function(){return C.trace}});e["default"]={context:O.context,diag:P.diag,metrics:N.metrics,propagation:S.propagation,trace:C.trace}})();module.exports=r})();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(128));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_src/middleware"] = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map