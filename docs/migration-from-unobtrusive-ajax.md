# Migration from jQuery Unobtrusive AJAX

This guide explains how to migrate an ASP.NET Core MVC application from **jQuery Unobtrusive AJAX** (`jquery-ajax-unobtrusive`) to **Tech.js**.

Tech.js keeps the familiar declarative `data-*` approach while removing the jQuery dependency and introducing a modern Fetch API-based request pipeline.

---

# Why migrate?

`jquery-ajax-unobtrusive` has been widely used in ASP.NET MVC applications for years. It provides a simple way to submit forms and update partial views without full page reloads.

Tech.js follows the same philosophy but provides a more modern architecture.

| jQuery Unobtrusive AJAX        | Tech.js                           |
| ------------------------------ | --------------------------------- |
| Requires jQuery + plugin       | No jQuery dependency              |
| Callback-based lifecycle       | Event-driven Promise pipeline     |
| Limited request control        | Pipeline-based request processing |
| Manual loading handling        | Built-in loading management       |
| Browser confirm dialog         | Custom confirmation provider      |
| Manual partial update handling | Built-in target and swap system   |
| No modern navigation support   | History API integration           |
| Rebind scripts after updates   | Automatic handler activation      |

---

# Migration Overview

The migration process consists of:

1. Remove jQuery AJAX dependencies
2. Add Tech.js
3. Replace AJAX attributes
4. Replace callbacks with events
5. Configure target replacement
6. Update loading and confirmation behavior
7. Test partial view responses

---

# 1. Remove jQuery Unobtrusive AJAX

Remove the old scripts:

```html
<script src="~/lib/jquery/dist/jquery.min.js"></script>
<script src="~/lib/jquery-ajax-unobtrusive/jquery.unobtrusive-ajax.min.js"></script>
```

If jQuery is only used for AJAX, it can now be completely removed.

---

# 2. Add Tech.js

Add Tech.js to your application:

```html
<script src="~/js/tech.js"></script>
```

Initialize Tech.js:

```javascript
Tech.bootstrap();
```

A typical ASP.NET Core layout:

```html
<body>

    @RenderBody()

    <script src="~/js/tech.js"></script>

    <script>
        Tech.bootstrap();
    </script>

</body>
```

---

# 3. Attribute Migration

## Form Submission

### Before: jQuery Unobtrusive AJAX

```html
<form
    data-ajax="true"
    data-ajax-method="POST"
    data-ajax-url="/User/Create"
    data-ajax-update="#result">

    <input name="username">

    <button type="submit">
        Save
    </button>

</form>
```

---

### After: Tech.js

```html
<form
    data-tech="form"
    data-tech-method="POST"
    data-tech-url="/User/Create"
    data-tech-target="#result">

    <input name="username">

    <button type="submit">
        Save
    </button>

</form>
```

---

# Attribute Mapping

| jQuery Unobtrusive AJAX | Tech.js               |
| ----------------------- | --------------------- |
| `data-ajax="true"`      | `data-tech="form"`    |
| `data-ajax-url`         | `data-tech-url`       |
| `data-ajax-method`      | `data-tech-method`    |
| `data-ajax-update`      | `data-tech-target`    |
| `data-ajax-mode`        | `data-tech-swap`      |
| `data-ajax-loading`     | `data-tech-loading`   |
| `data-ajax-confirm`     | `data-tech-confirm`   |
| `data-ajax-begin`       | `tech:before` event   |
| `data-ajax-success`     | `tech:success` event  |
| `data-ajax-failure`     | `tech:error` event    |
| `data-ajax-complete`    | `tech:complete` event |

---

# 4. Partial View Replacement

One of the main reasons developers use Unobtrusive AJAX is replacing partial views.

## Before

```html
<div id="users">
</div>


<form
    data-ajax="true"
    data-ajax-update="#users"
    data-ajax-mode="replace">

</form>
```

---

## After

```html
<div id="users">
</div>


<form
    data-tech="form"
    data-tech-target="#users"
    data-tech-swap="outer">

</form>
```

---

# Swap Modes

Tech.js supports different replacement strategies:

| Mode     | Description                |
| -------- | -------------------------- |
| `inner`  | Replace element content    |
| `outer`  | Replace the element itself |
| `before` | Insert before target       |
| `after`  | Insert after target        |

