# Events

Tech.js exposes a set of DOM events that allow you to react to different stages of the AJAX lifecycle without using callback attributes.

All events are dispatched on the source element (form, link, button, or trigger) and bubble through the document.

---

# Listening to Events

```javascript
document.addEventListener('tech:success', function (e) {
    console.log(e.detail);
});
```

You can also listen on a specific element:

```javascript
const form = document.getElementById('userForm');

form.addEventListener('tech:error', function (e) {
    console.log(e.detail);
});
```

---

# Event List

| Event                | Description                                 |
| -------------------- | ------------------------------------------- |
| `tech:before`        | Fired before the request is sent            |
| `tech:loadingStart`  | Fired when loading starts                   |
| `tech:success`       | Fired when the request succeeds             |
| `tech:error`         | Fired when the request fails                |
| `tech:loadingEnd`    | Fired when loading finishes                 |
| `tech:complete`      | Fired after success or error                |
| `tech:partialLoaded` | Fired after HTML is swapped into the target |

---

# Lifecycle Order

For a successful request:

```text
tech:before
tech:loadingStart
tech:success
tech:loadingEnd
tech:complete
```

For a failed request:

```text
tech:before
tech:loadingStart
tech:error
tech:loadingEnd
tech:complete
```

If the response performs a partial HTML update, `tech:partialLoaded` is fired immediately after the swap.

---

# tech:before

Triggered before the request is sent.

## Detail

```javascript
{
  element,
  options
}
```

## Example

```javascript
document.addEventListener('tech:before', function (e) {

    console.log('Request starting');

    console.log(e.detail.options.url);

});
```

---

# tech:loadingStart

Triggered when loading begins.

## Detail

```javascript
null
```

## Example

```javascript
document.addEventListener('tech:loadingStart', function (e) {

    e.target.classList.add('is-loading');

});
```

---

# tech:success

Triggered when the request succeeds.

## Detail

```javascript
{
  element,
  response
}
```

## Example

```javascript
document.addEventListener('tech:success', function (e) {

    console.log('Success');

    console.log(e.detail.response);

});
```

---

# tech:error

Triggered when the request fails.

## Detail

```javascript
{
  element,
  error
}
```

## Example

```javascript
document.addEventListener('tech:error', function (e) {

    console.error('Request failed');

    console.error(e.detail.error);

});
```

---

# tech:loadingEnd

Triggered when loading finishes, regardless of success or failure.

## Detail

```javascript
null
```

## Example

```javascript
document.addEventListener('tech:loadingEnd', function (e) {

    e.target.classList.remove('is-loading');

});
```

---

# tech:complete

Triggered after the request pipeline has fully completed.

## Detail

```javascript
{
  element
}
```

## Example

```javascript
document.addEventListener('tech:complete', function (e) {

    console.log('Request completed');

});
```

---

# tech:partialLoaded

Triggered after partial HTML has been inserted into the target element.

## Detail

```javascript
{
  target,
  html,
  mode
}
```

* `target`: the updated DOM element
* `html`: the inserted HTML string
* `mode`: swap mode (`inner`, `outer`, `before`, `after`)

## Example

```javascript
document.addEventListener('tech:partialLoaded', function (e) {

    console.log('Partial loaded');

    console.log(e.detail.target);

    console.log(e.detail.mode);

});
```

This event is useful for initializing third-party widgets after a partial update.

---

# Practical Examples

## Analytics

```javascript
document.addEventListener('tech:success', function (e) {

    if (window.gtag) {

        gtag('event', 'tech_request_success', {

            url: e.detail.response.url

        });

    }

});
```

---

## Global Error Logging

```javascript
document.addEventListener('tech:error', function (e) {

    fetch('/log/client-error', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            message: e.detail.error?.message,

            stack: e.detail.error?.stack

        })

    });

});
```

---

## Reinitialize a Widget After Partial Update

```javascript
document.addEventListener('tech:partialLoaded', function (e) {

    const target = e.detail.target;

    target.querySelectorAll('.datepicker')
        .forEach(initDatePicker);

});
```

---

# Event Delegation

Because events bubble, you can register a single global listener:

```javascript
document.addEventListener('tech:success', function (e) {

    if (e.target.matches('form[data-tech]')) {

        console.log('A Tech.js form succeeded');

    }

});
```

This is usually more efficient than attaching listeners to every element individually.

---

# Relationship with Callback Attributes

Tech.js supports both DOM events and attribute callbacks.

| Attribute Callback   | Equivalent Event |
| -------------------- | ---------------- |
| `data-tech-begin`    | `tech:before`    |
| `data-tech-success`  | `tech:success`   |
| `data-tech-error`    | `tech:error`     |
| `data-tech-complete` | `tech:complete`  |

Use **events** when you want centralized behavior and **callbacks** when the logic is specific to a single element.

---

# Debugging All Events

A simple development helper:

```javascript
[
    'tech:before',
    'tech:loadingStart',
    'tech:success',
    'tech:error',
    'tech:loadingEnd',
    'tech:complete',
    'tech:partialLoaded'
].forEach(function (name) {

    document.addEventListener(name, function (e) {

        console.log(name, e.detail);

    });

});
```

This prints the entire Tech.js event lifecycle to the browser console.

---

# Related Documentation

* [Callbacks](./callbacks.md)
* [Attributes](./attributes.md)
* [Getting Started](./getting-started.md)
