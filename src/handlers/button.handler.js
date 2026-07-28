/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * button.handler.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    Tech.Handlers = Tech.Handlers || {};

    //==========================================================
    // Click
    //==========================================================

    async function click(e) {

        e.preventDefault();

        const button = e.currentTarget;

        let url =
            button.getAttribute(
                Tech.Constants.Attributes.URL
            );

        const method = (
            button.getAttribute(
                Tech.Constants.Attributes.METHOD
            ) || "GET"
        ).toUpperCase();

        let body = null;

        //------------------------------------------------------
        // GET => QueryString
        //------------------------------------------------------

        if (method === "GET") {

            url = Tech.Data.buildUrl(button, url);

        }
        else {

            body = Tech.Data.buildBody(button, method);

        }


        const options = {

            element: button,

            url,

            method,

            target:
                button.getAttribute(
                    Tech.Constants.Attributes.TARGET
                ),

            body

        };
        //------------------------------------------------------
        // Execute
        //------------------------------------------------------

        await Tech.Pipeline.execute(options);

    }

    //==========================================================
    // Init
    //==========================================================

    function init(element) {

        if (element.__techInitialized)
            return;

        element.addEventListener(
            "click",
            click
        );

        element.__techInitialized = true;

    }

    //==========================================================
    // Export
    //==========================================================

    Tech.Handlers.Button = Object.freeze({

        name: "button",

        selector: "button[data-tech]",

        enabled: true,

        init

    });

})(window);