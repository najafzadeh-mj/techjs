
# Swap Modes

Tech.js supports four HTML swap modes.

## inner

Replace target content.

```html
data-tech-swap="inner"
```

Result:

```html
<div id="target">NEW</div>
```

## outer

Replace the target element itself.

```html
data-tech-swap="outer"
```

## before

Insert content before the target.

```html
data-tech-swap="before"
```

## after

Insert content after the target.

```html
data-tech-swap="after"
```

## Example

```html
<div id="content"></div>

<a data-tech
   data-tech-url="/Home/Partial"
   data-tech-target="#content"
   data-tech-swap="inner">
   Load
</a>
```

The HTML returned from `/Home/Partial` is inserted into `#content`.

## Related Event

After a successful swap, Tech.js dispatches:

```javascript
document.addEventListener('tech:partialLoaded', function (e) {
    console.log(e.detail.target);
    console.log(e.detail.mode);
});
```
