/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.history.js
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

        return response.url || window.location.href;

    }

    //======================================================================
    // Public
    //======================================================================

    function update(element, response) {

        const url = resolveUrl(element, response);

        if (shouldReplace(element)) {

            history.replaceState(
                { url: url },
                "",
                url
            );

            return;

        }

        if (shouldPush(element)) {

            history.pushState(
                { url: url },
                "",
                url
            );

        }

    }

    Tech.History = Object.freeze({

        update

    });

})(window);