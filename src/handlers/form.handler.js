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
            form.getAttribute(
                Tech.Constants.Attributes.METHOD
            )
            ||
            form.getAttribute("method")
            ||
            Tech.Constants.Methods.GET
        ).toUpperCase();

        // return (
        //     form.getAttribute("method") ||
        //     Tech.Constants.Methods.Post
        // ).toUpperCase();

    }

    function getUrl(form) {

        return (
            form.getAttribute(
                Tech.Constants.Attributes.URL
            )
            ||
            form.getAttribute("action")
            ||
            window.location.href
        );

        // return (
        //     form.getAttribute("action") ||
        //     window.location.href
        // );

    }

    function getBody(form) {

        return Tech.Utils.Form.serialize(form);

    }


    function buildOptions(form) {

        return {

            element: form,

            form: form,

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

        //--------------------------------------------------------------
        // NEW: ASP.NET Core validation
        //--------------------------------------------------------------

        if (!Tech.Validation.validate(form)) {

            Tech.Dispatcher.dispatch(
                form,
                Tech.Constants.Events.VALIDATION_ERROR,
                null
            );

            return;

        }
        
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