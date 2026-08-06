/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.notification.message.js
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    function fromResponse(response) {

        if (!response) {
            return null;
        }

        const data = response.data;

        if (!data) {
            return null;
        }

        //--------------------------------------------------------------
        // { message: "..." }
        //--------------------------------------------------------------

        if (typeof data.message === "string" && data.message.trim()) {

            return data.message;

        }

        //--------------------------------------------------------------
        // { Message: "..." }
        //--------------------------------------------------------------

        if (typeof data.Message === "string" && data.Message.trim()) {

            return data.Message;

        }

        return null;

    }

    function fromError(error) {

        if (!error) {
            return null;
        }

        const data = error.data;

        if (!data) {
            return null;
        }

        if (typeof data.message === "string" && data.message.trim()) {

            return data.message;

        }

        if (typeof data.Message === "string" && data.Message.trim()) {

            return data.Message;

        }

        return null;

    }

    Tech.NotificationMessage = Object.freeze({

        fromResponse,
        fromError

    });

})(window);