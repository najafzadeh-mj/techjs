/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.scripts.js
 * ----------------------------------------------------------------------------
 */

/* global Tech */

(function (window, document) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Helpers
    //======================================================================

    function shouldExecute(element) {

        return element.getAttribute(
            Tech.Constants.Attributes.EXECUTE_SCRIPTS
        ) === "true";

    }

    function cloneAttributes(from, to) {

        Array.from(from.attributes)
            .forEach(function (attr) {

                to.setAttribute(
                    attr.name,
                    attr.value
                );

            });

    }

    function executeScript(oldScript) {

        const script = document.createElement("script");

        cloneAttributes(oldScript, script);

        script.textContent = oldScript.textContent;

        oldScript.parentNode.replaceChild(
            script,
            oldScript
        );

    }

    function executeScripts(container) {

        if (!container) {
            return;
        }

        const scripts =
            container.querySelectorAll("script");

        scripts.forEach(executeScript);

    }

    //======================================================================
    // Public
    //======================================================================

    function run(target, sourceElement) {

        if (!shouldExecute(sourceElement)) {
            return;
        }

        executeScripts(target);

    }

    Tech.Scripts = Object.freeze({

        run

    });

})(window, document);