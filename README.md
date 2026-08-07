# Tech.js

## Lightweight Attribute-Based Fetch Library

Tech.js is a lightweight JavaScript library for building AJAX-powered applications using HTML attributes.

Designed especially for **ASP.NET Core MVC**, Tech.js removes repetitive JavaScript request code and provides a clean declarative approach.

---

## Why Tech.js?

Traditional AJAX code usually requires:

* Writing JavaScript for every request
* Managing loading states manually
* Handling errors repeatedly
* Updating DOM manually

Tech.js changes this approach.

Instead of:

```javascript
fetch("/Home/Test", {
    method: "POST"
})
.then(...)
```

You write:

```html
<form 
    data-tech="form"
    data-tech-url="/Home/Test"
    data-tech-method="POST">
</form>
```

Tech.js manages the request lifecycle.

---

# Features

* Attribute-Based API
* Fetch API powered
* Modular architecture
* Request pipeline
* Event-driven lifecycle
* Loading management
* Confirmation dialogs
* DOM swap support
* ASP.NET Core MVC friendly

---

# Quick Example

```html
<form
    data-tech="form"
    data-tech-url="/User/Create"
    data-tech-method="POST"
    data-tech-target="#result">

    <input name="username">

    <button type="submit">
        Save
    </button>

</form>

<div id="result"></div>
```

No custom JavaScript required.

---

# Architecture

Tech.js uses an Engine-Based architecture:

```
Bootstrap
    |
Scanner
    |
Registry
    |
Engine
    |
Pipeline
    |
Request
    |
Response
```

Each feature is isolated and extendable.

---

# Installation

Add Tech.js:

```html
<script src="tech.js"></script>
```

Initialize:

```javascript
Tech.bootstrap();
```

---

# Documentation

Complete documentation:

📚 [Documentation](docs/index.md)

---

# Current Version

Version: **1.0.0**

Tech.js version 1 focuses on:

* Stability
* Simple API
* Clean architecture
* Production readiness

---

# Supported Attributes

| Attribute         | Purpose              |
| ----------------- | -------------------- |
| data-tech         | Select handler       |
| data-tech-url     | Request URL          |
| data-tech-method  | HTTP method          |
| data-tech-target  | DOM target           |
| data-tech-swap    | Replace strategy     |
| data-tech-loading | Loading element      |
| data-tech-confirm | Confirmation message |

---

# Events

Tech.js exposes lifecycle events:

```
tech:before
tech:loadingStart
tech:loadingEnd
tech:success
tech:error
tech:complete
```

---

# Supported Handlers

| Handler | Usage           |
| ------- | --------------- |
| form    | AJAX forms      |
| link    | AJAX links      |
| button  | AJAX buttons    |
| trigger | Custom requests |

---

# Project Status

Tech.js is currently in active development.

The first release focuses on a reliable core engine before adding advanced features.

---

# Contributing

Pull requests are welcome.

Please keep contributions aligned with:

* Lightweight design
* Modular architecture
* Backward compatibility

---

# License

MIT License
