/*!
 * ----------------------------------------------------------------------------
 * Tech.js
 * tech.confirm.js
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

        console.log("bootstrap =", window.bootstrap);
        return !!window.bootstrap;

    }

    function fallbackConfirm(message) {

        return Promise.resolve(
            window.confirm(message)
        );

    }

    function createModal() {

        let modal =
            document.getElementById("tech-confirm-modal");

        if (modal) {
            return modal;
        }

        const html = `
<div class="modal fade" id="tech-confirm-modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">تأیید عملیات</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <p class="mb-0" id="tech-confirm-message"></p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          انصراف
        </button>

        <button type="button" class="btn btn-danger" id="tech-confirm-ok">
          تأیید
        </button>
      </div>

    </div>
  </div>
</div>`;

        document.body.insertAdjacentHTML(
            "beforeend",
            html
        );

        return document.getElementById(
            "tech-confirm-modal"
        );

    }

    function bootstrapConfirm(message) {

        return new Promise(function (resolve) {

            const modalElement = createModal();

            modalElement.querySelector(
                "#tech-confirm-message"
            ).textContent = message;

            const okButton =
                modalElement.querySelector(
                    "#tech-confirm-ok"
                );

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            let resolved = false;

            function cleanup() {

                okButton.removeEventListener(
                    "click",
                    onOk
                );

                modalElement.removeEventListener(
                    "hidden.bs.modal",
                    onHidden
                );

            }

            function onOk() {

                resolved = true;

                cleanup();

                modal.hide();

                resolve(true);

            }

            function onHidden() {

                if (!resolved) {

                    cleanup();

                    resolve(false);

                }

            }

            okButton.addEventListener(
                "click",
                onOk
            );

            modalElement.addEventListener(
                "hidden.bs.modal",
                onHidden
            );

            modal.show();

        });

    }

    //======================================================================
    // Public
    //======================================================================

    async function show(message) {

        if (!message) {
            return true;
        }

        if (hasBootstrap()) {
            return await bootstrapConfirm(message);
        }

        return await fallbackConfirm(message);

    }

    Tech.Confirm = Object.freeze({

        show

    });

})(window);