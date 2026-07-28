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
    // Default Configuration
    //==========================================================================

    const DEFAULT_CONFIG = Object.freeze({

        debug: false,

        baseUrl: "",

        timeout: 30000,

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

            delay: 1000

        },

        loading: {

            enabled: true,

            delay: 150

        }

    });

    //==========================================================================
    // Private State
    //==========================================================================

    let config = clone(DEFAULT_CONFIG);

    //==========================================================================
    // Validators
    //==========================================================================

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

        },


    };

    //==========================================================================
    // Private Functions
    //==========================================================================

    function clone(value) {

        if (value === undefined || value === null) {
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
                return undefined;
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

            if (
                isPlainObject(sourceValue) &&
                isPlainObject(target[key])
            ) {

                merge(target[key], sourceValue);
                return;

            }

            target[key] = clone(sourceValue);

        }

    }

    function isPlainObject(value) {

        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        );

    }
    //==========================================================================
    // Public API
    //==========================================================================

    /**
     * Gets a configuration value.
     *
     * @param {string} [path]
     * @returns {*}
     */
    function get(path) {

        const value = resolve(path, config);

        return clone(value);

    }

    /**
     * Sets a configuration value.
     *
     * @param {string} path
     * @param {*} value
     */
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

    /**
     * Merges configuration values.
     *
     * @param {Object} options
     */
    function mergeConfig(options) {

        if (!options || typeof options !== "object") {
            return;
        }

        const copy = clone(config);

        merge(copy, options);

        validateConfig(copy);

        config = copy;

    }

    /**
     * Restores the default configuration.
     */
    function reset() {

        config = clone(DEFAULT_CONFIG);

    }

    /**
     * Gets the default configuration.
     *
     * @returns {Object}
     */
    function defaults() {

        return clone(DEFAULT_CONFIG);

    }

    //==========================================================================
    // Export
    //==========================================================================

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