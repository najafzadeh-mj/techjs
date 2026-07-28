/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * A lightweight Attribute-Based Fetch Library
 * ----------------------------------------------------------------------------
 * Copyright (c) 2026
 * Licensed under the MIT License.
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    //==========================================================================
    // Namespace
    //==========================================================================

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //==========================================================================
    // Private Functions
    //==========================================================================

    function ensure(value, name) {

        if (value === undefined || value === null) {
            throw new Error(name + " is required.");
        }

    }

    function normalizeOptions(options) {

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

        if (
            options.headers !== undefined &&
            (options.headers === null || typeof options.headers !== "object")
        ) {
            throw new Error(
                "headers must be an object."
            );
        }

        const requestModel = {

            url: options.url,

            method: (options.method || "GET").toUpperCase(),

            headers: options.headers || {},

            body: options.body ?? null,

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
        if (
            requestModel.method === "GET" ||
            requestModel.method === "HEAD"
        ) {
            requestModel.body = null;
        }

        return requestModel;

    }

    function mergeConfig(request, config) {

        //const config = Tech.Config.get();

        request.method = request.method || config.defaultMethod;

        request.credentials = request.credentials ?? config.credentials;

        request.cache = request.cache ?? config.cache;

        request.mode = request.mode ?? config.mode;

        request.redirect = request.redirect ?? config.redirect;

        request.keepalive = request.keepalive ?? config.keepalive;

        request.timeout = request.timeout ?? config.timeout;

        request.headers = Object.assign(
            {},
            config.headers,
            request.headers
        );

        return request;

    }

    function resolveUrl(request, config) {

        //const config = Tech.Config.get();

        if (!config.baseUrl) {
            return request;
        }

        // Absolute URL
        if (/^(https?:)?\/\//i.test(request.url)) {
            return request;
        }

        request.url =
            config.baseUrl.replace(/\/$/, "") +
            "/" +
            request.url.replace(/^\//, "");

        return request;

    }

    function createFetchOptions(request) {
        const options = {

            method: request.method,

            headers: request.headers,

            credentials: request.credentials,

            cache: request.cache,

            mode: request.mode,

            redirect: request.redirect,

            keepalive: request.keepalive

        };
        if (request.body !== null &&
            request.body !== undefined &&
            request.method !== "GET" &&
            request.method !== "HEAD") {
            if (request.body instanceof FormData) {
                options.body = request.body;

            }
            else if (request.body instanceof URLSearchParams) {
                options.body = request.body;

            }
            else if (typeof request.body === "object") {
                options.headers["Content-Type"] ??= "application/json";

                options.body = JSON.stringify(request.body);

            }
            else {
                options.body = request.body;

            }

        }

        return options;

    }

    function executeRequest(request) {
        const options = createFetchOptions(request);

        return fetch(request.url, options);

    }

    //==========================================================================
    // Public API
    //==========================================================================

    /**
     * Sends an HTTP request.
     *
     * @param {Object|string} options
     *
     * @returns {Promise<Response>}
     */
    async function send(options) {
        let requestModel = normalizeOptions(options);
        const config = Tech.Config.get();
        requestModel = mergeConfig(requestModel, config);
        requestModel = resolveUrl(requestModel,config);
        return executeRequest(requestModel);

    }

    /**
     * Sends a request and parses the response.
     *
     * @param {Object|string} options
     * @returns {Promise<Object>}
     */
    async function execute(options) {
        const response = await send(options);

        return Tech.Response.parse(response);

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Request = Object.freeze({

        send,

        execute

    });

})(window);