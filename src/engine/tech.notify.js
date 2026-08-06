/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.notify.js
 * ----------------------------------------------------------------------------
 */

/* global Tech, bootstrap */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    //======================================================================
    // Helpers
    //======================================================================

    function hasBootstrap() {

        return !!window.bootstrap;

    }

    function ensureContainer() {

        let container =
            document.getElementById("tech-toast-container");

        if (container) {
            return container;
        }

        container = document.createElement("div");

        container.id = "tech-toast-container";

        container.className =
            "toast-container position-fixed top-0 end-0 p-3";

        container.style.zIndex = "1080";

        document.body.appendChild(container);

        return container;

    }

    function createToast(message, title, type) {

        const bgClass = {

            success: "text-bg-success",
            error: "text-bg-danger",
            warning: "text-bg-warning",
            info: "text-bg-primary"

        }[type] || "text-bg-primary";

        const wrapper = document.createElement("div");

        wrapper.innerHTML = `
<div class="toast ${bgClass}"
     role="alert"
     aria-live="assertive"
     aria-atomic="true">

    <div class="toast-header">

        <strong class="me-auto">${title}</strong>

        <button type="button"
                class="btn-close"
                data-bs-dismiss="toast"></button>

    </div>

    <div class="toast-body">

        ${message}

    </div>

</div>`;

        return wrapper.firstElementChild;

    }

    function showBootstrapToast(message, title, type) {

        const container = ensureContainer();

        const toastElement =
            createToast(message, title, type);

        container.appendChild(toastElement);

        const toast =
            bootstrap.Toast.getOrCreateInstance(
                toastElement,
                {
                    delay: 4000,
                    autohide: true
                }
            );

        toastElement.addEventListener(
            "hidden.bs.toast",
            function () {

                toastElement.remove();

            }
        );

        toast.show();

    }

    function showFallback(message, title) {

        window.alert(title + ": " + message);

    }

    function notify(message, title, type) {

        if (!message) {
            return;
        }

        if (hasBootstrap()) {

            showBootstrapToast(
                message,
                title,
                type
            );

            return;

        }

        showFallback(message, title);

    }

    //======================================================================
    // Public API
    //======================================================================

    function success(message, title = "Success") {

        notify(message, title, "success");

    }

    function error(message, title = "Error") {

        notify(message, title, "error");

    }

    function warning(message, title = "Warning") {

        notify(message, title, "warning");

    }

    function info(message, title = "Info") {

        notify(message, title, "info");

    }

    Tech.Notify = Object.freeze({

        success,
        error,
        warning,
        info

    });

})(window);