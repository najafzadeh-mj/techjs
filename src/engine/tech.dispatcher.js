/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * Dispatcher
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    //======================================================================
    // Namespace
    //======================================================================

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Private
    //======================================================================

    function dispatch(element, eventName, detail) {

        //console.log("dispalch called :" + eventName);

        if (!eventName) {

            throw new Error("Dispatcher event is required.");

        }

        element.dispatchEvent(

            new CustomEvent(eventName, {

                bubbles: true,

                cancelable: true,

                detail

            })

        );

    }

    
    //======================================================================
    // Export
    //======================================================================

    Tech.Dispatcher = Object.freeze({

        dispatch

    });

})(window);