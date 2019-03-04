# MiddleStack

**Middleware** framework based on [Async Generator][1] of ECMAScript 2018, inspired by [Koa 2][2].

[![NPM Dependency](https://david-dm.org/TechQuery/middle-stack.svg)](https://david-dm.org/TechQuery/middle-stack)
[![Build Status](https://travis-ci.com/TechQuery/middle-stack.svg?branch=master)](https://travis-ci.com/TechQuery/middle-stack)
[![](https://data.jsdelivr.com/v1/package/npm/middle-stack/badge?style=rounded)](https://www.jsdelivr.com/package/npm/middle-stack)

[![NPM](https://nodei.co/npm/middle-stack.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/middle-stack/)

## Usage

[**Typical cases**](https://tech-query.me/test-file/test/index.js.html)

`.babelrc`

```JSON
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-proposal-async-generator-functions"
    ]
}
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#Iterating_over_async_generators
[2]: https://koajs.com
