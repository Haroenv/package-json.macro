# package-json.macro

[![Build Status](https://img.shields.io/circleci/project/github/haroenv/package-json.macro/master.svg?label=build&style=flat-square)](https://circleci.com/gh/haroenv/package-json.macro)

## Usage

```js
import decimal from 'package-json.macro'

const a = decimal(1)
const b = decimal(a - 3 * 4 / 5)
const c = decimal(a - 3 + 4 - 5)
const d = decimal(1 ** 2 ** 3)

      ↓ ↓ ↓ ↓ ↓ ↓

import { Decimal as _Decimal } from 'decimal.js';


const a = _Decimal('1');
const b = _Decimal(a).sub(_Decimal(_Decimal('3').mul('4')).div('5'));
const c = _Decimal(_Decimal(_Decimal(a).sub('3')).add('4')).sub('5');
const d = _Decimal('1').pow(_Decimal('2').pow('3'));
```
