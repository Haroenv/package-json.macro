const pluginTester = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import packageJson from '../src/macro';

      // simple key
      const description = packageJson('description');
    `,
    `
      import packageJson from '../src/macro';

      // object
      const jest = packageJson('jest');
    `,
    `
      import packageJson from '../src/macro';

      // deep object
      const jestTestEnvironment = packageJson('jest.testEnvironment');
    `,
    `
      import packageJson from '../src/macro';

      // array
      const forTestingArray = packageJson('_forTesting.array');
    `,
    `
      import packageJson from '../src/macro';

      // array (deep)
      const forTestingArrayOne = packageJson('_forTesting.array[1]');
      const forTestingArrayOneKey = packageJson('_forTesting.array[1].object');
      const forTestingArrayOneKeyFake = packageJson('_forTesting.array[1].objectFake');
    `,
    `
      import packageJson from '../src/macro';

      // undefined when doesn't exist
      packageJson('_blibli_doesnt_exist');

      // null when actually in data
      packageJson('_forTesting.isNull');
    `,
    `
    import packageJson from '../src/macro'

    // kitchensink
    const version = packageJson('version')
    const name = packageJson('name')
    const object = packageJson('_forTesting.array[1].object')
    `,
  ],
});
