/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.registry.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Handler Registry
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
    // Private
    //==========================================================================

    const handlers = new Map();

    //==========================================================================
    // Validation
    //==========================================================================

    function validateSelector(selector) {

        if (
            typeof selector !== "string" ||
            selector.trim().length === 0
        ) {

            throw new Error(
                "Selector must be a non-empty string."
            );

        }

    }
    function validateName(name) {

        if (
            typeof name !== "string" ||
            name.trim().length === 0
        ) {

            throw new Error(
                "Handler name must be a non-empty string."
            );

        }

    }

    function validateHandler(handler) {

        if (
            handler === null ||
            handler === undefined
        ) {

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

    //==========================================================================
    // Public
    //==========================================================================

    /**
     * Registers a handler.
     *
     * @param {string} name
     * @param {string} selector
     * @param {object} handler
     */
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

        if (
            typeof name !== "string" ||
            name.trim().length === 0
        ) {

            throw new Error(
                "Handler name must be a non-empty string."
            );

        }

    }


    /**
     * Removes a handler.
     *
     * @param {string} name
     * @returns {boolean}
     */
    function unregister(name) {

        validateName(name);

        return handlers.delete(name);

    }

    /**
     * Gets a handler.
     *
     * @param {string} selector
     * @returns {object|null}
     */
    function get(name) {

        validateName(name);

        return handlers.get(name) ?? null;

    }

    /**
     * Returns all registered handlers.
     *
     * @returns {Map}
     */
    function getAll() {

        return new Map(handlers);

    }

    /**
     * Returns whether a selector exists.
     *
     * @param {string} selector
     * @returns {boolean}
     */
    function has(name) {

        validateName(name);

        return handlers.has(name);

    }

    /**
     * Returns number of registered handlers.
     *
     * @returns {number}
     */
    function count() {

        return handlers.size;

    }

    /**
     * Removes all handlers.
     */
    function clear() {

        handlers.clear();

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Registry = Object.freeze({

        register,

        unregister,

        get,

        getAll,

        has,

        count,

        clear,

        enable,

        disable,

    });

})(window);