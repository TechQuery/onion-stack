# OnionStack

**Middleware** framework based on [Async Generator][1] of ECMAScript 2018, inspired by [Koa 2][2].

[![NPM Dependency](https://david-dm.org/TechQuery/onion-stack.svg)](https://david-dm.org/TechQuery/onion-stack)
[![Build Status](https://travis-ci.com/TechQuery/onion-stack.svg?branch=master)](https://travis-ci.com/TechQuery/onion-stack)
[![](https://data.jsdelivr.com/v1/package/npm/onion-stack/badge?style=rounded)](https://www.jsdelivr.com/package/npm/onion-stack)

[![NPM](https://nodei.co/npm/onion-stack.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/onion-stack/)

## Example

```JavaScript
import OnionStack from 'onion-stack';


const list = [ ];

const stack = new OnionStack(
    function*() {
        list.push(1);

        yield;

        list.push(2);

        yield;

        list.push(3);
    },
    async function*() {
        await delay(0.1);

        list.push(4);

        yield;

        list.push(5);
    },
    function() {
        list.push(6);
    }
);

stack.execute().then(() => console.log( list ));    //  [1, 4, 6, 5, 2]
```

[More cases](https://tech-query.me/onion-stack/test.html)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#Iterating_over_async_generators
[2]: https://koajs.com
