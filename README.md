# same-author

Test to see if a file was written by you. Useful for babel/webpack conditional loading.

### Install

```npm install same-author```

### Usage

##### Babel

```js
require('babel-core/register')({
  only: require('same-author')
});
```

##### Standalone
```js
import writtenBySameAuthor from 'same-author';
var isSameAuthor = writtenBySameAuthor('./node_modules/same-author', process.cwd());
// process.cwd() is written by you, so this tests if your dependency "same-author" was also written by you.
// isSameAuthor will be true for me, but not for you.
```
