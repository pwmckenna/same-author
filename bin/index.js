#!/usr/bin/env node
var sameAuthor = require('../');
console.log(sameAuthor.apply(null, process.argv.splice(2)));
