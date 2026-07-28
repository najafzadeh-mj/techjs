/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * form.handler.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Form Handler
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

    Tech.Handlers = Tech.Handlers || {};

    //==========================================================================
    // Helpers
    //==========================================================================

    function isInitialized(form) {

        return form.__techInitialized === true;

    }

    function markInitialized(form) {

        form.__techInitialized = true;

    }

    function getMethod(form) {

        return (
            form.getAttribute("method") ||
            Tech.Constants.Methods.Post
        ).toUpperCase();

    }

    function getUrl(form) {

        return (
            form.getAttribute("action") ||
            window.location.href
        );

    }

    function getBody(form) {

        return Tech.Utils.Form.serialize(form);

    }

    function buildOptions(form) {

        return {

            element: form,

            url: getUrl(form),

            method: getMethod(form),

            body: getBody(form)

        };

    }

    //==========================================================================
    // Submit
    //==========================================================================

    async function submit(e) {
        //alert("Form Handler");
        e.preventDefault();

        const form = e.currentTarget;

        await Tech.Pipeline.execute(

            buildOptions(form)

        );

    }

    //==========================================================================
    // Initialize
    //==========================================================================

    function init(form) {

        if (!Tech.Utils.Type.isForm(form)) {
            return;
        }

        if (isInitialized(form)) {
            return;
        }

        markInitialized(form);

        form.addEventListener(

            "submit",

            submit

        );

    }

    //==========================================================================
    // Destroy
    //==========================================================================

    function destroy(form) {

        if (!Tech.Utils.Type.isForm(form)) {
            return;
        }

        form.removeEventListener(

            "submit",

            submit

        );

        delete form.__techInitialized;

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Handlers.Form = Object.freeze({

        name: "form",

        selector: `form[${Tech.Constants.Attributes.ROOT}]`,

        init,

        destroy,

        submit

    });

})(window);