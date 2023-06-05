:next_track_button: [@iterable-iterator/next](https://iterable-iterator.github.io/next)
==

Iterator next function for JavaScript.
See [docs](https://iterable-iterator.github.io/next/index.html).

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import {iter} from '@iterable-iterator/iter';
import {next, StopIteration} from '@iterable-iterator/next';
next(iter('ABC')); // A
next(iter('')); // throws StopIteration
// With default parameter
next(iter(''), 'x'); // x
```

[![License](https://img.shields.io/github/license/iterable-iterator/next.svg)](https://raw.githubusercontent.com/iterable-iterator/next/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@iterable-iterator/next.svg)](https://www.npmjs.org/package/@iterable-iterator/next)
[![Tests](https://img.shields.io/github/workflow/status/iterable-iterator/next/ci:test?event=push&label=tests)](https://github.com/iterable-iterator/next/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/iterable-iterator/next.svg)](https://david-dm.org/iterable-iterator/next)
[![Dev dependencies](https://img.shields.io/david/dev/iterable-iterator/next.svg)](https://david-dm.org/iterable-iterator/next?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/iterable-iterator/next.svg)](https://github.com/iterable-iterator/next/issues)
[![Downloads](https://img.shields.io/npm/dm/@iterable-iterator/next.svg)](https://www.npmjs.org/package/@iterable-iterator/next)

[![Code issues](https://img.shields.io/codeclimate/issues/iterable-iterator/next.svg)](https://codeclimate.com/github/iterable-iterator/next/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/iterable-iterator/next.svg)](https://codeclimate.com/github/iterable-iterator/next/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/iterable-iterator/next/main.svg)](https://codecov.io/gh/iterable-iterator/next)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/iterable-iterator/next.svg)](https://codeclimate.com/github/iterable-iterator/next/trends/technical_debt)
[![Documentation](https://iterable-iterator.github.io/next/badge.svg)](https://iterable-iterator.github.io/next/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@iterable-iterator/next)](https://bundlephobia.com/result?p=@iterable-iterator/next)