Example:

```html
<form
    data-tech="form"
    data-tech-target="#messages"
    data-tech-swap="before">
</form>
```

---

# 5. Callback Migration

jQuery Unobtrusive AJAX uses callback functions:

## Before

```html
<form
    data-ajax="true"
    data-ajax-success="successHandler"
    data-ajax-failure="errorHandler">
</form>
```

JavaScript:

```javascript
function successHandler(result)
{
    console.log(result);
}


function errorHandler(error)
{
    console.log(error);
}
```

---

## After

Tech.js uses lifecycle events:

```javascript
Tech.Dispatcher.on(
    "tech:success",
    function(event)
    {
        console.log(event);
    }
);


Tech.Dispatcher.on(
    "tech:error",
    function(event)
    {
        console.log(event);
    }
);
```

---

# 6. Loading Indicator Migration

## Before

```html
<form
    data-ajax="true"
    data-ajax-loading="#spinner">
</form>
```

---

## After

```html
<form
    data-tech="form"
    data-tech-loading="#spinner">
</form>
```

Example:

```html
<div id="spinner" hidden>
    Loading...
</div>
```

Tech.js manages the loading lifecycle automatically.

---

# 7. Confirmation Migration

## Before

```html
<button
    data-ajax-confirm="Are you sure?">
Delete
</button>
```

---

## After

```html
<button
    data-tech="button"
    data-tech-confirm="Are you sure?">
Delete
</button>
```

Tech.js supports a customizable confirmation provider.

Unlike the default browser:

```javascript
window.confirm()
```

applications can provide their own dialog implementation.

Example integrations:

* Bootstrap Modal
* Custom Dialog Component
* Application Notification System

---

# 8. Anti-Forgery Token

ASP.NET Core applications should continue using antiforgery protection.

Example:

```html
<form
    data-tech="form">

    @Html.AntiForgeryToken()

    <input name="title">

    <button>
        Save
    </button>

</form>
```

Tech.js sends form data using the standard browser form behavior.

---

# 9. Link Migration

jQuery AJAX often uses links with custom JavaScript.

Before:

```html
<a href="/Products"
   data-ajax="true"
   data-ajax-update="#content">
Products
</a>
```

After:

```html
<a href="/Products"
   data-tech="link"
   data-tech-target="#content">
Products
</a>
```

---

# 10. Button Actions

Before:

```html
<button onclick="loadData()">
Load
</button>
```

After:

```html
<button
    data-tech="button"
    data-tech-url="/Dashboard/Load">

Load
</button>
```

---

# 11. Server Side Changes

Usually no controller changes are required.

Existing MVC actions can remain:

```csharp
public IActionResult Create(UserModel model)
{
    return PartialView("_UserResult", model);
}
```

Tech.js consumes the returned HTML response and updates the target element.

---

# 12. Migration Checklist

Use this checklist during migration:

* [ ] Remove `jquery.unobtrusive-ajax`
* [ ] Add Tech.js
* [ ] Initialize Tech.js
* [ ] Replace `data-ajax` attributes
* [ ] Replace callbacks with events
* [ ] Configure `data-tech-target`
* [ ] Configure `data-tech-swap`
* [ ] Replace loading attributes
* [ ] Replace confirmation behavior
* [ ] Test partial views
* [ ] Test validation responses

---

# Common Migration Issues

## Nothing happens after clicking submit

Check:

* Tech.js loaded correctly
* `Tech.bootstrap()` executed
* Element contains `data-tech`

---

## Target is not updated

Check:

```html
data-tech-target="#element"
```

and verify the selector exists.

---

## Scripts inside partial views do not execute

Avoid putting initialization scripts inside partial views.

Use Tech.js lifecycle events:

```javascript
Tech.Dispatcher.on(
    "tech:complete",
    function(){
        // initialize components
    }
);
```

---

# Summary

Migrating from jQuery Unobtrusive AJAX to Tech.js does not require rewriting your MVC application.

The migration mainly consists of:

* Replacing attributes
* Moving callbacks to events
* Using Tech.js target and swap features
* Removing the jQuery AJAX dependency

Tech.js provides the same declarative development style with a modern Fetch API architecture.
