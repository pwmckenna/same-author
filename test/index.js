import assert from 'assert';
import sameAuthor from '../src';
import path from 'path';

describe('same-author', () => {
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
});
