# babel-plugin-transform-console-helper

A babel plugin that adds the parent function to console statements, and the name of each variable before the value. My first attempt at creating a [babel plugin](https://babeljs.io/).

## Installation & Usage

```
npm i -S babel-plugin-transform-console-helper
```

.babelrc

```json
{
  "env": {
    "development": {
      "plugins": ["transform-console-helper"]
    }
  }
}
```

I only load it in development because I don't have any production log statements.

## Example

```javascript
console.log(a);

function onChange() {
  console.log(a, b, c);
}

// BECOMES

console.log('a', a);

function onChange() {
  console.log('onChange()', 'a', a, 'b', b, 'c', c);
}
```

## Testing

Tests are written with [Jest](https://jestjs.io). [Snapshot tests](https://jestjs.io/docs/en/snapshot-testing.html) are really nice for this. They can be run like this:

```
npm test
```
