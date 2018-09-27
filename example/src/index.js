import packageJson from '../../src/macro';

// version: 1.0.0
console.log('version:', packageJson('version'));

// dependencies: { "babel-core": "^6.26.3", "babel-plugin-macros": "^2.3.0", "babel-preset-env": "^1.7.0" }
console.log('dependencies:', packageJson('dependencies'));

// author: Haroen Viaene
console.log('author:', packageJson('author.name'));

// pass arguments: https://github.com/sindresorhus/read-pkg-up#options
console.log('version:', packageJson('version', { normalize: false }));

// impossible: undefined
console.log('impossible:', packageJson('_this_does_not_exist_'));
