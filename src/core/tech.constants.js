/*!
 * Tech.js
 * tech.constants.js
 * Version : 1.0.0
 */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    Tech.Constants = Object.freeze({

        //----------------------------------------------------------
        // Events
        //----------------------------------------------------------

        Events: Object.freeze({

            BEFORE: "tech:before",

            SUCCESS: "tech:success",

            ERROR: "tech:error",

            COMPLETE: "tech:complete",

            LOADING_START: "tech:loadingStart",

            LOADING_END: "tech:loadingEnd",

            PARTIAL_LOADED: "tech:partialLoaded",

            MODAL_OPEN: "tech:modalOpen",

            MODAL_CLOSE: "tech:modalClose",

            VALIDATION_ERROR: "tech:validationError"

        }),
        //----------------------------------------------------------
        // Methods
        //----------------------------------------------------------
        Methods: Object.freeze({

            GET: "GET",

            POST: "POST",

            PUT: "PUT",

            PATCH: "PATCH",

            DELETE: "DELETE",

            HEAD: "HEAD",

            OPTIONS: "OPTIONS"

        }),



        //----------------------------------------------------------
        // Http Methods
        //----------------------------------------------------------

        HttpMethod: Object.freeze({

            GET: "GET",
            POST: "POST",
            PUT: "PUT",
            PATCH: "PATCH",
            DELETE: "DELETE"

        }),

        //----------------------------------------------------------
        // Headers
        //----------------------------------------------------------

        Headers: Object.freeze({

            RequestedWith: "X-Requested-With",

            AntiForgery: "RequestVerificationToken",

            ContentType: "Content-Type",

            Accept: "Accept",

            Authorization: "Authorization"

        }),

        //----------------------------------------------------------
        // Content Types
        //----------------------------------------------------------

        ContentType: Object.freeze({

            Json: "application/json",

            Form: "application/x-www-form-urlencoded",

            Multipart: "multipart/form-data",

            Html: "text/html",

            Text: "text/plain"

        }),

        //----------------------------------------------------------
        // Fetch Response Types
        //----------------------------------------------------------

        ResponseType: Object.freeze({

            Json: "json",

            Text: "text",

            Blob: "blob",

            ArrayBuffer: "arrayBuffer",

            FormData: "formData",

            UNKNOWN: "unknown"

        }),

        //----------------------------------------------------------
        // Html Data Attributes
        //----------------------------------------------------------

        Attributes: Object.freeze({

            ROOT: "data-tech",

            METHOD: "data-tech-method",

            URL: "data-tech-url",

            RESPONSE: "data-tech-response",

            TARGET: "data-tech-target",

            SWAP: "data-tech-swap",

            CONFIRM: "data-tech-confirm",

            LOADING: "data-tech-loading",

            PUSHURL: "data-tech-push-url",

            REPLACEURL: "data-tech-replace-url",

            TRIGGER: "data-tech-trigger",

            INDICATOR: "data-tech-indicator",

            VALIDATE: "data-tech-validate",

            ENCODING: "data-tech-encoding",

            DATA: "data-tech-data",

            DATAFORM: "data-tech-data-form",

            SOURCE: "data-tech-source",

            BEGIN: "data-tech-begin",

            SUCCESS: "data-tech-success",

            ERROR: "data-tech-error",

            COMPLETE: "data-tech-complete",

            NOTIFY: "data-tech-notify",

            EXECUTE_SCRIPTS: "data-tech-execute-scripts",


        }),

        //----------------------------------------------------------
        // Swap Mode
        //----------------------------------------------------------

        Swap: Object.freeze({

            InnerHtml: "inner",

            OuterHtml: "outer",

            BeforeBegin: "beforebegin",

            AfterBegin: "afterbegin",

            BeforeEnd: "beforeend",

            AfterEnd: "afterend",


        }),

        //----------------------------------------------------------
        // Css Classes
        //----------------------------------------------------------

        Css: Object.freeze({

            Loading: "tech-loading",

            Disabled: "tech-disabled",

            Error: "tech-error",

            Success: "tech-success"

        }),

        //----------------------------------------------------------
        // Status
        //----------------------------------------------------------

        Status: Object.freeze({

            SUCCESS: "success",

            ERROR: "error",

            WARNING: "warning",

            INFO: "info"

        })
    });

})(window);


//Tech.Events.emit(Tech.Constants.Events.Success);
//method: Tech.Constants.HttpMethod.POST
//element.getAttribute(
//    Tech.Constants.Attributes.Target
//);