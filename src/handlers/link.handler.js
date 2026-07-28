/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * link.handler.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Link Handler
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

    function isInitialized(link) {

        return link.__techInitialized === true;

    }

    function markInitialized(link) {

        link.__techInitialized = true;

    }

    function getMethod(link) {

        return (
            link.getAttribute(Tech.Constants.Attributes.METHOD) ||
            Tech.Constants.Methods.GET
        ).toUpperCase();

    }

    function getUrl(link) {

        return (
            link.getAttribute(Tech.Constants.Attributes.URL) ||
            link.href
        );

    }

    function buildOptions(link) {

        return {

            element: link,

            url: getUrl(link),

            method: getMethod(link),

            body: null

        };

    }

    //==========================================================================
    // Click
    //==========================================================================

    async function click(e) {

        e.preventDefault();

        const link = e.currentTarget;

        await Tech.Pipeline.execute(

            buildOptions(link)

        );

    }

    //==========================================================================
    // Initialize
    //==========================================================================

    function init(link) {

        if (!Tech.Utils.Type.isElement(link)) {
            return;
        }

        if (isInitialized(link)) {
            return;
        }

        markInitialized(link);

        link.addEventListener(

            "click",

            click

        );

    }

    //==========================================================================
    // Destroy
    //==========================================================================

    function destroy(link) {

        if (!Tech.Utils.Type.isElement(link)) {
            return;
        }

        link.removeEventListener(

            "click",

            click

        );

        delete link.__techInitialized;

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Handlers.Link = Object.freeze({

        name: "link",

        selector: `a[${Tech.Constants.Attributes.ROOT}]`,

        init,

        destroy,

        click

    });

})(window);