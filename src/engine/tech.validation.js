/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.validation.js
 * ----------------------------------------------------------------------------
 */

/* global Tech, jQuery */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Helpers
    //======================================================================

    function hasJQuery() {

        return !!window.jQuery;

    }

    function hasValidator() {

        return hasJQuery()
            &&
            !!jQuery.fn.validate;

    }

    function reset(form) {

        if (!hasValidator(form)) {
            return;
        }

        window.jQuery(form)
            .validate()
            .resetForm();

    }

    function hasUnobtrusive() {

        return hasJQuery()
            &&
            !!jQuery.validator
            &&
            !!jQuery.validator.unobtrusive;

    }

    function parse(form) {

        if (!hasUnobtrusive()) {
            return;
        }

        jQuery.validator.unobtrusive.parse(form);

    }

    //======================================================================
    // Public
    //======================================================================

    function validate(form) {

        if (!form) {
            return true;
        }

        //--------------------------------------------------------------
        // No validator => allow submit
        //--------------------------------------------------------------

        if (!hasValidator()) {
            return true;
        }

        //--------------------------------------------------------------
        // Ensure unobtrusive rules are parsed
        //--------------------------------------------------------------

        parse(form);

        //--------------------------------------------------------------
        // Execute validation
        //--------------------------------------------------------------

        return jQuery(form).valid();

    }

    Tech.Validation = Object.freeze({

        validate

    });

})(window);