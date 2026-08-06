/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.loading.js
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

    function findIndicator(element) {

        const selector =
            element.getAttribute(
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

        controls.forEach(function (control) {

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

        controls.forEach(function (control) {

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

    //======================================================================
    // Event Handlers
    //======================================================================

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

    //======================================================================
    // Register
    //======================================================================

    document.addEventListener(
        Tech.Constants.Events.LOADING_START,
        onLoadingStart
    );

    document.addEventListener(
        Tech.Constants.Events.LOADING_END,
        onLoadingEnd
    );

})(window);