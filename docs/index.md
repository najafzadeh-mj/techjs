# Tech.js Documentation

Welcome to **Tech.js** documentation.

Tech.js is a lightweight **Attribute-Based Fetch Library** designed for ASP.NET Core MVC applications. It provides a clean way to handle AJAX interactions using HTML attributes without writing repetitive JavaScript code.

## Overview

Tech.js allows developers to build modern AJAX-driven pages using declarative HTML:

```html
<form data-tech="form" 
      data-tech-url="/Account/Login"
      data-tech-method="POST">
</form>
```

Instead of manually writing:

```javascript
fetch(url, options)
    .then(...)
    .catch(...);
```

Tech.js handles:

* Request lifecycle
* Event dispatching
* Loading states
* Error handling
* Success callbacks
* Form submissions
* Link actions
* Button triggers

---

# Features

## Attribute-Based Programming

Tech.js uses HTML attributes as the main configuration layer.

Examples:

```html
data-tech="form"
data-tech-target="#result"
data-tech-swap="inner"
data-tech-confirm="Are you sure?"
data-tech-loading="#loader"
```

---

## Supported Handlers

Current handlers:

| Handler         | Description                 |
| --------------- | --------------------------- |
| Form Handler    | AJAX form submission        |
| Link Handler    | AJAX navigation links       |
| Button Handler  | AJAX button actions         |
| Trigger Handler | Custom event based requests |

---

# Architecture

Tech.js is built with a modular engine architecture.

Main components:

```
Tech
 |
 +-- Bootstrap
 |
 +-- Scanner
 |
 +-- Registry
 |
 +-- Engine
 |
 +-- Dispatcher
 |
 +-- Pipeline
 |
 +-- Request
 |
 +-- Response
 |
 +-- Handlers
```

## Core Flow

```
HTML Element
      |
      v
Scanner
      |
      v
Registry
      |
      v
Handler
      |
      v
Engine
      |
      v
Pipeline
      |
      v
Fetch Request
      |
      v
Response Processing
```

---

# Installation

Include Tech.js after your application scripts:

```html
<script src="tech.js"></script>
```

Initialize:

```javascript
Tech.bootstrap();
```

---

# Basic Usage

## AJAX Form

```html
<form 
    data-tech="form"
    data-tech-url="/Home/Test"
    data-tech-method="POST">

    <input name="title" />

    <button type="submit">
        Submit
    </button>

</form>
```

---

## Target Replacement

```html
<form
    data-tech="form"
    data-tech-target="#content"
    data-tech-swap="inner">
</form>
```

Supported swap modes:

* inner
* outer
* before
* after

---

# Events

Tech.js provides lifecycle events:

```javascript
Tech.Dispatcher.on(
    "tech:success",
    function(event){
        console.log(event);
    }
);
```

Available events:

| Event             | Description         |
| ----------------- | ------------------- |
| tech:before       | Before request      |
| tech:loadingStart | Loading started     |
| tech:loadingEnd   | Loading finished    |
| tech:success      | Successful response |
| tech:error        | Request error       |
| tech:complete     | Request completed   |

---

# Confirmation Dialog

Tech.js supports custom confirmation dialogs:

```html
<button
 data-tech="button"
 data-tech-confirm="Delete item?">
Delete
</button>
```

The confirmation provider can be integrated with Bootstrap dialogs.

---

# Loading Indicator

Example:

```html
<button
 data-tech="button"
 data-tech-loading="#loading">
Save
</button>
```

---

# ASP.NET Core MVC Integration

Tech.js is designed for ASP.NET Core MVC applications.

Example:

```csharp
public IActionResult Test()
{
    return PartialView("_Result");
}
```

The returned HTML can automatically replace a target element.

---

# Roadmap

Planned improvements:

* Advanced validation integration
* File upload support
* Retry policies
* Request cancellation
* Plugin system
* Better TypeScript support

---

# Contributing

Contributions are welcome.

Before submitting changes:

1. Keep architecture consistency.
2. Add documentation for new features.
3. Keep version 1 lightweight.

---

# License

See LICENSE file for details.
