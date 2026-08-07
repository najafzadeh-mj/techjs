/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.bootstrap.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Bootstrap
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

    let bootstrapped = false;

    //==========================================================================
    // Register Handlers
    //==========================================================================

    function registerHandlers() {

        registerHandler(Tech.Handlers.Form);

        registerHandler(Tech.Handlers.Link);

        registerHandler(Tech.Handlers.Button);

        registerHandler(Tech.Handlers.Trigger);

    }

    function registerHandler(handler) {

        if (!handler) {
            return;
        }

        Tech.Registry.register(

            handler.name,

            handler.selector,

            handler

        );

    }



    //==========================================================================
    // Public
    //==========================================================================

    function start() {

        if (bootstrapped) {

            return;

        }

        registerHandlers();

        Tech.Engine.start();

        bootstrapped = true;

    }


    //------------------------------------------------------
    // Global Success Notification
    //------------------------------------------------------

    document.addEventListener(
        Tech.Constants.Events.SUCCESS,
        function (e) {

            const element = e.target;

            if (!Tech.NotificationPolicy.allow(element, "success")) {
                return;
            }

            const response = e.detail;

            const message =
                Tech.NotificationMessage.fromResponse(response)
                ||
                "Operation completed successfully.";

            Tech.Notify.success(message);

        }
    );

    //------------------------------------------------------
    // Global Error Notification
    //------------------------------------------------------

    document.addEventListener(
        Tech.Constants.Events.ERROR,
        function (e) {

            const element = e.target;

            //------------------------------------------------------
            // If error target is configured, do not show toast
            //------------------------------------------------------

            if (
                element.hasAttribute(
                    Tech.Constants.Attributes.ERROR_TARGET
                )
            ) {
                return;
            }

            //------------------------------------------------------
            // Notification policy
            //------------------------------------------------------

            if (!Tech.NotificationPolicy.allow(element, "error")) {
                return;
            }

            const error = e.detail;

            let message =
                Tech.NotificationMessage.fromError(error)
                ||
                "An unexpected error occurred.";

            if (!message && error?.status) {

                message =
                    "Request failed (" +
                    error.status +
                    ").";

            }

            Tech.Notify.error(message);

        }
    );




    window.addEventListener(
        "popstate",
        function () {

            window.location.reload();

        }
    );

    document.addEventListener(
        Tech.Constants.Events.PARTIAL_LOADED,
        function (e) {

            Tech.Engine.refresh();

            const target = e.detail.target;

            target.querySelectorAll('form').forEach(function (form) {

                Tech.Validation.validate(form);

            });

        }
    );

    function restart() {

        Tech.Engine.stop();

        Tech.Registry.clear();

        bootstrapped = false;

        start();

    }

    function isStarted() {

        return bootstrapped;

    }

    //==========================================================================
    // Auto Start
    //==========================================================================

    document.addEventListener(

        "DOMContentLoaded",

        function () {

            start();

        }

    );

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Bootstrap = Object.freeze({

        start,

        restart,

        isStarted

    });

})(window);