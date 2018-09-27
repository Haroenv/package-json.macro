'use strict';

var _require = require('babel-plugin-macros'),
    createMacro = _require.createMacro;

var readPkgUp = require('read-pkg-up');
var get = require('lodash.get');

var getPkg = function (path, _ref) {
  var cwd = _ref.cwd,
      _ref$normalize = _ref.normalize,
      normalize = _ref$normalize === undefined ? true : _ref$normalize;
  return get(readPkgUp.sync({ cwd, normalize }).pkg, path);
};

module.exports = createMacro(function (_ref2) {
  var references = _ref2.references,
      state = _ref2.state,
      babel = _ref2.babel;

  references.default.forEach(function (referencePath) {
    if (referencePath.parentPath.type === 'CallExpression') {
      asFunction(referencePath.parentPath.get('arguments'), state, babel);
    } else {
      throw new MacroError(`package-json.macro can only be used as a function call. You tried ${referencePath.parentPath.type}.`);
    }
  });
});

function asFunction(argumentsPaths, _ref3, babel) {
  _ref3.file.opts.filename;
  argumentsPaths[0].evaluate().value;
  var t = babel.types;


  console.log(argumentsPaths[0]);

  argumentsPaths[0].parentPath.replaceWith(t.stringLiteral('h i there!'));
}