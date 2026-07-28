/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.scanner.js
 * Version : 1.0.0
 * ----------------------------------------------------------------------------
 * DOM Scanner
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
    // Private
    //==========================================================================

    function normalizeRoot(root) {

        if (root === undefined || root === null) {

            return document;

        }

        if (!(root instanceof Element) &&
            root !== document) {

            throw new Error(
                "Root must be Document or Element."
            );

        }

        return root;

    }

    function scanSelector(root, selector, handler) {

        const items = [];

        const elements = root.querySelectorAll(selector);

        elements.forEach(function (element) {

            items.push({

                selector: selector,

                element: element,

                handler: handler

            });

        });

        return items;

    }

    //==========================================================================
    // Public
    //==========================================================================

    /**
     * Scan DOM for registered handlers.
     *
     * @param {Document|Element} root
     * @returns {Array}
     */
    function scan(root) {

        root = normalizeRoot(root);

        const registry = Tech.Registry.getAll();

        const result = [];

        registry.forEach(function (item) {

            result.push(

                ...scanSelector(

                    root,

                    item.selector,

                    item.handler

                )

            );

        });

        return result;

    }

    /**
     * Scan only one selector.
     *
     * @param {string} selector
     * @param {Document|Element} root
     * @returns {Array<Element>}
     */
    function query(selector, root) {

        root = normalizeRoot(root);

        return [

            ...root.querySelectorAll(selector)

        ];

    }

    /**
     * Determines whether an element matches a selector.
     *
     * @param {Element} element
     * @param {string} selector
     * @returns {boolean}
     */
    function matches(element, selector) {

        if (!(element instanceof Element)) {

            return false;

        }

        return element.matches(selector);

    }

    //==========================================================================
    // Export
    //==========================================================================

    Tech.Scanner = Object.freeze({

        scan,

        query,

        matches

    });

})(window);