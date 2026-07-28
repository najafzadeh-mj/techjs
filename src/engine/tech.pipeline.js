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

        dispatch(
            element,
            Tech.Constants.Events.BEFORE,
            options
        );

    }

    function success(element, response) {

        dispatch(
            element,
            Tech.Constants.Events.SUCCESS,
            response
        );

    }

    function error(element, ex) {

        dispatch(
            element,
            Tech.Constants.Events.ERROR,
            ex
        );

    }

    function complete(element) {

        dispatch(
            element,
            Tech.Constants.Events.COMPLETE,
            null
        );

    }

    function readConfirm(element) {

        return element.getAttribute(
            Tech.Constants.Attributes.CONFIRM
        );

    }

    function checkConfirm(element) {

        const text = readConfirm(element);

        if (!text) {
            return true;
        }

        return window.confirm(text);

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

        if (!checkConfirm(element)) {
            return null;
        }

        before(element, options);

        showLoading(element);

        try {

            const response =
                await executeRequest(options);

            await executeResponse(
                response,
                element
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