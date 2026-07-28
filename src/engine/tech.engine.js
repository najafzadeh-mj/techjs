/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.engine.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Engine
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

    let started = false;

    //==========================================================================
    // Private Functions
    //==========================================================================

    function initializeItem(item) {

        if (!item.enabled) {
            return;
        }

        if (!item.handler) {
            return;
        }

        const elements = Tech.Scanner.query(item.selector);

        elements.forEach(function (element) {

            item.handler.init(element);

        });

    }

    //==========================================================================
    // Public
    //==========================================================================

    /**
     * Starts Tech Engine.
     */
    function start() {

        if (started) {
            return;
        }

        const registry = Tech.Registry.getAll();

        registry.forEach(function (item) {

            initializeItem(item);

        });

        started = true;

    }

    /**
     * Refreshes all handlers or a single handler.
     *
     * @param {string=} name
     */
    function refresh(name) {

        const registry = Tech.Registry.getAll();

        if (!name) {

            registry.forEach(function (item) {

                initializeItem(item);

            });

            return;

        }

        const item = Tech.Registry.get(name);

        if (item) {

            initializeItem(item);

        }

    }

    /**
     * Enables a handler.
     *
     * @param {string} name
     */
    function enable(name) {

        const item = Tech.Registry.get(name);

        if (!item) {
            return;
        }

        Tech.Registry.enable(name);
    }

    /**
     * Disables a handler.
     *
     * @param {string} name
     */
    function disable(name) {

        const item = Tech.Registry.get(name);

        if (!item) {
            return;
        }

        Tech.Registry.disable(name);
    }

    /**
     * Stops engine.
     */
    function stop() {

        started = false;

    }

    /**
     * Engine status.
     *
     * @returns {boolean}
     */
    function isStarted() {

        return started;

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Engine = Object.freeze({

        start,

        stop,

        refresh,

        enable,

        disable,

        isStarted

    });

})(window);