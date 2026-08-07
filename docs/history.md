# History API

Tech.js can update the browser URL without a full page reload.

## Push URL

```html
<a data-tech
   data-tech-url="/Products?page=2"
   data-tech-target="#content"
   data-tech-push-url="true">
   Next Page
</a>
```

Uses `history.pushState()`.

## Replace URL

```html
<a data-tech
   data-tech-url="/Search?q=phone"
   data-tech-target="#results"
   data-tech-replace-url="true">
   Search
</a>
```

Uses `history.replaceState()`.

Only one of these options should be enabled on a request.

