# Troubleshooting

This document lists the most common issues when using **Tech.js** with ASP.NET Core MVC.

---

# `Tech is not defined`

## Cause

`tech.js` was loaded after your custom script.

## Fix

```html
<script src="~/js/tech.js"></script>
<script src="~/js/site.js"></script>
```

---

# Request Is Not Sent

## Checklist

* The element has `data-tech`
* The element is inside the DOM
* No JavaScript error exists in the console
* `data-tech-begin` does not return `false`

---

# Full Page Reload Happens

## Cause

Tech.js did not initialize the element.

## Fix

Check that the element contains:

```html
<form data-tech>
```

and that `tech.js` is loaded successfully.

---

# Validation Does Not Prevent Submission

## Cause

Validation scripts are missing.

## Fix

Include:

```html
<script src="~/lib/jquery/dist/jquery.min.js"></script>
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
```

---

# 400 Bad Request with `[ValidateAntiForgeryToken]`

## Cause

The anti-forgery token is missing.

## Fix

Add:

```html
@Html.AntiForgeryToken()
```

inside the form.

---

# Bootstrap Confirm Modal Does Not Appear

## Cause

Bootstrap JavaScript is not loaded.

## Fix

```html
<script src="~/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
```

Tech.js will fall back to `window.confirm()` if Bootstrap is unavailable.

---

# Toast Notifications Do Not Appear

## Checklist

* Bootstrap is loaded
* `data-tech-notify` is enabled
* The server returns a JSON `message`

Example:

```json
{
  "message": "Saved successfully"
}
```

---

# Partial HTML Updates but Buttons Do Not Work

Tech.js automatically refreshes its own handlers. If third-party widgets stop working, reinitialize them after `tech:partialLoaded`.

```javascript
document.addEventListener('tech:partialLoaded', function (e) {

    initWidgets(e.detail.target);

});
```

---

# Validation Stops Working After Partial Update

Reparse unobtrusive validation:

```javascript
document.addEventListener('tech:partialLoaded', function (e) {

    if (window.jQuery && $.validator && $.validator.unobtrusive) {

        $.validator.unobtrusive.parse(e.detail.target);

    }

});
```

---

# Script Inside Partial View Does Not Execute

Script execution is disabled by default.

Enable it explicitly:

```html
<div data-tech-execute-scripts="true"></div>
```

Use only with trusted server-generated HTML.

---

# Callback Is Not Called

Correct:

```html
<form data-tech data-tech-success="onSaveSuccess"></form>

<script>
function onSaveSuccess() {}
</script>
```

Incorrect:

```html
<form data-tech data-tech-success="onSaveSuccess"></form>

<script>
const onSaveSuccess = () => {};
</script>
```

Functions declared with `const` are not automatically added to `window`.

---

# Error Appears Both in Toast and Error Target

If you use:

```html
data-tech-error-target="#errors"
```

Tech.js suppresses the toast automatically. Ensure the attribute is present on the same element that triggers the request.

---

# Network Request Never Finishes

Check:

* browser Network tab
* server logs
* timeout configuration

Increase timeout if necessary:

```javascript
Tech.Config.merge({
  timeout: 60000
});
```

---

# Debugging Helper

Log all Tech.js events:

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

This is the fastest way to inspect the request lifecycle.

---

# Still Having Problems?

Please include:

* browser name and version
* ASP.NET Core version
* HTML snippet
* JavaScript console error
* Network request screenshot (if possible)
