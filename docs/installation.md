# Installation

This guide explains how to install and use **Tech.js** in an ASP.NET Core MVC application.

---

# Requirements

* Node.js 18+
* npm
* ASP.NET Core MVC application

---

# Clone the Repository

```bash
git clone https://github.com/najafzadeh-mj/techjs.git
cd techjs
```

---

# Install Dependencies

```bash
npm install
```

---

# Build

Production build:

```bash
npm run build
```

Development build:

```bash
npm run dev
```

The generated file will be available in the build output directory (for example `dist/tech.js`).

---

# Add to ASP.NET Core

Copy the built file to your web root, for example:

```text
wwwroot/js/tech.js
```

Reference it in `_Layout.cshtml`:

```html
<script src="~/js/tech.js"></script>
```

---

# Optional Dependencies

## Bootstrap 5

Bootstrap is optional but recommended for:

* confirmation modal
* toast notifications
* loading UI

```html
<link rel="stylesheet" href="~/lib/bootstrap/css/bootstrap.min.css" />
<script src="~/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
```

## ASP.NET Core Validation

If you use unobtrusive validation, include:

```html
<script src="~/lib/jquery/dist/jquery.min.js"></script>
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
```

Tech.js itself does not require jQuery.

---

# Verify Installation

Create a simple form:

```html
<form data-tech
      data-tech-method="POST"
      data-tech-url="/Home/Test">

    @Html.AntiForgeryToken()

    <button type="submit">Send</button>

</form>
```

If the request is sent via AJAX without a full page reload, the installation is successful.

---

# Recommended Script Order

```html
<script src="~/lib/jquery/dist/jquery.min.js"></script>
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>

<script src="~/lib/bootstrap/js/bootstrap.bundle.min.js"></script>

<script src="~/js/tech.js"></script>
```

---

# Troubleshooting

## `Tech is not defined`

Ensure `tech.js` is loaded before any custom scripts that use `Tech`.

## Validation does not work

Make sure the jQuery validation scripts are included.

## Bootstrap modal does not appear

Make sure `bootstrap.bundle.min.js` is loaded.

---

# Next Steps

* [Getting Started](./getting-started.md)
* [Configuration](./configuration.md)
* [Attributes](./attributes.md)
