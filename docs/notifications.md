# Notifications

Tech.js includes an optional global notification system based on Bootstrap Toast.

## Enable Notifications

```html
<form data-tech data-tech-notify="true"></form>
```

### Modes

| Value     | Behavior              |
| --------- | --------------------- |
| `true`    | success + error       |
| `success` | success only          |
| `error`   | error only            |
| `none`    | disable notifications |

## Server Response

```json
{
  "message": "User saved successfully"
}
```

The `message` value is displayed automatically.

## Manual API

```javascript
Tech.Notify.success('Saved');
Tech.Notify.error('Delete failed');
Tech.Notify.warning('Check input');
Tech.Notify.info('Done');
```

## Bootstrap Requirement

If Bootstrap 5 is available, Tech.js uses Bootstrap Toast. Otherwise it falls back to a simple alert-style notification.

