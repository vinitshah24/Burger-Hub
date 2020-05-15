# The Burger Hub
### Application built using ReactJS and Redux

```npm install --save react-router-dom```
```npm install --save redux react-redux```
#### For running async functions in redux
```npm install --save redux-thunk```

### Firebase Setup Rules
```
{
  "rules": {
    "ingredients": {
    ".read": "true",
    ".write": "true"
    },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null",
          ".indexOn" : ["userId"]
      }
  }
}
```