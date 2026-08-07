
# Security

## Anti-Forgery Token

Tech.js automatically sends ASP.NET Core anti-forgery tokens.

```html
<form data-tech>
    @Html.AntiForgeryToken()
</form>
```

Compatible with:

```csharp
[ValidateAntiForgeryToken]
```

## Script Execution

Script execution inside swapped HTML is **disabled by default**.

Enable it explicitly:

```html
<div data-tech-execute-scripts="true"></div>
```

Use this only for trusted server-generated content.

## Same-Origin Requests

Default configuration:

```javascript
credentials: 'same-origin',
mode: 'same-origin'
```

This prevents credentials from being sent to other origins unless explicitly configured.
