# Migration from jQuery Unobtrusive AJAX

This guide explains how to migrate an ASP.NET Core MVC application from **jQuery Unobtrusive AJAX** (`jquery-ajax-unobtrusive`) to **Tech.js**.

Tech.js keeps the familiar declarative `data-*` approach while removing the jQuery dependency and adding a modern Fetch API–based pipeline.

---

## Why migrate?

| jQuery Unobtrusive AJAX                 | Tech.js                                           |
| --------------------------------------- | ------------------------------------------------- |
| Requires jQuery + plugin                | No jQuery dependency                              |
| Callback-oriented                       | Promise / async pipeline                          |
| Limited UX features                     | Built-in confirm, loading, history, notifications |
| Manual re-binding after partial updates | Automatic handler reactivation                    |
| No History API support                  | `pushState` / `replaceState` support              |

---

# Installation

### Remove

```html id=
```
