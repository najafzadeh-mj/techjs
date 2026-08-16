/*!
 * Tech.js v1.0.0-alpha
 * Copyright (c) 2026
 * Released under the MIT License
 */
var Tech = (() => {
  // src/core/tech.config.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    const DEFAULT_CONFIG = Object.freeze({
      debug: false,
      baseUrl: "",
      timeout: 3e4,
      defaultMethod: "GET",
      credentials: "same-origin",
      cache: "no-cache",
      mode: "same-origin",
      redirect: "follow",
      keepalive: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      antiForgery: {
        enabled: true,
        fieldName: "__RequestVerificationToken",
        headerName: "RequestVerificationToken"
      },
      retry: {
        enabled: false,
        count: 0,
        delay: 1e3
      },
      loading: {
        enabled: true,
        delay: 150
      }
    });
    let config = clone(DEFAULT_CONFIG);
    const validators = {
      debug(value) {
        if (typeof value !== "boolean") {
          throw new Error("Config 'debug' must be boolean.");
        }
      },
      timeout(value) {
        if (!Number.isInteger(value) || value < 0) {
          throw new Error("Config 'timeout' must be a positive integer.");
        }
      },
      defaultMethod(value) {
        if (typeof value !== "string") {
          throw new Error("Config 'defaultMethod' must be string.");
        }
      },
      "retry.count"(value) {
        if (!Number.isInteger(value) || value < 0) {
          throw new Error("Config 'retry.count' must be a positive integer.");
        }
      },
      "retry.delay"(value) {
        if (!Number.isInteger(value) || value < 0) {
          throw new Error("Config 'retry.delay' must be a positive integer.");
        }
      },
      "loading.delay"(value) {
        if (!Number.isInteger(value) || value < 0) {
          throw new Error("Config 'loading.delay' must be a positive integer.");
        }
      },
      keepalive(value) {
        if (typeof value !== "boolean") {
          throw new Error(
            "Config 'keepalive' must be boolean."
          );
        }
      },
      "loading.enabled"(value) {
        if (typeof value !== "boolean") {
          throw new Error(
            "Config 'loading.enabled' must be boolean."
          );
        }
      },
      "antiForgery.enabled"(value) {
        if (typeof value !== "boolean") {
          throw new Error(
            "Config 'antiForgery.enabled' must be boolean."
          );
        }
      },
      baseUrl(value) {
        if (typeof value !== "string") {
          throw new Error(
            "Config 'baseUrl' must be string."
          );
        }
      }
    };
    function clone(value) {
      if (value === void 0 || value === null) {
        return value;
      }
      if (typeof structuredClone === "function") {
        return structuredClone(value);
      }
      return JSON.parse(JSON.stringify(value));
    }
    function validate(path, value) {
      const validator = validators[path];
      if (validator) {
        validator(value);
      }
    }
    function validateConfig(object) {
      validate("debug", object.debug);
      validate("timeout", object.timeout);
      validate("defaultMethod", object.defaultMethod);
      validate("retry.count", object.retry.count);
      validate("retry.delay", object.retry.delay);
      validate("loading.delay", object.loading.delay);
      validate("baseUrl", object.baseUrl);
      validate("keepalive", object.keepalive);
      validate("loading.enabled", object.loading.enabled);
      validate("antiForgery.enabled", object.antiForgery.enabled);
    }
    function resolve(path, object) {
      if (!path) {
        return object;
      }
      const keys = path.split(".");
      let current = object;
      for (const key of keys) {
        if (current == null) {
          return void 0;
        }
        current = current[key];
      }
      return current;
    }
    function assign(path, value, object) {
      const keys = path.split(".");
      let current = object;
      while (keys.length > 1) {
        const key = keys.shift();
        if (!(key in current)) {
          throw new Error(`Unknown configuration path '${path}'.`);
        }
        current = current[key];
        if (!isPlainObject(current)) {
          throw new Error(
            "Invalid configuration path '" + path + "'."
          );
        }
      }
      current[keys[0]] = value;
    }
    function merge(target, source) {
      if (!isPlainObject(source)) {
        return;
      }
      for (const key of Object.keys(source)) {
        if (!(key in target)) {
          throw new Error(
            "Unknown configuration option '" + key + "'."
          );
        }
        const sourceValue = source[key];
        if (isPlainObject(sourceValue) && isPlainObject(target[key])) {
          merge(target[key], sourceValue);
          return;
        }
        target[key] = clone(sourceValue);
      }
    }
    function isPlainObject(value) {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    }
    function get(path) {
      const value = resolve(path, config);
      return clone(value);
    }
    function set(path, value) {
      if (typeof path !== "string" || !path.length) {
        throw new Error("Configuration path is required.");
      }
      validate(path, value);
      const copy = clone(config);
      assign(path, value, copy);
      validateConfig(copy);
      config = copy;
    }
    function mergeConfig(options) {
      if (!options || typeof options !== "object") {
        return;
      }
      const copy = clone(config);
      merge(copy, options);
      validateConfig(copy);
      config = copy;
    }
    function reset() {
      config = clone(DEFAULT_CONFIG);
    }
    function defaults() {
      return clone(DEFAULT_CONFIG);
    }
    Tech.Config = Object.freeze({
      /**
       * Gets a configuration value.
       */
      get,
      /**
       * Sets a configuration value.
       */
      set,
      /**
       * Merges configuration values.
       */
      merge: mergeConfig,
      /**
       * Restores defaults.
       */
      reset,
      /**
       * Returns immutable defaults.
       */
      defaults
    });
  })(window);

  // src/core/tech.constants.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    Tech.Constants = Object.freeze({
      //----------------------------------------------------------
      // Events
      //----------------------------------------------------------
      Events: Object.freeze({
        BEFORE: "tech:before",
        SUCCESS: "tech:success",
        ERROR: "tech:error",
        COMPLETE: "tech:complete",
        LOADING_START: "tech:loadingStart",
        LOADING_END: "tech:loadingEnd",
        PARTIAL_LOADED: "tech:partialLoaded",
        MODAL_OPEN: "tech:modalOpen",
        MODAL_CLOSE: "tech:modalClose",
        VALIDATION_ERROR: "tech:validationError"
      }),
      //----------------------------------------------------------
      // Methods
      //----------------------------------------------------------
      Methods: Object.freeze({
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        PATCH: "PATCH",
        DELETE: "DELETE",
        HEAD: "HEAD",
        OPTIONS: "OPTIONS"
      }),
      //----------------------------------------------------------
      // Http Methods
      //----------------------------------------------------------
      HttpMethod: Object.freeze({
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        PATCH: "PATCH",
        DELETE: "DELETE"
      }),
      //----------------------------------------------------------
      // Headers
      //----------------------------------------------------------
      Headers: Object.freeze({
        RequestedWith: "X-Requested-With",
        AntiForgery: "RequestVerificationToken",
        ContentType: "Content-Type",
        Accept: "Accept",
        Authorization: "Authorization"
      }),
      //----------------------------------------------------------
      // Content Types
      //----------------------------------------------------------
      ContentType: Object.freeze({
        Json: "application/json",
        Form: "application/x-www-form-urlencoded",
        Multipart: "multipart/form-data",
        Html: "text/html",
        Text: "text/plain"
      }),
      //----------------------------------------------------------
      // Fetch Response Types
      //----------------------------------------------------------
      ResponseType: Object.freeze({
        Json: "json",
        Text: "text",
        Blob: "blob",
        ArrayBuffer: "arrayBuffer",
        FormData: "formData",
        UNKNOWN: "unknown"
      }),
      //----------------------------------------------------------
      // Html Data Attributes
      //----------------------------------------------------------
      Attributes: Object.freeze({
        ROOT: "data-tech",
        METHOD: "data-tech-method",
        URL: "data-tech-url",
        RESPONSE: "data-tech-response",
        TARGET: "data-tech-target",
        SWAP: "data-tech-swap",
        CONFIRM: "data-tech-confirm",
        LOADING: "data-tech-loading",
        PUSHURL: "data-tech-push-url",
        REPLACEURL: "data-tech-replace-url",
        TRIGGER: "data-tech-trigger",
        INDICATOR: "data-tech-indicator",
        VALIDATE: "data-tech-validate",
        ENCODING: "data-tech-encoding",
        DATA: "data-tech-data",
        DATAFORM: "data-tech-data-form",
        SOURCE: "data-tech-source",
        BEGIN: "data-tech-begin",
        SUCCESS: "data-tech-success",
        ERROR: "data-tech-error",
        COMPLETE: "data-tech-complete",
        NOTIFY: "data-tech-notify",
        EXECUTE_SCRIPTS: "data-tech-execute-scripts",
        ERROR_TARGET: "data-tech-error-target"
      }),
      //----------------------------------------------------------
      // Swap Mode
      //----------------------------------------------------------
      Swap: Object.freeze({
        InnerHtml: "inner",
        OuterHtml: "outer",
        BeforeBegin: "beforebegin",
        AfterBegin: "afterbegin",
        BeforeEnd: "beforeend",
        AfterEnd: "afterend"
      }),
      //----------------------------------------------------------
      // Css Classes
      //----------------------------------------------------------
      Css: Object.freeze({
        Loading: "tech-loading",
        Disabled: "tech-disabled",
        Error: "tech-error",
        Success: "tech-success"
      }),
      //----------------------------------------------------------
      // Status
      //----------------------------------------------------------
      Status: Object.freeze({
        SUCCESS: "success",
        ERROR: "error",
        WARNING: "warning",
        INFO: "info"
      })
    });
  })(window);

  // src/core/tech.utils.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    const Utils = {};
    Utils.Type = Object.freeze({
      isNull(value) {
        return value === null || value === void 0;
      },
      isString(value) {
        return typeof value === "string";
      },
      isNumber(value) {
        return typeof value === "number" && !Number.isNaN(value);
      },
      isBoolean(value) {
        return typeof value === "boolean";
      },
      isFunction(value) {
        return typeof value === "function";
      },
      isArray(value) {
        return Array.isArray(value);
      },
      isObject(value) {
        return value !== null && typeof value === "object" && !Array.isArray(value);
      },
      isElement(value) {
        return value && value.nodeType === 1;
      },
      isForm(value) {
        return value instanceof HTMLFormElement;
      },
      isEmpty(value) {
        if (value === null || value === void 0)
          return true;
        if (typeof value === "string")
          return value.trim().length === 0;
        if (Array.isArray(value))
          return value.length === 0;
        if (this.isObject(value))
          return Object.keys(value).length === 0;
        return false;
      }
    });
    Utils.Object = Object.freeze({
      clone(obj) {
        if (typeof structuredClone === "function") {
          return structuredClone(obj);
        }
        return JSON.parse(JSON.stringify(obj));
      },
      merge(target, source) {
        if (!Utils.Type.isObject(target) || !Utils.Type.isObject(source))
          return target;
        Object.keys(source).forEach((key) => {
          var _a;
          if (Utils.Type.isObject(source[key])) {
            (_a = target[key]) != null ? _a : target[key] = {};
            Utils.Object.merge(
              target[key],
              source[key]
            );
          } else {
            target[key] = source[key];
          }
        });
        return target;
      }
    });
    Utils.Dom = Object.freeze({
      $(selector, root = document) {
        return root.querySelector(selector);
      },
      $$(selector, root = document) {
        return [...root.querySelectorAll(selector)];
      },
      parse(html) {
        return new DOMParser().parseFromString(html, "text/html");
      },
      create(tag) {
        return document.createElement(tag);
      },
      remove(element) {
        if (Utils.Type.isElement(element)) {
          element.remove();
        }
      }
    });
    Utils.Form = Object.freeze({
      serialize(form) {
        return new FormData(form);
      },
      toObject(form) {
        return Object.fromEntries(
          new FormData(form).entries()
        );
      }
    });
    Utils.Url = Object.freeze({
      resolve(url) {
        const base = Tech.Config.get("baseUrl") || window2.location.origin;
        return new URL(url, base).toString();
      },
      queryString(obj = {}) {
        return new URLSearchParams(obj).toString();
      }
    });
    Utils.Header = Object.freeze({
      merge(...headers) {
        return Object.assign(
          {},
          ...headers.filter(Boolean)
        );
      },
      antiForgery(form) {
        const cfg = Tech.Config.get("antiForgery");
        if (!cfg.enabled) {
          return null;
        }
        if (form) {
          const input = form.querySelector(
            `input[name="${cfg.fieldName}"]`
          );
          if (input) {
            return input.value;
          }
        }
        const globalInput = document.querySelector(
          `input[name="${cfg.fieldName}"]`
        );
        return globalInput ? globalInput.value : null;
      }
    });
    Utils.Async = Object.freeze({
      delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      },
      debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(...args), delay);
        };
      },
      throttle(fn, limit = 300) {
        let waiting = false;
        return (...args) => {
          if (waiting)
            return;
          waiting = true;
          fn(...args);
          setTimeout(() => {
            waiting = false;
          }, limit);
        };
      }
    });
    Object.freeze(Utils);
    Tech.Utils = Utils;
  })(window);

  // src/core/tech.events.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    const listeners = /* @__PURE__ */ new Map();
    function validateEventName(eventName) {
      if (typeof eventName !== "string" || eventName.trim().length === 0) {
        throw new Error(
          "Event name must be a non-empty string."
        );
      }
    }
    function validateCallback(callback) {
      if (typeof callback !== "function") {
        throw new Error(
          "Callback must be a function."
        );
      }
    }
    function on(eventName, callback) {
      validateEventName(eventName);
      validateCallback(callback);
      if (!listeners.has(eventName)) {
        listeners.set(eventName, []);
      }
      listeners.get(eventName).push(callback);
    }
    function once(eventName, callback) {
      validateEventName(eventName);
      validateCallback(callback);
      function wrapper(data) {
        off(eventName, wrapper);
        callback(data);
      }
      on(eventName, wrapper);
    }
    function off(eventName, callback) {
      validateEventName(eventName);
      validateCallback(callback);
      if (!listeners.has(eventName)) {
        return false;
      }
      const events = listeners.get(eventName);
      const index = events.indexOf(callback);
      if (index === -1) {
        return false;
      }
      events.splice(index, 1);
      if (events.length === 0) {
        listeners.delete(eventName);
      }
      return true;
    }
    function emit(eventName, data) {
      validateEventName(eventName);
      if (!listeners.has(eventName)) {
        return false;
      }
      const callbacks = [...listeners.get(eventName)];
      for (const callback of callbacks) {
        try {
          callback(data);
        } catch (error) {
          console.error(error);
        }
      }
      return true;
    }
    function clear(eventName) {
      if (eventName === void 0) {
        listeners.clear();
        return;
      }
      validateEventName(eventName);
      listeners.delete(eventName);
    }
    function has(eventName) {
      validateEventName(eventName);
      return listeners.has(eventName);
    }
    function count(eventName) {
      validateEventName(eventName);
      if (!listeners.has(eventName)) {
        return 0;
      }
      return listeners.get(eventName).length;
    }
    function list() {
      return new Map(listeners);
    }
    Tech.Events = Object.freeze({
      on,
      once,
      off,
      emit,
      clear,
      has,
      count,
      list
    });
  })(window);

  // src/core/tech.data.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function parseJson(value) {
      if (!value)
        return {};
      try {
        return JSON.parse(value);
      } catch (e) {
        console.warn("Invalid JSON:", value);
        return {};
      }
    }
    function attributeData(element) {
      if (!element)
        return {};
      const result = {};
      Array.from(element.attributes).forEach(function(attribute) {
        if (!attribute.name.startsWith("data-tech-data-"))
          return;
        const key = toCamelCase(
          attribute.name.substring(prefix.length)
        );
        if (!key)
          return;
        result[key] = attribute.value;
      });
      return result;
    }
    function parseAttributeValue(value) {
      if (value === "true")
        return true;
      if (value === "false")
        return false;
      if (value === "null")
        return null;
      if (value !== "" && !isNaN(value)) {
        return Number(value);
      }
      return value;
    }
    function formToObject(form) {
      if (!form)
        return {};
      return Object.fromEntries(
        new FormData(form).entries()
      );
    }
    function containerToObject(container) {
      if (!container)
        return {};
      const result = {};
      container.querySelectorAll("input,select,textarea").forEach(function(element) {
        if (!element.name)
          return;
        if (element.type === "checkbox") {
          result[element.name] = element.checked;
          return;
        }
        if (element.type === "radio") {
          if (element.checked)
            result[element.name] = element.value;
          return;
        }
        result[element.name] = element.value;
      });
      return result;
    }
    function merge() {
      return Object.assign({}, ...arguments);
    }
    function build(element) {
      const json = parseJson(
        element.getAttribute(
          Tech.Constants.Attributes.DATA
        )
      );
      const attributeData2 = getAttributeData(element);
      let formData = {};
      const parentForm = element.closest("form");
      if (parentForm) {
        formData = formToObject(parentForm);
      }
      const formSelector = element.getAttribute(
        Tech.Constants.Attributes.DATAFORM
      );
      if (formSelector) {
        formData = merge(
          formData,
          formToObject(
            document.querySelector(
              formSelector
            )
          )
        );
      }
      let sourceData = {};
      const sourceSelector = element.getAttribute(
        Tech.Constants.Attributes.SOURCE
      );
      if (sourceSelector) {
        sourceData = containerToObject(
          document.querySelector(
            sourceSelector
          )
        );
      }
      return merge(
        formData,
        sourceData,
        json,
        attributeData2
      );
    }
    function getAttributeData(element) {
      if (!element)
        return {};
      const prefix2 = "data-tech-data-";
      const result = {};
      Array.from(element.attributes).forEach(function(attribute) {
        if (!attribute.name.startsWith(prefix2))
          return;
        const key = attribute.name.substring(
          prefix2.length
        );
        if (!key)
          return;
        result[key] = parseAttributeValue(
          attribute.value
        );
      });
      return result;
    }
    function toCamelCase(value) {
      return value.replace(
        /-([a-z])/g,
        function(_, char) {
          return char.toUpperCase();
        }
      );
    }
    function queryString(element) {
      const data = build(element);
      return new URLSearchParams(data).toString();
    }
    function buildUrl(element, url) {
      const query = queryString(element);
      if (!query)
        return url;
      return url + (url.includes("?") ? "&" : "?") + query;
    }
    function buildBody(element, method) {
      method = (method || "GET").toUpperCase();
      if (method === "GET" || method === "HEAD") {
        return null;
      }
      const encoding = element.getAttribute(
        Tech.Constants.Attributes.Encoding
      );
      const form = element.closest("form");
      if (form && encoding !== "json") {
        return new FormData(form);
      }
      const data = build(element);
      if (encoding === "json") {
        return data;
      }
      return new URLSearchParams(data);
    }
    Tech.Data = Object.freeze({
      build,
      buildUrl,
      queryString,
      buildBody
    });
  })(window);

  // src/network/tech.request.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function ensure(value, name) {
      if (value === void 0 || value === null) {
        throw new Error(name + " is required.");
      }
    }
    function normalizeOptions(options) {
      var _a;
      ensure(options, "options");
      if (typeof options === "string") {
        options = {
          url: options
        };
      }
      options.url = String(options.url).trim();
      if (!options.url.length) {
        throw new Error(
          "url is required."
        );
      }
      ensure(options.url, "url");
      if (options.headers !== void 0 && (options.headers === null || typeof options.headers !== "object")) {
        throw new Error(
          "headers must be an object."
        );
      }
      const requestModel = {
        url: options.url,
        method: (options.method || "GET").toUpperCase(),
        headers: options.headers || {},
        body: (_a = options.body) != null ? _a : null,
        credentials: options.credentials,
        cache: options.cache,
        mode: options.mode,
        redirect: options.redirect,
        keepalive: options.keepalive,
        timeout: options.timeout
      };
      const methods = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS"
      ];
      if (!methods.includes(requestModel.method)) {
        throw new Error(
          "Invalid HTTP method '" + requestModel.method + "'."
        );
      }
      if (requestModel.method === "GET" || requestModel.method === "HEAD") {
        requestModel.body = null;
      }
      return requestModel;
    }
    function mergeConfig(request, config) {
      var _a, _b, _c, _d, _e, _f;
      request.method = request.method || config.defaultMethod;
      request.credentials = (_a = request.credentials) != null ? _a : config.credentials;
      request.cache = (_b = request.cache) != null ? _b : config.cache;
      request.mode = (_c = request.mode) != null ? _c : config.mode;
      request.redirect = (_d = request.redirect) != null ? _d : config.redirect;
      request.keepalive = (_e = request.keepalive) != null ? _e : config.keepalive;
      request.timeout = (_f = request.timeout) != null ? _f : config.timeout;
      request.headers = Object.assign(
        {},
        config.headers,
        request.headers
      );
      const token = Tech.Utils.Header.antiForgery(request.form);
      if (token && config.antiForgery.enabled) {
        request.headers[config.antiForgery.headerName] = token;
      }
      return request;
    }
    function resolveUrl(request, config) {
      if (!config.baseUrl) {
        return request;
      }
      if (/^(https?:)?\/\//i.test(request.url)) {
        return request;
      }
      request.url = config.baseUrl.replace(/\/$/, "") + "/" + request.url.replace(/^\//, "");
      return request;
    }
    function createFetchOptions(request) {
      var _a, _b;
      const options = {
        method: request.method,
        headers: request.headers,
        credentials: request.credentials,
        cache: request.cache,
        mode: request.mode,
        redirect: request.redirect,
        keepalive: request.keepalive
      };
      if (request.body !== null && request.body !== void 0 && request.method !== "GET" && request.method !== "HEAD") {
        if (request.body instanceof FormData) {
          options.body = request.body;
        } else if (request.body instanceof URLSearchParams) {
          options.body = request.body;
        } else if (typeof request.body === "object") {
          (_b = (_a = options.headers)["Content-Type"]) != null ? _b : _a["Content-Type"] = "application/json";
          options.body = JSON.stringify(request.body);
        } else {
          options.body = request.body;
        }
      }
      return options;
    }
    function executeRequest(request) {
      const options = createFetchOptions(request);
      return fetch(request.url, options);
    }
    async function send(options) {
      let requestModel = normalizeOptions(options);
      const config = Tech.Config.get();
      requestModel = mergeConfig(requestModel, config);
      requestModel = resolveUrl(requestModel, config);
      return executeRequest(requestModel);
    }
    async function execute(options) {
      const response = await send(options);
      return Tech.Response.parse(response);
    }
    Tech.Request = Object.freeze({
      send,
      execute
    });
  })(window);

  // src/engine/tech.scripts.js
  (function(window2, document2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function shouldExecute(element) {
      return element.getAttribute(
        Tech.Constants.Attributes.EXECUTE_SCRIPTS
      ) === "true";
    }
    function cloneAttributes(from, to) {
      Array.from(from.attributes).forEach(function(attr) {
        to.setAttribute(
          attr.name,
          attr.value
        );
      });
    }
    function executeScript(oldScript) {
      const script = document2.createElement("script");
      cloneAttributes(oldScript, script);
      script.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(
        script,
        oldScript
      );
    }
    function executeScripts(container) {
      if (!container) {
        return;
      }
      const scripts = container.querySelectorAll("script");
      scripts.forEach(executeScript);
    }
    function run(target, sourceElement) {
      if (!shouldExecute(sourceElement)) {
        return;
      }
      executeScripts(target);
    }
    Tech.Scripts = Object.freeze({
      run
    });
  })(window, document);

  // src/network/tech.response.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function ensure(response) {
      if (!(response instanceof Response)) {
        throw new Error(
          "A valid Response object is required."
        );
      }
    }
    function getContentType(response) {
      return (response.headers.get("Content-Type") || "").toLowerCase();
    }
    function detectType(contentType) {
      if (contentType.includes("json"))
        return "json";
      if (contentType.includes("text/html"))
        return "html";
      if (contentType.includes("text/"))
        return "text";
      if (contentType.includes("xml"))
        return "xml";
      if (contentType.startsWith("image/") || contentType.startsWith("video/") || contentType.startsWith("audio/"))
        return "blob";
      return "text";
    }
    async function parseBody(response, contentType) {
      if (response.status === 204 || response.status === 205) {
        return null;
      }
      if (contentType.includes("json")) {
        return await response.json();
      }
      if (contentType.includes("text/") || contentType.includes("xml")) {
        return await response.text();
      }
      return await response.blob();
    }
    function extractHeaders(response) {
      const headers = {};
      response.headers.forEach(function(value, key) {
        headers[key] = value;
      });
      return headers;
    }
    async function parse(response) {
      ensure(response);
      const contentType = getContentType(response);
      return {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        redirected: response.redirected,
        contentType,
        type: detectType(contentType),
        headers: extractHeaders(response),
        data: await parseBody(
          response,
          contentType
        ),
        raw: response
      };
    }
    function findTarget(element) {
      const selector = element.getAttribute(
        Tech.Constants.Attributes.TARGET
      );
      if (!selector)
        return null;
      return document.querySelector(selector);
    }
    function swap(target, html, mode) {
      switch (mode) {
        case Tech.Constants.Swap.OuterHtml:
        case "outer":
          target.outerHTML = html;
          break;
        case Tech.Constants.Swap.Before:
        case Tech.Constants.Swap.BeforeBegin:
        case "before":
        case "beforebegin":
          target.insertAdjacentHTML(
            "beforebegin",
            html
          );
          break;
        case Tech.Constants.Swap.After:
        case Tech.Constants.Swap.AfterEnd:
        case "after":
        case "afterend":
          target.insertAdjacentHTML(
            "afterend",
            html
          );
          break;
        default:
          target.innerHTML = html;
          break;
      }
    }
    async function handle(response, element) {
      const result = await parse(response);
      if (!result.ok) {
        throw result;
      }
      const target = findTarget(element);
      if (!target) {
        return result;
      }
      if (result.type !== "html" && result.type !== "text") {
        return result;
      }
      const mode = element.getAttribute(
        Tech.Constants.Attributes.SWAP
      ) || Tech.Constants.Swap.InnerHtml;
      swap(target, result.data, mode);
      Tech.Scripts.run(target, element);
      Tech.Dispatcher.dispatch(
        target,
        Tech.Constants.Events.PARTIAL_LOADED,
        {
          target,
          html: result.data,
          mode
        }
      );
      return result;
    }
    Tech.Response = Object.freeze({
      parse,
      handle
    });
  })(window);

  // src/engine/tech.dispatcher.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    const CALLBACK_ATTRIBUTES = Object.freeze({
      success: Tech.Constants.Attributes.SUCCESS,
      error: Tech.Constants.Attributes.ERROR,
      complete: Tech.Constants.Attributes.COMPLETE
    });
    function invokeCallback(element, eventName, detail) {
      const attr = CALLBACK_ATTRIBUTES[eventName];
      if (!attr) {
        return;
      }
      const fnName = element.getAttribute(attr);
      if (!fnName) {
        return;
      }
      const fn = window2[fnName];
      if (typeof fn !== "function") {
        console.warn(
          "Tech.js callback '" + fnName + "' not found."
        );
        return;
      }
      try {
        fn(detail, element);
      } catch (ex) {
        console.error(ex);
      }
    }
    function dispatch(element, eventName, detail) {
      if (!eventName) {
        throw new Error(
          "Dispatcher event is required."
        );
      }
      element.dispatchEvent(
        new CustomEvent(eventName, {
          bubbles: true,
          cancelable: true,
          detail
        })
      );
    }
    Tech.Dispatcher = Object.freeze({
      dispatch
    });
  })(window);

  // src/engine/tech.registry.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    const handlers = /* @__PURE__ */ new Map();
    function validateSelector(selector) {
      if (typeof selector !== "string" || selector.trim().length === 0) {
        throw new Error(
          "Selector must be a non-empty string."
        );
      }
    }
    function validateName(name) {
      if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error(
          "Handler name must be a non-empty string."
        );
      }
    }
    function validateHandler(handler) {
      if (handler === null || handler === void 0) {
        throw new Error(
          "Handler is required."
        );
      }
      if (typeof handler.init !== "function") {
        throw new Error(
          "Handler must expose an init(element) function."
        );
      }
    }
    function register(name, selector, handler) {
      validateName(name);
      validateSelector(selector);
      validateHandler(handler);
      if (handlers.has(name)) {
        throw new Error(
          "Handler '" + name + "' already registered."
        );
      }
      handlers.set(name, {
        name,
        selector,
        handler,
        enabled: true
      });
    }
    function enable(name) {
      const item = handlers.get(name);
      if (item) {
        item.enabled = true;
      }
    }
    function disable(name) {
      const item = handlers.get(name);
      if (item) {
        item.enabled = false;
      }
    }
    function validateName(name) {
      if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error(
          "Handler name must be a non-empty string."
        );
      }
    }
    function unregister(name) {
      validateName(name);
      return handlers.delete(name);
    }
    function get(name) {
      var _a;
      validateName(name);
      return (_a = handlers.get(name)) != null ? _a : null;
    }
    function getAll() {
      return new Map(handlers);
    }
    function has(name) {
      validateName(name);
      return handlers.has(name);
    }
    function count() {
      return handlers.size;
    }
    function clear() {
      handlers.clear();
    }
    Tech.Registry = Object.freeze({
      register,
      unregister,
      get,
      getAll,
      has,
      count,
      clear,
      enable,
      disable
    });
  })(window);

  // src/engine/tech.scanner.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function normalizeRoot(root) {
      if (root === void 0 || root === null) {
        return document;
      }
      if (!(root instanceof Element) && root !== document) {
        throw new Error(
          "Root must be Document or Element."
        );
      }
      return root;
    }
    function scanSelector(root, selector, handler) {
      const items = [];
      const elements = root.querySelectorAll(selector);
      elements.forEach(function(element) {
        items.push({
          selector,
          element,
          handler
        });
      });
      return items;
    }
    function scan(root) {
      root = normalizeRoot(root);
      const registry = Tech.Registry.getAll();
      const result = [];
      registry.forEach(function(item) {
        result.push(
          ...scanSelector(
            root,
            item.selector,
            item.handler
          )
        );
      });
      return result;
    }
    function query(selector, root) {
      root = normalizeRoot(root);
      return [
        ...root.querySelectorAll(selector)
      ];
    }
    function matches(element, selector) {
      if (!(element instanceof Element)) {
        return false;
      }
      return element.matches(selector);
    }
    Tech.Scanner = Object.freeze({
      scan,
      query,
      matches
    });
  })(window);

  // src/engine/tech.confirm.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function hasBootstrap() {
      console.log("bootstrap =", window2.bootstrap);
      return !!window2.bootstrap;
    }
    function fallbackConfirm(message) {
      return Promise.resolve(
        window2.confirm(message)
      );
    }
    function createModal() {
      let modal = document.getElementById("tech-confirm-modal");
      if (modal) {
        return modal;
      }
      const html = `
<div class="modal fade" id="tech-confirm-modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">\u062A\u0623\u06CC\u06CC\u062F \u0639\u0645\u0644\u06CC\u0627\u062A</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <p class="mb-0" id="tech-confirm-message"></p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          \u0627\u0646\u0635\u0631\u0627\u0641
        </button>

        <button type="button" class="btn btn-danger" id="tech-confirm-ok">
          \u062A\u0623\u06CC\u06CC\u062F
        </button>
      </div>

    </div>
  </div>
</div>`;
      document.body.insertAdjacentHTML(
        "beforeend",
        html
      );
      return document.getElementById(
        "tech-confirm-modal"
      );
    }
    function bootstrapConfirm(message) {
      return new Promise(function(resolve) {
        const modalElement = createModal();
        modalElement.querySelector(
          "#tech-confirm-message"
        ).textContent = message;
        const okButton = modalElement.querySelector(
          "#tech-confirm-ok"
        );
        const modal = bootstrap.Modal.getOrCreateInstance(
          modalElement
        );
        let resolved = false;
        function cleanup() {
          okButton.removeEventListener(
            "click",
            onOk
          );
          modalElement.removeEventListener(
            "hidden.bs.modal",
            onHidden
          );
        }
        function onOk() {
          resolved = true;
          cleanup();
          modal.hide();
          resolve(true);
        }
        function onHidden() {
          if (!resolved) {
            cleanup();
            resolve(false);
          }
        }
        okButton.addEventListener(
          "click",
          onOk
        );
        modalElement.addEventListener(
          "hidden.bs.modal",
          onHidden
        );
        modal.show();
      });
    }
    async function show(message) {
      if (!message) {
        return true;
      }
      if (hasBootstrap()) {
        return await bootstrapConfirm(message);
      }
      return await fallbackConfirm(message);
    }
    Tech.Confirm = Object.freeze({
      show
    });
  })(window);

  // src/engine/tech.history.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function shouldPush(element) {
      return element.getAttribute(
        Tech.Constants.Attributes.PUSHURL
      ) === "true";
    }
    function shouldReplace(element) {
      return element.getAttribute(
        Tech.Constants.Attributes.REPLACEURL
      ) === "true";
    }
    function resolveUrl(element, response) {
      return response.url || window2.location.href;
    }
    function update(element, response) {
      const url = resolveUrl(element, response);
      if (shouldReplace(element)) {
        history.replaceState(
          { url },
          "",
          url
        );
        return;
      }
      if (shouldPush(element)) {
        history.pushState(
          { url },
          "",
          url
        );
      }
    }
    Tech.History = Object.freeze({
      update
    });
  })(window);

  // src/engine/tech.validation.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function hasJQuery() {
      return !!window2.jQuery;
    }
    function hasValidator() {
      return hasJQuery() && !!jQuery.fn.validate;
    }
    function reset(form) {
      if (!hasValidator(form)) {
        return;
      }
      window2.jQuery(form).validate().resetForm();
    }
    function hasUnobtrusive() {
      return hasJQuery() && !!jQuery.validator && !!jQuery.validator.unobtrusive;
    }
    function parse(form) {
      if (!hasUnobtrusive()) {
        return;
      }
      jQuery.validator.unobtrusive.parse(form);
    }
    function validate(form) {
      if (!form) {
        return true;
      }
      if (!hasValidator()) {
        return true;
      }
      parse(form);
      return jQuery(form).valid();
    }
    Tech.Validation = Object.freeze({
      validate
    });
  })(window);

  // src/engine/tech.notification.policy.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function getMode(element) {
      if (!element) {
        return "none";
      }
      return (element.getAttribute(
        Tech.Constants.Attributes.NOTIFY
      ) || "none").toLowerCase();
    }
    function allow(element, type) {
      const mode = getMode(element);
      switch (mode) {
        case "true":
        case "all":
          return true;
        case "success":
          return type === "success";
        case "error":
          return type === "error";
        default:
          return false;
      }
    }
    Tech.NotificationPolicy = Object.freeze({
      allow
    });
  })(window);

  // src/engine/tech.notification.message.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function fromResponse(response) {
      if (!response) {
        return null;
      }
      const data = response.data;
      if (!data) {
        return null;
      }
      if (typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }
      if (typeof data.Message === "string" && data.Message.trim()) {
        return data.Message;
      }
      return null;
    }
    function fromError(error) {
      if (!error) {
        return null;
      }
      const data = error.data;
      if (!data) {
        return null;
      }
      if (typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }
      if (typeof data.Message === "string" && data.Message.trim()) {
        return data.Message;
      }
      return null;
    }
    Tech.NotificationMessage = Object.freeze({
      fromResponse,
      fromError
    });
  })(window);

  // src/engine/tech.notify.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function hasBootstrap() {
      return !!window2.bootstrap;
    }
    function ensureContainer() {
      let container = document.getElementById("tech-toast-container");
      if (container) {
        return container;
      }
      container = document.createElement("div");
      container.id = "tech-toast-container";
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      container.style.zIndex = "1080";
      document.body.appendChild(container);
      return container;
    }
    function createToast(message, title, type) {
      const bgClass = {
        success: "text-bg-success",
        error: "text-bg-danger",
        warning: "text-bg-warning",
        info: "text-bg-primary"
      }[type] || "text-bg-primary";
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
<div class="toast ${bgClass}"
     role="alert"
     aria-live="assertive"
     aria-atomic="true">

    <div class="toast-header">

        <strong class="me-auto">${title}</strong>

        <button type="button"
                class="btn-close"
                data-bs-dismiss="toast"></button>

    </div>

    <div class="toast-body">

        ${message}

    </div>

</div>`;
      return wrapper.firstElementChild;
    }
    function showBootstrapToast(message, title, type) {
      const container = ensureContainer();
      const toastElement = createToast(message, title, type);
      container.appendChild(toastElement);
      const toast = bootstrap.Toast.getOrCreateInstance(
        toastElement,
        {
          delay: 4e3,
          autohide: true
        }
      );
      toastElement.addEventListener(
        "hidden.bs.toast",
        function() {
          toastElement.remove();
        }
      );
      toast.show();
    }
    function showFallback(message, title) {
      window2.alert(title + ": " + message);
    }
    function notify(message, title, type) {
      if (!message) {
        return;
      }
      if (hasBootstrap()) {
        showBootstrapToast(
          message,
          title,
          type
        );
        return;
      }
      showFallback(message, title);
    }
    function success(message, title = "Success") {
      notify(message, title, "success");
    }
    function error(message, title = "Error") {
      notify(message, title, "error");
    }
    function warning(message, title = "Warning") {
      notify(message, title, "warning");
    }
    function info(message, title = "Info") {
      notify(message, title, "info");
    }
    Tech.Notify = Object.freeze({
      success,
      error,
      warning,
      info
    });
  })(window);

  // src/engine/tech.callbacks.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function getFunction(name) {
      if (!name) {
        return null;
      }
      const fn = window2[name];
      return typeof fn === "function" ? fn : null;
    }
    function invoke(name, context) {
      const fn = getFunction(name);
      if (!fn) {
        return;
      }
      try {
        return fn(context);
      } catch (ex) {
        console.error(
          "Tech callback error:",
          name,
          ex
        );
      }
    }
    function read(element, attribute) {
      return element.getAttribute(attribute);
    }
    function begin(element, context) {
      return invoke(
        read(
          element,
          Tech.Constants.Attributes.BEGIN
        ),
        context
      );
    }
    function success(element, context) {
      return invoke(
        read(
          element,
          Tech.Constants.Attributes.SUCCESS
        ),
        context
      );
    }
    function error(element, context) {
      return invoke(
        read(
          element,
          Tech.Constants.Attributes.ERROR
        ),
        context
      );
    }
    function complete(element, context) {
      return invoke(
        read(
          element,
          Tech.Constants.Attributes.COMPLETE
        ),
        context
      );
    }
    Tech.Callbacks = Object.freeze({
      begin,
      success,
      error,
      complete
    });
  })(window);

  // src/engine/tech.error.target.js
  (function(window2, document2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function findTarget(element) {
      const selector = element.getAttribute(
        Tech.Constants.Attributes.ERROR_TARGET
      );
      if (!selector) {
        return null;
      }
      return document2.querySelector(selector);
    }
    function extractMessage(error) {
      if (!error) {
        return "An unexpected error occurred.";
      }
      if (error.data && typeof error.data.message === "string") {
        return error.data.message;
      }
      if (error.data && typeof error.data.Message === "string") {
        return error.data.Message;
      }
      if (typeof error.data === "string") {
        return error.data;
      }
      return "An unexpected error occurred.";
    }
    function show(element, error) {
      const target = findTarget(element);
      if (!target) {
        return false;
      }
      target.innerHTML = extractMessage(error);
      target.classList.remove("d-none");
      return true;
    }
    function clear(element) {
      const target = findTarget(element);
      if (!target) {
        return;
      }
      target.innerHTML = "";
      target.classList.add("d-none");
    }
    Tech.ErrorTarget = Object.freeze({
      show,
      clear
    });
  })(window, document);

  // src/engine/tech.pipeline.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function validate(options) {
      if (!options) {
        throw new Error("Pipeline options are required.");
      }
      if (!options.element) {
        throw new Error("Pipeline element is required.");
      }
      if (!options.url) {
        throw new Error("Pipeline url is required.");
      }
    }
    function dispatch(element, eventName, data) {
      Tech.Dispatcher.dispatch(
        element,
        eventName,
        data
      );
    }
    function showLoading(element) {
      dispatch(
        element,
        Tech.Constants.Events.LOADING_START,
        null
      );
    }
    function hideLoading(element) {
      dispatch(
        element,
        Tech.Constants.Events.LOADING_END,
        null
      );
    }
    function before(element, options) {
      const context = {
        element,
        options
      };
      dispatch(
        element,
        Tech.Constants.Events.BEFORE,
        context
      );
      return Tech.Callbacks.begin(
        element,
        context
      );
    }
    function success(element, result) {
      const context = {
        element,
        response: result,
        data: result == null ? void 0 : result.data
      };
      dispatch(
        element,
        Tech.Constants.Events.SUCCESS,
        context
      );
      Tech.Callbacks.success(
        element,
        context
      );
    }
    function error(element, ex) {
      const context = {
        element,
        error: ex
      };
      dispatch(
        element,
        Tech.Constants.Events.ERROR,
        context
      );
      Tech.Callbacks.error(
        element,
        context
      );
    }
    function complete(element, result, error2) {
      var _a;
      const context = {
        element,
        response: result != null ? result : null,
        data: (_a = result == null ? void 0 : result.data) != null ? _a : null,
        error: error2 != null ? error2 : null
      };
      dispatch(
        element,
        Tech.Constants.Events.COMPLETE,
        context
      );
      Tech.Callbacks.complete(
        element,
        context
      );
    }
    function readConfirm(element) {
      return element.getAttribute(
        Tech.Constants.Attributes.CONFIRM
      );
    }
    async function checkConfirm(element) {
      const text = readConfirm(element);
      return await Tech.Confirm.show(text);
    }
    function buildRequest(options) {
      return {
        url: options.url,
        method: options.method,
        body: options.body,
        headers: options.headers,
        timeout: options.timeout,
        cache: options.cache,
        credentials: options.credentials,
        mode: options.mode,
        redirect: options.redirect,
        keepalive: options.keepalive
      };
    }
    async function executeRequest(options) {
      return await Tech.Request.send(
        buildRequest(options)
      );
    }
    async function executeResponse(response, element) {
      return await Tech.Response.handle(
        response,
        element
      );
    }
    async function execute(options) {
      validate(options);
      const element = options.element;
      Tech.ErrorTarget.clear(element);
      if (!await checkConfirm(element)) {
        return null;
      }
      const beginResult = before(element, options);
      if (beginResult === false) {
        return null;
      }
      showLoading(element);
      let result = null;
      let caughtError = null;
      try {
        const response = await executeRequest(options);
        result = await executeResponse(
          response,
          element
        );
        Tech.History.update(
          element,
          response
        );
        success(
          element,
          result
        );
        return result;
      } catch (ex) {
        caughtError = ex;
        Tech.ErrorTarget.show(
          element,
          ex
        );
        error(
          element,
          ex
        );
        throw ex;
      } finally {
        hideLoading(element);
        complete(
          element,
          result,
          caughtError
        );
      }
    }
    Tech.Pipeline = Object.freeze({
      execute
    });
  })(window);

  // src/engine/tech.loading.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    function findIndicator(element) {
      const selector = element.getAttribute(
        Tech.Constants.Attributes.LOADING
      );
      if (!selector) {
        return null;
      }
      return element.querySelector(selector);
    }
    function disableElement(element) {
      element.classList.add(
        Tech.Constants.Css.Loading
      );
      const controls = element.querySelectorAll(
        "button, input, select, textarea"
      );
      controls.forEach(function(control) {
        control.disabled = true;
      });
    }
    function enableElement(element) {
      element.classList.remove(
        Tech.Constants.Css.Loading
      );
      const controls = element.querySelectorAll(
        "button, input, select, textarea"
      );
      controls.forEach(function(control) {
        control.disabled = false;
      });
    }
    function showIndicator(indicator) {
      if (!indicator) {
        return;
      }
      indicator.classList.remove("d-none");
    }
    function hideIndicator(indicator) {
      if (!indicator) {
        return;
      }
      indicator.classList.add("d-none");
    }
    function onLoadingStart(event) {
      const element = event.target;
      const indicator = findIndicator(element);
      disableElement(element);
      showIndicator(indicator);
    }
    function onLoadingEnd(event) {
      const element = event.target;
      const indicator = findIndicator(element);
      enableElement(element);
      hideIndicator(indicator);
    }
    document.addEventListener(
      Tech.Constants.Events.LOADING_START,
      onLoadingStart
    );
    document.addEventListener(
      Tech.Constants.Events.LOADING_END,
      onLoadingEnd
    );
  })(window);

  // src/engine/tech.engine.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    let started = false;
    function initializeItem(item) {
      if (!item.enabled) {
        return;
      }
      if (!item.handler) {
        return;
      }
      const elements = Tech.Scanner.query(item.selector);
      elements.forEach(function(element) {
        item.handler.init(element);
      });
    }
    function start() {
      if (started) {
        return;
      }
      const registry = Tech.Registry.getAll();
      registry.forEach(function(item) {
        initializeItem(item);
      });
      started = true;
    }
    function refresh(name) {
      const registry = Tech.Registry.getAll();
      if (!name) {
        registry.forEach(function(item2) {
          initializeItem(item2);
        });
        return;
      }
      const item = Tech.Registry.get(name);
      if (item) {
        initializeItem(item);
      }
    }
    function enable(name) {
      const item = Tech.Registry.get(name);
      if (!item) {
        return;
      }
      Tech.Registry.enable(name);
    }
    function disable(name) {
      const item = Tech.Registry.get(name);
      if (!item) {
        return;
      }
      Tech.Registry.disable(name);
    }
    function stop() {
      started = false;
    }
    function isStarted() {
      return started;
    }
    Tech.Engine = Object.freeze({
      start,
      stop,
      refresh,
      enable,
      disable,
      isStarted
    });
  })(window);

  // src/handlers/form.handler.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    Tech.Handlers = Tech.Handlers || {};
    function isInitialized(form) {
      return form.__techInitialized === true;
    }
    function markInitialized(form) {
      form.__techInitialized = true;
    }
    function getMethod(form) {
      return (form.getAttribute(
        Tech.Constants.Attributes.METHOD
      ) || form.getAttribute("method") || Tech.Constants.Methods.GET).toUpperCase();
    }
    function getUrl(form) {
      return form.getAttribute(
        Tech.Constants.Attributes.URL
      ) || form.getAttribute("action") || window2.location.href;
    }
    function getBody(form) {
      return Tech.Utils.Form.serialize(form);
    }
    function buildOptions(form) {
      return {
        element: form,
        form,
        url: getUrl(form),
        method: getMethod(form),
        body: getBody(form)
      };
    }
    async function submit(e) {
      e.preventDefault();
      const form = e.currentTarget;
      if (!Tech.Validation.validate(form)) {
        Tech.Dispatcher.dispatch(
          form,
          Tech.Constants.Events.VALIDATION_ERROR,
          null
        );
        return;
      }
      await Tech.Pipeline.execute(
        buildOptions(form)
      );
    }
    function init(form) {
      if (!Tech.Utils.Type.isForm(form)) {
        return;
      }
      if (isInitialized(form)) {
        return;
      }
      markInitialized(form);
      form.addEventListener(
        "submit",
        submit
      );
    }
    function destroy(form) {
      if (!Tech.Utils.Type.isForm(form)) {
        return;
      }
      form.removeEventListener(
        "submit",
        submit
      );
      delete form.__techInitialized;
    }
    Tech.Handlers.Form = Object.freeze({
      name: "form",
      selector: `form[${Tech.Constants.Attributes.ROOT}]`,
      init,
      destroy,
      submit
    });
  })(window);

  // src/handlers/link.handler.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    Tech.Handlers = Tech.Handlers || {};
    function isInitialized(link) {
      return link.__techInitialized === true;
    }
    function markInitialized(link) {
      link.__techInitialized = true;
    }
    function getMethod(link) {
      return (link.getAttribute(Tech.Constants.Attributes.METHOD) || Tech.Constants.Methods.GET).toUpperCase();
    }
    function getUrl(link) {
      return link.getAttribute(Tech.Constants.Attributes.URL) || link.href;
    }
    function buildOptions(link) {
      return {
        element: link,
        url: getUrl(link),
        method: getMethod(link),
        body: null
      };
    }
    async function click(e) {
      e.preventDefault();
      const link = e.currentTarget;
      await Tech.Pipeline.execute(
        buildOptions(link)
      );
    }
    function init(link) {
      if (!Tech.Utils.Type.isElement(link)) {
        return;
      }
      if (isInitialized(link)) {
        return;
      }
      markInitialized(link);
      link.addEventListener(
        "click",
        click
      );
    }
    function destroy(link) {
      if (!Tech.Utils.Type.isElement(link)) {
        return;
      }
      link.removeEventListener(
        "click",
        click
      );
      delete link.__techInitialized;
    }
    Tech.Handlers.Link = Object.freeze({
      name: "link",
      selector: `a[${Tech.Constants.Attributes.ROOT}]`,
      init,
      destroy,
      click
    });
  })(window);

  // src/handlers/button.handler.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    Tech.Handlers = Tech.Handlers || {};
    async function click(e) {
      e.preventDefault();
      const button = e.currentTarget;
      let url = button.getAttribute(
        Tech.Constants.Attributes.URL
      );
      const method = (button.getAttribute(
        Tech.Constants.Attributes.METHOD
      ) || "GET").toUpperCase();
      let body = null;
      if (method === "GET") {
        url = Tech.Data.buildUrl(button, url);
      } else {
        body = Tech.Data.buildBody(button, method);
      }
      const options = {
        element: button,
        url,
        method,
        target: button.getAttribute(
          Tech.Constants.Attributes.TARGET
        ),
        body
      };
      await Tech.Pipeline.execute(options);
    }
    function init(element) {
      if (element.__techInitialized)
        return;
      element.addEventListener(
        "click",
        click
      );
      element.__techInitialized = true;
    }
    Tech.Handlers.Button = Object.freeze({
      name: "button",
      selector: "button[data-tech]",
      enabled: true,
      init
    });
  })(window);

  // src/handlers/trigger.handler.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    Tech.Handlers = Tech.Handlers || {};
    async function execute(element) {
      let target = element.getAttribute(
        Tech.Constants.Attributes.TARGET
      );
      let url = element.getAttribute(
        Tech.Constants.Attributes.URL
      );
      const method = (element.getAttribute(
        Tech.Constants.Attributes.METHOD
      ) || "GET").toUpperCase();
      let body = null;
      if (method === "GET") {
        url = Tech.Data.buildUrl(element, url);
      } else {
        body = Tech.Data.buildBody(element, method);
      }
      const options = {
        element,
        url,
        method,
        target,
        body
      };
      await Tech.Pipeline.execute(options);
    }
    function onTrigger(e) {
      e.preventDefault();
      execute(e.currentTarget);
    }
    function init(element) {
      if (element.__techInitialized)
        return;
      const trigger = element.getAttribute(
        Tech.Constants.Attributes.TRIGGER
      ) || "click";
      element.addEventListener(
        trigger,
        onTrigger
      );
      element.__techInitialized = true;
    }
    Tech.Handlers.Trigger = Object.freeze({
      name: "trigger",
      selector: "[data-tech-trigger]",
      enabled: true,
      init
    });
  })(window);

  // src/tech.bootstrap.js
  (function(window2) {
    "use strict";
    window2.Tech = window2.Tech || {};
    const Tech = window2.Tech;
    let bootstrapped = false;
    function registerHandlers() {
      registerHandler(Tech.Handlers.Form);
      registerHandler(Tech.Handlers.Link);
      registerHandler(Tech.Handlers.Button);
      registerHandler(Tech.Handlers.Trigger);
    }
    function registerHandler(handler) {
      if (!handler) {
        return;
      }
      Tech.Registry.register(
        handler.name,
        handler.selector,
        handler
      );
    }
    function start() {
      if (bootstrapped) {
        return;
      }
      registerHandlers();
      Tech.Engine.start();
      bootstrapped = true;
    }
    document.addEventListener(
      Tech.Constants.Events.SUCCESS,
      function(e) {
        const element = e.target;
        if (!Tech.NotificationPolicy.allow(element, "success")) {
          return;
        }
        const response = e.detail;
        const message = Tech.NotificationMessage.fromResponse(response) || "Operation completed successfully.";
        Tech.Notify.success(message);
      }
    );
    document.addEventListener(
      Tech.Constants.Events.ERROR,
      function(e) {
        const element = e.target;
        if (element.hasAttribute(
          Tech.Constants.Attributes.ERROR_TARGET
        )) {
          return;
        }
        if (!Tech.NotificationPolicy.allow(element, "error")) {
          return;
        }
        const error = e.detail;
        let message = Tech.NotificationMessage.fromError(error) || "An unexpected error occurred.";
        if (!message && (error == null ? void 0 : error.status)) {
          message = "Request failed (" + error.status + ").";
        }
        Tech.Notify.error(message);
      }
    );
    window2.addEventListener(
      "popstate",
      function() {
        window2.location.reload();
      }
    );
    document.addEventListener(
      Tech.Constants.Events.PARTIAL_LOADED,
      function(e) {
        Tech.Engine.refresh();
        const target = e.detail.target;
        target.querySelectorAll("form").forEach(function(form) {
          Tech.Validation.validate(form);
        });
      }
    );
    function restart() {
      Tech.Engine.stop();
      Tech.Registry.clear();
      bootstrapped = false;
      start();
    }
    function isStarted() {
      return bootstrapped;
    }
    document.addEventListener(
      "DOMContentLoaded",
      function() {
        start();
      }
    );
    Tech.Bootstrap = Object.freeze({
      start,
      restart,
      isStarted
    });
  })(window);
})();
/*!
* ----------------------------------------------------------------------------
* Tech.js
* A lightweight Attribute-Based Fetch Library
* ----------------------------------------------------------------------------
* Copyright (c) 2026
* Licensed under the MIT License.
* ----------------------------------------------------------------------------
*/
/*!
* Tech.js
* tech.constants.js
* Version : 1.0.0
*/
/*!
* Tech.js
* tech.utils.js
* Version : 1.0.0
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.events.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Internal Publish / Subscribe Event Bus
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.data.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
*/
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.scripts.js
 * ----------------------------------------------------------------------------
 */
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.response.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Response Handler
* ----------------------------------------------------------------------------
*/
/*!

* ---
* Tech.js
* Dispatcher
* ---

*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.registry.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Handler Registry
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.scanner.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* DOM Scanner
* ----------------------------------------------------------------------------
*/
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.confirm.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.history.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.validation.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.notification.policy.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.notification.message.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.notify.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.callbacks.js
 * ----------------------------------------------------------------------------
 */
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.error.target.js
 * ----------------------------------------------------------------------------
 */
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.pipeline.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Request Pipeline
* ----------------------------------------------------------------------------
*/
/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.loading.js
 * ----------------------------------------------------------------------------
 */
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.engine.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Engine
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* form.handler.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Form Handler
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* link.handler.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Link Handler
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* button.handler.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* trigger.handler.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
*/
/*!
* ----------------------------------------------------------------------------
* Tech.js
* tech.bootstrap.js
* Version : 1.0.0
* ----------------------------------------------------------------------------
* Bootstrap
* ----------------------------------------------------------------------------
*/
//# sourceMappingURL=tech.js.map
