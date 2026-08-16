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

    function attributeData(element) {

        if (!element)
            return {};

        const result = {};

        Array.from(element.attributes)
            .forEach(function (attribute) {

                if (!attribute.name.startsWith("data-tech-data-"))
                    return;

                const key =
                    toCamelCase(
                        attribute.name.substring(prefix.length)
                    );

                if (!key)
                    return;

                result[key] = attribute.value;
            });

        return result;
    }

    function parseAttributeValue(value) {

        if (value === "true")
            return true;

        if (value === "false")
            return false;

        if (value === "null")
            return null;

        if (
            value !== "" &&
            !isNaN(value)
        ) {
            return Number(value);
        }

        return value;
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
        // 1- JSON Data
        //------------------------------------------------------

        const json = parseJson(
            element.getAttribute(
                Tech.Constants.Attributes.DATA
            )
        );

        //------------------------------------------------------
        // 2- Attribute Data
        //------------------------------------------------------

        const attributeData =
            getAttributeData(element);

        //------------------------------------------------------
        // 3- Parent Form
        //------------------------------------------------------

        let formData = {};

        const parentForm =
            element.closest("form");

        if (parentForm) {

            formData =
                formToObject(parentForm);
        }

        //------------------------------------------------------
        // 4- External Form
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
        // 5- Source Container
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
        // 6- Merge
        //------------------------------------------------------

        return merge(
            formData,
            sourceData,
            json,
            attributeData
        );
    }
    function getAttributeData(element) {

        if (!element)
            return {};

        const prefix =
            "data-tech-data-";

        const result = {};

        Array.from(element.attributes)
            .forEach(function (attribute) {

                if (!attribute.name.startsWith(prefix))
                    return;

                const key =
                    attribute.name.substring(
                        prefix.length
                    );

                if (!key)
                    return;

                result[key] =
                    parseAttributeValue(
                        attribute.value
                    );
            });

        return result;
    }

    function toCamelCase(value) {

        return value.replace(
            /-([a-z])/g,
            function (_, char) {
                return char.toUpperCase();
            }
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