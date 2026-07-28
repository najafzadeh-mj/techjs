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