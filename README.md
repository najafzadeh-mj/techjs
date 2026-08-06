# Tech.js

**A lightweight Attribute-Based Fetch Library for ASP.NET Core MVC**

Tech.js is a small, dependency-free JavaScript library that brings AJAX interactions to ASP.NET Core MVC applications using simple HTML attributes. It is inspired by the idea of declarative UI behavior while staying minimal and framework-agnostic.

---

## Features

* Attribute-based AJAX requests
* Form, link, button and custom trigger handlers
* Bootstrap confirmation modal
* Loading indicator support
* Partial HTML swap (`inner`, `outer`, `before`, `after`)
* Automatic re-initialization after partial updates
* Browser History API (`pushState` / `replaceState`)
* ASP.NET Core unobtrusive validation integration
* Global toast notifications
* Server-side message extraction from JSON responses

---

## Installation

Clone the repository:

```bash
git clone https://github.com/najafzadeh-mj/techjs.git
```

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Include the generated file in your ASP.NET Core layout:

```html
<script src="/js/tech.js"></script>
```

---

## Quick Start

### AJAX Form

```html
<form data-tech
      data-tech-method="POST"
      data-tech-url="/User/Save"
      data-tech-notify="true">

    <input name="name" />

    <button type="submit">
        Save
    </button>

</form>
```

### ASP.NET Core Controller

```csharp
[HttpPost]
public IActionResult Save(UserVm model)
{
    return Json(new
    {
        success = true,
        message = "User saved successfully"
    });
}
```

When the request succeeds, Tech.js automatically shows a Bootstrap toast with the server message.

---

## Partial Update

```html
<div id="content"></div>

<a data-tech
   data-tech-url="/Products/List"
   data-tech-target="#content"
   data-tech-swap="inner">

   Load Products

</a>
```

---

## Confirmation Dialog

```html
<button data-tech
        data-tech-url="/User/Delete/5"
        data-tech-method="POST"
        data-tech-confirm="Are you sure?">

    Delete

</button>
```

If Bootstrap is available, a Bootstrap modal is used; otherwise `window.confirm()` is used as a fallback.

---

## Loading Indicator

```html
<form data-tech
      data-tech-loading=".spinner">

    <button type="submit">
        Save
        <span class="spinner d-none">Loading...</span>
    </button>

</form>
```

---

## Browser History

```html
<a data-tech
   data-tech-url="/Products?page=2"
   data-tech-target="#content"
   data-tech-push-url="true">

   Next Page

</a>
```

---

## Validation Integration

Tech.js automatically works with **jQuery Validate** and **jQuery Unobtrusive Validation** if they are loaded on the page. Invalid forms are not submitted via AJAX.

---

## Notification Modes

```html
data-tech-notify="true"      // success and error
data-tech-notify="success"   // success only
data-tech-notify="error"     // error only
```

---

## API

### Manual Notifications

```javascript
Tech.Notify.success("Saved");
Tech.Notify.error("Delete failed");
Tech.Notify.warning("Check your input");
Tech.Notify.info("Done");
```

### Events

```javascript
document.addEventListener("tech:success", function (e) {
    console.log(e.detail);
});
```

Available events:

* `tech:before`
* `tech:success`
* `tech:error`
* `tech:complete`
* `tech:loadingStart`
* `tech:loadingEnd`
* `tech:partialLoaded`

---

## Requirements

* Modern browser with Fetch API support
* ASP.NET Core MVC (recommended)
* Bootstrap 5 (optional, for modal and toast UI)
* jQuery Validate + Unobtrusive Validation (optional)

---

## Project Status

Current milestone: **v1.0.0-beta**

Tech.js is actively evolving toward a stable v1 release focused on ASP.NET Core MVC applications.

---

## License

MIT License

Copyright (c) 2026
