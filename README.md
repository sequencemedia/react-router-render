# react-router-render

Render isomorphic _React_ apps and components in Node.

- Using _React Router_

_Compatible with React Router 5._

An example implementation of the companion package `@sequencemedia/react-router-redux-render` can be found in [react-router-pagination-io](http://github.com/sequencemedia/react-router-pagination-io.git).

## Example

In Express:

```javascript
const express = require('express')

const app = express()
const port = 3000

const routes = require('./path/to/routes')

const {
  renderToString
} = require('react-router-render')

app.get('/', ({ url: { path: pathname = '/' } }, res) => res.send(renderToString(routes, pathname)))

app.listen(port, () => console.log(`Express ${port}`))
```

If React Router matches the `pathname` to a `<Route />` then `renderToString` returns a string.

If `renderToString` encounters an error then it throws a `500 Internal Server Error`.

If `renderToString` cannot match the `pathname` to a `<Route />` then it throws a `404 Not Found`.

## In this package

`react-router-render` exports three functions:

1. `renderToString`
2. `renderToStaticMarkup`
3. `render`

`renderToString` generates `<html />` including the attributes that _React_ uses in `ReactDOM.hydrate()`. It implements [`ReactDOMServer.renderToString()`](https://reactjs.org/docs/react-dom-server.html#rendertostring).

`renderToStaticMarkup` doesn't include those attributes. It's useful for using React as a rendering engine for static pages. It implements [`ReactDOMServer.renderToStaticMarkup()`](https://reactjs.org/docs/react-dom-server.html#rendertostraticmarkup).

`render` executes `renderToString` but returns a `Promise` which resolves to a string.

## Companion packages

1. `@sequencemedia/react-router-redux-render` for React Router apps (with Redux)
2. `@sequencemedia/react-redux-render` for React Redux apps (without React Router)
2. `@sequencemedia/react-render` for React apps (without React Router or Redux)
