import path from 'path';
import getPkgRepo from 'get-pkg-repo';
import findRoot from 'find-root';
import debugLib from 'debug';
import * as registerCache from './cache';

const debug = debugLib('same-author');

registerCache.load();
const cache = registerCache.get();
const rootAuthors = {};

function author(codePath) {
  if (cache.hasOwnProperty(codePath)) {
    return cache[codePath];
  }
  const match = codePath.match('(.*\/node_modules\/[^/]*)');
  const root = match ? match[0] : findRoot(codePath);

  if (rootAuthors.hasOwnProperty(root)) {
    debug('author (cached): %s, %s', codePath, rootAuthors[root]);
    return rootAuthors[root];
  }

  const pkgPath = path.resolve(root, 'package.json');
  const pkg = require(pkgPath);
  const repo = getPkgRepo(pkg);
  debug('author: %s, %s', codePath, repo.user);

  rootAuthors[root] = repo.user;
  cache[codePath] = repo.user;
  return repo.user;
}

export default function (codePath1, otherPath) {
  const codePath2 = otherPath || process.cwd();
  try {
    const author1 = author(codePath1);
    const author2 = author(codePath2);
    debug('authors: %s, %s', author1, author2);
    return author1 === author2;
  } catch (err) {
    debug('error: %o', err);
    return false;
  }
}
