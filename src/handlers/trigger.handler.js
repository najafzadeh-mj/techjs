/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * trigger.handler.js
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
    // Execute
    //==========================================================

    async function execute(element) {


            let target =
                element.getAttribute(
                    Tech.Constants.Attributes.TARGET
                );

            let url =
                element.getAttribute(
                    Tech.Constants.Attributes.URL
                );

            const method = (
                element.getAttribute(
                    Tech.Constants.Attributes.METHOD
                ) || "GET"
            ).toUpperCase();

            let body = null;

            if (method === "GET") {

                url = Tech.Data.buildUrl(element, url);

            }
            else {

                body = Tech.Data.buildBody(element, method);

            }

            const options = {

                element,

                url,

                method,

                target,

                body

            };

            await Tech.Pipeline.execute(options);

        





        //let target = element.getAttribute(Tech.Constants.Attributes.TARGET);

        //let url = element.getAttribute(Tech.Constants.Attributes.Url);

        //const method = (element.getAttribute(Tech.Constants.Attributes.Method) || "GET").toUpperCase();

        //let body = null;

        //if (method === "GET") {

        //    url = Tech.Data.buildUrl(element, url);

        //}
        //else {

        //    body = Tech.Data.buildBody(element, method);

        //}

        //const options = {

        //    element,

        //    url,

        //    method,

        //    target,

        //    body

        //};

        //await Tech.Pipeline.execute(options);

        //const options = {

        //    element,

        //    url:
        //        element.getAttribute(
        //            Tech.Constants.Attributes.URL
        //        ),

        //    method = (
        //        element.getAttribute(
        //            Tech.Constants.Attributes.METHOD
        //        ) || "GET"
        //    ).toUpperCase(),

        //    target:
        //        element.getAttribute(
        //            Tech.Constants.Attributes.TARGET
        //        ),

        //    body: null

        //};



    }

    //==========================================================
    // Event
    //==========================================================

    function onTrigger(e) {

        e.preventDefault();

        execute(e.currentTarget);

    }

    //==========================================================
    // Init
    //==========================================================

    function init(element) {

        if (element.__techInitialized)
            return;

        const trigger =
            element.getAttribute(
                Tech.Constants.Attributes.TRIGGER
            ) || "click";

        element.addEventListener(
            trigger,
            onTrigger
        );

        element.__techInitialized = true;

    }

    //==========================================================
    // Export
    //==========================================================

    Tech.Handlers.Trigger = Object.freeze({

        name: "trigger",

        selector: "[data-tech-trigger]",

        enabled: true,

        init

    });

})(window);
