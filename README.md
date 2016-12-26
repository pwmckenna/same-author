# same-author

Test to see if a file was written by you. Useful for babel/webpack conditional loading.

### Install

```
npm install same-author
```

### Usage

##### Babel

```js
var sameAuthor = require('same-author');
require('babel-core/register')({
  only: sameAuthor
});
```

##### Webpack 1.x.x

```js
{
  ...
  module: {
    loaders: [{
      test: function (filename) {
        // Uses the babel loader for both this app's code, but also any npm
        // dependencies that you wrote.
        return sameAuthor(filename) && new RegExp(/\.js$/).test(filename);
      },
      loader: 'babel'
    }]
  }
  ...
}
```

##### Webpack 2.x.x

```js
{
  ...
  module: {
    rules: [{
      test: {
        and: [sameAuthor, /\.jsx?$/]
      },
      use: 'babel-loader'
    }]
  }
  ...
}
```

##### Standalone
```js
import writtenBySameAuthor from 'same-author';
var isSameAuthor = writtenBySameAuthor('./node_modules/same-author', process.cwd());
// the second arg is optional. defaults to cwd.
// in this example, process.cwd() is written by you, so this tests if your dependency "same-author" was also written by you.
// isSameAuthor will be true for me, but not for you.
```
