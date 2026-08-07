/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.pipeline.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Request Pipeline
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
    // Validation
    //==========================================================================

    function validate(options) {

        if (!options) {
            throw new Error("Pipeline options are required.");
        }

        if (!options.element) {
            throw new Error("Pipeline element is required.");
        }

        if (!options.url) {
            throw new Error("Pipeline url is required.");
        }

    }

    //==========================================================================
    // Helpers
    //==========================================================================

    function dispatch(element, eventName, data) {

        Tech.Dispatcher.dispatch(
            element,
            eventName,
            data
        );

    }

    function showLoading(element) {

        dispatch(
            element,
            Tech.Constants.Events.LOADING_START,
            null
        );

    }

    function hideLoading(element) {

        dispatch(
            element,
            Tech.Constants.Events.LOADING_END,
            null
        );

    }

    function before(element, options) {

        const context = {
            element,
            options
        };

        //------------------------------------------------------
        // DOM event
        //------------------------------------------------------

        dispatch(
            element,
            Tech.Constants.Events.BEFORE,
            context
        );

        //------------------------------------------------------
        // Attribute callback
        //------------------------------------------------------

        return Tech.Callbacks.begin(
            element,
            context
        );

    }

    function success(element, response) {

        const context = {
            element,
            response
        };

        dispatch(
            element,
            Tech.Constants.Events.SUCCESS,
            context
        );

        Tech.Callbacks.success(
            element,
            context
        );

    }

    function error(element, ex) {

        const context = {
            element,
            error: ex
        };

        dispatch(
            element,
            Tech.Constants.Events.ERROR,
            context
        );

        Tech.Callbacks.error(
            element,
            context
        );

    }

    function complete(element) {

        const context = {
            element
        };

        dispatch(
            element,
            Tech.Constants.Events.COMPLETE,
            context
        );

        Tech.Callbacks.complete(
            element,
            context
        );

    }

    function readConfirm(element) {

        return element.getAttribute(
            Tech.Constants.Attributes.CONFIRM
        );

    }

    async function checkConfirm(element) {

        const text = readConfirm(element);

        return await Tech.Confirm.show(text);

    }

    function buildRequest(options) {

        return {

            url: options.url,

            method: options.method,

            body: options.body,

            headers: options.headers,

            timeout: options.timeout,

            cache: options.cache,

            credentials: options.credentials,

            mode: options.mode,

            redirect: options.redirect,

            keepalive: options.keepalive

        };

    }

    async function executeRequest(options) {

        return await Tech.Request.send(
            buildRequest(options)
        );

    }

    async function executeResponse(response, element) {

        return await Tech.Response.handle(
            response,
            element
        );

    }

    //==========================================================================
    // Execute
    //==========================================================================

    async function execute(options) {

        validate(options);

        const element = options.element;

        if (! await checkConfirm(element)) {
            return null;
        }

        const beginResult = before(element, options);

        if (beginResult === false) {
            return null;
        }

        showLoading(element);

        try {

            const response =
                await executeRequest(options);

            await executeResponse(
                response,
                element
            );

            //------------------------------------------------------
            // NEW: update browser history
            //------------------------------------------------------

            Tech.History.update(
                element,
                response
            );

            success(
                element,
                response
            );

            return response;

        }
        catch (ex) {

            error(
                element,
                ex
            );

            throw ex;

        }
        finally {

            hideLoading(element);

            complete(element);

        }

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Pipeline = Object.freeze({

        execute

    });

})(window);