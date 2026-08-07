# Tech.js Feature Catalog (v1.0.0-beta)

## Core AJAX

| Attribute          | Description                                 |
| ------------------ | ------------------------------------------- |
| `data-tech`        | Enables Tech.js behavior on the element     |
| `data-tech-url`    | Request URL                                 |
| `data-tech-method` | HTTP method                                 |
| `data-tech-target` | Target element selector for partial updates |

---

## Swap Modes

| Value    | Behavior             |
| -------- | -------------------- |
| `inner`  | Replace `innerHTML`  |
| `outer`  | Replace `outerHTML`  |
| `before` | Insert before target |
| `after`  | Insert after target  |

Example:

```html
<div id="content"></div>

<a data-tech
   data-tech-url="/Products/List"
   data-tech-target="#content"
   data-tech-swap="inner">
   Load
</a>
```

---

## Confirmation

| Attribute           | Description                         |
| ------------------- | ----------------------------------- |
| `data-tech-confirm` | Confirmation message before request |

Uses Bootstrap modal when available, otherwise falls back to `window.confirm()`.

---

## Loading State

| Attribute           | Description                                      |
| ------------------- | ------------------------------------------------ |
| `data-tech-loading` | Selector of loading indicator inside the element |

Example:

```html
<form data-tech data-tech-loading=".spinner">
    <button type="submit">
        Save
        <span class="spinner d-none">Loading...</span>
    </button>
</form>
```

---

## Notifications

| Value     | Behavior                        |
| --------- | ------------------------------- |
| `true`    | Success and error notifications |
| `success` | Success only                    |
| `error`   | Error only                      |
| `none`    | Disable notifications           |

Example:

```html
<button data-tech
        data-tech-url="/User/Save"
        data-tech-method="POST"
        data-tech-notify="true">
    Save
</button>
```

Server response:

```json
{
  "message": "User saved successfully"
}
```

---

## Error Target

| Attribute                | Description                            |
| ------------------------ | -------------------------------------- |
| `data-tech-error-target` | Selector used to render request errors |

Example:

```html
<div id="errors" class="alert alert-danger d-none"></div>

<form data-tech
      data-tech-error-target="#errors">
</form>
```

---

## Browser History

| Attribute               | Description              |
| ----------------------- | ------------------------ |
| `data-tech-push-url`    | `history.pushState()`    |
| `data-tech-replace-url` | `history.replaceState()` |

Example:

```html
<a data-tech
   data-tech-url="/Products?page=2"
   data-tech-target="#content"
   data-tech-push-url="true">
   Next Page
</a>
```

---

## Validation

Tech.js automatically integrates with:

* jQuery Validate
* jQuery Unobtrusive Validation

Invalid forms are not submitted.

---

## Callback Attributes

| Attribute            | Description           |
| -------------------- | --------------------- |
| `data-tech-begin`    | Called before request |
| `data-tech-success`  | Called on success     |
| `data-tech-error`    | Called on error       |
| `data-tech-complete` | Called after request  |

Example:

```html
<form data-tech
      data-tech-begin="onBegin"
      data-tech-success="onSuccess"
      data-tech-error="onError"
      data-tech-complete="onComplete">
</form>
```

```javascript
function onBegin(ctx) {
    console.log(ctx.options.url);
}

function onSuccess(ctx) {
    console.log(ctx.response);
}
```

Returning `false` from `onBegin` cancels the request.

---

## Script Execution After Swap

| Attribute                   | Description                              |
| --------------------------- | ---------------------------------------- |
| `data-tech-execute-scripts` | Executes script tags inside swapped HTML |

Example:

```html
<a data-tech
   data-tech-url="/Home/Partial"
   data-tech-target="#result"
   data-tech-execute-scripts="true">
   Load Partial
</a>
```

---

## Automatic Partial Re-Initialization

After any successful HTML swap, Tech.js automatically refreshes registered handlers, so newly injected forms, links and buttons become active without manual rebinding.

---

## Security

Tech.js automatically sends ASP.NET Core anti-forgery tokens when available:

```html
<form data-tech>
    @Html.AntiForgeryToken()
</form>
```

Header sent:

```text
RequestVerificationToken: {token}
```

Compatible with `[ValidateAntiForgeryToken]`.

---

## DOM Events

| Event                | Description         |
| -------------------- | ------------------- |
| `tech:before`        | Before request      |
| `tech:success`       | Request succeeded   |
| `tech:error`         | Request failed      |
| `tech:complete`      | Request finished    |
| `tech:loadingStart`  | Loading started     |
| `tech:loadingEnd`    | Loading finished    |
| `tech:partialLoaded` | HTML swap completed |

Example:

```javascript
document.addEventListener("tech:success", function (e) {
    console.log(e.detail);
});
```

---

## Manual Notification API

```javascript
Tech.Notify.success("Saved");
Tech.Notify.error("Delete failed");
Tech.Notify.warning("Check your input");
Tech.Notify.info("Done");
```

---

## Current Status

**Version:** `v1.0.0-beta`

Tech.js is currently focused on ASP.NET Core MVC applications and is actively evolving toward a stable v1 release.
