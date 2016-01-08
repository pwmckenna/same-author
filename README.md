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

##### Webpack

```js
{
  ...
  module: {
    loaders: [{
      // Uses the babel loader for just this app's code.
      test: /\.js$/,
      // exclude all dependencies...meaning you need to have published compiled code
      // even if those dependencies are yours.
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
      // Uses the babel loader for both this app's code, but also any npm
      // dependencies that you wrote.
      test: function (filename) {
        // Use
        return sameAuthor(filename) && new RegExp(/\.js$/).test(filename);
      },
      loader: 'babel'
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
