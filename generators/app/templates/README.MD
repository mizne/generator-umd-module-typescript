# <%= props.libraryName.kebabCase %>

## Installation

To use with node:

```bash
$ npm install <%= props.libraryName.kebabCase %> -S
```

CommonJs module:

```javascript
const myLib = require('<%= props.libraryName.kebabCase %>');
```
or ES6 module:

```javascript
import * as myLib from '<%= props.libraryName.kebabCase %>';
```
or AMD module:

```javascript
require(['<%= props.libraryName.kebabCase %>'], function (myLib) {
  console.log(myLib)
});
```

## Usage

```javascript

```


## License

MIT © [<%= props.author.name %>](mailto:<%= props.author.email %>)
