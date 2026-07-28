/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.events.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Internal Publish / Subscribe Event Bus
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

    const listeners = new Map();

    //==========================================================================
    // Validation
    //==========================================================================

    function validateEventName(eventName) {

        if (
            typeof eventName !== "string" ||
            eventName.trim().length === 0
        ) {

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

    //==========================================================================
    // Subscribe
    //==========================================================================

    function on(eventName, callback) {

        validateEventName(eventName);
        validateCallback(callback);

        if (!listeners.has(eventName)) {

            listeners.set(eventName, []);

        }

        listeners.get(eventName).push(callback);

    }

    //==========================================================================
    // Subscribe Once
    //==========================================================================

    function once(eventName, callback) {

        validateEventName(eventName);
        validateCallback(callback);

        function wrapper(data) {

            off(eventName, wrapper);

            callback(data);

        }

        on(eventName, wrapper);

    }

    //==========================================================================
    // Unsubscribe
    //==========================================================================

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

    //==========================================================================
    // Publish
    //==========================================================================

    function emit(eventName, data) {

        validateEventName(eventName);

        if (!listeners.has(eventName)) {

            return false;

        }

        const callbacks = [...listeners.get(eventName)];

        for (const callback of callbacks) {

            try {

                callback(data);

            }
            catch (error) {

                console.error(error);

            }

        }

        return true;

    }

    //==========================================================================
    // Clear
    //==========================================================================

    function clear(eventName) {

        if (eventName === undefined) {

            listeners.clear();

            return;

        }

        validateEventName(eventName);

        listeners.delete(eventName);

    }

    //==========================================================================
    // Exists
    //==========================================================================

    function has(eventName) {

        validateEventName(eventName);

        return listeners.has(eventName);

    }

    //==========================================================================
    // Count
    //==========================================================================

    function count(eventName) {

        validateEventName(eventName);

        if (!listeners.has(eventName)) {

            return 0;

        }

        return listeners.get(eventName).length;

    }

    //==========================================================================
    // Debug
    //==========================================================================

    function list() {

        return new Map(listeners);

    }

    //==========================================================================
    // Export
    //==========================================================================

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