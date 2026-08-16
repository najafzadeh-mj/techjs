/*!

* ---
* Tech.js
* Dispatcher
* ---

*/

/* global Tech */

(function (window) {

    "use strict";

    //======================================================================
    // Namespace
    //======================================================================

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Callback Mapping
    //======================================================================

    const CALLBACK_ATTRIBUTES = Object.freeze({

        success: Tech.Constants.Attributes.SUCCESS,

        error: Tech.Constants.Attributes.ERROR,

        complete: Tech.Constants.Attributes.COMPLETE

    });

    //======================================================================
    // Private
    //======================================================================

    function invokeCallback(element, eventName, detail) {

        const attr =
            CALLBACK_ATTRIBUTES[eventName];

        if (!attr) {
            return;
        }

        const fnName =
            element.getAttribute(attr);

        if (!fnName) {
            return;
        }

        const fn = window[fnName];

        if (typeof fn !== "function") {

            console.warn(
                "Tech.js callback '" +
                fnName +
                "' not found."
            );

            return;
        }

        try {

            fn(detail, element);

        }
        catch (ex) {

            console.error(ex);

        }

    }

    function dispatch(element, eventName, detail) {

        if (!eventName) {

            throw new Error(
                "Dispatcher event is required."
            );

        }

        //--------------------------------------------------------------
        // DOM Event
        //--------------------------------------------------------------

        element.dispatchEvent(

            new CustomEvent(eventName, {

                bubbles: true,

                cancelable: true,

                detail: detail

            })

        );

        //--------------------------------------------------------------
        // Inline Callback
        //--------------------------------------------------------------

        // switch (eventName) {

        //     case Tech.Constants.Events.SUCCESS:
        //         invokeCallback(element, "success", detail);
        //         break;

        //     case Tech.Constants.Events.ERROR:
        //         invokeCallback(element, "error", detail);
        //         break;

        //     case Tech.Constants.Events.COMPLETE:
        //         invokeCallback(element, "complete", detail);
        //         break;

        // }

    }

    //======================================================================
    // Export
    //======================================================================

    Tech.Dispatcher = Object.freeze({

        dispatch

    });

})(window);



// /*!
//  * ----------------------------------------------------------------------------
//  * Tech.js
//  * tech.dispatcher.js
//  * ----------------------------------------------------------------------------
//  */

// /* global Tech */

// (function (window) {

//     "use strict";

//     window.Tech = window.Tech || {};
//     const Tech = window.Tech;

//     //======================================================================
//     // Events
//     //======================================================================

//     const EVENTS = Object.freeze({

//         before: "tech:before",

//         loadingStart: "tech:loadingStart",

//         success: "tech:success",

//         error: "tech:error",

//         loadingEnd: "tech:loadingEnd",

//         complete: "tech:complete"

//     });

//     //======================================================================
//     // Callback Mapping
//     //======================================================================

//     const CALLBACK_ATTRIBUTES = Object.freeze({

//         success: Tech.Constants.Attributes.SUCCESS,

//         error: Tech.Constants.Attributes.ERROR,

//         complete: Tech.Constants.Attributes.COMPLETE

//     });

//     //======================================================================
//     // Private
//     //======================================================================

//     function invokeCallback(element, name, detail) {

//         console.log("dispalch called :" + name);

//         const attr = CALLBACK_ATTRIBUTES[name];

//         if (!attr)
//             return;

//         const fnName = element.getAttribute(attr);

//         if (!fnName)
//             return;

//         const fn = window[fnName];

//         if (typeof fn !== "function") {

//             console.warn(
//                 "Tech.js callback '" + fnName + "' not found."
//             );

//             return;

//         }

//         try {

//             fn(detail);

//         }
//         catch (ex) {

//             console.error(ex);

//         }

//     }

//     //======================================================================
//     // Dispatch
//     //======================================================================

//     function dispatch(element, name, detail) {

//         const eventName = EVENTS[name];

//         if (!eventName) {

//             throw new Error(
//                 "Unknown dispatcher event '" + name + "'."
//             );

//         }

//         //--------------------------------------------------------------
//         // DOM Event
//         //--------------------------------------------------------------

//         element.dispatchEvent(

//             new CustomEvent(

//                 eventName,

//                 {

//                     bubbles: true,

//                     cancelable: true,

//                     detail: detail

//                 }

//             )

//         );

//         //--------------------------------------------------------------
//         // Inline Callback
//         //--------------------------------------------------------------

//         invokeCallback(element, name, detail);

//     }

//     //======================================================================
//     // Export
//     //======================================================================

//     Tech.Dispatcher = Object.freeze({

//         dispatch,

//         events: EVENTS

//     });

// })(window);