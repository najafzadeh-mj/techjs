/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.response.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * Response Handler
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

    function ensure(response) {

        if (!(response instanceof Response)) {

            throw new Error(
                "A valid Response object is required."
            );

        }

    }

    //==========================================================================
    // Helpers
    //==========================================================================

    function getContentType(response) {

        return (
            response.headers.get("Content-Type") || ""
        ).toLowerCase();

    }

    function detectType(contentType) {

        if (contentType.includes("json"))
            return "json";

        if (
            contentType.includes("text/html")
        )
            return "html";

        if (
            contentType.includes("text/")
        )
            return "text";

        if (
            contentType.includes("xml")
        )
            return "xml";

        if (
            contentType.startsWith("image/") ||
            contentType.startsWith("video/") ||
            contentType.startsWith("audio/")
        )
            return "blob";

        return "text";

    }

    async function parseBody(response, contentType) {

        if (
            response.status === 204 ||
            response.status === 205
        ) {

            return null;

        }

        if (contentType.includes("json")) {

            return await response.json();

        }

        if (
            contentType.includes("text/") ||
            contentType.includes("xml")
        ) {

            return await response.text();

        }

        return await response.blob();

    }

    function extractHeaders(response) {

        const headers = {};

        response.headers.forEach(function (value, key) {

            headers[key] = value;

        });

        return headers;

    }

    //==========================================================================
    // Parse
    //==========================================================================

    async function parse(response) {

        ensure(response);

        const contentType =
            getContentType(response);

        return {

            ok: response.ok,

            status: response.status,

            statusText: response.statusText,

            url: response.url,

            redirected: response.redirected,

            contentType: contentType,

            type: detectType(contentType),

            headers: extractHeaders(response),

            data: await parseBody(
                response,
                contentType
            ),

            raw: response

        };

    }

    //==========================================================================
    // Target
    //==========================================================================

    function findTarget(element) {

        const selector =
            element.getAttribute(
                Tech.Constants.Attributes.TARGET
            );

        if (!selector)
            return null;

        return document.querySelector(selector);

    }

    //==========================================================================
    // Swap
    //==========================================================================

    function swap(target, html, mode) {

        switch (mode) {

            case Tech.Constants.Swap.OuterHtml:

                target.outerHTML = html;
                break;

            case Tech.Constants.Swap.BeforeBegin:

                target.insertAdjacentHTML(
                    "beforebegin",
                    html
                );
                break;

            case Tech.Constants.Swap.AfterBegin:

                target.insertAdjacentHTML(
                    "afterbegin",
                    html
                );
                break;

            case Tech.Constants.Swap.BeforeEnd:

                target.insertAdjacentHTML(
                    "beforeend",
                    html
                );
                break;

            case Tech.Constants.Swap.AfterEnd:

                target.insertAdjacentHTML(
                    "afterend",
                    html
                );
                break;

            default:

                target.innerHTML = html;
                break;

        }

    }

    //==========================================================================
    // Handle
    //==========================================================================

    async function handle(response, element) {

        const result = await parse(response);

        if (!result.ok) {

            throw result;

        }

        const target = findTarget(element);

        if (!target) {

            return result;

        }

        if (
            result.type !== "html" &&
            result.type !== "text"
        ) {

            return result;

        }

        const mode =
            element.getAttribute(
                Tech.Constants.Attributes.SWAP
            ) ||
            Tech.Constants.Swap.InnerHtml;

        swap(

            target,

            result.data,

            mode

        );

        return result;

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Response = Object.freeze({

        parse,

        handle

    });

})(window);