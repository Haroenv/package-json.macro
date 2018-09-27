# package-json.macro

[![Build Status](https://img.shields.io/circleci/project/github/haroenv/package-json.macro/master.svg?label=build&style=flat-square)](https://circleci.com/gh/haroenv/package-json.macro)

## Usage

Imagine the following package.json:

```json
{
  "version": "1.0.0",
  "license": "MIT",
  "author": {
    "name": "Haroen Viaene"
  },
  "_forTesting": {
    "isNull": null,
    "array": [
      "hi",
      {
        "object": true
      }
    ]
  }
}
```

Then with this code, you'll avoid getting the whole json object in your source code

```js
import packageJson from '../src/macro'

const version = packageJson('version')
const name = packageJson('name')
const object = packageJson('_forTesting.array[1].object')

      ↓ ↓ ↓ ↓ ↓ ↓

const version = '1.0.0';
const name = 'package-json.macro';
const object = true;
```
