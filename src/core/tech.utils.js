/*!
 * Tech.js
 * tech.utils.js
 * Version : 1.0.0
 */

(function (window) {

    "use strict";

    window.Tech = window.Tech || {};

    const Tech = window.Tech;

    const Utils = {};

    //=========================================================
    // Type
    //=========================================================

    Utils.Type = Object.freeze({

        isNull(value) {
            return value === null || value === undefined;
        },

        isString(value) {
            return typeof value === "string";
        },

        isNumber(value) {
            return typeof value === "number" && !Number.isNaN(value);
        },

        isBoolean(value) {
            return typeof value === "boolean";
        },

        isFunction(value) {
            return typeof value === "function";
        },

        isArray(value) {
            return Array.isArray(value);
        },

        isObject(value) {
            return value !== null &&
                typeof value === "object" &&
                !Array.isArray(value);
        },

        isElement(value) {
            return value &&
                value.nodeType === 1;
        },

        isForm(value) {
            return value instanceof HTMLFormElement;
        },

        isEmpty(value) {

            if (value === null || value === undefined)
                return true;

            if (typeof value === "string")
                return value.trim().length === 0;

            if (Array.isArray(value))
                return value.length === 0;

            if (this.isObject(value))
                return Object.keys(value).length === 0;

            return false;

        }

    });

    //=========================================================
    // Object
    //=========================================================

    Utils.Object = Object.freeze({

        clone(obj) {
            if (typeof structuredClone === "function") {

                return structuredClone(obj);

            }

            return JSON.parse(JSON.stringify(obj));
        },

        merge(target, source) {

            if (!Utils.Type.isObject(target) ||
                !Utils.Type.isObject(source))
                return target;

            Object.keys(source).forEach(key => {

                if (Utils.Type.isObject(source[key])) {

                    target[key] ??= {};

                    Utils.Object.merge(
                        target[key],
                        source[key]
                    );

                } else {

                    target[key] = source[key];

                }

            });

            return target;

        }

    });

    //=========================================================
    // DOM
    //=========================================================

    Utils.Dom = Object.freeze({

        $(selector, root = document) {
            return root.querySelector(selector);
        },

        $$(selector, root = document) {
            return [...root.querySelectorAll(selector)];
        },

        parse(html) {

            return new DOMParser()
                .parseFromString(html, "text/html");

        },

        create(tag) {

            return document.createElement(tag);

        },

        remove(element) {
            if (Utils.Type.isElement(element)) {

                element.remove();

            }
        }

    });

    //=========================================================
    // Form
    //=========================================================



    Utils.Form = Object.freeze({

        serialize(form) {

            return new FormData(form);

        },

        toObject(form) {

            return Object.fromEntries(
                new FormData(form).entries()
            );

        }

    });

    //=========================================================
    // Url
    //=========================================================

    Utils.Url = Object.freeze({

        resolve(url) {

            const base =
                Tech.Config.get("baseUrl") ||
                window.location.origin;

            return new URL(url, base).toString();

        },

        queryString(obj = {}) {

            return new URLSearchParams(obj).toString();

        }

    });

    //=========================================================
    // Header
    //=========================================================

    Utils.Header = Object.freeze({

        merge(...headers) {

            return Object.assign(

                {},

                ...headers.filter(Boolean)

            );

        },

        antiForgery() {

            const cfg =
                Tech.Config.get('antiForgery');

            if (!cfg.enabled) {
                return null;
            }

            if (form) {

                const input = form.querySelector(
                    `input[name="${cfg.fieldName}"]`
                );

                if (input) {
                    return input.value;
                }

            }

            const globalInput = document.querySelector(
                `input[name="${cfg.fieldName}"]`
            );

            return globalInput?.value ?? null;

        }

    });

    //=========================================================
    // Async
    //=========================================================

    Utils.Async = Object.freeze({

        delay(ms) {

            return new Promise(resolve =>
                setTimeout(resolve, ms));

        },

        debounce(fn, delay = 300) {

            let timer;

            return (...args) => {

                clearTimeout(timer);

                timer = setTimeout(() =>
                    fn(...args), delay);

            };

        },

        throttle(fn, limit = 300) {

            let waiting = false;

            return (...args) => {

                if (waiting)
                    return;

                waiting = true;

                fn(...args);

                setTimeout(() => {

                    waiting = false;

                }, limit);

            };

        }

    });

    Object.freeze(Utils);

    Tech.Utils = Utils;

})(window);