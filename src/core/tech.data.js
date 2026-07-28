/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.data.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //==========================================================
    // Private
    //==========================================================

    function parseJson(value) {

        if (!value)
            return {};

        try {

            return JSON.parse(value);

        }
        catch {

            console.warn("Invalid JSON:", value);

            return {};

        }

    }

    function formToObject(form) {

        if (!form)
            return {};

        return Object.fromEntries(
            new FormData(form).entries()
        );

    }

    function containerToObject(container) {

        if (!container)
            return {};

        const result = {};

        container
            .querySelectorAll("input,select,textarea")
            .forEach(function (element) {

                if (!element.name)
                    return;

                if (
                    element.type === "checkbox"
                ) {

                    result[element.name] =
                        element.checked;

                    return;

                }

                if (
                    element.type === "radio"
                ) {

                    if (element.checked)
                        result[element.name] =
                            element.value;

                    return;

                }

                result[element.name] =
                    element.value;

            });

        return result;

    }

    function merge() {

        return Object.assign({}, ...arguments);

    }

    //==========================================================
    // Public
    //==========================================================

    function build(element) {

        //------------------------------------------------------
        // 1- Json
        //------------------------------------------------------

        const json = parseJson(

            element.getAttribute(
                Tech.Constants.Attributes.DATA
            )

        );

        //------------------------------------------------------
        // 2- Parent Form
        //------------------------------------------------------

        let formData = {};

        const parentForm =
            element.closest("form");

        if (parentForm) {

            formData =
                formToObject(parentForm);

        }

        //------------------------------------------------------
        // 3- External Form
        //------------------------------------------------------

        const formSelector =
            element.getAttribute(
                Tech.Constants.Attributes.DATAFORM
            );

        if (formSelector) {

            formData = merge(

                formData,

                formToObject(

                    document.querySelector(
                        formSelector
                    )

                )

            );

        }

        //------------------------------------------------------
        // 4- Source Container
        //------------------------------------------------------

        let sourceData = {};

        const sourceSelector =
            element.getAttribute(
                Tech.Constants.Attributes.SOURCE
            );

        if (sourceSelector) {

            sourceData =
                containerToObject(

                    document.querySelector(
                        sourceSelector
                    )

                );

        }

        //------------------------------------------------------
        // Merge
        //------------------------------------------------------

        return merge(

            formData,

            sourceData,

            json

        );

    }

    //----------------------------------------------------------
    // QueryString
    //----------------------------------------------------------

    function queryString(element) {

        const data = build(element);

        return new URLSearchParams(data)
            .toString();

    }

    //----------------------------------------------------------
    // Build Url
    //----------------------------------------------------------

    function buildUrl(element, url) {

        const query = queryString(element);

        if (!query)
            return url;

        return url +

            (url.includes("?")
                ? "&"
                : "?")

            + query;

    }


    //----------------------------------------------------------
    // Build Body
    //----------------------------------------------------------

    function buildBody(element, method) {

        method = (method || "GET").toUpperCase();

        //------------------------------------------------------
        // GET / HEAD
        //------------------------------------------------------

        if (method === "GET" || method === "HEAD") {
            return null;
        }

        //------------------------------------------------------
        // Explicit Encoding
        //------------------------------------------------------

        const encoding =
            element.getAttribute(
                Tech.Constants.Attributes.Encoding
            );

        //------------------------------------------------------
        // Parent Form => multipart/form-data
        //------------------------------------------------------

        const form = element.closest("form");

        if (form && encoding !== "json") {

            return new FormData(form);

        }

        //------------------------------------------------------
        // Build Data Object
        //------------------------------------------------------

        const data = build(element);

        //------------------------------------------------------
        // JSON
        //------------------------------------------------------

        if (encoding === "json") {

            return data;

        }

        //------------------------------------------------------
        // Default => application/x-www-form-urlencoded
        //------------------------------------------------------

        return new URLSearchParams(data);

    }


    //----------------------------------------------------------
    // Export
    //----------------------------------------------------------

    Tech.Data = Object.freeze({

        build,

        buildUrl,

        queryString,

        buildBody

    });

})(window);