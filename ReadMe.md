# OnionStack

**Middleware** framework based on [Async Generator][1] & [TypeScript][2], inspired by [Koa 2][3].

[![NPM Dependency](https://img.shields.io/librariesio/github/TechQuery/onion-stack.svg)][4]
[![CI & CD](https://github.com/TechQuery/onion-stack/actions/workflows/main.yml/badge.svg)][5]
[![](https://data.jsdelivr.com/v1/package/npm/onion-stack/badge?style=rounded)][6]

[![NPM](https://nodei.co/npm/onion-stack.png?downloads=true&downloadRank=true&stars=true)][7]

## Example

```javascript
import OnionStack from 'onion-stack';

const list = [];

const stack = new OnionStack(
    function* () {
        list.push(1);

        yield;

        list.push(2);

        yield;

        list.push(3);
    },
    async function* () {
        await delay(0.1);

        list.push(4);

        yield;

        list.push(5);
    },
    function () {
        list.push(6);
    }
);

stack.execute().then(() => console.log(list)); //  [1, 4, 6, 5, 2]
```

[More cases](https://github.com/TechQuery/onion-stack/tree/master/test)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#Iterating_over_async_generators
[2]: https://www.typescriptlang.org
[3]: https://koajs.com
[4]: https://libraries.io/npm/onion-stack
[5]: https://github.com/TechQuery/onion-stack/actions/workflows/main.yml
[6]: https://www.jsdelivr.com/package/npm/onion-stack
[7]: https://nodei.co/npm/onion-stack/
