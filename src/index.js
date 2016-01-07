import path from 'path';
import getPkgRepo from 'get-pkg-repo';
import findRoot from 'find-root';

function author(codePath) {
  const root = findRoot(codePath);
  const pkg = require(path.resolve(root, 'package.json'));
  const repo = getPkgRepo(pkg);
  const user = repo.user;
  return user;
}

export default function (codePath1, codePath2) {
  try {
    return author(codePath1) === author(codePath2 || process.cwd());
  } catch (err) {
    return false;
  }
}
