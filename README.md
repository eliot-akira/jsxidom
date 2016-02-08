# [JSXIDOM](https://github/eliot-akira/jsxidom)

Transform JSX to incremental DOM with Babel

## Use

Install

~~~bash
$ npm i jsxidom --save-dev
~~~

In *.babelrc*

~~~json
"plugins": [
  ["transform-react-jsx", { "pragma": "jsxidom" }]
]
~~~

In application

~~~javascript
require('jsxidom');
~~~

The above line is required once. In addition to building incremental DOM from JSX, it provides a *render* method to HTML element.

Example use case

~~~javascript
const app = document.body.querySelector('#app')

let i = 0

function refresh() {
  app.render(<div class="counter">{ i++ }</div>)
}

refresh()
setInterval( refresh, 1000 )
~~~
