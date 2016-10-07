import assert from 'assert';
import sameAuthor from '../src';
import path from 'path';
import rpt from 'read-package-tree';
import { range } from 'lodash';

describe('same-author', function sameAuthorSuite() {
  it('tests a module that is written by the author of this repo', () => {
    const modulePath = path.resolve(__dirname, '../node_modules/eslint-config-pwmckenna/');
    const same = sameAuthor(modulePath);
    assert(same, 'expected eslint-config-pwmckenna to have the same author as this repo');
  });
  it('tests a module that is not written by the author of this repo', () => {
    const modulePath = path.resolve(__dirname, '../node_modules/eslint/');
    const same = sameAuthor(modulePath);
    assert(!same, 'expected eslint to have a different author than this repo');
  });
  it('tests a module that is written by the author of another repo', () => {
    const modulePath1 = path.resolve(__dirname, '../node_modules/babel-cli/');
    const modulePath2 = path.resolve(__dirname, '../node_modules/babel-core/');
    const same = sameAuthor(modulePath1, modulePath2);
    assert(same, 'expect multiple babel modules to have the same author');
  });
  it('tests a module that is not written by the author of another repo', () => {
    const modulePath1 = path.resolve(__dirname, '../node_modules/eslint/');
    const modulePath2 = path.resolve(__dirname, '../node_modules/babel-core/');
    const same = sameAuthor(modulePath1, modulePath2);
    assert(!same, 'expect eslint and babel-core to have different authors');
  });
  it('tests all files including dependencies and does not take forever', function sameAuthorSpeedTest(done) {
    this.timeout(10000);
    rpt(process.cwd(), (err, data) => {
      const getNodePaths = node => node.children.reduce((aggregator, child) => (
        aggregator.concat(getNodePaths(child))
      ), [node.path]);
      const paths = getNodePaths(data).reduce((prev, next) => (
        [...prev, ...range(500).map(n => `${next}/${n}`)]
      ), []);
      console.log(`${paths.filter(p => sameAuthor(p)).length}/${paths.length}`);
      done(err);
    });
  });
});
