# techjs
A lightweight attribute-based Fetch/Ajax library for modern web applications

# Tech.js

> A lightweight attribute-based Fetch/Ajax library for modern web applications.

Tech.js is a tiny, dependency-free JavaScript library that enables **AJAX interactions directly from HTML attributes**. It is inspired by the simplicity of HTML-first development while keeping full control in your hands.

```html
<form data-tech method="post" action="/Home/Save" data-tech-target="#result">
    <input name="name" value="Ali">
    <button type="submit">Save</button>
</form>

<div id="result"></div>
```

No jQuery. No framework. No boilerplate JavaScript.

---

## Features

* **Attribute-based AJAX**
* **Zero dependencies**
* **Vanilla JavaScript**
* **Form, Link, Button, and Trigger handlers**
* **Automatic FormData support**
* **Query string generation**
* **JSON and form-urlencoded support**
* **Partial HTML rendering**
* **Custom event system**
* **Lightweight build**
* **ASP.NET Core MVC friendly**

---

## Why Tech.js?

Traditional AJAX often requires repetitive JavaScript:

```javascript
fetch('/Home/Save', {
    method: 'POST',
    body: new FormData(document.querySelector('#frm'))
}).then(r => r.text())
  .then(html => {
      document.querySelector('#result').innerHTML = html;
  });
```

With Tech.js, the same behaviour is expressed declaratively in HTML:

```html
<form data-tech action="/Home/Save" method="post" data-tech-target="#result">
    ...
</form>
```

---

# Installation

## Download

Download the latest release from GitHub and include:

```html
<script src="/lib/techjs/tech.min.js"></script>
```

## Build from source

```bash
git clone https://github.com/your-username/techjs.git
cd techjs
npm install
npm run build
```

Generated files:

```
dist/
├── tech.js
├── tech.min.js
└── tech.min.js.map
```

---

# Quick Start

## ASP.NET Core MVC Example

### Controller

```csharp
[HttpPost]
public IActionResult Save(string name)
{
    return Content($"<h3>Hello {name}</h3>", "text/html");
}
```

### View

```html
<form data-tech method="post" action="/Home/Save" data-tech-target="#result">
    <input name="name" value="Ali">
    <button type="submit">Save</button>
</form>

<div id="result"></div>
```

Result: The page does **not refresh**, and the response is injected into `#result`.

---

# Core Attributes

| Attribute             | Description                     |
| --------------------- | ------------------------------- |
| `data-tech`           | Enables Tech.js behaviour       |
| `data-tech-url`       | Request URL                     |
| `data-tech-method`    | HTTP method                     |
| `data-tech-target`    | Target element selector         |
| `data-tech-swap`      | Swap strategy                   |
| `data-tech-confirm`   | Confirmation dialog             |
| `data-tech-trigger`   | Custom trigger event            |
| `data-tech-data`      | Inline JSON data                |
| `data-tech-data-form` | Include another form            |
| `data-tech-source`    | Include inputs from a container |
| `data-tech-encoding`  | `json` or default form encoding |

---

# Handlers

## Form Handler

```html
<form data-tech action="/Save" method="post" data-tech-target="#result">
    ...
</form>
```

## Link Handler

```html
<a data-tech href="/Products/List" data-tech-target="#result">
    Load products
</a>
```

## Button Handler

```html
<button
    data-tech
    data-tech-url="/Save"
    data-tech-method="post"
    data-tech-target="#result">
    Save
</button>
```

## Trigger Handler

```html
<input
    data-tech-trigger="keyup"
    data-tech-url="/Search"
    data-tech-target="#result">
```

---

# Data System

## Inline JSON

```html
<button
    data-tech
    data-tech-url="/Save"
    data-tech-method="post"
    data-tech-data='{"mode":"draft"}'>
</button>
```

## Include another form

```html
<a
    data-tech
    href="/Search"
    data-tech-data-form="#filterForm">
</a>
```

## Include a container

```html
<button
    data-tech
    data-tech-url="/Save"
    data-tech-source="#card">
</button>
```

---

# Swap Modes

| Value         | Behaviour                   |
| ------------- | --------------------------- |
| `inner`       | Replace innerHTML (default) |
| `outer`       | Replace element             |
| `beforebegin` | Insert before element       |
| `afterbegin`  | Insert at beginning         |
| `beforeend`   | Insert at end               |
| `afterend`    | Insert after element        |

Example:

```html
<div id="result"></div>

<a
    data-tech
    href="/Items"
    data-tech-target="#result"
    data-tech-swap="beforeend">
    Append items
</a>
```

---

# Events

Tech.js dispatches custom DOM events.

```javascript
document.addEventListener('tech:success', function (e) {
    console.log('Request completed', e.detail);
});
```

Available events:

* `tech:before`
* `tech:loadingStart`
* `tech:success`
* `tech:error`
* `tech:loadingEnd`
* `tech:complete`

---

# Configuration

```javascript
Tech.Config.set('baseUrl', '/api');
Tech.Config.set('timeout', 10000);
Tech.Config.set('debug', true);
```

Read configuration:

```javascript
const timeout = Tech.Config.get('timeout');
```

---

# Browser Support

Tech.js targets modern browsers supporting:

* Fetch API
* FormData
* URLSearchParams
* CustomEvent
* ES2018+

---

# Project Structure

```
src/
├── core/
├── network/
├── engine/
├── handlers/
└── tech.bootstrap.js
```

---

# Build

```bash
npm run build
```

Watch mode:

```bash
npm run watch
```

---

# Roadmap

## Version 1.0

* [x] Form handler
* [x] Link handler
* [x] Button handler
* [x] Trigger handler
* [x] Request pipeline
* [x] Response swap
* [x] Event system
* [x] Build system

## Version 1.1

* [ ] Debounced triggers (`keyup:500`)
* [ ] Polling
* [ ] IntersectionObserver triggers
* [ ] Middleware API
* [ ] Plugin system
* [ ] TypeScript definitions

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

Please keep the library lightweight and framework-independent.

---

# License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for details.

---

# Acknowledgements

Tech.js is inspired by the idea that **HTML should remain expressive and interactive without requiring heavy front-end frameworks**.

---

# Maintainers

Created and maintained by **Majid Najafzadeh** with the help of **OpenAI ChatGPT**.

---

If Tech.js helps your project, please consider giving it a **⭐ star on GitHub**.
