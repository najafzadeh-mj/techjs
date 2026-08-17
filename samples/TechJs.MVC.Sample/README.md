# Tech.js MVC Sample

A real-world ASP.NET Core MVC sample demonstrating how to use **Tech.js** to build modern AJAX-style interactions without jQuery.

The sample implements a complete Product CRUD workflow using Tech.js declarative `data-*` attributes.

---

## ✨ What does this sample demonstrate?

This sample shows how Tech.js can be used in a real ASP.NET Core MVC application to perform:

- Product listing
- Create Product
- Edit Product
- Delete Product
- Partial View loading
- Bootstrap Modal integration
- AJAX-style form submission
- Server-side JSON responses
- Automatic list refresh
- Confirmation dialogs
- Loading states
- Targeted DOM updates
- Request data binding
- Anti-forgery token support
- Callback handling

All without writing manual `fetch()` calls.

---

## 🧱 Technologies

- ASP.NET Core MVC
- C#
- Razor Views
- Bootstrap
- Tech.js
- Fetch API
- HTML `data-*` attributes

No jQuery is required.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/najafzadeh-mj/techjs.git
```

Navigate to the sample:

```bash
cd techjs/samples/TechJs.MVC.Sample
```

### 2. Run the application

Open the project in Visual Studio or VS Code and run the application.

You can also run it using:

```bash
dotnet run
```

Then open the URL shown by ASP.NET Core.

---

## 📦 Project Structure

The sample is intentionally small and focuses on demonstrating Tech.js rather than building a production-scale application.

```text
TechJs.MVC.Sample/
│
├── Controllers/
│   ├── HomeController.cs
│   └── ProductsController.cs
│
├── Models/
│   └── Product.cs
│
├── Repositories/
│   └── ProductRepository.cs
│
├── Views/
│   ├── Home/
│   ├── Products/
│   │   ├── Index.cshtml
│   │   ├── _ProductForm.cshtml
│   │   └── _ProductList.cshtml
│   │
│   └── Shared/
│       └── _Layout.cshtml
│
└── wwwroot/
    └── js/
        └── sample.js
```

---

## 🧩 Tech.js in Action

### Load a Partial View

The sample uses a declarative button to load the Product form:

```html
<button type="button"
        class="btn btn-primary"
        data-tech="button"
        data-tech-url="/Products/Create"
        data-tech-target="#product-form"
        data-tech-swap="inner"
        data-tech-complete="showProductFormModal">
    Add Product
</button>
```

No manual AJAX or `fetch()` code is required.

Tech.js performs the request and updates:

```html
<div id="product-form"></div>
```

---

## 📝 Create and Edit

The same Razor Partial is used for both Create and Edit operations.

```html
<form method="post"
      data-tech="form"
      data-tech-url="/Products/@(Model.Id > 0 ? "Edit" : "Create")"
      data-tech-complete="productSaved">
```

This allows the application to reuse the same form while Tech.js handles the request lifecycle.

---

## 📦 Request Data

The sample demonstrates the attribute-based request data API.

For example:

```html
data-tech-data-id="@product.Id"
```

Tech.js converts this into request data:

```javascript
{
    id: 15
}
```

Multiple values can also be specified:

```html
data-tech-data-product-id="15"
data-tech-data-active="true"
```

Result:

```javascript
{
    productId: 15,
    active: true
}
```

The existing JSON syntax is also supported:

```html
data-tech-data='{"id":15}'
```

This keeps the API backward compatible while providing a cleaner syntax for simple values.

---

## 🗑️ Delete

Delete uses the same declarative approach:

```html
<button type="button"
        class="btn btn-sm btn-outline-danger"
        data-tech="button"
        data-tech-url="/Products/Delete"
        data-tech-method="POST"
        data-tech-data-id="@product.Id"
        data-tech-confirm="Are you sure you want to delete this product?"
        data-tech-complete="productDeleted">
    Delete
</button>
```

The complete workflow is handled by Tech.js:

```text
User clicks Delete
        ↓
Confirmation
        ↓
POST /Products/Delete
        ↓
Server response
        ↓
productDeleted()
        ↓
Refresh Product List
```

---

## 🔄 Refresh Without Page Reload

After Create, Edit or Delete, the Product list is refreshed without reloading the page.

The sample does not implement another manual `fetch()` request.

Instead, the refresh operation itself goes through Tech.js.

Conceptually:

```text
CRUD Operation
      ↓
Tech.js
      ↓
Server
      ↓
Partial View
      ↓
Target Element
```

This demonstrates one of the main goals of Tech.js:

> Keep request handling inside the library while allowing developers to control behavior declaratively from HTML.

---

## 🪟 Bootstrap Modal

The Product form is displayed inside a Bootstrap modal.

When Tech.js finishes loading the form:

```html
data-tech-complete="showProductFormModal"
```

the callback opens the modal:

```javascript
function showProductFormModal(e) {

    const modalElement =
        document.getElementById("productModal");

    if (modalElement) {

        bootstrap.Modal
            .getOrCreateInstance(modalElement)
            .show();
    }
}
```

The modal itself is controlled by Bootstrap; Tech.js is responsible for loading its content.

---

## 🔔 Callbacks

The sample demonstrates Tech.js callbacks such as:

```html
data-tech-complete="productSaved"
```

The callback receives the Tech.js context:

```javascript
function productSaved(e) {

    console.log(e);

    if (!e.data?.result) {
        console.warn(e.data?.message);
        return;
    }

    // Close modal
    // Refresh list
}
```

The response data from ASP.NET Core is available through:

```javascript
e.data
```

For example:

```json
{
    "result": true,
    "message": "Product added successfully!"
}
```

---

## 🔐 Anti-Forgery

The sample also demonstrates ASP.NET Core anti-forgery protection:

```cshtml
@Html.AntiForgeryToken()
```

Tech.js can work with forms containing the standard ASP.NET Core anti-forgery token.

---

## 🧠 Request Flow

A typical Create operation looks like this:

```text
┌─────────────────────┐
│     Add Product     │
└──────────┬──────────┘
           │
           ▼
      Tech.js Button
           │
           ▼
     GET /Products/Create
           │
           ▼
      Partial View
           │
           ▼
       Bootstrap Modal
           │
           ▼
       Submit Form
           │
           ▼
      Tech.js Pipeline
           │
           ▼
     POST /Products/Create
           │
           ▼
        JSON Result
           │
           ▼
      productSaved()
           │
           ▼
       Close Modal
           │
           ▼
      Refresh Product List
```

---

## 🎯 Why this sample?

The purpose of this sample is not to demonstrate a complex business domain.

Instead, it provides a small but realistic application that demonstrates how Tech.js can replace traditional jQuery AJAX patterns in an ASP.NET Core MVC application.

The complete CRUD workflow can be implemented using:

```html
data-tech="..."
```

attributes and a small amount of JavaScript for application-specific behavior.

---

## 📚 Learn More

For complete documentation, see the main Tech.js documentation:

- [Tech.js Documentation](../../docs/index.md)
- [Migration from jQuery Unobtrusive AJAX](../../docs/migration-from-unobtrusive-ajax.md)

---

## 📄 License

See the main repository for license information.

---

## Tech.js

A lightweight, declarative Fetch API library for modern ASP.NET Core MVC applications.

GitHub:

https://github.com/najafzadeh-mj/techjs
