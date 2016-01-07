import path from 'path';
import getPkgRepo from 'get-pkg-repo';
import findRoot from 'find-root';
import debugLib from 'debug';

const debug = debugLib('same-author');

function author(codePath) {
  const root = findRoot(codePath);
  const pkgPath = path.resolve(root, 'package.json');
  const pkg = require(pkgPath);
  const repo = getPkgRepo(pkg);
  debug('author: %s, %s', codePath, repo.user);
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
