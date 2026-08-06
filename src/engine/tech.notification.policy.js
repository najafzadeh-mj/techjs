/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.notification.policy.js
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    function getMode(element) {

        if (!element) {
            return "none";
        }

        return (
            element.getAttribute(
                Tech.Constants.Attributes.NOTIFY
            ) || "none"
        ).toLowerCase();

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