const { createMacro } = require('babel-plugin-macros');
const readPkgUp = require('read-pkg-up');
const get = require('lodash.get');

const getPkg = (path, opts) => get(readPkgUp.sync(opts).pkg, path);

module.exports = createMacro(function babelMacroPkgJson({
  references,
  state,
  babel,
}) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'CallExpression') {
      const { types: t } = babel;
      const argumentsPaths = referencePath.parentPath.get('arguments');
      const args = argumentsPaths.map(arg => arg.evaluate().value);

      const result = getPkg(...args);

      argumentsPaths[0].parentPath.replaceWith(jsonToBabel(result, t));
    } else {
      throw new MacroError(
        `package-json.macro can only be used as a function call. You tried ${
          referencePath.parentPath.type
        }.`
      );
    }
  });
});

function jsonToBabel(value, t) {
  if (Array.isArray(value)) {
    return t.arrayExpression(value.map(_value => jsonToBabel(_value, t)));
  }
  if (value === null) {
    return t.identifier('null');
  }
  switch (typeof value) {
    case 'object': {
      return t.objectExpression(
        Object.entries(value).map(([key, _value]) =>
          t.objectProperty(t.identifier(key), jsonToBabel(_value, t))
        )
      );
    }
    case 'undefined': {
      return t.identifier('undefined');
    }
    case 'string': {
      return t.stringLiteral(value);
    }
    case 'number': {
      return t.numberLiteral(value);
    }
    case 'boolean': {
      return t.booleanLiteral(value);
    }
    default: {
      throw new MacroError(
        `Invalid type for ${JSON.stringify(value)} in package.json`
      );
    }
  }
}
