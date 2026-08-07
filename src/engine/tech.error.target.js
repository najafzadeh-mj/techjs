/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.error.target.js
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window, document) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Helpers
    //======================================================================

    function findTarget(element) {

        const selector = element.getAttribute(
            Tech.Constants.Attributes.ERROR_TARGET
        );

        if (!selector) {
            return null;
        }

        return document.querySelector(selector);

    }

    function extractMessage(error) {

        if (!error) {
            return "An unexpected error occurred.";
        }

        if (
            error.data &&
            typeof error.data.message === "string"
        ) {
            return error.data.message;
        }

        if (
            error.data &&
            typeof error.data.Message === "string"
        ) {
            return error.data.Message;
        }

        if (typeof error.data === "string") {
            return error.data;
        }

        return "An unexpected error occurred.";

    }

    //======================================================================
    // Public
    //======================================================================

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