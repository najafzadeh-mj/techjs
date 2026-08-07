/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.callbacks.js
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Helpers
    //======================================================================

    function getFunction(name) {

        if (!name) {
            return null;
        }

        const fn = window[name];

        return typeof fn === "function"
            ? fn
            : null;

    }

    function invoke(name, context) {

        const fn = getFunction(name);

        if (!fn) {
            return;
        }

        try {

            return fn(context);

        }
        catch (ex) {

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

    //======================================================================
    // Public
    //======================================================================

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